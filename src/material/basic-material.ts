import { ShaderMaterial } from "src/material/shader-material.ts";
import { MATERIAL_TYPE } from "src/types/serializer";
import { SHADER_SCRIPTS } from "src/shaders";

export class BasicMaterial extends ShaderMaterial {

  constructor() {
    super(
      SHADER_SCRIPTS.BASIC_FRAGMENT_SHADER_SCRIPT,
      SHADER_SCRIPTS.BASIC_VERTEX_SHADER_SCRIPT
    );
    this._type = MATERIAL_TYPE.BASIC;
  }

  public get id(): string {
    return "basic-material";
  }

  /* Getters and Setters */
  public toJSON() {
    return {
      ...super.toJSON(),
      type: this._type,
    };
  }
}
