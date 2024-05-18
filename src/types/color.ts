export class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public getComponents(): number[] {
    return [this.r, this.g, this.b, this.a]
  }

  public toHex(): string {
    let r = Math.round(this.r * 255).toString(16);
    let g = Math.round(this.g * 255).toString(16);
    let b = Math.round(this.b * 255).toString(16);
    return `#${r}${g}${b}`;
  }

  public static black(): Color {
    return new Color(0, 0, 0);
  }

  public static white(): Color {
    return new Color(1, 1, 1);
  }

  public static fromHex(hex: string): Color {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
    return new Color(r, g, b);
  }

  public static size(): number {
    return 4;
  }
}
