import { Camera } from "./camera";
import { Matrix4 } from "src/math/matrix4";

export class ObliqueCamera extends Camera {
  theta: number;
  phi: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  near: number;
  far: number;

  constructor(
    theta: number,
    phi: number,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ) {
    super(); // Setup Node
    this.theta = theta;
    this.phi = phi;

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;

    // Jangan lupa untuk panggil computeProjectionMatrix() setiap
    // kali mengubah nilai theta dan phi.
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // M4.oblique() menghasilkan proyeksi matriks oblique
    // dengan 2 tupel theta dan phi + 6 tuple orthographic.
    this._projectionMatrix = Matrix4.oblique(
      this.theta,
      this.phi,
      this.left / this.zoom,
      this.right / this.zoom,
      this.bottom / this.zoom,
      this.top / this.zoom,
      this.near,
      this.far
    );
  }
}
