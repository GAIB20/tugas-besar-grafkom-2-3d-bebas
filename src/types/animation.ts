export type AnimationTRS = {
  translation?: number[];
  rotation?: number[];
  scale?: number[];
};

export type AnimationPath = {
  keyframe?: AnimationTRS;
  children?: {
    [childName: string]: AnimationPath;
  };
};

export type AnimationClip = {
  name: string;
  frames: AnimationPath[];
};
