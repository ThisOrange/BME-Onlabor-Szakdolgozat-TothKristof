import React from "react";
import StarRating from "../StarRating/StarRating"; // Import the StarRating component
import router from "next/router";

interface ReviewProps {
  restId: number;
  user: string;
  rating: number;
  comment: string;
  isProfile: boolean;
}

const Review: React.FC<ReviewProps> = ({
  restId,
  user,
  rating,
  comment,
  isProfile,
}) => {
  const handleClick = () => {
    router.push(`/${restId}`);
  };

  return (
    <div
      className="review"
      onClick={isProfile ? handleClick : undefined} // Only add onClick if isProfile is true
      style={{
        cursor: isProfile ? "pointer" : "default", // Only change cursor if isProfile is true
      }}
    >
      <div className="review-header mb-2">
        <h4 className="text-lg ">{user}</h4>
        <StarRating initialRating={rating} isReadOnly={true} />
      </div>
      <p className="mx-1 font-semibold">{comment}</p>
    </div>
  );
};

export default Review;
