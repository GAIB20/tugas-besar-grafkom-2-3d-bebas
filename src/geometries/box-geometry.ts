import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE, PHONG_VERTEX_SHADER } from "src/types/webgl-type.ts";
import { IBoxGeometry } from "src/types/deserializer.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";

export class BoxGeometry extends BufferGeometry {
    width: number;
    height: number;
    depth: number;

    // TODO: need to check
    constructor(width=1, height=1, depth=1) {
      super();
      this._type = GEOMETRY_TYPE.BOX;
      this.width = width;
      this.height = height;
      this.depth = depth;
      const hw = width/2, hh = height/2, hd = depth/2;

      const indices = new Uint16Array([
        0, 1, 2, 0, 2, 3,

        4, 5, 6, 7, 5, 4,

        4, 0, 3, 7, 4, 3,

        6, 5, 2, 1, 6, 2,

        5, 3, 2, 5, 7, 3,

        6, 0, 4, 6, 1, 0,
      ]);
      const vertices = new Float32Array([
        -hw, hh, hd,
        -hw, -hh, hd,
        hw, -hh, hd,
        hw, hh, hd,
        -hw, hh, -hd,
        hw, -hh, -hd,
        -hw, -hh, -hd,
        hw, hh, -hd,
      ]);

      const texCoords = new Float32Array([
        0, 1,
        0, 0,
        1, 0,
        0, 1,
        1, 0,
        1, 1,

        0, 1,
        1, 0,
        1, 1,
        0, 0,
        1, 0,
        0, 1,

        1, 0,
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        0, 1,

        0, 0,
        1, 0,
        1, 1,
        0, 1,
        0, 0,
        1, 1,

        0, 0,
        1, 1,
        0, 1,
        0, 0,
        1, 0,
        1, 1,

        1, 0,
        0, 1,
        0, 0,
        1, 0,
        1, 1,
        0, 1,
      ]);

      const normals = new Float32Array([
        // z+
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        // z-
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        // y+
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        // y-
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        // x+
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        // x-
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
      ]);

      this.setAttribute(BufferAttributeName.POSITION, new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
      this.setAttribute(BufferAttributeName.INDICES, new BufferAttribute(indices, -1, ""));
      this.setAttribute(BufferAttributeName.TEXCOORD, new BufferAttribute(texCoords, 2, PHONG_VERTEX_SHADER.ATTRIBUTE_TEX_COORD));
      this.setAttribute(BufferAttributeName.NORMAL, new BufferAttribute(normals, 3, PHONG_VERTEX_SHADER.ATTRIBUTE_NORMAL));
      this.calculateNormals();
    }

    public toJSON() {
      const attributes = super.toJSON();
      return {
        ...attributes,
        width: this.width,
        height: this.height,
        depth: this.depth,
      }
    };

    public static fromJSON(json: IBoxGeometry, geometry?: BoxGeometry) {
      if(!geometry) geometry = new BoxGeometry(json.width, json.height, json.depth);
      super.fromJSON(json, geometry);

      return geometry;
    }
}
