import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useRouter } from "next/router";
import StarRating from "../src/components/StarRating/StarRating";

const libraries: ["places"] = ["places"];

const blueEssenceStyle = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#1E293B",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#5988A1",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#5988A1",
      },
    ],
  },
];

const center = {
  lat: 47.497913,
  lng: 19.040236,
};

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) {
    return <label>Loading...</label>;
  } else {
    return <Map />;
  }
}

function Map() {
  const [selected, setSelected] = useState(null);
  const mapRef = useRef<any>(null);
  const router = useRouter();
  const [markers, setMarkers] = useState<JSX.Element[]>([]);
  const [Allergens, setAllergens] = useState<string[]>([]);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<Restaurant | null>(
    null
  );

  const refreshMarkers = () => {
    const getRestaurants = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/restaurants`,
          {
            method: "GET", // If you are only fetching data
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    const markerClick = async (id: number) => {
      router.query.id = id.toString();
      router.push({ pathname: `/${id.toString()}` });
    };

    getRestaurants()
      .then((restaurants) => {
        const markerOptions = {
          icon: {
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            scale: 1.5,
            fillColor: "#34D399",
            fillOpacity: 1,
            strokeColor: "#1F2937",
            anchor: new google.maps.Point(12, 24),
          },
        };

        const restaurantMarkers = restaurants
          .filter((restaurant: Restaurant) =>
            restaurant.allergen.some((allergen) => Allergens.includes(allergen))
          )
          .map((restaurant: Restaurant) => (
            <Marker
              key={restaurant.id}
              options={markerOptions}
              onClick={() => markerClick(restaurant.id)}
              onMouseOver={() => setHoveredRestaurant(restaurant)}
              onMouseOut={() => setHoveredRestaurant(null)}
              position={{
                lat: restaurant.location[0],
                lng: restaurant.location[1],
              }}
            />
          ));

        setMarkers(restaurantMarkers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allChange = (e: any, allergen: string) => {
    if (e.target.checked === true) {
      setAllergens((prevAllergens) => [...prevAllergens, allergen]);
    } else
      setAllergens((prevAllergens) =>
        prevAllergens.filter((a) => a !== allergen)
      );
  };

  useEffect(() => {
    refreshMarkers();
  }, [Allergens]);

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);
  return (
    <div>
      <div className="places-container">
        <div className="h-14 flex flex-col justify-start bg-emerald-400 background-color-black rounded-lg">
          <div className="mx-2 my-2 align-middle">
            <PlacesAutocomplete
              setSelected={setSelected}
              panTo={panTo}
            ></PlacesAutocomplete>
          </div>
        </div>
      </div>
      <div className="allergen-container">
        <div className="h-36 w-52 flex flex-col justify-start bg-slate-800 text-white">
          <div className=" flex flex-row justify-start my-1 mx-3">
            <input
              type="checkbox"
              id="Lactose"
              onChange={(e) => allChange(e, "Lactose")}
            ></input>
            <label htmlFor="Lactose" className="mx-2">
              Lactose{" "}
            </label>

            <div className="right-allergen">
              <input
                type="checkbox"
                id="Peanuts"
                onChange={(e) => allChange(e, "Peanut")}
              ></input>
              <label htmlFor="Peanuts" className="mx-2">
                Peanut{" "}
              </label>
            </div>
          </div>
          <div className=" flex flex-row justify-start my-1 mx-3">
            <input
              type="checkbox"
              id="Meat"
              onChange={(e) => allChange(e, "Meat")}
            ></input>
            <label htmlFor="Meat" className="mx-2">
              Meat{" "}
            </label>

            <div className="right-allergen">
              <input
                type="checkbox"
                id="Wheat"
                onChange={(e) => allChange(e, "Wheat")}
              ></input>
              <label htmlFor="Wheat" className="mx-2">
                Wheat{" "}
              </label>
            </div>
          </div>

          <div className=" flex flex-row justify-start my-1 mx-3">
            <input
              type="checkbox"
              id="Gluten"
              onChange={(e) => allChange(e, "Gluten")}
            ></input>
            <label htmlFor="Gluten" className="mx-2">
              Gluten
            </label>
            <div className="right-allergen">
              <input
                type="checkbox"
                id="Egg"
                onChange={(e) => allChange(e, "Egg")}
              ></input>
              <label htmlFor="Egg" className="mx-2">
                Egg
              </label>
            </div>
          </div>
          <div className=" flex flex-row justify-start my-1 mx-3">
            <input
              type="checkbox"
              id="Crustacean"
              onChange={(e) => allChange(e, "Crustacean")}
            ></input>
            <label htmlFor="Crustacean" className="mx-2">
              Crustacean
            </label>
            <div className="right-allergen">
              <input
                type="checkbox"
                id="Soy"
                onChange={(e) => allChange(e, "Soy")}
              ></input>
              <label htmlFor="Soy" className="mx-2">
                Soy
              </label>
            </div>
          </div>
        </div>
      </div>
      <GoogleMap
        mapContainerClassName="map-Style"
        onLoad={onMapLoad}
        center={center}
        zoom={12}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: blueEssenceStyle,
        }}
      >
        {markers}
        {hoveredRestaurant && (
          <InfoBox
            position={
              new google.maps.LatLng(
                hoveredRestaurant.location[0],
                hoveredRestaurant.location[1]
              )
            }
            onCloseClick={() => setHoveredRestaurant(null)} // Close info box on close
            options={{
              boxStyle: {
                backgroundColor: "#ffffff", // Set the background color
                border: "2px solid #34D399", // Set the border color
                borderRadius: "8px", // Set border radius
                padding: "10px", // Add padding inside the box
                fontSize: "14px", // Set font size
                color: "#333333", // Set text color
                width: "400px", // Set width of the info box
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional box shadow for effect
              },
              closeBoxURL: "", // Hide the default close button if desired
            }}
          >
            <div>
              <div className="restaurant-header">
                <h4 className="font-bold text-xl">{hoveredRestaurant.name}</h4>
              </div>
              <div className="flex py-2">
                <StarRating
                  initialRating={hoveredRestaurant.rating}
                  isReadOnly={true}
                />
                <h4 className="text-xl px-2">
                  {(hoveredRestaurant.rating ?? 0).toFixed(1)}
                </h4>
              </div>
              <div className="flex mb-2">
                <h4 className=" mr-2">Location: </h4>
                <p className="mx-0">{hoveredRestaurant.locationName}</p>
              </div>
              <div className="flex">
                <h4 className="mr-2 whitespace-nowrap">Excluded-Allergens:</h4>
                <p className="mx-0">{hoveredRestaurant.allergen.join(", ")}</p>
              </div>
            </div>
          </InfoBox>
        )}
      </GoogleMap>
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected, panTo }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    panTo({ lat, lng });
  };

  return (
    <div className="">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input border rounded-md w-full"
        placeholder="Search Address"
      />

      {status === "OK" && (
        <ul className="suggestion-item w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto m-0">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className=" cursor-pointer hover:bg-gray-200"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
