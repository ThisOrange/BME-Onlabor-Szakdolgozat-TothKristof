import React from "react";
import Comment from "./Comment";

interface CommentData {
  id: number;
  userName: string;
  rating: number;
  comment: string;
}

interface CommentsListProps {
  comments: CommentData[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => (
  <div className="comments-list">
    {comments.map((comment) => (
      <Comment
        key={comment.id}
        user={comment.userName}
        rating={comment.rating}
        comment={comment.comment}
      />
    ))}
  </div>
);

export default CommentsList;
