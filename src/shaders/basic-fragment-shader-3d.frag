precision highp float;

// Light Model
uniform vec4 u_ambientColor;

// Fragment Vertex Shader
varying vec4 v_Color;

void main(void) {
  gl_FragColor = u_ambientColor * v_Color;
}
