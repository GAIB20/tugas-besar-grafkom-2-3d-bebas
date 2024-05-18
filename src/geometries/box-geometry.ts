import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";
import { IBoxGeometry } from "src/types/deserializer.ts";

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
        const vertices = new Float32Array([
          // Front face
          -hw, hh,  hd,
          -hw, -hh, hd,
          hw,  -hh, hd,
          hw,  hh,  hd,
          -hw, hh, hd,
          hw,  -hh, hd,
          // Back face
          -hw, hh,  -hd,
          hw,  -hh, -hd,
          -hw, -hh, -hd,
          hw,  hh,  -hd,
          hw,  -hh, -hd,
          -hw, hh, -hd,
          // Top face
          -hw, hh,  -hd,
          -hw, hh,  hd,
          hw,  hh,  hd,
          hw,  hh,  -hd,
          -hw, hh, -hd,
          hw,  hh,  hd,
          // Bottom face
          -hw, -hh, -hd,
          hw,  -hh, -hd,
          hw,  -hh, hd,
          -hw, -hh, hd,
          -hw, -hh, -hd,
          hw,  -hh, hd,
          // Right face
          hw,  -hh, -hd,
          hw,  hh,   hd,
          hw,  -hh,  hd,
          hw,  -hh, -hd,
          hw,  hh,   -hd,
          hw,  hh,   hd,
          // Left face
          -hw, -hh, -hd,
          -hw, hh,  hd,
          -hw, hh,  -hd,
          -hw, -hh, -hd,
          -hw, -hh, hd,
          -hw, hh,  hd
      ]);
        this.setAttribute('position', new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
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
