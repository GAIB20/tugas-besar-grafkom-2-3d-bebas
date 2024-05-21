import { Matrix4 } from "src/math/matrix4";
import { Vector3 } from "src/math/vector3";
import { Transform } from "src/math/transform";
import { NODE_TYPE } from "src/types/serializer";
import { INode } from "src/types/deserializer";
import {
  AnimationClip,
  AnimationPath,
  AnimationTRS,
} from "src/types/animation";

export class Node {
  protected _name: string = "";
  protected _position: Vector3 = new Vector3();
  protected _transform: Transform = new Transform({
    translation: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: new Vector3(1, 1, 1),
  });

  protected _localMatrix: Matrix4 = Matrix4.identity();
  protected _worldMatrix: Matrix4 = Matrix4.identity();
  protected _parent?: Node;
  protected _children: Node[] = [];
  protected _type!: NODE_TYPE;
  private _animation!: AnimationClip;

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    this._position = value;
  }

  get rotation(): Vector3 {
    return this._transform.rotation;
  }

  set rotation(value: Vector3) {
    this._transform.rotation = value;
    this.computeWorldMatrix();
  }

  set rotateX(value: number) {
    this._transform.rotation.x = value;
    this.computeWorldMatrix();
  }
  set rotateY(value: number) {
    this._transform.rotation.y = value;
    this.computeWorldMatrix();
  }
  set rotateZ(value: number) {
    this._transform.rotation.z = value;
    this.computeWorldMatrix();
  }

  get scale(): Vector3 {
    return this._transform.scale;
  }

  set scale(value: Vector3) {
    this._transform.scale = value;
    this.computeWorldMatrix();
  }

  set translate(value: Vector3) {
    this._transform.translation = value;
    this.position.x += value.x;
    this.position.y += value.y;
    this.position.z += value.z;
    this.computeWorldMatrix();
  }

  set translateX(value: number) {
    this._transform.translation.x = value;
    this.position.x += value;
    this.computeWorldMatrix();
  }
  set translateY(value: number) {
    this._transform.translation.y = value;
    this.position.y += value;
    this.computeWorldMatrix();
  }
  set translateZ(value: number) {
    this._transform.translation.z = value;
    this.position.z += value;
    this.computeWorldMatrix();
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
        Matrix4.rotate3d(this._transform.rotation.toArray())
      ),
      Matrix4.scale(
        this._transform.scale.x,
        this._transform.scale.y,
        this._transform.scale.z
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
      transform: this._transform.toJSON(),
      children: this.children.map((child) => child.toJSON()),
      animation: this.animation,
    };
  }

  public static fromJSON(json: INode, node?: Node): Node {
    if (!node) node = new Node();

    node.position = Vector3.fromArray(json.position);
    node._transform = Transform.fromJSON(json.transform);
    if (json.animation) node._animation = json.animation;

    return node;
  }

  public insertFrameToAnimClip(index?: number): AnimationPath {
    let currentFrame: AnimationPath = {
      keyframe: {
        translation: this.position.toArray(),
        rotation: this._transform.rotation.toArray(),
        scale: this._transform.scale.toArray(),
      },
      children: {},
    };

    // Traverse child nodes
    for (let child of this.children) {
      // Insert each child's frame into the current frame's children object
      if (currentFrame.children)
        currentFrame.children[child._name] = child.insertFrameToAnimClip();
    }

    if (!this._animation) {
      this._animation = {
        name: this._name,
        frames: [currentFrame],
      };
    } else {
      if (index && index >= 0 && index < this._animation.frames.length)
        this._animation.frames.splice(index, 0, currentFrame);
      else this._animation.frames.push(currentFrame);
    }

    return currentFrame;
  }

  /**
   * If both this.animation and keyframe is undefined then this node is not animateable
   * If this.animation is not undefined, then this must be the animation owner
   * Keyframe is only for child animation
  */
  public applyFrameAnimation(frameIndex: number, keyframe?: AnimationTRS) {
    if (frameIndex < 0) return;

    const currentKeyframe = this.animation
      ? this.animation.frames[frameIndex].keyframe
      : keyframe;
    if (currentKeyframe) {
      if (currentKeyframe.translation) {
        this.position = Vector3.fromArray(currentKeyframe.translation);
        console.log(this._name, ": ", this._transform.translation);
      }
      if (currentKeyframe.rotation) {
        this._transform.rotation = Vector3.fromArray(currentKeyframe.rotation);
      }
      if (currentKeyframe.scale) {
        this._transform.scale = Vector3.fromArray(currentKeyframe.scale);
      }
    }

    this.computeLocalMatrix();

    // Apply to the child nodes
    if (this.animation?.frames[frameIndex]?.children) {
      const frameChildren = this.animation.frames[frameIndex].children;
      for (let childName in frameChildren) {
        const childFrame = frameChildren[childName];
        const childNode = this.children.find(
          (child) => child._name === childName
        );

        if (childNode && childFrame) {
          childNode.applyFrameAnimation(0, childFrame.keyframe);
        }
      }
    }
  }

  get animation() {
    return this._animation;
  }

  set animation(anim: AnimationClip) {
    this._animation = anim;
  }
}