import './MapContainer.css';

import React, {useState, useCallback} from 'react';
import { Plugins } from '@capacitor/core';


interface ContainerProps {
  name: string;
}

const MapContainer: React.FC<ContainerProps> = ({ name }) => {

  interface UserData {
  username: string;
  password: string;
  prevState: null
}


  const [loc, setLoc] = useState<UserData | null>(null);
  const { Geolocation } = Plugins;

  const getCurrentPosition = useCallback(async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    setLoc(coordinates);
  }, [coordinates]);

  return (
    <div className="container">
      <strong>{name}</strong>
      <div>
        <h1>Geolocation</h1>
        <p>Your location is:</p>
        <p>Latitude: {loc?.coords.latitude}</p>
        <p>Longitude: {loc?.coords.longitude}</p>

        <button onClick={getCurrentPosition}>
          Get Current Location
        </button>
      </div>

    </div>
  );
};

export default MapContainer;
