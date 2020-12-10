import {Color3, Color4, Vector3} from "@babylonjs/core";
import React, {useMemo, useState} from "react";
import {Engine, Scene} from 'react-babylonjs';
import {ERASE_COLOUR} from "./common/Types";
import DownloadButton from "./components/DownloadButton";
import ColourGridManager from "./components/grid/ColourGridManager";
import Slider from "./components/Slider";

function App() {
  const [{columnCount, rowCount}, setDimensions] = useState({columnCount: 40, rowCount: 40});
  const [grid, setGrid] = useState(Array(columnCount).fill(Array(rowCount).fill(ERASE_COLOUR.asArray())) as number[][][]);
  const [sliding, setSliding] = useState(false);
  return <>
    <Engine antialias canvasId="pixelArtCanvas">
      <Scene clearColor={useMemo(() => Color4.FromColor3(Color3.Random()), [])}>
        <adtFullscreenUi name={"pixelArtFullScreenUI"}>
          <Slider setDimensions={setDimensions} setSliding={setSliding}/>
          <DownloadButton grid={grid}/>
          <ColourGridManager
              columnCount={columnCount}
              rowCount={rowCount}
              grid={grid}
              setGrid={setGrid}
              sliding={sliding}
          />
        </adtFullscreenUi>
        <freeCamera setActiveOnSceneIfNoneActive name={"FreeCamera"} position={Vector3.Zero()}/>
      </Scene>
    </Engine>
  </>;
}

export default App;
