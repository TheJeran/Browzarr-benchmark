out vec4 Color;

varying float vValue;
uniform sampler2D cmap;

void main() {

    Color = texture(cmap, vec2(vValue, 0.1));
    Color.a = 1.;
    //Color = vec4(vec3(vValue),1.);
    
}