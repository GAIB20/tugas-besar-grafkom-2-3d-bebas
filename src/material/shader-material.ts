import { UniformType } from "src/types/uniform-type.ts";
import { MATERIAL_TYPE } from "src/types/serializer";

export abstract class ShaderMaterial {
  static #idCounter = 0;

  private readonly _id: string = "M" + ShaderMaterial.#idCounter++;
  private readonly _fragmentShader: string;
  private readonly _vertexShader: string;
  protected _uniforms: { [key: string]: UniformType };
  protected _type = MATERIAL_TYPE.BASE;

  /* constructor */
  constructor(fragmentShader: string, vertexShader: string) {
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

  public get vertexShader(): string {
    return this._vertexShader;
  }

  public get uniforms(): { [key: string]: UniformType } {
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
    return this._id === material.id;
  }

  public toJSON() {
    const uniformsData: { [name: string]: [string, any] | UniformType } = {};
    for (const key in this.uniforms) {
      const uniform = this.uniforms[key];
      // TODO: test with other material
      uniformsData[key] = uniform;
    }

    return {
      id: this._id,
      uniforms: uniformsData,
    };
  }
}
