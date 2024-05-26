import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { BASIC_VERTEX_SHADER, COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";
import { IBufferGeometry } from "src/types/deserializer.ts";
import { GEOMETRY_TYPE } from "src/types/serializer.ts";

export class HollowGeometry5 extends BufferGeometry {

  constructor() {
    super();
    this._type = GEOMETRY_TYPE.HOLLOW_PENTA_PRISM;

    const indices = new Uint16Array([
      0, 1, 2, 1, 3, 2,

      1, 4, 3, 4, 5, 3,

      4, 6, 5, 6, 7, 5,

      6, 8, 7, 8, 9, 7,

      8, 0, 9, 0, 2, 9,

      0, 1, 2, 1, 3, 2,

      1, 4, 3, 4, 5, 3,

      4, 6, 5, 6, 7, 5,

      6, 8, 7, 8, 9, 7,

      8, 0, 9, 0, 2, 9,

      2, 3, 0, 3, 1, 0,

      3, 5, 1, 5, 4, 1,

      5, 7, 4, 7, 6, 4,

      7, 9, 6, 9, 8, 6,

      9, 2, 8, 2, 0, 8,

      0, 10, 1, 1, 10, 11,

      1, 11, 4, 4, 11, 12,

      4, 12, 6, 6, 12, 13,

      6, 13, 8, 8, 13, 14,

      8, 14, 0, 0, 14, 10,

      3, 15, 2, 16, 15, 3,

      5, 16, 3, 17, 16, 5,

      7, 17, 5, 18, 17, 7,

      9, 18, 7, 19, 18, 9,

      2, 19, 9, 15, 19, 2,
    ]);
    let vertices = new Float32Array([
      50, 0, 0,
      15.45, 47.55, 0,
      50, 0, 100,
      15.45, 47.55, 100,
      -40.45, 29.4, 0,
      -40.45, 29.4, 100,
      -40.45, -29.4, 0,
      -40.45, -29.4, 100,
      15.45, -47.55, 0,
      15.45, -47.55, 100,
      25.0, 0, 0,
      7.725, 23.775, 0,
      -20.225, 14.7, 0,
      -20.225, -14.7, 0,
      7.725, -23.775, 0,
      25.0, 0, 100,
      7.725, 23.775, 100,
      -20.225, 14.7, 100,
      -20.225, -14.7, 100,
      7.725, -23.775, 100,
    ]);

    const colors = new Float32Array([
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,


      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,

      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,
      0, 0, 1, 1,


      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,

      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
      0, 1, 0, 1,
    ]);

    this.setAttribute(BufferAttributeName.POSITION, new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
    this.setAttribute(BufferAttributeName.INDICES, new BufferAttribute(indices, 6, ""));
    this.setAttribute(BufferAttributeName.COLOR, new BufferAttribute(colors, 4, BASIC_VERTEX_SHADER.ATTRIBUTE_COLOR));
    this.calculateNormals();
  }

  public toJSON() {
    const attributes = super.toJSON();
    return {
      ...attributes,
    };
  }

  public static fromJSON(
    json: IBufferGeometry,
    geometry?: HollowGeometry5
  ) {
    if (!geometry) geometry = new HollowGeometry5();
    super.fromJSON(json, geometry);

    return geometry;
  }
}
