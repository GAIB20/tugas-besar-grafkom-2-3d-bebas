import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";

export class BoxGeometry extends BufferGeometry {
    width: number;
    height: number;
    depth: number;

    // TODO: need to check
    constructor(width=1, height=1, depth=1) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        const hw = width/2, hh = height/2, hd = depth/2;
        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            1, 5, 6, 1, 6, 2,
            5, 4, 7, 5, 7, 6,
            4, 0, 3, 4, 3, 7,
            3, 2, 6, 3, 6, 7,
            4, 5, 1, 4, 1, 0,
        ]);
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
        this.setIndices(new BufferAttribute(indices, 1));
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        this.calculateNormals();
    }
}
