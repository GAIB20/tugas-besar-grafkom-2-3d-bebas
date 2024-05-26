// Module related imports
import { WebGLRenderer } from "./webgl/renderer";
import { Mesh } from "./core/mesh";
import { Color } from "./types/color";
import { Scene } from "./core/scene";
import { useCamera } from "./composables/useCamera";
import { exportModelJSON, importModelJSON } from "./utils/file-handler";
import { SHADER_SCRIPTS } from "./shaders";
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
  ambientLightColorInput,
  shininessInput,
  diffuseColorInput,
  diffuseMappingCheckbox,
  specularColorInput,
  specularMappingCheckbox,
  displacementMappingCheckbox,
  normalMappingCheckbox,
  phongCheckbox,
  displacementFactorInput,
  displacementBiasInput,
  textureSelection,
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
  animEasingSelect,
  sceneGraphTree,
} from "./ui-element/bindings";
import { Camera } from "./cameras/camera";
import { CAM_TYPE } from "./types/camera";
import { useOrbit } from "./composables/useOrbit";

// Stylesheet imports
import "src/css/global.css";
import { EASING_FUNCTION } from "./math/extra";
import { BoxGeometry } from "src/geometries/box-geometry.ts";
import { Texture } from "src/material/texture.ts";
import { PhongMaterial } from "src/material/phong-material.ts";
import { Displacement } from "src/material/displacement.ts";
import { BasicMaterial } from "src/material/basic-material.ts";

/**
 * Main Script
 */
const main = async () => {
  // Init program
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const renderer = new WebGLRenderer(canvas);
  renderer.init({
    vertexShader: SHADER_SCRIPTS.BASIC_VERTEX_SHADER_SCRIPT,
    fragmentShader: SHADER_SCRIPTS.BASIC_FRAGMENT_SHADER_SCRIPT,
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

  let selectedNode: Node | null = null;

  // texture resources
  const diffuseImageElements = [
    document.getElementById("diffuse-1") as HTMLImageElement,
    document.getElementById("diffuse-2") as HTMLImageElement,
    document.getElementById("diffuse-3") as HTMLImageElement,
  ];
  const specularImageElements = [
    document.getElementById("specular-1") as HTMLImageElement,
    document.getElementById("specular-2") as HTMLImageElement,
    document.getElementById("specular-3") as HTMLImageElement,
  ];
  const normalImageElements = [
    document.getElementById("normal-1") as HTMLImageElement,
    document.getElementById("normal-2") as HTMLImageElement,
    document.getElementById("normal-3") as HTMLImageElement,
  ];
  const displacementImageElements = [
    document.getElementById("displacement-1") as HTMLImageElement,
    document.getElementById("displacement-2") as HTMLImageElement,
    document.getElementById("displacement-3") as HTMLImageElement,
  ];

  const showcaseModel = new Mesh(
    new BoxGeometry(250, 250, 250),
    new BasicMaterial(),
    "Box"
  );
  mainScene.addChild(showcaseModel);
  updateSceneGraph(mainScene, sceneGraphTree);

  shininessInput.disabled = !phongCheckbox.checked;
  diffuseColorInput.disabled = !diffuseMappingCheckbox.checked;
  specularColorInput.disabled = !specularMappingCheckbox.checked;
  displacementFactorInput.disabled = !displacementMappingCheckbox.checked;
  displacementBiasInput.disabled = !displacementMappingCheckbox.checked;

  // Rendering
  let reverseAnim = false;
  let autoPlay = true;
  let onlyPlayOnce = false;

  let deltaT = 0,
    deltaFrame = 0,
    lastTime: number;
  let frameIndex = 0;
  let currentFrame = 0;
  let fps = 5;
  let easingType = EASING_FUNCTION.LINEAR;
  const render = (currentTime?: number, scene?: Node) => {
    if (!currentTime) currentTime = 0;
    if (lastTime === undefined) lastTime = currentTime;

    deltaT = (currentTime - lastTime) / 1000;

    if (scene) {
      renderer.play(scene, mainCamera);
    } else {
      renderer.play(mainScene, mainCamera);
    }

    if (mainScene.children[0].animation && (autoPlay || onlyPlayOnce)) {
      if (
        currentFrame + 1 >= mainScene.children[0].animation.frames.length &&
        (autoPlay || onlyPlayOnce) &&
        !reverseAnim
      ) {
        if (onlyPlayOnce) onlyPlayOnce = false;
      }
      if (currentFrame <= 0 && (autoPlay || onlyPlayOnce) && reverseAnim) {
        if (onlyPlayOnce) onlyPlayOnce = false;
      }

      if (animTogglePlay.checked) {
        deltaFrame += deltaT * fps;
        const tweenProgress = deltaFrame < 1 ? deltaFrame : 1;

        mainScene.children[0].applyFrameAnimation(
          currentFrame,
          undefined,
          easingType,
          tweenProgress
        );

        if (deltaFrame >= 1) {
          currentFrame =
            (currentFrame + Math.floor(deltaFrame) * (reverseAnim ? -1 : 1)) %
            mainScene.children[0].animation.frames.length;
          currentFrame =
            currentFrame < 0
              ? mainScene.children[0].animation.frames.length
              : currentFrame;
          deltaFrame %= 1;
        }
      }
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
    const file = loadInput.files?.item(0);
    if (file) {
      const node = await importModelJSON(file);
      mainScene.removeChild(mainScene.children[0]);
      mainScene.addChild(node);
      const mesh = node as Mesh;
      renderer.init({
        vertexShader: mesh.material.vertexShader,
        fragmentShader: mesh.material.fragmentShader,
      });

      updateSceneGraph(mainScene, sceneGraphTree);

      phongCheckbox.checked = false;
    }
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

  // Transform
  xTranslationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.position.x = parseInt(xTranslationInput.value);
    }
  });
  yTranslationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.position.y = parseInt(yTranslationInput.value);
    }
  });
  zTranslationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.position.z = parseInt(zTranslationInput.value);
    }
  });
  xRotationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.rotation.x = parseInt(xRotationInput.value);
    }
  });
  yRotationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.rotation.y = parseInt(yRotationInput.value);
    }
  });
  zRotationInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.rotation.z = parseInt(zRotationInput.value);
    }
  });
  xScaleInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.scaleX = parseFloat(xScaleInput.value);
    }
  });
  yScaleInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.scaleY = parseFloat(yScaleInput.value);
    }
  });
  zScaleInput.addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.scaleZ = parseFloat(zScaleInput.value);
    }
  });

  // Light
  ambientLightColorInput.value = renderer.ambientLightColor.toHex();
  ambientLightColorInput.addEventListener("input", () => {
    renderer.ambientLightColor = Color.fromHex(ambientLightColorInput.value);
  });

  shininessInput.addEventListener("input", () => {
    const selectedMesh = selectedNode as Mesh;
    if (selectedMesh.material instanceof PhongMaterial) {
      selectedMesh.material.shininess = parseFloat(shininessInput.value);
    }
  });

  // Texture Selection
  textureSelection.addEventListener("change", () => {
    const selectedTexture = textureSelection.value;
    const textureIndex = parseInt(selectedTexture.split("-")[1]) - 1;
    const mainMesh = mainScene.children[0] as Mesh;
    if (mainMesh.material instanceof PhongMaterial) {
      mainMesh.material = new PhongMaterial(
        new Texture(diffuseImageElements[textureIndex]),
        new Texture(specularImageElements[textureIndex]),
        new Texture(normalImageElements[textureIndex]),
        new Displacement(displacementImageElements[textureIndex])
      );
    }
  });

  // Phong Mapping
  diffuseMappingCheckbox.addEventListener("change", () => {
    diffuseColorInput.disabled = !diffuseMappingCheckbox.checked;
    renderer.useDiffuseMap = diffuseMappingCheckbox.checked;
  });

  diffuseColorInput.addEventListener("input", () => {
    if (phongCheckbox.checked)
      ((selectedNode as Mesh).material as PhongMaterial).diffuse.color =
        Color.fromHex(diffuseColorInput.value);
  });

  specularMappingCheckbox.addEventListener("change", () => {
    specularColorInput.disabled = !specularMappingCheckbox.checked;
    renderer.useSpecularMap = specularMappingCheckbox.checked;
  });

  specularColorInput.addEventListener("input", () => {
    if (phongCheckbox.checked)
      ((selectedNode as Mesh).material as PhongMaterial).specular.color =
        Color.fromHex(specularColorInput.value);
  });

  displacementMappingCheckbox.addEventListener("change", () => {
    displacementFactorInput.disabled = !displacementMappingCheckbox.checked;
    displacementBiasInput.disabled = !displacementMappingCheckbox.checked;
    renderer.useDisplacementMap = displacementMappingCheckbox.checked;
  });

  displacementFactorInput.addEventListener("input", () => {
    const selectedMesh = selectedNode as Mesh;
    if (selectedMesh.material instanceof PhongMaterial) {
      selectedMesh.material.displacement.factor = parseFloat(
        displacementFactorInput.value
      );
    }
  });

  displacementBiasInput.addEventListener("input", () => {
    const selectedMesh = selectedNode as Mesh;
    if (selectedMesh.material instanceof PhongMaterial) {
      selectedMesh.material.displacement.bias = parseFloat(
        displacementBiasInput.value
      );
    }
  });

  normalMappingCheckbox.addEventListener("change", () => {
    renderer.useNormalMap = normalMappingCheckbox.checked;
  });

  phongCheckbox.addEventListener("change", () => {
    const isPhongChecked = phongCheckbox.checked;
    // Menonaktifkan atau mengaktifkan input lainnya berdasarkan status phongCheckbox
    displacementMappingCheckbox.disabled = !isPhongChecked;
    specularMappingCheckbox.disabled = !isPhongChecked;
    diffuseMappingCheckbox.disabled = !isPhongChecked;
    textureSelection.disabled = !isPhongChecked;
    normalMappingCheckbox.disabled = !isPhongChecked;
    shininessInput.disabled = !isPhongChecked;

    displacementFactorInput.disabled =
      !isPhongChecked || !displacementMappingCheckbox.checked;
    displacementBiasInput.disabled =
      !isPhongChecked || !displacementMappingCheckbox.checked;
    specularColorInput.disabled =
      !isPhongChecked || !specularMappingCheckbox.checked;
    diffuseColorInput.disabled =
      !isPhongChecked || !diffuseMappingCheckbox.checked;

    if (phongCheckbox.checked) {
      (mainScene.children[0] as Mesh).material = new PhongMaterial(
        new Texture(diffuseImageElements[0]),
        new Texture(specularImageElements[0]),
        new Texture(normalImageElements[0]),
        new Displacement(displacementImageElements[0])
      );
      renderer.init({
        vertexShader: SHADER_SCRIPTS.PHONG_VERTEX_SHADER_SCRIPT,
        fragmentShader: SHADER_SCRIPTS.PHONG_FRAGMENT_SHADER_SCRIPT,
      });
    } else {
      (mainScene.children[0] as Mesh).material = new BasicMaterial();

      renderer.init({
        vertexShader: SHADER_SCRIPTS.BASIC_VERTEX_SHADER_SCRIPT,
        fragmentShader: SHADER_SCRIPTS.BASIC_FRAGMENT_SHADER_SCRIPT,
      });
    }
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
  animEasingSelect.addEventListener("change", () => {
    easingType = animEasingSelect.value as EASING_FUNCTION;
  });
  animationToggleFrameNav.addEventListener("change", () => {
    if (animationToggleFrameNav.checked) {
      animTogglePlay.checked = false;
      frameIndex = 0;
      animationFrameData.classList.remove("hidden-element");
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
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
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
    }
  });
  animTogglePrevFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex--;
      if (frameIndex < 0)
        frameIndex = mainScene.children[0].animation.frames.length - 1;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
    }
  });
  animToggleStartFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex = 0;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
    }
  });
  animToggleEndFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked && mainScene.children[0].animation) {
      frameIndex = mainScene.children[0].animation.frames.length - 1;
      animationFrameData.innerText = "Frame Index: " + frameIndex;
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
    }
  });
  animControllerInsertFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      mainScene.children[0].insertFrameToAnimClip(frameIndex);
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
      animationFrameData.innerText = "Frame Index: " + frameIndex;
    }
  });
  animControllerDeleteFrame.addEventListener("click", () => {
    if (animationToggleFrameNav.checked) {
      mainScene.children[0].deleteFrameFromAnimClip(frameIndex);
      frameIndex--;
      if (frameIndex < 0)
        frameIndex = mainScene.children[0].animation.frames.length - 1;
      mainScene.children[0].applyFrameAnimation(
        frameIndex,
        undefined,
        "linear",
        0,
        false,
        true
      );
      animationFrameData.innerText = "Frame Index: " + frameIndex;
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

  function updateSceneGraph(
    node: Node,
    parentElement: HTMLElement,
    isRoot = true
  ) {
    if (isRoot) {
      parentElement.innerHTML = "";
      if (node.children.length > 0) {
        selectedNode = node.children[0];
        updateTransformControls();
      }
    }

    if (!isRoot) {
      const li = document.createElement("li");

      const button = document.createElement("button");
      button.textContent = node.name;
      button.classList.add("scene-graph-button");

      if (selectedNode === node) {
        button.classList.add("active");
      }

      button.addEventListener("click", () => {
        selectedNode = node;
        const buttons = document.querySelectorAll(".scene-graph-button");
        buttons.forEach((button) => button.classList.remove("active"));
        button.classList.add("active");
        updateTransformControls();
      });

      li.appendChild(button);
      parentElement.appendChild(li);
    }

    if (node.children.length > 0) {
      const ul = document.createElement("ul");
      if (!isRoot) {
        const li = parentElement.lastElementChild;
        if (li) {
          li.appendChild(ul);
        }
      } else {
        parentElement.appendChild(ul);
      }
      node.children.forEach((child) => updateSceneGraph(child, ul, false));
    }
  }

  function updateTransformControls() {
    if (selectedNode) {
      xTranslationInput.value = selectedNode.position.x.toString();
      yTranslationInput.value = selectedNode.position.y.toString();
      zTranslationInput.value = selectedNode.position.z.toString();

      xRotationInput.value = selectedNode.rotation.x.toString();
      yRotationInput.value = selectedNode.rotation.y.toString();
      zRotationInput.value = selectedNode.rotation.z.toString();

      xScaleInput.value = selectedNode.scale.x.toString();
      yScaleInput.value = selectedNode.scale.y.toString();
      zScaleInput.value = selectedNode.scale.z.toString();
    }
  }
};

main();
