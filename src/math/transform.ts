import { Vector3 } from "./vector3";

export class Transform {
  private _translation: Vector3;
  private _rotation: Vector3;
  private _scale: Vector3;

  constructor(props: {
    translation: Vector3;
    rotation: Vector3;
    scale: Vector3;
  }) {
    this._translation = props.translation.clone();
    this._rotation = props.rotation.clone();
    this._scale = props.scale.clone();
  }

  public clone() {
    return new Transform({
      translation: this._translation,
      rotation: this._rotation,
      scale: this._scale,
    });
  }

  public get translation() {
    return this._translation;
  }

  public get rotation() {
    return this._rotation;
  }

  public get scale() {
    return this._scale;
  }

  public set translation(t: Vector3) {
    this._translation = t;
  }

  public set rotation(r: Vector3) {
    this._rotation = r;
  }

  public set scale(s: Vector3) {
    this._scale = s;
  }
}
