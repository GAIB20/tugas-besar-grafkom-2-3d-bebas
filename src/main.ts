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
import { readFile } from "./utils/file-handler";
import { SHADER_PATH } from "./shaders";

// Stylesheet imports
import "src/css/global.css";
import { HollowGeometry } from "./geometries/hollow-box-geometry";

/**
 * Main Script
 */
const main = async () => {
  const loadFile = document.querySelector<HTMLInputElement>("#load-model")!;
  setupLoadModel(loadFile);

  let x = document.getElementById("x-rotation") as HTMLInputElement;
  let y = document.getElementById("y-rotation") as HTMLInputElement;
  let z = document.getElementById("z-rotation") as HTMLInputElement;

  const vertexScript = await readFile(SHADER_PATH.BASIC_VERTEX_SHADER);
  const fragmentScript = await readFile(SHADER_PATH.BASIC_FRAGMENT_SHADER);

  // Get canvas
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const renderer = new WebGLRenderer(canvas);
  renderer.init({ vertexShader: vertexScript, fragmentShader: fragmentScript });

  const mainScene = new Scene(new Color(0.9, 0.9, 0.9, 1));

  const { cameras } = useCamera(renderer);

  const testMesh = new Mesh(
    new BoxGeometry(50, 50, 50),
    new BasicMaterial(
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  const testMesh2 = new Mesh(
    new BoxGeometry(70, 70, 70),
    new BasicMaterial(
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  const testMesh3 = new Mesh(
    new BoxGeometry(70, 70, 70),
    new BasicMaterial(
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  const hollowMesh = new Mesh(
    new HollowGeometry(),
    new BasicMaterial(
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

    y.oninput = () => {
      hollowMesh.rotateY = parseInt(y.value);
      renderer.play(mainScene, cameras.OBLIQUE_CAM);

    }

    x.oninput = () => {
      hollowMesh.rotateX = parseInt(x.value)
      renderer.play(mainScene, cameras.OBLIQUE_CAM);
    }

    z.oninput = () => {
      hollowMesh.rotateZ = parseInt(z.value)
      renderer.play(mainScene, cameras.OBLIQUE_CAM);
    }




  // testMesh3.rotation = new Vector3(20, 0, 0);
  testMesh3.position = new Vector3(100, 0, 0);
  // testMesh3.scale = new Vector3(2, 2, 2);

  testMesh2.addChild(testMesh3);

  const planeMesh = new Mesh(
    new PlaneGeometry(250, 250),
    new BasicMaterial(
      fragmentScript,
      vertexScript,
      new Color(1, 0, 0, 1)
    )
  );

  testMesh.position = new Vector3(0, 0, 0);
  testMesh.rotation = new Vector3(0, 0, 0);
  // testMesh.scale = new Vector3(20, 20, 20);

  testMesh2.position = new Vector3(100, 0, 0);

  // testMesh2.rotation = new Vector3(10, 10, 45);

  planeMesh.position = new Vector3(0, -120, 0);
  planeMesh.rotation = new Vector3(30, 0, 0);

  // mainScene.addChild(testMesh);
  // mainScene.addChild(testMesh2);
  // hollowMesh.position = new Vector3(2,2,2)
  hollowMesh.rotation = new Vector3(90, 45, 0);
  mainScene.addChild(hollowMesh);
  // mainScene.addChild(planeMesh);

  renderer.play(mainScene, cameras.OBLIQUE_CAM);



};

main();
