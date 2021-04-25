import { Color, ColorArray } from "../../common/Types";
import { useContext, useEffect } from "react";
import GridCanvasContext from "../../common/GridCanvasContext";

type ColourGridBoxProps = {
  col: ColorArray,
  colIndex: number,
  rowIndex: number,
  columnCount: number,
  rowCount: number,
  border: boolean,
};

export default function ColourGridBox({ col, colIndex, rowIndex, columnCount, rowCount, border }
  : ColourGridBoxProps) {
  const { canvas } = useContext(GridCanvasContext);
  
  useEffect(() => {
    let unmount = () => { };

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const {width, height} = ctx.canvas;
        const boxWidth = width / columnCount;
        const boxHeight = height / rowCount;
        const fillColour = Color.FromArray(col).toHexString();
        const box: [x: number, y: number, w: number, h: number] = [
          boxWidth * colIndex,
          boxHeight * rowIndex,
          boxWidth,
          boxHeight,
        ];

        ctx.fillStyle = fillColour;
        ctx.strokeStyle = fillColour;
        ctx.lineWidth = 1;
        ctx.fillRect.apply(ctx, box);

        if (border) {
          ctx.strokeStyle = "#696969";
        }
        ctx.strokeRect.apply(ctx, box);
        
        unmount = () => ctx.clearRect.apply(ctx, box);
      }
    }

    return unmount;
  }, [canvas, col, colIndex, rowIndex, columnCount, rowCount, border])

  return <></>;
};
