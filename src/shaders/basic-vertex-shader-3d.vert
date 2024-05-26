attribute vec4 a_color;
attribute vec4 a_position;

uniform mat4 u_viewProjectionMatrix;
uniform mat4 u_worldMatrix;


varying vec4 v_Color;

void main(void) {
  gl_Position = u_viewProjectionMatrix * u_worldMatrix * a_position;

  v_Color = a_color;
}
