import { Node } from "src/core/node.ts";
import { BufferGeometry } from "src/geometries/buffer-geometry.ts";
import { ShaderMaterial } from "src/material/shader-material.ts";

export class Mesh extends Node {
  private _geometry: BufferGeometry;
  private _material: ShaderMaterial;

  /* constructor */
  constructor(geometry: BufferGeometry, material: ShaderMaterial) {
    super();
    this._geometry = geometry;
    this._material = material;
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
}
