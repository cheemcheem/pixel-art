import { useCallback, useEffect, useMemo, useState } from "react";
import { Color, ColorArray, ERASE_COLOUR, DEFAULT_COLOUR } from "./common/Types";
import ColourGridManager from "./components/grid/ColourGridManager";
import GridCanvas from "./components/GridCanvas";
import './App.css';
import Logo from "./components/Logo";
import useDimension from "./hooks/useDimension";
import Toolbar from "./components/Toolbar";
import useDarkMode from "./hooks/useDarkMode";
import PenColourContext from "./common/PenColourContext";

function App() {

  const [dimension, setDimension] = useDimension();
  const [grid, setGrid] = useState(() => Array(dimension).fill(Array(dimension).fill(ERASE_COLOUR.asArray())) as ColorArray[][]);
  const resetGrid = useCallback(() => setGrid(Array<ColorArray[]>(dimension).fill(Array<ColorArray>(dimension).fill(ERASE_COLOUR.asArray()))), [dimension, setGrid]);
  useEffect(resetGrid, [resetGrid]);
  const [sliding, setSliding] = useState(false);

  const darkMode = useDarkMode();
  const backgroundColor = useMemo(() => Color.FromArray([
    Math.random() * 100 + (darkMode ? 0 : 100),
    Math.random() * 100 + (darkMode ? 0 : 100),
    Math.random() * 100 + (darkMode ? 0 : 100),
  ]).toHexString(), [darkMode]);
  
  useEffect(() => { 
    document.body.style.backgroundColor = backgroundColor;
    document.querySelector('meta[name="theme-color"]')!.setAttribute('content',  backgroundColor);
  }, [backgroundColor]);

  const [penColour, setPenColour] = useState(DEFAULT_COLOUR);

  return <>
    <div id="pixel-art-container" style={{ backgroundColor }}>
      <PenColourContext.Provider value={{penColour, setPenColour}}>
        <Logo trigger={grid} />
        <GridCanvas>
          <ColourGridManager
            columnCount={dimension}
            rowCount={dimension}
            grid={grid}
            setGrid={setGrid}
            sliding={sliding}
          />
        </GridCanvas>
        <Toolbar dimension={dimension} grid={grid} setDimension={setDimension} setSliding={setSliding} resetGrid={resetGrid}/>
      </PenColourContext.Provider>
    </div>
  </>;
}

export default App;
