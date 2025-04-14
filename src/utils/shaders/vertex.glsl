 // by Jeran Poehls

out vec3 vOrigin;
out vec3 vDirection;
varying vec2 Vuv;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPosition, 1.0 ) ).xyz;
    vDirection = position - vOrigin;
    Vuv = uv;
    gl_Position = projectionMatrix * mvPosition;
}