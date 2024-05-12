// export enum UniformType {
//   FLOAT = 'float',
//   VEC2 = 'vec2',
//   VEC3 = 'vec3',
//   VEC4 = 'vec4',
// }

export type UniformType =
  | { type: 'float'; value: number }
  | { type: 'vec2'; value: [number, number] }
  | { type: 'vec3'; value: [number, number, number] }
  | { type: 'vec4'; value: [number, number, number, number] }
  | { type: 'int'; value: number }
  | { type: 'ivec2'; value: [number, number] }
  | { type: 'ivec3'; value: [number, number, number] }
  | { type: 'ivec4'; value: [number, number, number, number] }
  | { type: 'bool'; value: boolean }
  | { type: 'bvec2'; value: [boolean, boolean] }
  | { type: 'bvec3'; value: [boolean, boolean, boolean] }
  | { type: 'bvec4'; value: [boolean, boolean, boolean, boolean] }
  | { type: 'mat2'; value: [number, number, number, number] }
  | { type: 'mat3'; value: [number, number, number, number, number, number, number, number, number] }
  | { type: 'mat4'; value: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number] }
  | { type: 'sampler2D'; value: WebGLTexture }
  | { type: 'samplerCube'; value: WebGLTexture };
