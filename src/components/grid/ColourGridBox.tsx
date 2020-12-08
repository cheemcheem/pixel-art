import {Color3} from "@babylonjs/core";
import React from "react";

type ColourGridBoxProps = {
  col: number[],
  colIndex: number,
  rowIndex: number,
  boxSizeInPixels: number,
  columnCount: number,
  rowCount: number,
  border: boolean,
};

const ColourGridBox = ({col, colIndex, rowIndex, boxSizeInPixels, columnCount, rowCount, border}
                           : ColourGridBoxProps) =>
    <rectangle
        name={`${rowIndex},${colIndex}`}
        key={`${rowIndex},${colIndex}`}
        background={Color3.FromArray(col).toHexString()}
        topInPixels={boxSizeInPixels * (rowIndex - rowCount / 2 + 1 / 2)}
        leftInPixels={boxSizeInPixels * (colIndex - columnCount / 2 + 1 / 2)}
        widthInPixels={boxSizeInPixels}
        heightInPixels={boxSizeInPixels}
        color={"#696969"}
        thickness={border ? 1 : 0}
    />
;
export default ColourGridBox;