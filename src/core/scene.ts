import { Node } from './node';

export class Scene extends Node {
    private _backgroundColor: string;

    constructor(backgroundColor: string) {
        super();
        this._backgroundColor = backgroundColor;
    }

    get backgroundColor(): string {
        return this._backgroundColor;
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value;
    }
}
