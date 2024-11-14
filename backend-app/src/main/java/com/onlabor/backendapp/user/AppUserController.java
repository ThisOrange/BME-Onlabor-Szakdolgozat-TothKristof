package com.onlabor.backendapp.user;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlabor.backendapp.restaurant.Restaurant;

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

    @GetMapping(path = "/restaurants")
    public List<Restaurant> getRestaurants(@RequestParam Long id) {
        return appUserService.getAppUser(id).getRestaurants();
    }

    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        return appUserService.deleteUser(id);
    }

    @GetMapping("/validate/{id}/{restId}")
    public Restaurant validateRestaurant(@PathVariable Long id, @PathVariable Long restId) {
        return appUserService.getAppUser(id).getRestaurant(restId);
    }
}
