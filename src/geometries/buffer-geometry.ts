import { GEOMETRY_TYPE } from "src/types/serializer.ts";
import { BufferAttribute } from "./buffer-attribute.ts";
import { Vector3 } from "src/math/vector3.ts";
import { IBufferAttribute, IBufferGeometry } from "src/types/deserializer.ts";

export class BufferGeometry {
  /* TODO: Update this if you have more attributes
    Buffer Attributes name
      - position
      - normal
    */

  private _attributes: { [name: string]: BufferAttribute };
  private _indices?: BufferAttribute;
  protected _type: GEOMETRY_TYPE;
  constructor() {
    this._attributes = {};
    this._type = GEOMETRY_TYPE.BASE;
  }

  get attributes() {
    return this._attributes;
  }

  get indices() {
    return this._indices;
  }

  setIndices(indices: BufferAttribute) {
    this._indices = indices;
    return this;
  }

  removeIndices() {
    this._indices = undefined;
    return this;
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

  calculateNormals(forceNewAttribute = false) {
    const position = this.getAttribute("position");
    if (!position) return;
    let normal = this.getAttribute("normal");
    if (forceNewAttribute || !normal)
      normal = new BufferAttribute(
        new Float32Array(position.length),
        position.size,
        "a_normal"
      );

    // Lakukan kalkulasi normal disini.
    let pos1 = new Vector3(),
      pos2 = new Vector3(),
      pos3 = new Vector3();
    for (let i = 0; i < position.length; i += 3) {
      pos1.toVector(position, i);
      pos2.toVector(position, i + 1);
      pos3.toVector(position, i + 2);

      pos3 = Vector3.subtract(pos3, pos2);
      pos2 = Vector3.subtract(pos2, pos1);
      pos2 = Vector3.cross(pos2, pos3);

      const d = pos2.normalize().toArray();
      normal.set(i, d);
      normal.set(i + 1, d);
      normal.set(i + 2, d);
    }
    this.setAttribute("normal", normal);
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
      position: this.getAttribute("position").data,
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
