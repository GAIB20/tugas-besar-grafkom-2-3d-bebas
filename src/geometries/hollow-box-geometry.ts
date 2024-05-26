import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { BASIC_VERTEX_SHADER, COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";
import { IHollowBoxGeometry } from "src/types/deserializer.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";

export class HollowBoxGeometry extends BufferGeometry {
  size: number;

  constructor(size = 1) {
    super();
    this.size = size;
    this._type = GEOMETRY_TYPE.HOLLOW_BOX;

    const indices = new Uint16Array([
      0, 1, 2, 0, 3, 1,

      0, 4, 3, 0, 5, 4,

      5, 6, 4, 6, 7, 4,

      7, 6, 1, 6, 2, 1,

      8, 9, 10, 8, 11, 9,

      10, 9, 12, 9, 13, 12,

      12, 13, 14, 13, 15, 14,

      11, 8, 15, 8, 14, 15,

      5, 14, 6, 5, 12, 14,

      3, 9, 1, 9, 11, 1,

      2, 8, 0, 8, 10, 0,

      4, 7, 13, 7, 15, 13,

      2, 6, 8, 6, 14, 8,

      4, 13, 3, 13, 9, 3,

      5, 0, 12, 0, 10, 12,

      7, 1, 15, 1, 11, 15,
    ]);

    let vertices = new Float32Array([
      20, 20, 20,
      10.0, -10.0, 20,
      20, -20, 20,
      10.0, 10.0, 20,
      -10.0, 10.0, 20,
      -20, 20, 20,
      -20, -20, 20,
      -10.0, -10.0, 20,
      20, -20, -20,
      10.0, 10.0, -20,
      20, 20, -20,
      10.0, -10.0, -20,
      -20, 20, -20,
      -10.0, 10.0, -20,
      -20, -20, -20,
      -10.0, -10.0, -20,
    ]);

    vertices = vertices.map(el => el * this.size);

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
    ]);

    this.setAttribute(BufferAttributeName.POSITION, new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
    this.setAttribute(BufferAttributeName.INDICES, new BufferAttribute(indices, 6, ""));
    this.setAttribute(BufferAttributeName.COLOR, new BufferAttribute(colors, 4, BASIC_VERTEX_SHADER.ATTRIBUTE_COLOR));
    this.calculateNormals();
  }

  get type() {
    return "HOLLOW_BOX"
  }

  public toJSON() {
    const attributes = super.toJSON();
    return {
      ...attributes,
      size: this.size,
    }
  };

  public static fromJSON(json: IHollowBoxGeometry, geometry?: HollowBoxGeometry) {
    if(!geometry) geometry = new HollowBoxGeometry(json.size);
    super.fromJSON(json, geometry);

    return geometry;
  }
}
