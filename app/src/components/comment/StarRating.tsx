import React from "react";

// Define the props interface
interface StarRatingProps {
  initialRating: number | null; // Allow initialRating to be null
  setRating: React.Dispatch<React.SetStateAction<number>>; // Function to set the rating
  isReadOnly?: boolean; // Optional: If the rating should be read-only (default false)
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating,
  setRating,
  isReadOnly = false,
}) => {
  const handleRatingChange = (currentRate: number) => {
    if (!isReadOnly) {
      setRating(currentRate); // Update the parent component's rating
    }
  };

  const starStyle = {
    width: "24px",
    height: "24px",
    cursor: isReadOnly ? "default" : "pointer",
    margin: "0 2px",
  };

  // Function to determine how much of a star to fill (percentage)
  const getStarFill = (index: number) => {
    if (initialRating && initialRating >= index + 1) return 100; // Full star
    if (initialRating && initialRating > index && initialRating < index + 1)
      return 50; // Half star
    return 0; // Empty star
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        const fillPercentage = getStarFill(index); // Get the fill percentage for the star

        return (
          <label key={index} style={{ display: "inline-block" }}>
            <input
              type="radio"
              name={`rate-${index}`}
              value={currentRate}
              checked={initialRating !== null && currentRate <= initialRating}
              onChange={() => handleRatingChange(currentRate)}
              disabled={isReadOnly}
              style={{ display: "none" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={starStyle}
            >
              {/* Grey background with black border for the star */}
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="lightgrey"
                stroke="black"
                strokeWidth="1"
              />
              {/* Conditional yellow fill for half or full star */}
              {fillPercentage > 0 && (
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill="yellow"
                  stroke="black"
                  strokeWidth="1"
                  style={{
                    clipPath:
                      fillPercentage === 50
                        ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                        : "none",
                  }}
                />
              )}
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
