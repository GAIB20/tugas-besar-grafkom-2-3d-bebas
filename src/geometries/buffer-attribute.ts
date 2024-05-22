import { IBufferAttribute } from "src/types/deserializer";
import {
  TypedArray,
  WEB_GL_DATA_TYPE,
  COMMON_ATTRIBUTE,
} from "src/types/webgl-type.ts";

export class BufferAttribute {
  private _buffer?: WebGLBuffer;
  private _data: TypedArray;
  private _size: number;
  private _dtype: WEB_GL_DATA_TYPE = WEB_GL_DATA_TYPE.FLOAT;
  private _normalize = false;
  private _stride = 0;
  private _offset = 0;
  private _attributeName: string;
  private _isDirty = true; // kita copy atribut minimal sekali di awal terlebih dahulu

  /**
   * Creates an instance of BufferAttribute.
   * @param {TypedArray} data Typed array data.
   * @param {number} size Size of each element in the buffer.
   * @param attributeName
   * @param {object} options Options for attribute.
   * @memberof BufferAttribute
   */
  constructor(
    data: TypedArray,
    size: number,
    attributeName: string,
    options: {
      buffer?: WebGLBuffer;
      dtype?: number;
      normalize?: boolean;
      stride?: number;
      offset?: number;
    } = {}
  ) {
    this._buffer = options.buffer;
    this._data = data;
    this._size = size;
    this._attributeName = attributeName;
    this._dtype = options.dtype || WebGLRenderingContext.FLOAT;
    this._normalize = options.normalize || false;
    this._stride = options.stride || 0;
    this._offset = options.offset || 0;
  }

  // Public get accessor to private properties.
  get buffer() {
    return this._buffer!;
  }
  get data() {
    return this._data;
  }
  get size() {
    return this._size;
  }
  get dtype() {
    return this._dtype;
  }
  get normalize() {
    return this._normalize;
  }
  get stride() {
    return this._stride;
  }
  get offset() {
    return this._offset;
  }
  get attributeName() {
    return this._attributeName;
  }
  get isDirty() {
    return this._isDirty;
  }
  // Public set accessor to private properties.
  // Should toggle isDirty flag to true.
  set buffer(buffer: WebGLBuffer) {
    this._buffer = buffer;
    this._isDirty = true;
  }
  set data(data: TypedArray) {
    this._data = data;
    this._isDirty = true;
  }
  set size(size: number) {
    this._size = size;
    this._isDirty = true;
  }
  set dtype(dtype: number) {
    this._dtype = dtype;
    this._isDirty = true;
  }
  set normalize(normalize: boolean) {
    this._normalize = normalize;
    this._isDirty = true;
  }
  set stride(stride: number) {
    this._stride = stride;
    this._isDirty = true;
  }
  set offset(offset: number) {
    this._offset = offset;
    this._isDirty = true;
  }

  /**
   * Tandai buffer sebagai bersih
   * (tidak perlu di-copy kembali ke GPU)
   *
   * Hanya dipanggil pada attribute setter.
   */
  consume() {
    this._isDirty = false;
  }

  /**
   * Jumlah elemen dalam buffer (elemen = data.length / size).
   */
  get count() {
    return this._data.length / this._size;
  }

  /**
   * Panjang dari buffer (data.length = elemen * size).
   */
  get length() {
    return this._data.length;
  }

  // TODO: check this function
  set(index: number, data: number[]) {
    this._isDirty = true;
    // Set elemen[index] dengan data (data.length == this._size)
    // Jangan lupa untuk menyesuaikan dengan offset dan stride.
    const offset = this._offset + index * this._stride;
    for (let i = 0; i < this._size; i++) {
      this._data[offset + i] = data[i];
    }
  }

  // TODO: check this function
  get(index: number, size?: number) {
    index *= this._size;
    if (!size) size = this._size;
    const data: number[] = [];
    // Ambil elemen[index] ke data (data.length == size)
    // Jangan lupa untuk menyesuaikan dengan offset dan stride.
    const offset = this._offset + index * this._stride;
    for (let i = 0; i < size; i++) {
      data[i] = this._data[offset + i];
    }
    return data;
  }

  toJSON(): IBufferAttribute {
    const opts: {
      dtype: number;
      normalize: boolean;
      stride: number;
      offset: number;
    } = {
      dtype: this.dtype,
      normalize: this.normalize,
      stride: this.stride,
      offset: this.offset,
    };

    return {
      data: Array.from(this.data),
      size: this.size,
      options: opts,
    };
  }

  static fromJSON(json: IBufferAttribute, bufAttr?: BufferAttribute) {
    if (!bufAttr)
      bufAttr = new BufferAttribute(
        json.size == -1 // if indices
          ? new Uint16Array(json.data)
          : new Float32Array(json.data),
        json.size,
        COMMON_ATTRIBUTE.ATTRIBUTE_POSITION,
        json.options
      );
    return bufAttr;
  }
}
