"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[773],{28:(e,t)=>{function n(e,t){var n=e.length;for(e.push(t);0<n;){var r=n-1>>>1,i=e[r];if(0<o(i,t))e[r]=t,e[n]=i,n=r;else break}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;for(var r=0,i=e.length,a=i>>>1;r<a;){var s=2*(r+1)-1,l=e[s],c=s+1,u=e[c];if(0>o(l,n))c<i&&0>o(u,l)?(e[r]=u,e[c]=n,r=c):(e[r]=l,e[s]=n,r=s);else if(c<i&&0>o(u,n))e[r]=u,e[c]=n,r=c;else break}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var a,s=performance;t.unstable_now=function(){return s.now()}}else{var l=Date,c=l.now();t.unstable_now=function(){return l.now()-c}}var u=[],f=[],d=1,p=null,h=3,v=!1,m=!1,g=!1,b="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,w="undefined"!=typeof setImmediate?setImmediate:null;function E(e){for(var t=r(f);null!==t;){if(null===t.callback)i(f);else if(t.startTime<=e)i(f),t.sortIndex=t.expirationTime,n(u,t);else break;t=r(f)}}function x(e){if(g=!1,E(e),!m)if(null!==r(u))m=!0,O();else{var t=r(f);null!==t&&C(x,t.startTime-e)}}var S=!1,_=-1,j=5,M=-1;function A(){return!(t.unstable_now()-M<j)}function P(){if(S){var e=t.unstable_now();M=e;var n=!0;try{e:{m=!1,g&&(g=!1,y(_),_=-1),v=!0;var o=h;try{t:{for(E(e),p=r(u);null!==p&&!(p.expirationTime>e&&A());){var s=p.callback;if("function"==typeof s){p.callback=null,h=p.priorityLevel;var l=s(p.expirationTime<=e);if(e=t.unstable_now(),"function"==typeof l){p.callback=l,E(e),n=!0;break t}p===r(u)&&i(u),E(e)}else i(u);p=r(u)}if(null!==p)n=!0;else{var c=r(f);null!==c&&C(x,c.startTime-e),n=!1}}break e}finally{p=null,h=o,v=!1}}}finally{n?a():S=!1}}}if("function"==typeof w)a=function(){w(P)};else if("undefined"!=typeof MessageChannel){var L=new MessageChannel,T=L.port2;L.port1.onmessage=P,a=function(){T.postMessage(null)}}else a=function(){b(P,0)};function O(){S||(S=!0,a())}function C(e,n){_=b(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||v||(m=!0,O())},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return r(u)},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,i,o){var a=t.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?a+o:a,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=0x3fffffff;break;case 4:s=1e4;break;default:s=5e3}return s=o+s,e={id:d++,callback:i,priorityLevel:e,startTime:o,expirationTime:s,sortIndex:-1},o>a?(e.sortIndex=o,n(f,e),null===r(u)&&e===r(f)&&(g?(y(_),_=-1):g=!0,C(x,o-a))):(e.sortIndex=s,n(u,e),m||v||(m=!0,O())),e},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},840:(e,t,n)=>{var r=n(7776),i=n(6619),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=i.useSyncExternalStore,s=r.useRef,l=r.useEffect,c=r.useMemo,u=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var f=s(null);if(null===f.current){var d={hasValue:!1,value:null};f.current=d}else d=f.current;var p=a(e,(f=c(function(){function e(e){if(!l){if(l=!0,a=e,e=r(e),void 0!==i&&d.hasValue){var t=d.value;if(i(t,e))return s=t}return s=e}if(t=s,o(a,e))return t;var n=r(e);return void 0!==i&&i(t,n)?(a=e,t):(a=e,s=n)}var a,s,l=!1,c=void 0===n?null:n;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,n,r,i]))[0],f[1]);return l(function(){d.hasValue=!0,d.value=p},[p]),u(p),p}},1912:(e,t,n)=>{e.exports=n(3416)},2349:(e,t,n)=>{n.d(t,{n:()=>a});var r=n(7510);let i=new r.NRn,o=new r.Pq0;class a extends r.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new r.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new r.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.LuO(t,6,1);return this.setAttribute("instanceStart",new r.eHs(n,3,0)),this.setAttribute("instanceEnd",new r.eHs(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.LuO(t,6,1);return this.setAttribute("instanceColorStart",new r.eHs(n,3,0)),this.setAttribute("instanceColorEnd",new r.eHs(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new r.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new r.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),i.setFromBufferAttribute(t),this.boundingBox.union(i))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new r.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)o.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(o)),o.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(o));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}},2432:(e,t)=>{t.ConcurrentRoot=1,t.ContinuousEventPriority=8,t.DefaultEventPriority=32,t.DiscreteEventPriority=2},2651:(e,t,n)=>{n.d(t,{Do:()=>o,Fh:()=>p});var r=n(1197),i=n(7510);let o=/\bvoid\s+main\s*\(\s*\)\s*{/g;function a(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let n=r.ShaderChunk[t];return n?a(n):e})}let s=[];for(let e=0;e<256;e++)s[e]=(e<16?"0":"")+e.toString(16);let l=Object.assign||function(){let e=arguments[0];for(let t=1,n=arguments.length;t<n;t++){let n=arguments[t];if(n)for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},c=Date.now(),u=new WeakMap,f=new Map,d=1e10;function p(e,t){let n=function(e){let t=JSON.stringify(e,v),n=g.get(t);return null==n&&g.set(t,n=++m),n}(t),r=u.get(e);if(r||u.set(e,r=Object.create(null)),r[n])return new r[n];let o=`_onBeforeCompile${n}`,b=function(r,i){e.onBeforeCompile.call(this,r,i);let s=this.customProgramCacheKey()+"|"+r.vertexShader+"|"+r.fragmentShader,u=f[s];if(!u){let e=function(e,{vertexShader:t,fragmentShader:n},r,i){let{vertexDefs:o,vertexMainIntro:s,vertexMainOutro:l,vertexTransform:c,fragmentDefs:u,fragmentMainIntro:f,fragmentMainOutro:d,fragmentColorTransform:p,customRewriter:v,timeUniform:m}=r;if(o=o||"",s=s||"",l=l||"",u=u||"",f=f||"",d=d||"",(c||v)&&(t=a(t)),(p||v)&&(n=a(n=n.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),v){let e=v({vertexShader:t,fragmentShader:n});t=e.vertexShader,n=e.fragmentShader}if(p){let e=[];n=n.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),d=`${p}
${e.join("\n")}
${d}`}if(m){let e=`
uniform float ${m};
`;o=e+o,u=e+u}return c&&(t=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${t}
`,o=`${o}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,s=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${s}
`,t=t.replace(/\b(position|normal|uv)\b/g,(e,t,n,r)=>/\battribute\s+vec[23]\s+$/.test(r.substr(0,n))?t:`troika_${t}_${i}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),{vertexShader:t=h(t,i,o,s,l),fragmentShader:n=h(n,i,u,f,d)}}(this,r,t,n);u=f[s]=e}r.vertexShader=u.vertexShader,r.fragmentShader=u.fragmentShader,l(r.uniforms,this.uniforms),t.timeUniform&&(r.uniforms[t.timeUniform]={get value(){return Date.now()-c}}),this[o]&&this[o](r)},y=function(){return w(t.chained?e:e.clone())},w=function(r){let i=Object.create(r,E);return Object.defineProperty(i,"baseMaterial",{value:e}),Object.defineProperty(i,"id",{value:d++}),i.uuid=function(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,n=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0;return(s[255&e]+s[e>>8&255]+s[e>>16&255]+s[e>>24&255]+"-"+s[255&t]+s[t>>8&255]+"-"+s[t>>16&15|64]+s[t>>24&255]+"-"+s[63&n|128]+s[n>>8&255]+"-"+s[n>>16&255]+s[n>>24&255]+s[255&r]+s[r>>8&255]+s[r>>16&255]+s[r>>24&255]).toUpperCase()}(),i.uniforms=l({},r.uniforms,t.uniforms),i.defines=l({},r.defines,t.defines),i.defines[`TROIKA_DERIVED_MATERIAL_${n}`]="",i.extensions=l({},r.extensions,t.extensions),i._listeners=void 0,i},E={constructor:{value:y},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:t=>{e.type=t}},isDerivedFrom:{writable:!0,configurable:!0,value:function(e){let t=this.baseMaterial;return e===t||t.isDerivedMaterial&&t.isDerivedFrom(e)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+n}},onBeforeCompile:{get:()=>b,set(e){this[o]=e}},copy:{writable:!0,configurable:!0,value:function(t){return e.copy.call(this,t),e.isShaderMaterial||e.isDerivedMaterial||(l(this.extensions,t.extensions),l(this.defines,t.defines),l(this.uniforms,i.LlO.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return w(new e.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let n=this._depthMaterial;return n||((n=this._depthMaterial=p(e.isDerivedMaterial?e.getDepthMaterial():new i.CSG({depthPacking:i.N5j}),t)).defines.IS_DEPTH_MATERIAL="",n.uniforms=this.uniforms),n}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let n=this._distanceMaterial;return n||((n=this._distanceMaterial=p(e.isDerivedMaterial?e.getDistanceMaterial():new i.aVO,t)).defines.IS_DISTANCE_MATERIAL="",n.uniforms=this.uniforms),n}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:t,_distanceMaterial:n}=this;t&&t.dispose(),n&&n.dispose(),e.dispose.call(this)}}};return r[n]=y,new y}function h(e,t,n,r,i){return(r||i||n)&&(e=e.replace(o,`
${n}
void troikaOrigMain${t}() {`)+`
void main() {
  ${r}
  troikaOrigMain${t}();
  ${i}
}`),e}function v(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let m=0,g=new Map,b=`
uniform vec3 pointA;
uniform vec3 controlA;
uniform vec3 controlB;
uniform vec3 pointB;
uniform float radius;
varying float bezierT;

vec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  float b0 = t2 * t2 * t2;
  float b1 = 3.0 * t * t2 * t2;
  float b2 = 3.0 * t * t * t2;
  float b3 = t * t * t;
  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;
}

vec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  return -3.0 * p1 * t2 * t2 +
    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +
    c2 * (6.0 * t2 * t - 3.0 * t * t) +
    3.0 * p2 * t * t;
}
`,y=`
float t = position.y;
bezierT = t;
vec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);
vec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));

// Make "sideways" always perpendicular to the camera ray; this ensures that any twists
// in the cylinder occur where you won't see them: 
vec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);
if (bezierDir == viewDirection) {
  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));
}
vec3 sideways = normalize(cross(bezierDir, viewDirection));
vec3 upish = normalize(cross(sideways, bezierDir));

// Build a matrix for transforming this disc in the cylinder:
mat4 discTx;
discTx[0].xyz = sideways * radius;
discTx[1].xyz = bezierDir * radius;
discTx[2].xyz = upish * radius;
discTx[3].xyz = bezierCenterPos;
discTx[3][3] = 1.0;

// Apply transform, ignoring original y
position = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;
normal = normalize(mat3(discTx) * normal);
`,w=`
uniform vec3 dashing;
varying float bezierT;
`,E=`
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`,x=null,S=new i._4j({color:0xffffff,side:i.$EB});class _ extends i.eaF{static getGeometry(){return x||(x=new i.Ho_(1,1,1,6,64).translate(0,.5,0))}constructor(){super(_.getGeometry(),S),this.pointA=new i.Pq0,this.controlA=new i.Pq0,this.controlB=new i.Pq0,this.pointB=new i.Pq0,this.radius=.01,this.dashArray=new i.I9Y,this.dashOffset=0,this.frustumCulled=!1}get material(){let e=this._derivedMaterial,t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=S.clone());return e&&e.baseMaterial===t||(e=this._derivedMaterial=p(t,{chained:!0,uniforms:{pointA:{value:new i.Pq0},controlA:{value:new i.Pq0},controlB:{value:new i.Pq0},pointB:{value:new i.Pq0},radius:{value:.01},dashing:{value:new i.Pq0}},vertexDefs:b,vertexTransform:y,fragmentDefs:w,fragmentMainIntro:E}),t.addEventListener("dispose",function n(){t.removeEventListener("dispose",n),e.dispose()})),e}set material(e){this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}onBeforeRender(){let{uniforms:e}=this.material,{pointA:t,controlA:n,controlB:r,pointB:i,radius:o,dashArray:a,dashOffset:s}=this;e.pointA.value.copy(t),e.controlA.value.copy(n),e.controlB.value.copy(r),e.pointB.value.copy(i),e.radius.value=o,e.dashing.value.set(a.x,a.y,s||0)}raycast(){}}},2657:(e,t,n)=>{e.exports=n(840)},3571:(e,t,n)=>{let r,i;n.d(t,{b:()=>S});var o=n(7510),a=n(2349),s=n(1197);s.UniformsLib.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new o.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},s.ShaderLib.line={uniforms:o.LlO.merge([s.UniformsLib.common,s.UniformsLib.fog,s.UniformsLib.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class l extends o.BKk{constructor(e){super({type:"LineMaterial",uniforms:o.LlO.clone(s.ShaderLib.line.uniforms),vertexShader:s.ShaderLib.line.vertexShader,fragmentShader:s.ShaderLib.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){!0===e!==this.dashed&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(!0===e!==this.alphaToCoverage&&(this.needsUpdate=!0),!0===e?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}let c=new o.IUQ,u=new o.Pq0,f=new o.Pq0,d=new o.IUQ,p=new o.IUQ,h=new o.IUQ,v=new o.Pq0,m=new o.kn4,g=new o.cZY,b=new o.Pq0,y=new o.NRn,w=new o.iyt,E=new o.IUQ;function x(e,t,n){return E.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),E.multiplyScalar(1/E.w),E.x=i/n.width,E.y=i/n.height,E.applyMatrix4(e.projectionMatrixInverse),E.multiplyScalar(1/E.w),Math.abs(Math.max(E.x,E.y))}class S extends o.eaF{constructor(e=new a.n,t=new l({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,o=t.count;e<o;e++,i+=2)u.fromBufferAttribute(t,e),f.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+u.distanceTo(f);let i=new o.LuO(r,2,1);return e.setAttribute("instanceDistanceStart",new o.eHs(i,1,0)),e.setAttribute("instanceDistanceEnd",new o.eHs(i,1,1)),this}raycast(e,t){let n,a,s=this.material.worldUnits,l=e.camera;null!==l||s||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;r=e.ray;let u=this.matrixWorld,f=this.geometry,E=this.material;if(i=E.linewidth+c,null===f.boundingSphere&&f.computeBoundingSphere(),w.copy(f.boundingSphere).applyMatrix4(u),s)n=.5*i;else{let e=Math.max(l.near,w.distanceToPoint(r.origin));n=x(l,e,E.resolution)}if(w.radius+=n,!1!==r.intersectsSphere(w)){if(null===f.boundingBox&&f.computeBoundingBox(),y.copy(f.boundingBox).applyMatrix4(u),s)a=.5*i;else{let e=Math.max(l.near,y.distanceToPoint(r.origin));a=x(l,e,E.resolution)}y.expandByScalar(a),!1!==r.intersectsBox(y)&&(s?function(e,t){let n=e.matrixWorld,a=e.geometry,s=a.attributes.instanceStart,l=a.attributes.instanceEnd,c=Math.min(a.instanceCount,s.count);for(let a=0;a<c;a++){g.start.fromBufferAttribute(s,a),g.end.fromBufferAttribute(l,a),g.applyMatrix4(n);let c=new o.Pq0,u=new o.Pq0;r.distanceSqToSegment(g.start,g.end,u,c),u.distanceTo(c)<.5*i&&t.push({point:u,pointOnLine:c,distance:r.origin.distanceTo(u),object:e,face:null,faceIndex:a,uv:null,uv1:null})}}(this,t):function(e,t,n){let a=t.projectionMatrix,s=e.material.resolution,l=e.matrixWorld,c=e.geometry,u=c.attributes.instanceStart,f=c.attributes.instanceEnd,y=Math.min(c.instanceCount,u.count),w=-t.near;r.at(1,h),h.w=1,h.applyMatrix4(t.matrixWorldInverse),h.applyMatrix4(a),h.multiplyScalar(1/h.w),h.x*=s.x/2,h.y*=s.y/2,h.z=0,v.copy(h),m.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<y;t++){if(d.fromBufferAttribute(u,t),p.fromBufferAttribute(f,t),d.w=1,p.w=1,d.applyMatrix4(m),p.applyMatrix4(m),d.z>w&&p.z>w)continue;if(d.z>w){let e=d.z-p.z,t=(d.z-w)/e;d.lerp(p,t)}else if(p.z>w){let e=p.z-d.z,t=(p.z-w)/e;p.lerp(d,t)}d.applyMatrix4(a),p.applyMatrix4(a),d.multiplyScalar(1/d.w),p.multiplyScalar(1/p.w),d.x*=s.x/2,d.y*=s.y/2,p.x*=s.x/2,p.y*=s.y/2,g.start.copy(d),g.start.z=0,g.end.copy(p),g.end.z=0;let c=g.closestPointToPointParameter(v,!0);g.at(c,b);let h=o.cj9.lerp(d.z,p.z,c),y=h>=-1&&h<=1,E=v.distanceTo(b)<.5*i;if(y&&E){g.start.fromBufferAttribute(u,t),g.end.fromBufferAttribute(f,t),g.start.applyMatrix4(l),g.end.applyMatrix4(l);let i=new o.Pq0,a=new o.Pq0;r.distanceSqToSegment(g.start,g.end,a,i),n.push({point:a,pointOnLine:i,distance:r.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(c),this.material.uniforms.resolution.value.set(c.z,c.w))}}},3738:(e,t,n)=>{n.d(t,{N:()=>m});var r=n(827),i=n(5102),o=n(7776),a=n(7510),s=Object.defineProperty;class l{constructor(){((e,t,n)=>((e,t,n)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n))(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}}var c=Object.defineProperty,u=(e,t,n)=>(((e,t,n)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),n);let f=new a.RlV,d=new a.Zcv,p=Math.cos(Math.PI/180*70),h=(e,t)=>(e%t+t)%t;class v extends l{constructor(e,t){super(),u(this,"object"),u(this,"domElement"),u(this,"enabled",!0),u(this,"target",new a.Pq0),u(this,"minDistance",0),u(this,"maxDistance",1/0),u(this,"minZoom",0),u(this,"maxZoom",1/0),u(this,"minPolarAngle",0),u(this,"maxPolarAngle",Math.PI),u(this,"minAzimuthAngle",-1/0),u(this,"maxAzimuthAngle",1/0),u(this,"enableDamping",!1),u(this,"dampingFactor",.05),u(this,"enableZoom",!0),u(this,"zoomSpeed",1),u(this,"enableRotate",!0),u(this,"rotateSpeed",1),u(this,"enablePan",!0),u(this,"panSpeed",1),u(this,"screenSpacePanning",!0),u(this,"keyPanSpeed",7),u(this,"zoomToCursor",!1),u(this,"autoRotate",!1),u(this,"autoRotateSpeed",2),u(this,"reverseOrbit",!1),u(this,"reverseHorizontalOrbit",!1),u(this,"reverseVerticalOrbit",!1),u(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),u(this,"mouseButtons",{LEFT:a.kBv.ROTATE,MIDDLE:a.kBv.DOLLY,RIGHT:a.kBv.PAN}),u(this,"touches",{ONE:a.wtR.ROTATE,TWO:a.wtR.DOLLY_PAN}),u(this,"target0"),u(this,"position0"),u(this,"zoom0"),u(this,"_domElementKeyEvents",null),u(this,"getPolarAngle"),u(this,"getAzimuthalAngle"),u(this,"setPolarAngle"),u(this,"setAzimuthalAngle"),u(this,"getDistance"),u(this,"getZoomScale"),u(this,"listenToKeyEvents"),u(this,"stopListenToKeyEvents"),u(this,"saveState"),u(this,"reset"),u(this,"update"),u(this,"connect"),u(this,"dispose"),u(this,"dollyIn"),u(this,"dollyOut"),u(this,"getScale"),u(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>v.phi,this.getAzimuthalAngle=()=>v.theta,this.setPolarAngle=e=>{let t=h(e,2*Math.PI),r=v.phi;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),m.phi=t-r,n.update()},this.setAzimuthalAngle=e=>{let t=h(e,2*Math.PI),r=v.theta;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),m.theta=t-r,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(r),n.update(),l=s.NONE},this.update=(()=>{let t=new a.Pq0,i=new a.Pq0(0,1,0),o=new a.PTz().setFromUnitVectors(e.up,i),u=o.clone().invert(),h=new a.Pq0,y=new a.PTz,w=2*Math.PI;return function(){let E=n.object.position;o.setFromUnitVectors(e.up,i),u.copy(o).invert(),t.copy(E).sub(n.target),t.applyQuaternion(o),v.setFromVector3(t),n.autoRotate&&l===s.NONE&&k(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(v.theta+=m.theta*n.dampingFactor,v.phi+=m.phi*n.dampingFactor):(v.theta+=m.theta,v.phi+=m.phi);let x=n.minAzimuthAngle,S=n.maxAzimuthAngle;isFinite(x)&&isFinite(S)&&(x<-Math.PI?x+=w:x>Math.PI&&(x-=w),S<-Math.PI?S+=w:S>Math.PI&&(S-=w),x<=S?v.theta=Math.max(x,Math.min(S,v.theta)):v.theta=v.theta>(x+S)/2?Math.max(x,v.theta):Math.min(S,v.theta)),v.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,v.phi)),v.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(b,n.dampingFactor):n.target.add(b),n.zoomToCursor&&T||n.object.isOrthographicCamera?v.radius=F(v.radius):v.radius=F(v.radius*g),t.setFromSpherical(v),t.applyQuaternion(u),E.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(m.theta*=1-n.dampingFactor,m.phi*=1-n.dampingFactor,b.multiplyScalar(1-n.dampingFactor)):(m.set(0,0,0),b.set(0,0,0));let _=!1;if(n.zoomToCursor&&T){let r=null;if(n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let e=t.length();r=F(e*g);let i=e-r;n.object.position.addScaledVector(P,i),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new a.Pq0(L.x,L.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/g)),n.object.updateProjectionMatrix(),_=!0;let i=new a.Pq0(L.x,L.y,0);i.unproject(n.object),n.object.position.sub(i).add(e),n.object.updateMatrixWorld(),r=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==r&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position):(f.origin.copy(n.object.position),f.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(f.direction))<p?e.lookAt(n.target):(d.setFromNormalAndCoplanarPoint(n.object.up,n.target),f.intersectPlane(d,n.target))))}else n.object instanceof a.qUd&&n.object.isOrthographicCamera&&(_=1!==g)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/g)),n.object.updateProjectionMatrix());return g=1,T=!1,!!(_||h.distanceToSquared(n.object.position)>c||8*(1-y.dot(n.object.quaternion))>c)&&(n.dispatchEvent(r),h.copy(n.object.position),y.copy(n.object.quaternion),_=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",Z),n.domElement.addEventListener("pointercancel",Q),n.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,r,i,o,a;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",Z),null==(r=n.domElement)||r.removeEventListener("pointercancel",Q),null==(i=n.domElement)||i.removeEventListener("wheel",J),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointermove",K),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointerup",Q),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};let n=this,r={type:"change"},i={type:"start"},o={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},l=s.NONE,c=1e-6,v=new a.YHV,m=new a.YHV,g=1,b=new a.Pq0,y=new a.I9Y,w=new a.I9Y,E=new a.I9Y,x=new a.I9Y,S=new a.I9Y,_=new a.I9Y,j=new a.I9Y,M=new a.I9Y,A=new a.I9Y,P=new a.Pq0,L=new a.I9Y,T=!1,O=[],C={};function D(){return Math.pow(.95,n.zoomSpeed)}function k(e){n.reverseOrbit||n.reverseHorizontalOrbit?m.theta+=e:m.theta-=e}function z(e){n.reverseOrbit||n.reverseVerticalOrbit?m.phi+=e:m.phi-=e}let I=(()=>{let e=new a.Pq0;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),b.add(e)}})(),R=(()=>{let e=new a.Pq0;return function(t,r){!0===n.screenSpacePanning?e.setFromMatrixColumn(r,1):(e.setFromMatrixColumn(r,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),b.add(e)}})(),U=(()=>{let e=new a.Pq0;return function(t,r){let i=n.domElement;if(i&&n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let a=e.length();I(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/i.clientHeight,n.object.matrix),R(2*r*a/i.clientHeight,n.object.matrix)}else i&&n.object instanceof a.qUd&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),R(r*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function N(e){n.object instanceof a.ubm&&n.object.isPerspectiveCamera||n.object instanceof a.qUd&&n.object.isOrthographicCamera?g=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(e){if(!n.zoomToCursor||!n.domElement)return;T=!0;let t=n.domElement.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top,o=t.width,a=t.height;L.x=r/o*2-1,L.y=-(i/a*2)+1,P.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function F(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function H(e){y.set(e.clientX,e.clientY)}function q(e){x.set(e.clientX,e.clientY)}function W(){if(1==O.length)y.set(O[0].pageX,O[0].pageY);else{let e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);y.set(e,t)}}function Y(){if(1==O.length)x.set(O[0].pageX,O[0].pageY);else{let e=.5*(O[0].pageX+O[1].pageX),t=.5*(O[0].pageY+O[1].pageY);x.set(e,t)}}function G(){let e=O[0].pageX-O[1].pageX,t=O[0].pageY-O[1].pageY,n=Math.sqrt(e*e+t*t);j.set(0,n)}function V(e){if(1==O.length)w.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);w.set(n,r)}E.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(k(2*Math.PI*E.x/t.clientHeight),z(2*Math.PI*E.y/t.clientHeight)),y.copy(w)}function X(e){if(1==O.length)S.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);S.set(n,r)}_.subVectors(S,x).multiplyScalar(n.panSpeed),U(_.x,_.y),x.copy(S)}function $(e){var t;let r=er(e),i=e.pageX-r.x,o=e.pageY-r.y,a=Math.sqrt(i*i+o*o);M.set(0,a),A.set(0,Math.pow(M.y/j.y,n.zoomSpeed)),t=A.y,N(g/t),j.copy(M)}function Z(e){var t,r,o;!1!==n.enabled&&(0===O.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",K),null==(r=n.domElement)||r.ownerDocument.addEventListener("pointerup",Q)),o=e,O.push(o),"touch"===e.pointerType?function(e){switch(en(e),O.length){case 1:switch(n.touches.ONE){case a.wtR.ROTATE:if(!1===n.enableRotate)return;W(),l=s.TOUCH_ROTATE;break;case a.wtR.PAN:if(!1===n.enablePan)return;Y(),l=s.TOUCH_PAN;break;default:l=s.NONE}break;case 2:switch(n.touches.TWO){case a.wtR.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&G(),n.enablePan&&Y(),l=s.TOUCH_DOLLY_PAN;break;case a.wtR.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&G(),n.enableRotate&&W(),l=s.TOUCH_DOLLY_ROTATE;break;default:l=s.NONE}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(i)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case a.kBv.DOLLY:if(!1===n.enableZoom)return;B(e),j.set(e.clientX,e.clientY),l=s.DOLLY;break;case a.kBv.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;q(e),l=s.PAN}else{if(!1===n.enableRotate)return;H(e),l=s.ROTATE}break;case a.kBv.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;H(e),l=s.ROTATE}else{if(!1===n.enablePan)return;q(e),l=s.PAN}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(i)}(e))}function K(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),l){case s.TOUCH_ROTATE:if(!1===n.enableRotate)return;V(e),n.update();break;case s.TOUCH_PAN:if(!1===n.enablePan)return;X(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&$(e),n.enablePan&&X(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&$(e),n.enableRotate&&V(e),n.update();break;default:l=s.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case s.ROTATE:if(!1===n.enableRotate)return;w.set(e.clientX,e.clientY),E.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(k(2*Math.PI*E.x/t.clientHeight),z(2*Math.PI*E.y/t.clientHeight)),y.copy(w),n.update();break;case s.DOLLY:var r,i;if(!1===n.enableZoom)return;(M.set(e.clientX,e.clientY),A.subVectors(M,j),A.y>0)?(r=D(),N(g/r)):A.y<0&&(i=D(),N(g*i)),j.copy(M),n.update();break;case s.PAN:if(!1===n.enablePan)return;S.set(e.clientX,e.clientY),_.subVectors(S,x).multiplyScalar(n.panSpeed),U(_.x,_.y),x.copy(S),n.update()}}(e))}function Q(e){var t,r,i;(function(e){delete C[e.pointerId];for(let t=0;t<O.length;t++)if(O[t].pointerId==e.pointerId)return void O.splice(t,1)})(e),0===O.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointermove",K),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointerup",Q)),n.dispatchEvent(o),l=s.NONE}function J(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(l===s.NONE||l===s.ROTATE)){var t,r;e.preventDefault(),n.dispatchEvent(i),(B(e),e.deltaY<0)?(t=D(),N(g*t)):e.deltaY>0&&(r=D(),N(g/r)),n.update(),n.dispatchEvent(o)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:U(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:U(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:U(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:U(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=C[e.pointerId];void 0===t&&(t=new a.I9Y,C[e.pointerId]=t),t.set(e.pageX,e.pageY)}function er(e){return C[(e.pointerId===O[0].pointerId?O[1]:O[0]).pointerId]}this.dollyIn=(e=D())=>{N(g*e),n.update()},this.dollyOut=(e=D())=>{N(g/e),n.update()},this.getScale=()=>g,this.setScale=e=>{N(e),n.update()},this.getZoomScale=()=>D(),void 0!==t&&this.connect(t),this.update()}}let m=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:a,enableDamping:s=!0,keyEvents:l=!1,onChange:c,onStart:u,onEnd:f,...d},p)=>{let h=(0,i.C)(e=>e.invalidate),m=(0,i.C)(e=>e.camera),g=(0,i.C)(e=>e.gl),b=(0,i.C)(e=>e.events),y=(0,i.C)(e=>e.setEvents),w=(0,i.C)(e=>e.set),E=(0,i.C)(e=>e.get),x=(0,i.C)(e=>e.performance),S=t||m,_=a||b.connected||g.domElement,j=o.useMemo(()=>new v(S),[S]);return(0,i.D)(()=>{j.enabled&&j.update()},-1),o.useEffect(()=>(l&&j.connect(!0===l?_:l),j.connect(_),()=>void j.dispose()),[l,_,n,j,h]),o.useEffect(()=>{let e=e=>{h(),n&&x.regress(),c&&c(e)},t=e=>{u&&u(e)},r=e=>{f&&f(e)};return j.addEventListener("change",e),j.addEventListener("start",t),j.addEventListener("end",r),()=>{j.removeEventListener("start",t),j.removeEventListener("end",r),j.removeEventListener("change",e)}},[c,u,f,j,h,y]),o.useEffect(()=>{if(e){let e=E().controls;return w({controls:j}),()=>w({controls:e})}},[e,j]),o.createElement("primitive",(0,r.A)({ref:p,object:j,enableDamping:s},d))})},4433:(e,t,n)=>{e.exports=n(2432)},4790:(e,t,n)=>{n.d(t,{A:()=>r});function r(){return function(e){function t(e,t){for(var n,r,i,o,a,s=/([MLQCZ])([^MLQCZ]*)/g;n=s.exec(e);){var l=n[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(e){return parseFloat(e)});switch(n[1]){case"M":o=r=l[0],a=i=l[1];break;case"L":(l[0]!==o||l[1]!==a)&&t("L",o,a,o=l[0],a=l[1]);break;case"Q":t("Q",o,a,o=l[2],a=l[3],l[0],l[1]);break;case"C":t("C",o,a,o=l[4],a=l[5],l[0],l[1],l[2],l[3]);break;case"Z":(o!==r||a!==i)&&t("L",o,a,r,i)}}}function n(e,n,r){void 0===r&&(r=16);var i={x:0,y:0};t(e,function(e,t,o,a,s,l,c,u,f){switch(e){case"L":n(t,o,a,s);break;case"Q":for(var d=t,p=o,h=1;h<r;h++)!function(e,t,n,r,i,o,a,s){var l=1-a;s.x=l*l*e+2*l*a*n+a*a*i,s.y=l*l*t+2*l*a*r+a*a*o}(t,o,l,c,a,s,h/(r-1),i),n(d,p,i.x,i.y),d=i.x,p=i.y;break;case"C":for(var v=t,m=o,g=1;g<r;g++)!function(e,t,n,r,i,o,a,s,l,c){var u=1-l;c.x=u*u*u*e+3*u*u*l*n+3*u*l*l*i+l*l*l*a,c.y=u*u*u*t+3*u*u*l*r+3*u*l*l*o+l*l*l*s}(t,o,l,c,u,f,a,s,g/(r-1),i),n(v,m,i.x,i.y),v=i.x,m=i.y}})}var r="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",i=new WeakMap,o={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function a(e,t){var n=e.getContext?e.getContext("webgl",o):e,r=i.get(n);if(!r){var a="undefined"!=typeof WebGL2RenderingContext&&n instanceof WebGL2RenderingContext,s={},l={},c={},u=-1,f=[];function d(e){var t=s[e];if(!t&&!(t=s[e]=n.getExtension(e)))throw Error(e+" not supported");return t}function p(e,t){var r=n.createShader(t);return n.shaderSource(r,e),n.compileShader(r),r}function h(){s={},l={},c={},u=-1,f.length=0}n.canvas.addEventListener("webglcontextlost",function(e){h(),e.preventDefault()},!1),i.set(n,r={gl:n,isWebGL2:a,getExtension:d,withProgram:function(e,t,r,i){if(!l[e]){var o={},s={},c=n.createProgram();n.attachShader(c,p(t,n.VERTEX_SHADER)),n.attachShader(c,p(r,n.FRAGMENT_SHADER)),n.linkProgram(c),l[e]={program:c,transaction:function(e){n.useProgram(c),e({setUniform:function(e,t){for(var r=[],i=arguments.length-2;i-- >0;)r[i]=arguments[i+2];var o=s[t]||(s[t]=n.getUniformLocation(c,t));n["uniform"+e].apply(n,[o].concat(r))},setAttribute:function(e,t,r,i,s){var l=o[e];l||(l=o[e]={buf:n.createBuffer(),loc:n.getAttribLocation(c,e),data:null}),n.bindBuffer(n.ARRAY_BUFFER,l.buf),n.vertexAttribPointer(l.loc,t,n.FLOAT,!1,0,0),n.enableVertexAttribArray(l.loc),a?n.vertexAttribDivisor(l.loc,i):d("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(l.loc,i),s!==l.data&&(n.bufferData(n.ARRAY_BUFFER,s,r),l.data=s)}})}}}l[e].transaction(i)},withTexture:function(e,t){u++;try{n.activeTexture(n.TEXTURE0+u);var r=c[e];r||(r=c[e]=n.createTexture(),n.bindTexture(n.TEXTURE_2D,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST)),n.bindTexture(n.TEXTURE_2D,r),t(r,u)}finally{u--}},withTextureFramebuffer:function(e,t,r){var i=n.createFramebuffer();f.push(i),n.bindFramebuffer(n.FRAMEBUFFER,i),n.activeTexture(n.TEXTURE0+t),n.bindTexture(n.TEXTURE_2D,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);try{r(i)}finally{n.deleteFramebuffer(i),n.bindFramebuffer(n.FRAMEBUFFER,f[--f.length-1]||null)}},handleContextLoss:h})}t(r)}function s(e,t,n,i,o,s,l,c){void 0===l&&(l=15),void 0===c&&(c=null),a(e,function(e){var a=e.gl,u=e.withProgram;(0,e.withTexture)("copy",function(e,f){a.texImage2D(a.TEXTURE_2D,0,a.RGBA,o,s,0,a.RGBA,a.UNSIGNED_BYTE,t),u("copy",r,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",function(e){var t=e.setUniform;(0,e.setAttribute)("aUV",2,a.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),t("1i","image",f),a.bindFramebuffer(a.FRAMEBUFFER,c||null),a.disable(a.BLEND),a.colorMask(8&l,4&l,2&l,1&l),a.viewport(n,i,o,s),a.scissor(n,i,o,s),a.drawArrays(a.TRIANGLES,0,3)})})})}var l=Object.freeze({__proto__:null,withWebGLContext:a,renderImageData:s,resizeWebGLCanvasWithoutClearing:function(e,t,n){var r=e.width,i=e.height;a(e,function(o){var a=o.gl,l=new Uint8Array(r*i*4);a.readPixels(0,0,r,i,a.RGBA,a.UNSIGNED_BYTE,l),e.width=t,e.height=n,s(a,l,0,0,r,i)})}});function c(e,t,r,i,o,a){void 0===a&&(a=1);var s=new Uint8Array(e*t),l=i[2]-i[0],c=i[3]-i[1],u=[];n(r,function(e,t,n,r){u.push({x1:e,y1:t,x2:n,y2:r,minX:Math.min(e,n),minY:Math.min(t,r),maxX:Math.max(e,n),maxY:Math.max(t,r)})}),u.sort(function(e,t){return e.maxX-t.maxX});for(var f=0;f<e;f++)for(var d=0;d<t;d++){var p=function(e,t){for(var n=1/0,r=1/0,i=u.length;i--;){var o=u[i];if(o.maxX+r<=e)break;if(e+r>o.minX&&t-r<o.maxY&&t+r>o.minY){var a=function(e,t,n,r,i,o){var a=i-n,s=o-r,l=a*a+s*s,c=l?Math.max(0,Math.min(1,((e-n)*a+(t-r)*s)/l)):0,u=e-(n+c*a),f=t-(r+c*s);return u*u+f*f}(e,t,o.x1,o.y1,o.x2,o.y2);a<n&&(r=Math.sqrt(n=a))}}return function(e,t){for(var n=0,r=u.length;r--;){var i=u[r];if(i.maxX<=e)break;i.y1>t!=i.y2>t&&e<(i.x2-i.x1)*(t-i.y1)/(i.y2-i.y1)+i.x1&&(n+=i.y1<i.y2?1:-1)}return 0!==n}(e,t)&&(r=-r),r}(i[0]+l*(f+.5)/e,i[1]+c*(d+.5)/t),h=Math.pow(1-Math.abs(p)/o,a)/2;p<0&&(h=1-h),h=Math.max(0,Math.min(255,Math.round(255*h))),s[d*e+f]=h}return s}function u(e,t,n,r,i,o,a,s,l,c){void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),f(e,t,n,r,i,o,a,null,s,l,c)}function f(e,t,n,r,i,o,a,l,u,f,d){void 0===o&&(o=1),void 0===u&&(u=0),void 0===f&&(f=0),void 0===d&&(d=0);for(var p=c(e,t,n,r,i,o),h=new Uint8Array(4*p.length),v=0;v<p.length;v++)h[4*v+d]=p[v];s(a,h,u,f,e,t,1<<3-d,l)}var d=Object.freeze({__proto__:null,generate:c,generateIntoCanvas:u,generateIntoFramebuffer:f}),p=new Float32Array([0,0,2,0,0,2]),h=null,v=!1,m={},g=new WeakMap;function b(e){if(!v&&!x(e))throw Error("WebGL generation not supported")}function y(e,t,n,r,i,o,s){if(void 0===o&&(o=1),void 0===s&&(s=null),!s&&!(s=h)){var l="function"==typeof OffscreenCanvas?new OffscreenCanvas(1,1):"undefined"!=typeof document?document.createElement("canvas"):null;if(!l)throw Error("OffscreenCanvas or DOM canvas not supported");s=h=l.getContext("webgl",{depth:!1})}b(s);var c=new Uint8Array(e*t*4);a(s,function(a){var s=a.gl,l=a.withTexture,u=a.withTextureFramebuffer;l("readable",function(a,l){s.texImage2D(s.TEXTURE_2D,0,s.RGBA,e,t,0,s.RGBA,s.UNSIGNED_BYTE,null),u(a,l,function(a){E(e,t,n,r,i,o,s,a,0,0,0),s.readPixels(0,0,e,t,s.RGBA,s.UNSIGNED_BYTE,c)})})});for(var u=new Uint8Array(e*t),f=0,d=0;f<c.length;f+=4)u[d++]=c[f];return u}function w(e,t,n,r,i,o,a,s,l,c){void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0),E(e,t,n,r,i,o,a,null,s,l,c)}function E(e,t,i,o,s,l,c,u,f,d,h){void 0===l&&(l=1),void 0===f&&(f=0),void 0===d&&(d=0),void 0===h&&(h=0),b(c);var v=[];n(i,function(e,t,n,r){v.push(e,t,n,r)}),v=new Float32Array(v),a(c,function(n){var i=n.gl,a=n.isWebGL2,c=n.getExtension,m=n.withProgram,g=n.withTexture,b=n.withTextureFramebuffer,y=n.handleContextLoss;if(g("rawDistances",function(n,g){(e!==n._lastWidth||t!==n._lastHeight)&&i.texImage2D(i.TEXTURE_2D,0,i.RGBA,n._lastWidth=e,n._lastHeight=t,0,i.RGBA,i.UNSIGNED_BYTE,null),m("main","precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}","precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",function(r){var u=r.setAttribute,f=r.setUniform,d=!a&&c("ANGLE_instanced_arrays"),h=!a&&c("EXT_blend_minmax");u("aUV",2,i.STATIC_DRAW,0,p),u("aLineSegment",4,i.DYNAMIC_DRAW,1,v),f.apply(void 0,["4f","uGlyphBounds"].concat(o)),f("1f","uMaxDistance",s),f("1f","uExponent",l),b(n,g,function(n){i.enable(i.BLEND),i.colorMask(!0,!0,!0,!0),i.viewport(0,0,e,t),i.scissor(0,0,e,t),i.blendFunc(i.ONE,i.ONE),i.blendEquationSeparate(i.FUNC_ADD,a?i.MAX:h.MAX_EXT),i.clear(i.COLOR_BUFFER_BIT),a?i.drawArraysInstanced(i.TRIANGLES,0,3,v.length/4):d.drawArraysInstancedANGLE(i.TRIANGLES,0,3,v.length/4)})}),m("post",r,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",function(n){n.setAttribute("aUV",2,i.STATIC_DRAW,0,p),n.setUniform("1i","tex",g),i.bindFramebuffer(i.FRAMEBUFFER,u),i.disable(i.BLEND),i.colorMask(0===h,1===h,2===h,3===h),i.viewport(f,d,e,t),i.scissor(f,d,e,t),i.drawArrays(i.TRIANGLES,0,3)})}),i.isContextLost())throw y(),Error("webgl context lost")})}function x(e){var t=e&&e!==h?e.canvas||e:m,n=g.get(t);if(void 0===n){v=!0;var r=null;try{var i=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],o=y(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,e);(n=o&&i.length===o.length&&o.every(function(e,t){return e===i[t]}))||(r="bad trial run results",console.info(i,o))}catch(e){n=!1,r=e.message}r&&console.warn("WebGL SDF generation not supported:",r),v=!1,g.set(t,n)}return n}var S=Object.freeze({__proto__:null,generate:y,generateIntoCanvas:w,generateIntoFramebuffer:E,isSupported:x});return e.forEachPathCommand=t,e.generate=function(e,t,n,r,i,o){void 0===i&&(i=Math.max(r[2]-r[0],r[3]-r[1])/2),void 0===o&&(o=1);try{return y.apply(S,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),c.apply(d,arguments)}},e.generateIntoCanvas=function(e,t,n,r,i,o,a,s,l,c){void 0===i&&(i=Math.max(r[2]-r[0],r[3]-r[1])/2),void 0===o&&(o=1),void 0===s&&(s=0),void 0===l&&(l=0),void 0===c&&(c=0);try{return w.apply(S,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),u.apply(d,arguments)}},e.javascript=d,e.pathToLineSegments=n,e.webgl=S,e.webglUtils=l,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},5010:(e,t,n)=>{n.d(t,{Hl:()=>f});var r=n(5102),i=n(7776),o=n(1197);function a(e,t){let n;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}let s=["x","y","top","bottom","left","right","width","height"];var l=n(8669),c=n(9564);function u({ref:e,children:t,fallback:n,resize:l,style:u,gl:f,events:d=r.f,eventSource:p,eventPrefix:h,shadows:v,linear:m,flat:g,legacy:b,orthographic:y,frameloop:w,dpr:E,performance:x,raycaster:S,camera:_,scene:j,onPointerMissed:M,onCreated:A,...P}){i.useMemo(()=>(0,r.e)(o),[]);let L=(0,r.u)(),[T,O]=function({debounce:e,scroll:t,polyfill:n,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){var o,l,c;let u=n||("undefined"==typeof window?class{}:window.ResizeObserver);if(!u)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[f,d]=(0,i.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),p=(0,i.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:f,orientationHandler:null}),h=e?"number"==typeof e?e:e.scroll:null,v=e?"number"==typeof e?e:e.resize:null,m=(0,i.useRef)(!1);(0,i.useEffect)(()=>(m.current=!0,()=>void(m.current=!1)));let[g,b,y]=(0,i.useMemo)(()=>{let e=()=>{let e,t;if(!p.current.element)return;let{left:n,top:i,width:o,height:a,bottom:l,right:c,x:u,y:f}=p.current.element.getBoundingClientRect(),h={left:n,top:i,width:o,height:a,bottom:l,right:c,x:u,y:f};p.current.element instanceof HTMLElement&&r&&(h.height=p.current.element.offsetHeight,h.width=p.current.element.offsetWidth),Object.freeze(h),m.current&&(e=p.current.lastBounds,t=h,!s.every(n=>e[n]===t[n]))&&d(p.current.lastBounds=h)};return[e,v?a(e,v):e,h?a(e,h):e]},[d,r,h,v]);function w(){p.current.scrollContainers&&(p.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),p.current.scrollContainers=null),p.current.resizeObserver&&(p.current.resizeObserver.disconnect(),p.current.resizeObserver=null),p.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",p.current.orientationHandler))}function E(){p.current.element&&(p.current.resizeObserver=new u(y),p.current.resizeObserver.observe(p.current.element),t&&p.current.scrollContainers&&p.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),p.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",p.current.orientationHandler))}return o=y,l=!!t,(0,i.useEffect)(()=>{if(l)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,l]),c=b,(0,i.useEffect)(()=>(window.addEventListener("resize",c),()=>void window.removeEventListener("resize",c)),[c]),(0,i.useEffect)(()=>{w(),E()},[t,y,b]),(0,i.useEffect)(()=>w,[]),[e=>{e&&e!==p.current.element&&(w(),p.current.element=e,p.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:r,overflowX:i,overflowY:o}=window.getComputedStyle(t);return[r,i,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),E())},f,g]}({scroll:!0,debounce:{scroll:50,resize:0},...l}),C=i.useRef(null),D=i.useRef(null);i.useImperativeHandle(e,()=>C.current);let k=(0,r.a)(M),[z,I]=i.useState(!1),[R,U]=i.useState(!1);if(z)throw z;if(R)throw R;let N=i.useRef(null);(0,r.b)(()=>{let e=C.current;O.width>0&&O.height>0&&e&&(N.current||(N.current=(0,r.c)(e)),async function(){await N.current.configure({gl:f,scene:j,events:d,shadows:v,linear:m,flat:g,legacy:b,orthographic:y,frameloop:w,dpr:E,performance:x,raycaster:S,camera:_,size:O,onPointerMissed:(...e)=>null==k.current?void 0:k.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(p?(0,r.i)(p)?p.current:p:D.current),h&&e.setEvents({compute:(e,t)=>{let n=e[h+"X"],r=e[h+"Y"];t.pointer.set(n/t.size.width*2-1,-(2*(r/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==A||A(e)}}),N.current.render((0,c.jsx)(L,{children:(0,c.jsx)(r.E,{set:U,children:(0,c.jsx)(i.Suspense,{fallback:(0,c.jsx)(r.B,{set:I}),children:null!=t?t:null})})}))}())}),i.useEffect(()=>{let e=C.current;if(e)return()=>(0,r.d)(e)},[]);let B=p?"none":"auto";return(0,c.jsx)("div",{ref:D,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:B,...u},...P,children:(0,c.jsx)("div",{ref:T,style:{width:"100%",height:"100%"},children:(0,c.jsx)("canvas",{ref:C,style:{display:"block"},children:n})})})}function f(e){return(0,c.jsx)(l.Af,{children:(0,c.jsx)(u,{...e})})}n(4433),n(1912),n(7207)},5102:(e,t,n)=>{let r,i,o,a,s;n.d(t,{B:()=>L,C:()=>Q,D:()=>J,E:()=>T,a:()=>A,b:()=>M,c:()=>ex,d:()=>e_,e:()=>es,f:()=>eR,i:()=>_,m:()=>ek,u:()=>P});var l=n(7776),c=n.t(l,2),u=n(4433),f=n(7510),d=n(1197),p=n(2657),h=n(8174);let{useSyncExternalStoreWithSelector:v}=p,m=(e,t)=>{let n=(0,h.y)(e),r=(e,r=t)=>(function(e,t=e=>e,n){let r=v(e.subscribe,e.getState,e.getInitialState,t,n);return l.useDebugValue(r),r})(n,e,r);return Object.assign(r,n),r};var g=n(7812),b=n(1912),y=n.n(b),w=n(7207),E=n(9564),x=n(8669);function S(e){let t=e.root;for(;t.getState().previousRoot;)t=t.getState().previousRoot;return t}n(5866),c.act;let _=e=>e&&e.hasOwnProperty("current"),j=e=>null!=e&&("string"==typeof e||"number"==typeof e||e.isColor),M=((e,t)=>"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative"))()?l.useLayoutEffect:l.useEffect;function A(e){let t=l.useRef(e);return M(()=>void(t.current=e),[e]),t}function P(){let e=(0,x.u5)(),t=(0,x.y3)();return l.useMemo(()=>({children:n})=>{let r=(0,x.Nz)(e,!0,e=>e.type===l.StrictMode)?l.StrictMode:l.Fragment;return(0,E.jsx)(r,{children:(0,E.jsx)(t,{children:n})})},[e,t])}function L({set:e}){return M(()=>(e(new Promise(()=>null)),()=>e(!1)),[e]),null}let T=(e=>((e=class extends l.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),e))();function O(e){var t;let n="undefined"!=typeof window?null!=(t=window.devicePixelRatio)?t:2:1;return Array.isArray(e)?Math.min(Math.max(e[0],n),e[1]):e}function C(e){var t;return null==(t=e.__r3f)?void 0:t.root.getState()}let D={obj:e=>e===Object(e)&&!D.arr(e)&&"function"!=typeof e,fun:e=>"function"==typeof e,str:e=>"string"==typeof e,num:e=>"number"==typeof e,boo:e=>"boolean"==typeof e,und:e=>void 0===e,nul:e=>null===e,arr:e=>Array.isArray(e),equ(e,t,{arrays:n="shallow",objects:r="reference",strict:i=!0}={}){let o;if(typeof e!=typeof t||!!e!=!!t)return!1;if(D.str(e)||D.num(e)||D.boo(e))return e===t;let a=D.obj(e);if(a&&"reference"===r)return e===t;let s=D.arr(e);if(s&&"reference"===n)return e===t;if((s||a)&&e===t)return!0;for(o in e)if(!(o in t))return!1;if(a&&"shallow"===n&&"shallow"===r){for(o in i?t:e)if(!D.equ(e[o],t[o],{strict:i,objects:"reference"}))return!1}else for(o in i?t:e)if(e[o]!==t[o])return!1;if(D.und(o)){if(s&&0===e.length&&0===t.length||a&&0===Object.keys(e).length&&0===Object.keys(t).length)return!0;if(e!==t)return!1}return!0}},k=["children","key","ref"];function z(e,t,n,r){let i=null==e?void 0:e.__r3f;return!i&&(i={root:t,type:n,parent:null,children:[],props:function(e){let t={};for(let n in e)k.includes(n)||(t[n]=e[n]);return t}(r),object:e,eventCount:0,handlers:{},isHidden:!1},e&&(e.__r3f=i)),i}function I(e,t){let n=e[t];if(!t.includes("-"))return{root:e,key:t,target:n};for(let i of(n=e,t.split("-"))){var r;t=i,e=n,n=null==(r=n)?void 0:r[t]}return{root:e,key:t,target:n}}let R=/-\d+$/;function U(e,t){if(D.str(t.props.attach)){if(R.test(t.props.attach)){let n=t.props.attach.replace(R,""),{root:r,key:i}=I(e.object,n);Array.isArray(r[i])||(r[i]=[])}let{root:n,key:r}=I(e.object,t.props.attach);t.previousAttach=n[r],n[r]=t.object}else D.fun(t.props.attach)&&(t.previousAttach=t.props.attach(e.object,t.object))}function N(e,t){if(D.str(t.props.attach)){let{root:n,key:r}=I(e.object,t.props.attach),i=t.previousAttach;void 0===i?delete n[r]:n[r]=i}else null==t.previousAttach||t.previousAttach(e.object,t.object);delete t.previousAttach}let B=[...k,"args","dispose","attach","object","onUpdate","dispose"],F=new Map,H=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],q=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;function W(e,t){var n,r;let i=e.__r3f,o=i&&S(i).getState(),a=null==i?void 0:i.eventCount;for(let n in t){let a=t[n];if(B.includes(n))continue;if(i&&q.test(n)){"function"==typeof a?i.handlers[n]=a:delete i.handlers[n],i.eventCount=Object.keys(i.handlers).length;continue}if(void 0===a)continue;let{root:s,key:l,target:c}=I(e,n);c instanceof f.zgK&&a instanceof f.zgK?c.mask=a.mask:c instanceof f.Q1f&&j(a)?c.set(a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&"function"==typeof c.copy&&null!=a&&a.constructor&&c.constructor===a.constructor?c.copy(a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&Array.isArray(a)?"function"==typeof c.fromArray?c.fromArray(a):c.set(...a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&"number"==typeof a?"function"==typeof c.setScalar?c.setScalar(a):c.set(a):(s[l]=a,o&&!o.linear&&H.includes(l)&&null!=(r=s[l])&&r.isTexture&&s[l].format===f.GWd&&s[l].type===f.OUM&&(s[l].colorSpace=f.er$))}if(null!=i&&i.parent&&null!=o&&o.internal&&null!=(n=i.object)&&n.isObject3D&&a!==i.eventCount){let e=i.object,t=o.internal.interaction.indexOf(e);t>-1&&o.internal.interaction.splice(t,1),i.eventCount&&null!==e.raycast&&o.internal.interaction.push(e)}return i&&void 0===i.props.attach&&(i.object.isBufferGeometry?i.props.attach="geometry":i.object.isMaterial&&(i.props.attach="material")),i&&Y(i),e}function Y(e){var t;if(!e.parent)return;null==e.props.onUpdate||e.props.onUpdate(e.object);let n=null==(t=e.root)||null==t.getState?void 0:t.getState();n&&0===n.internal.frames&&n.invalidate()}let G=e=>null==e?void 0:e.isObject3D;function V(e){return(e.eventObject||e.object).uuid+"/"+e.index+e.instanceId}function X(e,t,n,r){let i=n.get(t);i&&(n.delete(t),0===n.size&&(e.delete(r),i.target.releasePointerCapture(r)))}let $=e=>!!(null!=e&&e.render),Z=l.createContext(null);function K(){let e=l.useContext(Z);if(!e)throw Error("R3F: Hooks can only be used within the Canvas component!");return e}function Q(e=e=>e,t){return K()(e,t)}function J(e,t=0){let n=K(),r=n.getState().internal.subscribe,i=A(e);return M(()=>r(i,t,n),[t,r,n]),null}let ee=new WeakMap;function et(e,t){return function(n,...r){var i;let o;return"function"==typeof n&&(null==n||null==(i=n.prototype)?void 0:i.constructor)===n?(o=ee.get(n))||(o=new n,ee.set(n,o)):o=n,e&&e(o),Promise.all(r.map(e=>new Promise((n,r)=>o.load(e,e=>{G(null==e?void 0:e.scene)&&Object.assign(e,function(e){let t={nodes:{},materials:{},meshes:{}};return e&&e.traverse(e=>{e.name&&(t.nodes[e.name]=e),e.material&&!t.materials[e.material.name]&&(t.materials[e.material.name]=e.material),e.isMesh&&!t.meshes[e.name]&&(t.meshes[e.name]=e)}),t}(e.scene)),n(e)},t,t=>r(Error(`Could not load ${e}: ${null==t?void 0:t.message}`))))))}}function en(e,t,n,r){let i=Array.isArray(t)?t:[t],o=(0,g.DY)(et(n,r),[e,...i],{equal:D.equ});return Array.isArray(t)?o:o[0]}en.preload=function(e,t,n){let r=Array.isArray(t)?t:[t];return(0,g.uv)(et(n),[e,...r])},en.clear=function(e,t){let n=Array.isArray(t)?t:[t];return(0,g.IU)([e,...n])};let er={},ei=/^three(?=[A-Z])/,eo=e=>`${e[0].toUpperCase()}${e.slice(1)}`,ea=0;function es(e){if("function"==typeof e){let t=`${ea++}`;return er[t]=e,t}Object.assign(er,e)}function el(e,t){let n=eo(e),r=er[n];if("primitive"!==e&&!r)throw Error(`R3F: ${n} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if("primitive"===e&&!t.object)throw Error("R3F: Primitives without 'object' are invalid!");if(void 0!==t.args&&!Array.isArray(t.args))throw Error("R3F: The args prop must be an array!")}function ec(e){if(e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?U(e.parent,e):G(e.object)&&!1!==e.props.visible&&(e.object.visible=!0),e.isHidden=!1,Y(e)}}function eu(e,t,n){let r=t.root.getState();if(e.parent||e.object===r.scene){if(!t.object){var i,o;let e=er[eo(t.type)];t.object=null!=(i=t.props.object)?i:new e(...null!=(o=t.props.args)?o:[]),t.object.__r3f=t}if(W(t.object,t.props),t.props.attach)U(e,t);else if(G(t.object)&&G(e.object)){let r=e.object.children.indexOf(null==n?void 0:n.object);if(n&&-1!==r){let n=e.object.children.indexOf(t.object);-1!==n?(e.object.children.splice(n,1),e.object.children.splice(n<r?r-1:r,0,t.object)):(t.object.parent=e.object,e.object.children.splice(r,0,t.object),t.object.dispatchEvent({type:"added"}),e.object.dispatchEvent({type:"childadded",child:t.object}))}else e.object.add(t.object)}for(let e of t.children)eu(t,e);Y(t)}}function ef(e,t){t&&(t.parent=e,e.children.push(t),eu(e,t))}function ed(e,t,n){if(!t||!n)return;t.parent=e;let r=e.children.indexOf(n);-1!==r?e.children.splice(r,0,t):e.children.push(t),eu(e,t,n)}function ep(e){if("function"==typeof e.dispose){let t=()=>{try{e.dispose()}catch{}};"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?t():(0,w.unstable_scheduleCallback)(w.unstable_IdlePriority,t)}}function eh(e,t,n){if(!t)return;t.parent=null;let r=e.children.indexOf(t);-1!==r&&e.children.splice(r,1),t.props.attach?N(e,t):G(t.object)&&G(e.object)&&(e.object.remove(t.object),function(e,t){let{internal:n}=e.getState();n.interaction=n.interaction.filter(e=>e!==t),n.initialHits=n.initialHits.filter(e=>e!==t),n.hovered.forEach((e,r)=>{(e.eventObject===t||e.object===t)&&n.hovered.delete(r)}),n.capturedMap.forEach((e,r)=>{X(n.capturedMap,t,e,r)})}(S(t),t.object));let i=null!==t.props.dispose&&!1!==n;for(let e=t.children.length-1;e>=0;e--){let n=t.children[e];eh(t,n,i)}t.children.length=0,delete t.object.__r3f,i&&"primitive"!==t.type&&"Scene"!==t.object.type&&ep(t.object),void 0===n&&Y(t)}let ev=[],em=()=>{},eg={},eb=0,ey=function(e){let t=y()(e);return t.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:l.version}),t}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(e,t,n){var r;return el(e=eo(e)in er?e:e.replace(ei,""),t),"primitive"===e&&null!=(r=t.object)&&r.__r3f&&delete t.object.__r3f,z(t.object,n,e,t)},removeChild:eh,appendChild:ef,appendInitialChild:ef,insertBefore:ed,appendChildToContainer(e,t){let n=e.getState().scene.__r3f;t&&n&&ef(n,t)},removeChildFromContainer(e,t){let n=e.getState().scene.__r3f;t&&n&&eh(n,t)},insertInContainerBefore(e,t,n){let r=e.getState().scene.__r3f;t&&n&&r&&ed(r,t,n)},getRootHostContext:()=>eg,getChildHostContext:()=>eg,commitUpdate(e,t,n,r,i){var o,a,s;el(t,r);let l=!1;if("primitive"===e.type&&n.object!==r.object||(null==(o=r.args)?void 0:o.length)!==(null==(a=n.args)?void 0:a.length)?l=!0:null!=(s=r.args)&&s.some((e,t)=>{var r;return e!==(null==(r=n.args)?void 0:r[t])})&&(l=!0),l)ev.push([e,{...r},i]);else{let t=function(e,t){let n={};for(let r in t)if(!B.includes(r)&&!D.equ(t[r],e.props[r]))for(let e in n[r]=t[r],t)e.startsWith(`${r}-`)&&(n[e]=t[e]);for(let r in e.props){if(B.includes(r)||t.hasOwnProperty(r))continue;let{root:i,key:o}=I(e.object,r);if(i.constructor&&0===i.constructor.length){let e=function(e){let t=F.get(e.constructor);try{t||(t=new e.constructor,F.set(e.constructor,t))}catch(e){}return t}(i);D.und(e)||(n[o]=e[o])}else n[o]=0}return n}(e,r);Object.keys(t).length&&(Object.assign(e.props,t),W(e.object,t))}(null===i.sibling||(4&i.flags)==0)&&function(){for(let[e]of ev){let t=e.parent;if(t)for(let n of(e.props.attach?N(t,e):G(e.object)&&G(t.object)&&t.object.remove(e.object),e.children))n.props.attach?N(e,n):G(n.object)&&G(e.object)&&e.object.remove(n.object);e.isHidden&&ec(e),e.object.__r3f&&delete e.object.__r3f,"primitive"!==e.type&&ep(e.object)}for(let[r,i,o]of ev){r.props=i;let a=r.parent;if(a){let i=er[eo(r.type)];r.object=null!=(e=r.props.object)?e:new i(...null!=(t=r.props.args)?t:[]),r.object.__r3f=r;var e,t,n=r.object;for(let e of[o,o.alternate])if(null!==e)if("function"==typeof e.ref){null==e.refCleanup||e.refCleanup();let t=e.ref(n);"function"==typeof t&&(e.refCleanup=t)}else e.ref&&(e.ref.current=n);for(let e of(W(r.object,r.props),r.props.attach?U(a,r):G(r.object)&&G(a.object)&&a.object.add(r.object),r.children))e.props.attach?U(r,e):G(e.object)&&G(r.object)&&r.object.add(e.object);Y(r)}}ev.length=0}()},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:e=>null==e?void 0:e.object,prepareForCommit:()=>null,preparePortalMount:e=>z(e.getState().scene,e,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(e){if(!e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?N(e.parent,e):G(e.object)&&(e.object.visible=!1),e.isHidden=!0,Y(e)}},unhideInstance:ec,createTextInstance:em,hideTextInstance:em,unhideTextInstance:em,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:l.createContext(null),setCurrentUpdatePriority(e){eb=e},getCurrentUpdatePriority:()=>eb,resolveUpdatePriority(){var e;if(0!==eb)return eb;switch("undefined"!=typeof window&&(null==(e=window.event)?void 0:e.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return u.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return u.ContinuousEventPriority;default:return u.DefaultEventPriority}},resetFormInstance(){}}),ew=new Map,eE={objects:"shallow",strict:!1};function ex(e){let t,n,r=ew.get(e),i=null==r?void 0:r.fiber,o=null==r?void 0:r.store;r&&console.warn("R3F.createRoot should only be called once!");let a="function"==typeof reportError?reportError:console.error,s=o||((e,t)=>{let n,r,i=(n=(n,r)=>{let i,o=new f.Pq0,a=new f.Pq0,s=new f.Pq0;function c(e=r().camera,t=a,n=r().size){let{width:i,height:l,top:u,left:f}=n,d=i/l;t.isVector3?s.copy(t):s.set(...t);let p=e.getWorldPosition(o).distanceTo(s);if(e&&e.isOrthographicCamera)return{width:i/e.zoom,height:l/e.zoom,top:u,left:f,factor:1,distance:p,aspect:d};{let t=2*Math.tan(e.fov*Math.PI/180/2)*p,n=i/l*t;return{width:n,height:t,top:u,left:f,factor:i/n,distance:p,aspect:d}}}let u=e=>n(t=>({performance:{...t.performance,current:e}})),d=new f.I9Y;return{set:n,get:r,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(t=1)=>e(r(),t),advance:(e,n)=>t(e,n,r()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new f.zD7,pointer:d,mouse:d,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{let e=r();i&&clearTimeout(i),e.performance.current!==e.performance.min&&u(e.performance.min),i=setTimeout(()=>u(r().performance.max),e.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:c},setEvents:e=>n(t=>({...t,events:{...t.events,...e}})),setSize:(e,t,i=0,o=0)=>{let s=r().camera,l={width:e,height:t,top:i,left:o};n(e=>({size:l,viewport:{...e.viewport,...c(s,a,l)}}))},setDpr:e=>n(t=>{let n=O(e);return{viewport:{...t.viewport,dpr:n,initialDpr:t.viewport.initialDpr||n}}}),setFrameloop:(e="always")=>{let t=r().clock;t.stop(),t.elapsedTime=0,"never"!==e&&(t.start(),t.elapsedTime=0),n(()=>({frameloop:e}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:l.createRef(),active:!1,frames:0,priority:0,subscribe:(e,t,n)=>{let i=r().internal;return i.priority=i.priority+ +(t>0),i.subscribers.push({ref:e,priority:t,store:n}),i.subscribers=i.subscribers.sort((e,t)=>e.priority-t.priority),()=>{let n=r().internal;null!=n&&n.subscribers&&(n.priority=n.priority-(t>0),n.subscribers=n.subscribers.filter(t=>t.ref!==e))}}}}})?m(n,r):m,o=i.getState(),a=o.size,s=o.viewport.dpr,c=o.camera;return i.subscribe(()=>{let{camera:e,size:t,viewport:n,gl:r,set:o}=i.getState();if(t.width!==a.width||t.height!==a.height||n.dpr!==s){a=t,s=n.dpr,function(e,t){!e.manual&&(e&&e.isOrthographicCamera?(e.left=-(t.width/2),e.right=t.width/2,e.top=t.height/2,e.bottom=-(t.height/2)):e.aspect=t.width/t.height,e.updateProjectionMatrix())}(e,t),n.dpr>0&&r.setPixelRatio(n.dpr);let i="undefined"!=typeof HTMLCanvasElement&&r.domElement instanceof HTMLCanvasElement;r.setSize(t.width,t.height,i)}e!==c&&(c=e,o(t=>({viewport:{...t.viewport,...t.viewport.getCurrentViewport(e)}})))}),i.subscribe(t=>e(t)),i})(ek,ez),c=i||ey.createContainer(s,u.ConcurrentRoot,null,!1,null,"",a,a,a,null);r||ew.set(e,{fiber:c,store:s});let p=!1,h=null;return{async configure(r={}){var i,o;let a;h=new Promise(e=>a=e);let{gl:l,size:c,scene:u,events:v,onCreated:m,shadows:g=!1,linear:b=!1,flat:y=!1,legacy:w=!1,orthographic:E=!1,frameloop:x="always",dpr:S=[1,2],performance:_,raycaster:j,camera:M,onPointerMissed:A}=r,P=s.getState(),L=P.gl;if(!P.gl){let t={canvas:e,powerPreference:"high-performance",antialias:!0,alpha:!0},n="function"==typeof l?await l(t):l;L=$(n)?n:new d.WebGLRenderer({...t,...l}),P.set({gl:L})}let T=P.raycaster;T||P.set({raycaster:T=new f.tBo});let{params:C,...k}=j||{};if(D.equ(k,T,eE)||W(T,{...k}),D.equ(C,T.params,eE)||W(T,{params:{...T.params,...C}}),!P.camera||P.camera===n&&!D.equ(n,M,eE)){n=M;let e=null==M?void 0:M.isCamera,t=e?M:E?new f.qUd(0,0,0,0,.1,1e3):new f.ubm(75,0,.1,1e3);!e&&(t.position.z=5,M&&(W(t,M),!t.manual&&("aspect"in M||"left"in M||"right"in M||"bottom"in M||"top"in M)&&(t.manual=!0,t.updateProjectionMatrix())),P.camera||null!=M&&M.rotation||t.lookAt(0,0,0)),P.set({camera:t}),T.camera=t}if(!P.scene){let e;null!=u&&u.isScene?z(e=u,s,"",{}):(z(e=new f.Z58,s,"",{}),u&&W(e,u)),P.set({scene:e})}v&&!P.events.handlers&&P.set({events:v(s)});let I=function(e,t){if(!t&&"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement&&e.parentElement){let{width:t,height:n,top:r,left:i}=e.parentElement.getBoundingClientRect();return{width:t,height:n,top:r,left:i}}return!t&&"undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas?{width:e.width,height:e.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...t}}(e,c);if(D.equ(I,P.size,eE)||P.setSize(I.width,I.height,I.top,I.left),S&&P.viewport.dpr!==O(S)&&P.setDpr(S),P.frameloop!==x&&P.setFrameloop(x),P.onPointerMissed||P.set({onPointerMissed:A}),_&&!D.equ(_,P.performance,eE)&&P.set(e=>({performance:{...e.performance,..._}})),!P.xr){let e=(e,t)=>{let n=s.getState();"never"!==n.frameloop&&ez(e,!0,n,t)},t=()=>{let t=s.getState();t.gl.xr.enabled=t.gl.xr.isPresenting,t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting?e:null),t.gl.xr.isPresenting||ek(t)},n={connect(){let e=s.getState().gl;e.xr.addEventListener("sessionstart",t),e.xr.addEventListener("sessionend",t)},disconnect(){let e=s.getState().gl;e.xr.removeEventListener("sessionstart",t),e.xr.removeEventListener("sessionend",t)}};"function"==typeof(null==(i=L.xr)?void 0:i.addEventListener)&&n.connect(),P.set({xr:n})}if(L.shadowMap){let e=L.shadowMap.enabled,t=L.shadowMap.type;if(L.shadowMap.enabled=!!g,D.boo(g))L.shadowMap.type=f.Wk7;else if(D.str(g)){let e={basic:f.bTm,percentage:f.QP0,soft:f.Wk7,variance:f.RyA};L.shadowMap.type=null!=(o=e[g])?o:f.Wk7}else D.obj(g)&&Object.assign(L.shadowMap,g);(e!==L.shadowMap.enabled||t!==L.shadowMap.type)&&(L.shadowMap.needsUpdate=!0)}return f.ppV.enabled=!w,p||(L.outputColorSpace=b?f.Zr2:f.er$,L.toneMapping=y?f.y_p:f.FV),P.legacy!==w&&P.set(()=>({legacy:w})),P.linear!==b&&P.set(()=>({linear:b})),P.flat!==y&&P.set(()=>({flat:y})),!l||D.fun(l)||$(l)||D.equ(l,L,eE)||W(L,l),t=m,p=!0,a(),this},render(n){return p||h||this.configure(),h.then(()=>{ey.updateContainer((0,E.jsx)(eS,{store:s,children:n,onCreated:t,rootElement:e}),c,null,()=>void 0)}),s},unmount(){e_(e)}}}function eS({store:e,children:t,onCreated:n,rootElement:r}){return M(()=>{let t=e.getState();t.set(e=>({internal:{...e.internal,active:!0}})),n&&n(t),e.getState().events.connected||null==t.events.connect||t.events.connect(r)},[]),(0,E.jsx)(Z.Provider,{value:e,children:t})}function e_(e,t){let n=ew.get(e),r=null==n?void 0:n.fiber;if(r){let i=null==n?void 0:n.store.getState();i&&(i.internal.active=!1),ey.updateContainer(null,r,null,()=>{i&&setTimeout(()=>{try{null==i.events.disconnect||i.events.disconnect(),null==(n=i.gl)||null==(r=n.renderLists)||null==r.dispose||r.dispose(),null==(o=i.gl)||null==o.forceContextLoss||o.forceContextLoss(),null!=(a=i.gl)&&a.xr&&i.xr.disconnect();var n,r,o,a,s=i.scene;for(let e in"Scene"!==s.type&&(null==s.dispose||s.dispose()),s){let t=s[e];(null==t?void 0:t.type)!=="Scene"&&(null==t||null==t.dispose||t.dispose())}ew.delete(e),t&&t(e)}catch(e){}},500)})}}let ej=new Set,eM=new Set,eA=new Set;function eP(e,t){if(e.size)for(let{callback:n}of e.values())n(t)}function eL(e,t){switch(e){case"before":return eP(ej,t);case"after":return eP(eM,t);case"tail":return eP(eA,t)}}function eT(e,t,n){let o=t.clock.getDelta();"never"===t.frameloop&&"number"==typeof e&&(o=e-t.clock.elapsedTime,t.clock.oldTime=t.clock.elapsedTime,t.clock.elapsedTime=e),r=t.internal.subscribers;for(let e=0;e<r.length;e++)(i=r[e]).ref.current(i.store.getState(),o,n);return!t.internal.priority&&t.gl.render&&t.gl.render(t.scene,t.camera),t.internal.frames=Math.max(0,t.internal.frames-1),"always"===t.frameloop?1:t.internal.frames}let eO=!1,eC=!1;function eD(e){for(let n of(a=requestAnimationFrame(eD),eO=!0,o=0,eL("before",e),eC=!0,ew.values())){var t;(s=n.store.getState()).internal.active&&("always"===s.frameloop||s.internal.frames>0)&&!(null!=(t=s.gl.xr)&&t.isPresenting)&&(o+=eT(e,s))}if(eC=!1,eL("after",e),0===o)return eL("tail",e),eO=!1,cancelAnimationFrame(a)}function ek(e,t=1){var n;if(!e)return ew.forEach(e=>ek(e.store.getState(),t));(null==(n=e.gl.xr)||!n.isPresenting)&&e.internal.active&&"never"!==e.frameloop&&(t>1?e.internal.frames=Math.min(60,e.internal.frames+t):eC?e.internal.frames=2:e.internal.frames=1,eO||(eO=!0,requestAnimationFrame(eD)))}function ez(e,t=!0,n,r){if(t&&eL("before",e),n)eT(e,n,r);else for(let t of ew.values())eT(e,t.store.getState());t&&eL("after",e)}let eI={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function eR(e){let{handlePointer:t}=function(e){function t(e){return e.filter(e=>["Move","Over","Enter","Out","Leave"].some(t=>{var n;return null==(n=e.__r3f)?void 0:n.handlers["onPointer"+t]}))}function n(t){let{internal:n}=e.getState();for(let e of n.hovered.values())if(!t.length||!t.find(t=>t.object===e.object&&t.index===e.index&&t.instanceId===e.instanceId)){let r=e.eventObject.__r3f;if(n.hovered.delete(V(e)),null!=r&&r.eventCount){let n=r.handlers,i={...e,intersections:t};null==n.onPointerOut||n.onPointerOut(i),null==n.onPointerLeave||n.onPointerLeave(i)}}}function r(e,t){for(let n=0;n<t.length;n++){let r=t[n].__r3f;null==r||null==r.handlers.onPointerMissed||r.handlers.onPointerMissed(e)}}return{handlePointer:function(i){switch(i){case"onPointerLeave":case"onPointerCancel":return()=>n([]);case"onLostPointerCapture":return t=>{let{internal:r}=e.getState();"pointerId"in t&&r.capturedMap.has(t.pointerId)&&requestAnimationFrame(()=>{r.capturedMap.has(t.pointerId)&&(r.capturedMap.delete(t.pointerId),n([]))})}}return function(o){let{onPointerMissed:a,internal:s}=e.getState();s.lastEvent.current=o;let l="onPointerMove"===i,c="onClick"===i||"onContextMenu"===i||"onDoubleClick"===i,u=function(t,n){let r=e.getState(),i=new Set,o=[],a=n?n(r.internal.interaction):r.internal.interaction;for(let e=0;e<a.length;e++){let t=C(a[e]);t&&(t.raycaster.camera=void 0)}r.previousRoot||null==r.events.compute||r.events.compute(t,r);let s=a.flatMap(function(e){let n=C(e);if(!n||!n.events.enabled||null===n.raycaster.camera)return[];if(void 0===n.raycaster.camera){var r;null==n.events.compute||n.events.compute(t,n,null==(r=n.previousRoot)?void 0:r.getState()),void 0===n.raycaster.camera&&(n.raycaster.camera=null)}return n.raycaster.camera?n.raycaster.intersectObject(e,!0):[]}).sort((e,t)=>{let n=C(e.object),r=C(t.object);return n&&r&&r.events.priority-n.events.priority||e.distance-t.distance}).filter(e=>{let t=V(e);return!i.has(t)&&(i.add(t),!0)});for(let e of(r.events.filter&&(s=r.events.filter(s,r)),s)){let t=e.object;for(;t;){var l;null!=(l=t.__r3f)&&l.eventCount&&o.push({...e,eventObject:t}),t=t.parent}}if("pointerId"in t&&r.internal.capturedMap.has(t.pointerId))for(let e of r.internal.capturedMap.get(t.pointerId).values())i.has(V(e.intersection))||o.push(e.intersection);return o}(o,l?t:void 0),d=c?function(t){let{internal:n}=e.getState(),r=t.offsetX-n.initialClick[0],i=t.offsetY-n.initialClick[1];return Math.round(Math.sqrt(r*r+i*i))}(o):0;"onPointerDown"===i&&(s.initialClick=[o.offsetX,o.offsetY],s.initialHits=u.map(e=>e.eventObject)),c&&!u.length&&d<=2&&(r(o,s.interaction),a&&a(o)),l&&n(u),!function(e,t,r,i){if(e.length){let o={stopped:!1};for(let a of e){let s=C(a.object);if(s||a.object.traverseAncestors(e=>{let t=C(e);if(t)return s=t,!1}),s){let{raycaster:l,pointer:c,camera:u,internal:d}=s,p=new f.Pq0(c.x,c.y,0).unproject(u),h=e=>{var t,n;return null!=(t=null==(n=d.capturedMap.get(e))?void 0:n.has(a.eventObject))&&t},v=e=>{let n={intersection:a,target:t.target};d.capturedMap.has(e)?d.capturedMap.get(e).set(a.eventObject,n):d.capturedMap.set(e,new Map([[a.eventObject,n]])),t.target.setPointerCapture(e)},m=e=>{let t=d.capturedMap.get(e);t&&X(d.capturedMap,a.eventObject,t,e)},g={};for(let e in t){let n=t[e];"function"!=typeof n&&(g[e]=n)}let b={...a,...g,pointer:c,intersections:e,stopped:o.stopped,delta:r,unprojectedPoint:p,ray:l.ray,camera:u,stopPropagation(){let r="pointerId"in t&&d.capturedMap.get(t.pointerId);(!r||r.has(a.eventObject))&&(b.stopped=o.stopped=!0,d.hovered.size&&Array.from(d.hovered.values()).find(e=>e.eventObject===a.eventObject)&&n([...e.slice(0,e.indexOf(a)),a]))},target:{hasPointerCapture:h,setPointerCapture:v,releasePointerCapture:m},currentTarget:{hasPointerCapture:h,setPointerCapture:v,releasePointerCapture:m},nativeEvent:t};if(i(b),!0===o.stopped)break}}}}(u,o,d,function(e){let t=e.eventObject,n=t.__r3f;if(!(null!=n&&n.eventCount))return;let a=n.handlers;if(l){if(a.onPointerOver||a.onPointerEnter||a.onPointerOut||a.onPointerLeave){let t=V(e),n=s.hovered.get(t);n?n.stopped&&e.stopPropagation():(s.hovered.set(t,e),null==a.onPointerOver||a.onPointerOver(e),null==a.onPointerEnter||a.onPointerEnter(e))}null==a.onPointerMove||a.onPointerMove(e)}else{let n=a[i];n?(!c||s.initialHits.includes(t))&&(r(o,s.interaction.filter(e=>!s.initialHits.includes(e))),n(e)):c&&s.initialHits.includes(t)&&r(o,s.interaction.filter(e=>!s.initialHits.includes(e)))}})}}}}(e);return{priority:1,enabled:!0,compute(e,t,n){t.pointer.set(e.offsetX/t.size.width*2-1,-(2*(e.offsetY/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)},connected:void 0,handlers:Object.keys(eI).reduce((e,n)=>({...e,[n]:t(n)}),{}),update:()=>{var t;let{events:n,internal:r}=e.getState();null!=(t=r.lastEvent)&&t.current&&n.handlers&&n.handlers.onPointerMove(r.lastEvent.current)},connect:t=>{let{set:n,events:r}=e.getState();if(null==r.disconnect||r.disconnect(),n(e=>({events:{...e.events,connected:t}})),r.handlers)for(let e in r.handlers){let n=r.handlers[e],[i,o]=eI[e];t.addEventListener(i,n,{passive:o})}},disconnect:()=>{let{set:t,events:n}=e.getState();if(n.connected){if(n.handlers)for(let e in n.handlers){let t=n.handlers[e],[r]=eI[e];n.connected.removeEventListener(r,t)}t(e=>({events:{...e.events,connected:void 0}}))}}}}},6350:(e,t,n)=>{n.d(t,{E:()=>l});var r=n(827),i=n(7776),o=n(6625),a=n(5102),s=n(7812);let l=i.forwardRef(({sdfGlyphSize:e=64,anchorX:t="center",anchorY:n="middle",font:l,fontSize:c=1,children:u,characters:f,onSync:d,...p},h)=>{let v=(0,a.C)(({invalidate:e})=>e),[m]=i.useState(()=>new o.EY),[g,b]=i.useMemo(()=>{let e=[],t="";return i.Children.forEach(u,n=>{"string"==typeof n||"number"==typeof n?t+=n:e.push(n)}),[e,t]},[u]);return(0,s.DY)(()=>new Promise(e=>(0,o.PY)({font:l,characters:f},e)),["troika-text",l,f]),i.useLayoutEffect(()=>void m.sync(()=>{v(),d&&d(m)})),i.useEffect(()=>()=>m.dispose(),[m]),i.createElement("primitive",(0,r.A)({object:m,ref:h,font:l,text:b,anchorX:t,anchorY:n,fontSize:c,sdfGlyphSize:e},p),g)})},7207:(e,t,n)=>{e.exports=n(28)},7812:(e,t,n)=>{n.d(t,{DY:()=>a,IU:()=>l,uv:()=>s});let r=[];function i(e,t,n=(e,t)=>e===t){if(e===t)return!0;if(!e||!t)return!1;let r=e.length;if(t.length!==r)return!1;for(let i=0;i<r;i++)if(!n(e[i],t[i]))return!1;return!0}function o(e,t=null,n=!1,a={}){for(let o of(null===t&&(t=[e]),r))if(i(t,o.keys,o.equal)){if(n)return;if(Object.prototype.hasOwnProperty.call(o,"error"))throw o.error;if(Object.prototype.hasOwnProperty.call(o,"response"))return a.lifespan&&a.lifespan>0&&(o.timeout&&clearTimeout(o.timeout),o.timeout=setTimeout(o.remove,a.lifespan)),o.response;if(!n)throw o.promise}let s={keys:t,equal:a.equal,remove:()=>{let e=r.indexOf(s);-1!==e&&r.splice(e,1)},promise:("object"==typeof e&&"function"==typeof e.then?e:e(...t)).then(e=>{s.response=e,a.lifespan&&a.lifespan>0&&(s.timeout=setTimeout(s.remove,a.lifespan))}).catch(e=>s.error=e)};if(r.push(s),!n)throw s.promise}let a=(e,t,n)=>o(e,t,!1,n),s=(e,t,n)=>void o(e,t,!0,n),l=e=>{if(void 0===e||0===e.length)r.splice(0,r.length);else{let t=r.find(t=>i(e,t.keys,t.equal));t&&t.remove()}}},8669:(e,t,n)=>{n.d(t,{Af:()=>s,Nz:()=>i,u5:()=>l,y3:()=>f});var r=n(7776);function i(e,t,n){if(!e)return;if(!0===n(e))return e;let r=t?e.return:e.child;for(;r;){let e=i(r,t,n);if(e)return e;r=t?null:r.sibling}}function o(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}(()=>{var e,t;return"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative")})()?r.useLayoutEffect:r.useEffect;let a=o(r.createContext(null));class s extends r.Component{render(){return r.createElement(a.Provider,{value:this._reactInternals},this.props.children)}}function l(){let e=r.useContext(a);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=r.useId();return r.useMemo(()=>{for(let n of[e,null==e?void 0:e.alternate]){if(!n)continue;let e=i(n,!1,e=>{let n=e.memoizedState;for(;n;){if(n.memoizedState===t)return!0;n=n.next}});if(e)return e}},[e,t])}let c=Symbol.for("react.context"),u=e=>null!==e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===c;function f(){let e=function(){let e=l(),[t]=r.useState(()=>new Map);t.clear();let n=e;for(;n;){let e=n.type;u(e)&&e!==a&&!t.has(e)&&t.set(e,r.use(o(e))),n=n.return}return t}();return r.useMemo(()=>Array.from(e.keys()).reduce((t,n)=>i=>r.createElement(t,null,r.createElement(n.Provider,{...i,value:e.get(n)})),e=>r.createElement(s,{...e})),[e])}},8838:(e,t,n)=>{n.d(t,{A:()=>r});let r=function(){return function(e){var t,n,r,i,o={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},a={},s={};a.L=1,s[1]="L",Object.keys(o).forEach(function(e,t){a[e]=1<<t+1,s[a[e]]=e}),Object.freeze(a);var l=a.LRI|a.RLI|a.FSI,c=a.L|a.R|a.AL,u=a.B|a.S|a.WS|a.ON|a.FSI|a.LRI|a.RLI|a.PDI,f=a.BN|a.RLE|a.LRE|a.RLO|a.LRO|a.PDF,d=a.S|a.WS|a.B|l|a.PDI|f,p=null;function h(e){if(!p){p=new Map;var t=function(e){if(o.hasOwnProperty(e)){var t=0;o[e].split(",").forEach(function(n){var r=n.split("+"),i=r[0],o=r[1];i=parseInt(i,36),o=o?parseInt(o,36):0,p.set(t+=i,a[e]);for(var s=0;s<o;s++)p.set(++t,a[e])})}};for(var n in o)t(n)}return p.get(e.codePointAt(0))||a.L}function v(e,t){var n,r=0,i=new Map,o=t&&new Map;return e.split(",").forEach(function e(a){if(-1!==a.indexOf("+"))for(var s=+a;s--;)e(n);else{n=a;var l=a.split(">"),c=l[0],u=l[1];c=String.fromCodePoint(r+=parseInt(c,36)),u=String.fromCodePoint(r+=parseInt(u,36)),i.set(c,u),t&&o.set(u,c)}}),{map:i,reverseMap:o}}function m(){if(!t){var e=v("14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",!0),i=e.map,o=e.reverseMap;t=i,n=o,r=v("6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye",!1).map}}function g(e){return m(),t.get(e)||null}function b(e){return m(),n.get(e)||null}function y(e){return m(),r.get(e)||null}var w=a.L,E=a.R,x=a.EN,S=a.ES,_=a.ET,j=a.AN,M=a.CS,A=a.B,P=a.S,L=a.ON,T=a.BN,O=a.NSM,C=a.AL,D=a.LRO,k=a.RLO,z=a.LRE,I=a.RLE,R=a.PDF,U=a.LRI,N=a.RLI,B=a.FSI,F=a.PDI;function H(e){if(!i){var t=v("14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",!0),n=t.map;t.reverseMap.forEach(function(e,t){n.set(t,e)}),i=n}return i.get(e)||null}function q(e,t,n,r){var i=e.length;n=Math.max(0,null==n?0:+n),r=Math.min(i-1,null==r?i-1:+r);var o=[];return t.paragraphs.forEach(function(i){var a=Math.max(n,i.start),s=Math.min(r,i.end);if(a<s){for(var l=t.levels.slice(a,s+1),c=s;c>=a&&h(e[c])&d;c--)l[c]=i.level;for(var u=i.level,f=1/0,p=0;p<l.length;p++){var v=l[p];v>u&&(u=v),v<f&&(f=1|v)}for(var m=u;m>=f;m--)for(var g=0;g<l.length;g++)if(l[g]>=m){for(var b=g;g+1<l.length&&l[g+1]>=m;)g++;g>b&&o.push([b+a,g+a])}}}),o}function W(e,t,n,r){for(var i=q(e,t,n,r),o=[],a=0;a<e.length;a++)o[a]=a;return i.forEach(function(e){for(var t=e[0],n=e[1],r=o.slice(t,n+1),i=r.length;i--;)o[n-i]=r[i]}),o}return e.closingToOpeningBracket=b,e.getBidiCharType=h,e.getBidiCharTypeName=function(e){return s[h(e)]},e.getCanonicalBracket=y,e.getEmbeddingLevels=function(e,t){for(var n=new Uint32Array(e.length),r=0;r<e.length;r++)n[r]=h(e[r]);var i=new Map;function o(e,t){var r=n[e];n[e]=t,i.set(r,i.get(r)-1),r&u&&i.set(u,i.get(u)-1),i.set(t,(i.get(t)||0)+1),t&u&&i.set(u,(i.get(u)||0)+1)}for(var a=new Uint8Array(e.length),s=new Map,p=[],v=null,m=0;m<e.length;m++)v||p.push(v={start:m,end:e.length-1,level:"rtl"===t?1:"ltr"===t?0:tT(m,!1)}),n[m]&A&&(v.end=m,v=null);for(var H=I|z|k|D|l|F|R|A,q=function(e){return e+(1&e?1:2)},W=function(e){return e+(1&e?2:1)},Y=0;Y<p.length;Y++){var G=[{_level:(v=p[Y]).level,_override:0,_isolate:0}],V=void 0,X=0,$=0,Z=0;i.clear();for(var K=v.start;K<=v.end;K++){var Q=n[K];if(V=G[G.length-1],i.set(Q,(i.get(Q)||0)+1),Q&u&&i.set(u,(i.get(u)||0)+1),Q&H)if(Q&(I|z)){a[K]=V._level;var J=(Q===I?W:q)(V._level);!(J<=125)||X||$?!X&&$++:G.push({_level:J,_override:0,_isolate:0})}else if(Q&(k|D)){a[K]=V._level;var ee=(Q===k?W:q)(V._level);!(ee<=125)||X||$?!X&&$++:G.push({_level:ee,_override:Q&k?E:w,_isolate:0})}else if(Q&l){Q&B&&(Q=1===tT(K+1,!0)?N:U),a[K]=V._level,V._override&&o(K,V._override);var et=(Q===N?W:q)(V._level);et<=125&&0===X&&0===$?(Z++,G.push({_level:et,_override:0,_isolate:1,_isolInitIndex:K})):X++}else if(Q&F){if(X>0)X--;else if(Z>0){for($=0;!G[G.length-1]._isolate;)G.pop();var en=G[G.length-1]._isolInitIndex;null!=en&&(s.set(en,K),s.set(K,en)),G.pop(),Z--}V=G[G.length-1],a[K]=V._level,V._override&&o(K,V._override)}else Q&R?(0===X&&($>0?$--:!V._isolate&&G.length>1&&(G.pop(),V=G[G.length-1])),a[K]=V._level):Q&A&&(a[K]=v.level);else a[K]=V._level,V._override&&Q!==T&&o(K,V._override)}for(var er=[],ei=null,eo=v.start;eo<=v.end;eo++){var ea=n[eo];if(!(ea&f)){var es=a[eo],el=ea&l,ec=ea===F;ei&&es===ei._level?(ei._end=eo,ei._endsWithIsolInit=el):er.push(ei={_start:eo,_end:eo,_level:es,_startsWithPDI:ec,_endsWithIsolInit:el})}}for(var eu=[],ef=0;ef<er.length;ef++){var ed=er[ef];if(!ed._startsWithPDI||ed._startsWithPDI&&!s.has(ed._start)){for(var ep=[ei=ed],eh=void 0;ei&&ei._endsWithIsolInit&&null!=(eh=s.get(ei._end));)for(var ev=ef+1;ev<er.length;ev++)if(er[ev]._start===eh){ep.push(ei=er[ev]);break}for(var em=[],eg=0;eg<ep.length;eg++)for(var eb=ep[eg],ey=eb._start;ey<=eb._end;ey++)em.push(ey);for(var ew=a[em[0]],eE=v.level,ex=em[0]-1;ex>=0;ex--)if(!(n[ex]&f)){eE=a[ex];break}var eS=em[em.length-1],e_=a[eS],ej=v.level;if(!(n[eS]&l)){for(var eM=eS+1;eM<=v.end;eM++)if(!(n[eM]&f)){ej=a[eM];break}}eu.push({_seqIndices:em,_sosType:Math.max(eE,ew)%2?E:w,_eosType:Math.max(ej,e_)%2?E:w})}}for(var eA=0;eA<eu.length;eA++){var eP=eu[eA],eL=eP._seqIndices,eT=eP._sosType,eO=eP._eosType,eC=1&a[eL[0]]?E:w;if(i.get(O))for(var eD=0;eD<eL.length;eD++){var ek=eL[eD];if(n[ek]&O){for(var ez=eT,eI=eD-1;eI>=0;eI--)if(!(n[eL[eI]]&f)){ez=n[eL[eI]];break}o(ek,ez&(l|F)?L:ez)}}if(i.get(x))for(var eR=0;eR<eL.length;eR++){var eU=eL[eR];if(n[eU]&x)for(var eN=eR-1;eN>=-1;eN--){var eB=-1===eN?eT:n[eL[eN]];if(eB&c){eB===C&&o(eU,j);break}}}if(i.get(C))for(var eF=0;eF<eL.length;eF++){var eH=eL[eF];n[eH]&C&&o(eH,E)}if(i.get(S)||i.get(M))for(var eq=1;eq<eL.length-1;eq++){var eW=eL[eq];if(n[eW]&(S|M)){for(var eY=0,eG=0,eV=eq-1;eV>=0&&(eY=n[eL[eV]])&f;eV--);for(var eX=eq+1;eX<eL.length&&(eG=n[eL[eX]])&f;eX++);eY===eG&&(n[eW]===S?eY===x:eY&(x|j))&&o(eW,eY)}}if(i.get(x)){for(var e$=0;e$<eL.length;e$++)if(n[eL[e$]]&x){for(var eZ=e$-1;eZ>=0&&n[eL[eZ]]&(_|f);eZ--)o(eL[eZ],x);for(e$++;e$<eL.length&&n[eL[e$]]&(_|f|x);e$++)n[eL[e$]]!==x&&o(eL[e$],x)}}if(i.get(_)||i.get(S)||i.get(M))for(var eK=0;eK<eL.length;eK++){var eQ=eL[eK];if(n[eQ]&(_|S|M)){o(eQ,L);for(var eJ=eK-1;eJ>=0&&n[eL[eJ]]&f;eJ--)o(eL[eJ],L);for(var e1=eK+1;e1<eL.length&&n[eL[e1]]&f;e1++)o(eL[e1],L)}}if(i.get(x))for(var e0=0,e2=eT;e0<eL.length;e0++){var e3=eL[e0],e4=n[e3];e4&x?e2===w&&o(e3,w):e4&c&&(e2=e4)}if(i.get(u)){for(var e5=E|x|j,e6=e5|w,e7=[],e9=[],e8=0;e8<eL.length;e8++)if(n[eL[e8]]&u){var te=e[eL[e8]],tt=void 0;if(null!==g(te))if(e9.length<63)e9.push({char:te,seqIndex:e8});else break;else if(null!==(tt=b(te)))for(var tn=e9.length-1;tn>=0;tn--){var tr=e9[tn].char;if(tr===tt||tr===b(y(te))||g(y(tr))===te){e7.push([e9[tn].seqIndex,e8]),e9.length=tn;break}}}e7.sort(function(e,t){return e[0]-t[0]});for(var ti=0;ti<e7.length;ti++){for(var to=e7[ti],ta=to[0],ts=to[1],tl=!1,tc=0,tu=ta+1;tu<ts;tu++){var tf=eL[tu];if(n[tf]&e6){tl=!0;var td=n[tf]&e5?E:w;if(td===eC){tc=td;break}}}if(tl&&!tc){tc=eT;for(var tp=ta-1;tp>=0;tp--){var th=eL[tp];if(n[th]&e6){var tv=n[th]&e5?E:w;tc=tv!==eC?tv:eC;break}}}if(tc){if(n[eL[ta]]=n[eL[ts]]=tc,tc!==eC){for(var tm=ta+1;tm<eL.length;tm++)if(!(n[eL[tm]]&f)){h(e[eL[tm]])&O&&(n[eL[tm]]=tc);break}}if(tc!==eC){for(var tg=ts+1;tg<eL.length;tg++)if(!(n[eL[tg]]&f)){h(e[eL[tg]])&O&&(n[eL[tg]]=tc);break}}}}for(var tb=0;tb<eL.length;tb++)if(n[eL[tb]]&u){for(var ty=tb,tw=tb,tE=eT,tx=tb-1;tx>=0;tx--)if(n[eL[tx]]&f)ty=tx;else{tE=n[eL[tx]]&e5?E:w;break}for(var tS=eO,t_=tb+1;t_<eL.length;t_++)if(n[eL[t_]]&(u|f))tw=t_;else{tS=n[eL[t_]]&e5?E:w;break}for(var tj=ty;tj<=tw;tj++)n[eL[tj]]=tE===tS?tE:eC;tb=tw}}}for(var tM=v.start;tM<=v.end;tM++){var tA=a[tM],tP=n[tM];if(1&tA?tP&(w|x|j)&&a[tM]++:tP&E?a[tM]++:tP&(j|x)&&(a[tM]+=2),tP&f&&(a[tM]=0===tM?v.level:a[tM-1]),tM===v.end||h(e[tM])&(P|A))for(var tL=tM;tL>=0&&h(e[tL])&d;tL--)a[tL]=v.level}}return{levels:a,paragraphs:p};function tT(t,r){for(var i=t;i<e.length;i++){var o=n[i];if(o&(E|C))return 1;if(o&(A|w)||r&&o===F)break;if(o&l){var a=function(t){for(var r=1,i=t+1;i<e.length;i++){var o=n[i];if(o&A)break;if(o&F){if(0==--r)return i}else o&l&&r++}return -1}(i);i=-1===a?e.length:a}}return 0}},e.getMirroredCharacter=H,e.getMirroredCharactersMap=function(e,t,n,r){var i=e.length;n=Math.max(0,null==n?0:+n),r=Math.min(i-1,null==r?i-1:+r);for(var o=new Map,a=n;a<=r;a++)if(1&t[a]){var s=H(e[a]);null!==s&&o.set(a,s)}return o},e.getReorderSegments=q,e.getReorderedIndices=W,e.getReorderedString=function(e,t,n,r){var i=W(e,t,n,r),o=[].concat(e);return i.forEach(function(n,r){o[r]=(1&t.levels[n]?H(e[n]):null)||e[n]}),o.join("")},e.openingToClosingBracket=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},8914:(e,t,n)=>{function r(){var e=Object.create(null);function t(e,t){var n=void 0;self.troikaDefine=function(e){return n=e};var r=URL.createObjectURL(new Blob(["/** "+e.replace(/\*/g,"")+" **/\n\ntroikaDefine(\n"+t+"\n)"],{type:"application/javascript"}));try{importScripts(r)}catch(e){console.error(e)}return URL.revokeObjectURL(r),delete self.troikaDefine,n}self.addEventListener("message",function(n){var r=n.data,i=r.messageId,o=r.action,a=r.data;try{"registerModule"===o&&function n(r,i){var o=r.id,a=r.name,s=r.dependencies;void 0===s&&(s=[]);var l=r.init;void 0===l&&(l=function(){});var c=r.getTransferables;if(void 0===c&&(c=null),!e[o])try{s=s.map(function(t){return t&&t.isWorkerModule&&(n(t,function(e){if(e instanceof Error)throw e}),t=e[t.id].value),t}),l=t("<"+a+">.init",l),c&&(c=t("<"+a+">.getTransferables",c));var u=null;"function"==typeof l?u=l.apply(void 0,s):console.error("worker module init function failed to rehydrate"),e[o]={id:o,value:u,getTransferables:c},i(u)}catch(e){e&&e.noLog||console.error(e),i(e)}}(a,function(e){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:{isCallable:"function"==typeof e}})}),"callModule"===o&&function(t,n){var r,i=t.id,o=t.args;e[i]&&"function"==typeof e[i].value||n(Error("Worker module "+i+": not found or its 'init' did not return a function"));try{var a=(r=e[i]).value.apply(r,o);a&&"function"==typeof a.then?a.then(s,function(e){return n(e instanceof Error?e:Error(""+e))}):s(a)}catch(e){n(e)}function s(t){try{var r=e[i].getTransferables&&e[i].getTransferables(t);r&&Array.isArray(r)&&r.length||(r=void 0),n(t,r)}catch(e){console.error(e),n(e)}}}(a,function(e,t){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:i,success:!1,error:e.stack})}})}n.d(t,{Qw:()=>f,kl:()=>function e(t){if((!t||"function"!=typeof t.init)&&!s)throw Error("requires `options.init` function");var n,r=t.dependencies,a=t.init,l=t.getTransferables,u=t.workerId,f=((n=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return n._getInitResult().then(function(t){if("function"==typeof t)return t.apply(void 0,e);throw Error("Worker module function was called but `init` did not return a callable function")})})._getInitResult=function(){var e=t.dependencies,r=t.init,i=Promise.all(e=Array.isArray(e)?e.map(function(e){return e&&(e=e.onMainThread||e)._getInitResult&&(e=e._getInitResult()),e}):[]).then(function(e){return r.apply(null,e)});return n._getInitResult=function(){return i},i},n);null==u&&(u="#default");var h="workerModule"+ ++o,v=t.name||h,m=null;function g(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!i())return f.apply(void 0,e);if(!m){m=p(u,"registerModule",g.workerModuleData);var n=function(){m=null,c[u].delete(n)};(c[u]||(c[u]=new Set)).add(n)}return m.then(function(t){if(t.isCallable)return p(u,"callModule",{id:h,args:e});throw Error("Worker module function was called but `init` did not return a callable function")})}return r=r&&r.map(function(t){return"function"!=typeof t||t.workerModuleData||(s=!0,t=e({workerId:u,name:"<"+v+"> function dependency: "+t.name,init:"function(){return (\n"+d(t)+"\n)}"}),s=!1),t&&t.workerModuleData&&(t=t.workerModuleData),t}),g.workerModuleData={isWorkerModule:!0,id:h,name:v,dependencies:r,init:d(a),getTransferables:l&&d(l)},g.onMainThread=f,g}}),n(5866);var i=function(){var e=!1;if("undefined"!=typeof window&&void 0!==window.document)try{new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"}))).terminate(),e=!0}catch(e){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+e.message+"]")}return i=function(){return e},e},o=0,a=0,s=!1,l=Object.create(null),c=Object.create(null),u=Object.create(null);function f(e){c[e]&&c[e].forEach(function(e){e()}),l[e]&&(l[e].terminate(),delete l[e])}function d(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function p(e,t,n){return new Promise(function(i,o){var s=++a;u[s]=function(e){e.success?i(e.result):o(Error("Error in worker "+t+" call: "+e.error))},(function(e){var t=l[e];if(!t){var n=d(r);(t=l[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+" **/\n\n;("+n+")()"],{type:"application/javascript"})))).onmessage=function(e){var t=e.data,n=t.messageId,r=u[n];if(!r)throw Error("WorkerModule response with empty or unknown messageId");delete u[n],r(t)}}return t})(e).postMessage({messageId:s,action:t,data:n})})}},9385:(e,t,n)=>{n.d(t,{G:()=>a});var r=n(7510),i=n(1197);let o=parseInt(r.sPf.replace(/\D+/g,""));class a extends r.BKk{constructor(e){super({type:"LineMaterial",uniforms:r.LlO.clone(r.LlO.merge([i.UniformsLib.common,i.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new r.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${o>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}}}]);