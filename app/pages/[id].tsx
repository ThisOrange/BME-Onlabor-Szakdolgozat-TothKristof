import { useEffect, useState } from "react";
import { useLoginContext } from "../src/components/LoginContext";
import StarRating from "../src/components/StarRating/StarRating"; // Import the updated StarRating component
import ReviewsList from "../src/components/review/ReviewList";
import router from "next/router";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  id: string;
}

const New = ({ id }: Props) => {
  const { isLoggedIn } = useLoginContext();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>();

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

  const getReviews = async () => {
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
      const result: ReviewData[] = await response.json();
      setReviews(result);
      const userId = localStorage.getItem("userId");
      if (
        userId &&
        result.some((review) => review.userId === parseInt(userId, 10))
      ) {
        setHasReviewed(true);
        setShowForm(false); // Hide the form if the user has commented
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return Math.round(averageRating * 10) / 10; // Round to the nearest tenth
  };

  const putRating = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/restaurants/rating?id=${id}`,
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

  useEffect(() => {
    getRestaurant();
    getReviews();
  }, [id]);

  useEffect(() => {
    const avgRating = calculateAverageRating();
    setAverageRating(avgRating);
  }, [reviews]);

  useEffect(() => {
    if (averageRating > 0) {
      putRating(); // Only call putRating when averageRating is updated
    }
  }, [averageRating]);

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (reviewText.trim() === "") return; // Do not submit if comment is empty
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
          comment: reviewText,
          rating: rating, // Send the rating along with the comment
        }),
      });
      if (response.ok) {
        putRating();
        setReviewText(""); // Clear the form after successful submission
        setRating(1); // Reset the rating to default value
        setShowForm(false);
        getReviews(); // Refresh the comments list
      } else {
        console.error("Failed to post the comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <div className="restaurant-container bg-white p-4 rounded-md shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center w-full relative">
          {restaurant && <h1>{restaurant.name}</h1>}
          <button
            onClick={() => router.back()}
            className=" my-2 px-2 py-1 rounded-md outline-slate-800 bg-slate-800 text-2xl font-bold cursor-pointer flex items-center absolute right-2 top-0"
          >
            <FaArrowLeft className="mx-2 text-white" />
          </button>
        </div>
        {restaurant && <h2>{restaurant.locationName}</h2>}

        {/* Display the average rating */}
        <div>
          <h3 className="font-semibold">
            Rating: {(averageRating ?? 0).toFixed(1)}
            <StarRating
              initialRating={averageRating || 0}
              isReadOnly={true} // Make the StarRating component read-only
            />
          </h3>
        </div>

        {restaurant && (
          <div className="flex items-center">
            <h3 className=" mt-4 mr-2 p-0">No allergens: </h3>
            {restaurant.allergen.map((allergen, index) => (
              <p className="mx-0 mt-4 mr-1 text-lg" key={index}>
                {allergen}
                {index < restaurant.allergen.length - 1 && ","}{" "}
              </p>
            ))}
          </div>
        )}

        <h3 className="mt-2 mb-2">Menu:</h3>
        {restaurant && (
          <p
            dangerouslySetInnerHTML={{
              __html: restaurant.menu.replace(/\n/g, "<br>"),
            }}
          ></p>
        )}

        <h3>Reviews:</h3>
        {showForm &&
          isLoggedIn &&
          !hasReviewed &&
          localStorage.getItem("role") !== "RESTOWNER" && (
            <div className="w-full">
              <h3>Leave a review:</h3>
              <div className="mt-4 px-10 w-full">
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="review" className="font-medium mb-2">
                      Review:
                    </label>
                    <textarea
                      id="review"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      rows={4}
                      className="w-full max-w-3xl p-2 border rounded resize-none"
                      style={{
                        width: "100%",
                        height: "auto",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          )}
        <div className="mt-4 px-10 w-full">
          {reviews.length > 0 ? (
            <ReviewsList reviews={reviews} isProfile={false} />
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
