import { useEffect, useState } from 'react';
import router from 'next/router';

interface Props {
    id: string;
  }

const New = ({ id }: Props) => {

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result: Restaurant = await response.json();
        setRestaurant(result);
        console.log(`id: ${id}, ${result.locationName}`);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    getRestaurant();
  }, [id]);


    return(
        <div>
            {restaurant && <label>{restaurant.location}</label>}
        </div>
    );
};

export default New;

export async function getServerSideProps(context: any) {
    const { id } = context.query;
  
    return { props: { id } };
  }