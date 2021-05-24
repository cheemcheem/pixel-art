import { createContext } from "react";

type GridCanvasContextType = {
    canvas: HTMLCanvasElement|null,
    resolution: {
        x: number,
        y: number,
    }
};

const defaultContext: GridCanvasContextType = {
    canvas: null,
    resolution: {
        x: 1000,
        y: 1000,
    }
};

export default createContext(defaultContext);