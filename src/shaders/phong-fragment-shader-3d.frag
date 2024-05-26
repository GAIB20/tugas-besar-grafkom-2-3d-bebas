precision highp float;


uniform sampler2D u_normalMap;
uniform bool u_useNormalMap;
uniform vec4 u_ambientColor;
uniform sampler2D u_diffuseMap;
uniform vec4 u_diffuseColor;
uniform sampler2D u_specularMap;
uniform vec4 u_specularColor;
uniform float u_shininess;


varying vec3 v_lightDirection;
varying vec3 v_cameraPosition;
varying vec3 v_vertexPosition;
varying vec2 v_texcoord;
varying vec3 v_normal;


void main() {
    vec3 L = normalize(v_lightDirection);
    vec3 V = normalize(v_cameraPosition - v_vertexPosition);
    vec3 H = normalize(L + V);
    vec3 N;


    if (u_useNormalMap) {
        N = texture2D(u_normalMap, v_texcoord).rgb;
        N = normalize(N * 2.0 - 1.0);
    } else {
        N = normalize(v_normal);
    }


    vec4 ambient = u_ambientColor * 0.3;
    vec4 diffuse =
    u_diffuseColor *
    max(dot(L, N), 0.0) *
    texture2D(u_diffuseMap, v_texcoord);
    vec4 specular =
    u_specularColor *
    pow(max(dot(N, H), 0.0), u_shininess) *
    texture2D(u_specularMap, v_texcoord);


    float attenuation = 1.0;
    gl_FragColor = attenuation * (diffuse + specular) + ambient;
}
