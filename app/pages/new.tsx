import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import PlacesAutocomplete from "../src/components/PlacesAutocomplete";
import { FaArrowLeft } from "react-icons/fa";

const New = () => {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const [Name, setName] = useState<string>();
  const [Location, setLocation] = useState<string>("");
  const [Menu, setMenu] = useState<string>();
  const [Allergens, setAllergens] = useState<string[]>([]);

  const addAllergen = (newString: string) => {
    setAllergens((prevStrings) => [...prevStrings, newString]);
  };

  const deleteAllergen = (stringValue: string) => {
    setAllergens((prevStrings) => {
      const updatedStrings = prevStrings.filter(
        (string) => string !== stringValue
      );
      return updatedStrings;
    });
  };

  const onSubmit = async () => {
    console.log(Location);
    if (Name && Location && Menu && Menu.length < 1000) {
      const geocodeResults = await getGeocode({ address: Location });
      const { lat, lng } = await getLatLng(geocodeResults[0]);

      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/restaurants`, {
        method: "post",
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
      }).then((res) => res.json());
      router.back();
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

    console.log(`Name: ${Name}`);
    console.log(`Location: ${Location}`);
    console.log(`Menu: ${Menu}`);
    console.log(`Allergens: ${Allergens}`);
  };

  const nameChange = (e: any) => {
    setName(e.target.value);
  };

  const menuChange = (e: any) => {
    setMenu(e.target.value);
  };

  const handleAllergenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allergen = e.target.id;
    if (e.target.checked) {
      addAllergen(allergen); // Add allergen
    } else {
      deleteAllergen(allergen); // Remove allergen
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
      <div className=" flex justify-center">
        <div className="flex flex-col justify-around">
          <p className="flex justify-center text-5xl text-emerald-400 font-bold">
            Point Creation
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
                  onChange={nameChange}
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
                <PlacesAutocomplete setSelected={handleLocationChange} />
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
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Lactose" className="mx-2">
                  Lactose
                </label>

                <input
                  type="checkbox"
                  id="Peanut"
                  checked={Allergens.includes("Peanut")}
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Peanut" className="mx-2">
                  Peanut
                </label>

                <input
                  type="checkbox"
                  id="Meat"
                  checked={Allergens.includes("Meat")}
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Meat" className="mx-2">
                  Meat
                </label>

                <input
                  type="checkbox"
                  id="Wheat"
                  checked={Allergens.includes("Wheat")}
                  onChange={handleAllergenChange}
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
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Gluten" className="mx-2">
                  Gluten
                </label>

                <input
                  type="checkbox"
                  id="Egg"
                  checked={Allergens.includes("Egg")}
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Egg" className="mx-2">
                  Egg
                </label>

                <input
                  type="checkbox"
                  id="Crustacean"
                  checked={Allergens.includes("Crustacean")}
                  onChange={handleAllergenChange}
                />
                <label htmlFor="Crustacean" className="mx-2">
                  Crustacean
                </label>

                <input
                  type="checkbox"
                  id="Soy"
                  checked={Allergens.includes("Soy")}
                  onChange={handleAllergenChange}
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
                  onChange={menuChange}
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
                  value="Create"
                  className="my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
