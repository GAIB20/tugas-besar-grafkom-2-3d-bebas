    import { Color } from "src/types/color";
    import { Node } from "./node";
    import { ILight } from "src/types/deserializer";
    import { Vector3 } from "src/math/vector3";


    export class Light extends Node {
        private _color: Color;
        private _direction: Vector3; 

        constructor(
            color: Color,
            direction: Vector3,
            name?: string
        ) {
            super();
            this._color = color;
            this._direction = direction.normalize(); 
            this._name = name ?? "";
        }

        public get color(): Color {
            return this._color;
        }

        public set color(color: Color) {
            this._color = color;
        }

        public get direction(): Vector3 {
            return this._direction;
        }

        public set direction(direction: Vector3) {
            this._direction = direction.normalize(); 
        }

        public toJSON() {
            return {
                ...super.toJSON(),
                color: this.color.getComponents(),
                direction: this.direction.toArray() 
            };
        }

        public static fromJSON(json: ILight, node?: Node): Light {
            if (!node) {
                const colorArray = json.color as number[];
                const color = new Color(colorArray[0], colorArray[1], colorArray[2], colorArray[3]);
                const directionArray = json.direction as number[];
                const direction = new Vector3(directionArray[0], directionArray[1], directionArray[2]);
                node = new Light(color, direction, json.name);
            }
            super.fromJSON(json, node);
            return node as Light;
        }
    }
