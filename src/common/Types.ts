import {hsl, toHex} from 'khroma';

export const CLICK_TYPES = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
};

export type ColorArray = [r: number, g: number, b: number, a?: number];
export class Color {
  private readonly r: number;
  private readonly b: number;
  private readonly g: number;
  private readonly a: number;

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
    this.r = Color.validate(r);
    this.b = Color.validate(b);
    this.g = Color.validate(g);
    this.a = Color.validate(a);
  }

  toHexString() {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1,7);
  }

  asArray(): ColorArray {
    return [this.r, this.g, this.b, this.a];
  }

  equals(color: Color) {
    return Color.equals(this.asArray(), color.asArray());
  }

  private static validate(t: number) {
    if (t === undefined || t === null || t > 255 || t < 0) {
      throw new Error(`RGBA number ${t} is out of 0 - 255 range!`);
    }
    return t;
  }

  static White() {
    return new Color(255, 255, 255);
  }

  static Red() {
    return new Color(255, 100, 100);
  }

  static Grey() {
    return Color.FromHexString('#696969');
  }

  static Palette() {
    return [
      Color.FromHexString(toHex(hsl(0, 100, 50))),
      Color.FromHexString(toHex(hsl(60, 100, 50))),
      Color.FromHexString(toHex(hsl(120, 100, 50))),
      Color.FromHexString(toHex(hsl(180, 100, 50))),
      Color.FromHexString(toHex(hsl(240, 100, 50))),
      Color.FromHexString(toHex(hsl(300, 100, 50))),
      Color.FromHexString(toHex(hsl(360, 100, 50))),
    ];
  }

  static FromHexString(hex: string) {
    const cleaned = hex.replaceAll('#','');

    if (cleaned.length !== 6 || !cleaned.match(/([a-fA-F0-9]){6}/g)) {
      throw new Error(`Hex code '${hex}' is not a valid colour.`);
    }
    
    const r = Number.parseInt(cleaned.substr(0,2), 16);
    const g = Number.parseInt(cleaned.substr(2,2), 16);
    const b = Number.parseInt(cleaned.substr(4,2), 16);

    return new Color(r,g,b);
  }

  static FromArray([r, g, b, a]: ColorArray) {
    return new Color(r, g, b, a);
  }

  static equals([r1, g1, b1, a1]: ColorArray, [r2, g2, b2, a2]: ColorArray) {
    return r1 === r2 && g1 === g2 && b1 === b2 && a1 === a2;
  }

}

export const ERASE_COLOUR = Color.White();
export const DEFAULT_COLOUR = Color.Red();

export type ColourGridProps = {
  width: number,
  height: number,
  colours: number[][][],
}

export const GRID_SETTINGS = {
  minDimension: 4,
  maxDimension: 32,
  defDimension: 16,
}

export const CANVAS_SETTINGS = {
  minResolution: 400,
  maxResolution: 1000,
  defaultResolution: 1000,
}