package com.onlabor.backendapp.registration;

import org.springframework.stereotype.Service;

import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserRole;
import com.onlabor.backendapp.user.AppUserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean validEmail = emailValidator.test(request.getEmail());

        if (!validEmail) {
            throw new IllegalStateException("Email not valid!");
        }
        return appUserService.signUpUser(
                new AppUser(
                        request.getUserName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER));
    }

    public void delete(RegistrationRequest request) {
        boolean validEmail = emailValidator.test(request.getEmail());

        if (!validEmail) {
            throw new IllegalStateException("Email not valid!");
        }
        appUserService.deleteUser(request.getEmail());
    }

}
