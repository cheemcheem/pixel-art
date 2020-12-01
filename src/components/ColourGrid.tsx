import React from "react";
import {useState} from "react";
import {useMemo} from "react";
import {Color3} from "@babylonjs/core";
import {EventState} from "@babylonjs/core";
import {PointerInfoPre} from "@babylonjs/core";
import {Rectangle} from "@babylonjs/gui";

export default function ColourGrid({paint, width, height, size = 40}: { paint: Color3, width: number, height: number, size?: number }) {

  const [grid, setGrid] = useState(Array(width).fill(Array(height).fill(Color3.Black())) as Color3[][]);

  const handleSetGrid = useMemo((() =>
          (rowIndex: number, colIndex: number) =>
              () => setGrid(prevGrid => {
                const newGrid = prevGrid.map(a => a.map(b => b));
                newGrid[rowIndex][colIndex] = paint;
                return newGrid;
              })
  ), [paint]);
  return <>
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
            onPointerDownObservable={handleSetGrid(rowIndex, colIndex)}
            onPointerEnterObservable={(_: [Rectangle], eventState: EventState) => {
              const clicked = eventState.userInfo && (eventState.userInfo as PointerInfoPre).event.buttons > 0;
              if (clicked) {
                handleSetGrid(rowIndex, colIndex)()
              }
            }}
        />)
    )}
  </>;
}