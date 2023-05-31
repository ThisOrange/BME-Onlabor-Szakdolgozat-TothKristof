import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleMap, useLoadScript, Marker, useGoogleMap} from '@react-google-maps/api';
import usePlacesAutocomplete,{
    getGeocode,
    getLatLng,
  }from "use-places-autocomplete"

const New = () =>{
    const { handleSubmit } = useForm();
    const [Name, setName] = useState<string>();
    const [Location, setLocation] = useState<string>();
    const [Menu, setMenu] = useState<string>();
    const [Allergens, setAllergens] = useState<string[]>([]);
    const addAllergen = (newString: string) => {
        setAllergens(prevStrings => [...prevStrings, newString]);
      };
      const deleteAllergen = (stringValue: string) => {
        setAllergens(prevStrings => {
          const updatedStrings = prevStrings.filter(string => string !== stringValue);
          return updatedStrings;
        });
    };

    const onSubmit = async () =>{
        if(Name && Location){
            const geocodeResults = await getGeocode({ address: Location });
            const { lat, lng } = await getLatLng(geocodeResults[0]);

            const result = await fetch(`http://localhost:8080/restaurants`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: Name, locationName: Location ,location: [lat,lng], allergen: Allergens, menu: Menu}),
              }).then(res => res.json());

              console.log(await result);

        }
        if(!Name){
            const error = document.getElementById('errorName');
      if (error != null) error.hidden = false;
        }

        if(!Location){
            const error = document.getElementById('errorLocation');
      if (error != null) error.hidden = false;
        }
          
          console.log(`Name: ${Name}`);
          console.log(`Location: ${Location}`);
          console.log(`Menu: ${Menu}`);
          console.log(`Allergens: ${Allergens}`);
    };

    function getValue(value: boolean){
        alert(value)
    }

const nameChange = (e:any) =>{
    setName(e.target.value)
}
const locChange = (e:any) =>{
    setLocation(e.target.value)
}
const menuChange = (e:any) =>{
    setMenu(e.target.value)
}
const lacChange = (e:any) =>{
if(e.target.checked===true){
    addAllergen("Lactose")
}
else deleteAllergen("Lactose")
}
const peanChange = (e:any) =>{
    if(e.target.checked===true){
        addAllergen("Peanut")
    }
    else deleteAllergen("Peanut")
}
const meatChange = (e:any) =>{
    if(e.target.checked===true){
    addAllergen("Meat")
}
else deleteAllergen("Meat")
}
const wheatChange = (e:any) =>{
    if(e.target.checked===true){
    addAllergen("Wheat")
}
else deleteAllergen("Wheat")
}
const glutChange = (e:any) =>{
    if(e.target.checked===true){
        addAllergen("Gluten")
    }
    else deleteAllergen("Gluten")
}
const eggChange = (e:any) =>{
    if(e.target.checked===true){
        addAllergen("Egg")
    }
    else deleteAllergen("Egg")
}
const crusChange = (e:any) =>{
    if(e.target.checked===true){
        addAllergen("Crustacean")
    }
    else deleteAllergen("Crustacean")
}
const soyChange = (e:any) =>{
    if(e.target.checked===true){
        addAllergen("Soy")
    }
    else deleteAllergen("Soy")
}

return(
    
    <div className="my-10 flex justify-center">
        <div className="flex flex-col justify-around">
            <p className="flex justify-center  text-5xl text-emerald-400 font-bold">Point Creation</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="my-10 flex flex-col justify-center">
                    
                <label className=" flex flex-col py-1 text-lg font-bold">Restaurant name:
                <input id="Name" className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400" onChange={nameChange}></input>
                </label>
                <label id="errorName" className=" text-red-500 font-bold" hidden={true}>
                Write the name of the restaurant!
                </label>

                <label className=" flex flex-col py-1 text-lg font-bold" >Location:
                <input id="Loc" className=" my-2 w-100 px-2 py-1 rounded-md outline-emerald-400" onChange={locChange}></input>
                </label>
                <label id="errorLocation" className=" text-red-500 font-bold" hidden={true}>
                Write the location of the restaurant!
                </label>
                
                <label className=" flex flex-col py-5 text-lg font-bold">Available allergen free products:</label>
                <div className=" flex flex-row justify-start my-3">
                    <input type="checkbox" id="Lactose" onChange={lacChange}></input>
                    <label htmlFor="Lactose" className="mx-2">Lactose </label>

                    <input type="checkbox" id="Peanuts" onChange={peanChange}></input>
                    <label htmlFor="Peanuts" className="mx-2">Peanut </label>

                    <input type="checkbox" id="Meat" onChange={meatChange}></input>
                    <label htmlFor="Meat" className="mx-2">Meat </label>

                    <input type="checkbox" id="Wheat" onChange={wheatChange}></input>
                    <label htmlFor="Wheat" className="mx-2">Wheat </label>
                    
                </div>
                <div className=" flex flex-row justify-start">
                <input type="checkbox" id="Gluten" onChange={glutChange}></input>
                <label htmlFor="Gluten" className="mx-2">Gluten</label>

                <input type="checkbox" id="Egg" onChange={eggChange}></input>
                <label htmlFor="Egg" className="mx-2">Egg</label>

                <input type="checkbox" id="Crustacean" onChange={crusChange}></input>
                <label htmlFor="Crustacean" className="mx-2">Crustacean</label>

                <input type="checkbox" id="Soy" onChange={soyChange}></input>
                <label htmlFor="Soy" className="mx-2">Soy</label>
                </div>
                
            
            <div className="my-5 flex flex-col ">
            <label htmlFor="Menu" className=" py-1 text-lg font-bold">Add Menu:</label>
            <textarea id="Menu" className=" my-2 h-52 px-2 py-1 rounded-md outline-emerald-400" onChange={menuChange}></textarea>
            <input type="submit" id="Create" value="Create" className=" my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer" ></input>
            </div>
            </form>
            </div>
            
        </div>
    </div>
)
}
export default New;
