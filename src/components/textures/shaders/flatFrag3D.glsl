//This is for Flat Textures but with 3D textures to sample from i,e; animation

uniform sampler3D data;
uniform sampler2D cmap;

uniform float cOffset;
uniform float cScale;
uniform float animateProg;
uniform float nanAlpha;
uniform vec3 nanColor;

varying vec2 vUv;
out vec4 Color;

void main() {

    float strength = texture(data,vec3(vUv, animateProg)).r;
    bool isNaN = strength == 1.;
    float sampLoc = isNaN ? strength: (strength - 0.5)*cScale + 0.5;
    sampLoc = isNaN ? strength : sampLoc+cOffset;
    Color = isNaN ? vec4(nanColor, nanAlpha) : vec4(texture2D(cmap, vec2(sampLoc, 0.5)).rgb, 1.);

}