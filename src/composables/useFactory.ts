import { Node } from "src/core/node-v2";
import { INode } from "src/types/deserializer";
import { DeserializeNode } from "src/utils/deserializer";

export const useFactory = () => {
  const factory = (json: INode): Node => {
    const node = DeserializeNode(json);

    json.children.forEach((child) => {
      node.addChild(factory(child));
    });

    return node;
  };

  return {
    factory,
  };
};
