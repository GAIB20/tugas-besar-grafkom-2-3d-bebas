import { Node } from "src/core/node.ts";
import { BufferGeometry } from "src/geometries/buffer-geometry.ts";
import { BasicMaterial } from "src/material/basic-material";
import { ShaderMaterial } from "src/material/shader-material.ts";
import { Color } from "src/types/color";
import { IMesh } from "src/types/deserializer";
import { NODE_TYPE } from "src/types/serializer";
import { DeserializeGeometry } from "src/utils/deserializer";

export class Mesh extends Node {
  private _geometry: BufferGeometry;
  private _material: ShaderMaterial;

  /* constructor */
  constructor(
    geometry: BufferGeometry,
    material: ShaderMaterial,
    name?: string
  ) {
    super();
    this._name = name ?? "";
    this._geometry = geometry;
    this._material = material;
    this._type = NODE_TYPE.MESH;
  }

  /* Getters and Setters */

  public get geometry(): BufferGeometry {
    return this._geometry;
  }

  public set geometry(geometry: BufferGeometry) {
    this._geometry = geometry;
  }

  public get material(): ShaderMaterial {
    return this._material;
  }

  public set material(material: ShaderMaterial) {
    this._material = material;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      // TODO: export material
      geometry: this.geometry.toJSON(),
    };
  }

  public static fromJSON(json: IMesh, node?: Node) {
    if (!node) {
      node = new Mesh(
        DeserializeGeometry(json.geometry),
        // TODO: from json instead
        new BasicMaterial(
          "fragmentScript",
          "vertexScript",
          new Color(0, 1, 0, 1)
        ),
        json.name
      );
    }
    super.fromJSON(json, node);
    return node;
  }
}
