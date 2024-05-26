import { readFile } from "src/utils/file-handler";

export const SHADER_PATH = {
  BASIC_VERTEX_SHADER: "/src/shaders/basic-vertex-shader-3d.vert",
  BASIC_FRAGMENT_SHADER: "/src/shaders/basic-fragment-shader-3d.frag",

  PHONG_VERTEX_SHADER: "/src/shaders/phong-vertex-shader-3d-v2.vert",
  PHONG_FRAGMENT_SHADER: "/src/shaders/phong-fragment-shader-3d-v2.frag",
};

const BASIC_VERTEX_SHADER_SCRIPT = await readFile(
  SHADER_PATH.BASIC_VERTEX_SHADER
);
const BASIC_FRAGMENT_SHADER_SCRIPT = await readFile(
  SHADER_PATH.BASIC_FRAGMENT_SHADER
);

const PHONG_VERTEX_SHADER_SCRIPT = await readFile(
  SHADER_PATH.PHONG_VERTEX_SHADER
);
const PHONG_FRAGMENT_SHADER_SCRIPT = await readFile(
  SHADER_PATH.PHONG_FRAGMENT_SHADER
);

export const SHADER_SCRIPTS = {
  BASIC_VERTEX_SHADER_SCRIPT,
  BASIC_FRAGMENT_SHADER_SCRIPT,

  PHONG_VERTEX_SHADER_SCRIPT,
  PHONG_FRAGMENT_SHADER_SCRIPT,
};
