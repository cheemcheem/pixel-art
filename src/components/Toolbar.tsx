import Slider, { SliderPropsType } from "./toolbar/Slider";
import './Toolbar.css';
import ToolbarButton from "./toolbar/ToolbarButton";

import Pen from './toolbar/Pen';
import Eraser from './toolbar/Eraser';
import Reset from './toolbar/Reset';
import Undo from './toolbar/Undo';
import Redo from './toolbar/Redo';
import Download from './toolbar/Download';
import { useCallback, useContext, useMemo, useState } from "react";
import PenColourContext from "../common/PenColourContext";
import { Color, ColorArray, ERASE_COLOUR } from "../common/Types";
import download from "downloadjs";
import { PNG } from "pngjs";

type ToolbarProps = SliderPropsType & {
    grid: ColorArray[][],
    resetGrid: () => void,
};

export default function Toolbar({ dimension, grid, resetGrid, setDimension, setSliding }: ToolbarProps) {

    const { penColour, setPenColour } = useContext(PenColourContext);

    const onSaveButton = useCallback(() => {
        const flatMap = grid
            .flatMap(column => column)
            .flatMap(([r, g, b, a]) => [r, g, b, a === 0 ? 255 : a ?? 255])
            ;

        const png = new PNG({});
        png.width = grid.length;
        png.height = grid[0].length;
        png.data = Buffer.from(flatMap);
        png.pack();

        download(Uint8Array.from(PNG.sync.write(png)), "image.png", "image/png");
    }, [grid]);

    const palette = useMemo(() => Color.Palette(), []);
    const [paletteIndex, setPaletteIndex] = useState(0);
    const rotatePalette = useCallback(() => {
        if (paletteIndex === palette.length - 1) {
            setPenColour(palette[0]);
            setPaletteIndex(0);
        } else {
            setPenColour(palette[paletteIndex + 1]);
            setPaletteIndex(paletteIndex + 1);
        }
    }, [palette, paletteIndex, setPenColour]);

    return (
        <div id="toolbar">
            <Slider dimension={dimension} setDimension={setDimension} setSliding={setSliding} />
            <ToolbarButton
                gridArea="co"
                children={undefined}
                colour={palette[paletteIndex]}
                text="colour"
                onClick={rotatePalette}
            />
            <ToolbarButton
                gridArea="dr"
                text="draw"
                disabled={!ERASE_COLOUR.equals(penColour)}
                onClick={() => setPenColour(palette[paletteIndex])}
            ><Pen /></ToolbarButton>
            <ToolbarButton
                gridArea="er"
                text="erase"
                disabled={ERASE_COLOUR.equals(penColour)}
                onClick={() => setPenColour(ERASE_COLOUR)}
            ><Eraser /></ToolbarButton>
            <ToolbarButton
                gridArea="rs"
                text="reset"
                onClick={resetGrid}
            ><Reset /></ToolbarButton>

            <ToolbarButton
                gridArea="un"
                text="undo"
                onClick={() => { }}
            ><Undo /></ToolbarButton>

            <ToolbarButton
                gridArea="re"
                text="redo"
                onClick={() => { }}
            ><Redo /></ToolbarButton>
            <ToolbarButton
                gridArea="sv"
                text="save"
                onClick={onSaveButton}
            ><Download/></ToolbarButton>
        </div>
    );
}
