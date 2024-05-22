export const degreeToRad = (degree: number) => {
  return (degree * Math.PI) / 180;
};

export enum EASING_FUNCTION {
  LINEAR = "linear",
  SINE = "sine",
  QUAD = "quad",
  CUBIC = "cubic",
  QUART = "quart",
  EXPO = "expo",
  CIRC = "circ",
  BACK = "back",
  ELASTIC = "elastic",
  BOUNCE = "bounce",
}

export type EasingFunction = (t: number) => number;

export const EasingFunctions: { [key: string]: EasingFunction } = {
  linear: (t) => t,
  sine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  quad: (t) => t * t,
  cubic: (t) => t * t * t,
  quart: (t) => t * t * t * t * t * t * t * t,
  expo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  circ: (t) => 1 - Math.sqrt(1 - t * t),
  back: (t) => t * t * (2.70158 * t - 1.70158),
  elastic: (t) =>
    t === 0 || t === 1
      ? t
      : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI),
  bounce: (t) => {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
};

export const interpolate = (
  start: number,
  end: number,
  t: number,
  easingFunction: EasingFunction
): number => {
  return start + (end - start) * easingFunction(t);
};

export const interpolateArray = (
  startArray: number[],
  endArray: number[],
  t: number,
  easingFunction: EasingFunction
): number[] => {
  return startArray.map((start, i) =>
    interpolate(start, endArray[i], t, easingFunction)
  );
};
