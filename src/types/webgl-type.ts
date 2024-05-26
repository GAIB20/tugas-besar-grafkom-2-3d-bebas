import { BufferAttribute } from "src/geometries/buffer-attribute.ts";

export enum SHADER_TYPE {
  VERTEX = WebGLRenderingContext.VERTEX_SHADER,
  FRAGMENT = WebGLRenderingContext.FRAGMENT_SHADER,
}

export enum COMMON_ATTRIBUTE {
  ATTRIBUTE_POSITION = "a_position",
}

export enum COMMON_UNIFORM {
  UNIFORM_VIEW_PROJ_MATRIX = "u_viewProjectionMatrix",
  UNIFORM_WORLD_MATRIX = "u_worldMatrix",
  UNIFORM_AMBIENT_COLOR = "u_ambientColor"
}

export enum BASIC_VERTEX_SHADER {
  ATTRIBUTE_COLOR = "a_color",
}

export enum BASIC_FRAGMENT_SHADER {
}

export enum PHONG_VERTEX_SHADER {
  ATTRIBUTE_TEX_COORD = "a_texcoord",
  ATTRIBUTE_NORMAL = "a_normal",
  UNIFORM_NORMAL_MATRIX= "u_normalMatrix",
  UNIFORM_DISPLACEMENT_MAP = "u_displacementMap",
  UNIFORM_DISPLACEMENT_FACTOR = "u_displacementFactor",
  UNIFORM_DISPLACEMENT_BIAS = "u_displacementBias",
  UNIFORM_LIGHT_POSITION = "u_lightPosition",
  UNIFORM_USE_DISPLACEMENT_MAP = "u_useDisplacementMap",
}

export enum PHONG_FRAGMENT_SHADER {
  UNIFORM_DIFFUSE_COLOR = "u_diffuseColor",
  UNIFORM_DIFFUSE_MAP = "u_diffuseMap",
  UNIFORM_SPECULAR_COLOR = "u_specularColor",
  UNIFORM_SPECULAR_MAP = "u_specularMap",
  UNIFORM_NORMAL_MAP = "u_normalMap",
  UNIFORM_USE_NORMAL_MAP = "u_useNormalMap",
  UNIFORM_SHININESS = "u_shininess",
  UNIFORM_USE_DIFFUSE_MAP = "u_useDiffuseMap",
  UNIFORM_USE_SPECULAR_MAP = "u_useSpecularMap",
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

export type TypedArray =
  | Float32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array;
export type AttributeSingleDataType = BufferAttribute | Float32Array | number[];
export type AttributeDataType = [AttributeSingleDataType] | number[];
export type AttributeSetters = (...v: AttributeDataType) => void;
export type AttributeMapSetters = { [key: string]: AttributeSetters };

export type ProgramInfo = {
  program: WebGLProgram;
  // uniformSetters: UniformMapSetters,
  attributeSetters: AttributeMapSetters;
};
