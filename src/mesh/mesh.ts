import { Node } from "src/scripts/node-v2.ts";
import { BufferGeometry } from "src/geometries/buffer-geometry.ts";
import { ShaderMaterial } from "src/material/shader-material.ts";
import { Matrix4 } from "src/math/matrix4";

export class Mesh extends Node {
  private _geometry: BufferGeometry;
  private _material: ShaderMaterial;

  /* constructor */
  constructor(geometry: BufferGeometry, material: ShaderMaterial) {
    super();
    this._geometry = geometry;
    this._material = material;
  }

  /* Getters and Setters */

  public get geometry(): BufferGeometry {
    return this._geometry;
  }

  public set geometry(geometry: BufferGeometry) {
    this._geometry = geometry;
  }

  public get material(): ShaderMaterial {
    return this._material;
  }

  public set material(material: ShaderMaterial) {
    this._material = material;
  }

  // TODO: refactor
  public draw(
    matrices: { viewProjMat: Matrix4; worldMat: Matrix4 },
    gl: WebGLRenderingContext,
    program: WebGLProgram
  ) {
    // const transformMatClone = this._transfrom.clone();
    // const worldMatClone = matrices.worldMat.clone();

    // DRAW
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      this._geometry.getAttribute("position").data,
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

    const viewProjMatLoc = gl.getUniformLocation(program, "ViewProjMat");
    gl.uniformMatrix4fv(viewProjMatLoc, false, matrices.viewProjMat.toArray());

    const worldMatLoc = gl.getUniformLocation(program, "ModelMat");
    gl.uniformMatrix4fv(worldMatLoc, false, matrices.worldMat.toArray());

    gl.drawArrays(
      gl.TRIANGLES,
      0,
      8 // TODO: change this to props
    );
  }
}
