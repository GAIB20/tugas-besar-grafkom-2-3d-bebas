import { Camera } from "src/cameras/camera";
import { Vector3 } from "src/math/vector3";
import { Node } from "./node.ts";
import { PerspectiveCamera } from "src/cameras/perspective";

export class Orbit {
  private _canvas: HTMLCanvasElement;
  private _camera: Camera;
  private _pivot: Node;
  private _isDisabled: boolean = false;

  private PIXEL_TO_DEGREE_RATIO = 50;
  private ZOOM_SPEED = 0.1;

  constructor(canvas: HTMLCanvasElement, cam: Camera) {
    this._canvas = canvas;
    this._camera = cam;
    this._pivot = new Node();
    this._pivot.addChild(cam);
  }

  public setupControlOrbit = () => {
    let isDragging = false;

    this._canvas.addEventListener("mousedown", () => {
      isDragging = true;
    });

    this._canvas.addEventListener("mousemove", (e) => {
      if (!isDragging || this._isDisabled) {
        return;
      }
      let dx = e.movementX;
      let dy = e.movementY;

      let x = dy * this.PIXEL_TO_DEGREE_RATIO;
      let y = dx * this.PIXEL_TO_DEGREE_RATIO;

      this._pivot.rotation = new Vector3(
        this._pivot.rotation.x - (x * Math.PI) / 180,
        this._pivot.rotation.y - (y * Math.PI) / 180,
        0
      );

      this._camera.computeLocalMatrix();
    });

    this._canvas.addEventListener("mouseup", () => {
      isDragging = false;
    });

    this._canvas.addEventListener("wheel", (e) => {
      if (this._isDisabled) return;
      e.preventDefault();

      let delta = Math.sign(e.deltaY);
      let multiplier = delta < 0 ? 1 : -1;

      if (this._camera instanceof PerspectiveCamera) {
        this._camera.position.z +=
          ((this.ZOOM_SPEED * multiplier * -1) / 4) * 400;
      } else {
        this._camera.updateZoom(this.ZOOM_SPEED * multiplier);
      }
      this._camera.computeProjectionMatrix();
    });
  };

  public resetOrbit() {
    this._pivot.rotation = new Vector3();
    if (this._camera instanceof PerspectiveCamera) {
      this._camera.position.z = 700;
    } else {
      this._camera.resetZoom();
    }

    this._camera.computeProjectionMatrix();
  }

  public updateDistance(multiplier: number) {
    if (this._isDisabled) return;

    if (this._camera instanceof PerspectiveCamera) {
      this._camera.position.z = 700 - this.ZOOM_SPEED * multiplier * 200;
    } else {
      this._camera.zoom = this.ZOOM_SPEED * multiplier;
    }
    this._camera.computeProjectionMatrix();
  }

  public updateCam(cam: Camera) {
    this._camera = cam;
  }

  public disableOrbit() {
    this._isDisabled = true;
  }

  public enableOrbit() {
    this._isDisabled = false;
  }
}
