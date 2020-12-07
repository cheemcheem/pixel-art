import React from "react";
import ColourGridBox from "./ColourGridBox";

type ColourGridProps = {
  grid: number[][][],
  columnCount: number,
  rowCount: number,
  boxSizeInPixels: number
};

const ColourGrid = ({grid, columnCount, rowCount, boxSizeInPixels}: ColourGridProps) => <>
  {grid.flatMap((row, rowIndex) =>
      row.map((col, colIndex) =>
          <ColourGridBox
              key={`${rowIndex},${colIndex}`}
              col={col}
              colIndex={colIndex}
              rowIndex={rowIndex}
              boxSizeInPixels={boxSizeInPixels}
              columnCount={columnCount}
              rowCount={rowCount}
          />
      )
  )}
</>;

export default ColourGrid;