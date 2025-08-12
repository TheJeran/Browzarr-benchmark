precision highp float;
precision highp sampler3D;

out vec4 color;

in vec3 aPosition;

uniform vec2 xBounds;
uniform vec2 yBounds;
uniform vec3 borderColor;
uniform bool trim;

void main() {

    if ((aPosition.x < xBounds.x || aPosition.x > xBounds.y || aPosition.y < yBounds.x || aPosition.y > yBounds.y) && trim){
        discard;
    }

    color = vec4(borderColor, 1.0);
}