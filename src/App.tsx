import {Color3, Color4, Vector3} from "@babylonjs/core";
import React from "react";
import {Engine, Scene} from 'react-babylonjs';
import ColourGridManager from "./components/ColourGridManager";

function App() {
  return <>
    <Engine canvasId="pixelArtCanvas">
      <Scene clearColor={Color4.FromColor3(Color3.Random())}>
        <adtFullscreenUi name={"pixelArtFullScreenUI"}>
          <ColourGridManager columnCount={20} rowCount={20}/>
        </adtFullscreenUi>
        <freeCamera setActiveOnSceneIfNoneActive name={"FreeCamera"} position={Vector3.Zero()}/>
      </Scene>
    </Engine>
  </>;
}

export default App;
