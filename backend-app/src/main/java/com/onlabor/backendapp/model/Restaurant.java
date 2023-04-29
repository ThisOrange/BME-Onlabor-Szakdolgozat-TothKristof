package com.onlabor.backendapp.model;

import java.util.List;

public class Restaurant {
    private int id;
    private String name;
    private String locationName;
    private List<Integer> location;
    private List<String> allergen;
    private String menu;


    public Restaurant(int id, String name, String locationName,List<Integer> location, List<String> allergen, String menu){
        this.id=id;
        this.name=name;
        this.locationName=locationName;
        this.location=location;
        this.allergen = allergen;
        this.menu=menu;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id=id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getLocationName(){
        return locationName;
    }

    public void setLocationName(String locationName){
        this.locationName=locationName;
    }

    public List<Integer> getLocation(){
        return location;
    }

    public void setLocation(List<Integer> location){
        this.location=location;
    }

    public List<String> getAllergen(){
        return allergen;
    }

    public void setDeadline(List<String> alergen){
        this.allergen =alergen;
    }

    public String getMenu(){
        return menu;
    }

    public void setMenu(String menu){
        this.menu=menu;
    }
}
