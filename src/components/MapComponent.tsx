import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {IonFab, IonFabButton, IonIcon} from "@ionic/react";
import {hourglassOutline} from "ionicons/icons";

const APIKEY = { key: "AIzaSyBUrQMoPl1VlDm8QQL4CdqZxZyyP63vW94" }
const someLatLng = {lat: 49.1152282, lng: 6.179302}
const defaultZoom = 16
const url = "https://journals.openedition.org/gallia/docannexe/image/1508/img-9.jpg"
const imageBounds = {
    north: 49.1272,
    south: 49.1078,
    east: 6.1888,
    west: 6.1625,
  };

const handleApiLoaded = (map:any, maps:any) => {
  // use map and maps objects
  console.log(map,maps)

   romanOverlay = new google.maps.GroundOverlay(
    url,
    imageBounds,{opacity:0.5}
  );
  myMap = map

};

const _onClick = (map:any) => {
  // use map and maps objects
  console.log(map)

};

const _flipOverlay = () => {
  console.log(currentOverlay)

  if (currentOverlay =="roman"){
    romanOverlay.setMap(null);
    //medievalOverlay.setMap(myMap);
    currentOverlay = "medieval"
  }

  else if (currentOverlay =="medieval"){
    //medievalOverlay.setMap(null);
    currentOverlay = ""
  }
  else{
    romanOverlay.setMap(myMap);
    currentOverlay = "roman"
  }

}

let myMap:any;
let romanOverlay:google.maps.GroundOverlay;
let currentOverlay:string = "";

const createMapOptions =  (maps:any) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl:false,
      fullscreenControl:false
      //styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

class MapComponent extends Component {


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={APIKEY}
          defaultCenter={someLatLng}
          defaultZoom={defaultZoom}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          onClick={_onClick}
          yesIWantToUseGoogleMapApiInternals
          options={createMapOptions}
        >

        </GoogleMapReact>
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{"margin-bottom":'50px'}}>

                <IonFabButton onClick={() => _flipOverlay()} >
                    <IonIcon icon={hourglassOutline} />
                  </IonFabButton>

        </IonFab>
      </div>
    );
  }
}

export default MapComponent;
