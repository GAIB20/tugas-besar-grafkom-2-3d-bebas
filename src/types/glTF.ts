export type glTF = {
  scene: number,
  scenes: { nodes: number[] }[],
  nodes: {
    name: string,
    translation: number[],
    rotation: number[],
    scale: number[],
    mesh: number
  }[],
  meshes: {
    primitives: {
      attributes: {
        POSITION: number,
        NORMAL: number,
        TEXCOORD_0: number
      },
      indices: number
    }[]
  }[],
  buffers: {
    uri: string
    byteLength: number,
  }[],
  bufferViews: {
    buffer: number,
    byteOffset: number,
    byteLength: number,
    target: number
  }[],
  accessors: {
    bufferView: number,
    byteOffset: number,
    componentType: number,
    count: number,
    type: string,
    max: number[],
    min: number[]
  }[],
  materials: {
    name: string,
    pbrMetallicRoughness: {
      baseColorFactor: number[],
      metallicFactor: number,
      roughnessFactor: number
    }
  }[],
  textures: {
    sampler: number,
    source: number
  }[],
  asset: {
    version: string,
  }
}
