package com.onlabor.backendapp.security;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlabor.backendapp.security.config.JwtUtil;
import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository appUserRepository;
    private final JwtUtil jwtUtils;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("Authenticating user with email: " + request.getEmail());
        try {
            // Authenticate the user with email and password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            // Retrieve the user details after successful authentication
            Optional<AppUser> appUser = appUserRepository.findByEmail(request.getEmail());

            // Check if the user exists and generate the token
            if (appUser != null) {
                System.out.println("Authentication successful for user: " + appUser.get().getUsername());
                String token = jwtUtils.generateToken(appUser.get());
                System.out.println("Generated JWT token: " + token); // Verify token generation
                return ResponseEntity.ok(token);
            } else {
                System.out.println("User not found in repository after authentication.");
                return ResponseEntity.status(400).body("User not found");
            }
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(400).body("Authentication failed");
        }
    }

}
