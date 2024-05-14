// Module related imports
import { WebGLRenderer } from "./webgl/renderer";
import { Mesh } from "./core/mesh";
import { Color } from "./types/color";
import { setupLoadModel } from "src/ui-element/load-model.ts";
import { BoxGeometry } from "./geometries/box-geometry";
import { BasicMaterial } from "./material/basic-material";
import { Vector3 } from "./math/vector3";
import { Scene } from "./core/scene";
import { useCamera } from "./composables/useCamera";
import { PlaneGeometry } from "./geometries/plane-geometry";

// Stylesheet imports
import "src/css/global.css";

/**
 * Main Script
 */
const main = () => {
  const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
  setupLoadModel(loadFile);

  const vertexScript = `
  attribute vec4 a_color;
  attribute vec4 a_position;

  uniform mat4 ViewProjMat;
  uniform mat4 ModelMat;

  varying vec4 v_Color;

  void main(void) {
    gl_Position = ViewProjMat * ModelMat * a_position;

    // v_Color = a_color;
    v_Color = vec4(1,0,0,1);
  }
  `;

  const fragmentScript = `
  precision highp float;
  // varying vec3 vLighting;
  varying vec4 v_Color;

  void main(void) {
    // gl_FragColor = vec4(1,0,0,1);
    gl_FragColor = v_Color; // this dont works
    // gl_FragColor.rgb *= vLighting;
  }
  `;

  // Get canvas
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new WebGLRenderer(canvas);
  renderer.init({ vertexShader: vertexScript, fragmentShader: fragmentScript });

  const mainScene = new Scene("red");

  const { cameras } = useCamera(renderer);

  const testMesh = new Mesh(
    new BoxGeometry(50, 50, 50),
    new BasicMaterial(
      "test",
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  const testMesh2 = new Mesh(
    new BoxGeometry(70, 70, 70),
    new BasicMaterial(
      "test2",
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  const planeMesh = new Mesh(
    new PlaneGeometry(250, 250),
    new BasicMaterial(
      "test3",
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  testMesh.position = new Vector3(0, 0, 0);
  testMesh2.position = new Vector3(0, 100, 0);

  testMesh2.rotation = new Vector3(10, 10, 45);

  planeMesh.position = new Vector3(0, -120, 0);
  planeMesh.rotation = new Vector3(30, 0, 0);

  mainScene.addChild(testMesh);
  mainScene.addChild(testMesh2);
  mainScene.addChild(planeMesh);

  renderer.play(mainScene, cameras.PERSPECTIVE_CAM);

  // requestAnimationFrame(() => {

  // })
};

main();
