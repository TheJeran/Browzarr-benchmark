attribute float value;
varying float vValue;
uniform float pointSize;
uniform bool scalePoints;

void main() {
    vValue = value/255.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = scalePoints ? pointSize*pow(vValue,2.) : pointSize;
}
