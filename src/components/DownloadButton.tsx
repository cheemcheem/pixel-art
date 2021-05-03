import download from "downloadjs";
import { PNG } from "pngjs";
import { useCallback } from "react";
import { ColorArray } from "../common/Types";
import './DownloadButton.css';

export default function DownloadButton({ grid }: { grid: ColorArray[][] }) {

  const onClick = useCallback(() => {
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

  return (
    <div id="download-button-container">
      <button id="download-button" onClick={onClick}>save</button>
    </div>
  );
}
