import React from "react";
import StarRating from "./StarRating"; // Import the StarRating component

interface CommentProps {
  user: string;
  rating: number;
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ user, rating, comment }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <h4>{user}</h4>
        <StarRating initialRating={rating} isReadOnly={true} />
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
