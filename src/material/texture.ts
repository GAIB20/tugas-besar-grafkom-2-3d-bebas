import { TypedArray, WEB_GL_DATA_TYPE } from "src/types/webgl-type.ts";
import { Color } from "src/types/color.ts";

export class Texture{
  private _color: Color;
  private _buffer?: WebGLBuffer;
  private _imageStr: string;
  private _wrapS: number; // horizontal
  private _wrapT: number; // vertical
  private _magFilter: number;
  private _minFilter: number;
  private _format: number;
  private _dtype: WEB_GL_DATA_TYPE;
  private _generateMipmap: boolean;
  private _data: TypedArray;

  /* constructor */
  constructor(
    data: TypedArray,
    imageSrc: string,
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
    this._imageStr = imageSrc;
    this._data = data;
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
  get imageStr() { return this._imageStr; }
  get data() { return this._data; }
  get wrapS() { return this._wrapS; }
  get wrapT() { return this._wrapT; }
  get magFilter() { return this._magFilter; }
  get minFilter() { return this._minFilter; }
  get format() { return this._format; }
  get dtype() { return this._dtype; }
  get generateMipmap() { return this._generateMipmap; }

  set color(color: Color) { this._color = color; }
  set buffer(buffer: WebGLBuffer) { this._buffer = buffer; }
  set imageStr(_imageStr: string) { this._imageStr = _imageStr; }
  set data(data: TypedArray) { this._data = data; }
  set wrapS(wrapS: number) { this._wrapS = wrapS; }
  set wrapT(wrapT: number) { this._wrapT = wrapT; }
  set magFilter(magFilter: number) { this._magFilter = magFilter; }
  set minFilter(minFilter: number) { this._minFilter = minFilter; }
  set format(format: number) { this._format = format; }
  set dtype(dtype: WEB_GL_DATA_TYPE) { this._dtype = dtype; }
  set generateMipmap(generateMipmap: boolean) { this._generateMipmap = generateMipmap; }
}
