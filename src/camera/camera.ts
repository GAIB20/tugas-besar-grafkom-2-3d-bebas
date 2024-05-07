// TODO: Update this imports with the implemented M4
// @ts-ignore
import { Matrix4 } from "src/math/matrix";

export abstract class Camera extends Node {
  protected _projectionMatrix = Matrix4.identity();
  private _inverseWorldMatrix = Matrix4.identity();

  public computeWorldMatrix() {
    // TODO: Update this with the implemented `Node` class
    // @ts-ignore
    super.computeWorldMatrix();
    // @ts-ignore
    this._inverseWorldMatrix = Matrix4.inv(this.worldMatrix);
  }

  get viewProjectionMatrix() {
    this.computeWorldMatrix();
    return this.projectionMatrix.premul(this._inverseWorldMatrix);
  }

  get projectionMatrix() {
    return this._projectionMatrix;
  }

  public abstract computeProjectionMatrix(): void;
}
