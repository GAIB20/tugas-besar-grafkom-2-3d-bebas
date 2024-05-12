import { ShaderMaterial } from "src/material/shader-material.ts";
import { Color } from "src/types/color.ts";

export class BasicMaterial extends ShaderMaterial {
  private _color: Color;

  constructor(id: string, fragmentShader: string, vertexShader: string, color: Color) {
    super(id, fragmentShader, vertexShader);
    this._color = color;
  }

  /* Getters and Setters */
  public set color(color: Color) {
    this._color = color;
  }

  public get color(): Color {
    return this._color;
  }
}
