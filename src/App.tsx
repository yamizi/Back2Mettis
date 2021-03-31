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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import TabHome from './pages/TabHome';
import TabStory from './pages/TabStory';
import MissionDetails from './pages/MissionDetails';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          <Route exact path="/home">
            <TabHome />
          </Route>


          <Route exact path="/story" component={TabStory}>

          </Route>


          <Route exact path="/map">
            <Tab1 />
          </Route>
          <Route exact path="/missions">
            <Tab2 />
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
            <Redirect to="/home" />
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
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={trophyOutline} />
            <IonLabel>Succès</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Autre</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
