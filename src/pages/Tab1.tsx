import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList } from '@ionic/react';
import{ Component, MouseEvent } from 'react';

import MapContainer from '../components/MapContainer';
import MapComponent from "../components/MapComponent";

import './Tab1.css';

const Tab1: React.FC = (myprops) => {




  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{height: '100vh'}}>

            <MapComponent></MapComponent>
        </div>

          <IonFab vertical="bottom" horizontal="end" slot="fixed">

        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
