uniform sampler2D data;
uniform sampler2D cmap;

varying vec2 vUv;
out vec4 Color;

void main() {
    vec4 val = texture(data,vUv);
    vec4 color = texture(cmap, vec2(val.x,0.5));
    color.a = 1.;
    Color = color;
}