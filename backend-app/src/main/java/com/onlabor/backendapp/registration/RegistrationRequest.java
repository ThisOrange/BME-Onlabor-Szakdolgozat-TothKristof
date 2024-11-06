package com.onlabor.backendapp.registration;

import com.onlabor.backendapp.user.AppUserRole;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final String userName;
    private final String email;
    private final String password;
    private final boolean role;
}
