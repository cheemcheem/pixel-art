import { useEffect, useMemo, useState } from "react";
import { Color, ColorArray, ERASE_COLOUR } from "./common/Types";
import ColourGridManager from "./components/grid/ColourGridManager";
import GridCanvas from "./components/GridCanvas";
import './App.css';
import Logo from "./components/Logo";
import Slider from "./components/Slider";
import DownloadButton from "./components/DownloadButton";
import useDimension from "./hooks/useDimension";

function App() {

  const [dimension, setDimension] = useDimension();
  const [grid, setGrid] = useState(() => Array(dimension).fill(Array(dimension).fill(ERASE_COLOUR.asArray())) as ColorArray[][]);
  useEffect(() => setGrid(Array<ColorArray[]>(dimension).fill(Array<ColorArray>(dimension).fill(ERASE_COLOUR.asArray()))), [dimension, setGrid])

  const [sliding, setSliding] = useState(false);
  const backgroundColor = useMemo(() => Color.FromArray([
    Math.random() * 100 + 100,
    Math.random() * 100 + 100,
    Math.random() * 100 + 100,
  ]).toHexString(), []);
  useEffect(() => { document.body.style.backgroundColor = backgroundColor }, [backgroundColor]);
  
  return <>
    <div id="pixel-art-container" style={{ backgroundColor }}>
      <Logo trigger={grid} />
      <Slider dimension={dimension} setDimension={setDimension} setSliding={setSliding} />
      <DownloadButton grid={grid} />
      <GridCanvas>
        <ColourGridManager
          columnCount={dimension}
          rowCount={dimension}
          grid={grid}
          setGrid={setGrid}
          sliding={sliding}
        />
      </GridCanvas>
    </div>
  </>;
}

export default App;
