package com.onlabor.backendapp.registration;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserRepository;
import com.onlabor.backendapp.user.AppUserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;

    public ResponseEntity<String> register(RegistrationRequest request) {
        Optional<AppUser> existingUser = appUserRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(401).body("Email already in use");

        }
        appUserService.signUpUser(
                new AppUser(
                        request.getUserName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.isRole()));
        return ResponseEntity.ok("Registered!");
    }
}
