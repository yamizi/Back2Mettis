import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { mapOutline, appsOutline, trophyOutline, settingsOutline, peopleOutline } from 'ionicons/icons';
import TabMap from './pages/TabMap';
import TabMissions from './pages/TabMissions';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import TabHome from './pages/TabHome';
import TabStory from './pages/TabStory';
import MissionDetails from './pages/MissionDetails';
import { initStore } from './store';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {Provider} from "react-redux";
import React from "react";
import { setNovel } from './store/actions/novelActions';
import { setScene } from './store/actions/sceneActions';
import novelData from './data/novel.json';

import { NovelType } from './types/types';


const { store } = initStore();
var novel: NovelType = novelData;

for (var sceneId of Object.keys(novel.scenes)){
  let scene = novel.scenes[sceneId]
  if (scene.visible == undefined){
    novel.scenes[sceneId].visible = 1
  }
  novel.scenes[sceneId].userId = 0
}

if (novel) {
  store.dispatch(setNovel(novel));


  store.dispatch(setScene(novel.scenes.start))
}

const App: React.FC = () => (
  <IonApp>
    <Provider store={store}>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/story" >
            <TabStory></TabStory>
          </Route>


          <Route exact path="/map">
            <TabMap />
          </Route>
          <Route exact path="/missions">
            <TabMissions />
          </Route>

          <Route exact path="/missions/:id" component={MissionDetails}>
          </Route>

          <Route path="/tab3">
            <Tab3 />
          </Route>

          <Route path="/tab4">
            <Tab4 />
          </Route>
          <Route exact path="/">
            <Redirect to="/story" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tabstory" href="/story">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Aventure</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab1" href="/map">
            <IonIcon icon={mapOutline} />
            <IonLabel>Carte</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab2" href="/missions">
            <IonIcon icon={appsOutline} />
            <IonLabel>Missions</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3" disabled={true}>
            <IonIcon icon={trophyOutline} />
            <IonLabel>Inventaire</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab4" href="/tab4" disabled={true}>
            <IonIcon icon={settingsOutline} />
            <IonLabel>Réglages</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
