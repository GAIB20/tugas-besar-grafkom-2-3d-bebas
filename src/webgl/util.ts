/**
 * @deprecated Already inside the WebGLRenderer
 */
import {
  SHADER_TYPE,
  TypedArray
} from "src/types/webgl-type.ts";
import { BufferAttribute } from "src/geometries/buffer-attribute.ts";
import { Texture } from "src/material/texture.ts";


export class WebGLUtils {
  public static createShader = (
    gl: WebGLRenderingContext,
    source: string,
    type: number
  ): WebGLShader => {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error("could not create shader");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error("could not compile shader");
    }
    return shader;
  }

  public static createProgram = (
    gl: WebGLRenderingContext,
    scripts: {
    vertexShader: string;
    fragmentShader: string;
    }) => {
    const vertexShader = this.createShader(
      gl,
      scripts.vertexShader,
      SHADER_TYPE.VERTEX,
    );
    const fragmentShader = this.createShader(
      gl,
      scripts.fragmentShader,
      SHADER_TYPE.FRAGMENT,
    );


    const program = gl.createProgram();
    if (!program) throw new Error("could not create program!");

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const errMsg = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("err: " + errMsg);
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      const errMsg = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("err: " + errMsg);
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return program;
  };

  public static createBufferFromTypedArray = (
    gl: WebGLRenderingContext,
    array: TypedArray,
    type: number = gl.ARRAY_BUFFER,
    drawType: number = gl.STATIC_DRAW
  ) => {
    const buffer = gl.createBuffer();
    if (!buffer) throw new Error('could not create buffer');
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, array, drawType);
    return buffer;
  }

  public static createAttribSetter = (
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    bufferAttribute: BufferAttribute,
  ) => {
    if (!bufferAttribute.buffer) throw new Error('buffer is required');
    const attributeLocation = gl.getAttribLocation(program, bufferAttribute.attributeName);

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferAttribute.buffer);
    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(
      attributeLocation,
      bufferAttribute.size,
      bufferAttribute.dtype,
      bufferAttribute.normalize,
      bufferAttribute.stride,
      bufferAttribute.offset
    );

    return attributeLocation;
  }

  public static createUniformSetter = (
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    uniformName: string,
    data: Iterable<number> | number,
    type: number,
    transpose: boolean = false,
  ) => {
    const uniformLocation = gl.getUniformLocation(program, uniformName);
    if (!uniformLocation) throw new Error('could not get uniform location');

    if (type === gl.FLOAT_MAT4) {
      gl.uniformMatrix4fv(uniformLocation, transpose, data as Iterable<number>);
    } else if (type === gl.FLOAT_VEC3) {
      gl.uniform3fv(uniformLocation, data as Iterable<number>);
    } else if (type === gl.FLOAT_VEC4) {
      gl.uniform4fv(uniformLocation, data as Iterable<number>);
    } else if (type === gl.FLOAT) {
      gl.uniform1f(uniformLocation, data as number);
    } else if (type === gl.BOOL) {
      gl.uniform1i(uniformLocation, data as number);
    } else if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
      gl.uniform1i(uniformLocation, data as number);
    }
    else {
      throw new Error('unsupported uniform type');
    }
  }

  public static createTextureColor = (
    gl: WebGLRenderingContext,
    texture: Texture
  ) => {
    const textureId = gl.createTexture();
    if (!textureId) throw new Error('could not create texture');

    gl.bindTexture(gl.TEXTURE_2D, textureId);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      texture.format,
      1,
      1,
      0,
      texture.format,
      texture.dtype,
      new Uint8Array(texture.color.getComponents())
      )
  }

  public static createTextureImage = (
    gl: WebGLRenderingContext,
    texture: Texture
  ) => {
    const textureId = gl.createTexture();
    if (!textureId) throw new Error('could not create texture');

    const image = new Image();
    image.src = texture.imageStr;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, textureId);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, texture.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, texture.wrapT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.magFilter);
      }
    }
  }


  private static isPowerOf2 = (value: number) => {
    return (value & (value - 1)) == 0;
  }
}
