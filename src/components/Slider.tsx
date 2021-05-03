import React, { useEffect, useMemo } from "react";
import { useMedia, useSlider } from "react-use";
import { GRID_SETTINGS } from "../common/Types";
import './Slider.css';

const { minDimension, maxDimension } = GRID_SETTINGS;

type SliderPropsType = {
  dimension: number,
  setSliding: React.Dispatch<React.SetStateAction<boolean>>,
  setDimension: (dimension: number) => void,
};

export default function Slider({ dimension, setSliding, setDimension }: SliderPropsType) {

  const ref = React.useRef(null);
  const vertical = useMedia("(min-aspect-ratio: 9 / 10)");
  const { isSliding, value } = useSlider(ref, {vertical, reverse: vertical});

  useEffect(() => setSliding(isSliding),  [isSliding, setSliding]);
  useEffect(() => {
    /*
      On initial render, this effect would have run and set dimension to minDimension since value is 0.
      So this if statement protects against this case.
      It does not affect regular usage since 0.1 etc would be floored to 0 and therefore minDimension is still reachable.
    */
    if (value > 0) {
      setDimension(Math.floor(minDimension + value * (maxDimension - minDimension)))
    }
  }, [value, setDimension]);

  const sliderHandleOffset = useMemo(() => `calc((100% - 40px) * ${(dimension - minDimension) / (maxDimension - minDimension)} )`, [dimension])
  return (
    <div id="slider-container">
      <div ref={ref} id="slider">
      <div id="slider-handle-offset" style={vertical ? { height: sliderHandleOffset} : { width: sliderHandleOffset}} />
      <div id="slider-handle"><span>{dimension}</span></div>
    </div>
    </div>
  );
}
