import { useEffect, useState } from "react";
import CommentsList from "../src/components/comment/CommentList";
import { useLoginContext } from "../src/components/LoginContext";
import StarRating from "../src/components/comment/StarRating"; // Import the updated StarRating component

interface Props {
  id: string;
}

const New = ({ id }: Props) => {
  const { isLoggedIn } = useLoginContext();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [hasCommented, setHasCommented] = useState<boolean>(false);

  const getRestaurant = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/restaurants/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: Restaurant = await response.json();
      setRestaurant(result);
      console.log(`id: ${id}, ${result.locationName}`);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/restaurant/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result: CommentData[] = await response.json();
      setComments(result);
      const userId = localStorage.getItem("userId");
      if (
        userId &&
        result.some((comment) => comment.userId === parseInt(userId, 10))
      ) {
        setHasCommented(true);
        setShowForm(false); // Hide the form if the user has commented
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce(
      (sum, comment) => sum + comment.rating,
      0
    );
    const averageRating = totalRating / comments.length;
    return Math.round(averageRating * 10) / 10; // Round to the nearest tenth
  };

  useEffect(() => {
    getRestaurant();
    getComments();
  }, [id]);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (commentText.trim() === "") return; // Do not submit if comment is empty
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restId: id,
          userId: localStorage.getItem("userId"),
          userName: localStorage.getItem("username"),
          comment: commentText,
          rating: rating, // Send the rating along with the comment
        }),
      });
      if (response.ok) {
        setCommentText(""); // Clear the form after successful submission
        setRating(1); // Reset the rating to default value
        setShowForm(false);
        getComments(); // Refresh the comments list
      } else {
        console.error("Failed to post the comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <div className="restaurant-container bg-white p-4 rounded-md shadow-lg w-full max-w-3xl">
        {restaurant && <h1>{restaurant.name}</h1>}
        {restaurant && <h2>{restaurant.locationName}</h2>}

        {/* Display the average rating */}
        <div>
          <h3>
            Rating: {averageRating}
            <StarRating
              initialRating={averageRating || 0}
              isReadOnly={true} // Make the StarRating component read-only
            />
          </h3>
        </div>

        {restaurant && (
          <h3>
            No allergens:{" "}
            {restaurant.allergen.map((allergen, index) => (
              <span key={index}>
                {allergen}
                {index < restaurant.allergen.length - 1 && ","}{" "}
              </span>
            ))}
          </h3>
        )}

        <h3>Menu:</h3>
        {restaurant && (
          <p
            dangerouslySetInnerHTML={{
              __html: restaurant.menu.replace(/\n/g, "<br>"),
            }}
          ></p>
        )}

        <h3>Comments:</h3>
        {showForm && isLoggedIn && !hasCommented && (
          <div className="w-full">
            <h3>Leave a comment:</h3>
            <div className="mt-4 px-10 w-full">
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                {/* Comment Textarea */}
                <div className="flex flex-col w-full">
                  <label htmlFor="comment" className="font-medium mb-2">
                    Comment:
                  </label>
                  <textarea
                    id="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                    rows={4}
                    className="w-full max-w-3xl p-2 border rounded resize-none"
                    style={{
                      width: "100%", // Take up 100% of the parent container
                      height: "auto", // Height will adjust based on rows
                      boxSizing: "border-box", // Ensure padding and borders are part of the width calculation
                    }}
                  />
                </div>

                {/* Star Rating */}
                <div className="flex flex-col w-full">
                  <label htmlFor="rating" className="font-medium mb-2">
                    Rating:
                  </label>
                  <StarRating
                    initialRating={rating}
                    setRating={setRating}
                    isReadOnly={false}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Comment"}
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4 px-10 w-full">
          {comments.length > 0 ? (
            <CommentsList comments={comments} />
          ) : (
            <p>There are no reviews yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default New;

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  return { props: { id } };
}
