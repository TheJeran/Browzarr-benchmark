// by Jeran Poehls
precision highp float;
precision highp sampler3D;

in vec3 vOrigin;
in vec3 vDirection;

out vec4 color;

uniform sampler3D map;
uniform sampler2D cmap;

uniform float cOffset;
uniform float cScale;
uniform vec3 scale;
uniform vec2 threshold;
uniform float steps;
uniform vec4 flatBounds;
uniform vec2 vertBounds;
uniform float animateProg;

vec2 hitBox(vec3 orig, vec3 dir) {
    vec3 box_min = vec3(-(scale * 0.5));
    vec3 box_max = vec3(scale * 0.5);
    vec3 inv_dir = 1.0 / dir;
    vec3 tmin_tmp = (box_min - orig) * inv_dir;
    vec3 tmax_tmp = (box_max - orig) * inv_dir;
    vec3 tmin = min(tmin_tmp, tmax_tmp);
    vec3 tmax = max(tmin_tmp, tmax_tmp);
    float t0 = max(tmin.x, max(tmin.y, tmin.z));
    float t1 = min(tmax.x, min(tmax.y, tmax.z));
    return vec2(t0, t1);
}

float sample1( vec3 p ) {
    return texture( map, p ).r;
}

#define epsilon 0.0001

void main() {
    vec3 rayDir = normalize(vDirection);
    vec2 bounds = hitBox(vOrigin, rayDir);

    if (bounds.x > bounds.y) discard;

    bounds.x = max(bounds.x, 0.0);

    vec3 p = vOrigin + bounds.x * rayDir;
    vec3 inc = 1.0 / abs(rayDir);

    //Step Sizes
    float fineDelta = min(inc.x, min(inc.y, inc.z)) / steps;

    float coarseDelta = min(inc.x, min(inc.y, inc.z))/50.;

    float delta = fineDelta;

    vec4 accumColor = vec4(0.0);
    float alphaAcc = 0.0;

    float t = bounds.x;
    int countdown = 0;
    bool useCoarseStep = false;

    while (t < bounds.y) {
        vec3 p = vOrigin + rayDir * t;
        
        // --- Boundary checks ---
        if (p.x < flatBounds.x || p.x > flatBounds.y ||
            p.z < flatBounds.z || p.z > flatBounds.w ||
            p.y < vertBounds.x || p.y > vertBounds.y) {

            t += useCoarseStep ? coarseDelta : fineDelta;
            continue;
        }

        vec3 texCoord = p / scale + 0.5;
        texCoord.z = mod(texCoord.z + animateProg, 1.0001);
        float d = sample1(texCoord);

        bool cond = (d > threshold.x) && (d < threshold.y);
        
        if (cond) {
            // Hit something interesting - switch to fine stepping
            if (useCoarseStep) {
                useCoarseStep = false;
                countdown = 40;
                // Step back to ensure we don't miss the boundary
                t -= coarseDelta;
                continue;
            }
            float sampLoc = d == 1. ? d : (d - 0.5)*cScale + 0.5;
            sampLoc = d == 1. ? d : min(sampLoc+cOffset,0.99);
            vec4 col = texture(cmap, vec2(sampLoc, 0.5));
            float alpha = float(col.a > 0.);

            accumColor.rgb += (1.0 - alphaAcc) * alpha * col.rgb;
            alphaAcc += alpha * (1.0 - alphaAcc);

            if (alphaAcc >= 1.0) break;
            
            t += fineDelta;
        }
        else {
            // Nothing interesting here
            if (countdown > 0) {
                countdown--;
                t += fineDelta; // Continue with fine steps while countdown > 0
            } else {
                useCoarseStep = true;
                t += coarseDelta; // Switch to coarse steps
            }
        }
    }
    accumColor.a = alphaAcc; // Set the final accumulated alpha
    color = accumColor;
    if (color.a == 0.0) discard;
}
