import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import MapContainer from '../components/MapContainer';
import './Tab1.css';

//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

//<MapContainer name="Tab 1 page" />
import {GoogleMap, withGoogleMap, withScriptjs, GroundOverlay, Marker } from 'react-google-maps'

//const someLatLng = {lat: 55.751244, lng: 37.618423}
const someLatLng = {lat: 49.1152282, lng: 6.179302}//{ lat: 40.74, lng: -74.18 }//{lat: 49.1152282, lng: 6.179302}
export const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBUrQMoPl1VlDm8QQL4CdqZxZyyP63vW94'
const url = "https://journals.openedition.org/gallia/docannexe/image/1508/img-9.jpg"//"https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"//"ressources/img-9.jpg"
const imageBounds = {
    north: 49.127149,
    south: 49.1073,
    east: 6.1890,
    west: 6.1623,
  };

//new google.maps.LatLng(49.121635, 6.1657223),
//         new google.maps.LatLng(49.113714, 6.1813543)

const Tab1: React.FC = () => {

     const MyGoogleMap = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultCenter={someLatLng}
            defaultZoom={16}
            options={{disableDefaultUI: true}}>

        {props.isRomanMap && <GroundOverlay
        defaultUrl={url}
        defaultBounds={imageBounds}
      defaultOpacity={.8}
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
                            isMarkerShown={true}
                            isRomanMap={true}
    />


  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{height: '100vh'}}>
            {map}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
