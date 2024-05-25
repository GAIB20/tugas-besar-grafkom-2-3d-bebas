precision mediump float;

// The texture
uniform sampler2D u_diffuseColor;
uniform sampler2D u_diffuseTexture;
uniform sampler2D u_specularColor;
uniform sampler2D u_specularTexture;


// Light Model
uniform vec3 u_ambientColor;
uniform vec3 u_reverseLightDirection;


// Pass-through vertex shader
varying vec2 v_texCoord;
varying vec3 v_normal;

void main(void) {

//    vec4 diffuseColor = texture2D(u_diffuseColor, v_texCoord);
    vec4 diffuseTexture = texture2D(u_diffuseTexture, v_texCoord);
//    vec4 diffuseFinal = diffuseColor * diffuseTexture;

    // TODO: temporary
    vec4 diffuseFinal = diffuseTexture;

    // Combine the diffuse result with the ambient light color
    vec3 finalColor = u_ambientColor * diffuseFinal.rgb;

    float light = dot(v_normal, u_reverseLightDirection);

    // Set the final fragment color, including ambient light
    gl_FragColor = vec4(finalColor, diffuseFinal.a);
    gl_FragColor.rgb *= light;
}
