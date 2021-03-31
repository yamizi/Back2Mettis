import React  from 'react';
import {IonSlides, IonSlide, IonContent, IonGrid, IonRow, IonToolbar, IonTitle, IonHeader, IonPage} from '@ionic/react';
import './TabStory.css';

import { Provider } from 'react-redux';
import { initStore } from '../store';
import { setNovel } from '../store/actions/novelActions';
import { setScene } from '../store/actions/sceneActions';
import novelData from '../mocks/novel.json';
import { NovelType } from '../types/types';
import Novel from '../pages/Novel';

const { store, persistor } = initStore();
const novel: NovelType = novelData;

const sceneId = 0

//if (novel) {
//  store.dispatch(setNovel(novel));
//  store.dispatch(setScene(novel.scenes[0]))
//}

const TabStory: React.FC = () => {
  return (
  <IonPage>
    <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Story</IonTitle>
            </IonToolbar>
    </IonHeader>
    <IonContent>

          {novel &&
          //<Provider store={store}>
              <Novel novel={novel} scene={novel.scenes.start} setScene={setScene}/>
          //</Provider>
          }
    </IonContent>
  </IonPage>

  );
};

export default TabStory;
