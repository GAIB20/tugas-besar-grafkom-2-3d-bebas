import { ShaderMaterial } from "src/material/shader-material.ts";
import { Texture } from "src/material/texture.ts";
import { SHADER_SCRIPTS } from "src/shaders";

export class PhongMaterial extends ShaderMaterial {
  private _diffuse: Texture;
  private _specular: Texture;
  private _normal: Texture;
  private _displacement: Texture;
  private _shininess: number;
  // private _lightPosition: Float32Array;

  /* constructor */
  constructor(
    diffuse: Texture,
    specular: Texture,
    normal: Texture,
    displacement: Texture,
    shininess?: number,
    /* lightPosition: Float32Array, */) {
    super(
      SHADER_SCRIPTS.PHONG_FRAGMENT_SHADER_SCRIPT,
      SHADER_SCRIPTS.PHONG_VERTEX_SHADER_SCRIPT,
      );
    this._diffuse = diffuse;
    this._specular = specular;
    this._normal = normal;
    this._displacement = displacement;
    this._shininess = shininess || 128;
    // this._lightPosition = lightPosition;
  }

  /* Getters and Setters */
  public get id(): string {
    return "phong-material";
  }

  public set diffuse(diffuse: Texture) {
    this._diffuse = diffuse;
  }

  public get diffuse():Texture {
    return this._diffuse;
  }

  public set specular(specular: Texture) {
    this._specular = specular;
  }

  public get specular():Texture {
    return this._specular;
  }

  public set normal(normal: Texture) {
    this._normal = normal;
  }

  public get normal():Texture {
    return this._normal;
  }

  public set displacement(displacement: Texture) {
    this._displacement = displacement;
  }

  public get displacement():Texture {
    return this._displacement;
  }

  public set shininess(shininess: number) {
    this._shininess = shininess;
  }

  public get shininess(): number {
    return this._shininess;
  }

  // public set lightPosition(lightPosition: Float32Array) {
  //   this._lightPosition = lightPosition;
  // }
  //
  // public get lightPosition(): Float32Array {
  //   return this._lightPosition;
  // }
}
