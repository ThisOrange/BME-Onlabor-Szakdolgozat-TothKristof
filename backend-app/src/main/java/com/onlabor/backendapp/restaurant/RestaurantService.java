package com.onlabor.backendapp.restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.onlabor.backendapp.user.AppUser;
import com.onlabor.backendapp.user.AppUserRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private AppUserRepository appUserRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> getBestRestaurants() {
        return restaurantRepository.findAllOrderByRatingAscNullsLast();
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

    public Restaurant updateRating(Long id, Float rating) {
        Restaurant existing = getRestaurant(id);
        existing.setRating(rating);
        System.out.println(rating);
        return restaurantRepository.save(existing);
    }

    @Transactional
    public void deleteRestaurant(Long id) {
        if (restaurantRepository.findById(id).orElse(null) != null)
            restaurantRepository.deleteById(id);
    }

    @Transactional
    public void deleteRestaurantsByUserId(Long userId) {
        Optional<AppUser> user = appUserRepository.findById(userId);
        if (user.isPresent()) {
            restaurantRepository.deleteByUser(user.get());
        } else {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }
    }
}
