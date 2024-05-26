import { WEB_GL_DATA_TYPE } from "src/types/webgl-type.ts";
import { Color } from "src/types/color.ts";

export class Texture{
  private _color: Color;
  protected _buffer?: WebGLBuffer;
  protected _imageElement: HTMLImageElement;
  protected _wrapS: number; // horizontal
  protected _wrapT: number; // vertical
  protected  _magFilter: number;
  protected  _minFilter: number;
  protected  _format: number;
  protected  _dtype: WEB_GL_DATA_TYPE;
  protected  _generateMipmap: boolean;

  /* constructor */
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
    } = {},
  ) {
    this._imageElement = imgElement;
    this._color = options.color || new Color(1, 1, 1, );
    this._wrapS = options.wrapS || WebGLRenderingContext.CLAMP_TO_EDGE;
    this._wrapT = options.wrapT || WebGLRenderingContext.CLAMP_TO_EDGE;
    this._magFilter = options.magFilter|| WebGLRenderingContext.LINEAR;
    this._minFilter = options.minFilter || WebGLRenderingContext.LINEAR;
    this._format = options.format || WebGLRenderingContext.RGBA;
    this._dtype = options.dtype || WebGLRenderingContext.UNSIGNED_BYTE;
    this._generateMipmap = options.generateMipmap || true;
  }

  /* Getters and Setters */
  get color() { return this._color; }
  get buffer() { return this._buffer!; }
  get imageElement() { return this._imageElement; }
  get wrapS() { return this._wrapS; }
  get wrapT() { return this._wrapT; }
  get magFilter() { return this._magFilter; }
  get minFilter() { return this._minFilter; }
  get format() { return this._format; }
  get dtype() { return this._dtype; }
  get generateMipmap() { return this._generateMipmap; }

  set color(color: Color) { this._color = color; }
  set buffer(buffer: WebGLBuffer) { this._buffer = buffer; }
  set imageElement(_imageStr: HTMLImageElement) { this._imageElement = _imageStr; }
  set wrapS(wrapS: number) { this._wrapS = wrapS; }
  set wrapT(wrapT: number) { this._wrapT = wrapT; }
  set magFilter(magFilter: number) { this._magFilter = magFilter; }
  set minFilter(minFilter: number) { this._minFilter = minFilter; }
  set format(format: number) { this._format = format; }
  set dtype(dtype: WEB_GL_DATA_TYPE) { this._dtype = dtype; }
  set generateMipmap(generateMipmap: boolean) { this._generateMipmap = generateMipmap; }
}
