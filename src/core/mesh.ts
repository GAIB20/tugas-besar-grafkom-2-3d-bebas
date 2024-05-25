import { Node } from "src/core/node.ts";
import { BufferGeometry } from "src/geometries/buffer-geometry.ts";
import { BasicMaterial } from "src/material/basic-material";
import { ShaderMaterial } from "src/material/shader-material.ts";
import { Color } from "src/types/color";
import { IBasicMaterial, IMesh } from "src/types/deserializer";
import { MATERIAL_TYPE, NODE_TYPE } from "src/types/serializer";
import { DeserializeGeometry } from "src/utils/deserializer";
import { SHADER_SCRIPTS } from "src/shaders";

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
      geometry: this.geometry.toJSON(),
      material: this.material.toJSON(),
    };
  }

  public static fromJSON(json: IMesh, node?: Node) {
    if (!node) {
      let material;
      switch (json.material.type) {
        case MATERIAL_TYPE.BASIC:
          const materialJSON = json.material as IBasicMaterial;
          const color = materialJSON.color;
          material = new BasicMaterial(
            SHADER_SCRIPTS.BASIC_FRAGMENT_SHADER_SCRIPT,
            SHADER_SCRIPTS.BASIC_VERTEX_SHADER_SCRIPT,
            new Color(color[0], color[1], color[2], color[3])
          );
          break;
        // TODO: phong material
        // case MATERIAL_TYPE.PHONG:
        //   break;

        default:
          material = new BasicMaterial(
            SHADER_SCRIPTS.BASIC_FRAGMENT_SHADER_SCRIPT,
            SHADER_SCRIPTS.BASIC_VERTEX_SHADER_SCRIPT,
            new Color(1, 0, 0, 1)
          );
          break;
      }

      node = new Mesh(DeserializeGeometry(json.geometry), material, json.name);
    }
    super.fromJSON(json, node);
    return node;
  }
}
