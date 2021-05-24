import { useMemo, useState } from "react";
import { useCookie } from "react-use";
import { GRID_SETTINGS } from "../common/Types";
const {defDimension} = GRID_SETTINGS;

export default function useDimension(): [number, (dimension: number) => void] {
      // todo store this in cookies
  const [dimensionCookie, setDimensionCookie] = useCookie("grid-dim");
  const [dimension, setDimension] = useState(dimensionCookie && !dimensionCookie.match(/[^0-9]/) ? Number(dimensionCookie) : defDimension);
  
  const setGlobalDimension = useMemo(() => (dim: number) => {
    setDimension(dim);
    setDimensionCookie(dim.toString());
  }, [setDimensionCookie])

  return [dimension, setGlobalDimension];
}