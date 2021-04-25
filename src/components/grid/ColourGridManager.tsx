import React, { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMedia } from "react-use";
import GridCanvasContext from "../../common/GridCanvasContext";
import { CLICK_TYPES, ColorArray, DEFAULT_COLOUR, ERASE_COLOUR } from "../../common/Types";
import ColourGrid from "./ColourGrid";

const { NONE, RIGHT } = CLICK_TYPES;

type ColourGridManagerProps = {
  columnCount: number,
  rowCount: number,
  grid: ColorArray[][],
  setGrid: React.Dispatch<React.SetStateAction<{
    grid: ColorArray[][],
    columnCount: number,
    rowCount: number,
  }>>,
  sliding: boolean,
}

function ColourGridManager({ columnCount, rowCount, grid, setGrid, sliding }: ColourGridManagerProps) {

  const {canvas, resolution} = useContext(GridCanvasContext);
  const [paintColour] = useState(DEFAULT_COLOUR);
  const lastMouse = useRef<{ x: number, y: number }>();

  const paintGridBox = useMemo(
      () => (rowIndex: number, colIndex: number, shouldPaint: boolean) => {
        const newColour = (shouldPaint ? paintColour : ERASE_COLOUR).asArray();
        if (grid[rowIndex][colIndex] !== newColour) {
          setGrid(prevGrid => {
            const newGrid = prevGrid.grid.map(a => a.map(b => b));
            newGrid[rowIndex][colIndex] = newColour;
            return {...prevGrid, grid: newGrid};
          });
        }
      },
      [grid, paintColour, setGrid]
  );

  const paintGridLine = useMemo(() =>
      (boxes: { rowIndex: number, colIndex: number }[], shouldPaint: boolean) => {
        const newColour = (shouldPaint ? paintColour : ERASE_COLOUR).asArray();
        setGrid(prevGrid => {
          const newGrid = prevGrid.grid.map(a => a.map(b => b));
          boxes.forEach(({rowIndex, colIndex}) => newGrid[rowIndex][colIndex] = newColour);
          return {...prevGrid, grid: newGrid};
        });
      }, [paintColour, setGrid]
  );

  const isMobile = useMedia('(hover: none) and (pointer: coarse)');
  const [border, setBorder] = useState(false);
  useEffect(() => {
    if (!canvas || !resolution) return () => {};

    const maxY = canvas.offsetHeight;
    const maxX = canvas.offsetWidth;

    const withinRange = (x: number, y: number) => x > 0 && x < maxX && y > 0 && y < maxY;
    const drawLine = (x: number, y: number, buttons: number) => {
      document.body.style.cursor = withinRange(x, y) ? (buttons & RIGHT ? 'cell' : 'crosshair') : 'default';

      if (lastMouse.current) {
        const deltaX = x - lastMouse.current.x;
        const deltaY = y - lastMouse.current.y;
        const delta = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const boxes = Array(Math.floor(delta))
            .fill(lastMouse.current)
            .map(({x, y}, index) => ({
              x: x + deltaX / delta * index,
              y: y + deltaY / delta * index
            }))
            .map(({x, y}) => ({
              colIndex: Math.floor(x / (maxX / columnCount)),
              rowIndex: Math.floor(y / (maxY / rowCount))
            }))
            .filter(({colIndex, rowIndex}) =>
                colIndex >= 0 && colIndex < columnCount && rowIndex >= 0 && rowIndex < rowCount
            )
        ;
        paintGridLine(boxes, !(buttons & RIGHT));
      }
    }

    const onpointermove = ({ offsetX:x, offsetY:y, buttons }: MouseEvent) => {
      const currentlyWithinRange = withinRange(x, y);

      if (!isMobile) {
        setBorder(currentlyWithinRange);
      }

      if (buttons !== NONE) {
        drawLine(x, y, buttons);
        if (isMobile) {
          setBorder(border || currentlyWithinRange);
        }
      } else {
        document.body.style.cursor = currentlyWithinRange ? 'crosshair' : 'default';
      }

      lastMouse.current = {x, y};
    };

    const onpointerdown = ({offsetX:x, offsetY:y, buttons }: MouseEvent) => {
      const currentlyWithinRange = withinRange(x, y);
      if (isMobile) {
        setBorder(currentlyWithinRange);
      }
      if (currentlyWithinRange) {
        const colIndex = Math.floor(x / (maxX / columnCount));
        const rowIndex = Math.floor(y / (maxY / rowCount));
        paintGridBox(rowIndex, colIndex, !(buttons & RIGHT))
      }
    };

    const onpointerout = ({ offsetX:x, offsetY:y, buttons }: MouseEvent) => {
      if (isMobile) {
        setBorder(false);
      }
      if (buttons !== NONE) {
        drawLine(x, y, buttons);
      } else {
        document.body.style.cursor = withinRange(x, y) ? 'crosshair' : 'default';
      }
      lastMouse.current = undefined;
    }

    canvas.onpointermove = onpointermove;
    canvas.onpointerdown = onpointerdown;
    canvas.onpointerout = onpointerout;

    return () => {
      canvas.removeEventListener("pointermove", onpointermove);
      canvas.removeEventListener("pointerdown", onpointerdown);
      canvas.removeEventListener("pointerout", onpointerout);
    }
  }, [border, columnCount, isMobile, paintGridBox, paintGridLine, rowCount, canvas, resolution]);

  return useMemo(() => <ColourGrid grid={grid}
                                   columnCount={columnCount}
                                   rowCount={rowCount}
                                   border={border || sliding}
  />, [border, columnCount, grid, rowCount, sliding]);

}

export default memo(ColourGridManager, (prevProps, nextProps) => {
  const {columnCount: columnCountPrev, grid: gridPrev, rowCount: rowCountPrev, setGrid: setGridPrev, sliding: slidingPrev} = prevProps;
  const {columnCount: columnCountNext, grid: gridNext, rowCount: rowCountNext, setGrid: setGridNext, sliding: slidingNext} = nextProps;

  if (columnCountPrev !== columnCountNext) return false;
  if (rowCountPrev !== rowCountNext) return false;
  if (setGridPrev !== setGridNext) return false;
  if (slidingPrev !== slidingNext) return false;

  if (gridPrev.length !== gridNext.length) return false;

  for (let colIndex = 0; colIndex < gridPrev.length; colIndex++) {
    const gridColPrev = gridPrev[colIndex];
    const gridColNext = gridNext[colIndex];
    if (gridColPrev.length !== gridColNext.length) return false;

    for (let rowIndex = 0; rowIndex < gridColPrev.length; rowIndex++) {
      const gridRowPrev = gridColPrev[rowIndex];
      const gridRowNext = gridColNext[rowIndex];
      if (gridRowPrev.length !== gridRowNext.length) return false;

      for (let colourIndex = 0; colourIndex < gridRowPrev.length; colourIndex++) {
        const gridColourPrev = gridRowPrev[colourIndex];
        const gridColourNext = gridRowNext[colourIndex];
        if (gridColourPrev !== gridColourNext) return false;
      }
    }
  }

  return true;
})