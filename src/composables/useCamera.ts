import { ObliqueCamera } from "src/cameras/oblique";
import { OrthographicCamera } from "src/cameras/orthographic";
import { PerspectiveCamera } from "src/cameras/perspective";
import { CAM_TYPE } from "src/types/camera";
import { WebGLRenderer } from "src/webgl/renderer";

export const useCamera = (renderer: WebGLRenderer) => {
  /**
   * Orthographic Camera
   * */
  const ORTHOGRAPHIC_NEAR = -1000;
  const ORTHOGRAPHIC_FAR = 1000;
  const orthographicCam = new OrthographicCamera(
    -renderer.width / 2,
    renderer.width / 2,
    -renderer.height / 2,
    renderer.height / 2,
    ORTHOGRAPHIC_NEAR,
    ORTHOGRAPHIC_FAR
  );

  /**
   * Perspective Camera
   * */
  const PERSPECTIVE_FOV = 60;
  const PERSPECTIVE_NEAR = 0.01;
  const PERSPECTIVE_FAR = 1000;
  const perspectiveCam = new PerspectiveCamera(
    PERSPECTIVE_FOV,
    renderer.width / renderer.height,
    PERSPECTIVE_NEAR,
    PERSPECTIVE_FAR
  );
  perspectiveCam.position.z = 700;

  /**
   * Oblique Camera
   * */
  const OBLIQUE_THETA = 45;
  const OBLIQUE_PHI = 45;
  const obliqueCam = new ObliqueCamera(
    OBLIQUE_THETA,
    OBLIQUE_PHI,
    -renderer.width / 2,
    renderer.width / 2,
    -renderer.height / 2,
    renderer.height / 2,
    ORTHOGRAPHIC_NEAR,
    ORTHOGRAPHIC_FAR
  );

  const getSelectedCam = (camType: CAM_TYPE) => {
    switch (camType) {
      case CAM_TYPE.ORTHOGRAPHIC:
        return orthographicCam;
      case CAM_TYPE.PERSPECTIVE:
        return perspectiveCam;
      case CAM_TYPE.OBLIQUE:
        return obliqueCam;
      default:
        return orthographicCam;
    }
  };

  const cameras = {
    ORTHOGRAPHIC_CAM: orthographicCam,
    PERSPECTIVE_CAM: perspectiveCam,
    OBLIQUE_CAM: obliqueCam,
  };

  return {
    cameras,
    getSelectedCam,
  };
};
