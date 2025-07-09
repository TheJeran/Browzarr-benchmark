attribute float value;
out float vValue;

flat out int highlight;

uniform float pointSize;
uniform bool scalePoints;
uniform float scaleIntensity;
uniform vec2 valueRange;
uniform int startID;
uniform int stride;
uniform int dimWidth;
uniform bool showTransect;
uniform float timeScale;

void main() {
    vValue = value/255.;
    vec3 scaledPos = position;
    scaledPos.z *= timeScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(scaledPos, 1.0);
    //If it is nan we just yeet it tf out of the screen space. LMAO I love this solution
    float pointScale = pointSize/gl_Position.w;
    pointScale = scalePoints ? pointScale*pow(vValue,scaleIntensity) : pointScale;

    int rePos = gl_VertexID - startID;
    bool isValid = rePos % stride == 0;
    bool secondary = gl_VertexID < (startID + dimWidth*stride) && gl_VertexID > startID;
    isValid = isValid && secondary;
    isValid = isValid && startID != -1; //This is so nothing is selected when pointID is reset to -1.
    highlight = isValid ? 1 : 0;
    

    if (value == 255. || (pointScale*gl_Position.w < 0.75 && scalePoints)){
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    }

    if (vValue < valueRange.x || vValue > valueRange.y){
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    }
    if (showTransect){
        gl_PointSize = isValid ? max(pointScale*5. , pointScale+80./gl_Position.w) : pointScale;
    }
    else{
        gl_PointSize =  pointScale;
    }

}
