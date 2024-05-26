/**
 * Bindings to HTML Element
 */

const getElement = (id: string) => document.getElementById(id);

// Load & Save
const loadInput = getElement("load-model") as HTMLInputElement;
const saveInput = getElement("save-model") as HTMLInputElement;

// Camera type
const camSelectInput = getElement("projection-type") as HTMLSelectElement;
const resetCamBtn = getElement("reset-cam") as HTMLButtonElement;
const camDistanceInput = getElement("cam-distance") as HTMLInputElement;

// Translation
const xTranslationInput = getElement("x-translation") as HTMLInputElement;
const yTranslationInput = getElement("y-translation") as HTMLInputElement;
const zTranslationInput = getElement("z-translation") as HTMLInputElement;

// Rotation
const xRotationInput = getElement("x-rotation") as HTMLInputElement;
const yRotationInput = getElement("y-rotation") as HTMLInputElement;
const zRotationInput = getElement("z-rotation") as HTMLInputElement;

// Scale
const xScaleInput = getElement("x-scale") as HTMLInputElement;
const yScaleInput = getElement("y-scale") as HTMLInputElement;
const zScaleInput = getElement("z-scale") as HTMLInputElement;

// Ambient Light
const ambientLightColorInput = getElement("ambient-color-picker") as HTMLInputElement;

// Phong Light
const shininessInput = getElement("shininess-slider") as HTMLInputElement;
const diffuseColorInput = getElement("diffuse-color-picker") as HTMLInputElement;
const diffuseMappingCheckbox = getElement("diffuse-mapping-checkbox") as HTMLInputElement;
const specularColorInput = getElement("specular-color-picker") as HTMLInputElement;
const specularMappingCheckbox = getElement("specular-mapping-checkbox") as HTMLInputElement;
const displacementMappingCheckbox = getElement("displacement-mapping-checkbox") as HTMLInputElement;
const normalMappingCheckbox = getElement("normal-mapping-checkbox") as HTMLInputElement;
const displacementFactorInput = getElement("displacement-factor-slider") as HTMLInputElement;
const displacementBiasInput = getElement("displacement-bias-slider") as HTMLInputElement;
const textureSelection = getElement("texture-selection") as HTMLSelectElement;
const phongCheckbox = getElement("phong-checkbox") as HTMLInputElement;

// Animation
const animTogglePlay = getElement("animation-toggle-play") as HTMLInputElement;
const animToggleReverse = getElement(
  "animation-toggle-reverse"
) as HTMLInputElement;
const animToggleAutoPlay = getElement(
  "animation-toggle-auto-play"
) as HTMLInputElement;
const animationToggleFrameNav = getElement(
  "animation-toggle-frame-nav"
) as HTMLInputElement;
const animationFrameData = getElement(
  "animation-frame-data"
) as HTMLParagraphElement;
const animToggleNextFrame = getElement(
  "animation-toggle-next-frame"
) as HTMLButtonElement;
const animTogglePrevFrame = getElement(
  "animation-toggle-prev-frame"
) as HTMLButtonElement;
const animToggleStartFrame = getElement(
  "animation-toggle-start-frame"
) as HTMLButtonElement;
const animToggleEndFrame = getElement(
  "animation-toggle-end-frame"
) as HTMLButtonElement;

const animControllerInsertFrame = getElement(
  "animation-controller-insert-frame"
) as HTMLButtonElement;
const animControllerDeleteFrame = getElement(
  "animation-controller-delete-frame"
) as HTMLButtonElement;
const animControllerEditFrame = getElement(
  "animation-controller-edit-frame"
) as HTMLButtonElement;
const animControllerSwapFrame = getElement(
  "animation-controller-swap-frame"
) as HTMLButtonElement;
const animEasingSelect = getElement("animation-easing") as HTMLSelectElement;

// Scene Graph
const sceneGraphTree = getElement("scene-graph-tree") as HTMLUListElement;

export {
  // Load n save
  loadInput,
  saveInput,

  // Cam
  camSelectInput,
  resetCamBtn,
  camDistanceInput,

  // Transformation
  xTranslationInput,
  yTranslationInput,
  zTranslationInput,
  xRotationInput,
  yRotationInput,
  zRotationInput,
  xScaleInput,
  yScaleInput,
  zScaleInput,

  // Light
  ambientLightColorInput,

  // Phong
  shininessInput,
  diffuseColorInput,
  diffuseMappingCheckbox,
  specularColorInput,
  specularMappingCheckbox,
  displacementMappingCheckbox,
  normalMappingCheckbox,
  displacementFactorInput,
  displacementBiasInput,
  textureSelection,
  phongCheckbox,

  // Animation
  animTogglePlay,
  animToggleReverse,
  animToggleAutoPlay,
  animationToggleFrameNav,
  animationFrameData,
  animToggleNextFrame,
  animTogglePrevFrame,
  animToggleStartFrame,
  animToggleEndFrame,

  // Animation Controller
  animControllerInsertFrame,
  animControllerDeleteFrame,
  animControllerEditFrame,
  animControllerSwapFrame,
  animEasingSelect,

  // Scene Graph
  sceneGraphTree,
};
