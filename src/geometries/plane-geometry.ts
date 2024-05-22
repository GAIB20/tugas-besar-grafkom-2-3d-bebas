import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE } from "src/types/webgl-type.ts";

export class PlaneGeometry extends BufferGeometry {
    width: number;
    height: number;

    constructor(width=1, height=1) {
        super();
        this.width = width;
        this.height = height;
        const hw = width/2, hh = height/2;
        const indices = new Uint16Array([
            0, 1, 2, 0, 3, 1, // x+
            3, 2, 1, 3, 0, 2 // x-
        ]);
        const vertices = new Float32Array([
          0, 0, 0, // 0
          0, hw, hh, // 1
          0, 0, hh, // 2
          0, hw, 0, // 3
        ]);

        this.setAttribute("indices", new BufferAttribute(indices, -1, ""));
        this.setAttribute('position', new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
        this.calculateNormals();
    }
}
