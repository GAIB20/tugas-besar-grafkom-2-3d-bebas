import {
  AttributeMapSetters,
  AttributeSetters,
  BufferAttribute,
  ProgramInfo,
  AttributeSingleDataType,
  AttributeDataType,
} from "src/webgl/types";

export class WebGLUtils {
  public createAttributeSetters = (
    program: WebGLProgram,
    gl: WebGLRenderingContext
  ): AttributeMapSetters => {
    const createAttributeSetter = (info: WebGLActiveInfo): AttributeSetters => {
      // Initialization Time
      const loc = gl.getAttribLocation(program, info.name);
      const buf = gl.createBuffer();
      return (...values) => {
        // Render Time (saat memanggil setAttributes() pada render loop)
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        const v = values[0];
        if (v instanceof BufferAttribute) {
          if (v.isDirty) {
            // Data Changed Time (note that buffer is already binded)
            gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
            v.consume();
          }
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(
            loc,
            v.size,
            v.dtype,
            v.normalize,
            v.stride,
            v.offset
          );
        } else {
          gl.disableVertexAttribArray(loc);

          // TODO: remove ignore check once resolved
          if (v instanceof Float32Array) {
            // @ts-ignore
            gl[`vertexAttrib${v.length}fv`](loc, v);
          }
          // @ts-ignore
          else gl[`vertexAttrib${values.length}f`](loc, ...values);
        }
      };
    };

    const attribSetters = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) continue;
      // @ts-ignore
      attribSetters[info.name] = createAttributeSetter(info);
    }
    return attribSetters;
  };

  // TODO: check this function. Currently this doesnt do anything cos its only modify its own internal variable
  public setAttribute(
    programInfo: ProgramInfo,
    attributeName: string,
    ...data: AttributeDataType
  ) {
    const setters = programInfo.attributeSetters;
    if (attributeName in setters) {
      const shaderName = `a_${attributeName}`;
      setters[shaderName](...data);
    }
  }

  public setAttributes(
    programInfo: ProgramInfo,
    attributes: { [attributeName: string]: AttributeSingleDataType }
  ) {
    for (let attributeName in attributes)
      this.setAttribute(programInfo, attributeName, attributes[attributeName]);
  }
}
