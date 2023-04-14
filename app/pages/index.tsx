import type { NextPage } from 'next';
import { GoogleMap, useLoadScript, Marker, useGoogleMap} from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete,{
  getGeocode,
  getLatLng,
}from "use-places-autocomplete"
import{
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
}from"@reach/combobox"


const center = {
  lat: 47.497913,
  lng: 19.040236
};


export default function Home(){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries:["places"],
  })

  

  if(!isLoaded){
    return <label>Loading...</label>
  }
  else return <Map/>
}


  function Map(){
    const [selected,setSelected]=useState(null);
    const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map)=>{
    mapRef.current=map;
  },[]);

  const panTo = React.useCallback(({lat,lng})=>{
    mapRef.current.panTo({lat,lng});
}, []);
  return (
    
  <div>
<div className="places-container">
<PlacesAutocomplete setSelected={setSelected} panTo={panTo}></PlacesAutocomplete>
</div>
<GoogleMap mapContainerClassName="map-Style" onLoad={onMapLoad} center={center} zoom={15} options={{zoomControl:false, streetViewControl:false, mapTypeControl: false, fullscreenControl: false}}>

</GoogleMap>
  </div>
  );
  }

  const PlacesAutocomplete=({setSelected,panTo})=>{
    const {ready,  value, setValue, suggestions:{status,data}, clearSuggestions} = usePlacesAutocomplete();

  const handleSelect= async (address)=>{
    setValue(address,false);
    clearSuggestions();

    const results= await getGeocode({address});
    const {lat,lng} = await getLatLng(results[0]);
    setSelected(lat,lng);
    panTo({lat,lng});
  }

    return  (<Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Search Address"/>
      <ComboboxPopover style={{ zIndex: 3000 }}>
        <ComboboxList style={{ background: "White"}}>
          {status === "OK" && data.map(({place_id,description}) => <ComboboxOption key={place_id} value={description}/>)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    );
  }


  
  