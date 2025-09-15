out vec4 Color;

in float vValue;
flat in int highlight;


uniform sampler2D cmap;
uniform float cScale;
uniform float cOffset;
uniform bool showTransect;

void main() {

    float sampLoc = vValue == 1. ? vValue : (vValue - 0.5)*cScale + 0.5;
    sampLoc = vValue == 1. ? vValue : min(sampLoc+cOffset,0.99);
    vec4 color = texture(cmap, vec2(sampLoc, 0.5));
    color.a = 1.;
    Color = color;
    if (showTransect){
        Color = highlight == 1 ? color : color * vec4(vec3(0.4),1.);
    }
    else{
        Color = color;
    }
    Color = vec4(1.0, 0.0, 0.0, 1.0);
}
