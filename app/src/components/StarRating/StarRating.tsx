import React from "react";

interface StarRatingProps {
  initialRating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  isReadOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating,
  setRating,
  isReadOnly = false,
}) => {
  const handleRatingChange = (currentRate: number) => {
    if (!isReadOnly) {
      setRating(initialRating === currentRate ? 0 : currentRate); // Toggle rating
    }
  };

  const starStyle = {
    width: "24px",
    height: "24px",
    cursor: isReadOnly ? "default" : "pointer",
    margin: "0 2px",
  };

  const getStarFill = (index: number) => {
    if (initialRating && initialRating >= index + 1) return 100;
    if (initialRating && initialRating > index && initialRating < index + 1)
      return 50;
    return 0;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        const fillPercentage = getStarFill(index);

        return (
          <label key={index} style={{ display: "inline-block" }}>
            <input
              type="radio"
              name="rating"
              value={currentRate}
              checked={initialRating === currentRate} // Only the exact current rating is checked
              onChange={() => handleRatingChange(currentRate)}
              disabled={isReadOnly}
              style={{ display: "none" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={starStyle}
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="lightgrey"
                stroke="black"
                strokeWidth="1"
              />
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
