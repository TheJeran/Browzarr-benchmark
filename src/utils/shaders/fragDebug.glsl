// by Jeran Poehls
precision highp float;
precision highp sampler3D;

// out vec4 color;
// uniform sampler3D map;


// float random(vec3 seed) {
//     return fract(sin(dot(seed, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
// }

// void main() {
//     // Generate pseudo-random 3D texture coordinates in [0, 1]
//     vec3 texCoord = vec3(
//         random(vec3(gl_FragCoord.xy, 0.0)),
//         random(vec3(gl_FragCoord.xy, 1.0)),
//         random(vec3(gl_FragCoord.xy, 2.0))
//     );

//     // Sample the 3D texture
//     float sampleValue = texture(map, texCoord).r;

//     // Output the sampled value as grayscale with full opacity
//     color = vec4(vec3(sampleValue), 1.0);
// }



in vec3 vOrigin;
in vec3 vDirection;

out vec4 color;

uniform sampler3D map;
uniform float steps;
uniform float threshold;
uniform bool flip;

vec2 hitBox(vec3 orig, vec3 dir) {
    // Hardcoded scale: vec3(1.0, 1.0, 1.0)
    vec3 box_min = vec3(-0.5); // -(1.0 * 0.5)
    vec3 box_max = vec3(0.5);  // (1.0 * 0.5)
    vec3 inv_dir = 1.0 / dir;
    vec3 tmin_tmp = (box_min - orig) * inv_dir;
    vec3 tmax_tmp = (box_max - orig) * inv_dir;
    vec3 tmin = min(tmin_tmp, tmax_tmp);
    vec3 tmax = max(tmin_tmp, tmax_tmp);
    float t0 = max(tmin.x, max(tmin.y, tmin.z));
    float t1 = min(tmax.x, min(tmax.y, tmax.z));
    return vec2(t0, t1);
}

float sample1(vec3 p) {
    return texture(map, p).r;
}

#define epsilon 0.0001

void main() {
    vec3 rayDir = normalize(vDirection);
    vec2 bounds = hitBox(vOrigin, rayDir);
    
    if (bounds.x > bounds.y) discard;

    bounds.x = max(bounds.x, 0.0);

    vec3 p = vOrigin + bounds.x * rayDir;
    vec3 inc = 1.0 / abs(rayDir);
    float delta = min(inc.x, min(inc.y, inc.z));
    delta /= steps; 

    vec4 accumColor = vec4(0.0);
    float alphaAcc = 0.0;
    for (float t = bounds.x; t < bounds.y; t += delta) {
        // Hardcoded flatBounds: vec4(0.5, -0.5, 0.5, -0.5)

        // Hardcoded scale: vec3(1.0, 2.0, 1.0)
        float d = sample1(p / 1.0 + 0.5);

        // Hardcoded threshold: 0.1, flip: false
        bool cond = (d > threshold) || (d == 0.0 && threshold == 0.0);
        cond = flip ? !cond : cond;

        if (cond) {
            vec4 col = vec4(d, 0.0, 0.0, 1.0);
            // Hardcoded intensity: 1.0
            float alpha = col.a / 1.0;

            accumColor.rgb += (1.0 - alphaAcc) * alpha * col.rgb;
            alphaAcc += alpha * (1.0 - alphaAcc);

            if (alphaAcc >= 1.0) break;
        }

        p += rayDir * delta;
    }

    accumColor.a = alphaAcc;
    color = accumColor;
    if (color.a == 0.0) discard;
}