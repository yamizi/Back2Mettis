import React  from 'react';
import {IonSlides, IonSlide, IonContent, IonGrid, IonRow, IonToolbar, IonTitle, IonHeader, IonPage} from '@ionic/react';
import './TabStory.css';

import Novel from '../pages/Novel';

const TabStory: React.FC = () => {
  return (
  <IonPage>
    <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Story</IonTitle>
            </IonToolbar>
    </IonHeader>
    <IonContent>

          <Novel/>

    </IonContent>
  </IonPage>

  );
};

export default TabStory;
