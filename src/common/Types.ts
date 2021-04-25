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

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 0) {
    this.r = Color.validate(r);
    this.b = Color.validate(b);
    this.g = Color.validate(g);
    this.a = Color.validate(a);
  }

  toHexString() {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
  }

  asArray(): ColorArray {
    return [this.r, this.g, this.b, this.a];
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

  static FromArray([r, g, b, a]: ColorArray) {
    return new Color(r, g, b, a);
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
  maxDimension: 40,
  defDimension: 30,
}