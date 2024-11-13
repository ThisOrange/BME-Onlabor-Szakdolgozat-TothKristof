import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import router from "next/router";
import { FaTrash, FaEdit } from "react-icons/fa";

interface CommentProps {
  restaurant: string;
  rating: number;
  id: number;
  location: string;
}

const Restaurant: React.FC<CommentProps> = ({
  restaurant,
  rating,
  id,
  location,
}) => {
  const [deleted, setDeleted] = useState(false); // State to track if the restaurant is deleted

  const handleNameClick = () => {
    router.query.id = id.toString();
    router.push({ pathname: `/${id.toString()}` });
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (confirmDelete) {
      try {
        // Step 1: Delete reviews associated with the restaurant
        const reviewsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reviews/restaurant/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!reviewsResponse.ok) {
          throw new Error("Failed to delete reviews");
        }

        // Step 2: Delete restaurant
        const restaurantResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API}/restaurants/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!restaurantResponse.ok) {
          throw new Error("Failed to delete restaurant");
        }

        // After successful deletion, update the state to hide the component
        setDeleted(true);
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }
  };

  const handleEditClick = () => {
    router.push(`/edit/${id}`);
  };

  // If deleted is true, return null to remove the component from the UI
  if (deleted) return null;

  return (
    <div className="restaurant flex justify-between items-middle">
      <div className="mb-2">
        <div className="restaurant-header">
          <h3
            onClick={handleNameClick}
            className=" max-w-xs mr-0 pr-0 text-lg cursor-pointer font-bold"
          >
            {restaurant}
          </h3>
          <h4 className="flex mt-4 mr-0 text-2lg ">
            <StarRating initialRating={rating} isReadOnly={true} />
            {(rating ?? 0).toFixed(1)}
          </h4>
        </div>
        <div className="flex">
          <p className="mr-2 font-semibold">Id: </p>
          <p className="ml-0 ">{id}</p>
        </div>
        <div className="flex">
          <p className="mr-2 font-semibold">Location: </p>
          <p className="ml-0 ">{location}</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleEditClick}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          <FaEdit style={{ color: "white" }} />
        </button>

        <button
          onClick={handleDeleteClick}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaTrash style={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
