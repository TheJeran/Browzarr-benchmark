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
    strength = strength == 1. ? strength : (strength - 0.5)*cScale + 0.5;
    strength = strength == 1. ? strength : min(strength+cOffset,0.99);
    color = texture(cmap, vec2(strength, 0.5));
    color.a = 1.;
    // color = vec4(sampleCoord, 0., 1.0);

}