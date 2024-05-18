import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { BufferGeometry } from "./buffer-geometry.ts";
import { IHollowBoxGeometry } from "src/types/deserializer.ts";

export class HollowBoxGeometry extends BufferGeometry {
  size: number;


  // TODO: need to check
  constructor(size = 1) {
    super();
    this.size = size;
    this._type = GEOMETRY_TYPE.HOLLOW_BOX;

    let vertices = new Float32Array([
      20, 20, 20, 10.0, -10.0, 20, 20, -20, 20, 20, 20, 20, 10.0, 10.0, 20,
      10.0, -10.0, 20, 20, 20, 20, -10.0, 10.0, 20, 10.0, 10.0, 20, 20, 20, 20,
      -20, 20, 20, -10.0, 10.0, 20, -20, 20, 20, -20, -20, 20, -10.0, 10.0, 20,
      -20, -20, 20, -10.0, -10.0, 20, -10.0, 10.0, 20, -10.0, -10.0, 20, -20,
      -20, 20, 10.0, -10.0, 20, -20, -20, 20, 20, -20, 20, 10.0, -10.0, 20,

      20, -20, -20, 10.0, 10.0, -20, 20, 20, -20, 20, -20, -20, 10.0, -10.0,
      -20, 10.0, 10.0, -20, 20, 20, -20, 10.0, 10.0, -20, -20, 20, -20, 10.0,
      10.0, -20, -10.0, 10.0, -20, -20, 20, -20, -20, 20, -20, -10.0, 10.0, -20,
      -20, -20, -20, -10.0, 10.0, -20, -10.0, -10.0, -20, -20, -20, -20, 10.0,
      -10.0, -20, 20, -20, -20, -10.0, -10.0, -20, 20, -20, -20, -20, -20, -20,
      -10.0, -10.0, -20,

      -20, 20, 20, -20, -20, -20, -20, -20, 20, -20, 20, 20, -20, 20, -20, -20,
      -20, -20, 10.0, 10.0, 20, 10.0, 10.0, -20, 10.0, -10.0, 20, 10.0, 10.0,
      -20, 10.0, -10.0, -20, 10.0, -10.0, 20,

      20, -20, 20, 20, -20, -20, 20, 20, 20, 20, -20, -20, 20, 20, -20, 20, 20,
      20, -10.0, 10.0, 20, -10.0, -10.0, 20, -10.0, 10.0, -20, -10.0, -10.0, 20,
      -10.0, -10.0, -20, -10.0, 10.0, -20,

      20, -20, 20, -20, -20, 20, 20, -20, -20, -20, -20, 20, -20, -20, -20, 20,
      -20, -20, -10.0, 10.0, 20, -10.0, 10.0, -20, 10.0, 10.0, 20, -10.0, 10.0,
      -20, 10.0, 10.0, -20, 10.0, 10.0, 20,

      -20, 20, 20, 20, 20, 20, -20, 20, -20, 20, 20, 20, 20, 20, -20, -20, 20,
      -20, -10.0, -10.0, 20, 10.0, -10.0, 20, -10.0, -10.0, -20, 10.0, -10.0,
      20, 10.0, -10.0, -20, -10.0, -10.0, -20,
    ]);

    vertices = vertices.map(el => el * this.size);
    this.setAttribute("position", new BufferAttribute(vertices, 3));
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
