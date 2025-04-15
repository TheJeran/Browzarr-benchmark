attribute float value;
varying float vValue;
uniform float pointSize;
uniform bool scalePoints;

void main() {
    vValue = value/255.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    float pointScale = pointSize/gl_Position.w;
    gl_PointSize = scalePoints ? pointScale*pow(vValue,2.) : pointScale ;
}
