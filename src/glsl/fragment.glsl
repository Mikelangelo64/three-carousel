uniform sampler2D uTexture;
//uniform sampler2D uTexture2;
uniform float uAlpha;
varying vec2 vUv;
//uniform vec2 u_mouse;
//uniform float u_time;

in vec3 vertexColor;

void main() {
   vec3 color = vertexColor;
   //gl_FragColor = vec4(color, uAlpha);
   gl_FragColor = texture2D(uTexture, vUv);
}