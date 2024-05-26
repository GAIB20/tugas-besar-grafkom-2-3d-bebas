import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { IBufferAttribute, IBufferGeometry } from "src/types/deserializer.ts";
import { Vector3 } from "src/math/vector3.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";
import { WebGLUtils } from "src/webgl/util.ts";
import { PHONG_VERTEX_SHADER } from "src/types/webgl-type.ts";
import { Vector2 } from "src/math/vector2.ts";

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
    // Misalnya kita kalkulasi tangent dan bitangent disini
    // Pastikan sudah memiliki atribut koordinat tekstur (texcoord)
    const texcoord = this.getAttribute(BufferAttributeName.TEXCOORD);
    if (!texcoord) return;

    const indices = this.getAttribute(BufferAttributeName.INDICES);
    if (!indices) return;

    const normal = this.getAttribute(BufferAttributeName.NORMAL);
    if (!normal) return;

    const v1 = new Vector3();
    const v2 = new Vector3();
    const v3 = new Vector3();


    // Untuk koordinat tekstur, gunakan Vector2 jika ada (atau boleh langsung array)
    // Jika hanya memiliki Vector3, pastikan bisa set() hanya x dan y saja.
    const uv1 = new Vector2();
    const uv2 = new Vector2();
    const uv3 = new Vector2();

    const indicesArray = Array.from(indices.data);
    const positionArray = Array.from(position.data);
    const texcoordArray = Array.from(texcoord.data);

    // const tangents = new Array(positionArray.length).fill(0);
    // const bitangents = new Array(positionArray.length).fill(0);
    const normals = new Array(positionArray.length).fill(0);

    for (let i = 0; i < indicesArray.length; i += 3) {
      v1.set(positionArray.slice(i * 3 + 0, i * 3 + 3));
      v2.set(positionArray.slice(i * 3 + 3, i * 3 + 6));
      v3.set(positionArray.slice(i * 3 + 6, i * 3 + 9));

      uv1.set(texcoordArray.slice(i, i + 2));
      uv2.set(texcoordArray.slice(i + 2, i + 4));
      uv3.set(texcoordArray.slice(i + 4, i + 6));

      const e1   = Vector3.subtract(v2, v1);
      const e2  = Vector3.subtract(v3, v1);
      // const dUV1 = Vector2.subtract(uv2, uv1);
      // const dUV2 = Vector2.subtract(uv3, uv1);
      //
      // const f = 1.0 / dUV1.x * dUV2.y - dUV2.x * dUV1.y;
      //
      // const t = (
      //   Vector3.subtract(
      //   Vector3.copy(e1).multiplyScalar(dUV2.y),
      //   Vector3.copy(e2).multiplyScalar(dUV1.y)
      //   ).multiplyScalar(f)
      // )
      //
      //
      // const b = (
      //   Vector3.subtract(
      //     Vector3.copy(e2).multiplyScalar(dUV1.x),
      //     Vector3.copy(e1).multiplyScalar(dUV2.x)
      //   ).multiplyScalar(f)
      // )

      const n = Vector3.cross(e1, e2).normalize();

      // Set normal, tangent, dan bitangent
      // sebagai atribut dari ketiga vertex
      for (let j = 0; j < 3; j++) {
        // tangents[i * 3 + j * 3] = t.toArray()[0]
        // tangents[i * 3 + j * 3 + 1] = t.toArray()[1]
        // tangents[i * 3 + j * 3 + 2] = t.toArray()[2]
        //
        // bitangents[i * 3 + j * 3] = b.toArray()[0]
        // bitangents[i * 3 + j * 3 + 1] = b.toArray()[1]
        // bitangents[i * 3 + j * 3 + 2] = b.toArray()[2]

        normals[i * 3 + j * 3] = n.toArray()[0]
        normals[i * 3 + j * 3 + 1] = n.toArray()[1]
        normals[i * 3 + j * 3 + 2] = n.toArray()[2]
      }
    }

    this.setAttribute(BufferAttributeName.NORMAL, new BufferAttribute(new Float32Array(normals), 3, PHONG_VERTEX_SHADER.ATTRIBUTE_NORMAL));
    // this.setAttribute(BufferAttributeName.TANGENT, new BufferAttribute(new Float32Array(tangents), 3, PHONG_VERTEX_SHADER.ATTRIBUTE_TANGENT));
    // this.setAttribute(BufferAttributeName.BITANGENT, new BufferAttribute(new Float32Array(bitangents), 3, PHONG_VERTEX_SHADER.ATTRIBUTE_BITANGENT));
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
