import React from 'react';
import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import './TabHome.css';


// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};

const TabHome: React.FC = () => {
  return (
    <IonContent>

    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
      </IonSlide>
    </IonSlides>


  </IonContent>
  );
};

export default TabHome;
