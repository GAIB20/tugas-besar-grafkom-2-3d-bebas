import { degreeToRad } from "./extra";

export class Matrix4 {
  private _elements: number[];

  constructor(elements?: number[]) {
    this._elements = elements || [
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ];
  }

  public toArray(): number[] {
    return [...this._elements];
  }

  public static fromArray(array: number[]): Matrix4 {
    return new Matrix4(array);
  }

  public get elements() {
    return [...this._elements];
  }

  public set elements(elements: number[]) {
    this._elements = elements;
  }

  public static identity() {
    return new Matrix4();
  }

  /**
   * @param reverse Set multiplication in reverse order
   */
  public static multiply(m1: Matrix4, m2: Matrix4, reverse: boolean = false) {
    let a = m1._elements;
    let b = m2._elements;

    if (reverse) {
      a = m2._elements;
      b = m1._elements;
    }

    const result = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[i * 4 + k] * b[k * 4 + j];
        }
        result[i * 4 + j] = sum;
      }
    }

    return new Matrix4(result);
  }

  public static translate(x: number = 0, y: number = 0, z: number = 0) {
    return new Matrix4([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  }

  public static scale(x: number = 1, y: number = 1, z: number = 1) {
    return new Matrix4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  }

  public static rotateX(angle: number) {
    const c = Math.cos(degreeToRad(angle));
    const s = Math.sin(degreeToRad(angle));
    // prettier-ignore
    return new Matrix4([1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1]);
  }

  public static rotateY(angle: number) {
    const c = Math.cos(degreeToRad(angle));
    const s = Math.sin(degreeToRad(angle));
    return new Matrix4([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
  }

  public static rotateZ(angle: number) {
    const c = Math.cos(degreeToRad(angle));
    const s = Math.sin(degreeToRad(angle));
    return new Matrix4([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  // Angles with format X, Y, Z
  public static rotate3d(angles: number[]) {
    let mat = Matrix4.identity();
    let rotateX = Matrix4.rotateX(angles[0]);
    let rotateY = Matrix4.rotateY(angles[1]);
    let rotateZ = Matrix4.rotateZ(angles[2]);

    let resX = Matrix4.multiply(rotateX, mat);
    let resY = Matrix4.multiply(rotateY, resX);
    let resZ = Matrix4.multiply(rotateZ, resY);

    return resZ;
  }

  public static DEG2RAD: number = Math.PI / 180;

  public inverse() {
    const m = this._elements;
    // prettier-ignore
    const m00 = m[0],
      m01 = m[1],
      m02 = m[2],
      m03 = m[3];
    // prettier-ignore
    const m10 = m[4],
      m11 = m[5],
      m12 = m[6],
      m13 = m[7];
    // prettier-ignore
    const m20 = m[8],
      m21 = m[9],
      m22 = m[10],
      m23 = m[11];
    // prettier-ignore
    const m30 = m[12],
      m31 = m[13],
      m32 = m[14],
      m33 = m[15];

    const b00 = m00 * m11 - m01 * m10;
    const b01 = m00 * m12 - m02 * m10;
    const b02 = m00 * m13 - m03 * m10;
    const b03 = m01 * m12 - m02 * m11;
    const b04 = m01 * m13 - m03 * m11;
    const b05 = m02 * m13 - m03 * m12;
    const b06 = m20 * m31 - m21 * m30;
    const b07 = m20 * m32 - m22 * m30;
    const b08 = m20 * m33 - m23 * m30;
    const b09 = m21 * m32 - m22 * m31;
    const b10 = m21 * m33 - m23 * m31;
    const b11 = m22 * m33 - m23 * m32;

    const det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      throw new Error("Matrix is not invertible.");
    }

    const invDet = 1 / det;
    // prettier-ignore
    const result = [
      (m11 * b11 - m12 * b10 + m13 * b09) * invDet,
      (m02 * b10 - m01 * b11 - m03 * b09) * invDet,
      (m31 * b05 - m32 * b04 + m33 * b03) * invDet,
      (m22 * b04 - m21 * b05 - m23 * b03) * invDet,
      (m12 * b08 - m10 * b11 - m13 * b07) * invDet,
      (m00 * b11 - m02 * b08 + m03 * b07) * invDet,
      (m32 * b02 - m30 * b05 - m33 * b01) * invDet,
      (m20 * b05 - m22 * b02 + m23 * b01) * invDet,
      (m10 * b10 - m11 * b08 + m13 * b06) * invDet,
      (m01 * b08 - m00 * b10 - m03 * b06) * invDet,
      (m30 * b04 - m31 * b02 + m33 * b00) * invDet,
      (m21 * b02 - m20 * b04 - m23 * b00) * invDet,
      (m11 * b07 - m10 * b09 - m12 * b06) * invDet,
      (m00 * b09 - m01 * b07 + m02 * b06) * invDet,
      (m31 * b01 - m30 * b03 - m32 * b00) * invDet,
      (m20 * b03 - m21 * b01 + m22 * b00) * invDet,
    ];

    return new Matrix4(result);
  }

  public static orthographic(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ) {
    const rl = right - left;
    const tb = top - bottom;
    const fn = far - near;
    // prettier-ignore
    return new Matrix4([
      2 / rl,                 0,                      0,                  0,
      0,                      2 / tb,                 0,                  0,
      0,                      0,                      -2 / fn,            0,
      -(right + left) / rl,   -(top + bottom) / tb,   -(far + near) / fn, 1,
    ]);
  }

  public static perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number
  ) {
    // const f = 1 / Math.tan(fovy)
    const f = 1 / Math.tan(degreeToRad(fovy) * 0.5);
    const nf = 1 / (near - far);

    // prettier-ignore
    return new Matrix4([
      f / aspect,           0,            0,                    0,
      0,                    f,            0,                    0,
      0,                    0,            (far + near) * nf,    2 * far * near * nf,
      0,                    0,            -1,                   0,
    ]).transpose();
  }

  public static oblique(
    theta: number,
    phi: number,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ) {
    const cotTheta = 1 / Math.tan(degreeToRad(theta));
    const cotPhi = 1 / Math.tan(degreeToRad(phi));
    // prettier-ignore
    const shearTransform = new Matrix4([
      1,    0,    cotTheta,   0,
      0,    1,    cotPhi,     0,
      0,    0,    1,          0,
      0,    0,    0,          1]);

    return Matrix4.multiply(
      Matrix4.orthographic(left, right, bottom, top, near, far),
      shearTransform
    ).transpose();
  }

  public transpose() {
    const result = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[i * 4 + j] = this._elements[j * 4 + i];
      }
    }
    return new Matrix4(result);
  }

  public clone(): Matrix4 {
    if (!this.elements) {
      throw new Error("not initialized");
    }

    return Matrix4.fromArray(this.elements);
  }

  public toJSON() {
    return this.toArray();
  }
}
