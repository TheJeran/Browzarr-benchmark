 // Basic Shader for colors on a plane used in FlatMap with 2D data
precision highp float;
precision highp sampler3D;

out vec4 color;

varying vec2 vUv;

uniform sampler2D data;
uniform sampler2D cmap;
uniform float nanAlpha;
uniform vec3 nanColor;
uniform float cOffset;
uniform float cScale;

void main(){

    float strength = texture2D(data, vUv).r;
    bool isNaN = strength == 1.;
    float sampLoc = isNaN ? strength: (strength - 0.5)*cScale + 0.5;
    sampLoc = isNaN ? strength : min(sampLoc+cOffset,0.995);
    color = isNaN ? vec4(nanColor, nanAlpha) : vec4(texture2D(cmap, vec2(sampLoc, 0.5)).rgb, 1.);

}