import React, {useEffect, useMemo, useRef, useState} from "react";
import {useMedia, useWindowSize} from "react-use";
import {CLICK_TYPES, DEFAULT_COLOUR, ERASE_COLOUR} from "../../common/Types";
import ColourGrid from "./ColourGrid";

const {NONE, RIGHT} = CLICK_TYPES;

type ColourGridManagerProps = {
  columnCount: number,
  rowCount: number
}
export default function ColourGridManager({columnCount, rowCount}: ColourGridManagerProps) {

  const [paintColour] = useState(DEFAULT_COLOUR);
  const [grid, setGrid] = useState(Array(columnCount).fill(Array(rowCount).fill(ERASE_COLOUR.asArray())) as number[][][]);
  useEffect(
      () => setGrid(Array(columnCount).fill(Array(rowCount).fill(ERASE_COLOUR.asArray()))),
      [columnCount, rowCount]
  );

  const lastMouse = useRef<{ x: number, y: number }>();
  const windowSize = useWindowSize();
  const boxSizeInPixels = useMemo(() => Math.floor(Math.min(
      (windowSize.width * 0.8) / columnCount,
      (windowSize.height * 0.8) / rowCount
  )), [columnCount, rowCount, windowSize.height, windowSize.width]);

  const paintGridBox = useMemo(
      () => (rowIndex: number, colIndex: number, shouldPaint: boolean) => {
        const newColour = (shouldPaint ? paintColour : ERASE_COLOUR).asArray();
        if (grid[rowIndex][colIndex] !== newColour) {
          setGrid(prevGrid => {
            const newGrid = prevGrid.map(a => a.map(b => b));
            newGrid[rowIndex][colIndex] = newColour;
            return newGrid;
          });
        }
      },
      [grid, paintColour]
  );

  const paintGridLine = useMemo(() =>
      (boxes: { rowIndex: number, colIndex: number }[], shouldPaint: boolean) => {
        const newColour = (shouldPaint ? paintColour : ERASE_COLOUR).asArray();
        setGrid(prevGrid => {
          const newGrid = prevGrid.map(a => a.map(b => b));
          boxes.forEach(({rowIndex, colIndex}) => newGrid[rowIndex][colIndex] = newColour);
          return newGrid;
        });
      }, [paintColour]
  );

  const isMobile = useMedia('(hover: none) and (pointer: coarse)');
  const [border, setBorder] = useState(false);
  useEffect(() => {
    const gridHeight = boxSizeInPixels * rowCount;
    const minY = (windowSize.height - gridHeight) / 2;
    const maxY = (windowSize.height + gridHeight) / 2;

    const gridWidth = boxSizeInPixels * columnCount;
    const minX = (windowSize.width - gridWidth) / 2;
    const maxX = (windowSize.width + gridWidth) / 2;

    const withinRange = (x: number, y: number) => x > minX && x < maxX && y > minY && y < maxY;
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
              colIndex: Math.floor((x - minX) / (boxSizeInPixels)),
              rowIndex: Math.floor((y - minY) / (boxSizeInPixels))
            }))
            .filter(({colIndex, rowIndex}) =>
                colIndex >= 0 && colIndex < columnCount && rowIndex >= 0 && rowIndex < rowCount
            )
        ;
        paintGridLine(boxes, !(buttons & RIGHT));
      }
    }

    const onpointermove = ({x, y, buttons}: MouseEvent) => {
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

    const onpointerdown = (e: MouseEvent) => {
      const {x, y, buttons} = e;
      const currentlyWithinRange = withinRange(x, y);
      if (isMobile) {
        setBorder(currentlyWithinRange);
      }
      if (currentlyWithinRange) {
        const colIndex = Math.floor((x - minX) / (boxSizeInPixels));
        const rowIndex = Math.floor((y - minY) / (boxSizeInPixels));
        paintGridBox(rowIndex, colIndex, !(buttons & RIGHT))
      }
    };

    const onpointerout = ({x, y, buttons}: MouseEvent) => {
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

    window.onpointermove = onpointermove;
    window.onpointerdown = onpointerdown;
    window.onpointerout = onpointerout;

    return () => {
      window.removeEventListener("pointermove", onpointermove);
      window.removeEventListener("pointerdown", onpointerdown);
      window.removeEventListener("pointerout", onpointerout);
    }
  }, [border, boxSizeInPixels, columnCount, isMobile, paintGridBox, paintGridLine, rowCount, windowSize]);

  return useMemo(() => <ColourGrid grid={grid}
                                   columnCount={columnCount}
                                   rowCount={rowCount}
                                   boxSizeInPixels={boxSizeInPixels}
                                   border={border}
  />, [border, boxSizeInPixels, columnCount, grid, rowCount]);

}