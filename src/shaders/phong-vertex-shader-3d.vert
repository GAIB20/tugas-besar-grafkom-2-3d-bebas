attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal;

uniform mat4 u_WorldMat;
uniform mat4 u_ViewProjMat;
//uniform vec2 u_resolution;
//uniform bool u_useVertexColor;
//
//varying vec4 v_color;
//varying vec3 v_normal, v_pos;

varying vec2 v_texCoord;
varying vec3 v_normal;

void main(void) {
    gl_Position = u_ViewProjMat * u_WorldMat * a_position;

//    v_pos = gl_Position.xyz / gl_Position.w;
//    v_normal = mat3(u_worldMatrix) * a_normal;
//    v_color = mix(vec4(1,1,1,1), a_color, float(u_useVertexColor));

    v_normal = a_normal;
    v_texCoord = a_texCoord;
}
