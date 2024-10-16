import { useEffect, useState } from "react";
import router from "next/router";

interface Props {
  id: string;
}

const New = ({ id }: Props) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
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

    getRestaurant();
  }, [id]);

  return (
    <div className="flex flex-row justify-center text-slate-800">
      <rect className="restaurant-container bg-white">
        {restaurant && <h1>{restaurant.name}</h1>}
        {restaurant && <h2>{restaurant.locationName}</h2>}
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
      </rect>
    </div>
  );
};

export default New;

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  return { props: { id } };
}
