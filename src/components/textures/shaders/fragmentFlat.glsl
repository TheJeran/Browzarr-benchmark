 // Basic Shader for colors on a plane used in FlatMap with 2D data
precision highp float;
precision highp sampler3D;

out vec4 color;

in vec2 Vuv;

uniform sampler2D map;
uniform sampler2D cmap;



void main(){

    float strength = texture2D(map, Vuv).r;

    color = vec4(strength,0.,0.,1.);

    color.rgb = texture2D(cmap, vec2(strength, 0.5)).rgb;

}