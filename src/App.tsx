import { useState } from "react";
import { ColorArray, ERASE_COLOUR, GRID_SETTINGS } from "./common/Types";
import ColourGridManager from "./components/grid/ColourGridManager";
import GridCanvas from "./components/GridCanvas";
import './App.css';

const { defDimension } = GRID_SETTINGS;

function App() {
  const [{ grid, columnCount, rowCount }, setGrid] = useState(
    {
      grid: Array(defDimension).fill(Array(defDimension).fill(ERASE_COLOUR.asArray())) as ColorArray[][],
      columnCount: defDimension,
      rowCount: defDimension
    }
  );
  const [sliding] = useState(false);
  return <>
    <div id="pixel-art-container">
      <GridCanvas>
        <ColourGridManager
          columnCount={columnCount}
          rowCount={rowCount}
          grid={grid}
          setGrid={setGrid}
          sliding={sliding}
        />
      </GridCanvas>
    </div>
  </>;
}

export default App;
