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
uniform float transparency;
uniform float nanAlpha;
uniform vec3 nanColor;


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
    float delta = min(inc.x, min(inc.y, inc.z));
    delta /= steps;
    vec4 accumColor = vec4(0.0);
    float alphaAcc = 0.0;

    for (float t = bounds.x; t < bounds.y; t += delta) {
        p = vOrigin + rayDir * t;
        if (p.x > -flatBounds.x || p.x < -flatBounds.y) { 
            continue;
        }
        if (-p.z > -flatBounds.z || -p.z < -flatBounds.w) {
            continue;
        }
        if (p.y < vertBounds.x || p.y > vertBounds.y) {
            continue;
        }

        vec3 texCoord = p / scale + 0.5;
        texCoord.z = mod(texCoord.z + animateProg, 1.0001);
        float d = sample1(texCoord);

        bool cond = nanAlpha == 0. ? (d > threshold.x) && (d < threshold.y) : (d > threshold.x) && (d < threshold.y+.01); //We skip over nans if the transparency is enabled
        
        if (cond) {
            if (d == 1.){
                accumColor.rgb += (1.0 - alphaAcc) * pow(nanAlpha, 5.) * nanColor.rgb;
                alphaAcc += pow(nanAlpha, 5.);
            }
            else{
                float sampLoc = (d - 0.5)*cScale + 0.5;
                sampLoc = min(sampLoc+cOffset,0.99);
                vec4 col = texture(cmap, vec2(sampLoc, 0.5));
                float alpha = pow(max(sampLoc, 0.001), transparency);
                accumColor.rgb += (1.0 - alphaAcc) * alpha * col.rgb;
                alphaAcc += alpha * (1.0 - alphaAcc);
            }      

            if (alphaAcc >= 1.0) break;
        }
    }

    accumColor.a = alphaAcc; // Set the final accumulated alpha
    color = accumColor;
    if (color.a == 0.0) discard;
}
