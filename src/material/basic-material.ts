import { ShaderMaterial } from "src/material/shader-material.ts";
import { Color } from "src/types/color.ts";
import { MATERIAL_TYPE } from "src/types/serializer";

export class BasicMaterial extends ShaderMaterial {
  private _color: Color;

  constructor(fragmentShader: string, vertexShader: string, color: Color) {
    super(fragmentShader, vertexShader);
    this._color = color;
    this._type = MATERIAL_TYPE.BASIC;
  }

  public get id(): string {
    return "basic-material";
  }

  /* Getters and Setters */
  public set color(color: Color) {
    this._color = color;
  }

  public get color(): Color {
    return this._color;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      color: this._color.getComponents(),
      type: this._type,
    };
  }
}
