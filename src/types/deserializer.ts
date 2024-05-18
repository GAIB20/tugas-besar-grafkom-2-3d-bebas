import { GEOMETRY_TYPE, NODE_TYPE } from "./serializer";
import { TypedArray } from "./webgl-type";

export interface INode {
  name: string;
  position: number[];
  transform: ITransform;
  object_type: NODE_TYPE;
  parent?: INode;
  children: INode[];
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
}

export interface IBufferGeometry {
  geometry_type: GEOMETRY_TYPE;
  attributes: { [name: string]: IBufferAttribute };
  position: TypedArray;
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
