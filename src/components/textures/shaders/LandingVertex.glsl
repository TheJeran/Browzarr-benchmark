uniform float uSphereMix;
uniform float uCubeMix;
uniform float uPlaneMix;
uniform float uSize;
uniform float uTime;

attribute vec3 aSpherePosition;
attribute vec3 aCubePosition;
attribute vec3 aPlanePosition;
varying vec3 vColor; 

void main() {
    // Linearly interpolate between the three shapes using the mix uniforms
    vec3 pos = mix(aSpherePosition, aCubePosition, uCubeMix);
    pos = mix(pos, aPlanePosition, uPlaneMix);

    // Add a slight sine wave animation to make it more dynamic
    pos.y += sin(pos.x * 50.0 + uTime) * 0.005;
    pos.x += cos(pos.y * 50.0 + uTime) * 0.005;

    float minBrightness = 0.2;
    float maxBrightness = 0.96;

    float r = (sin(pos.z + (uTime * 0.2 ) ) + 1.) / 2. ;
    float g = (cos(pos.y + (uTime * 0.1 ) ) + 1.) / 2.;
    float b = (cos(pos.x+pos.y + (uTime * 0.5)) + 1.)/2.;

    vColor = vec3(r, g, b);
    // Calculate luminance (perceived brightness)

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Make points smaller as they are further away (perspective)
    gl_PointSize = (30.0 / -viewPosition.z);
}

