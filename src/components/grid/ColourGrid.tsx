import { memo } from "react";
import { Color, ColorArray } from "../../common/Types";
import useCanvasContext from "../../hooks/useCanvasContext";
import useResizing from "../../hooks/useResizing";
import ColourGridBox from "./ColourGridBox";

type ColourGridProps = {
  grid: ColorArray[][],
  columnCount: number,
  rowCount: number,
  border: boolean,
};

function ColourGrid({ grid, columnCount, rowCount, border }: ColourGridProps) {

  const ctx = useCanvasContext();

  const resizing = useResizing();

  return <>
    {!resizing && ctx && grid.flatMap((row, rowIndex) => row.map((col, colIndex) => <ColourGridBox
      key={`${rowIndex},${colIndex} for ${rowCount}x${columnCount}`}
      col={col}
      colIndex={colIndex}
      rowIndex={rowIndex}
      columnCount={columnCount}
      rowCount={rowCount}
      border={border}
      ctx={ctx} />
    ))}
  </>;
}

// export default ColourGrid;
export default memo(ColourGrid, (prev, next) => {
  const {grid: gridPrev, columnCount: columnCountPrev, rowCount: rowCountPrev, border: borderPrev} = prev;
  const {grid: gridNext, columnCount: columnCountNext, rowCount: rowCountNext, border: borderNext} = next;

  if (gridPrev.length !== gridNext.length || columnCountPrev !== columnCountNext || rowCountPrev !== rowCountNext || borderPrev !== borderNext) {
    return false;
  }

  for (let row = 0; row < gridPrev.length; row++) {
    const gridPrevRow = gridPrev[row];
    const gridNextRow = gridNext[row];

    if (gridPrevRow.length !== gridNextRow.length) {
      return false;
    }

    for (let col = 0; col < gridPrevRow.length; col++) {
      const gridPrevCol = gridPrevRow[col];
      const gridNextCol = gridNextRow[col];

      if (!Color.equals(gridPrevCol, gridNextCol)) {
        return false;
      }
    }
  }

  return true;
});