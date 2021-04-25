import { PropsWithChildren, useState } from "react";
import GridCanvasContext from "../common/GridCanvasContext";
import './GridCanvas.css';

const GridCanvas = ({ children }: PropsWithChildren<any>) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const resolution = { x: 1000, y: 1000 };

    return <>
        <canvas width={resolution.x}
            height={resolution.y}
            id="pixel-art-canvas"
            onContextMenu={(e) => e.preventDefault()}
            ref={setCanvas} >
            Canvas displaying pixel art drawing.
        </canvas>
        <GridCanvasContext.Provider value={{ canvas, resolution }}>
            {children}
        </GridCanvasContext.Provider>
    </>
};

export default GridCanvas;