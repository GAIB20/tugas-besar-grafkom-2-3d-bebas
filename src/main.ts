// Module related imports
import { WebGLRenderer } from "./webgl/renderer";
import { Mesh } from "./core/mesh";
import { Color } from "./types/color";
import { Scene } from "./core/scene";
import { useCamera } from "./composables/useCamera";
import {
  exportModelJSON,
  importModelJSON,
  readFile,
} from "./utils/file-handler";
import { SHADER_PATH } from "./shaders";
import { FGeometry } from "src/geometries/f-geometry.ts";
import { PhongMaterial } from "src/material/phong-material.ts";
import { Texture } from "src/material/texture.ts";
import { Node } from "./core/node";
import {
  loadInput,
  saveInput,
  camSelectInput,
  animTogglePlay,
  resetCamBtn,
  camDistanceInput,
  xTranslationInput,
  yTranslationInput,
  zTranslationInput,
  xRotationInput,
  yRotationInput,
  zRotationInput,
  xScaleInput,
  yScaleInput,
  zScaleInput,
  animToggleReverse,
  animToggleAutoPlay,
  animationToggleFrameNav,
  animToggleNextFrame,
  animTogglePrevFrame,
  animationFrameData,
  animControllerInsertFrame,
  animControllerDeleteFrame,
  animControllerEditFrame,
  animControllerSwapFrame,
  animToggleStartFrame,
  animToggleEndFrame,
} from "./ui-element/bindings";
import { Camera } from "./cameras/camera";
import { CAM_TYPE } from "./types/camera";
import { useOrbit } from "./composables/useOrbit";

// Stylesheet imports
import "src/css/global.css";

/**
 * Main Script
 */
const main = async () => {
  // Shader scripts
  const basicVertexScript = await readFile(SHADER_PATH.BASIC_VERTEX_SHADER);
  const basicFragmentScript = await readFile(SHADER_PATH.BASIC_FRAGMENT_SHADER);

  const phongVertexScript = await readFile(SHADER_PATH.PHONG_VERTEX_SHADER);
  const phongFragmentScript = await readFile(SHADER_PATH.PHONG_FRAGMENT_SHADER);

  // Init program
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const renderer = new WebGLRenderer(canvas);
  // TODO: render script dynamically
  // renderer.init({ vertexShader: basicVertexScript, fragmentShader: basicFragmentScript });
  renderer.init({
    vertexShader: phongVertexScript,
    fragmentShader: phongFragmentScript,
  });

  // Init scene
  const { getSelectedCam, cameras } = useCamera(renderer);

  const { updateAndGetOrbit } = useOrbit(
    canvas,
    cameras.ORTHOGRAPHIC_CAM,
    cameras.PERSPECTIVE_CAM,
    cameras.OBLIQUE_CAM
  );

  const mainScene = new Scene(new Color(0.9, 0.9, 0.9, 1));
  let mainCamera: Camera = getSelectedCam(CAM_TYPE.ORTHOGRAPHIC);
  let mainOrbit = updateAndGetOrbit();

  // Init showcase model
  const fMesh = new Mesh(
    new FGeometry(),
    new PhongMaterial(
      phongFragmentScript,
      phongVertexScript,
      new Color(1, 0, 0, 1),
      new Texture(
        "texture/f-texture.png",
        // prettier-ignore
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
        }
      ),
      new Color(0, 0, 1, 1),
      100,
      new Float32Array([0.1, 0.1, 0.1])
    )
  );
  mainScene.addChild(fMesh);

  // Rendering
  let reverseAnim = false;
  let autoPlay = true;
  let onlyPlayOnce = false;

  let deltaT = 0,
    lastTime = 0;
  let frameIndex = 0;
  let fps = 30;
  const render = (currentTime?: number, scene?: Node) => {
    let timeframe = 1000 / fps;
    if (!currentTime) currentTime = 0;
    deltaT += (currentTime - lastTime) / timeframe;
    if (scene) {
      renderer.play(scene, mainCamera);
    } else {
      renderer.play(mainScene, mainCamera);
    }

    if (deltaT > 0.95) {
      if (frameIndex > 10 && (autoPlay || onlyPlayOnce)) {
        frameIndex = 0;
        if (onlyPlayOnce) onlyPlayOnce = false;
      }
      if (frameIndex < 0 && (autoPlay || onlyPlayOnce)) {
        frameIndex = 10;
        if (onlyPlayOnce) onlyPlayOnce = false;
      }
      if (animTogglePlay.checked) {
        mainScene.children[0].applyFrameAnimation(frameIndex);
        frameIndex += reverseAnim ? -1 : 1;
      }

      deltaT = 0;
    }

    lastTime = currentTime;
    requestAnimationFrame(render);
  };

  render();

  /**
   * Listeners bindings
   */
  // Load and save
  loadInput.addEventListener("change", async () => {
    const node = await importModelJSON(loadInput.files?.item(0) as File);
    mainScene.removeChild(mainScene.children[0]);
    mainScene.addChild(node);
    const mesh = node as Mesh;
    renderer.init({
      vertexShader: mesh.material.vertexShader,
      fragmentShader: mesh.material.fragmentShader,
    });
  });
  saveInput.addEventListener("click", () =>
    exportModelJSON(mainScene.children[0])
  );

  // Cam Settings
  camSelectInput.addEventListener("change", () => {
    const camType = parseInt(camSelectInput.value) as CAM_TYPE;
    mainCamera = getSelectedCam(camType);
    mainOrbit = updateAndGetOrbit(camType);
  });
  resetCamBtn.addEventListener("click", () => {
    mainOrbit.resetOrbit();
  });
  camDistanceInput.addEventListener("input", () => {
    mainOrbit.updateDistance(parseFloat(camDistanceInput.value));
  });

  // Transform (TODO: update with scene graph)
  xTranslationInput.addEventListener("input", () => {
    mainScene.children[0].position.x = parseInt(xTranslationInput.value);
  });
  yTranslationInput.addEventListener("input", () => {
    mainScene.children[0].position.y = parseInt(yTranslationInput.value);
  });
  zTranslationInput.addEventListener("input", () => {
    mainScene.children[0].position.z = parseInt(zTranslationInput.value);
  });
  xRotationInput.addEventListener("input", () => {
    mainScene.children[0].rotateX = parseInt(xRotationInput.value);
  });
  yRotationInput.addEventListener("input", () => {
    mainScene.children[0].rotateY = parseInt(yRotationInput.value);
  });
  zRotationInput.addEventListener("input", () => {
    mainScene.children[0].rotateZ = parseInt(zRotationInput.value);
  });
  xScaleInput.addEventListener("input", () => {
    mainScene.children[0].scaleX = parseFloat(xScaleInput.value);
  });
  yScaleInput.addEventListener("input", () => {
    mainScene.children[0].scaleY = parseFloat(yScaleInput.value);
  });
  zScaleInput.addEventListener("input", () => {
    mainScene.children[0].scaleZ = parseFloat(zScaleInput.value);
  });

  // Animation
  animTogglePlay.addEventListener("change", () => {
    onlyPlayOnce = animTogglePlay.checked;
  });
  animToggleReverse.addEventListener("change", () => {
    reverseAnim = animToggleReverse.checked;
  });
  animToggleAutoPlay.addEventListener("change", () => {
    autoPlay = animToggleAutoPlay.checked;
  });
  animationToggleFrameNav.addEventListener("change", () => {
    if (animationToggleFrameNav.checked) {
      animTogglePlay.checked = false;
      frameIndex = 0;
      animationFrameData.classList.remove("hidden-element");
      animationFrameData.innerText = "Frame Index: " + frameIndex;
    } else {
      animationFrameData.classList.add("hidden-element");
    }
    animTogglePlay.disabled = animationToggleFrameNav.checked;
    animToggleReverse.disabled = animationToggleFrameNav.checked;
    animToggleAutoPlay.disabled = animationToggleFrameNav.checked;
  });

  // Animation Controller
  animToggleNextFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex++;
      if (frameIndex >= mainScene.children[0].animation.frames.length)
        frameIndex = 0;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(frameIndex);
    }
  });
  animTogglePrevFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex--;
      if (frameIndex < 0)
        frameIndex = mainScene.children[0].animation.frames.length - 1;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(frameIndex);
    }
  });
  animToggleStartFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex = 0;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(frameIndex);
    }
  });
  animToggleEndFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex = mainScene.children[0].animation.frames.length - 1;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(frameIndex);
    }
  });
  animControllerInsertFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      mainScene.children[0].insertFrameToAnimClip();
    }
  });
  animControllerDeleteFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      mainScene.children[0].deleteFrameFromAnimClip(frameIndex);
    }
  });
  animControllerSwapFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      mainScene.children[0].swapFrameWithPrevious(frameIndex);
    }
  });

  let isEditing = false;
  animControllerEditFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      isEditing = !isEditing;
      animControllerEditFrame.textContent = isEditing ? "Save" : "Edit";

      // If pressed save
      if (!isEditing) {
        mainScene.children[0].deleteFrameFromAnimClip(frameIndex);
        mainScene.children[0].insertFrameToAnimClip(frameIndex);
      }

      animToggleNextFrame.disabled = isEditing;
      animTogglePrevFrame.disabled = isEditing;
      animControllerInsertFrame.disabled = isEditing;
      animControllerDeleteFrame.disabled = isEditing;
      animControllerSwapFrame.disabled = isEditing;
    }
  });
};

main();
