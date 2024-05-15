import { Color } from 'src/types/color';
import { Node } from './node-v2';

export class Scene extends Node {
    private _backgroundColor: Color;

    constructor(backgroundColor: Color) {
        super();
        this._backgroundColor = backgroundColor;
    }

    get backgroundColor(): Color {
        return this._backgroundColor;
    }

    set backgroundColor(value: Color) {
        this._backgroundColor = value;
    }
}
