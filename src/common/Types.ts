import {Color3} from "@babylonjs/core";

export const CLICK_TYPES = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
};

export const ERASE_COLOUR = Color3.White();
export const DEFAULT_COLOUR = Color3.Red();

export type ColourGridProps = {
  width: number,
  height: number,
  colours: number[][][],
}

export const GRID_SETTINGS = {
  minDimension: 4,
  maxDimension: 40,
  defDimension: 30,
}