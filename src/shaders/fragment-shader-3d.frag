// TODO: update this

precision mediump float;
varying vec3 vColor;
varying vec3 vLighting;

void main(void) {
  gl_FragColor = vec4(vColor, 1.);
  gl_FragColor.rgb *= vLighting;
}
