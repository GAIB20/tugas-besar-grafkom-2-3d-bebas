// Module related imports
import { WebGLRenderer } from "./webgl/renderer";
import { Mesh } from "./mesh/mesh";
import { Color } from "./types/color";
import { setupLoadModel } from "src/ui-element/load-model.ts";
import { BoxGeometry } from "./geometries/box-geometry";
import { BasicMaterial } from "./material/basic-material";
import { OrthographicCamera } from "./cameras/orthographic";
import { Matrix4 } from "./math/matrix4";

// Stylesheet imports
import "src/css/global.css";

/**
 * Main Script
 */
const main = () => {
  const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
  setupLoadModel(loadFile);

  const vertexScript = `
  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 ViewProjMat;
  uniform mat4 ModelMat;
  uniform mat4 NormalMat;

  attribute vec3 color;
  varying vec3 vLighting;
  varying vec3 vColor;

  void main(void) {
    gl_Position = ViewProjMat * ModelMat * vec4(position, 1.);
    // vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    // vec3 directionalLightColor = vec3(1, 1, 1);
    // vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
    // vec4 transformedNormal = Nmatrix*vec4(normal, 1.);

    // float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    // vLighting = ambientLight + (directionalLightColor * directional);
    // vColor = color;
  }
  `;

  const fragmentScript = `
  precision mediump float;
  varying vec3 vColor;
  varying vec3 vLighting;

  void main(void) {
    gl_FragColor = vec4(vColor, 1.);
    gl_FragColor.rgb *= vLighting;
  }
  `;

  // Get canvas
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new WebGLRenderer(canvas);
  renderer.init({ vertexShader: vertexScript, fragmentShader: fragmentScript });

  const camera = new OrthographicCamera(
    0,
    renderer.width,
    0,
    renderer.height,
    1000,
    -1000
  );

  const testMesh = new Mesh(
    new BoxGeometry(),
    new BasicMaterial(
      "test",
      fragmentScript,
      vertexScript,
      new Color(0, 0, 0, 1)
    )
  );


  testMesh.draw(
    {
      viewProjMat: camera.viewProjectionMatrix,
      worldMat: Matrix4.identity(),
    },
    renderer.gl,
    renderer.glProgram
  );

  // requestAnimationFrame(() => {

  // })
};

main();
