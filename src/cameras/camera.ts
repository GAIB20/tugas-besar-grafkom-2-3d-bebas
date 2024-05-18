import { Matrix4 } from "src/math/matrix4";
import { Node } from "src/core/node";
import { NODE_TYPE } from "src/types/serializer";

export abstract class Camera extends Node {
  protected _projectionMatrix = Matrix4.identity();
  private _inverseWorldMatrix = Matrix4.identity();
  public zoom = 1;

  constructor() {
    super();

    this._type = NODE_TYPE.CAMERA;
  }

  public computeWorldMatrix() {
    super.computeWorldMatrix();

    // TODO: use the commented code after Matrix4.inverse() is fixed
    if (
      this.worldMatrix.toArray()[0] == 1 &&
      this.worldMatrix.toArray()[5] == 1 &&
      this.worldMatrix.toArray()[10] == 1 &&
      this.worldMatrix.toArray()[14] == 0
    ) {
      this._inverseWorldMatrix = Matrix4.identity();
    } else {
      this._inverseWorldMatrix = this.worldMatrix.inverse();
    }

    // this._inverseWorldMatrix = Matrix4.identity();
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

  public updateZoom(inc: number) {
    this.zoom += inc;

    this.computeProjectionMatrix();
  }

  public resetZoom() {
    this.zoom = 1;

    this.computeProjectionMatrix();
  }

  public abstract computeProjectionMatrix(): void;
}
