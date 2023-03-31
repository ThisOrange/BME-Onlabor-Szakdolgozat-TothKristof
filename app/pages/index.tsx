import type { NextPage } from 'next';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
  width: '1920px',
  height: '872px'
};

const center = {
  lat: 47.497913,
  lng: 19.040236
};

const Home: NextPage = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if(!isLoaded){
    return <label>Not loaded</label>
  }
  
  return (
  <div>
<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>

</GoogleMap>
  </div>
  )
}

export default Home
