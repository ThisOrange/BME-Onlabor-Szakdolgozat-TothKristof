package com.onlabor.backendapp.security;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
            // Check if the email exists in the repository
            Optional<AppUser> appUser = appUserRepository.findByEmail(request.getEmail());

            if (appUser.isEmpty()) {
                System.out.println("User not found in repository.");
                return ResponseEntity.status(404).body("User not found");
            }

            // Try authenticating with the provided email and password
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                // If authentication is successful, generate the JWT token
                System.out.println("Authentication successful for user: " + appUser.get().getUsername());
                String token = jwtUtils.generateToken(appUser.get());
                System.out.println("Generated JWT token: " + token);
                return ResponseEntity.ok(token);

            } catch (BadCredentialsException e) {
                System.out.println("Incorrect password for user: " + request.getEmail());
                return ResponseEntity.status(401).body("Incorrect password");
            }

        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.status(500).body("Authentication failed");
        }
    }

}
