import { Camera } from "src/cameras/camera.ts";
import {
  SHADER_TYPE,
  TypedArray,
  BASIC_VERTEX_SHADER,
  PHONG_VERTEX_SHADER,
  PHONG_FRAGMENT_SHADER
} from "../types/webgl-type.ts";
import { Node } from "src/core/node-v2.ts";
import { Mesh } from "src/core/mesh.ts";
import { BasicMaterial } from "src/material/basic-material.ts";
import { Scene } from "src/core/scene.ts";
import { PhongMaterial } from "src/material/phong-material.ts";

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

  private injectToUniformMatrix4(
    uniformName: string,
    data: Iterable<number>,
    transpose = false
  ) {
    const uniformLoc = this.gl.getUniformLocation(this.glProgram, uniformName);

    this.gl.uniformMatrix4fv(uniformLoc, transpose, data);
  }

  public play(node: Node, camera: Camera) {
    // Clears up and set the canvas background to scene background color
    if (node instanceof Scene) {
      const [r, g, b, a] = node.backgroundColor.getComponents();
      this.gl.clearColor(r, g, b, a);
    }

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.render(node, camera);
    requestAnimationFrame(() => {
      // this.play(node, camera)
    })
  }

  public render(node: Node, camera: Camera) {
    node.computeWorldMatrix(false, true);

    if (node instanceof Mesh) {
      // DRAW
      this.gl.useProgram(this.glProgram);

      this.injectToAttr(
        node.geometry.getAttribute("position").data,
        BASIC_VERTEX_SHADER.ATTRIBUTE_POSITION,
        node.geometry.getAttribute("position").size,
        this.gl.FLOAT
      );

      if (node.material instanceof BasicMaterial) {
        // Paint all vertices
        const verticesColor: number[][] = [];
        for (let i = 0; i < node.geometry.getAttribute("position").count; i++) {
          verticesColor.push(node.material.color.getComponents());
        }

        this.injectToAttr(
          new Float32Array(verticesColor.flat()),
          BASIC_VERTEX_SHADER.ATTRIBUTE_COLOR,
          node.material.color.getComponents().length,
          this.gl.FLOAT
        );
      }

      if (node.material instanceof PhongMaterial) {
        // Paint all vertices
        const verticesColor: number[][] = [];
        for (let i = 0; i < node.geometry.getAttribute("position").count; i++) {
          verticesColor.push(node.material.ambient.getComponents());
        }

        this.injectToAttr(
          new Float32Array(verticesColor.flat()),
          PHONG_VERTEX_SHADER.ATTRIBUTE_COLOR,
          node.material.ambient.getComponents().length,
          this.gl.FLOAT
        )

        // Inject normals
        this.injectToAttr(
          node.geometry.getAttribute("normal").data,
          PHONG_VERTEX_SHADER.ATTRIBUTE_NORMAL,
          node.geometry.getAttribute("normal").size,
          this.gl.FLOAT
        );

        // Inject light position
        this.injectToAttr(
          node.material.lightPosition,
          PHONG_FRAGMENT_SHADER.UNIFORM_LIGHT_POSITION,
          3, // !! hard coded for now
          this.gl.FLOAT
        );

        // Inject shininess
        const shininess = node.material.shininess;
        const uniformLoc = this.gl.getUniformLocation(this.glProgram, PHONG_FRAGMENT_SHADER.UNIFORM_SHININESS);
        this.gl.uniform1f(uniformLoc, shininess);

        // Inject camera position
        const cameraPosition = camera.position.toArray();
        const uniformCameraPosition = this.gl.getUniformLocation(this.glProgram, PHONG_FRAGMENT_SHADER.UNIFORM_CAMERA_POSITION);
        this.gl.uniform3fv(uniformCameraPosition, cameraPosition);

        // Inject ambient color
        const ambientColor = node.material.ambient.getComponents();
        const uniformAmbientColor = this.gl.getUniformLocation(this.glProgram, PHONG_FRAGMENT_SHADER.UNIFORM_AMBIENT_COLOR);
        this.gl.uniform4fv(uniformAmbientColor, ambientColor);

        // TODO: Inject specular color
        // Inject diffuse color
        // const diffuseColor = node.material.diffuse.getComponents();
        // const uniformDiffuseColor = this.gl.getUniformLocation(this.glProgram, PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_COLOR);
        // this.gl.uniform4fv(uniformDiffuseColor, diffuseColor);
      }

      this.injectToUniformMatrix4(
        BASIC_VERTEX_SHADER.UNIFORM_VIEW_PROJ_MATRIX,
        camera.viewProjectionMatrix.toArray()
      );
      this.injectToUniformMatrix4(
        BASIC_VERTEX_SHADER.UNIFORM_WORLD_MATRIX,
        node.worldMatrix.toArray()
      );

      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        node.geometry.getAttribute("position").count
      );
      console.log("Data: ", node.geometry.getAttribute("position").count)
    }

    node.children.forEach((child, index) => {
      if (child instanceof Mesh) {
        console.log("Index: ", index, " Child:", child);
        this.render(child, camera);
      }
    });
  }
}
