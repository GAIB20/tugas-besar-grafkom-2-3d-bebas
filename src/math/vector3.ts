import { BufferAttribute } from "src/geometries/buffer-attribute";

export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number = -1, y: number = -1, z: number = -1) {
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

  set (array: number[]) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    return this;
  }

  public multiplyScalar(scalar: number) {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;
    return this;
  }

  public static copy(v: Vector3) {
    return new Vector3(v.x, v.y, v.z);
  }

  public static zero() {
    return new Vector3(0, 0, 0);
  }

  public static subtract(v1: Vector3, v2: Vector3) {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    const z = v1.z - v2.z;

    return new Vector3(x, y, z);
  }

  public static subtractToArray(v1: Vector3, v2: Vector3) {
    const result: number[] = new Array(3);
    result[0] = v1.x - v2.x;
    result[1] = v1.y - v2.y;
    result[2] = v1.z - v2.z;

    return result;
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

  public toJSON() {
    return this.toArray();
  }
}
