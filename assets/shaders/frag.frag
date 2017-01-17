uniform sampler2D tex;
uniform sampler2D norm;
uniform vec2 res;
uniform vec4 light;
void main() {
    vec2 uv = vec2(gl_FragCoord.xy / res.xy);
    vec4 color = texture2D(tex, uv);
    vec4 normal = texture2D(norm, uv);
    normal.x -= 0.5;
    normal.y -= 0.5;
    
    vec3 NormalVector = normalize(normal.xyz);
    
    //create light
    float ambient = 0.2;
    float radius = 0.5;
    float height = 0.2;
    vec2 light = vec2(light.xy);
    vec2 lightPosition = vec2(light.xy / res.xy);
    vec3 LightVector = vec3(lightPosition.x - uv.x, lightPosition.y - uv.y, height);
    LightVector = normalize(LightVector);
    
    float difuse = 1.5 * max(dot(NormalVector, LightVector), 0.0);
    
    float dist = distance(gl_FragCoord.xy, light.xy);
    float lightSize = res.y * radius;
    float lighting = max(1.0 - (dist / lightSize), ambient);
    gl_FragColor = color * difuse * lighting;
}