package com.onlabor.backendapp.controller;

import com.onlabor.backendapp.model.Restaurant;
import com.onlabor.backendapp.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class RestaurantController {
    int id=0;
    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService){this.restaurantService=restaurantService;}

    @GetMapping("/restaurant")
    public Restaurant getRestaurant(@RequestParam Integer id){
        Optional restaurant=restaurantService.getRestaurant(id);
        if(restaurant.isPresent()){
            return (Restaurant) restaurant.get();
        }
        return null;
    }

    @PostMapping("/restaurant/add")
    public void addRestaurant(@RequestBody Restaurant newRestaurant){restaurantService.addRestaurant(newRestaurant);}

}
