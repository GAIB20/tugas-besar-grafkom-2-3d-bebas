import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { COMMON_ATTRIBUTE, PHONG_VERTEX_SHADER } from "src/types/webgl-type.ts";

export class FGeometry extends BufferGeometry {
    constructor() {
        super();

        const texCoords = new Float32Array([
          // left column front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // top rung front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // middle rung front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // left column back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // top rung back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // middle rung back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // top
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,

          // top rung right
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,

          // under top rung
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // between top rung and middle
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // top of middle rung
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // right of middle rung
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // bottom of middle rung.
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // right of bottom
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // bottom
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // left side
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0
        ]);

        const indices = new Uint16Array([
          0, 1, 2, 1, 3, 2,

          2, 4, 5, 4, 6, 5,

          7, 8, 9, 8, 10, 9,

          11, 12, 13, 13, 12, 14,

          12, 15, 16, 16, 15, 17,

          18, 19, 20, 20, 19, 21,

          0, 5, 15, 0, 15, 11,

          5, 6, 17, 5, 17, 15,

          4, 16, 17, 4, 17, 6,

          4, 18, 16, 4, 7, 18,

          7, 19, 18, 7, 9, 19,

          9, 21, 19, 9, 10, 21,

          8, 20, 21, 8, 21, 10,

          8, 14, 20, 8, 3, 14,

          1, 13, 14, 1, 14, 3,

          0, 11, 13, 0, 13, 1,
        ]);
        const vertices = new Float32Array([
          0, 0, 0,
          0, 150, 0,
          30, 0, 0,
          30, 150, 0,
          30, 30, 0,
          100, 0, 0,
          100, 30, 0,
          30, 60, 0,
          30, 90, 0,
          67, 60, 0,
          67, 90, 0,
          0, 0, 30,
          30, 0, 30,
          0, 150, 30,
          30, 150, 30,
          100, 0, 30,
          30, 30, 30,
          100, 30, 30,
          30, 60, 30,
          67, 60, 30,
          30, 90, 30,
          67, 90, 30,
        ]);

        this.setAttribute('position', new BufferAttribute(vertices, 3, COMMON_ATTRIBUTE.ATTRIBUTE_POSITION));
        this.setAttribute('indices', new BufferAttribute(indices, -1, ""));
        this.setAttribute('texCoords', new BufferAttribute(texCoords, 2, PHONG_VERTEX_SHADER.ATTRIBUTE_TEX_COORD));
        this.calculateNormals();
    }
}
