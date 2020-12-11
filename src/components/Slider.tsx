import React, {memo, useMemo} from "react";
import {useWindowSize} from "react-use";
import {ERASE_COLOUR, GRID_SETTINGS} from "../common/Types";

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
  const {width, height} = useWindowSize();
  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isVertical} = useMemo(() => {
    const isVertical = height < width;
    return {
      widthInPixels: isVertical ? Math.min(40, width * 0.1) : width * 0.8,
      heightInPixels: !isVertical ? Math.min(40, height * 0.1) : height * 0.8,
      leftInPixels: isVertical ? -0.40 * Math.min(width, height) - 40 : 0,
      topInPixels: !isVertical ? -0.40 * Math.min(width, height) - 40 : 0,
      isVertical,
    }
  }, [width, height]);

  return <>
    <slider minimum={minDimension}
            maximum={maxDimension}
            value={defDimension}
            onPointerDownObservable={() => setSliding(true)}
            onPointerUpObservable={() => setSliding(false)}
            step={1}
            barOffset={0}
            thumbWidth={isVertical ? widthInPixels : heightInPixels}
            isThumbClamped
            widthInPixels={widthInPixels}
            heightInPixels={heightInPixels}
            leftInPixels={leftInPixels}
            topInPixels={topInPixels}
            isVertical={isVertical}
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