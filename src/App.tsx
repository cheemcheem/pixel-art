import {Engine} from 'react-babylonjs';
import {Scene} from 'react-babylonjs';
import React from "react";
import {useState} from "react";
import {Vector3} from "@babylonjs/core";
import {Color4} from "@babylonjs/core";
import {Color3} from "@babylonjs/core";
import ColourGrid from "./components/ColourGrid";

function App() {

  const [paintColour] = useState(Color3.Red);

  return <>
    <Engine canvasId="pixelArtCanvas"
            antialias
            adaptToDeviceRatio>
      <Scene clearColor={Color4.FromColor3(Color3.Black())}>
        <adtFullscreenUi name={"pixelArtFullScreenUI"} background={"orange"}>
          <ColourGrid paint={paintColour} width={20} height={20}/>
        </adtFullscreenUi>
        <freeCamera setActiveOnSceneIfNoneActive name={"FreeCamera"} position={Vector3.Zero()}/>
      </Scene>
    </Engine>
  </>;
}

export default App;
