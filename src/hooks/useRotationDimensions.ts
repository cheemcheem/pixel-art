import {useMemo} from "react";
import {useWindowSize} from "react-use";

type Side = "top" | "bottom" | "left" | "right";

type useRotationsDimensionsProps = {
  longSidePercent: number,
  shortSidePercent: number,
  shortSideMinPixels: number,
  shortSideOffSetPercent: number,
  default: { vertical: Side, horizontal: Side },
}
const useRotationDimensions = ({
                                 longSidePercent,
                                 shortSidePercent,
                                 shortSideMinPixels,
                                 shortSideOffSetPercent,
                                 default: {vertical, horizontal},
                               }: useRotationsDimensionsProps) => {
  const {width, height} = useWindowSize();

  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isHorizontal} = useMemo(() => {
    const isHorizontal = height < width;
    const offSetBase = shortSideOffSetPercent * Math.min(width, height) + shortSideMinPixels;
    const offSetType = isHorizontal ? vertical : horizontal;
    const topInPixels = (() => {
      switch (offSetType) {
        case "top":
        case "bottom":
          return 0;
        case "left":
          return -offSetBase;
        case "right":
          return offSetBase;
      }
    })();
    const leftInPixels = (() => {
      switch (offSetType) {
        case "top":
          return -offSetBase;
        case "bottom":
          return offSetBase;
        case "left":
        case "right":
          return 0;
      }
    })();
    return {
      widthInPixels: isHorizontal ? Math.min(shortSideMinPixels, width * shortSidePercent) : width * longSidePercent,
      heightInPixels: !isHorizontal ? Math.min(shortSideMinPixels, height * shortSidePercent) : height * longSidePercent,
      leftInPixels,
      topInPixels,
      isHorizontal,
    }
  }, [height, width, shortSideOffSetPercent, shortSideMinPixels, vertical, horizontal, shortSidePercent, longSidePercent]);

  return {widthInPixels, heightInPixels, leftInPixels, topInPixels, isHorizontal};
}

export default useRotationDimensions;