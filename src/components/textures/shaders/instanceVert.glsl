 // by Jeran Poehls

uniform vec2 scale;
uniform int ID;

void main() {
    // Apply instance matrix to position
    int newID = gl_InstanceID;
    mat4 scaledInstanceMatrix = instanceMatrix;
    scaledInstanceMatrix[3].xyz *= vec3(scale.x/2.0,scale.y, 1.); // Scale X,Z positions by 2
    scaledInstanceMatrix[3].z += 2.;
    vec4 instancedPosition = scaledInstanceMatrix * vec4(position, 1.0);

    // Transform to world space
    vec4 worldPosition = modelMatrix * instancedPosition;
    
    // Transform to view space
    vec4 viewPosition = viewMatrix * worldPosition;
    
    // Apply projection
    gl_Position = projectionMatrix * viewPosition;
}