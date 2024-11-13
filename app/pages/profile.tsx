import { useRouter } from "next/router";
import { useLoginContext } from "../src/components/LoginContext";
import { useEffect, useState } from "react";
import RestaurantList from "../src/components/restaurant/RestaurantList";
import ReviewsList from "../src/components/review/ReviewList";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const { setIsLoggedIn } = useLoginContext();
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("jwtToken");

    // Optionally, you can also reset any other application state here (e.g., isLoggedIn).

    // Redirect to the login page
    setIsLoggedIn(false);
    router.push("/"); // Or any other route like "/"
  };

  const getReviews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/user/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: ReviewData[] = await response.json();
      setReviews(result);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const getRestaurants = async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API
        }/api/user/restaurants?id=${localStorage.getItem("userId")}`,
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
    if (role === "USER") getReviews();
    else if (role == "RESTOWNER") getRestaurants();
  }, []);

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <div className="restaurant-container bg-white">
        <div className=" flex justify-between items-center w-full relative">
          <h1 className="text-center ">
            Welcome {localStorage.getItem("username")}!
          </h1>
          <button
            onClick={() => router.back()}
            className="my-2 px-2 py-1 rounded-md outline-slate-800 bg-slate-800 text-2xl font-bold cursor-pointer flex items-center absolute right-2 top-0"
          >
            <FaArrowLeft className="mx-2 text-white" />
          </button>
        </div>
        <div className="mt-4 px-10 w-full">
          <label className="block text-xl font-bold">
            Email: {localStorage.getItem("email")}
          </label>
          <label className="block text-xl font-bold">Role: {role}</label>
        </div>
        <div className="mt-4 px-10 w-full">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <h2>
          {role === "RESTOWNER" ? "Manage your restaurants:" : "My reviews:"}
        </h2>
        <div className="mt-4 px-10 w-full">
          {role === "RESTOWNER" ? (
            // You would render the list of restaurants here if role is "RESTOWNER"
            <RestaurantList restaurants={restaurants} /> // Replace with actual restaurant list
          ) : reviews.length > 0 ? (
            <ReviewsList reviews={reviews} isProfile={true} />
          ) : (
            <p>There are no reviews yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
