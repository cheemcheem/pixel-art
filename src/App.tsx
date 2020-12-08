import {Color3, Color4, Vector3} from "@babylonjs/core";
import React, {useMemo, useState} from "react";
import {Engine, Scene} from 'react-babylonjs';
import ColourGridManager from "./components/grid/ColourGridManager";
import Slider from "./components/Slider";

function App() {
  const [{columnCount, rowCount}, setDimensions] = useState({columnCount: 40, rowCount: 40});
  return <>
    <Engine canvasId="pixelArtCanvas">
      <Scene clearColor={Color4.FromColor3(Color3.Random())}>
        <adtFullscreenUi name={"pixelArtFullScreenUI"}>
          {useMemo(() => <Slider
              setDimensions={((a, b) => setDimensions({columnCount: a, rowCount: b}))}/>, [])}
          <ColourGridManager columnCount={columnCount} rowCount={rowCount}/>
        </adtFullscreenUi>
        <freeCamera setActiveOnSceneIfNoneActive name={"FreeCamera"} position={Vector3.Zero()}/>
      </Scene>
    </Engine>
  </>;
}

export default App;
