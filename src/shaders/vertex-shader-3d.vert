attribute vec4 a_color;
attribute vec4 a_position;

uniform mat4 u_ViewProjMat;
uniform mat4 u_WorldMat;

varying vec4 v_Color;

void main(void) {
  gl_Position = u_ViewProjMat * u_WorldMat * a_position;

  v_Color = a_color;
}
