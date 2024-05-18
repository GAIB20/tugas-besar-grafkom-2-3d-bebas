import { Color } from "src/types/color";
import { Node } from "./node-v2";
import { NODE_TYPE } from "src/types/serializer";
import { IScene } from "src/types/deserializer";

export class Scene extends Node {
  private _backgroundColor: Color;

  constructor(backgroundColor: Color, name?: string) {
    super();

    this._name = name ?? "";
    this._type = NODE_TYPE.SCENE;
    this._backgroundColor = backgroundColor;
  }

  get backgroundColor(): Color {
    return this._backgroundColor;
  }

  set backgroundColor(value: Color) {
    this._backgroundColor = value;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      background_color: this._backgroundColor.getComponents(),
    };
  }

  public static fromJSON(json: IScene, node?: Node) {
    if (!node) {
      node = new Scene(
        new Color(
          json.background_color[0],
          json.background_color[1],
          json.background_color[2],
          json.background_color[3]
        ),
        json.name
      );
    }
    super.fromJSON(json, node);
    return node;
  }
}
