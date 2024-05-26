import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { BASIC_VERTEX_SHADER, COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";
import { IBufferGeometry } from "src/types/deserializer.ts";
import { GEOMETRY_TYPE } from "src/types/serializer.ts";

export class HollowGeometry3 extends BufferGeometry {
  constructor() {
    super();
    this._type = GEOMETRY_TYPE.HOLLOW_TRIANGULAR_PRISM;

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
      0, 0, 0, 0, 0, 100, 200, 0, 0, 200, 0, 100, 100, 150, 100, 100, 150, 0,
      50, 43.3, 0, 150, 43.3, 0, 100, 86.6, 0,
    ]);

    // TODO: match this with indices data
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
    ]);

    this.setAttribute(
      BufferAttributeName.INDICES,
      new BufferAttribute(indices, 6, "")
    );
    this.setAttribute(
      BufferAttributeName.POSITION,
      new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION)
    );
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
    geometry?: HollowGeometry3
  ) {
    if (!geometry) geometry = new HollowGeometry3();
    super.fromJSON(json, geometry);

    return geometry;
  }
}
