package com.onlabor.backendapp.controller;

import com.onlabor.backendapp.model.Restaurant;
import com.onlabor.backendapp.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/{id}")
    public Restaurant getRestaurant(@PathVariable Long id) { return restaurantService.getRestaurant(id); }

    @GetMapping
    public List<Restaurant> getRestaurants() { return restaurantService.getAllRestaurants(); }

    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) { return restaurantService.saveRestaurant(restaurant); }

    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id,@RequestBody Restaurant restaurant){
        return restaurantService.updateRestaurant(id,restaurant);
    }

    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable Long id){
        restaurantService.deleteRestaurant(id);
        return "Restaurant " + id + " removed!";
    }

}
