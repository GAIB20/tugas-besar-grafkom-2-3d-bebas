export class Vector2 {
  private _x: number;
  private _y: number;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  public toArray(): number[] {
    return [this._x, this._y];
  }

  public static fromArray(array: number[]): Vector2 {
    return new Vector2(array[0], array[1]);
  }

  public clone() {
    return Vector2.fromArray(this.toArray());
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public set x(x: number) {
    this._x = x;
  }

  public set y(y: number) {
    this._y = y;
  }

  set (array: number[]) {
    this._x = array[0];
    this._y = array[1];
    return this;
  }

  public static zero() {
    return new Vector2(0, 0);
  }

  public static subtract(v1: Vector2, v2: Vector2) {
    return new Vector2(v1._x - v2._x, v1._y - v2._y);
  }

  public static add(v1: Vector2, v2: Vector2) {
    return new Vector2(v1._x + v2._x, v1._y + v2._y);
  }

  public static dot(a: Vector2, b: Vector2) {
    return a._x * b._x + a._y * b._y;
  }

  public static cross(a: Vector2, b: Vector2) {
    return a._x * b._y - a._y * b._x;
  }
}
