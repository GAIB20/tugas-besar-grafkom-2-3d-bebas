import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";

export class HollowGeometry3 extends BufferGeometry {
  width: number;
  height: number;
  depth: number;

  // TODO: need to check
  constructor(width = 1, height = 1 , depth = 1) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;

    const vertices = new Float32Array([
      0, 0, 0,
      0, 0, 100,
      200, 0, 0,
      200, 0, 0,
      0, 0, 100,
      200, 0, 100,

      0, 0, 0,
      200, 0, 100,
      0, 0, 100,
      0, 0, 0,
      200, 0, 0,
      200, 0, 100,

      0, 0, 0,
      100, 150, 100,
      100, 150, 0,
      0, 0, 0,
      0, 0, 100,
      100, 150, 100,

      100, 150, 0,
      0, 0, 100,
      0, 0, 0,
      100, 150, 0,
      100, 150, 100,
      0, 0, 100,

      200, 0, 0,
      200, 0, 100,
      100, 150, 0,
      100, 150, 0,
      200, 0, 100,
      100, 150, 100,

      100, 150, 0,
      100, 150, 100,
      200, 0, 100,
      200, 0, 0,
      100, 150, 100,
      200, 0, 100,

      0, 0, 100,
      0, 0, 0,
      200, 0, 0,
      200, 0, 100,
      0, 0, 100,
      200, 0, 0,

      0, 0, 100,
      200, 0, 100,
      0, 0, 0,
      200, 0, 100,
      200, 0, 0,
      0, 0, 0,

      100, 150, 100,
      0, 0, 0,
      100, 150, 0,
      100, 150, 100,
      0, 0, 100,
      0, 0, 0,

      0, 0, 100,
      100, 150, 0,
      0, 0, 0,
      0, 0, 100,
      100, 150, 100,
      100, 150, 0,

      200, 0, 100,
      200, 0, 0,
      100, 150, 0,
      100, 150, 100,
      200, 0, 100,
      100, 150, 0,

      100, 150, 100,
      100, 150, 0,
      200, 0, 100,
      100, 150, 100,
      200, 0, 0,
      200, 0, 100,

      0, 0, 0,
      50, 43.3, 0,
      200, 0, 0,
      200, 0, 0,
      50, 43.3, 0,
      150, 43.3, 0,

      200, 0, 0,
      150, 43.3, 0,
      100, 150, 0,
      100, 150, 0,
      150, 43.3, 0,
      100, 86.6, 0]);

    this.setAttribute("position", new BufferAttribute(vertices, 3));
    this.calculateNormals();
  }
}