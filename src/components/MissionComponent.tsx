import React, {Component} from "react";
import {MapProps, MarkerType, SceneType} from "../types/types";
import {NovelState, Saves, SceneState} from "../store/reducers/reducersTypes";
import {setScene} from "../store/actions/sceneActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
    IonContent, IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {addOutline} from "ionicons/icons";

class MissionComponent extends Component<MapProps> {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };

        console.log(props.novel.scenes)

    }

    newBtnClick = () => {

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
        const scenes = this.props.novel.scenes
        return (

            <div>
                <div>

                <div>
                    <IonHeader>
                    <IonToolbar>
                      <IonTitle >Toutes les missions</IonTitle>
                    </IonToolbar>
                  </IonHeader>

                  <IonList>
                     {Object.values(scenes).map((item) =>
                         <div>
                     {item.visible==1 && item.userId==0 &&
                        <IonItem key={item.id} onClick={() => this.handleSceneClic(item)} href={"javascript: void(0)"}>
                            <IonLabel>{item.name?item.name:item.id}</IonLabel>
                        </IonItem>
                    }
                    </div>

                )}
                  </IonList>
                </div>


                <IonFab vertical="top" horizontal="end" slot="fixed" style={{"marginTop":'-5px'}}>

                    <IonFabButton onClick={!this.state.loading && this.newBtnClick} >
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
