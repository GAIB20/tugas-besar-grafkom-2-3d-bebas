precision highp float;

// Light Model
uniform vec3 u_ambientColor;

// Fragment Vertex Shader
varying vec4 v_Color;

void main(void) {
  vec3 color = u_ambientColor * v_Color.rgb;
  gl_FragColor = vec4(color, v_Color.a);
}
