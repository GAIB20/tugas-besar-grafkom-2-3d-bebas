import { ShaderMaterial } from "src/material/shader-material.ts";
import { Color } from "src/types/color.ts";
import { Texture } from "src/material/texture.ts";

export class PhongMaterial extends ShaderMaterial {
  private _ambient: Color;
  private _diffuse: Color | Texture;
  private _specular: Color | Texture;
  private _shininess: number;
  private _lightPosition: Float32Array;

  /* constructor */
  constructor(fragmentShader: string, vertexShader: string, ambient: Color, diffuse: Color | Texture, specular: Color | Texture, shininess: number, lightPosition: Float32Array) {
    super(fragmentShader, vertexShader);
    this._ambient = ambient;
    this._diffuse = diffuse;
    this._specular = specular;
    this._shininess = shininess;
    this._lightPosition = lightPosition;
  }

  /* Getters and Setters */
  public get id(): string {
    return "phong-material";
  }

  public set ambient(ambient: Color) {
    this._ambient = ambient;
  }

  public get ambient(): Color {
    return this._ambient;
  }

  public set diffuse(diffuse: Color | Texture) {
    this._diffuse = diffuse;
  }

  public get diffuse(): Color | Texture {
    return this._diffuse;
  }

  public set specular(specular: Color | Texture) {
    this._specular = specular;
  }

  public get specular(): Color | Texture {
    return this._specular;
  }

  public set shininess(shininess: number) {
    this._shininess = shininess;
  }

  public get shininess(): number {
    return this._shininess;
  }

  public set lightPosition(lightPosition: Float32Array) {
    this._lightPosition = lightPosition;
  }

  public get lightPosition(): Float32Array {
    return this._lightPosition;
  }
}
