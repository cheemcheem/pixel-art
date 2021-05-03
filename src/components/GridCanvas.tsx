import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import GridCanvasContext from "../common/GridCanvasContext";
import useCanvasSize from "../hooks/useCanvasSize";
import './GridCanvas.css';


const GridCanvas = ({ children }: PropsWithChildren<any>) => {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

    const resolution = useCanvasSize();

    const devicePixelRatio = useMemo(() => window.devicePixelRatio, []);

    useEffect(() => {
        const setNewVH = () => {
            const vh = window.innerHeight / 100;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setNewVH();

        window.addEventListener('resize', setNewVH);

        return () => window.removeEventListener('resize', setNewVH);
    }, []);

    return (<>
        <div id="pixel-art-canvas-container">
            <canvas
                width={resolution.x * devicePixelRatio}
                height={resolution.y * devicePixelRatio}
                id="pixel-art-canvas"
                onContextMenu={(e) => e.preventDefault()}
                ref={setCanvas} >
                Canvas displaying pixel art drawing.
            </canvas>
        </div>
        <GridCanvasContext.Provider value={{ canvas, resolution }}>
            {children}
        </GridCanvasContext.Provider>
    </>);
};

export default GridCanvas;