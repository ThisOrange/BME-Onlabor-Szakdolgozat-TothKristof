package com.onlabor.backendapp.restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserService;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private AppUserService appUserService;

    @GetMapping("/{id}")
    public Restaurant getRestaurant(@PathVariable Long id) {
        return restaurantService.getRestaurant(id);
    }

    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/best")
    public List<Restaurant> getBestRestaurants() {
        return restaurantService.getBestRestaurants();
    }

    @PostMapping
    public Restaurant addRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        // Extract the userId from the RestaurantDTO
        Long userId = restaurantDTO.getUserId(); // Assuming RestaurantDTO has userId

        System.out.println("User ID (Post): " + userId);

        // Retrieve the AppUser from the database by userId
        AppUser user = appUserService.getAppUser(userId);

        // Create a new Restaurant object and set properties from the RestaurantDTO
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantDTO.getName());
        restaurant.setLocationName(restaurantDTO.getLocationName());
        restaurant.setLocation(restaurantDTO.getLocation());
        restaurant.setAllergen(restaurantDTO.getAllergen());
        restaurant.setMenu(restaurantDTO.getMenu());

        // Set the AppUser in the Restaurant object
        restaurant.setUser(user);

        // Save the restaurant and return the result
        return restaurantService.saveRestaurant(restaurant);
    }

    @PutMapping("/rating")
    public Restaurant updateRestaurant(@RequestParam Long id, @RequestBody Float rating) {
        return restaurantService.updateRating(id, rating);
    }

    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) {
        return restaurantService.updateRestaurant(id, restaurant);
    }

    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return "Restaurant " + id + " removed!";
    }

    @DeleteMapping("/all/{id}")
    public String deleteRestaurants(@PathVariable Long id) {
        restaurantService.deleteRestaurantsByUserId(id);
        return "Restaurant " + id + " removed!";
    }

}
