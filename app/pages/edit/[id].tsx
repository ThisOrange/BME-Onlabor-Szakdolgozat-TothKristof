import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PlacesAutocomplete from "../../src/components/PlacesAutocomplete";
import { FaArrowLeft } from "react-icons/fa";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the ID from the URL
  const { handleSubmit } = useForm();
  const [Name, setName] = useState<string>("");
  const [Location, setLocation] = useState<string>("");
  const [Menu, setMenu] = useState<string>("");
  const [Allergens, setAllergens] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/restaurants/${id}`
        );
        const restaurantData = await response.json();
        setName(restaurantData.name);
        setLocation(restaurantData.locationName);
        setMenu(restaurantData.menu);
        setAllergens(restaurantData.allergen);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    if (id !== "new") {
      fetchRestaurantData();
    }
  }, [id]);

  const onSubmit = async () => {
    if (Name && Location && Menu && Menu.length < 1000) {
      const geocodeResults = await getGeocode({ address: Location });
      const { lat, lng } = await getLatLng(geocodeResults[0]);

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API}/restaurants/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            name: Name,
            userId: localStorage.getItem("userId"),
            locationName: Location,
            location: [lat, lng],
            allergen: Allergens,
            menu: Menu,
          }),
        }
      ).then((res) => res.json());

      router.push("/profile");
    }

    if (!Name) {
      const error = document.getElementById("errorName");
      if (error != null) error.hidden = false;
    }

    if (!Location) {
      const error = document.getElementById("errorLocation");
      if (error != null) error.hidden = false;
    }

    if (Menu && Menu.length > 1000) {
      const error = document.getElementById("errorMenu");
      if (error != null) error.hidden = false;
    }
  };

  const handleAllergenChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    allergen: string
  ) => {
    if (e.target.checked) {
      // Add allergen to the list if checked
      setAllergens((prevAllergens) => [...prevAllergens, allergen]);
    } else {
      // Remove allergen from the list if unchecked
      setAllergens((prevAllergens) =>
        prevAllergens.filter(
          (existingAllergen) => existingAllergen !== allergen
        )
      );
    }
  };

  const handleLocationChange = (address: string) => {
    setLocation(address); // Update the location when the user selects a suggestion
  };

  return (
    <div className="relative my-10 flex justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-96 px-2 py-1 rounded-md outline-slate-800 bg-slate-800 text-2xl font-bold cursor-pointer flex items-center"
      >
        <FaArrowLeft className="mx-2 text-white" />
      </button>

      <div className="flex flex-col justify-around">
        <p className="flex justify-center text-5xl text-emerald-400 font-bold">
          Edit Restaurant
        </p>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-10 flex flex-col justify-center"
          >
            <label className="flex flex-col py-1 text-lg font-bold">
              Restaurant name*:
              <input
                id="Name"
                className="my-2 w-100 px-2 py-1 rounded-md outline-emerald-400"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label
              id="errorName"
              className="text-red-500 font-bold"
              hidden={true}
            >
              Write the name of the restaurant!
            </label>

            <label className="flex flex-col py-1 text-lg font-bold">
              Location*:
              <PlacesAutocomplete
                setSelected={handleLocationChange}
                address={Location}
              />
            </label>
            <label
              id="errorLocation"
              className="text-red-500 font-bold"
              hidden={true}
            >
              Write the location of the restaurant!
            </label>

            <label className="flex flex-col py-5 text-lg font-bold">
              Available allergen-free products:
            </label>
            <div className="flex flex-row justify-start my-3">
              <input
                type="checkbox"
                id="Lactose"
                checked={Allergens.includes("Lactose")}
                onChange={(e) => handleAllergenChange(e, "Lactose")}
              />
              <label htmlFor="Lactose" className="mx-2">
                Lactose
              </label>

              <input
                type="checkbox"
                id="Peanuts"
                checked={Allergens.includes("Peanut")}
                onChange={(e) => handleAllergenChange(e, "Peanut")}
              />
              <label htmlFor="Peanuts" className="mx-2">
                Peanut
              </label>

              <input
                type="checkbox"
                id="Meat"
                checked={Allergens.includes("Meat")}
                onChange={(e) => handleAllergenChange(e, "Meat")}
              />
              <label htmlFor="Meat" className="mx-2">
                Meat
              </label>

              <input
                type="checkbox"
                id="Wheat"
                checked={Allergens.includes("Wheat")}
                onChange={(e) => handleAllergenChange(e, "Wheat")}
              />
              <label htmlFor="Wheat" className="mx-2">
                Wheat
              </label>
            </div>
            <div className="flex flex-row justify-start">
              <input
                type="checkbox"
                id="Gluten"
                checked={Allergens.includes("Gluten")}
                onChange={(e) => handleAllergenChange(e, "Gluten")}
              />
              <label htmlFor="Gluten" className="mx-2">
                Gluten
              </label>

              <input
                type="checkbox"
                id="Egg"
                checked={Allergens.includes("Egg")}
                onChange={(e) => handleAllergenChange(e, "Egg")}
              />
              <label htmlFor="Egg" className="mx-2">
                Egg
              </label>

              <input
                type="checkbox"
                id="Crustacean"
                checked={Allergens.includes("Crustacean")}
                onChange={(e) => handleAllergenChange(e, "Crustacean")}
              />
              <label htmlFor="Crustacean" className="mx-2">
                Crustacean
              </label>

              <input
                type="checkbox"
                id="Soy"
                checked={Allergens.includes("Soy")}
                onChange={(e) => handleAllergenChange(e, "Soy")}
              />
              <label htmlFor="Soy" className="mx-2">
                Soy
              </label>
            </div>

            <div className="my-5 flex flex-col">
              <label htmlFor="Menu" className="py-1 text-lg font-bold">
                Add Menu:
              </label>
              <textarea
                id="Menu"
                className="my-2 h-52 px-2 py-1 rounded-md outline-emerald-400"
                value={Menu}
                onChange={(e) => setMenu(e.target.value)}
              />
              <label
                id="errorMenu"
                className="text-red-500 font-bold"
                hidden={true}
              >
                Menu is more than 1000 characters!
              </label>
              <input
                type="submit"
                id="Create"
                value={id === "new" ? "Create" : "Update"}
                className="my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
