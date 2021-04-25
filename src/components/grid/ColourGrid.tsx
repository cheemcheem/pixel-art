import React from "react";
import { ColorArray } from "../../common/Types";
import ColourGridBox from "./ColourGridBox";

type ColourGridProps = {
  grid: ColorArray[][],
  columnCount: number,
  rowCount: number,
  border: boolean,
};

const ColourGrid = ({grid, columnCount, rowCount, border}: ColourGridProps) => <>
  {grid.flatMap((row, rowIndex) =>
      row.map((col, colIndex) =>
          <ColourGridBox
              key={`${rowIndex},${colIndex}`}
              col={col}
              colIndex={colIndex}
              rowIndex={rowIndex}
              columnCount={columnCount}
              rowCount={rowCount}
              border={border}
          />
      )
  )}
</>;

export default ColourGrid;