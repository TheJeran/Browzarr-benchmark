 // by Jeran Poehls
precision highp float;
precision highp sampler2D;

out vec4 color;

in vec3 aPosition;

uniform sampler2D map;
uniform sampler2D cmap;

uniform float cOffset;
uniform float cScale;
uniform float animateProg;
uniform bool selectTS;
uniform vec2 latBounds;
uniform vec2 lonBounds;
uniform vec3 nanColor;
uniform float nanAlpha;

#define pi 3.141592653

vec2 giveUV(vec3 position){
    vec3 n = normalize(position);
    float latitude = asin(n.y);
    float longitude = atan(n.z, n.x);
    latitude = (latitude - latBounds.x)/(latBounds.y - latBounds.x);
    longitude = (longitude - lonBounds.x)/(lonBounds.y - lonBounds.x);

    return vec2(1.-longitude, latitude);
}

void main(){
    vec2 sampleCoord = giveUV(aPosition);
    float strength = texture(map, sampleCoord).r;
    bool isNaN = strength == 1.;
    strength = isNaN ? strength : (strength - 0.5)*cScale + 0.5;
    strength = isNaN ? strength : min(strength+cOffset,0.99);
    color = isNaN ? vec4(nanColor, nanAlpha) : texture(cmap, vec2(strength, 0.5));
    if (!isNaN){
        color.a = 1.;
    }


}