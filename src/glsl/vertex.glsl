varying vec2 vUv;

out vec3 vertexColor;

vec3 setPosition(vec3 position) {
   vec3 positionNew = position;
   float distanceFromCenter = abs((modelMatrix * vec4(position, 1.0) * 0.001).x);
   
   //position.y *= 1. + 0.3 * sin(position.x * 9.) * 0.5;
   positionNew.y *= 1. + 1. * pow(distanceFromCenter, 2.);
   //position.x += 1.;

   return positionNew;
}

void main() {
   vUv = uv;
   vertexColor = vec3(0.5f, 0.5f, 0.0f);

   vec3 newPosition = setPosition(position);
   gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( newPosition, 1.0 );
}