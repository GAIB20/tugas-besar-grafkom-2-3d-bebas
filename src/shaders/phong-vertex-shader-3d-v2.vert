attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;
uniform mat4 u_viewProjectionMatrix, u_worldMatrix, u_normalMatrix;

uniform sampler2D u_displacementMap;
uniform bool u_useDisplacementMap;
uniform float u_displacementFactor;
uniform float u_displacementBias;

varying vec3 normalInterp;
varying vec3 vertPos;

varying vec2 v_texcoord;

void main(){
    vec4 vertPos4 = u_worldMatrix * a_position;
    vertPos = vec3(vertPos4) / vertPos4.w;
    normalInterp = vec3(u_normalMatrix * vec4(a_normal, 0.0));

    if (u_useDisplacementMap) {
      float displacement = texture2D(u_displacementMap, a_texcoord).r;
      displacement = displacement * u_displacementFactor + u_displacementBias;
      vertPos4.xyz += normalize(normalInterp) * displacement;
    }

    gl_Position = u_viewProjectionMatrix * vertPos4;
    v_texcoord = a_texcoord;
}
