import { Camera } from "./camera";
import { Matrix4 } from "src/math/matrix4";

export class PerspectiveCamera extends Camera {
  fovy: number;
  aspect: number;
  near: number;
  far: number;

  constructor(fovy: number, aspect: number, near: number, far: number) {
    // TODO: check this
    super(); // Setup Node
    this.fovy = fovy;
    this.aspect = aspect;
    this.near = near;
    this.far = far;

    // Jangan lupa untuk panggil computeProjectionMatrix() setiap
    // kali mengubah nilai fovy, aspect, near, dan far.
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // TODO: check this
    // M4.perspective() menghasilkan proyeksi matriks perspective
    // dengan 4 tupel fovy, aspect, near, dan far.
    this._projectionMatrix = Matrix4.perspective(
      this.fovy,
      this.aspect,
      this.near,
      this.far
    );
  }
}
