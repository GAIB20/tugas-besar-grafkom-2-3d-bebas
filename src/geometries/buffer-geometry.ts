import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { IBufferAttribute, IBufferGeometry } from "src/types/deserializer.ts";
import { Vector3 } from "src/math/vector3.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";
import { WebGLUtils } from "src/webgl/util.ts";
import { PHONG_VERTEX_SHADER } from "src/types/webgl-type.ts";

export class BufferGeometry {
  private _attributes: { [name: string]: BufferAttribute };
  protected _type: GEOMETRY_TYPE;
  constructor() {
    this._attributes = {};
    this._type = GEOMETRY_TYPE.BASE;
  }

  get attributes() {
    return this._attributes;
  }

  setAttribute(name: string, attribute: BufferAttribute) {
    this._attributes[name] = attribute;
    return this;
  }

  getAttribute(name: string) {
    return this._attributes[name];
  }

  deleteAttribute(name: string) {
    delete this._attributes[name];
    return this;
  }

  calculateNormals() {
    // Pastikan sudah memiliki atribut posisi
    const position = new BufferAttribute(
      WebGLUtils.createPositionUsingVerticesAndIndices(
        this.getAttribute(BufferAttributeName.POSITION).data,
        this.getAttribute(BufferAttributeName.INDICES).data
      ),
      3,
      "",
    )

    if (!position) return;
    const texcoord = this.getAttribute(BufferAttributeName.TEXCOORD);
    if (!texcoord) return;

    const indices = this.getAttribute(BufferAttributeName.INDICES);
    if (!indices) return;

    const normal = this.getAttribute(BufferAttributeName.NORMAL);
    if (!normal) return;

    const v1 = new Vector3();
    const v2 = new Vector3();
    const v3 = new Vector3();

    const indicesArray = Array.from(indices.data);
    const positionArray = Array.from(position.data);

    const normals = new Array(positionArray.length).fill(0);

    for (let i = 0; i < indicesArray.length; i += 3) {
      v1.set(positionArray.slice(i * 3 + 0, i * 3 + 3));
      v2.set(positionArray.slice(i * 3 + 3, i * 3 + 6));
      v3.set(positionArray.slice(i * 3 + 6, i * 3 + 9));

      const e1   = Vector3.subtract(v2, v1);
      const e2  = Vector3.subtract(v3, v1);
      const e3 = Vector3.subtract(v3, v2);

      const n = Vector3.cross(e1, e2).normalize();

      const a1 = Vector3.angle(e1, e2);
      const a2 = Vector3.angle(e3, e1.multiplyScalar(-1));
      const a3 = Vector3.angle(e2.multiplyScalar(-1), e3.multiplyScalar(-1));


      for (let j = 0; j < 3; j++) {
        normals[i * 3 + j * 3] = n.toArray()[0] * a1;
        normals[i * 3 + j * 3 + 1] = n.toArray()[1] * a2;
        normals[i * 3 + j * 3 + 2] = n.toArray()[2] * a3;
      }
    }

    for (let i = 0; i < normals.length; i += 3) {
      const x = normals[i];
      const y = normals[i + 1];
      const z = normals[i + 2];
      const length = Math.sqrt(x * x + y * y + z * z);

      normals[i] = x / length;
      normals[i + 1] = y / length;
      normals[i + 2] = z / length;
    }

    this.setAttribute(BufferAttributeName.NORMAL, new BufferAttribute(new Float32Array(normals), 3, PHONG_VERTEX_SHADER.ATTRIBUTE_NORMAL));
  }

  toJSON() {
    const attributes: { [name: string]: IBufferAttribute } = {};
    for (const name in this.attributes) {
      // Skip normal attr cos recalculate on construction
      if (name === "normal") continue;

      attributes[name] = this.attributes[name].toJSON();
    }

    return {
      geometry_type: this._type,
      attributes: attributes,
    };
  }

  static fromJSON(json: IBufferGeometry, geometry?: BufferGeometry) {
    if (!geometry) geometry = new BufferGeometry();
    for (const name in json.attributes)
      geometry.setAttribute(
        name,
        BufferAttribute.fromJSON(json.attributes[name])
      );
    return geometry;
  }
}
