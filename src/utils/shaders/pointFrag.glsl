out vec4 Color;

varying float vValue;
uniform sampler2D cmap;

void main() {

    vec4 color = texture(cmap, vec2(vValue, 0.5));
    color.a = 1.;

    Color = color;
    
}
