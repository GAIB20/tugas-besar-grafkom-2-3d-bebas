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

// Texture
const textureSelectInput = getElement("mapping-type") as HTMLSelectElement;

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

export {
  // Load n save
  loadInput,
  saveInput,

  // Cam
  camSelectInput,
  resetCamBtn,
  camDistanceInput,

  // Texture
  textureSelectInput,

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
};
