import { Matrix4 } from "src/math/matrix4";
import { Vector3 } from "src/math/vector3";
import { Transform } from "src/math/transform";
import { NODE_TYPE } from "src/types/serializer";
import { INode } from "src/types/deserializer";

export class Node {
  protected _name: string = "";
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
  protected _type!: NODE_TYPE;

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
    this.computeWorldMatrix();
  }

  set rotateX(value: number) {
    this._transfrom.rotation.x = value;
    this.computeWorldMatrix();
  }
  set rotateY(value: number) {
    this._transfrom.rotation.y = value;
    this.computeWorldMatrix();
  }
  set rotateZ(value: number) {
    this._transfrom.rotation.z = value;
    this.computeWorldMatrix();
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
  }

  computeWorldMatrix(updateParent = true, updateChildren = true) {
    if (updateParent && this.parent) {
      this.parent.computeWorldMatrix(true, false);
    }

    this.computeLocalMatrix();

    if (this.parent) {
      this._worldMatrix = Matrix4.multiply(
        this._localMatrix,
        this.parent.worldMatrix
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

  public toJSON(): {} {
    return {
      name: this._name,
      object_type: this._type,
      position: this.position.toJSON(),
      transform: this._transfrom.toJSON(),
      children: this.children.map((child) => child.toJSON()),
    };
  }

  public static fromJSON(json: INode, node?: Node): Node {
    if (!node) node = new Node();

    node.position = Vector3.fromArray(json.position);
    node._transfrom = Transform.fromJSON(json.transform);

    return node;
  }
}
