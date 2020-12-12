import {Color3, Color4, Vector3} from "@babylonjs/core";
import React, {useMemo, useState} from "react";
import {Engine, Scene} from 'react-babylonjs';
import {ERASE_COLOUR, GRID_SETTINGS} from "./common/Types";
import DownloadButton from "./components/DownloadButton";
import ColourGridManager from "./components/grid/ColourGridManager";
import Logo from "./components/Logo";
import Slider from "./components/Slider";

const {defDimension} = GRID_SETTINGS;

function App() {
  const [{grid, columnCount, rowCount}, setGrid] = useState(
      {
        grid: Array(defDimension).fill(Array(defDimension).fill(ERASE_COLOUR.asArray())) as number[][][],
        columnCount: defDimension,
        rowCount: defDimension
      }
  );
  const [sliding, setSliding] = useState(false);
  return <>
    <Engine antialias canvasId="pixelArtCanvas">
      <Scene clearColor={useMemo(() => Color4.FromColor3(Color3.Random()), [])}>
        <adtFullscreenUi name={"pixelArtFullScreenUI"}>
          <Slider setSliding={setSliding} setGrid={setGrid}/>
          <DownloadButton grid={grid}/>
          <ColourGridManager
              columnCount={columnCount}
              rowCount={rowCount}
              grid={grid}
              setGrid={setGrid}
              sliding={sliding}
          />
          <Logo trigger={rowCount}/>
        </adtFullscreenUi>
        <freeCamera setActiveOnSceneIfNoneActive name={"FreeCamera"} position={Vector3.Zero()}/>
      </Scene>
    </Engine>
  </>;
}

export default App;
