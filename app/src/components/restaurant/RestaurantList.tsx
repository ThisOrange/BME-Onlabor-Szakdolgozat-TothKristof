import Restaurant from "./Restaurant";

interface RestaurantsListProps {
  restaurants: RestaurantData[];
  isBest: boolean;
}

const RestaurantList: React.FC<RestaurantsListProps> = ({
  restaurants,
  isBest,
}) => (
  <div className="restaurants-list">
    {restaurants.map((restaurants) => (
      <Restaurant
        key={restaurants.id}
        restaurant={restaurants.name}
        rating={restaurants.rating}
        id={restaurants.id}
        location={restaurants.locationName}
        allergens={restaurants.allergen}
        isBest={isBest}
      />
    ))}
  </div>
);

export default RestaurantList;
