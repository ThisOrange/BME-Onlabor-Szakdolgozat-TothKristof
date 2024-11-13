import Restaurant from "./Restaurant";

interface RestaurantsListProps {
  restaurants: RestaurantData[];
}

const RestaurantList: React.FC<RestaurantsListProps> = ({ restaurants }) => (
  <div className="restaurants-list">
    {restaurants.map((restaurants) => (
      <Restaurant
        key={restaurants.id}
        restaurant={restaurants.name}
        rating={restaurants.rating}
        id={restaurants.id}
        location={restaurants.locationName}
      />
    ))}
  </div>
);

export default RestaurantList;
