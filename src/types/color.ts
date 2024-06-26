export class Color {
  public r: number; // max 1
  public g: number; // max 1
  public b: number; // max 1
  public a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public getComponents(is8Bit:boolean =false): number[] {
    if (is8Bit) {
      return [
        Math.round(this.r * 255),
        Math.round(this.g * 255),
        Math.round(this.b * 255),
        Math.round(this.a * 255)
      ];
    }
    return [this.r, this.g, this.b, this.a]
  }

  public getRGBComponents(): number[] {
    return [this.r, this.g, this.b];
  }

  public toHex(): string {
    const r = Math.round(this.r * 255).toString(16).padStart(2, '0');
    const g = Math.round(this.g * 255).toString(16).padStart(2, '0');
    const b = Math.round(this.b * 255).toString(16).padStart(2, '0');
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
