import { Matrix4 } from "src/math/matrix4";
import { Vector3 } from "src/math/vector3";
import { Transform } from "src/math/transform";

export class Node {
  protected _position: Vector3 = new Vector3();
  protected _transfrom: Transform = new Transform({
    translation: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  });

  protected _localMatrix: Matrix4 = Matrix4.identity();
  protected _worldMatrix: Matrix4 = Matrix4.identity();
  protected _parent?: Node;
  protected _children: Node[] = [];

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
  }

  get rotation(): Vector3 {
    return this._transfrom.rotation;
  }

  set rotation(value: Vector3) {
    this._transfrom.rotation = value;
  }

  set rotateX(value: number) {
    this._transfrom.rotation.x = value;
  }
  set rotateY(value: number) {
    this._transfrom.rotation.y = value;
  }
  set rotateZ(value: number) {
    this._transfrom.rotation.z = value;
  }

  get scale(): Vector3 {
    return this._transfrom.scale;
  }

  set scale(value: Vector3) {
    this._transfrom.scale = value;
  }

  get localMatrix(): Matrix4 {
    return this._localMatrix;
  }

  get worldMatrix(): Matrix4 {
    return this._worldMatrix;
  }

  get parent(): Node | undefined {
    return this._parent;
  }

  set parent(value: Node | undefined) {
    this._parent = value;
  }

  get children(): Node[] {
    return this._children;
  }

  computeLocalMatrix() {
    this._localMatrix = Matrix4.multiply(
      Matrix4.multiply(
        Matrix4.translate(this._position.x, this._position.y, this._position.z),
        Matrix4.rotate3d(this._transfrom.rotation.toArray())
      ),
      Matrix4.scale(
        this._transfrom.scale.x,
        this._transfrom.scale.y,
        this._transfrom.scale.z
      )
    ).transpose();

    console.log("Computed local mat: ", this._localMatrix)
  }

  computeWorldMatrix(updateParent = true, updateChildren = true) {
    if (updateParent && this.parent) {
      this.parent.computeWorldMatrix(true, false);
    }

    this.computeLocalMatrix();

    if (this.parent) {
      this._worldMatrix = Matrix4.multiply(
        this.parent.worldMatrix,
        this._localMatrix
      );
    } else {
      this._worldMatrix = this._localMatrix.clone();
    }

    if (updateChildren) {
      for (let i = 0; i < this._children.length; i++) {
        this._children[i].computeWorldMatrix(false, true);
      }
    }
  }

  addChild(child: Node) {
    if (child.parent) {
      throw new Error("Node already has a parent.");
    }
    child.parent = this;
    this._children.push(child);
  }

  removeChild(child: Node) {
    const index = this._children.indexOf(child);
    if (index !== -1) {
      child.parent = undefined;
      this._children.splice(index, 1);
    }
  }

  detachFromParent() {
    if (this._parent) {
      this._parent.removeChild(this);
    }
  }

  // computeLocalMatrix() {
  //     this._localMatrix = Matrix4.compose(this._position, this._rotation, this._scale);
  // }

  // computeWorldMatrix() {
  //     if (this._dirty) {
  //         if (this._parent) {
  //             this._worldMatrix = Matrix4.multiply(this._parent.worldMatrix, this._localMatrix);
  //         } else {
  //             this._worldMatrix = this._localMatrix.clone();
  //         }
  //         this._dirty = false;
  //     }
  //     for (const child of this._children) {
  //         child.computeWorldMatrix();
  //     }
  // }
}
