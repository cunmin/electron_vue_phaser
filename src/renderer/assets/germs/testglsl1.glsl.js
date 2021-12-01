precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D iChannel1;

varying vec2 fragCoord;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
    vec2 uv = fragCoord.xy / resolution.xy;
    fragColor.rgb = texture2D(iChannel1, uv).rgb;
    fragColor.rgb = smoothstep(0.0, 1.0, fragColor.rgb);
    fragColor.rgb += 0.006 * 0.5 * (rand(uv + time) + rand(uv + vec2(0.1) + time));
    fragColor.rgb = pow(fragColor.rgb, vec3(1.0 / 2.2));
    
    
}

void main(void)
{
    mainImage(gl_FragColor, fragCoord.xy);
}