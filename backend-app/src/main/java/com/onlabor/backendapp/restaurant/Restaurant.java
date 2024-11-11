package com.onlabor.backendapp.restaurant;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.onlabor.backendapp.review.Review;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String locationName;
    private List<Double> location;
    private List<String> allergen;
    private String menu;
}
