import { useRouter } from "next/router";
import { useLoginContext } from "../src/components/LoginContext";
import { useEffect, useState } from "react";
import RestaurantList from "../src/components/restaurant/RestaurantList";
import ReviewsList from "../src/components/review/ReviewList";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const role = localStorage.getItem("role");

  const getTopRestaurants = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/restaurants/best`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: RestaurantData[] = await response.json();
      setRestaurants(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getTopRestaurants();
  }, []);

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <div className="restaurant-container bg-white">
        <div className=" flex justify-center items-center w-full relative">
          <h1 className="text-center ">The Best Restaurants</h1>
          <button
            onClick={() => router.back()}
            className="my-2 px-2 py-1 rounded-md outline-slate-800 bg-slate-800 text-2xl font-bold cursor-pointer flex items-center absolute right-2 top-0"
          >
            <FaArrowLeft className="mx-2 text-white" />
          </button>
        </div>
        <div className="mt-4 px-10 w-full">
          <RestaurantList restaurants={restaurants} isBest={true} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
