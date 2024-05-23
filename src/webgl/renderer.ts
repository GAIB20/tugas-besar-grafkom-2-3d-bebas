import { Camera } from "src/cameras/camera.ts";
import {
  PHONG_VERTEX_SHADER,
  COMMON_UNIFORM,
  COMMON_ATTRIBUTE, PHONG_FRAGMENT_SHADER
} from "../types/webgl-type.ts";
import { Node } from "src/core/node.ts";
import { Mesh } from "src/core/mesh.ts";
import { BasicMaterial } from "src/material/basic-material.ts";
import { Scene } from "src/core/scene.ts";
import { PhongMaterial } from "src/material/phong-material.ts";
import { Color } from "src/types/color.ts";
import { WebGLUtils } from "src/webgl/util.ts";
import { BufferAttribute } from "src/geometries/buffer-attribute.ts";

// TODO: Directional Light
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

  /**
   * @brief Init WebGL program
   *
   * @param scripts.vertexShader The source code for the vertex shader.
   * @param scripts.fragmentShader The source code for the fragment shader.
   */
  public init(scripts: { vertexShader: string; fragmentShader: string }) {
    this._glProgram = WebGLUtils.createProgram(this.gl, scripts);

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
  }

  public render(node: Node, camera: Camera) {
    node.computeWorldMatrix(false, true);

    if (node instanceof Mesh) {
      // DRAW
      this.gl.useProgram(this.glProgram);

      if (node.material instanceof BasicMaterial) {
        // position
        const positionBufferAttribute = node.geometry.getAttribute("position");
        positionBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          positionBufferAttribute.data
        );
        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          positionBufferAttribute
        );

        // indices
        WebGLUtils.createBufferFromTypedArray(
            this.gl,
            node.geometry.getAttribute("indices").data,
            this.gl.ELEMENT_ARRAY_BUFFER
          )

        // color
        // Paint all vertices
        const verticesColor: number[][] = [];
        for (let i = 0; i < node.geometry.getAttribute("position").count; i++) {
          verticesColor.push(node.material.color.getComponents());
        }
        const colorBufferAttribute = new BufferAttribute(
          new Float32Array(verticesColor.flat()),
          Color.size(),
          COMMON_ATTRIBUTE.ATTRIBUTE_COLOR
        );
        colorBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          colorBufferAttribute.data
        );
        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          colorBufferAttribute
        );
      }

      if (node.material instanceof PhongMaterial) {
        // position
        const positionBufferAttribute = node.geometry.getAttribute("position");
        positionBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          positionBufferAttribute.data
        );
        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          positionBufferAttribute
        );

        // indicess
        WebGLUtils.createBufferFromTypedArray(
          this.gl,
          node.geometry.getAttribute("indices").data,
          this.gl.ELEMENT_ARRAY_BUFFER
        )


        // TODO: Add diffuse, normal, specular, displacement
        // texture
        // Diffuse
        const diffuse = node.material.diffuse;
        const specular = node.material.specular;
        const normal = node.material.normal;
        const displacement = node.material.displacement;

        diffuse.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          diffuse.data
        );

        // WebGLUtils.createTextureColor(this.gl, diffuse);
        WebGLUtils.createTextureImage(this.gl, diffuse);

        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          new BufferAttribute(
            new Float32Array([]) /* fill with dummy data*/,
            2,
            PHONG_VERTEX_SHADER.ATTRIBUTE_TEX_COORD,
            { buffer: diffuse.buffer }
          )
        );

        // WebGLUtils.createUniformSetter(
        //   this.gl,
        //   this.glProgram,
        //   PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_COLOR,
        //   0,
        //   this.gl.SAMPLER_2D
        // );

        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_TEXTURE,
          0,
          this.gl.SAMPLER_2D
        );
      }

      WebGLUtils.createUniformSetter(
        this.gl,
        this.glProgram,
        COMMON_UNIFORM.UNIFORM_VIEW_PROJ_MATRIX,
        camera.viewProjectionMatrix.toArray(),
        this.gl.FLOAT_MAT4
      );

      WebGLUtils.createUniformSetter(
        this.gl,
        this.glProgram,
        COMMON_UNIFORM.UNIFORM_WORLD_MATRIX,
        node.worldMatrix.toArray(),
        this.gl.FLOAT_MAT4
      );

      this.gl.drawElements(
        this.gl.TRIANGLES,
        node.geometry.getAttribute("indices").data.length,
        this.gl.UNSIGNED_SHORT,
        0
      );

    }

    node.children.forEach((child) => {
      if (child instanceof Mesh) {
        this.render(child, camera);
      }
    });
  }
}
