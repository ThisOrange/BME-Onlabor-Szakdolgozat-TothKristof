package com.onlabor.backendapp.restaurant;

import java.util.List;

public class RestaurantDTO {
    private Long userId;
    private String name;
    private String locationName;
    private List<Double> location;
    private List<String> allergen;
    private String menu;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public List<Double> getLocation() {
        return location;
    }

    public void setLocation(List<Double> location) {
        this.location = location;
    }

    public List<String> getAllergen() {
        return allergen;
    }

    public void setAllergen(List<String> allergen) {
        this.allergen = allergen;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }
}
