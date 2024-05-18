// Module related imports
import { WebGLRenderer } from "./webgl/renderer";
import { Mesh } from "./core/mesh";
import { Color } from "./types/color";
import { setupLoadModel } from "src/ui-element/load-model.ts";
import { BasicMaterial } from "./material/basic-material";
import { Scene } from "./core/scene";
import { useCamera } from "./composables/useCamera";
import { readFile } from "./utils/file-handler";
import { SHADER_PATH } from "./shaders";

// Stylesheet imports
import "src/css/global.css";
// import { HollowGeometry } from "./geometries/hollow-box-geometry";
import { FGeometry } from "src/geometries/f-geometry.ts";
import { PhongMaterial } from "src/material/phong-material.ts";
import { Texture } from "src/material/texture.ts";
import { Orbit } from "./core/orbit";

/**
 * Main Script
 */
const main = async () => {
  const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
  setupLoadModel(loadFile);

  let x = document.getElementById("x-rotation") as HTMLInputElement;
  let y = document.getElementById("y-rotation") as HTMLInputElement;
  let z = document.getElementById("z-rotation") as HTMLInputElement;

  const basicVertexScript = await readFile(SHADER_PATH.BASIC_VERTEX_SHADER);
  const basicFragmentScript = await readFile(SHADER_PATH.BASIC_FRAGMENT_SHADER);

  const phongVertexScript = await readFile(SHADER_PATH.PHONG_VERTEX_SHADER);
  const phongFragmentScript = await readFile(SHADER_PATH.PHONG_FRAGMENT_SHADER);

  // Get canvas
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new WebGLRenderer(canvas);


  // TODO:
  // renderer.init({ vertexShader: basicVertexScript, fragmentShader: basicFragmentScript });
  renderer.init({ vertexShader: phongVertexScript, fragmentShader: phongFragmentScript });

  const mainScene = new Scene(new Color(0.9, 0.9, 0.9, 1));

  const { cameras } = useCamera(renderer);

  const orbit = new Orbit(canvas, cameras.ORTHOGRAPHIC_CAM);
  orbit.setupControlOrbit();

  // const hollowMesh = new Mesh(
  //   new HollowGeometry(),
  //   new BasicMaterial(
  //     basicFragmentScript,
  //     basicVertexScript,
  //     new Color(1, 0, 0, 1)
  //   )
  // );

  const fMesh = new Mesh(
    new FGeometry(),
    new PhongMaterial(
      phongFragmentScript,
      phongVertexScript,
      new Color(1, 0, 0, 1),
      new Texture(
        "texture/f-texture.png",
        new Float32Array([
          // left column front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // top rung front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // middle rung front
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          // left column back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // top rung back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // middle rung back
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,

          // top
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,

          // top rung right
          0, 0,
          1, 0,
          1, 1,
          0, 0,
          1, 1,
          0, 1,

          // under top rung
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // between top rung and middle
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // top of middle rung
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // right of middle rung
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // bottom of middle rung.
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // right of bottom
          0, 0,
          1, 1,
          0, 1,
          0, 0,
          1, 0,
          1, 1,

          // bottom
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0,

          // left side
          0, 0,
          0, 1,
          1, 1,
          0, 0,
          1, 1,
          1, 0]),
        {
          wrapS: WebGLRenderingContext.CLAMP_TO_EDGE,
          wrapT: WebGLRenderingContext.CLAMP_TO_EDGE,
          magFilter: WebGLRenderingContext.LINEAR,
          minFilter: WebGLRenderingContext.LINEAR,
          format: WebGLRenderingContext.RGBA,
          dtype: WebGLRenderingContext.UNSIGNED_BYTE,
          generateMipmap: true,
        }),
      new Color(0, 0, 1, 1),
      100,
      new Float32Array([0.1, 0.1, 0.1])
    )
  );

  mainScene.addChild(fMesh);

  renderer.play(mainScene, cameras.ORTHOGRAPHIC_CAM);


  y.oninput = () => {
    // hollowMesh.rotateY = parseInt(y.value);
    fMesh.rotateY = parseInt(y.value);
    renderer.play(mainScene, cameras.ORTHOGRAPHIC_CAM);

  }

  x.oninput = () => {
    // hollowMesh.rotateX = parseInt(x.value)
    fMesh.rotateX = parseInt(x.value)
    renderer.play(mainScene, cameras.ORTHOGRAPHIC_CAM);
  }

  z.oninput = () => {
    // hollowMesh.rotateZ = parseInt(z.value)
    fMesh.rotateZ = parseInt(z.value)
    renderer.play(mainScene, cameras.ORTHOGRAPHIC_CAM);
  }

};

main();
