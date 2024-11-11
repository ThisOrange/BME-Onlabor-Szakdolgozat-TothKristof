package com.onlabor.backendapp.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.onlabor.backendapp.security.config.JwtUtil;
import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final AppUserRepository appUserRepository;
    private final JwtUtil jwtUtils;
    private static final String AUTHORIZATION = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Define the authorization header
        final String authHeader = request.getHeader(AUTHORIZATION);
        System.out.println("Authorization Header: " + authHeader); // Print header value

        // Check if the authHeader is null or doesn't start with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer token found in header.");
            filterChain.doFilter(request, response);
            return;
        }

        final String jwtToken = authHeader.substring(7);
        final String userEmail = jwtUtils.extractUsername(jwtToken);

        System.out.println("Extracted user email from token: " + userEmail); // Verify email extracted from JWT

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<AppUser> appUser = appUserRepository.findByEmail(userEmail);

            if (appUser.isPresent()) {
                UserDetails userDetails = appUser.get();
                System.out.println("User found in database: " + userDetails.getUsername()); // Confirm user found

                // Validate the token
                boolean isValidToken = jwtUtils.validateToken(jwtToken, userDetails);
                System.out.println("JWT validation result: " + isValidToken); // Check validation result

                if (isValidToken) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("User authenticated: " + userDetails.getUsername());
                } else {
                    System.out.println("JWT token is not valid.");
                }
            } else {
                System.out.println("No user found with email: " + userEmail);
            }
        }

        filterChain.doFilter(request, response);
    }

}
