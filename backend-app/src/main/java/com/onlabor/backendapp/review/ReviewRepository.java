package com.onlabor.backendapp.review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByRestId(Long restaurantId);

    List<Review> findByUserId(Long userId);

    void deleteByRestId(Long restaurantId);

    void deleteByUserId(Long userId);
}
