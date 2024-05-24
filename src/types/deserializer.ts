import { Color } from "./color";
import { GEOMETRY_TYPE, MATERIAL_TYPE, NODE_TYPE } from "./serializer";
import { UniformType } from "./uniform-type";

export interface AnimationTRS {
  translation?: number[];
  rotation?: number[];
  scale?: number[];
}

export interface AnimationPath {
  keyframe?: AnimationTRS;
  children?: {
    [childName: string]: AnimationPath;
  };
}

export interface AnimationClip {
  name: string;
  frames: AnimationPath[];
}

export interface INode {
  name: string;
  position: number[];
  transform: ITransform;
  object_type: NODE_TYPE;
  parent?: INode;
  children: INode[];
  animation?: AnimationClip;
}

export interface ITransform {
  translation: number[];
  rotation: number[];
  scale: number[];
}

export interface IScene extends INode {
  background_color: number[];
}

export interface IMesh extends INode {
  geometry: IBufferGeometry;
  material: IShaderMaterial;
}

export interface IShaderMaterial {
  id: string;
  vertex_shader: string;
  fragment_shader: string;
  uniform: { [key: string]: UniformType };
  type: MATERIAL_TYPE;
}

export interface IBasicMaterial extends IShaderMaterial {
  color: number[];
}

export interface IBufferGeometry {
  geometry_type: GEOMETRY_TYPE;
  attributes: { [name: string]: IBufferAttribute };
}

export interface IBoxGeometry extends IBufferGeometry {
  width: number;
  height: number;
  depth: number;
}

export interface IHollowBoxGeometry extends IBufferGeometry {
  size: number;
}

export interface IBufferAttribute {
  data: number[];
  size: number;
  options: {
    dtype: number;
    normalize: boolean;
    stride: number;
    offset: number;
  };
}

export interface ILight extends INode{
  color: number[];
  direction: number[];
}