import { Camera } from "./camera";
import { Matrix4 } from "src/math/matrix4";

export class ObliqueCamera extends Camera {
  theta: number;
  phi: number;

  constructor(theta: number, phi: number) {
    // TODO: check this
    super(); // Setup Node
    this.theta = theta;
    this.phi = phi;

    // Jangan lupa untuk panggil computeProjectionMatrix() setiap
    // kali mengubah nilai theta dan phi.
    this.computeProjectionMatrix();
  }

  computeProjectionMatrix() {
    // TODO: check this
    // M4.oblique() menghasilkan proyeksi matriks oblique
    // dengan 2 tupel theta dan phi.
    this._projectionMatrix = Matrix4.oblique(this.theta, this.phi);
  }
}
