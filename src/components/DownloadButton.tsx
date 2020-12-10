import download from "downloadjs";
import {PNG} from "pngjs";
import React, {useEffect, useMemo, useRef} from "react";
import {useWindowSize} from "react-use";

const DownloadButton = ({grid}: { grid: number[][][] }) => {
  const {width, height} = useWindowSize();
  const {widthInPixels, heightInPixels, leftInPixels, topInPixels, isVertical} = useMemo(() => {
    const isVertical = height < width;
    return {
      widthInPixels: isVertical ? Math.min(40, width * 0.1) : width * 0.8,
      heightInPixels: !isVertical ? Math.min(40, height * 0.1) : height * 0.8,
      leftInPixels: isVertical ? 0.40 * Math.min(width, height) + 40 : 0,
      topInPixels: !isVertical ? 0.40 * Math.min(width, height) + 40 : 0,
      isVertical,
    }
  }, [width, height]);

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
                 paddingRightInPixels={isVertical ? 4 : 0}
                 fontSizeInPixels={18}
                 text={isVertical ? "s\na\nv\ne" : "save"}/>
    </babylon-button>
  </>;
}

export default DownloadButton;