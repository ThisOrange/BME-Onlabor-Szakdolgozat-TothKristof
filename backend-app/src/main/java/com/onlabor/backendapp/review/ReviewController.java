package com.onlabor.backendapp.review;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/restaurant/{id}")
    public List<Review> getRestaurant(@PathVariable Long id) {
        return reviewService.getByRestaurant(id);
    }

    @GetMapping("/user/{id}")
    public List<Review> getUser(@PathVariable Long id) {
        return reviewService.getByUser(id);

    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        System.out.println("Went through");
        return reviewService.saveReview(review);
    }

    @DeleteMapping
    public String deleteReview(@RequestBody Long id) {
        reviewService.deleteReview(id);
        return "Review " + id + " removed!";
    }

    @DeleteMapping("/all")
    public String deleteReview() {
        reviewService.deleteReviews();
        return "Reviews removed!";
    }

}
