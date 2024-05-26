import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { BASIC_VERTEX_SHADER, COMMON_ATTRIBUTE, PHONG_VERTEX_SHADER } from "src/types/webgl-type.ts";
import { IBoxGeometry } from "src/types/deserializer.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";

export class BoxGeometry extends BufferGeometry {
    width: number;
    height: number;
    depth: number;

    constructor(width=1, height=1, depth=1) {
      super();
      this._type = GEOMETRY_TYPE.BOX;
      this.width = width;
      this.height = height;
      this.depth = depth;
      const hw = width/2, hh = height/2, hd = depth/2;

      const indices = new Uint16Array([
        0, 1, 3, 3, 1, 2,

        6, 4, 5, 5, 4, 7,

        7, 4, 3, 3, 4, 0,

        6, 5, 1, 1, 5, 2,

        5, 7, 2, 2, 7, 3,

        4, 6, 0, 0, 6, 1,
      ]);
      const vertices = new Float32Array([
        -hw, hh, hd, // 0
        -hw, -hh, hd, // 1
        hw, -hh, hd, // 2
        hw, hh, hd, // 3
        -hw, hh, -hd,  // 4
        hw, -hh, -hd, // 5
        -hw, -hh, -hd, // 6
        hw, hh, -hd, // 7
      ]);

      const texCoords = new Float32Array([
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,

        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,

        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,

        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,

        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,

        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1,
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

      const colors = new Float32Array([

        ]);

      this.setAttribute(BufferAttributeName.POSITION, new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION,));
      this.setAttribute(BufferAttributeName.INDICES, new BufferAttribute(indices, -1, ""));
      this.setAttribute(BufferAttributeName.TEXCOORD, new BufferAttribute(texCoords, 2, PHONG_VERTEX_SHADER.ATTRIBUTE_TEX_COORD, ));
      this.setAttribute(BufferAttributeName.NORMAL, new BufferAttribute(normals, 3, PHONG_VERTEX_SHADER.ATTRIBUTE_NORMAL));
      this.setAttribute(BufferAttributeName.COLOR, new BufferAttribute(colors, 3, BASIC_VERTEX_SHADER.ATTRIBUTE_COLOR));
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
