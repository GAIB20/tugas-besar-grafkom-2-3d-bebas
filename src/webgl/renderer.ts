import { Camera } from "src/cameras/camera.ts";
import {
  COMMON_UNIFORM,
  PHONG_VERTEX_SHADER,
  PHONG_FRAGMENT_SHADER,
} from "../types/webgl-type.ts";
import { Node } from "src/core/node.ts";
import { Mesh } from "src/core/mesh.ts";
import { BasicMaterial } from "src/material/basic-material.ts";
import { Scene } from "src/core/scene.ts";
import { PhongMaterial } from "src/material/phong-material.ts";
import { Color } from "src/types/color.ts";
import { WebGLUtils } from "src/webgl/util.ts";
import { BufferAttributeName } from "src/types/buffer-attribute.ts";
import { Vector3 } from "src/math/vector3.ts";

export class WebGLRenderer {
  private _canvas: HTMLCanvasElement;
  private _gl: WebGLRenderingContext;
  private _glProgram!: WebGLProgram;

  // Canvas Size
  private _canvasWidth: number;
  private _canvasHeight: number;

  // Light
  private _ambientLightColor: Color = new Color(0, 0, 0, 1);
  private _lightPosition: Vector3 = new Vector3(70, 70, 70);

  // bool
  private _isDiffuse = false;
  private _isSpecular = false;
  private _isDisplacement = false;
  private _isNormalMap = false;

  public set isDiffuse(val: boolean) {
    this._isDiffuse = val;
  }

  public get isDiffuse() {
    return this._isDiffuse;
  }

  public set isSpecular(val: boolean) {
    this._isSpecular = val;
  }

  public get isSpecular() {
    return this._isSpecular;
  }

  public set isDisplacement(val: boolean) {
    this._isDisplacement = val;
  }

  public get isDisplacement() {
    return this._isDisplacement;
  }

  public set isNormalMap(val: boolean) {
    this._isNormalMap = val;
  }

  public get isNormalMap() {
    return this._isNormalMap;
  }

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

  public get ambientLightColor(): Color {
    return this._ambientLightColor;
  }

  public set ambientLightColor(color: Color) {
    this._ambientLightColor = color;
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

      // position
      const positionBufferAttribute = node.geometry.getAttribute(
        BufferAttributeName.POSITION
      );
      const constructedPositionVertices =
        WebGLUtils.createPositionUsingVerticesAndIndices(
          positionBufferAttribute.data,
          node.geometry.getAttribute(BufferAttributeName.INDICES).data
        );
      positionBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
        this.gl,
        constructedPositionVertices
      );
      WebGLUtils.createAttribSetter(
        this.gl,
        this.glProgram,
        positionBufferAttribute
      );

      if (node.material instanceof BasicMaterial) {
        // color
        // Paint all vertices
        const colorBufferAttribute = node.geometry.getAttribute(
          BufferAttributeName.COLOR
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
        // normal
        const normalBufferAttribute = node.geometry.getAttribute(
          BufferAttributeName.NORMAL
        );
        normalBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          normalBufferAttribute.data
        );
        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          normalBufferAttribute
        );

        // texCoord
        const texCoordBufferAttribute = node.geometry.getAttribute(
          BufferAttributeName.TEXCOORD
        );
        texCoordBufferAttribute.buffer = WebGLUtils.createBufferFromTypedArray(
          this.gl,
          texCoordBufferAttribute.data
        );
        WebGLUtils.createAttribSetter(
          this.gl,
          this.glProgram,
          texCoordBufferAttribute
        );

        // texture
        const diffuse = node.material.diffuse;
        const specular = node.material.specular;
        const normal = node.material.normal;
        const displacement = node.material.displacement;

        // Diffuse
        if (this.isDiffuse) {
          // Set diffuse color
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_COLOR,
            diffuse.color.getComponents(),
            this.gl.FLOAT_VEC4
          );

          // Set diffuse texture
          const diffuseTexture = WebGLUtils.createTextureImage(
            this.gl,
            diffuse
          );
          this.gl.activeTexture(this.gl.TEXTURE0); // activate texture unit 0
          this.gl.bindTexture(this.gl.TEXTURE_2D, diffuseTexture); // bind the texture to texture unit 0
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_MAP,
            0,
            this.gl.SAMPLER_2D
          ); // 0 is the texture unit
        } else {
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_DIFFUSE_COLOR,
            [0, 0, 0, 1],
            this.gl.FLOAT_VEC4
          );

          // Unbind any texture from texture unit 0
          this.gl.activeTexture(this.gl.TEXTURE0); // activate texture unit 0
          this.gl.bindTexture(this.gl.TEXTURE_2D, null); // unbind texture
        }

        // Specular
        if (this.isSpecular) {
          // Set specular color
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_SPECULAR_COLOR,
            specular.color.getComponents(),
            this.gl.FLOAT_VEC4
          );

          // Set specular texture
          const specularTexture = WebGLUtils.createTextureImage(
            this.gl,
            specular
          );
          this.gl.activeTexture(this.gl.TEXTURE1); // activate texture unit 1
          this.gl.bindTexture(this.gl.TEXTURE_2D, specularTexture); // bind the texture to texture unit 1
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_SPECULAR_MAP,
            1,
            this.gl.SAMPLER_2D
          ); // 1 is the texture unit
        } else {
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_FRAGMENT_SHADER.UNIFORM_SPECULAR_COLOR,
            [0, 0, 0, 1],
            this.gl.FLOAT_VEC4
          );

          this.gl.activeTexture(this.gl.TEXTURE1); // activate texture unit 1
          this.gl.bindTexture(this.gl.TEXTURE_2D, null); // unbind texture
        }

        // Normal Mapping
        // if (this.isNormalMap) {
        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_FRAGMENT_SHADER.UNIFORM_USE_NORMAL_MAP,
          normal ? 1 : 0, // TODO
          this.gl.BOOL
        );

        // Set normal texture
        const normalTexture = WebGLUtils.createTextureImage(this.gl, normal);
        this.gl.activeTexture(this.gl.TEXTURE2); // activate texture unit 2
        this.gl.bindTexture(this.gl.TEXTURE_2D, normalTexture); // bind the texture to texture unit 2
        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_FRAGMENT_SHADER.UNIFORM_NORMAL_MAP,
          2,
          this.gl.SAMPLER_2D
        ); // 2 is the texture unit
        // }

        // Displacement
        if (this._isDisplacement) {
          // Set displacement Map
          const displacementTexture = WebGLUtils.createTextureImage(
            this.gl,
            displacement
          );
          this.gl.activeTexture(this.gl.TEXTURE3); // activate texture unit 3
          this.gl.bindTexture(this.gl.TEXTURE_2D, displacementTexture); // bind the texture to texture unit 3
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_VERTEX_SHADER.UNIFORM_DISPLACEMENT_MAP,
            3,
            this.gl.SAMPLER_2D
          ); // 3 is the texture unit

          // Set displacement factor
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_VERTEX_SHADER.UNIFORM_DISPLACEMENT_FACTOR,
            displacement.factor,
            this.gl.FLOAT
          );

          // Set displacement bias
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_VERTEX_SHADER.UNIFORM_DISPLACEMENT_BIAS,
            displacement.bias,
            this.gl.FLOAT
          );
        } else {
          this.gl.activeTexture(this.gl.TEXTURE3); // activate texture unit 3
          this.gl.bindTexture(this.gl.TEXTURE_2D, null); // unbind texture

          // Set displacement factor
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_VERTEX_SHADER.UNIFORM_DISPLACEMENT_FACTOR,
            0,
            this.gl.FLOAT
          );

          // Set displacement bias
          WebGLUtils.createUniformSetter(
            this.gl,
            this.glProgram,
            PHONG_VERTEX_SHADER.UNIFORM_DISPLACEMENT_BIAS,
            0,
            this.gl.FLOAT
          );
        }

        // Light Position
        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_VERTEX_SHADER.UNIFORM_LIGHT_POSITION,
          this._lightPosition.toArray(),
          this.gl.FLOAT_VEC3
        );

        // normal matrix
        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_VERTEX_SHADER.UNIFORM_NORMAL_MATRIX,
          node.worldMatrix.inverse().transpose().toArray(),
          this.gl.FLOAT_MAT4
        );

        // Shininess
        WebGLUtils.createUniformSetter(
          this.gl,
          this.glProgram,
          PHONG_FRAGMENT_SHADER.UNIFORM_SHININESS,
          node.material.shininess,
          this.gl.FLOAT
        );
      }

      // Ambient Color
      WebGLUtils.createUniformSetter(
        this.gl,
        this.glProgram,
        COMMON_UNIFORM.UNIFORM_AMBIENT_COLOR,
        this.ambientLightColor.getComponents(),
        this.gl.FLOAT_VEC4
      );

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

      this._gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        constructedPositionVertices.length / positionBufferAttribute.size
      );
    }

    node.children.forEach((child) => {
      if (child instanceof Mesh) {
        this.render(child, camera);
      }
    });
  }
}
