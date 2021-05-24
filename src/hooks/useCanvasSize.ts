import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { CANVAS_SETTINGS } from "../common/Types";
const { minResolution, defaultResolution, maxResolution } = CANVAS_SETTINGS;

export default function useCanvasSize() {

    const { width, height } = useWindowSize();
    const [resolution, setResolution] = useState({ x: defaultResolution, y: defaultResolution });
    useEffect(() => {
        let newResolution = minResolution;

        const marginsWidth = 200;
        const remainingWidth = width - marginsWidth;

        const headerFooterHeight = 256;
        const remainingHeight = height - headerFooterHeight;

        if (remainingWidth < remainingHeight) {
            if (remainingWidth < maxResolution) {
                if (remainingWidth > minResolution) {
                    newResolution = remainingWidth;
                } else {
                    newResolution = minResolution;
                }
            } else {
                newResolution = maxResolution;
            }
        } else {
            if (remainingHeight < maxResolution) {
                if (remainingHeight > minResolution) {
                    newResolution = remainingHeight;
                } else {
                    newResolution = minResolution;
                }
            } else {
                newResolution = maxResolution;
            }
        }
        setResolution({ x: newResolution, y: newResolution });
    }, [width, height])

    return resolution;
}