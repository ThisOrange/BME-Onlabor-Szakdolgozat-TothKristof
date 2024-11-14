import React from "react";
import Review from "./Review";

interface ReviewsListProps {
  reviews: ReviewData[];
  isProfile: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, isProfile }) => (
  <div className="reviews-list">
    {reviews.map((review) => (
      <Review
        key={review.id}
        restId={review.restId}
        revId={review.id}
        user={review.userName}
        rating={review.rating}
        comment={review.comment}
        isProfile={isProfile}
      />
    ))}
  </div>
);

export default ReviewsList;
