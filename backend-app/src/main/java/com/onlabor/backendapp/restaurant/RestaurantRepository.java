package com.onlabor.backendapp.restaurant;

import com.onlabor.backendapp.restaurant.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
