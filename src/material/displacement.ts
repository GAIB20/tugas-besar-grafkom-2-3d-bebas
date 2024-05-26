import { Texture } from "src/material/texture.ts";
import { Color } from "src/types/color.ts";
import { WEB_GL_DATA_TYPE } from "src/types/webgl-type.ts";

export class Displacement extends Texture {
  private _factor: number;

  constructor(
    imgElement: HTMLImageElement,
    options: {
      color?: Color,
      wrapS?: number,
      wrapT?: number,
      magFilter?: number,
      minFilter?: number,
      format?: number,
      dtype?: WEB_GL_DATA_TYPE,
      generateMipmap?: boolean,
      factor?: number,
    } = {},
  ) {
    super(imgElement, options);
    this._factor = options.factor || 1;
  }

  get factor() { return this._factor; }

  set factor(factor: number) { this._factor = factor; }
}
