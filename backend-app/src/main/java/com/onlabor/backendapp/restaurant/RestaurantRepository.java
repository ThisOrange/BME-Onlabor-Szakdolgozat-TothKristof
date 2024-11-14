package com.onlabor.backendapp.restaurant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.onlabor.backendapp.user.AppUser;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    @Query("SELECT r FROM Restaurant r ORDER BY CASE WHEN r.rating IS NULL THEN 1 ELSE 0 END, r.rating DESC")
    List<Restaurant> findAllOrderByRatingAscNullsLast();

    void deleteByUser(AppUser user);
}
