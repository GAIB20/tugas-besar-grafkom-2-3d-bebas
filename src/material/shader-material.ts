import { UniformType } from "src/types/uniform-type.ts";

export abstract class ShaderMaterial  {
  private _id: string;
  protected _fragmentShader: string;
  protected _vertexShader: string;
  protected _uniforms: {[key: string]: UniformType};

  /* constructor */
  constructor(id: string, fragmentShader: string, vertexShader: string) {
    this._id = id;
    this._fragmentShader = fragmentShader;
    this._vertexShader = vertexShader;
    this._uniforms = {};
  }

  /* Getters and Setters */
  public get id(): string {
    return this._id;
  }

  public get fragmentShader(): string {
    return this._fragmentShader;
  }

  public set fragmentShader(fragmentShader: string) {
    this._fragmentShader = fragmentShader;
  }

  public get vertexShader(): string {
    return this._vertexShader;
  }

  public set vertexShader(vertexShader: string) {
    this._vertexShader = vertexShader;
  }

  public get uniforms(): {[key: string]: UniformType} {
    return this._uniforms;
  }

  public setUniform(key: string, value: UniformType) {
    this._uniforms[key] = value;
  }

  public removeUniform(key: string) {
    delete this._uniforms[key];
  }

  /* Methods */
  public equals(material: ShaderMaterial): boolean {
    return this._id === material.id
      && this._fragmentShader === material.fragmentShader
      && this._vertexShader === material.vertexShader
      && JSON.stringify(this._uniforms) === JSON.stringify(material.uniforms);
  }
}
