precision mediump float;
varying vec3 normalInterp;  // Surface normal
varying vec3 vertPos;       // Vertex position
varying vec2 v_texcoord;
uniform int mode;   // Rendering mode
uniform float u_shininess; // Shininess
// Material color
uniform vec4 u_ambientColor;
uniform sampler2D u_diffuseMap;
uniform vec4 u_diffuseColor;
uniform sampler2D u_specularMap;
uniform vec4 u_specularColor;
uniform bool u_useNormalMap;
uniform sampler2D u_normalMap;
uniform vec3 u_lightPosition; // Light position

void main() {
    vec3 N;
    if (u_useNormalMap) {
        vec3 normalMap = texture2D(u_normalMap, v_texcoord).rgb;
        N = normalize(normalMap * 2.0 - 1.0);
    } else {
        N = normalize(normalInterp);
    }
    vec3 L = normalize(u_lightPosition - vertPos);

    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;
    if(lambertian > 0.0) {
        vec3 R = reflect(-L, N);      // Reflected light vector
        vec3 V = normalize(-vertPos); // Vector to viewer
        // Compute the specular term
        float specAngle = max(dot(R, V), 0.0);
        specular = pow(specAngle, u_shininess);
    }
    gl_FragColor = u_ambientColor +
    lambertian * u_diffuseColor * texture2D(u_diffuseMap, v_texcoord) +
    specular * u_specularColor * texture2D(u_specularMap, v_texcoord);

    // only ambient
    if(mode == 2) gl_FragColor = u_ambientColor;
    // only diffuse
    if(mode == 3) gl_FragColor = lambertian * u_diffuseColor;
    // only specular
    if(mode == 4) gl_FragColor = specular * u_specularColor;
}
