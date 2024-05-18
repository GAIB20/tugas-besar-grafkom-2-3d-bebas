import { Camera } from "src/cameras/camera";
import { Vector3 } from "src/math/vector3";
import { Node } from "./node.ts";
import { PerspectiveCamera } from "src/cameras/perspective";

export class Orbit {
  private _canvas: HTMLCanvasElement;
  private _camera: Camera;
  private _pivot: Node;

  private PIXEL_TO_DEGREE_RATIO = 0.1;
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
      if (!isDragging) {
        return;
      }
      let dx = e.movementX;
      let dy = e.movementY;

      let x = dy * this.PIXEL_TO_DEGREE_RATIO;
      let y = dx * this.PIXEL_TO_DEGREE_RATIO;

      this._pivot.rotation = new Vector3(
        (this._pivot.rotation.x - x) % 360,
        (this._pivot.rotation.y - y) % 360,
        0
      );
    });

    this._canvas.addEventListener("mouseup", () => {
      isDragging = false;
    });

    this._canvas.addEventListener("wheel", (e) => {
      e.preventDefault();

      let delta = Math.sign(e.deltaY);
      let multiplier = delta < 0 ? 1 : -1;

      if (this._camera instanceof PerspectiveCamera) {
        this._camera.position.z +=
          ((this.ZOOM_SPEED * multiplier * -1) / 4) * 100;
      } else {
        this._camera.updateZoom(this.ZOOM_SPEED * multiplier);
      }
    });
  };
}
