//This is for Flat Textures but with 3D textures to sample from i,e; animation

uniform sampler3D data;
uniform sampler2D cmap;

uniform float cOffset;
uniform float cScale;
uniform float animateProg;

varying vec2 vUv;
out vec4 Color;

void main() {
    vec4 val = texture(data,vec3(vUv, animateProg));
    float d = val.x;
    float sampLoc = d == 1. ? d : (d - 0.5)*cScale + 0.5;
    sampLoc = d == 1. ? d : min(sampLoc+cOffset,0.99);
    vec4 color = texture(cmap, vec2(sampLoc,0.5));
    color.a = val.x > 0.999 ? 0. : 1.;

    Color = color;
}