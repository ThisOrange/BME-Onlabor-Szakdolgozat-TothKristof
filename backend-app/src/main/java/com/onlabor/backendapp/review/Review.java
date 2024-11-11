package com.onlabor.backendapp.review;

import com.onlabor.backendapp.restaurant.Restaurant;
import com.onlabor.backendapp.user.AppUser;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long restId;
    private Long userId;
    private String userName;
    private String comment;
    private Long rating;
}
