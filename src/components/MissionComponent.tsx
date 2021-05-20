import React, {Component} from "react";
import {ButtonType, MapProps, MarkerType, SceneType, TextsType} from "../types/types";
import {NovelState, Saves, SceneState} from "../store/reducers/reducersTypes";
import {setScene} from "../store/actions/sceneActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
    IonContent, IonGrid,
    IonCol,
    IonHeader,
    IonRow,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonItemDivider,
    IonTextarea,
    IonInput
} from "@ionic/react";

import {addOutline, closeOutline, checkmarkOutline } from "ionicons/icons";
import { IonModal, IonButton, IonCheckbox, IonFab, IonIcon, IonFabButton  } from '@ionic/react';
import firebase from "../utils/Firebase";
require("firebase/firestore");
var db = firebase.firestore();


//const dbref = firebase.database().ref('adventure/')

class MissionComponent extends Component<MapProps> {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            showModal: false,
            new_scenes:[],
            new_buttons:[],
            new_game:{type:undefined, correctAnswer:"", question:"", successMessage:""},
            new_name:"",
            community_missions:[]
        };

        let community_missions = []
        db.collection("missions").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id}`,doc.data());
                let mission:SceneType = {id:doc.data().id, name:doc.data().id, image:doc.data().image,texts:doc.data().texts,buttons:doc.data().buttons,game:doc.data().game}
            });
        });
        /*

        db.collection("adventure").add({
            first: "Ada",
            last: "Lovelace",
            born: 1815
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
         */



    }

    submitMission = () => {
        let mission:SceneType = {id:"",image:"",texts:[],name:"",buttons:[]}
        let id = this.state.new_name.replace(/[^\w\s]/gi, '').trim().toLowerCase()+Date.now()
        mission.id =id
        mission.name = this.state.new_name
        mission.image = this.state.new_scenes[0].updatedImage
        mission.texts = []
        this.state.new_scenes.forEach((scene) => {
            let text_:TextsType = {text:scene.text,updatedImage:scene.updatedImage}
            mission.texts.push(text_)
        })

        mission.buttons = []
        this.state.new_buttons.forEach((button) => {
            if(button.text != ""){
                let btn:ButtonType = {text:button.text,redirectId:button.redirectId}
                mission.buttons.push(btn)
            }

        })

        mission.game = {type:this.state.new_game.type, correctAnswer:this.state.new_game.correctAnswer}
        if(this.state.new_game.type=="qrcode"){
            mission.texts.push({text:"Scanner le code QR code pour continuer",updatedImage:""})
            mission.texts.push({text:this.state.new_game.successMessage,updatedImage:""})
        }
        else if(this.state.new_game.type=="input"){
            mission.texts.push({text:this.state.new_game.question,updatedImage:""})
            mission.texts.push({text:this.state.new_game.successMessage,updatedImage:""})
        }

        mission.status = 0
        mission.status = 0
        console.log(mission)

        db.collection("missions").add(mission).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    };

    newBtnClick = () => {
        this.setShowModal(true, false)
    };

    newSceneBtnClick = () => {
        let scenes = this.state.new_scenes
        scenes.push({"updatedImage":"","text":""})
        this.setState({"new_scenes":scenes})
    };

    setShowModal = (visible:boolean, save:boolean) => {

        if(save) {
            this.submitMission()
        }
        else{
            this.setState({"new_scenes":[{"updatedImage":"","text":""}]})
        }
        this.setState({"showModal":visible})
    };

    setText = (label:string, txt:string) => {

        switch(label){
            case "new_name":{
                this.setState({"new_name":txt})
                break;
            }
            case "updated_image":{
                let scenes = this.state.new_scenes
                let indices = txt.split("###")
                scenes[indices[0]].updatedImage = indices[1]
                this.setState({"new_scenes":scenes})
                break;
            }
            case "text":{
                let scenes = this.state.new_scenes
                let indices = txt.split("###")
                scenes[indices[0]].text = indices[1]
                this.setState({"new_scenes":scenes})
                break;
            }
            case "game_answer":{
                let game = this.state.new_game
                game.correctAnswer = txt
                this.setState({"new_game":game})
                break;
            }
            case "riddle_question":{
                let game = this.state.new_game
                game.question = txt
                this.setState({"new_game":game})
                break;
            }
            case "game_success":{
                let game = this.state.new_game
                game.successMessage = txt
                this.setState({"new_game":game})
                break;
            }
        }
    };

    setButtonsChecked= (value:boolean) => {
        if (value){
            this.setState({"new_buttons":[{"text":"","redirectId":""},{"text":"","redirectId":""},{"text":"","redirectId":""}]})
        }
        else{
            this.setState({"new_buttons":[]})
        }

    };

    setQRCodeChecked = (value:boolean) => {
        if (value){
            this.setState({"new_game":{type:"qrcode", correctAnswer:""}})
        }
        else{
            this.setState({"new_game":{type:undefined, correctAnswer:""}})
        }
    };

    setRiddleChecked = (value:boolean) => {
        if (value){
            this.setState({"new_game":{type:"input", correctAnswer:""}})
        }
        else{
            this.setState({"new_game":{type:undefined, correctAnswer:""}})
        }
    };

    handleSceneClic = (scene:SceneType) => {

        if (this.props.novel){
            this.props.setScene(scene)
            console.log("goto",scene)
            this.props.history.push("/story")
        }

    };


    render() {
        const {center, loading} = this.state
        const missions = this.props.novel.scenes

        return (

            <div>


                <IonModal isOpen={this.state.showModal}>
                    <IonContent>
                    <IonHeader>
                        <IonToolbar>
                          <IonTitle>Nouvelle Mission</IonTitle>
                        </IonToolbar>


                      </IonHeader>
                    <IonList>

                        <IonItem>
                            <IonInput placeholder="Titre de la mission" onIonChange={e => this.setText("new_name",e.detail.value!)}></IonInput>
                          </IonItem>


                        {this.state.new_scenes.map((scene, index ) =>
                             <div>
                                 <IonItemDivider>Scène {index+1}</IonItemDivider>
                                 <IonItem>
                                    <IonInput placeholder="Image d'arrière plan (url du site web)" onIonChange={e => this.setText("updated_image",index+"###"+e.detail.value!)}></IonInput>
                                  </IonItem>
                                <IonItem>
                                  <IonTextarea placeholder="Texte de la scène"  onIonChange={e => this.setText("text",index+"###"+e.detail.value!)}></IonTextarea>
                                </IonItem>
                             </div>
                         )}
                         <IonButton color="primary" expand="full" onClick={this.newSceneBtnClick} >Ajouter plus de scènes</IonButton>
                        <IonItemDivider>Pour continuer</IonItemDivider>
                          <IonItem>
                            <IonLabel>Cliquer sur un bouton</IonLabel>
                            <IonCheckbox checked={this.state.new_buttons.length >0} onIonChange={e => this.setButtonsChecked(e.detail.checked)} />
                          </IonItem>

                        {
                        this.state.new_buttons.length >0 &&
                        <IonItem>
                                <IonGrid>

                                  <IonRow>
                                    <IonCol size="6"><IonInput placeholder="Texte du bouton" onIonChange={e => this.setText("buttons_text","0###"+e.detail.value!)}></IonInput></IonCol>
                                    <IonCol size="6"><IonInput placeholder="Mission en cas de clic" onIonChange={e => this.setText("buttons_link","0###"+e.detail.value!)}></IonInput></IonCol>
                                  </IonRow>

                                <IonRow>
                                    <IonCol size="6"><IonInput placeholder="Texte du bouton" onIonChange={e => this.setText("buttons_text","1###"+e.detail.value!)}></IonInput></IonCol>
                                    <IonCol size="6"><IonInput placeholder="Mission en cas de clic" onIonChange={e => this.setText("buttons_link","1###"+e.detail.value!)}></IonInput></IonCol>
                                  </IonRow>

                                <IonRow>
                                    <IonCol size="6"><IonInput placeholder="Texte du bouton" onIonChange={e => this.setText("buttons_text","1###"+e.detail.value!)}></IonInput></IonCol>
                                    <IonCol size="6"><IonInput placeholder="Mission en cas de clic" onIonChange={e => this.setText("buttons_link","1###"+e.detail.value!)}></IonInput></IonCol>
                                </IonRow>
                                </IonGrid>
                        </IonItem>
                        }
                        <IonItem>
                            <IonLabel>Scanner un QR Code</IonLabel>
                            <IonCheckbox checked={this.state.new_game.type=="qrcode"} onIonChange={e => this.setQRCodeChecked(e.detail.checked)} />
                        </IonItem>
                        {
                        this.state.new_game.type=="qrcode" &&
                        <IonItem>
                            <IonInput placeholder="Message caché dans le QR Code" onIonChange={e => this.setText("game_answer",e.detail.value!)}></IonInput>
                        </IonItem>
                        }

                        <IonItem>
                            <IonLabel>Répondre à une question</IonLabel>
                            <IonCheckbox checked={this.state.new_game.type=="input"} onIonChange={e => this.setRiddleChecked(e.detail.checked)} />
                        </IonItem>
                        {this.state.new_game.type=="input" &&
                        <IonItem>
                            <IonTextarea placeholder="Texte de la question / devinette"  onIonChange={e => this.setText("riddle_question",e.detail.value!)}></IonTextarea>
                        </IonItem>}
                        {this.state.new_game.type=="input" &&
                        <IonItem>
                            <IonInput placeholder="Réponse à la question / devinette" onIonChange={e => this.setText("game_answer",e.detail.value!)}></IonInput>
                        </IonItem>
                        }


                        {(this.state.new_game.type == "input" || this.state.new_game.type == "qrcode") &&
                        <IonItem>
                            <IonTextarea placeholder="Message en cas de succès" onIonChange={e => this.setText("game_success",e.detail.value!)}></IonTextarea>
                        </IonItem>
                        }

                    </IonList>

                    <div style={{"alignContent":"center", "marginLeft":'10px'}}>

                        <IonButton color="success" onClick={() => this.setShowModal(false, true)} >Sauvegarder</IonButton>
                        <IonButton color="danger" onClick={() => this.setShowModal(false, false)} >Fermer sans sauvegarder</IonButton>
                    </div>
                </IonContent>
                  </IonModal>

                <div>

                    <div>
                        <IonHeader>
                        <IonToolbar>
                          <IonTitle >Missions communautaires</IonTitle>
                        </IonToolbar>
                      </IonHeader>

                      <IonList>
                         {Object.values(this.state.community_missions).map((item:SceneType) =>
                             <div>
                         {item.visible==1 && item.userId==0 &&
                            <IonItem key={item.id} href={"javascript: void(0)"}>
                                <IonLabel>{item.name?item.name+" ("+item.id+")":item.id}</IonLabel>
                            </IonItem>
                        }
                        </div>

                    )}
                      </IonList>
                    </div>

                    <div>
                        <IonHeader>
                        <IonToolbar>
                          <IonTitle >Missions jouables</IonTitle>
                        </IonToolbar>
                      </IonHeader>

                      <IonList>
                         {Object.values(missions).map((item:SceneType) =>
                             <div>
                         {item.visible==1 && item.userId==0 &&
                            <IonItem key={item.id} onClick={() => this.handleSceneClic(item)} href={"javascript: void(0)"}>
                                <IonLabel>{item.name?item.name+" ("+item.id+")":item.id}</IonLabel>
                            </IonItem>
                        }
                        </div>

                    )}
                      </IonList>
                    </div>

                    <IonFab vertical="top" horizontal="end" slot="fixed" style={{"marginTop":'-5px'}}>

                        <IonFabButton onClick={this.newBtnClick} >
                            <IonIcon icon={addOutline}></IonIcon>
                          </IonFabButton>

                    </IonFab>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: { novel: NovelState; scene: SceneState,saves: Saves; }) => {
  return { saves: state.saves, novel: state.novel.current, scene: state.scene.current || state.novel.current?.scenes.start };
};

const mapDispatchToProps = {
  setScene,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MissionComponent));
