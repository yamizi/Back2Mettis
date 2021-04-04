import {SettingsState, Saves, Save, SavesState} from './../store/reducers/reducersTypes';


export type GameType = {
  type: string;
  correctAnswer: string;
};

export type ButtonType = {
  text: string;
  redirectId: string;
};

export type TextsType = {
  text: string;
  updatedImage?: string;
  nickname?: string;
};

export type SceneType = {
  id: string;
  image: string;
  game?:GameType;
  texts: TextsType[];
  buttons: ButtonType[];
};

export type ScenePropsType = {
  scene: SceneType;
  nextScene: (id: string) => void;
  saves: SavesState;
  settings: SettingsState;
  addSave: (scene: Save) => void;
};

export type SceneStateType = {
  words: string[];
  wordsInterval: number | null;
  wordsIntervalIndex: number;
  isButtonsVisible: boolean;
};

export type NovelType = {
  id: string;
  name: string;
  scenes: { [key: string]: SceneType };
};

export type MapProps = { novel?: NovelType; scene?: SceneType; setScene: Function, saves: SavesState, history:any};

export type NovelProps = { novel?: NovelType; scene?: SceneType; setScene: Function };

export type SceneArrowProps = {
  handleClick?: () => void;
  direction?: 'left' | 'right';
};

export type SceneTextsProps = {
  isLeftArrowActive: () => boolean;
  isRightArrowActive: () => boolean;
  words: string[];
  prevText: () => void;
  nextText: () => void;
};

export type SceneButtonProps = {
  text: string;
  handleClick: () => void;
};

export type MenuState = { settings: SettingsState; setLazyTexts: () => void; unsetLazyTexts: () => void };

export type MenuButtonProps = {
  handleClick: () => void;
  text: string;
  handleRemove?: () => void;
};

export type MenuSavesProps = {
  saves: Saves;
  scene: { current: SceneType };
  addSave: (save: Save) => void;
  removeSaveByTime: (id: number) => void;
  loadScene: (id: string) => void;
};



export type MarkerDataType= {
  id: string;
  name: string;
  markers: { [key: string]: MarkerType };

}

export type MarkerType= {
  type: 'optional' | 'main';
  label: string;
  id:string;
  scene:string;
  lat: number;
  lng: number;
  time: 'rome' | 'medieval' | 'moderne';
  gmarker?:google.maps.Marker;
}
