import { BufferAttribute } from './buffer-attribute.ts';
import { Vector3 } from 'src/math/vector3.ts';

export abstract class BufferGeometry {
    private _attributes: {[name: string]: BufferAttribute};
    private _indices?: BufferAttribute;


    constructor() {
        this._attributes = {};
    }


    get attributes() {
        return this._attributes;
    }


    get indices() {
        return this._indices;
    }


    setIndices(indices: BufferAttribute) {
        this._indices = indices;
        return this;
    }


    removeIndices() {
        this._indices = undefined;
        return this;
    }


    setAttribute(name: string, attribute: BufferAttribute) {
        this._attributes[name] = attribute;
        return this;
    }


    getAttribute(name: string) {
        return this._attributes[name];
    }


    deleteAttribute(name: string) {
        delete this._attributes[name];
        return this;
    }


    calculateNormals(forceNewAttribute=false) {
        const position = this.getAttribute('position');
        if (!position) return;
        let normal = this.getAttribute('normal');
        if (forceNewAttribute || !normal)
            normal = new BufferAttribute(new Float32Array(position.length), position.size);

        // Lakukan kalkulasi normal disini.
        let pos1 = new Vector3(), pos2 = new Vector3(), pos3 = new Vector3();
        for (let i = 0; i < position.length; i += 3) {
            pos1.toVector(position, i);
            pos2.toVector(position, i+1);
            pos3.toVector(position, i+2);


            pos3 = Vector3.subtract(pos3, pos2);
            pos2 = Vector3.subtract(pos2, pos1);
            pos2 = Vector3.cross(pos2, pos3);

            const d = pos2.normalize().toArray();
            normal.set(i, d);
            normal.set(i+1, d);
            normal.set(i+2, d);
        }
        this.setAttribute('normal', normal);
    }
}
