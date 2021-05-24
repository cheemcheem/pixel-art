import React, { useEffect, useMemo } from "react";
import { useMedia, useSlider } from "react-use";
import { GRID_SETTINGS } from "../../common/Types";
import ErrorBoundary from "../ErrorBoundary";
import './Slider.css';

const { minDimension, maxDimension } = GRID_SETTINGS;

export type SliderPropsType = {
  dimension: number,
  setSliding: React.Dispatch<React.SetStateAction<boolean>>,
  setDimension: (dimension: number) => void,
};

function UnsafeSlider({ dimension, setSliding, setDimension }: SliderPropsType) {

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
  const handleKey = useMemo<React.KeyboardEventHandler<HTMLDivElement>>(() => (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        if (dimension < maxDimension) {
          setDimension(dimension + 1);
          e.stopPropagation();
        }
      }

      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        if (dimension > minDimension) {
          setDimension(dimension - 1);
          e.stopPropagation();
        }
      }
      
  }, [dimension, setDimension]);

  const sliderHandleOffset = useMemo(() => `calc((100% - var(--slider-size)) * ${(dimension - minDimension) / (maxDimension - minDimension)} )`, [dimension])
  return (
    <div id="slider" className="toolbar-item">
      <div ref={ref} id="slider-body">
      <div id="slider-handle-offset" style={vertical ? { height: sliderHandleOffset} : { width: sliderHandleOffset}} />
      <div id="slider-handle" tabIndex={0} onKeyDown={handleKey}><span>{dimension}</span></div>
    </div>
    </div>
  );
}

export default function Slider(props: SliderPropsType) {
  return (
    <ErrorBoundary>
      {UnsafeSlider(props)}
    </ErrorBoundary>
  );
}