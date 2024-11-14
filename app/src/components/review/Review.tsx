import React, { useState } from "react";
import StarRating from "../StarRating/StarRating"; // Import the StarRating component
import router from "next/router";
import { FaTrash } from "react-icons/fa";

interface ReviewProps {
  restId: number;
  revId: number;
  user: string;
  rating: number;
  comment: string;
  isProfile: boolean;
}

const Review: React.FC<ReviewProps> = ({
  restId,
  revId,
  user,
  rating,
  comment,
  isProfile,
}) => {
  const [deleted, setDeleted] = useState(false);
  const handleClick = () => {
    router.push(`/restaurant/${restId}`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (confirmDelete) {
      try {
        // Step 1: Delete reviews associated with the restaurant
        const reviewsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reviews/${revId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        if (!reviewsResponse.ok) {
          throw new Error("Failed to delete reviews");
        }
        setDeleted(true);
        putRating();
      } catch (error) {
        console.error("Error during deletion:", error);
      }
    }
  };

  const putRating = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/restaurant/${restId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reviews: ReviewData[] = await response.json();
      if (reviews.length === 0) return 0;

      // Calculate average rating
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
        Math.round((totalRating / reviews.length) * 10) / 10;

      // Update restaurant rating
      await fetch(
        `${process.env.NEXT_PUBLIC_API}/restaurants/rating?id=${restId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(averageRating),
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (deleted) return null;

  return (
    <div
      className="review flex justify-between items-middle"
      onClick={isProfile ? handleClick : undefined} // Only add onClick if isProfile is true
      style={{
        cursor: isProfile ? "pointer" : "default", // Only change cursor if isProfile is true
      }}
    >
      <div>
        <div className="review-header mb-2">
          <h4 className="text-lg ">{user}</h4>
          <StarRating initialRating={rating} isReadOnly={true} />
        </div>
        <p className="mx-1 font-semibold">{comment}</p>
      </div>
      {isProfile ? (
        <div className="flex justify-center items-center ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick();
            }}
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
      ) : null}
    </div>
  );
};

export default Review;
