import { BufferAttribute } from "src/geometry/bufferAttribute";

export enum SHADER_TYPE {
  VERTEX = WebGLRenderingContext.VERTEX_SHADER,
  FRAGMENT = WebGLRenderingContext.FRAGMENT_SHADER,
}

export enum WEB_GL_DATA_TYPE {
  UNSIGNED_BYTE = WebGLRenderingContext.UNSIGNED_BYTE,
  UNSIGNED_SHORT = WebGLRenderingContext.UNSIGNED_SHORT,
  UNSIGNED_INT = WebGLRenderingContext.UNSIGNED_INT,
  BYTE = WebGLRenderingContext.BYTE,
  SHORT = WebGLRenderingContext.SHORT,
  INT = WebGLRenderingContext.INT,
  INT_VEC2 = WebGLRenderingContext.INT_VEC2,
  INT_VEC3 = WebGLRenderingContext.INT_VEC3,
  INT_VEC4 = WebGLRenderingContext.INT_VEC4,
  FLOAT = WebGLRenderingContext.FLOAT,
  FLOAT_MAT2 = WebGLRenderingContext.FLOAT_MAT2,
  FLOAT_MAT3 = WebGLRenderingContext.FLOAT_MAT3,
  FLOAT_MAT4 = WebGLRenderingContext.FLOAT_MAT4,
  FLOAT_VEC2 = WebGLRenderingContext.FLOAT_VEC2,
  FLOAT_VEC3 = WebGLRenderingContext.FLOAT_VEC3,
  FLOAT_VEC4 = WebGLRenderingContext.FLOAT_VEC4,
  BOOL = WebGLRenderingContext.BOOL,
  BOOL_VEC2 = WebGLRenderingContext.BOOL_VEC2,
  BOOL_VEC3 = WebGLRenderingContext.BOOL_VEC3,
  BOOL_VEC4 = WebGLRenderingContext.BOOL_VEC4,
  SAMPLER_2D = WebGLRenderingContext.SAMPLER_2D,
  SAMPLER_CUBE = WebGLRenderingContext.SAMPLER_CUBE,
}

export type TypedArray = Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;
export type AttributeSingleDataType = BufferAttribute | Float32Array | number[];
export type AttributeDataType = [AttributeSingleDataType] | number[];
export type AttributeSetters = (...v: AttributeDataType) => void;
export type AttributeMapSetters = { [key: string]: AttributeSetters };

// TODO: check this commented attr
export type ProgramInfo = {
  program: WebGLProgram;
  // uniformSetters: UniformMapSetters,
  attributeSetters: AttributeMapSetters;
};
