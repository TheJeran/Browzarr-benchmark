attribute int value;

out float vValue;

flat out int highlight;

uniform float pointSize;
uniform bool scalePoints;
uniform float scaleIntensity;
uniform vec2 valueRange;
uniform int[10] startIDs;
uniform int stride;
uniform int dimWidth;
uniform bool showTransect;
uniform float timeScale;
uniform float animateProg;
uniform float depthRatio;
uniform vec4 flatBounds;
uniform vec2 vertBounds;
uniform float aspectRatio;
uniform vec3 shape;

bool isValidPoint(){
    for (int i = 0; i < 10; i++){
        if (startIDs[i] == -1){
            return false;
        }
        int rePos = gl_VertexID - startIDs[i];
        bool isValid = rePos % stride == 0;
        bool secondary = gl_VertexID < (startIDs[i] + dimWidth*stride) && gl_VertexID > startIDs[i];
        isValid = isValid && secondary;
        if (isValid){
            return true;
        }
    }
    return false;
}

vec3 computePosition(int vertexID) {
    int depth = int(shape.x);
    int height = int(shape.y);
    int width = int(shape.z);

    int sliceSize = width * height;

    int z = vertexID / sliceSize;
    int y = (vertexID % sliceSize) / width;
    int x = vertexID % width;

    float px = (float(x) / float(width - 1)) - 0.5;
    float py = ((float(y) / float(height - 1)) - 0.5) / aspectRatio;
    float pz = ((float(z) / float(depth - 1)) - 0.5) * depthRatio;

    return vec3(px * 2.0, py * 2.0, pz);
}

void main() {
    vValue = float(value)/255.;
    vec3 scaledPos = computePosition(gl_VertexID);
    gl_PointSize = 10.;

    gl_Position = vec4(0.0, 0.1, 0.1, 1.0);
    // scaledPos.z += depthRatio/2.;
    // scaledPos.z = mod(scaledPos.z + animateProg*depthRatio, depthRatio);
    // scaledPos.z -= depthRatio/2.;

    // scaledPos.z *= timeScale;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(scaledPos, 1.0);
    // float pointScale = pointSize/gl_Position.w;
    // pointScale = scalePoints ? pointScale*pow(vValue,scaleIntensity) : pointScale;

    // bool isValid = isValidPoint();
    // highlight = isValid ? 1 : 0;
    
    // if (value == 255 || (pointScale*gl_Position.w < 0.75 && scalePoints)){ //Hide points that are invisible or get too small when scalled
    //     gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    // }

    // if (vValue < valueRange.x || vValue > valueRange.y){ //Hide points that are outside of value range
    //     gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    // }

    // vec2 scaledZBounds = vec2(flatBounds.z,  flatBounds.w) * vec2(timeScale);
    // bool xCheck = scaledPos.x < flatBounds.x || scaledPos.x > flatBounds.y;
    // bool zCheck = scaledPos.z < scaledZBounds.x || scaledPos.z > scaledZBounds.y;
    // bool yCheck = scaledPos.y < vertBounds.x || scaledPos.y> vertBounds.y;

    // if (xCheck || zCheck || yCheck){ //Hide points that are clipped
    //     gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    // }
    
    // if (showTransect){
    //     gl_PointSize = isValid ? max(pointScale*5. , pointScale+80./gl_Position.w) : pointScale;
    // }
    // else{
    //     gl_PointSize =  pointScale;
    // }

}
