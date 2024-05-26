attribute vec4 a_position;
attribute vec3 a_tangent;
attribute vec3 a_normal;
attribute vec2 a_texcoord;


uniform mat4 u_worldMatrix;
uniform mat4 u_viewProjectionMatrix;
uniform mat4 u_normalMatrix; // TODO
uniform vec3 u_lightDirection;
uniform vec3 u_cameraPosition;
uniform sampler2D u_displacementMap;
uniform float u_displacementFactor;


varying vec3 v_lightDirection;
varying vec3 v_cameraPosition;
varying vec3 v_vertexPosition;
varying vec2 v_texcoord;
varying vec3 v_normal;


void main() {
    mat3 normalMat = mat3(u_normalMatrix);


    vec3 T = normalize(normalMat * a_tangent); // Tangent
    vec3 N = normalize(normalMat * a_normal ); // Normal
    vec3 B = cross(N, T);                      // Bi-Tangent
    // invTBN = matriks transformasi World Space -> Tangent Space
    // invTBN = inverse(TBN) = transpose(TBN) karena TBN adalah matriks orthogonal
    // karena tidak ada transpose() di WebGL, jadi harus manual :(
    mat3 invTBN = mat3(
        vec3(T.x, B.x, N.x),
        vec3(T.y, B.y, N.y),
        vec3(T.z, B.z, N.z)
    );


    vec4 pos = u_worldMatrix * a_position;
    float d = texture2D(u_displacementMap, a_texcoord).r; // ambil channel r
    pos.xyz += d * u_displacementFactor * N; // p = p + d * f * n


    v_lightDirection = invTBN * u_lightDirection;
    v_cameraPosition = invTBN * u_cameraPosition;
    v_vertexPosition = invTBN * vec3(u_worldMatrix * a_position);
    v_vertexPosition = invTBN * pos.xyz;
    v_texcoord = a_texcoord;
    v_normal = N;


    gl_Position = u_viewProjectionMatrix * u_worldMatrix * a_position;
    gl_Position = u_viewProjectionMatrix * pos;
}
