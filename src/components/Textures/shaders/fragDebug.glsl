precision highp float;

in vec3 vOrigin;
in vec3 vDirection;

out vec4 color;

// Simple box test function
vec2 hitBox(vec3 orig, vec3 dir) {
    // Define cube size (1x1x1 cube)
    vec3 box_min = vec3(-1., -1., -1.);
    vec3 box_max = vec3(1., 1., 1.);
    
    // Calculate intersection
    vec3 inv_dir = 1.0 / dir;
    vec3 tmin_tmp = (box_min - orig) * inv_dir;
    vec3 tmax_tmp = (box_max - orig) * inv_dir;
    vec3 tmin = min(tmin_tmp, tmax_tmp);
    vec3 tmax = max(tmin_tmp, tmax_tmp);
    
    float t0 = max(tmin.x, max(tmin.y, tmin.z));
    float t1 = min(tmax.x, min(tmax.y, tmax.z));
    
    return vec2(t0, t1);
}

void main() {
    // Normalize ray direction
    vec3 rayDir = normalize(vDirection);
    
    // Calculate intersection with box
    vec2 bounds = hitBox(vOrigin, rayDir);
    
    // If ray misses the box, discard
    if (bounds.x > bounds.y) {
        discard;
    }
    
    // If we hit the box, return black color
    color = vec4(0.0, 0.0, 0.0, 1.0);
}