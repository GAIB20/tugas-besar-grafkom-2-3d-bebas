import { SHADER_TYPE } from "../types/webgl-type.ts";

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
}
