import download from "downloadjs";
import {PNG} from "pngjs";
import React, {useEffect, useRef} from "react";
import useRotationDimensions from "../hooks/useRotationDimensions";

const DownloadButton = ({grid}: { grid: number[][][] }) => {
  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isHorizontal} = useRotationDimensions({
    longSidePercent: 0.8,
    shortSidePercent: 0.1,
    shortSideMinPixels: 40,
    shortSideOffSetPercent: 0.40,
    default: {vertical: "bottom", horizontal: "right"},
  });

  const click = useRef(() => {
  });

  useEffect(() => {
    click.current = () => {
      const flatMap = grid
          .flatMap(column => column)
          .flatMap(colour => [...colour, 1])
          .map(rgb => 255 * rgb)
      ;

      const png = new PNG({});
      png.width = grid.length;
      png.height = grid[0].length;
      png.data = new Buffer(flatMap);
      png.pack();

      download(Uint8Array.from(PNG.sync.write(png)), "image.png", "image/png");
    };
  }, [grid]);

  return <>
    <babylon-button
        name={"download"}
        widthInPixels={widthInPixels}
        heightInPixels={heightInPixels}
        leftInPixels={leftInPixels}
        topInPixels={topInPixels}
        onPointerClickObservable={() => click.current()}
        color={"black"}
        thickness={0}
        background={"pink"}>
      <textBlock fontFamily={"monospace"}
                 paddingRightInPixels={isHorizontal ? 4 : 0}
                 fontSizeInPixels={18}
                 text={isHorizontal ? "s\na\nv\ne" : "save"}/>
    </babylon-button>
  </>;
}

export default DownloadButton;