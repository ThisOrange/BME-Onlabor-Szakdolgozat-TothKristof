package com.onlabor.backendapp.service;

import com.onlabor.backendapp.model.Restaurant;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    private List<Restaurant> restaurantList;

    public RestaurantService(){restaurantList=new ArrayList<>();}

    public Optional<Restaurant> getRestaurant(Integer id) {
        Optional optional=Optional.empty();
        for(Restaurant restaurant:restaurantList){
            if(id==restaurant.getId()){
                optional=Optional.of(restaurant);
                return optional;
            }
        }
        return optional;
    }

    public void addRestaurant(Restaurant restaurant){
        restaurant.setId(restaurantList.size()+1);
        restaurantList.add(restaurant);
    }
}
