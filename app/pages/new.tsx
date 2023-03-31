import { useState } from 'react';
import { useForm } from 'react-hook-form';

const New = () =>{
    const { handleSubmit } = useForm();
    const [Name, setName] = useState<string>();
    const [Location, setLocation] = useState<string>();
    const [Lactose, setLactose] = useState<boolean>();
    const [Peanut, setPeanut] = useState<boolean>();
    const [Meat, setMeat] = useState<boolean>();
    const [Gluten, setGluten] = useState<boolean>();
    const [Egg, setEgg] = useState<boolean>();
    const [Nut, setNut] = useState<boolean>();

    const onSubmit = async () =>{
        if(Name && Location){

        }
        if(!Name){
            const error = document.getElementById('errorName');
      if (error != null) error.hidden = false;
        }

        if(!Location){
            const error = document.getElementById('errorLocation');
      if (error != null) error.hidden = false;
        }
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
const lacChange = (e:any) =>{
    setLactose(e.target.value)
}
const peanChange = (e:any) =>{
    setPeanut(e.target.value)
}
const meatChange = (e:any) =>{
    setMeat(e.target.value)
}
const glutChange = (e:any) =>{
    setGluten(e.target.value)
}
const eggChange = (e:any) =>{
    setEgg(e.target.value)
}
const nutChange = (e:any) =>{
    setNut(e.target.value)
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
                    <label htmlFor="Lactose" className="mx-2">Lactose free</label>
                    <input type="checkbox" id="Peanuts" onChange={peanChange}></input>
                    <label htmlFor="Peanuts" className="mx-2">Peanut free</label>
                    <input type="checkbox" id="Meat" onChange={meatChange}></input>
                    <label htmlFor="Meat" className="mx-2">Meat free</label>
                    
                </div>
                <div className=" flex flex-row justify-start">
                <input type="checkbox" id="Gluten" onChange={glutChange}></input>
                <label htmlFor="Gluten" className="mx-2">Gluten free</label>

                <input type="checkbox" id="Egg" onChange={eggChange}></input>
                <label htmlFor="Egg" className="mx-2">Egg free</label>

                <input type="checkbox" id="Nut" onChange={nutChange}></input>
                <label htmlFor="Nut" className="mx-2">Nut free</label>
                </div>
                
            
            <div className="my-5 flex flex-col ">
            <label htmlFor="Menu" className=" py-1 text-lg font-bold">Add Menu:</label>
            <textarea id="Menu" className=" my-2 h-52 px-2 py-1 rounded-md outline-emerald-400"></textarea>
            <input type="submit" id="Create" value="Create" className=" my-10 h-12 px-2 py-1 rounded-md outline-emerald-400 bg-emerald-400 text-2xl font-bold cursor-pointer" ></input>
            </div>
            </form>
            </div>
            
        </div>
    </div>
)
}
export default New;
