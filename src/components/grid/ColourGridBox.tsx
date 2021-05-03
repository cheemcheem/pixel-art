import { Color, ColorArray } from "../../common/Types";
import { memo, useEffect } from "react";

type ColourGridBoxProps = {
  col: ColorArray,
  colIndex: number,
  rowIndex: number,
  columnCount: number,
  rowCount: number,
  border: boolean,
  ctx: CanvasRenderingContext2D,
};

function ColourGridBox({ col, colIndex, rowIndex, columnCount, rowCount, border, ctx }
  : ColourGridBoxProps) {
  useEffect(() => {
    const { width, height } = ctx.canvas;
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
      ctx.strokeStyle = Color.Grey().toHexString();
    }
    ctx.strokeRect.apply(ctx, box);

  }, [ctx, col, colIndex, rowIndex, columnCount, rowCount, border])

  return <></>;
};

export default memo(ColourGridBox, (prev, next) => {
  const { col: colPrev, colIndex: colIndexPrev, rowIndex: rowIndexPrev, columnCount: columnCountPrev, rowCount: rowCountPrev, border: borderPrev, ctx: ctxPrev } = prev;
  const { col: colNext, colIndex: colIndexNext, rowIndex: rowIndexNext, columnCount: columnCountNext, rowCount: rowCountNext, border: borderNext, ctx: ctxNext } = next;

  return Color.equals(colPrev, colNext)
    && colIndexPrev === colIndexNext
    && rowIndexPrev === rowIndexNext
    && columnCountPrev === columnCountNext
    && rowCountPrev === rowCountNext
    && borderPrev === borderNext
    && ctxPrev === ctxNext
    ;
})