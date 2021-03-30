import {  IonList, IonItem, IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>


        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle >En cours</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
              <IonItem button routerLink="/missions/1">
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Mega Man X</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>The Legend of Zelda</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pac-Man</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Super Mario World</IonLabel>
              </IonItem>
          </IonList>
            <IonHeader>
            <IonToolbar>
              <IonTitle >Finis</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
              <IonItem>
                <IonLabel>Pokémon Yellow</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Mega Man X</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>The Legend of Zelda</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Pac-Man</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Super Mario World</IonLabel>
              </IonItem>
          </IonList>
      </IonContent>

    </IonPage>
  );
};

export default Tab2;
