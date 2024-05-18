import { BufferAttribute } from "src/geometries/buffer-attribute";

export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public toArray(): number[] {
    return [this._x, this._y, this._z];
  }

  public static fromArray(array: number[]): Vector3 {
    return new Vector3(array[0], array[1], array[2]);
  }

  public clone() {
    return Vector3.fromArray(this.toArray());
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  public get z() {
    return this._z;
  }

  public set x(x: number) {
    this._x = x;
  }

  public set y(y: number) {
    this._y = y;
  }

  public set z(z: number) {
    this._z = z;
  }

  public static zero() {
    return new Vector3(0, 0, 0);
  }

  public static subtract(v1: Vector3, v2: Vector3) {
    return new Vector3(v1._x - v2._x, v1._y - v2._y, v1._z - v2._z);
  }

  public static add(v1: Vector3, v2: Vector3) {
    return new Vector3(v1._x + v2._x, v1._y + v2._y, v1._z + v2._z);
  }

  public static dot(v1: Vector3, v2: Vector3) {
    return v1._x * v2._x + v1._y * v2._y + v1._z * v2._z;
  }

  public static cross(v1: Vector3, v2: Vector3) {
    return new Vector3(
      v1._y * v2._z - v1._z * v2._y,
      v1._z * v2._x - v1._x * v2._z,
      v1._x * v2._y - v1._y * v2._x
    );
  }

  public normalize() {
    const length = Math.sqrt(
      this._x * this._x + this._y * this._y + this._z * this._z
    );

    this._x /= length;
    this._y /= length;
    this._z /= length;

    return this;
  }

  public toVector(attribute: BufferAttribute, index: number) {
    // Get the values from the BufferAttribute
    const attributeValues = attribute.get(index, attribute.size);
    const missingDimensions = [0, 0, 0].slice(attribute.size);

    // Combine the attributeValues and the missingDimensions to get the full set of vector values.
    const fullValues = [...attributeValues, ...missingDimensions];

    this.x = fullValues[0];
    this.y = fullValues[1];
    this.z = fullValues[2];

    return this;
  }
}
