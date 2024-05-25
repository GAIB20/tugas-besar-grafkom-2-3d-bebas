import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";

export class HollowGeometry6 extends BufferGeometry {
  constructor() {
    super();
    this._type = GEOMETRY_TYPE.HOLLOW_HEXAGONAL_PRISM;

    const indices = new Uint16Array([
      0, 1, 2, 2, 1, 3,

      2, 3, 4, 4, 3, 5,

      4, 5, 6, 6, 5, 7,

      6, 7, 8, 8, 7, 9,

      8, 9, 10, 10, 9, 11,

      10, 11, 0, 0, 11, 1,

      1, 0, 2, 1, 2, 3,

      3, 2, 4, 3, 4, 5,

      5, 4, 6, 5, 6, 7,

      7, 6, 8, 7, 8, 9,

      9, 8, 10, 9, 10, 11,

      11, 10, 0, 11, 0, 1,

      12, 13, 14, 14, 13, 15,

      14, 15, 16, 16, 15, 17,

      16, 17, 18, 18, 17, 19,

      18, 19, 20, 20, 19, 21,

      20, 21, 22, 22, 21, 23,

      22, 23, 12, 12, 23, 13,

      13, 12, 14, 13, 14, 15,

      15, 14, 16, 15, 16, 17,

      17, 16, 18, 17, 18, 19,

      19, 18, 20, 19, 20, 21,

      21, 20, 22, 21, 22, 23,

      23, 22, 12, 23, 12, 13,

      0, 12, 2, 2, 12, 14,

      2, 14, 4, 4, 14, 16,

      4, 16, 6, 6, 16, 18,

      6, 18, 8, 8, 18, 20,

      8, 20, 10, 10, 20, 22,

      10, 22, 0, 0, 22, 12,

      12, 0, 14, 0, 2, 14,

      14, 2, 16, 2, 4, 16,

      16, 4, 18, 4, 6, 18,

      18, 6, 20, 6, 8, 20,

      20, 8, 22, 8, 10, 22,

      22, 10, 12, 10, 0, 12,

      24, 25, 26, 26, 25, 27,

      26, 27, 28, 28, 27, 29,

      28, 29, 30, 30, 29, 31,

      30, 31, 32, 32, 31, 33,

      32, 33, 34, 34, 33, 35,

      34, 35, 24, 24, 35, 25,

      25, 24, 27, 24, 26, 27,

      27, 26, 29, 26, 28, 29,

      29, 28, 31, 28, 30, 31,

      31, 30, 33, 30, 32, 33,

      33, 32, 35, 32, 34, 35,

      35, 34, 25, 34, 24, 25,
      ]);

    const vertices = new Float32Array([
      50, 50, 0,
      25, 50, 0,
      25, 50, 43.3,
      12.5, 50, 21.65,
      -25, 50, 43.3,
      -12.5, 50, 21.65,
      -50, 50, 0,
      -25, 50, 0,
      -25, 50, -43.3,
      -12.5, 50, -21.65,
      25, 50, -43.3,
      12.5, 50, -21.65,
      50, -50, 0,
      25, -50, 0,
      25, -50, 43.3,
      12.5, -50, 21.65,
      -25, -50, 43.3,
      -12.5, -50, 21.65,
      -50, -50, 0,
      -25, -50, 0,
      -25, -50, -43.3,
      -12.5, -50, -21.65,
      25, -50, -43.3,
      12.5, -50, -21.65,
      37.5, 50, 0,
      37.5, -50, 0,
      18.75, 50, 32.475,
      18.75, -50, 32.475,
      -18.75, 50, 32.475,
      -18.75, -50, 32.475,
      -37.5, 50, 0,
      -37.5, -50, 0,
      -18.75, 50, -32.475,
      -18.75, -50, -32.475,
      18.75, 50, -32.475,
      18.75, -50, -32.475,
    ]);

    this.setAttribute(BufferAttributeName.INDICES, new BufferAttribute(indices, -1, ""))
    this.setAttribute(BufferAttributeName.POSITION, new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
    this.calculateNormals();
  }

  get type() {
    return "HOLLOW_HEXAGONAL_PRISM";
  }

  public toJSON() {
    const attributes = super.toJSON();
    return {
      ...attributes,
    };
  }

  public static fromJSON(json: any, geometry?: HollowGeometry6) {
    if (!geometry) geometry = new HollowGeometry6();
    super.fromJSON(json, geometry);
    return geometry;
  }
}
