import { Orbit } from "src/core/orbit";
import { Camera } from "src/cameras/camera";
import { CAM_TYPE } from "src/types/camera";

export const useOrbit = (
  canvas: HTMLCanvasElement,
  orthographicCam: Camera,
  perspectiveCam: Camera,
  obliqueCam: Camera
) => {
  const orthographicOrbit = new Orbit(canvas, orthographicCam);
  orthographicOrbit.setupControlOrbit();

  const perspectiveOrbit = new Orbit(canvas, perspectiveCam);
  perspectiveOrbit.setupControlOrbit();

  const obliqueOrbit = new Orbit(canvas, obliqueCam);
  obliqueOrbit.setupControlOrbit();

  const updateAndGetOrbit = (camType?: CAM_TYPE) => {
    switch (camType) {
      case CAM_TYPE.ORTHOGRAPHIC:
        perspectiveOrbit.disableOrbit();
        obliqueOrbit.disableOrbit();
        orthographicOrbit.enableOrbit();
        return orthographicOrbit;

      case CAM_TYPE.PERSPECTIVE:
        orthographicOrbit.disableOrbit();
        obliqueOrbit.disableOrbit();
        perspectiveOrbit.enableOrbit();
        return perspectiveOrbit;

      case CAM_TYPE.OBLIQUE:
        orthographicOrbit.disableOrbit();
        perspectiveOrbit.disableOrbit();
        obliqueOrbit.enableOrbit();
        return obliqueOrbit;

      default:
        perspectiveOrbit.disableOrbit();
        obliqueOrbit.disableOrbit();
        orthographicOrbit.enableOrbit();
        return orthographicOrbit;
    }
  };

  return {
    updateAndGetOrbit,
  };
};
