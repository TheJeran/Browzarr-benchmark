attribute float value;
varying float vValue;
uniform float pointSize;
uniform bool scalePoints;
uniform float scaleIntensity;

void main() {
    vValue = value/255.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //If it is nan we just yeet it tf out of the screen space. LMAO I love this solution
    float pointScale = pointSize/gl_Position.w;
    pointScale = scalePoints ? pointScale*pow(vValue,scaleIntensity) : pointScale;
    if (value == 255. || (pointScale < 0.75 && scalePoints)){
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    }

    gl_PointSize = pointScale;
}
