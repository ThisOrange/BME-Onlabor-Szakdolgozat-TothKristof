package com.onlabor.backendapp.restaurant;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onlabor.backendapp.user.AppUser;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private AppUser user;
    private String name;
    private String locationName;
    private List<Double> location;
    private List<String> allergen;
    private String menu;
    private Float rating;
}
