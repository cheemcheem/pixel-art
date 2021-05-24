import { useContext, useEffect, useState } from "react";
import GridCanvasContext from "../common/GridCanvasContext";

export default function useCanvasContext() {
    const { canvas } = useContext(GridCanvasContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
    useEffect(() => {
      if (canvas) {
          // eslint-disable-next-line no-self-assign
        canvas.width = canvas.width;
      }
      if (canvas) {
        const newCtx = canvas.getContext("2d", { alpha: false });
        if (newCtx) {
          setCtx(newCtx);
        }
      }
    }, [canvas]);

    return ctx;
}