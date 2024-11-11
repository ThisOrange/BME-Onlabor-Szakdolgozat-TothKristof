package com.onlabor.backendapp.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();
        if (userExists) {
            throw new IllegalStateException("Email already in use!");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        appUserRepository.save(appUser);

        // TODO: Send token!

        return "Works";
    }

    public void deleteUser(String email) {
        boolean userExists = appUserRepository.findByEmail(email).isPresent();
        if (!userExists) {
            throw new IllegalStateException("Selected user doesn't exist!");
        }
        appUserRepository.delete(appUserRepository.findByEmail(email).get());
    }

    public AppUser getAppUser(Long id) {
        return appUserRepository.findById(id).orElse(null);
    }
}
