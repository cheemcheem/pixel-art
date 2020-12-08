import React, {useMemo} from "react";
import {useWindowSize} from "react-use";
import {GRID_SETTINGS} from "../common/Types";

const {minDimension, maxDimension, defDimension} = GRID_SETTINGS;
export default function Slider({setDimensions}: { setDimensions: (columnCount: number, rowCount: number) => void }) {
  const {width, height} = useWindowSize();
  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isVertical} = useMemo(() => {
    const isVertical = height < width;
    return {
      widthInPixels: isVertical ? Math.min(20, width * 0.1) : width * 0.8,
      heightInPixels: !isVertical ? Math.min(20, height * 0.1) : height * 0.8,
      leftInPixels: isVertical ? -4.5 * Math.min(width, height) / 10 : 0,
      topInPixels: !isVertical ? -4.5 * Math.min(width, height) / 10 : 0,
      isVertical
    }
  }, [width, height]);

  return <>
    <slider minimum={minDimension}
            maximum={maxDimension}
            value={defDimension}
            step={1}
            barOffset={0}
            thumbWidth={isVertical ? widthInPixels : heightInPixels}
            isThumbClamped
            widthInPixels={widthInPixels}
            heightInPixels={heightInPixels}
            leftInPixels={leftInPixels}
            topInPixels={topInPixels}
            isVertical={isVertical}
            onValueChangedObservable={(a: number) => setDimensions(a, a)}
    />
  </>;
}