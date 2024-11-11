package com.onlabor.backendapp.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/user")
@AllArgsConstructor
public class AppUserController {
    private AppUserService appUserService;

    @GetMapping
    public AppUser getById(@RequestParam Long id) {
        return appUserService.getAppUser(id);
    }

    @GetMapping(path = "/name")
    public String getNameById(@RequestParam Long id) {
        return appUserService.getAppUser(id).getUsername();
    }
}
