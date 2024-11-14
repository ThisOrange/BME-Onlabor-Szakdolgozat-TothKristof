package com.onlabor.backendapp.review;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getByRestaurant(Long restaurantId) {
        return reviewRepository.findByRestId(restaurantId);
    }

    public List<Review> getByUser(Long id) {
        return reviewRepository.findByUserId(id);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        if (reviewRepository.findById(id).orElse(null) != null)
            reviewRepository.deleteById(id);
    }

    @Transactional
    public void deleteReviewsByRestId(Long id) {
        reviewRepository.deleteByRestId(id);
    }

    @Transactional
    public void deleteReviewsByUserId(Long id) {
        reviewRepository.deleteByUserId(id);
    }

    public void deleteReviews() {
        reviewRepository.deleteAll();
    }
}
