import { BufferAttribute } from "src/geometries/buffer-attribute.ts";

export enum SHADER_TYPE {
  VERTEX = WebGLRenderingContext.VERTEX_SHADER,
  FRAGMENT = WebGLRenderingContext.FRAGMENT_SHADER,
}

export enum COMMON_ATTRIBUTE {
  ATTRIBUTE_POSITION = "a_position",
  ATTRIBUTE_NORMAL = "a_normal",
  ATTRIBUTE_COLOR = "a_color",
  ATTRIBUTE_TEX_COORD = "a_texCoord",
}

export enum COMMON_UNIFORM {
  UNIFORM_VIEW_PROJ_MATRIX = "u_ViewProjMat",
  UNIFORM_WORLD_MATRIX = "u_WorldMat",
}

export enum BASIC_VERTEX_SHADER {
  ATTRIBUTE_COLOR = "a_color",
  ATTRIBUTE_POSITION = "a_position",
}

export enum PHONG_VERTEX_SHADER {
  ATTRIBUTE_POSITION = "a_position",
  ATTRIBUTE_TEX_COORD = "a_texCoord",


  // TODO
  // ATTRIBUTE_COLOR = "a_color",
  // ATTRIBUTE_NORMAL = "a_normal",

  // UNIFORM_WORLD_MATRIX = "u_WorldMat",
  // UNIFORM_VIEW_PROJ_MATRIX = "u_ViewProjMat",
  // UNIFORM_RESOLUTION = "u_resolution",
  // UNIFORM_USE_VERTEX_COLOR = "u_useVertexColor",
}

export enum PHONG_FRAGMENT_SHADER {
  UNIFORM_DIFFUSE_COLOR = "u_diffuseColor",
  UNIFORM_DIFFUSE_TEXTURE = "u_diffuseTexture",

  // TODO
  // UNIFORM_SHININESS = "u_shininess",
  // UNIFORM_LIGHT_POSITION = "u_lightPosition",
  // UNIFORM_CAMERA_POSITION = "u_cameraPosition",
  // UNIFORM_AMBIENT_COLOR = "u_ambientColor",
  // UNIFORM_DIFFUSE_COLOR = "u_diffuseColor",
  // UNIFORM_SPECULAR_COLOR = "u_specularColor",
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

// TODO: check this commented attr
export type ProgramInfo = {
  program: WebGLProgram;
  // uniformSetters: UniformMapSetters,
  attributeSetters: AttributeMapSetters;
};
