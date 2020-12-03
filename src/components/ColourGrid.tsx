import React from "react";
import {useMemo} from "react";
import {useState} from "react";
import {Color3} from "@babylonjs/core";
import {EventState} from "@babylonjs/core";
import {PointerInfoPre} from "@babylonjs/core";
import {Rectangle} from "@babylonjs/gui";

export default function ColourGrid({paint, width, height, size = 40}: { paint: Color3, width: number, height: number, size?: number }) {

  const defaultColour = Color3.Black();
  const [grid, setGrid] = useState(Array(width).fill(Array(height).fill(defaultColour)) as Color3[][]);
  const [mouseButton, setMouseButton] = useState(0);
  const handleSetGrid = useMemo(
      (() => (rowIndex: number, colIndex: number, shouldPaint: boolean) => () => setGrid(prevGrid => {
        const newGrid = prevGrid.map(a => a.map(b => b));
        newGrid[rowIndex][colIndex] = shouldPaint ? paint : defaultColour;
        return newGrid;
      })),
      [paint, ]
  );

  const handleClick = useMemo(
      (() => (eventState: EventState, rowIndex: number, colIndex: number) => {
        const clickType = (eventState.userInfo as PointerInfoPre).event.which;
        setMouseButton(clickType);
        switch (clickType) {
          case 1: // left click
            handleSetGrid(rowIndex, colIndex, true)()
            break;
          case 2: // middle click
            break;
          case 3: // right click
            handleSetGrid(rowIndex, colIndex, false)()
            break;
        }
      }),
      [handleSetGrid]
  );

  return <rectangle name="ColourGrid"
                    hoverCursor={
                      (mouseButton === 1
                          ? "crosshair"
                          : mouseButton === 3
                              ? "cell"
                              : "default")
                    }>
    {grid.flatMap((row, rowIndex) =>
        row.map((col, colIndex) => <rectangle
            name={`${rowIndex},${colIndex}`}
            key={`${rowIndex},${colIndex}`}
            background={col.toHexString()}
            topInPixels={size * rowIndex - height * size / 2}
            leftInPixels={size * colIndex - width * size / 2}
            widthInPixels={size}
            heightInPixels={size}
            isPointerBlocker // required for clicking rectangles
            onPointerDownObservable={(_: [Rectangle], eventState: EventState) => {
              handleClick(eventState, rowIndex, colIndex);
            }}
            onPointerEnterObservable={(_: [Rectangle], eventState: EventState) => {
              const clicked = eventState.userInfo && (eventState.userInfo as PointerInfoPre).event.buttons > 0;
              if (clicked) {
                handleClick(eventState, rowIndex, colIndex);
              } else {
                setMouseButton(1);
              }
            }}
            onPointerUpObservable={() => setMouseButton(0)}
            onPointerOutObservable={() => setMouseButton(0)}
        />)
    )}
  </rectangle>;
}