import React, {memo} from "react";
import {ERASE_COLOUR, GRID_SETTINGS} from "../common/Types";
import useRotationDimensions from "../hooks/useRotationDimensions";

const {minDimension, maxDimension, defDimension} = GRID_SETTINGS;
type SliderPropsType = {
  setSliding: React.Dispatch<React.SetStateAction<boolean>>,
  setGrid: React.Dispatch<React.SetStateAction<{
    grid: number[][][],
    columnCount: number,
    rowCount: number,
  }>>,
};

function Slider({setSliding, setGrid}: SliderPropsType) {
  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isHorizontal} = useRotationDimensions({
    longSidePercent: 0.8,
    shortSidePercent: 0.1,
    shortSideMinPixels: 40,
    shortSideOffSetPercent: 0.40,
    default: {vertical: "top", horizontal: "left"},
  });

  return <>
    <slider minimum={minDimension}
            maximum={maxDimension}
            value={defDimension}
            onPointerDownObservable={() => setSliding(true)}
            onPointerUpObservable={() => setSliding(false)}
            step={1}
            barOffset={0}
            thumbWidth={isHorizontal ? widthInPixels : heightInPixels}
            isThumbClamped
            widthInPixels={widthInPixels}
            heightInPixels={heightInPixels}
            leftInPixels={leftInPixels}
            topInPixels={topInPixels}
            isVertical={isHorizontal}
            background={"pink"}
            thumbColor={"salmon"}
            onValueChangedObservable={(dim: number) => setGrid({
              grid: Array(dim).fill(Array(dim).fill(ERASE_COLOUR.asArray())),
              columnCount: dim,
              rowCount: dim,
            })}
    />
  </>;
}

export default memo(Slider, () => true);