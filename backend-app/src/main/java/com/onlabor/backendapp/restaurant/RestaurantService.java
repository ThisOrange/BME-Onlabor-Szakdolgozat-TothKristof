package com.onlabor.backendapp.restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurant(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        Restaurant existing = getRestaurant(id);
        if (restaurant.getLocation() != null)
            existing.setLocation(restaurant.getLocation());
        if (restaurant.getLocationName() != null)
            existing.setLocationName(restaurant.getLocationName());
        if (restaurant.getName() != null)
            existing.setName(restaurant.getName());
        if (restaurant.getMenu() != null)
            existing.setMenu(restaurant.getMenu());
        if (restaurant.getAllergen() != null)
            existing.setAllergen(restaurant.getAllergen());
        return restaurantRepository.save(existing);
    }

    public void deleteRestaurant(Long id) {
        if (restaurantRepository.findById(id).orElse(null) != null)
            restaurantRepository.deleteById(id);
    }
}
