import { Camera } from "src/cameras/camera.ts";
import { SHADER_TYPE, TypedArray } from "../types/webgl-type.ts";
import { ShaderMaterial } from "src/material/shader-material.ts";
import { Node } from "src/core/node-v2.ts";
import { Mesh } from "src/core/mesh.ts";
import { BasicMaterial } from "src/material/basic-material.ts";

export class WebGLRenderer {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext;
  private _glProgram!: WebGLProgram;

  // Canvas Size
  private _canvasWidth: number;
  private _canvasHeight: number;

  // WebGL constants
  private readonly WEB_GL_NAMESPACE = "webgl";

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._canvasWidth = canvas.clientWidth;
    this._canvasHeight = canvas.clientHeight;

    const gl = this._canvas.getContext(this.WEB_GL_NAMESPACE);

    if (!gl) throw new Error("unable to initialize WebGL.");
    this._gl = gl;

    this._gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    this.adjustCanvas();
  }

  public adjustCanvas = () => {
    const dw = this._canvas.clientWidth;
    const dh = this._canvas.clientHeight;
    if (this._canvas.width !== dw || this._canvas.height !== dh) {
      this._canvas.width = dw;
      this._canvas.height = dh;
      this._gl.viewport(0, 0, dw, dh);
    }

    this._canvasWidth = dw;
    this._canvasHeight = dh;
  };

  private createShader = (shaderType: SHADER_TYPE, shaderScript: string) => {
    const shader = this._gl.createShader(shaderType);
    if (!shader) {
      throw new Error("could not create shader");
    }

    this._gl.shaderSource(shader, shaderScript);
    this._gl.compileShader(shader);

    const success = this._gl.getShaderParameter(
      shader,
      this._gl.COMPILE_STATUS
    );

    console.log("Shader info log: ", this.gl.getShaderInfoLog(shader));
    if (!success) throw new Error("could not compile shader");

    return shader;
  };

  /**
   * @brief Creates a WebGL program using the provided vertex and fragment shaders.
   *
   * @param scripts.vertexShader The source code for the vertex shader.
   * @param scripts.fragmentShader The source code for the fragment shader.
   *
   * @return WebGL program.
   */
  private createProgram = (scripts: {
    vertexShader: string;
    fragmentShader: string;
  }) => {
    const vertexShader = this.createShader(
      SHADER_TYPE.VERTEX,
      scripts.vertexShader
    );
    const fragmentShader = this.createShader(
      SHADER_TYPE.FRAGMENT,
      scripts.fragmentShader
    );

    const program = this._gl.createProgram();
    if (!program) throw new Error("could not create program!");

    this._gl.attachShader(program, vertexShader);
    this._gl.attachShader(program, fragmentShader);
    this._gl.linkProgram(program);

    if (!this._gl.getProgramParameter(program, this._gl.LINK_STATUS)) {
      const errMsg = this._gl.getProgramInfoLog(program);
      this._gl.deleteProgram(program);
      throw new Error("err: " + errMsg);
    }

    this._gl.validateProgram(program);
    if (!this._gl.getProgramParameter(program, this._gl.VALIDATE_STATUS)) {
      const errMsg = this._gl.getProgramInfoLog(program);
      this._gl.deleteProgram(program);
      throw new Error("err: " + errMsg);
    }

    this._gl.deleteShader(vertexShader);
    this._gl.deleteShader(fragmentShader);

    return program;
  };

  /**
   * @brief Init WebGL program
   *
   * @param scripts.vertexShader The source code for the vertex shader.
   * @param scripts.fragmentShader The source code for the fragment shader.
   */
  public init(scripts: { vertexShader: string; fragmentShader: string }) {
    this._glProgram = this.createProgram(scripts);

    this._gl.useProgram(this._glProgram);
  }

  public clearCanvas = () => {
    if (!this._gl) throw new Error("WebGL not supported");
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  };

  public get width(): number {
    return this._canvasWidth;
  }

  public get height(): number {
    return this._canvasHeight;
  }

  public get gl(): WebGLRenderingContext {
    return this._gl;
  }

  public get glProgram(): WebGLProgram {
    return this._glProgram;
  }

  private injectToAttr(
    data: TypedArray,
    attributeName: string,
    bufferSize: number,
    type: number,
    normalized = false,
    stride = 0,
    offset = 0
  ) {
    const buffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    const attrLoc = this.gl.getAttribLocation(this.glProgram, attributeName);
    console.log("Accessing attribute: ", attributeName);
    console.log("Attribute location: ", attrLoc);
    console.log("Bind buffer: ", data);
    this.gl.enableVertexAttribArray(attrLoc);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);

    this.gl.vertexAttribPointer(
      attrLoc,
      bufferSize,
      type,
      normalized,
      stride,
      offset
    );
  }

  public play(node: Node, camera: Camera) {
    this.gl.clearColor(0.9, 0.9, 0.9, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    this.render(node, camera);
  }

  // TODO: extend this to Scene instead of Node
  public render(node: Node, camera: Camera) {
    node.computeWorldMatrix(false, true);
    // camera.computeWorldMatrix()
    if (node instanceof Mesh) {
      // DRAW
      this.gl.useProgram(this.glProgram);

      this.injectToAttr(
        node.geometry.getAttribute("position").data,
        "a_position",
        node.geometry.getAttribute("position").size,
        this.gl.FLOAT
      );

      // if (node.material instanceof BasicMaterial) {

      //   // TODO: check why this injection fails cos the color is still white
      //   this.injectToAttr(
      //     new Float32Array(node.material.color.getComponents()),
      //     "a_color",
      //     4,
      //     this.gl.FLOAT
      //   );

      //   console.log(
      //     "GL Program Info: ",
      //     this.gl.getProgramInfoLog(this.glProgram)
      //   );
      // }

      const viewProjMatLoc = this.gl.getUniformLocation(
        this.glProgram,
        "ViewProjMat"
      );
      console.log("HERE - CAMERA")
      this.gl.uniformMatrix4fv(
        viewProjMatLoc,
        false,
        camera.viewProjectionMatrix.toArray()
      );
      console.log("HERE1 - CAMERA")

      console.log("DEBUG [view proj mat]: ", camera.viewProjectionMatrix.toArray());
      console.log("DEBUG CAMERA POSITION", camera.position)

      const worldMatLoc = this.gl.getUniformLocation(
        this.glProgram,
        "ModelMat"
      );
      this.gl.uniformMatrix4fv(worldMatLoc, false, node.worldMatrix.toArray());

      console.log("DEBUG [world mat]: ", node.worldMatrix.toArray());

      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        node.geometry.getAttribute("position").count
      );

      console.log("data: ", node.geometry.getAttribute("position").count);
    }

    node.children.forEach((child, index) => {
      if (child instanceof Mesh) {
        console.log("Index: ", index, " Child:", child);
        this.render(child, camera);
      }
    });
  }
}
