import { Matrix4 } from "src/math/matrix4";
import { Node } from "src/scripts/node";

export abstract class Camera extends Node {
  protected _projectionMatrix = Matrix4.identity();
  private _inverseWorldMatrix = Matrix4.identity();

  public computeWorldMatrix() {
    super.computeWorldMatrix();

    this._inverseWorldMatrix = this.worldMatrix.inverse();
  }

  get viewProjectionMatrix() {
    this.computeWorldMatrix();

    return Matrix4.multiply(
      this.projectionMatrix,
      this._inverseWorldMatrix,
      true
    );
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }

  public abstract computeProjectionMatrix(): void;
}
