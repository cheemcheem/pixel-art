import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";

export default function useResizing() {
    const size = useWindowSize();

    const [lastSize, setLastSize] = useState(size);
    useEffect(() => setLastSize(size), [size]);
    const resizing = useMemo(() => size.width !== lastSize.width || size.height !== lastSize.height, [size, lastSize]);
  
    return resizing;
}