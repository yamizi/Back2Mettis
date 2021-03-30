import './MapContainer.css';

import React, {useState, useCallback} from 'react';

import {GoogleMap, withGoogleMap, withScriptjs, GroundOverlay, Marker } from 'react-google-maps'
import {IonFabButton, IonIcon} from "@ionic/react";
import {arrowForwardCircle} from "ionicons/icons";

const someLatLng = {lat: 49.1152282, lng: 6.179302}
export const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBUrQMoPl1VlDm8QQL4CdqZxZyyP63vW94'
const url = "https://journals.openedition.org/gallia/docannexe/image/1508/img-9.jpg"
const imageBounds = {
    north: 49.127149,
    south: 49.1073,
    east: 6.1890,
    west: 6.1623,
  };

interface ContainerProps {
  name: string;
}

const MapContainer: React.FC<ContainerProps> = (myprops) => {

  type mapProp = { isRomanMap: boolean, isMarkerShown:boolean }

  let state = {isRomanOn: true};

     const MyGoogleMap = withScriptjs(withGoogleMap((props:mapProp) =>
        <GoogleMap
            defaultCenter={someLatLng}
            defaultZoom={16}
            options={{disableDefaultUI: true}}>

        {props.isRomanMap && <GroundOverlay
        url={url}
        bounds={imageBounds}
        options={{"opacity":80}}
        />}
        {props.isMarkerShown && <Marker position={someLatLng} />}
        </GoogleMap>))

    const loadingElement = <div/>
    const containerElement = <div style={{height: '100vh'}}/>
    const mapElement = <div style={{height: '100vh'}}/>
    const map = <MyGoogleMap loadingElement={loadingElement}
                             containerElement={containerElement}
                             googleMapURL={googleMapURL}
                             mapElement={mapElement}
                            isMarkerShown={false}
                            isRomanMap={state.isRomanOn}
    />


  return (
    <div className="container">
      <strong>{myprops.name}</strong>
      <div>
        <div style={{height: '100vh'}}>
            {map}
        </div>

        <IonFabButton onClick={() => state.isRomanOn = false}>
            <IonIcon icon={arrowForwardCircle} />
          </IonFabButton>

      </div>

    </div>
  );
};

export default MapContainer;
