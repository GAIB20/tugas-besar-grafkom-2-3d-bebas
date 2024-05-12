import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";

export class PlaneGeometry extends BufferGeometry {
    width: number;
    height: number;


    constructor(width=1, height=1) {
        super();
        this.width = width;
        this.height = height;
        const hw = width/2, hh = height/2;
        const vertices = new Float32Array([
            -hw, 0, -hh,
            hw,  0, -hh,
            hw,  0, hh,
            -hw, 0, hh,
            -hw, 0, -hh,
            hw,  0, hh,
        ]);
        this.setAttribute('position', new BufferAttribute(vertices, 3));
        this.calculateNormals();
    }
}
