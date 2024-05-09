import { WEB_GL_DATA_TYPE } from "src/types/webgl-type.ts";

export class Texture{
  private _image: ImageBitmap;
  private _wrapS: number;
  private _wrapT: number;
  private _magFilter: number;
  private _minFilter: number;
  private _format: WebGLTexture;
  private _dtype: WEB_GL_DATA_TYPE;
  private _generateMipmap: boolean;

  /* constructor */
  constructor(
    image: ImageBitmap,
    options: {
      wrapS: number,
      wrapT: number,
      magFilter: number,
      minFilter: number,
      format: WebGLTexture,
      dtype: WEB_GL_DATA_TYPE,
      generateMipmap: boolean,
    },
  ) {
    this._image = image;
    this._wrapS = options.wrapS; // || WebGLRenderingContext.CLAMP_TO_EDGE;
    this._wrapT = options.wrapT; // || WebGLRenderingContext.CLAMP_TO_EDGE;
    this._magFilter = options.magFilter; // || WebGLRenderingContext.LINEAR;
    this._minFilter = options.minFilter; // || WebGLRenderingContext.LINEAR;
    this._format = options.format; // || WebGLRenderingContext.RGBA;
    this._dtype = options.dtype; // || WebGLRenderingContext.UNSIGNED_BYTE;
    this._generateMipmap = options.generateMipmap; // || true;
  }

  /* Getters and Setters */
  get image() { return this._image; }
  get wrapS() { return this._wrapS; }
  get wrapT() { return this._wrapT; }
  get magFilter() { return this._magFilter; }
  get minFilter() { return this._minFilter; }
  get format() { return this._format; }
  get dtype() { return this._dtype; }
  get generateMipmap() { return this._generateMipmap; }

  set image(image: ImageBitmap) { this._image = image; }
  set wrapS(wrapS: number) { this._wrapS = wrapS; }
  set wrapT(wrapT: number) { this._wrapT = wrapT; }
  set magFilter(magFilter: number) { this._magFilter = magFilter; }
  set minFilter(minFilter: number) { this._minFilter = minFilter; }
  set format(format: WebGLTexture) { this._format = format; }
  set dtype(dtype: WEB_GL_DATA_TYPE) { this._dtype = dtype; }
  set generateMipmap(generateMipmap: boolean) { this._generateMipmap = generateMipmap; }
}
