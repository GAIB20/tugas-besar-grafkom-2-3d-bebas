import {
  IBoxGeometry,
  IBufferGeometry,
  IHollowBoxGeometry,
  IMesh,
  INode,
  IScene,
} from "src/types/deserializer";
import { GEOMETRY_TYPE, NODE_TYPE } from "src/types/serializer";
import { Scene } from "src/core/scene";
import { Mesh } from "src/core/mesh";
import { Node } from "src/core/node-v2";
import { BoxGeometry } from "src/geometries/box-geometry";
import { HollowBoxGeometry } from "src/geometries/hollow-box-geometry";
import { BufferGeometry } from "src/geometries/buffer-geometry";

export const DeserializeNode = (json: INode) => {
  switch (json.object_type) {
    case NODE_TYPE.SCENE:
      return Scene.fromJSON(json as IScene);
    case NODE_TYPE.MESH:
      return Mesh.fromJSON(json as IMesh);
    default:
      return Node.fromJSON(json);
  }
};

export const DeserializeGeometry = (json: IBufferGeometry) => {
  switch (json.geometry_type) {
    case GEOMETRY_TYPE.BOX:
      return BoxGeometry.fromJSON(json as IBoxGeometry);
    case GEOMETRY_TYPE.HOLLOW_BOX:
      return HollowBoxGeometry.fromJSON(json as IHollowBoxGeometry);
    default:
      return BufferGeometry.fromJSON(json);
  }
};
