attribute float value;
varying float vValue;
uniform float pointSize;
uniform bool scalePoints;

void main() {
    vValue = value/255.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //If it is nan we just yeet it tf out of the screen space. LMAO I love this solution
    if (value == 255.){
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    }
    float pointScale = pointSize/gl_Position.w;
    gl_PointSize = scalePoints ? pointScale*pow(vValue,2.) : pointScale ;
}
