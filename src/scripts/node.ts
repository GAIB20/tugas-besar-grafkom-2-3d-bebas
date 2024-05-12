import { Vector3, Matrix4 } from 'Math-library';

export class Node {
    private _position: Vector3 = new Vector3();
    private _rotation: Vector3 = new Vector3();
    private _scale: Vector3 = new Vector3(1, 1, 1);
    private _localMatrix: Matrix4 = Matrix4.identity();
    private _worldMatrix: Matrix4 = Matrix4.identity();
    private _parent?: Node;
    private _children: Node[] = [];

    get position(): Vector3 {
        return this._position;
    }

    set position(value: Vector3) {
        this._position = value; 
    }

    get rotation(): Vector3 {
        return this._rotation;
    }

    set rotation(value: Vector3) {
        this._rotation = value; 
    }

    get scale(): Vector3 {
        return this._scale;
    }

    set scale(value: Vector3) {
        this._scale = value; 
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
        this._localMatrix = Matrix4.mul(
            Matrix4.translation3d(this._position),
            Matrix4.rotation3d(this._rotation),
            Matrix4.scale3d(this._scale)
        );
    }

    computeWorldMatrix(updateParent=true, updateChildren=true) {
        if (updateParent && this.parent) {
            this.parent.computeWorldMatrix(true, false);
        }
        
        this.computeLocalMatrix();
        
        if (this.parent) {
            this._worldMatrix = Matrix4.mul(this.parent.worldMatrix, this._localMatrix);
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