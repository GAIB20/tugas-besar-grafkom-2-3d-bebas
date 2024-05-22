import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";

export class HollowGeometry3 extends BufferGeometry {
  constructor() {
    super();

    const indices = new Uint16Array([
      0, 1, 2, 2, 1, 3,

      0, 3, 1, 0, 2, 3,

      0, 4, 5, 0, 1, 4,

      5, 1, 0, 5, 4, 1,

      2, 3, 5, 5, 3, 4,

      5, 4, 3, 2, 4, 3,

      1, 0, 2, 3, 1, 2,

      1, 3, 0, 3, 2, 0,

      4, 0, 5, 4, 1, 0,

      1, 5, 0, 1, 4, 5,

      3, 2, 5, 4, 3, 5,

      4, 5, 3, 4, 2, 3,

      0, 6, 2, 2, 6, 7,

      2, 7, 5, 5, 7, 8,
    ]);

    const vertices = new Float32Array([
      0, 0, 0,
      0, 0, 100,
      200, 0, 0,
      200, 0, 100,
      100, 150, 100,
      100, 150, 0,
      50, 43.3, 0,
      150, 43.3, 0,
      100, 86.6, 0,
    ]);

    this.setAttribute("indices", new BufferAttribute(indices, -1, ""));
    this.setAttribute("position", new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
    this.calculateNormals();
  }
}
