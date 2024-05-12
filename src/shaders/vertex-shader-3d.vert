// TODO: update this
attribute vec3 position;
attribute vec3 normal;

uniform mat4 ViewProjMat;
uniform mat4 ModelMat;
uniform mat4 NormalMat;

attribute vec3 color;
varying vec3 vLighting;
varying vec3 vColor;

void main(void) {
  gl_Position = ViewProjMat * ModelMat * vec4(position, 1.);
  // vec3 ambientLight = vec3(0.3, 0.3, 0.3);
  // vec3 directionalLightColor = vec3(1, 1, 1);
  // vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
  // vec4 transformedNormal = Nmatrix*vec4(normal, 1.);

  // float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  // vLighting = ambientLight + (directionalLightColor * directional);
  // vColor = color;
}
