"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[562],{28:(e,t)=>{function n(e,t){var n=e.length;for(e.push(t);0<n;){var r=n-1>>>1,i=e[r];if(0<o(i,t))e[r]=t,e[n]=i,n=r;else break}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;for(var r=0,i=e.length,a=i>>>1;r<a;){var l=2*(r+1)-1,s=e[l],c=l+1,u=e[c];if(0>o(s,n))c<i&&0>o(u,s)?(e[r]=u,e[c]=n,r=c):(e[r]=s,e[l]=n,r=l);else if(c<i&&0>o(u,n))e[r]=u,e[c]=n,r=c;else break}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var a,l=performance;t.unstable_now=function(){return l.now()}}else{var s=Date,c=s.now();t.unstable_now=function(){return s.now()-c}}var u=[],d=[],f=1,p=null,v=3,h=!1,m=!1,g=!1,b="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,w="undefined"!=typeof setImmediate?setImmediate:null;function x(e){for(var t=r(d);null!==t;){if(null===t.callback)i(d);else if(t.startTime<=e)i(d),t.sortIndex=t.expirationTime,n(u,t);else break;t=r(d)}}function E(e){if(g=!1,x(e),!m)if(null!==r(u))m=!0,T();else{var t=r(d);null!==t&&D(E,t.startTime-e)}}var _=!1,S=-1,j=5,M=-1;function C(){return!(t.unstable_now()-M<j)}function A(){if(_){var e=t.unstable_now();M=e;var n=!0;try{e:{m=!1,g&&(g=!1,y(S),S=-1),h=!0;var o=v;try{t:{for(x(e),p=r(u);null!==p&&!(p.expirationTime>e&&C());){var l=p.callback;if("function"==typeof l){p.callback=null,v=p.priorityLevel;var s=l(p.expirationTime<=e);if(e=t.unstable_now(),"function"==typeof s){p.callback=s,x(e),n=!0;break t}p===r(u)&&i(u),x(e)}else i(u);p=r(u)}if(null!==p)n=!0;else{var c=r(d);null!==c&&D(E,c.startTime-e),n=!1}}break e}finally{p=null,v=o,h=!1}}}finally{n?a():_=!1}}}if("function"==typeof w)a=function(){w(A)};else if("undefined"!=typeof MessageChannel){var P=new MessageChannel,L=P.port2;P.port1.onmessage=A,a=function(){L.postMessage(null)}}else a=function(){b(A,0)};function T(){_||(_=!0,a())}function D(e,n){S=b(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){m||h||(m=!0,T())},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return r(u)},t.unstable_next=function(e){switch(v){case 1:case 2:case 3:var t=3;break;default:t=v}var n=v;v=t;try{return e()}finally{v=n}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=v;v=e;try{return t()}finally{v=n}},t.unstable_scheduleCallback=function(e,i,o){var a=t.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?a+o:a,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=0x3fffffff;break;case 4:l=1e4;break;default:l=5e3}return l=o+l,e={id:f++,callback:i,priorityLevel:e,startTime:o,expirationTime:l,sortIndex:-1},o>a?(e.sortIndex=o,n(d,e),null===r(u)&&e===r(d)&&(g?(y(S),S=-1):g=!0,D(E,o-a))):(e.sortIndex=l,n(u,e),m||h||(m=!0,T())),e},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(e){var t=v;return function(){var n=v;v=t;try{return e.apply(this,arguments)}finally{v=n}}}},840:(e,t,n)=>{var r=n(7776),i=n(6619),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=i.useSyncExternalStore,l=r.useRef,s=r.useEffect,c=r.useMemo,u=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var d=l(null);if(null===d.current){var f={hasValue:!1,value:null};d.current=f}else f=d.current;var p=a(e,(d=c(function(){function e(e){if(!s){if(s=!0,a=e,e=r(e),void 0!==i&&f.hasValue){var t=f.value;if(i(t,e))return l=t}return l=e}if(t=l,o(a,e))return t;var n=r(e);return void 0!==i&&i(t,n)?(a=e,t):(a=e,l=n)}var a,l,s=!1,c=void 0===n?null:n;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,n,r,i]))[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),u(p),p}},1912:(e,t,n)=>{e.exports=n(3416)},2349:(e,t,n)=>{n.d(t,{n:()=>a});var r=n(7510);let i=new r.NRn,o=new r.Pq0;class a extends r.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new r.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new r.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.LuO(t,6,1);return this.setAttribute("instanceStart",new r.eHs(n,3,0)),this.setAttribute("instanceEnd",new r.eHs(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new r.LuO(t,6,1);return this.setAttribute("instanceColorStart",new r.eHs(n,3,0)),this.setAttribute("instanceColorEnd",new r.eHs(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new r.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new r.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),i.setFromBufferAttribute(t),this.boundingBox.union(i))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new r.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)o.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(o)),o.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(o));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}},2432:(e,t)=>{t.ConcurrentRoot=1,t.ContinuousEventPriority=8,t.DefaultEventPriority=32,t.DiscreteEventPriority=2},2651:(e,t,n)=>{n.d(t,{Do:()=>o,Fh:()=>p});var r=n(1197),i=n(7510);let o=/\bvoid\s+main\s*\(\s*\)\s*{/g;function a(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let n=r.ShaderChunk[t];return n?a(n):e})}let l=[];for(let e=0;e<256;e++)l[e]=(e<16?"0":"")+e.toString(16);let s=Object.assign||function(){let e=arguments[0];for(let t=1,n=arguments.length;t<n;t++){let n=arguments[t];if(n)for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},c=Date.now(),u=new WeakMap,d=new Map,f=1e10;function p(e,t){let n=function(e){let t=JSON.stringify(e,h),n=g.get(t);return null==n&&g.set(t,n=++m),n}(t),r=u.get(e);if(r||u.set(e,r=Object.create(null)),r[n])return new r[n];let o=`_onBeforeCompile${n}`,b=function(r,i){e.onBeforeCompile.call(this,r,i);let l=this.customProgramCacheKey()+"|"+r.vertexShader+"|"+r.fragmentShader,u=d[l];if(!u){let e=function(e,{vertexShader:t,fragmentShader:n},r,i){let{vertexDefs:o,vertexMainIntro:l,vertexMainOutro:s,vertexTransform:c,fragmentDefs:u,fragmentMainIntro:d,fragmentMainOutro:f,fragmentColorTransform:p,customRewriter:h,timeUniform:m}=r;if(o=o||"",l=l||"",s=s||"",u=u||"",d=d||"",f=f||"",(c||h)&&(t=a(t)),(p||h)&&(n=a(n=n.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),h){let e=h({vertexShader:t,fragmentShader:n});t=e.vertexShader,n=e.fragmentShader}if(p){let e=[];n=n.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),f=`${p}
${e.join("\n")}
${f}`}if(m){let e=`
uniform float ${m};
`;o=e+o,u=e+u}return c&&(t=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${t}
`,o=`${o}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,l=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${l}
`,t=t.replace(/\b(position|normal|uv)\b/g,(e,t,n,r)=>/\battribute\s+vec[23]\s+$/.test(r.substr(0,n))?t:`troika_${t}_${i}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),{vertexShader:t=v(t,i,o,l,s),fragmentShader:n=v(n,i,u,d,f)}}(this,r,t,n);u=d[l]=e}r.vertexShader=u.vertexShader,r.fragmentShader=u.fragmentShader,s(r.uniforms,this.uniforms),t.timeUniform&&(r.uniforms[t.timeUniform]={get value(){return Date.now()-c}}),this[o]&&this[o](r)},y=function(){return w(t.chained?e:e.clone())},w=function(r){let i=Object.create(r,x);return Object.defineProperty(i,"baseMaterial",{value:e}),Object.defineProperty(i,"id",{value:f++}),i.uuid=function(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,n=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0;return(l[255&e]+l[e>>8&255]+l[e>>16&255]+l[e>>24&255]+"-"+l[255&t]+l[t>>8&255]+"-"+l[t>>16&15|64]+l[t>>24&255]+"-"+l[63&n|128]+l[n>>8&255]+"-"+l[n>>16&255]+l[n>>24&255]+l[255&r]+l[r>>8&255]+l[r>>16&255]+l[r>>24&255]).toUpperCase()}(),i.uniforms=s({},r.uniforms,t.uniforms),i.defines=s({},r.defines,t.defines),i.defines[`TROIKA_DERIVED_MATERIAL_${n}`]="",i.extensions=s({},r.extensions,t.extensions),i._listeners=void 0,i},x={constructor:{value:y},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:t=>{e.type=t}},isDerivedFrom:{writable:!0,configurable:!0,value:function(e){let t=this.baseMaterial;return e===t||t.isDerivedMaterial&&t.isDerivedFrom(e)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+n}},onBeforeCompile:{get:()=>b,set(e){this[o]=e}},copy:{writable:!0,configurable:!0,value:function(t){return e.copy.call(this,t),e.isShaderMaterial||e.isDerivedMaterial||(s(this.extensions,t.extensions),s(this.defines,t.defines),s(this.uniforms,i.LlO.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return w(new e.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let n=this._depthMaterial;return n||((n=this._depthMaterial=p(e.isDerivedMaterial?e.getDepthMaterial():new i.CSG({depthPacking:i.N5j}),t)).defines.IS_DEPTH_MATERIAL="",n.uniforms=this.uniforms),n}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let n=this._distanceMaterial;return n||((n=this._distanceMaterial=p(e.isDerivedMaterial?e.getDistanceMaterial():new i.aVO,t)).defines.IS_DISTANCE_MATERIAL="",n.uniforms=this.uniforms),n}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:t,_distanceMaterial:n}=this;t&&t.dispose(),n&&n.dispose(),e.dispose.call(this)}}};return r[n]=y,new y}function v(e,t,n,r,i){return(r||i||n)&&(e=e.replace(o,`
${n}
void troikaOrigMain${t}() {`)+`
void main() {
  ${r}
  troikaOrigMain${t}();
  ${i}
}`),e}function h(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let m=0,g=new Map,b=`
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
`,x=`
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`,E=null,_=new i._4j({color:0xffffff,side:i.$EB});class S extends i.eaF{static getGeometry(){return E||(E=new i.Ho_(1,1,1,6,64).translate(0,.5,0))}constructor(){super(S.getGeometry(),_),this.pointA=new i.Pq0,this.controlA=new i.Pq0,this.controlB=new i.Pq0,this.pointB=new i.Pq0,this.radius=.01,this.dashArray=new i.I9Y,this.dashOffset=0,this.frustumCulled=!1}get material(){let e=this._derivedMaterial,t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=_.clone());return e&&e.baseMaterial===t||(e=this._derivedMaterial=p(t,{chained:!0,uniforms:{pointA:{value:new i.Pq0},controlA:{value:new i.Pq0},controlB:{value:new i.Pq0},pointB:{value:new i.Pq0},radius:{value:.01},dashing:{value:new i.Pq0}},vertexDefs:b,vertexTransform:y,fragmentDefs:w,fragmentMainIntro:x}),t.addEventListener("dispose",function n(){t.removeEventListener("dispose",n),e.dispose()})),e}set material(e){this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}onBeforeRender(){let{uniforms:e}=this.material,{pointA:t,controlA:n,controlB:r,pointB:i,radius:o,dashArray:a,dashOffset:l}=this;e.pointA.value.copy(t),e.controlA.value.copy(n),e.controlB.value.copy(r),e.pointB.value.copy(i),e.radius.value=o,e.dashing.value.set(a.x,a.y,l||0)}raycast(){}}},2657:(e,t,n)=>{e.exports=n(840)},3571:(e,t,n)=>{let r,i;n.d(t,{b:()=>_});var o=n(7510),a=n(2349),l=n(1197);l.UniformsLib.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new o.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},l.ShaderLib.line={uniforms:o.LlO.merge([l.UniformsLib.common,l.UniformsLib.fog,l.UniformsLib.line]),vertexShader:`
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
		`};class s extends o.BKk{constructor(e){super({type:"LineMaterial",uniforms:o.LlO.clone(l.ShaderLib.line.uniforms),vertexShader:l.ShaderLib.line.vertexShader,fragmentShader:l.ShaderLib.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){!0===e!==this.dashed&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(!0===e!==this.alphaToCoverage&&(this.needsUpdate=!0),!0===e?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}let c=new o.IUQ,u=new o.Pq0,d=new o.Pq0,f=new o.IUQ,p=new o.IUQ,v=new o.IUQ,h=new o.Pq0,m=new o.kn4,g=new o.cZY,b=new o.Pq0,y=new o.NRn,w=new o.iyt,x=new o.IUQ;function E(e,t,n){return x.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),x.multiplyScalar(1/x.w),x.x=i/n.width,x.y=i/n.height,x.applyMatrix4(e.projectionMatrixInverse),x.multiplyScalar(1/x.w),Math.abs(Math.max(x.x,x.y))}class _ extends o.eaF{constructor(e=new a.n,t=new s({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,o=t.count;e<o;e++,i+=2)u.fromBufferAttribute(t,e),d.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+u.distanceTo(d);let i=new o.LuO(r,2,1);return e.setAttribute("instanceDistanceStart",new o.eHs(i,1,0)),e.setAttribute("instanceDistanceEnd",new o.eHs(i,1,1)),this}raycast(e,t){let n,a,l=this.material.worldUnits,s=e.camera;null!==s||l||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;r=e.ray;let u=this.matrixWorld,d=this.geometry,x=this.material;if(i=x.linewidth+c,null===d.boundingSphere&&d.computeBoundingSphere(),w.copy(d.boundingSphere).applyMatrix4(u),l)n=.5*i;else{let e=Math.max(s.near,w.distanceToPoint(r.origin));n=E(s,e,x.resolution)}if(w.radius+=n,!1!==r.intersectsSphere(w)){if(null===d.boundingBox&&d.computeBoundingBox(),y.copy(d.boundingBox).applyMatrix4(u),l)a=.5*i;else{let e=Math.max(s.near,y.distanceToPoint(r.origin));a=E(s,e,x.resolution)}y.expandByScalar(a),!1!==r.intersectsBox(y)&&(l?function(e,t){let n=e.matrixWorld,a=e.geometry,l=a.attributes.instanceStart,s=a.attributes.instanceEnd,c=Math.min(a.instanceCount,l.count);for(let a=0;a<c;a++){g.start.fromBufferAttribute(l,a),g.end.fromBufferAttribute(s,a),g.applyMatrix4(n);let c=new o.Pq0,u=new o.Pq0;r.distanceSqToSegment(g.start,g.end,u,c),u.distanceTo(c)<.5*i&&t.push({point:u,pointOnLine:c,distance:r.origin.distanceTo(u),object:e,face:null,faceIndex:a,uv:null,uv1:null})}}(this,t):function(e,t,n){let a=t.projectionMatrix,l=e.material.resolution,s=e.matrixWorld,c=e.geometry,u=c.attributes.instanceStart,d=c.attributes.instanceEnd,y=Math.min(c.instanceCount,u.count),w=-t.near;r.at(1,v),v.w=1,v.applyMatrix4(t.matrixWorldInverse),v.applyMatrix4(a),v.multiplyScalar(1/v.w),v.x*=l.x/2,v.y*=l.y/2,v.z=0,h.copy(v),m.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<y;t++){if(f.fromBufferAttribute(u,t),p.fromBufferAttribute(d,t),f.w=1,p.w=1,f.applyMatrix4(m),p.applyMatrix4(m),f.z>w&&p.z>w)continue;if(f.z>w){let e=f.z-p.z,t=(f.z-w)/e;f.lerp(p,t)}else if(p.z>w){let e=p.z-f.z,t=(p.z-w)/e;p.lerp(f,t)}f.applyMatrix4(a),p.applyMatrix4(a),f.multiplyScalar(1/f.w),p.multiplyScalar(1/p.w),f.x*=l.x/2,f.y*=l.y/2,p.x*=l.x/2,p.y*=l.y/2,g.start.copy(f),g.start.z=0,g.end.copy(p),g.end.z=0;let c=g.closestPointToPointParameter(h,!0);g.at(c,b);let v=o.cj9.lerp(f.z,p.z,c),y=v>=-1&&v<=1,x=h.distanceTo(b)<.5*i;if(y&&x){g.start.fromBufferAttribute(u,t),g.end.fromBufferAttribute(d,t),g.start.applyMatrix4(s),g.end.applyMatrix4(s);let i=new o.Pq0,a=new o.Pq0;r.distanceSqToSegment(g.start,g.end,a,i),n.push({point:a,pointOnLine:i,distance:r.origin.distanceTo(a),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(c),this.material.uniforms.resolution.value.set(c.z,c.w))}}},3738:(e,t,n)=>{n.d(t,{N:()=>m});var r=n(827),i=n(5102),o=n(7776),a=n(7510),l=Object.defineProperty;class s{constructor(){((e,t,n)=>((e,t,n)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n))(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,r=n.length;t<r;t++)n[t].call(this,e);e.target=null}}}var c=Object.defineProperty,u=(e,t,n)=>(((e,t,n)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n)(e,"symbol"!=typeof t?t+"":t,n),n);let d=new a.RlV,f=new a.Zcv,p=Math.cos(Math.PI/180*70),v=(e,t)=>(e%t+t)%t;class h extends s{constructor(e,t){super(),u(this,"object"),u(this,"domElement"),u(this,"enabled",!0),u(this,"target",new a.Pq0),u(this,"minDistance",0),u(this,"maxDistance",1/0),u(this,"minZoom",0),u(this,"maxZoom",1/0),u(this,"minPolarAngle",0),u(this,"maxPolarAngle",Math.PI),u(this,"minAzimuthAngle",-1/0),u(this,"maxAzimuthAngle",1/0),u(this,"enableDamping",!1),u(this,"dampingFactor",.05),u(this,"enableZoom",!0),u(this,"zoomSpeed",1),u(this,"enableRotate",!0),u(this,"rotateSpeed",1),u(this,"enablePan",!0),u(this,"panSpeed",1),u(this,"screenSpacePanning",!0),u(this,"keyPanSpeed",7),u(this,"zoomToCursor",!1),u(this,"autoRotate",!1),u(this,"autoRotateSpeed",2),u(this,"reverseOrbit",!1),u(this,"reverseHorizontalOrbit",!1),u(this,"reverseVerticalOrbit",!1),u(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),u(this,"mouseButtons",{LEFT:a.kBv.ROTATE,MIDDLE:a.kBv.DOLLY,RIGHT:a.kBv.PAN}),u(this,"touches",{ONE:a.wtR.ROTATE,TWO:a.wtR.DOLLY_PAN}),u(this,"target0"),u(this,"position0"),u(this,"zoom0"),u(this,"_domElementKeyEvents",null),u(this,"getPolarAngle"),u(this,"getAzimuthalAngle"),u(this,"setPolarAngle"),u(this,"setAzimuthalAngle"),u(this,"getDistance"),u(this,"getZoomScale"),u(this,"listenToKeyEvents"),u(this,"stopListenToKeyEvents"),u(this,"saveState"),u(this,"reset"),u(this,"update"),u(this,"connect"),u(this,"dispose"),u(this,"dollyIn"),u(this,"dollyOut"),u(this,"getScale"),u(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>h.phi,this.getAzimuthalAngle=()=>h.theta,this.setPolarAngle=e=>{let t=v(e,2*Math.PI),r=h.phi;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),m.phi=t-r,n.update()},this.setAzimuthalAngle=e=>{let t=v(e,2*Math.PI),r=h.theta;r<0&&(r+=2*Math.PI),t<0&&(t+=2*Math.PI);let i=Math.abs(t-r);2*Math.PI-i<i&&(t<r?t+=2*Math.PI:r+=2*Math.PI),m.theta=t-r,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(r),n.update(),s=l.NONE},this.update=(()=>{let t=new a.Pq0,i=new a.Pq0(0,1,0),o=new a.PTz().setFromUnitVectors(e.up,i),u=o.clone().invert(),v=new a.Pq0,y=new a.PTz,w=2*Math.PI;return function(){let x=n.object.position;o.setFromUnitVectors(e.up,i),u.copy(o).invert(),t.copy(x).sub(n.target),t.applyQuaternion(o),h.setFromVector3(t),n.autoRotate&&s===l.NONE&&R(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(h.theta+=m.theta*n.dampingFactor,h.phi+=m.phi*n.dampingFactor):(h.theta+=m.theta,h.phi+=m.phi);let E=n.minAzimuthAngle,_=n.maxAzimuthAngle;isFinite(E)&&isFinite(_)&&(E<-Math.PI?E+=w:E>Math.PI&&(E-=w),_<-Math.PI?_+=w:_>Math.PI&&(_-=w),E<=_?h.theta=Math.max(E,Math.min(_,h.theta)):h.theta=h.theta>(E+_)/2?Math.max(E,h.theta):Math.min(_,h.theta)),h.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,h.phi)),h.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(b,n.dampingFactor):n.target.add(b),n.zoomToCursor&&L||n.object.isOrthographicCamera?h.radius=B(h.radius):h.radius=B(h.radius*g),t.setFromSpherical(h),t.applyQuaternion(u),x.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(m.theta*=1-n.dampingFactor,m.phi*=1-n.dampingFactor,b.multiplyScalar(1-n.dampingFactor)):(m.set(0,0,0),b.set(0,0,0));let S=!1;if(n.zoomToCursor&&L){let r=null;if(n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let e=t.length();r=B(e*g);let i=e-r;n.object.position.addScaledVector(A,i),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new a.Pq0(P.x,P.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/g)),n.object.updateProjectionMatrix(),S=!0;let i=new a.Pq0(P.x,P.y,0);i.unproject(n.object),n.object.position.sub(i).add(e),n.object.updateMatrixWorld(),r=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==r&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(r).add(n.object.position):(d.origin.copy(n.object.position),d.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(d.direction))<p?e.lookAt(n.target):(f.setFromNormalAndCoplanarPoint(n.object.up,n.target),d.intersectPlane(f,n.target))))}else n.object instanceof a.qUd&&n.object.isOrthographicCamera&&(S=1!==g)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/g)),n.object.updateProjectionMatrix());return g=1,L=!1,!!(S||v.distanceToSquared(n.object.position)>c||8*(1-y.dot(n.object.quaternion))>c)&&(n.dispatchEvent(r),v.copy(n.object.position),y.copy(n.object.quaternion),S=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",$),n.domElement.addEventListener("pointercancel",Q),n.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,r,i,o,a;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",$),null==(r=n.domElement)||r.removeEventListener("pointercancel",Q),null==(i=n.domElement)||i.removeEventListener("wheel",J),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointermove",Z),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointerup",Q),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};let n=this,r={type:"change"},i={type:"start"},o={type:"end"},l={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},s=l.NONE,c=1e-6,h=new a.YHV,m=new a.YHV,g=1,b=new a.Pq0,y=new a.I9Y,w=new a.I9Y,x=new a.I9Y,E=new a.I9Y,_=new a.I9Y,S=new a.I9Y,j=new a.I9Y,M=new a.I9Y,C=new a.I9Y,A=new a.Pq0,P=new a.I9Y,L=!1,T=[],D={};function O(){return Math.pow(.95,n.zoomSpeed)}function R(e){n.reverseOrbit||n.reverseHorizontalOrbit?m.theta+=e:m.theta-=e}function k(e){n.reverseOrbit||n.reverseVerticalOrbit?m.phi+=e:m.phi-=e}let I=(()=>{let e=new a.Pq0;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),b.add(e)}})(),U=(()=>{let e=new a.Pq0;return function(t,r){!0===n.screenSpacePanning?e.setFromMatrixColumn(r,1):(e.setFromMatrixColumn(r,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),b.add(e)}})(),z=(()=>{let e=new a.Pq0;return function(t,r){let i=n.domElement;if(i&&n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let a=e.length();I(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/i.clientHeight,n.object.matrix),U(2*r*a/i.clientHeight,n.object.matrix)}else i&&n.object instanceof a.qUd&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),U(r*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function N(e){n.object instanceof a.ubm&&n.object.isPerspectiveCamera||n.object instanceof a.qUd&&n.object.isOrthographicCamera?g=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function F(e){if(!n.zoomToCursor||!n.domElement)return;L=!0;let t=n.domElement.getBoundingClientRect(),r=e.clientX-t.left,i=e.clientY-t.top,o=t.width,a=t.height;P.x=r/o*2-1,P.y=-(i/a*2)+1,A.set(P.x,P.y,1).unproject(n.object).sub(n.object.position).normalize()}function B(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function H(e){y.set(e.clientX,e.clientY)}function q(e){E.set(e.clientX,e.clientY)}function G(){if(1==T.length)y.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);y.set(e,t)}}function W(){if(1==T.length)E.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);E.set(e,t)}}function Y(){let e=T[0].pageX-T[1].pageX,t=T[0].pageY-T[1].pageY,n=Math.sqrt(e*e+t*t);j.set(0,n)}function K(e){if(1==T.length)w.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);w.set(n,r)}x.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(R(2*Math.PI*x.x/t.clientHeight),k(2*Math.PI*x.y/t.clientHeight)),y.copy(w)}function V(e){if(1==T.length)_.set(e.pageX,e.pageY);else{let t=er(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);_.set(n,r)}S.subVectors(_,E).multiplyScalar(n.panSpeed),z(S.x,S.y),E.copy(_)}function X(e){var t;let r=er(e),i=e.pageX-r.x,o=e.pageY-r.y,a=Math.sqrt(i*i+o*o);M.set(0,a),C.set(0,Math.pow(M.y/j.y,n.zoomSpeed)),t=C.y,N(g/t),j.copy(M)}function $(e){var t,r,o;!1!==n.enabled&&(0===T.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",Z),null==(r=n.domElement)||r.ownerDocument.addEventListener("pointerup",Q)),o=e,T.push(o),"touch"===e.pointerType?function(e){switch(en(e),T.length){case 1:switch(n.touches.ONE){case a.wtR.ROTATE:if(!1===n.enableRotate)return;G(),s=l.TOUCH_ROTATE;break;case a.wtR.PAN:if(!1===n.enablePan)return;W(),s=l.TOUCH_PAN;break;default:s=l.NONE}break;case 2:switch(n.touches.TWO){case a.wtR.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&Y(),n.enablePan&&W(),s=l.TOUCH_DOLLY_PAN;break;case a.wtR.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&Y(),n.enableRotate&&G(),s=l.TOUCH_DOLLY_ROTATE;break;default:s=l.NONE}break;default:s=l.NONE}s!==l.NONE&&n.dispatchEvent(i)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case a.kBv.DOLLY:if(!1===n.enableZoom)return;F(e),j.set(e.clientX,e.clientY),s=l.DOLLY;break;case a.kBv.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;q(e),s=l.PAN}else{if(!1===n.enableRotate)return;H(e),s=l.ROTATE}break;case a.kBv.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;H(e),s=l.ROTATE}else{if(!1===n.enablePan)return;q(e),s=l.PAN}break;default:s=l.NONE}s!==l.NONE&&n.dispatchEvent(i)}(e))}function Z(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),s){case l.TOUCH_ROTATE:if(!1===n.enableRotate)return;K(e),n.update();break;case l.TOUCH_PAN:if(!1===n.enablePan)return;V(e),n.update();break;case l.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&X(e),n.enablePan&&V(e),n.update();break;case l.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&X(e),n.enableRotate&&K(e),n.update();break;default:s=l.NONE}}(e):function(e){if(!1!==n.enabled)switch(s){case l.ROTATE:if(!1===n.enableRotate)return;w.set(e.clientX,e.clientY),x.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(R(2*Math.PI*x.x/t.clientHeight),k(2*Math.PI*x.y/t.clientHeight)),y.copy(w),n.update();break;case l.DOLLY:var r,i;if(!1===n.enableZoom)return;(M.set(e.clientX,e.clientY),C.subVectors(M,j),C.y>0)?(r=O(),N(g/r)):C.y<0&&(i=O(),N(g*i)),j.copy(M),n.update();break;case l.PAN:if(!1===n.enablePan)return;_.set(e.clientX,e.clientY),S.subVectors(_,E).multiplyScalar(n.panSpeed),z(S.x,S.y),E.copy(_),n.update()}}(e))}function Q(e){var t,r,i;(function(e){delete D[e.pointerId];for(let t=0;t<T.length;t++)if(T[t].pointerId==e.pointerId)return void T.splice(t,1)})(e),0===T.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointermove",Z),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointerup",Q)),n.dispatchEvent(o),s=l.NONE}function J(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(s===l.NONE||s===l.ROTATE)){var t,r;e.preventDefault(),n.dispatchEvent(i),(F(e),e.deltaY<0)?(t=O(),N(g*t)):e.deltaY>0&&(r=O(),N(g/r)),n.update(),n.dispatchEvent(o)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:z(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:z(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:z(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:z(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=D[e.pointerId];void 0===t&&(t=new a.I9Y,D[e.pointerId]=t),t.set(e.pageX,e.pageY)}function er(e){return D[(e.pointerId===T[0].pointerId?T[1]:T[0]).pointerId]}this.dollyIn=(e=O())=>{N(g*e),n.update()},this.dollyOut=(e=O())=>{N(g/e),n.update()},this.getScale=()=>g,this.setScale=e=>{N(e),n.update()},this.getZoomScale=()=>O(),void 0!==t&&this.connect(t),this.update()}}let m=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:a,enableDamping:l=!0,keyEvents:s=!1,onChange:c,onStart:u,onEnd:d,...f},p)=>{let v=(0,i.C)(e=>e.invalidate),m=(0,i.C)(e=>e.camera),g=(0,i.C)(e=>e.gl),b=(0,i.C)(e=>e.events),y=(0,i.C)(e=>e.setEvents),w=(0,i.C)(e=>e.set),x=(0,i.C)(e=>e.get),E=(0,i.C)(e=>e.performance),_=t||m,S=a||b.connected||g.domElement,j=o.useMemo(()=>new h(_),[_]);return(0,i.D)(()=>{j.enabled&&j.update()},-1),o.useEffect(()=>(s&&j.connect(!0===s?S:s),j.connect(S),()=>void j.dispose()),[s,S,n,j,v]),o.useEffect(()=>{let e=e=>{v(),n&&E.regress(),c&&c(e)},t=e=>{u&&u(e)},r=e=>{d&&d(e)};return j.addEventListener("change",e),j.addEventListener("start",t),j.addEventListener("end",r),()=>{j.removeEventListener("start",t),j.removeEventListener("end",r),j.removeEventListener("change",e)}},[c,u,d,j,v,y]),o.useEffect(()=>{if(e){let e=x().controls;return w({controls:j}),()=>w({controls:e})}},[e,j]),o.createElement("primitive",(0,r.A)({ref:p,object:j,enableDamping:l},f))})},4433:(e,t,n)=>{e.exports=n(2432)},4790:(e,t,n)=>{n.d(t,{A:()=>r});function r(){return function(e){function t(e,t){for(var n,r,i,o,a,l=/([MLQCZ])([^MLQCZ]*)/g;n=l.exec(e);){var s=n[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(e){return parseFloat(e)});switch(n[1]){case"M":o=r=s[0],a=i=s[1];break;case"L":(s[0]!==o||s[1]!==a)&&t("L",o,a,o=s[0],a=s[1]);break;case"Q":t("Q",o,a,o=s[2],a=s[3],s[0],s[1]);break;case"C":t("C",o,a,o=s[4],a=s[5],s[0],s[1],s[2],s[3]);break;case"Z":(o!==r||a!==i)&&t("L",o,a,r,i)}}}function n(e,n,r){void 0===r&&(r=16);var i={x:0,y:0};t(e,function(e,t,o,a,l,s,c,u,d){switch(e){case"L":n(t,o,a,l);break;case"Q":for(var f=t,p=o,v=1;v<r;v++)!function(e,t,n,r,i,o,a,l){var s=1-a;l.x=s*s*e+2*s*a*n+a*a*i,l.y=s*s*t+2*s*a*r+a*a*o}(t,o,s,c,a,l,v/(r-1),i),n(f,p,i.x,i.y),f=i.x,p=i.y;break;case"C":for(var h=t,m=o,g=1;g<r;g++)!function(e,t,n,r,i,o,a,l,s,c){var u=1-s;c.x=u*u*u*e+3*u*u*s*n+3*u*s*s*i+s*s*s*a,c.y=u*u*u*t+3*u*u*s*r+3*u*s*s*o+s*s*s*l}(t,o,s,c,u,d,a,l,g/(r-1),i),n(h,m,i.x,i.y),h=i.x,m=i.y}})}var r="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",i=new WeakMap,o={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function a(e,t){var n=e.getContext?e.getContext("webgl",o):e,r=i.get(n);if(!r){var a="undefined"!=typeof WebGL2RenderingContext&&n instanceof WebGL2RenderingContext,l={},s={},c={},u=-1,d=[];function f(e){var t=l[e];if(!t&&!(t=l[e]=n.getExtension(e)))throw Error(e+" not supported");return t}function p(e,t){var r=n.createShader(t);return n.shaderSource(r,e),n.compileShader(r),r}function v(){l={},s={},c={},u=-1,d.length=0}n.canvas.addEventListener("webglcontextlost",function(e){v(),e.preventDefault()},!1),i.set(n,r={gl:n,isWebGL2:a,getExtension:f,withProgram:function(e,t,r,i){if(!s[e]){var o={},l={},c=n.createProgram();n.attachShader(c,p(t,n.VERTEX_SHADER)),n.attachShader(c,p(r,n.FRAGMENT_SHADER)),n.linkProgram(c),s[e]={program:c,transaction:function(e){n.useProgram(c),e({setUniform:function(e,t){for(var r=[],i=arguments.length-2;i-- >0;)r[i]=arguments[i+2];var o=l[t]||(l[t]=n.getUniformLocation(c,t));n["uniform"+e].apply(n,[o].concat(r))},setAttribute:function(e,t,r,i,l){var s=o[e];s||(s=o[e]={buf:n.createBuffer(),loc:n.getAttribLocation(c,e),data:null}),n.bindBuffer(n.ARRAY_BUFFER,s.buf),n.vertexAttribPointer(s.loc,t,n.FLOAT,!1,0,0),n.enableVertexAttribArray(s.loc),a?n.vertexAttribDivisor(s.loc,i):f("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(s.loc,i),l!==s.data&&(n.bufferData(n.ARRAY_BUFFER,l,r),s.data=l)}})}}}s[e].transaction(i)},withTexture:function(e,t){u++;try{n.activeTexture(n.TEXTURE0+u);var r=c[e];r||(r=c[e]=n.createTexture(),n.bindTexture(n.TEXTURE_2D,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST)),n.bindTexture(n.TEXTURE_2D,r),t(r,u)}finally{u--}},withTextureFramebuffer:function(e,t,r){var i=n.createFramebuffer();d.push(i),n.bindFramebuffer(n.FRAMEBUFFER,i),n.activeTexture(n.TEXTURE0+t),n.bindTexture(n.TEXTURE_2D,e),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);try{r(i)}finally{n.deleteFramebuffer(i),n.bindFramebuffer(n.FRAMEBUFFER,d[--d.length-1]||null)}},handleContextLoss:v})}t(r)}function l(e,t,n,i,o,l,s,c){void 0===s&&(s=15),void 0===c&&(c=null),a(e,function(e){var a=e.gl,u=e.withProgram;(0,e.withTexture)("copy",function(e,d){a.texImage2D(a.TEXTURE_2D,0,a.RGBA,o,l,0,a.RGBA,a.UNSIGNED_BYTE,t),u("copy",r,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",function(e){var t=e.setUniform;(0,e.setAttribute)("aUV",2,a.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),t("1i","image",d),a.bindFramebuffer(a.FRAMEBUFFER,c||null),a.disable(a.BLEND),a.colorMask(8&s,4&s,2&s,1&s),a.viewport(n,i,o,l),a.scissor(n,i,o,l),a.drawArrays(a.TRIANGLES,0,3)})})})}var s=Object.freeze({__proto__:null,withWebGLContext:a,renderImageData:l,resizeWebGLCanvasWithoutClearing:function(e,t,n){var r=e.width,i=e.height;a(e,function(o){var a=o.gl,s=new Uint8Array(r*i*4);a.readPixels(0,0,r,i,a.RGBA,a.UNSIGNED_BYTE,s),e.width=t,e.height=n,l(a,s,0,0,r,i)})}});function c(e,t,r,i,o,a){void 0===a&&(a=1);var l=new Uint8Array(e*t),s=i[2]-i[0],c=i[3]-i[1],u=[];n(r,function(e,t,n,r){u.push({x1:e,y1:t,x2:n,y2:r,minX:Math.min(e,n),minY:Math.min(t,r),maxX:Math.max(e,n),maxY:Math.max(t,r)})}),u.sort(function(e,t){return e.maxX-t.maxX});for(var d=0;d<e;d++)for(var f=0;f<t;f++){var p=function(e,t){for(var n=1/0,r=1/0,i=u.length;i--;){var o=u[i];if(o.maxX+r<=e)break;if(e+r>o.minX&&t-r<o.maxY&&t+r>o.minY){var a=function(e,t,n,r,i,o){var a=i-n,l=o-r,s=a*a+l*l,c=s?Math.max(0,Math.min(1,((e-n)*a+(t-r)*l)/s)):0,u=e-(n+c*a),d=t-(r+c*l);return u*u+d*d}(e,t,o.x1,o.y1,o.x2,o.y2);a<n&&(r=Math.sqrt(n=a))}}return function(e,t){for(var n=0,r=u.length;r--;){var i=u[r];if(i.maxX<=e)break;i.y1>t!=i.y2>t&&e<(i.x2-i.x1)*(t-i.y1)/(i.y2-i.y1)+i.x1&&(n+=i.y1<i.y2?1:-1)}return 0!==n}(e,t)&&(r=-r),r}(i[0]+s*(d+.5)/e,i[1]+c*(f+.5)/t),v=Math.pow(1-Math.abs(p)/o,a)/2;p<0&&(v=1-v),v=Math.max(0,Math.min(255,Math.round(255*v))),l[f*e+d]=v}return l}function u(e,t,n,r,i,o,a,l,s,c){void 0===o&&(o=1),void 0===l&&(l=0),void 0===s&&(s=0),void 0===c&&(c=0),d(e,t,n,r,i,o,a,null,l,s,c)}function d(e,t,n,r,i,o,a,s,u,d,f){void 0===o&&(o=1),void 0===u&&(u=0),void 0===d&&(d=0),void 0===f&&(f=0);for(var p=c(e,t,n,r,i,o),v=new Uint8Array(4*p.length),h=0;h<p.length;h++)v[4*h+f]=p[h];l(a,v,u,d,e,t,1<<3-f,s)}var f=Object.freeze({__proto__:null,generate:c,generateIntoCanvas:u,generateIntoFramebuffer:d}),p=new Float32Array([0,0,2,0,0,2]),v=null,h=!1,m={},g=new WeakMap;function b(e){if(!h&&!E(e))throw Error("WebGL generation not supported")}function y(e,t,n,r,i,o,l){if(void 0===o&&(o=1),void 0===l&&(l=null),!l&&!(l=v)){var s="function"==typeof OffscreenCanvas?new OffscreenCanvas(1,1):"undefined"!=typeof document?document.createElement("canvas"):null;if(!s)throw Error("OffscreenCanvas or DOM canvas not supported");l=v=s.getContext("webgl",{depth:!1})}b(l);var c=new Uint8Array(e*t*4);a(l,function(a){var l=a.gl,s=a.withTexture,u=a.withTextureFramebuffer;s("readable",function(a,s){l.texImage2D(l.TEXTURE_2D,0,l.RGBA,e,t,0,l.RGBA,l.UNSIGNED_BYTE,null),u(a,s,function(a){x(e,t,n,r,i,o,l,a,0,0,0),l.readPixels(0,0,e,t,l.RGBA,l.UNSIGNED_BYTE,c)})})});for(var u=new Uint8Array(e*t),d=0,f=0;d<c.length;d+=4)u[f++]=c[d];return u}function w(e,t,n,r,i,o,a,l,s,c){void 0===o&&(o=1),void 0===l&&(l=0),void 0===s&&(s=0),void 0===c&&(c=0),x(e,t,n,r,i,o,a,null,l,s,c)}function x(e,t,i,o,l,s,c,u,d,f,v){void 0===s&&(s=1),void 0===d&&(d=0),void 0===f&&(f=0),void 0===v&&(v=0),b(c);var h=[];n(i,function(e,t,n,r){h.push(e,t,n,r)}),h=new Float32Array(h),a(c,function(n){var i=n.gl,a=n.isWebGL2,c=n.getExtension,m=n.withProgram,g=n.withTexture,b=n.withTextureFramebuffer,y=n.handleContextLoss;if(g("rawDistances",function(n,g){(e!==n._lastWidth||t!==n._lastHeight)&&i.texImage2D(i.TEXTURE_2D,0,i.RGBA,n._lastWidth=e,n._lastHeight=t,0,i.RGBA,i.UNSIGNED_BYTE,null),m("main","precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}","precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",function(r){var u=r.setAttribute,d=r.setUniform,f=!a&&c("ANGLE_instanced_arrays"),v=!a&&c("EXT_blend_minmax");u("aUV",2,i.STATIC_DRAW,0,p),u("aLineSegment",4,i.DYNAMIC_DRAW,1,h),d.apply(void 0,["4f","uGlyphBounds"].concat(o)),d("1f","uMaxDistance",l),d("1f","uExponent",s),b(n,g,function(n){i.enable(i.BLEND),i.colorMask(!0,!0,!0,!0),i.viewport(0,0,e,t),i.scissor(0,0,e,t),i.blendFunc(i.ONE,i.ONE),i.blendEquationSeparate(i.FUNC_ADD,a?i.MAX:v.MAX_EXT),i.clear(i.COLOR_BUFFER_BIT),a?i.drawArraysInstanced(i.TRIANGLES,0,3,h.length/4):f.drawArraysInstancedANGLE(i.TRIANGLES,0,3,h.length/4)})}),m("post",r,"precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",function(n){n.setAttribute("aUV",2,i.STATIC_DRAW,0,p),n.setUniform("1i","tex",g),i.bindFramebuffer(i.FRAMEBUFFER,u),i.disable(i.BLEND),i.colorMask(0===v,1===v,2===v,3===v),i.viewport(d,f,e,t),i.scissor(d,f,e,t),i.drawArrays(i.TRIANGLES,0,3)})}),i.isContextLost())throw y(),Error("webgl context lost")})}function E(e){var t=e&&e!==v?e.canvas||e:m,n=g.get(t);if(void 0===n){h=!0;var r=null;try{var i=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],o=y(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,e);(n=o&&i.length===o.length&&o.every(function(e,t){return e===i[t]}))||(r="bad trial run results",console.info(i,o))}catch(e){n=!1,r=e.message}r&&console.warn("WebGL SDF generation not supported:",r),h=!1,g.set(t,n)}return n}var _=Object.freeze({__proto__:null,generate:y,generateIntoCanvas:w,generateIntoFramebuffer:x,isSupported:E});return e.forEachPathCommand=t,e.generate=function(e,t,n,r,i,o){void 0===i&&(i=Math.max(r[2]-r[0],r[3]-r[1])/2),void 0===o&&(o=1);try{return y.apply(_,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),c.apply(f,arguments)}},e.generateIntoCanvas=function(e,t,n,r,i,o,a,l,s,c){void 0===i&&(i=Math.max(r[2]-r[0],r[3]-r[1])/2),void 0===o&&(o=1),void 0===l&&(l=0),void 0===s&&(s=0),void 0===c&&(c=0);try{return w.apply(_,arguments)}catch(e){return console.info("WebGL SDF generation failed, falling back to JS",e),u.apply(f,arguments)}},e.javascript=f,e.pathToLineSegments=n,e.webgl=_,e.webglUtils=s,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},5010:(e,t,n)=>{n.d(t,{Hl:()=>d});var r=n(5102),i=n(7776),o=n(1197);function a(e,t){let n;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}let l=["x","y","top","bottom","left","right","width","height"];var s=n(8669),c=n(9564);function u({ref:e,children:t,fallback:n,resize:s,style:u,gl:d,events:f=r.f,eventSource:p,eventPrefix:v,shadows:h,linear:m,flat:g,legacy:b,orthographic:y,frameloop:w,dpr:x,performance:E,raycaster:_,camera:S,scene:j,onPointerMissed:M,onCreated:C,...A}){i.useMemo(()=>(0,r.e)(o),[]);let P=(0,r.u)(),[L,T]=function({debounce:e,scroll:t,polyfill:n,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){var o,s,c;let u=n||("undefined"==typeof window?class{}:window.ResizeObserver);if(!u)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[d,f]=(0,i.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),p=(0,i.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:d,orientationHandler:null}),v=e?"number"==typeof e?e:e.scroll:null,h=e?"number"==typeof e?e:e.resize:null,m=(0,i.useRef)(!1);(0,i.useEffect)(()=>(m.current=!0,()=>void(m.current=!1)));let[g,b,y]=(0,i.useMemo)(()=>{let e=()=>{let e,t;if(!p.current.element)return;let{left:n,top:i,width:o,height:a,bottom:s,right:c,x:u,y:d}=p.current.element.getBoundingClientRect(),v={left:n,top:i,width:o,height:a,bottom:s,right:c,x:u,y:d};p.current.element instanceof HTMLElement&&r&&(v.height=p.current.element.offsetHeight,v.width=p.current.element.offsetWidth),Object.freeze(v),m.current&&(e=p.current.lastBounds,t=v,!l.every(n=>e[n]===t[n]))&&f(p.current.lastBounds=v)};return[e,h?a(e,h):e,v?a(e,v):e]},[f,r,v,h]);function w(){p.current.scrollContainers&&(p.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),p.current.scrollContainers=null),p.current.resizeObserver&&(p.current.resizeObserver.disconnect(),p.current.resizeObserver=null),p.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",p.current.orientationHandler))}function x(){p.current.element&&(p.current.resizeObserver=new u(y),p.current.resizeObserver.observe(p.current.element),t&&p.current.scrollContainers&&p.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),p.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",p.current.orientationHandler))}return o=y,s=!!t,(0,i.useEffect)(()=>{if(s)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,s]),c=b,(0,i.useEffect)(()=>(window.addEventListener("resize",c),()=>void window.removeEventListener("resize",c)),[c]),(0,i.useEffect)(()=>{w(),x()},[t,y,b]),(0,i.useEffect)(()=>w,[]),[e=>{e&&e!==p.current.element&&(w(),p.current.element=e,p.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:r,overflowX:i,overflowY:o}=window.getComputedStyle(t);return[r,i,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),x())},d,g]}({scroll:!0,debounce:{scroll:50,resize:0},...s}),D=i.useRef(null),O=i.useRef(null);i.useImperativeHandle(e,()=>D.current);let R=(0,r.a)(M),[k,I]=i.useState(!1),[U,z]=i.useState(!1);if(k)throw k;if(U)throw U;let N=i.useRef(null);(0,r.b)(()=>{let e=D.current;T.width>0&&T.height>0&&e&&(N.current||(N.current=(0,r.c)(e)),async function(){await N.current.configure({gl:d,scene:j,events:f,shadows:h,linear:m,flat:g,legacy:b,orthographic:y,frameloop:w,dpr:x,performance:E,raycaster:_,camera:S,size:T,onPointerMissed:(...e)=>null==R.current?void 0:R.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(p?(0,r.i)(p)?p.current:p:O.current),v&&e.setEvents({compute:(e,t)=>{let n=e[v+"X"],r=e[v+"Y"];t.pointer.set(n/t.size.width*2-1,-(2*(r/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==C||C(e)}}),N.current.render((0,c.jsx)(P,{children:(0,c.jsx)(r.E,{set:z,children:(0,c.jsx)(i.Suspense,{fallback:(0,c.jsx)(r.B,{set:I}),children:null!=t?t:null})})}))}())}),i.useEffect(()=>{let e=D.current;if(e)return()=>(0,r.d)(e)},[]);let F=p?"none":"auto";return(0,c.jsx)("div",{ref:O,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:F,...u},...A,children:(0,c.jsx)("div",{ref:L,style:{width:"100%",height:"100%"},children:(0,c.jsx)("canvas",{ref:D,style:{display:"block"},children:n})})})}function d(e){return(0,c.jsx)(s.Af,{children:(0,c.jsx)(u,{...e})})}n(4433),n(1912),n(7207)},5102:(e,t,n)=>{let r,i,o,a,l;n.d(t,{B:()=>P,C:()=>Q,D:()=>J,E:()=>L,a:()=>C,b:()=>M,c:()=>eE,d:()=>eS,e:()=>el,f:()=>eU,i:()=>S,m:()=>eR,u:()=>A});var s=n(7776),c=n.t(s,2),u=n(4433),d=n(7510),f=n(1197),p=n(2657),v=n(8174);let{useSyncExternalStoreWithSelector:h}=p,m=(e,t)=>{let n=(0,v.y)(e),r=(e,r=t)=>(function(e,t=e=>e,n){let r=h(e.subscribe,e.getState,e.getInitialState,t,n);return s.useDebugValue(r),r})(n,e,r);return Object.assign(r,n),r};var g=n(7812),b=n(1912),y=n.n(b),w=n(7207),x=n(9564),E=n(8669);function _(e){let t=e.root;for(;t.getState().previousRoot;)t=t.getState().previousRoot;return t}n(5866),c.act;let S=e=>e&&e.hasOwnProperty("current"),j=e=>null!=e&&("string"==typeof e||"number"==typeof e||e.isColor),M=((e,t)=>"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative"))()?s.useLayoutEffect:s.useEffect;function C(e){let t=s.useRef(e);return M(()=>void(t.current=e),[e]),t}function A(){let e=(0,E.u5)(),t=(0,E.y3)();return s.useMemo(()=>({children:n})=>{let r=(0,E.Nz)(e,!0,e=>e.type===s.StrictMode)?s.StrictMode:s.Fragment;return(0,x.jsx)(r,{children:(0,x.jsx)(t,{children:n})})},[e,t])}function P({set:e}){return M(()=>(e(new Promise(()=>null)),()=>e(!1)),[e]),null}let L=(e=>((e=class extends s.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),e))();function T(e){var t;let n="undefined"!=typeof window?null!=(t=window.devicePixelRatio)?t:2:1;return Array.isArray(e)?Math.min(Math.max(e[0],n),e[1]):e}function D(e){var t;return null==(t=e.__r3f)?void 0:t.root.getState()}let O={obj:e=>e===Object(e)&&!O.arr(e)&&"function"!=typeof e,fun:e=>"function"==typeof e,str:e=>"string"==typeof e,num:e=>"number"==typeof e,boo:e=>"boolean"==typeof e,und:e=>void 0===e,nul:e=>null===e,arr:e=>Array.isArray(e),equ(e,t,{arrays:n="shallow",objects:r="reference",strict:i=!0}={}){let o;if(typeof e!=typeof t||!!e!=!!t)return!1;if(O.str(e)||O.num(e)||O.boo(e))return e===t;let a=O.obj(e);if(a&&"reference"===r)return e===t;let l=O.arr(e);if(l&&"reference"===n)return e===t;if((l||a)&&e===t)return!0;for(o in e)if(!(o in t))return!1;if(a&&"shallow"===n&&"shallow"===r){for(o in i?t:e)if(!O.equ(e[o],t[o],{strict:i,objects:"reference"}))return!1}else for(o in i?t:e)if(e[o]!==t[o])return!1;if(O.und(o)){if(l&&0===e.length&&0===t.length||a&&0===Object.keys(e).length&&0===Object.keys(t).length)return!0;if(e!==t)return!1}return!0}},R=["children","key","ref"];function k(e,t,n,r){let i=null==e?void 0:e.__r3f;return!i&&(i={root:t,type:n,parent:null,children:[],props:function(e){let t={};for(let n in e)R.includes(n)||(t[n]=e[n]);return t}(r),object:e,eventCount:0,handlers:{},isHidden:!1},e&&(e.__r3f=i)),i}function I(e,t){let n=e[t];if(!t.includes("-"))return{root:e,key:t,target:n};for(let i of(n=e,t.split("-"))){var r;t=i,e=n,n=null==(r=n)?void 0:r[t]}return{root:e,key:t,target:n}}let U=/-\d+$/;function z(e,t){if(O.str(t.props.attach)){if(U.test(t.props.attach)){let n=t.props.attach.replace(U,""),{root:r,key:i}=I(e.object,n);Array.isArray(r[i])||(r[i]=[])}let{root:n,key:r}=I(e.object,t.props.attach);t.previousAttach=n[r],n[r]=t.object}else O.fun(t.props.attach)&&(t.previousAttach=t.props.attach(e.object,t.object))}function N(e,t){if(O.str(t.props.attach)){let{root:n,key:r}=I(e.object,t.props.attach),i=t.previousAttach;void 0===i?delete n[r]:n[r]=i}else null==t.previousAttach||t.previousAttach(e.object,t.object);delete t.previousAttach}let F=[...R,"args","dispose","attach","object","onUpdate","dispose"],B=new Map,H=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],q=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;function G(e,t){var n,r;let i=e.__r3f,o=i&&_(i).getState(),a=null==i?void 0:i.eventCount;for(let n in t){let a=t[n];if(F.includes(n))continue;if(i&&q.test(n)){"function"==typeof a?i.handlers[n]=a:delete i.handlers[n],i.eventCount=Object.keys(i.handlers).length;continue}if(void 0===a)continue;let{root:l,key:s,target:c}=I(e,n);c instanceof d.zgK&&a instanceof d.zgK?c.mask=a.mask:c instanceof d.Q1f&&j(a)?c.set(a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&"function"==typeof c.copy&&null!=a&&a.constructor&&c.constructor===a.constructor?c.copy(a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&Array.isArray(a)?"function"==typeof c.fromArray?c.fromArray(a):c.set(...a):null!==c&&"object"==typeof c&&"function"==typeof c.set&&"number"==typeof a?"function"==typeof c.setScalar?c.setScalar(a):c.set(a):(l[s]=a,o&&!o.linear&&H.includes(s)&&null!=(r=l[s])&&r.isTexture&&l[s].format===d.GWd&&l[s].type===d.OUM&&(l[s].colorSpace=d.er$))}if(null!=i&&i.parent&&null!=o&&o.internal&&null!=(n=i.object)&&n.isObject3D&&a!==i.eventCount){let e=i.object,t=o.internal.interaction.indexOf(e);t>-1&&o.internal.interaction.splice(t,1),i.eventCount&&null!==e.raycast&&o.internal.interaction.push(e)}return i&&void 0===i.props.attach&&(i.object.isBufferGeometry?i.props.attach="geometry":i.object.isMaterial&&(i.props.attach="material")),i&&W(i),e}function W(e){var t;if(!e.parent)return;null==e.props.onUpdate||e.props.onUpdate(e.object);let n=null==(t=e.root)||null==t.getState?void 0:t.getState();n&&0===n.internal.frames&&n.invalidate()}let Y=e=>null==e?void 0:e.isObject3D;function K(e){return(e.eventObject||e.object).uuid+"/"+e.index+e.instanceId}function V(e,t,n,r){let i=n.get(t);i&&(n.delete(t),0===n.size&&(e.delete(r),i.target.releasePointerCapture(r)))}let X=e=>!!(null!=e&&e.render),$=s.createContext(null);function Z(){let e=s.useContext($);if(!e)throw Error("R3F: Hooks can only be used within the Canvas component!");return e}function Q(e=e=>e,t){return Z()(e,t)}function J(e,t=0){let n=Z(),r=n.getState().internal.subscribe,i=C(e);return M(()=>r(i,t,n),[t,r,n]),null}let ee=new WeakMap;function et(e,t){return function(n,...r){var i;let o;return"function"==typeof n&&(null==n||null==(i=n.prototype)?void 0:i.constructor)===n?(o=ee.get(n))||(o=new n,ee.set(n,o)):o=n,e&&e(o),Promise.all(r.map(e=>new Promise((n,r)=>o.load(e,e=>{Y(null==e?void 0:e.scene)&&Object.assign(e,function(e){let t={nodes:{},materials:{},meshes:{}};return e&&e.traverse(e=>{e.name&&(t.nodes[e.name]=e),e.material&&!t.materials[e.material.name]&&(t.materials[e.material.name]=e.material),e.isMesh&&!t.meshes[e.name]&&(t.meshes[e.name]=e)}),t}(e.scene)),n(e)},t,t=>r(Error(`Could not load ${e}: ${null==t?void 0:t.message}`))))))}}function en(e,t,n,r){let i=Array.isArray(t)?t:[t],o=(0,g.DY)(et(n,r),[e,...i],{equal:O.equ});return Array.isArray(t)?o:o[0]}en.preload=function(e,t,n){let r=Array.isArray(t)?t:[t];return(0,g.uv)(et(n),[e,...r])},en.clear=function(e,t){let n=Array.isArray(t)?t:[t];return(0,g.IU)([e,...n])};let er={},ei=/^three(?=[A-Z])/,eo=e=>`${e[0].toUpperCase()}${e.slice(1)}`,ea=0;function el(e){if("function"==typeof e){let t=`${ea++}`;return er[t]=e,t}Object.assign(er,e)}function es(e,t){let n=eo(e),r=er[n];if("primitive"!==e&&!r)throw Error(`R3F: ${n} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if("primitive"===e&&!t.object)throw Error("R3F: Primitives without 'object' are invalid!");if(void 0!==t.args&&!Array.isArray(t.args))throw Error("R3F: The args prop must be an array!")}function ec(e){if(e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?z(e.parent,e):Y(e.object)&&!1!==e.props.visible&&(e.object.visible=!0),e.isHidden=!1,W(e)}}function eu(e,t,n){let r=t.root.getState();if(e.parent||e.object===r.scene){if(!t.object){var i,o;let e=er[eo(t.type)];t.object=null!=(i=t.props.object)?i:new e(...null!=(o=t.props.args)?o:[]),t.object.__r3f=t}if(G(t.object,t.props),t.props.attach)z(e,t);else if(Y(t.object)&&Y(e.object)){let r=e.object.children.indexOf(null==n?void 0:n.object);if(n&&-1!==r){let n=e.object.children.indexOf(t.object);-1!==n?(e.object.children.splice(n,1),e.object.children.splice(n<r?r-1:r,0,t.object)):(t.object.parent=e.object,e.object.children.splice(r,0,t.object),t.object.dispatchEvent({type:"added"}),e.object.dispatchEvent({type:"childadded",child:t.object}))}else e.object.add(t.object)}for(let e of t.children)eu(t,e);W(t)}}function ed(e,t){t&&(t.parent=e,e.children.push(t),eu(e,t))}function ef(e,t,n){if(!t||!n)return;t.parent=e;let r=e.children.indexOf(n);-1!==r?e.children.splice(r,0,t):e.children.push(t),eu(e,t,n)}function ep(e){if("function"==typeof e.dispose){let t=()=>{try{e.dispose()}catch{}};"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?t():(0,w.unstable_scheduleCallback)(w.unstable_IdlePriority,t)}}function ev(e,t,n){if(!t)return;t.parent=null;let r=e.children.indexOf(t);-1!==r&&e.children.splice(r,1),t.props.attach?N(e,t):Y(t.object)&&Y(e.object)&&(e.object.remove(t.object),function(e,t){let{internal:n}=e.getState();n.interaction=n.interaction.filter(e=>e!==t),n.initialHits=n.initialHits.filter(e=>e!==t),n.hovered.forEach((e,r)=>{(e.eventObject===t||e.object===t)&&n.hovered.delete(r)}),n.capturedMap.forEach((e,r)=>{V(n.capturedMap,t,e,r)})}(_(t),t.object));let i=null!==t.props.dispose&&!1!==n;for(let e=t.children.length-1;e>=0;e--){let n=t.children[e];ev(t,n,i)}t.children.length=0,delete t.object.__r3f,i&&"primitive"!==t.type&&"Scene"!==t.object.type&&ep(t.object),void 0===n&&W(t)}let eh=[],em=()=>{},eg={},eb=0,ey=function(e){let t=y()(e);return t.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:s.version}),t}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(e,t,n){var r;return es(e=eo(e)in er?e:e.replace(ei,""),t),"primitive"===e&&null!=(r=t.object)&&r.__r3f&&delete t.object.__r3f,k(t.object,n,e,t)},removeChild:ev,appendChild:ed,appendInitialChild:ed,insertBefore:ef,appendChildToContainer(e,t){let n=e.getState().scene.__r3f;t&&n&&ed(n,t)},removeChildFromContainer(e,t){let n=e.getState().scene.__r3f;t&&n&&ev(n,t)},insertInContainerBefore(e,t,n){let r=e.getState().scene.__r3f;t&&n&&r&&ef(r,t,n)},getRootHostContext:()=>eg,getChildHostContext:()=>eg,commitUpdate(e,t,n,r,i){var o,a,l;es(t,r);let s=!1;if("primitive"===e.type&&n.object!==r.object||(null==(o=r.args)?void 0:o.length)!==(null==(a=n.args)?void 0:a.length)?s=!0:null!=(l=r.args)&&l.some((e,t)=>{var r;return e!==(null==(r=n.args)?void 0:r[t])})&&(s=!0),s)eh.push([e,{...r},i]);else{let t=function(e,t){let n={};for(let r in t)if(!F.includes(r)&&!O.equ(t[r],e.props[r]))for(let e in n[r]=t[r],t)e.startsWith(`${r}-`)&&(n[e]=t[e]);for(let r in e.props){if(F.includes(r)||t.hasOwnProperty(r))continue;let{root:i,key:o}=I(e.object,r);if(i.constructor&&0===i.constructor.length){let e=function(e){let t=B.get(e.constructor);try{t||(t=new e.constructor,B.set(e.constructor,t))}catch(e){}return t}(i);O.und(e)||(n[o]=e[o])}else n[o]=0}return n}(e,r);Object.keys(t).length&&(Object.assign(e.props,t),G(e.object,t))}(null===i.sibling||(4&i.flags)==0)&&function(){for(let[e]of eh){let t=e.parent;if(t)for(let n of(e.props.attach?N(t,e):Y(e.object)&&Y(t.object)&&t.object.remove(e.object),e.children))n.props.attach?N(e,n):Y(n.object)&&Y(e.object)&&e.object.remove(n.object);e.isHidden&&ec(e),e.object.__r3f&&delete e.object.__r3f,"primitive"!==e.type&&ep(e.object)}for(let[r,i,o]of eh){r.props=i;let a=r.parent;if(a){let i=er[eo(r.type)];r.object=null!=(e=r.props.object)?e:new i(...null!=(t=r.props.args)?t:[]),r.object.__r3f=r;var e,t,n=r.object;for(let e of[o,o.alternate])if(null!==e)if("function"==typeof e.ref){null==e.refCleanup||e.refCleanup();let t=e.ref(n);"function"==typeof t&&(e.refCleanup=t)}else e.ref&&(e.ref.current=n);for(let e of(G(r.object,r.props),r.props.attach?z(a,r):Y(r.object)&&Y(a.object)&&a.object.add(r.object),r.children))e.props.attach?z(r,e):Y(e.object)&&Y(r.object)&&r.object.add(e.object);W(r)}}eh.length=0}()},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:e=>null==e?void 0:e.object,prepareForCommit:()=>null,preparePortalMount:e=>k(e.getState().scene,e,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(e){if(!e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?N(e.parent,e):Y(e.object)&&(e.object.visible=!1),e.isHidden=!0,W(e)}},unhideInstance:ec,createTextInstance:em,hideTextInstance:em,unhideTextInstance:em,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:s.createContext(null),setCurrentUpdatePriority(e){eb=e},getCurrentUpdatePriority:()=>eb,resolveUpdatePriority(){var e;if(0!==eb)return eb;switch("undefined"!=typeof window&&(null==(e=window.event)?void 0:e.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return u.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return u.ContinuousEventPriority;default:return u.DefaultEventPriority}},resetFormInstance(){}}),ew=new Map,ex={objects:"shallow",strict:!1};function eE(e){let t,n,r=ew.get(e),i=null==r?void 0:r.fiber,o=null==r?void 0:r.store;r&&console.warn("R3F.createRoot should only be called once!");let a="function"==typeof reportError?reportError:console.error,l=o||((e,t)=>{let n,r,i=(n=(n,r)=>{let i,o=new d.Pq0,a=new d.Pq0,l=new d.Pq0;function c(e=r().camera,t=a,n=r().size){let{width:i,height:s,top:u,left:d}=n,f=i/s;t.isVector3?l.copy(t):l.set(...t);let p=e.getWorldPosition(o).distanceTo(l);if(e&&e.isOrthographicCamera)return{width:i/e.zoom,height:s/e.zoom,top:u,left:d,factor:1,distance:p,aspect:f};{let t=2*Math.tan(e.fov*Math.PI/180/2)*p,n=i/s*t;return{width:n,height:t,top:u,left:d,factor:i/n,distance:p,aspect:f}}}let u=e=>n(t=>({performance:{...t.performance,current:e}})),f=new d.I9Y;return{set:n,get:r,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(t=1)=>e(r(),t),advance:(e,n)=>t(e,n,r()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new d.zD7,pointer:f,mouse:f,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{let e=r();i&&clearTimeout(i),e.performance.current!==e.performance.min&&u(e.performance.min),i=setTimeout(()=>u(r().performance.max),e.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:c},setEvents:e=>n(t=>({...t,events:{...t.events,...e}})),setSize:(e,t,i=0,o=0)=>{let l=r().camera,s={width:e,height:t,top:i,left:o};n(e=>({size:s,viewport:{...e.viewport,...c(l,a,s)}}))},setDpr:e=>n(t=>{let n=T(e);return{viewport:{...t.viewport,dpr:n,initialDpr:t.viewport.initialDpr||n}}}),setFrameloop:(e="always")=>{let t=r().clock;t.stop(),t.elapsedTime=0,"never"!==e&&(t.start(),t.elapsedTime=0),n(()=>({frameloop:e}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:s.createRef(),active:!1,frames:0,priority:0,subscribe:(e,t,n)=>{let i=r().internal;return i.priority=i.priority+ +(t>0),i.subscribers.push({ref:e,priority:t,store:n}),i.subscribers=i.subscribers.sort((e,t)=>e.priority-t.priority),()=>{let n=r().internal;null!=n&&n.subscribers&&(n.priority=n.priority-(t>0),n.subscribers=n.subscribers.filter(t=>t.ref!==e))}}}}})?m(n,r):m,o=i.getState(),a=o.size,l=o.viewport.dpr,c=o.camera;return i.subscribe(()=>{let{camera:e,size:t,viewport:n,gl:r,set:o}=i.getState();if(t.width!==a.width||t.height!==a.height||n.dpr!==l){a=t,l=n.dpr,function(e,t){!e.manual&&(e&&e.isOrthographicCamera?(e.left=-(t.width/2),e.right=t.width/2,e.top=t.height/2,e.bottom=-(t.height/2)):e.aspect=t.width/t.height,e.updateProjectionMatrix())}(e,t),n.dpr>0&&r.setPixelRatio(n.dpr);let i="undefined"!=typeof HTMLCanvasElement&&r.domElement instanceof HTMLCanvasElement;r.setSize(t.width,t.height,i)}e!==c&&(c=e,o(t=>({viewport:{...t.viewport,...t.viewport.getCurrentViewport(e)}})))}),i.subscribe(t=>e(t)),i})(eR,ek),c=i||ey.createContainer(l,u.ConcurrentRoot,null,!1,null,"",a,a,a,null);r||ew.set(e,{fiber:c,store:l});let p=!1,v=null;return{async configure(r={}){var i,o;let a;v=new Promise(e=>a=e);let{gl:s,size:c,scene:u,events:h,onCreated:m,shadows:g=!1,linear:b=!1,flat:y=!1,legacy:w=!1,orthographic:x=!1,frameloop:E="always",dpr:_=[1,2],performance:S,raycaster:j,camera:M,onPointerMissed:C}=r,A=l.getState(),P=A.gl;if(!A.gl){let t={canvas:e,powerPreference:"high-performance",antialias:!0,alpha:!0},n="function"==typeof s?await s(t):s;P=X(n)?n:new f.WebGLRenderer({...t,...s}),A.set({gl:P})}let L=A.raycaster;L||A.set({raycaster:L=new d.tBo});let{params:D,...R}=j||{};if(O.equ(R,L,ex)||G(L,{...R}),O.equ(D,L.params,ex)||G(L,{params:{...L.params,...D}}),!A.camera||A.camera===n&&!O.equ(n,M,ex)){n=M;let e=null==M?void 0:M.isCamera,t=e?M:x?new d.qUd(0,0,0,0,.1,1e3):new d.ubm(75,0,.1,1e3);!e&&(t.position.z=5,M&&(G(t,M),!t.manual&&("aspect"in M||"left"in M||"right"in M||"bottom"in M||"top"in M)&&(t.manual=!0,t.updateProjectionMatrix())),A.camera||null!=M&&M.rotation||t.lookAt(0,0,0)),A.set({camera:t}),L.camera=t}if(!A.scene){let e;null!=u&&u.isScene?k(e=u,l,"",{}):(k(e=new d.Z58,l,"",{}),u&&G(e,u)),A.set({scene:e})}h&&!A.events.handlers&&A.set({events:h(l)});let I=function(e,t){if(!t&&"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement&&e.parentElement){let{width:t,height:n,top:r,left:i}=e.parentElement.getBoundingClientRect();return{width:t,height:n,top:r,left:i}}return!t&&"undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas?{width:e.width,height:e.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...t}}(e,c);if(O.equ(I,A.size,ex)||A.setSize(I.width,I.height,I.top,I.left),_&&A.viewport.dpr!==T(_)&&A.setDpr(_),A.frameloop!==E&&A.setFrameloop(E),A.onPointerMissed||A.set({onPointerMissed:C}),S&&!O.equ(S,A.performance,ex)&&A.set(e=>({performance:{...e.performance,...S}})),!A.xr){let e=(e,t)=>{let n=l.getState();"never"!==n.frameloop&&ek(e,!0,n,t)},t=()=>{let t=l.getState();t.gl.xr.enabled=t.gl.xr.isPresenting,t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting?e:null),t.gl.xr.isPresenting||eR(t)},n={connect(){let e=l.getState().gl;e.xr.addEventListener("sessionstart",t),e.xr.addEventListener("sessionend",t)},disconnect(){let e=l.getState().gl;e.xr.removeEventListener("sessionstart",t),e.xr.removeEventListener("sessionend",t)}};"function"==typeof(null==(i=P.xr)?void 0:i.addEventListener)&&n.connect(),A.set({xr:n})}if(P.shadowMap){let e=P.shadowMap.enabled,t=P.shadowMap.type;if(P.shadowMap.enabled=!!g,O.boo(g))P.shadowMap.type=d.Wk7;else if(O.str(g)){let e={basic:d.bTm,percentage:d.QP0,soft:d.Wk7,variance:d.RyA};P.shadowMap.type=null!=(o=e[g])?o:d.Wk7}else O.obj(g)&&Object.assign(P.shadowMap,g);(e!==P.shadowMap.enabled||t!==P.shadowMap.type)&&(P.shadowMap.needsUpdate=!0)}return d.ppV.enabled=!w,p||(P.outputColorSpace=b?d.Zr2:d.er$,P.toneMapping=y?d.y_p:d.FV),A.legacy!==w&&A.set(()=>({legacy:w})),A.linear!==b&&A.set(()=>({linear:b})),A.flat!==y&&A.set(()=>({flat:y})),!s||O.fun(s)||X(s)||O.equ(s,P,ex)||G(P,s),t=m,p=!0,a(),this},render(n){return p||v||this.configure(),v.then(()=>{ey.updateContainer((0,x.jsx)(e_,{store:l,children:n,onCreated:t,rootElement:e}),c,null,()=>void 0)}),l},unmount(){eS(e)}}}function e_({store:e,children:t,onCreated:n,rootElement:r}){return M(()=>{let t=e.getState();t.set(e=>({internal:{...e.internal,active:!0}})),n&&n(t),e.getState().events.connected||null==t.events.connect||t.events.connect(r)},[]),(0,x.jsx)($.Provider,{value:e,children:t})}function eS(e,t){let n=ew.get(e),r=null==n?void 0:n.fiber;if(r){let i=null==n?void 0:n.store.getState();i&&(i.internal.active=!1),ey.updateContainer(null,r,null,()=>{i&&setTimeout(()=>{try{null==i.events.disconnect||i.events.disconnect(),null==(n=i.gl)||null==(r=n.renderLists)||null==r.dispose||r.dispose(),null==(o=i.gl)||null==o.forceContextLoss||o.forceContextLoss(),null!=(a=i.gl)&&a.xr&&i.xr.disconnect();var n,r,o,a,l=i.scene;for(let e in"Scene"!==l.type&&(null==l.dispose||l.dispose()),l){let t=l[e];(null==t?void 0:t.type)!=="Scene"&&(null==t||null==t.dispose||t.dispose())}ew.delete(e),t&&t(e)}catch(e){}},500)})}}let ej=new Set,eM=new Set,eC=new Set;function eA(e,t){if(e.size)for(let{callback:n}of e.values())n(t)}function eP(e,t){switch(e){case"before":return eA(ej,t);case"after":return eA(eM,t);case"tail":return eA(eC,t)}}function eL(e,t,n){let o=t.clock.getDelta();"never"===t.frameloop&&"number"==typeof e&&(o=e-t.clock.elapsedTime,t.clock.oldTime=t.clock.elapsedTime,t.clock.elapsedTime=e),r=t.internal.subscribers;for(let e=0;e<r.length;e++)(i=r[e]).ref.current(i.store.getState(),o,n);return!t.internal.priority&&t.gl.render&&t.gl.render(t.scene,t.camera),t.internal.frames=Math.max(0,t.internal.frames-1),"always"===t.frameloop?1:t.internal.frames}let eT=!1,eD=!1;function eO(e){for(let n of(a=requestAnimationFrame(eO),eT=!0,o=0,eP("before",e),eD=!0,ew.values())){var t;(l=n.store.getState()).internal.active&&("always"===l.frameloop||l.internal.frames>0)&&!(null!=(t=l.gl.xr)&&t.isPresenting)&&(o+=eL(e,l))}if(eD=!1,eP("after",e),0===o)return eP("tail",e),eT=!1,cancelAnimationFrame(a)}function eR(e,t=1){var n;if(!e)return ew.forEach(e=>eR(e.store.getState(),t));(null==(n=e.gl.xr)||!n.isPresenting)&&e.internal.active&&"never"!==e.frameloop&&(t>1?e.internal.frames=Math.min(60,e.internal.frames+t):eD?e.internal.frames=2:e.internal.frames=1,eT||(eT=!0,requestAnimationFrame(eO)))}function ek(e,t=!0,n,r){if(t&&eP("before",e),n)eL(e,n,r);else for(let t of ew.values())eL(e,t.store.getState());t&&eP("after",e)}let eI={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function eU(e){let{handlePointer:t}=function(e){function t(e){return e.filter(e=>["Move","Over","Enter","Out","Leave"].some(t=>{var n;return null==(n=e.__r3f)?void 0:n.handlers["onPointer"+t]}))}function n(t){let{internal:n}=e.getState();for(let e of n.hovered.values())if(!t.length||!t.find(t=>t.object===e.object&&t.index===e.index&&t.instanceId===e.instanceId)){let r=e.eventObject.__r3f;if(n.hovered.delete(K(e)),null!=r&&r.eventCount){let n=r.handlers,i={...e,intersections:t};null==n.onPointerOut||n.onPointerOut(i),null==n.onPointerLeave||n.onPointerLeave(i)}}}function r(e,t){for(let n=0;n<t.length;n++){let r=t[n].__r3f;null==r||null==r.handlers.onPointerMissed||r.handlers.onPointerMissed(e)}}return{handlePointer:function(i){switch(i){case"onPointerLeave":case"onPointerCancel":return()=>n([]);case"onLostPointerCapture":return t=>{let{internal:r}=e.getState();"pointerId"in t&&r.capturedMap.has(t.pointerId)&&requestAnimationFrame(()=>{r.capturedMap.has(t.pointerId)&&(r.capturedMap.delete(t.pointerId),n([]))})}}return function(o){let{onPointerMissed:a,internal:l}=e.getState();l.lastEvent.current=o;let s="onPointerMove"===i,c="onClick"===i||"onContextMenu"===i||"onDoubleClick"===i,u=function(t,n){let r=e.getState(),i=new Set,o=[],a=n?n(r.internal.interaction):r.internal.interaction;for(let e=0;e<a.length;e++){let t=D(a[e]);t&&(t.raycaster.camera=void 0)}r.previousRoot||null==r.events.compute||r.events.compute(t,r);let l=a.flatMap(function(e){let n=D(e);if(!n||!n.events.enabled||null===n.raycaster.camera)return[];if(void 0===n.raycaster.camera){var r;null==n.events.compute||n.events.compute(t,n,null==(r=n.previousRoot)?void 0:r.getState()),void 0===n.raycaster.camera&&(n.raycaster.camera=null)}return n.raycaster.camera?n.raycaster.intersectObject(e,!0):[]}).sort((e,t)=>{let n=D(e.object),r=D(t.object);return n&&r&&r.events.priority-n.events.priority||e.distance-t.distance}).filter(e=>{let t=K(e);return!i.has(t)&&(i.add(t),!0)});for(let e of(r.events.filter&&(l=r.events.filter(l,r)),l)){let t=e.object;for(;t;){var s;null!=(s=t.__r3f)&&s.eventCount&&o.push({...e,eventObject:t}),t=t.parent}}if("pointerId"in t&&r.internal.capturedMap.has(t.pointerId))for(let e of r.internal.capturedMap.get(t.pointerId).values())i.has(K(e.intersection))||o.push(e.intersection);return o}(o,s?t:void 0),f=c?function(t){let{internal:n}=e.getState(),r=t.offsetX-n.initialClick[0],i=t.offsetY-n.initialClick[1];return Math.round(Math.sqrt(r*r+i*i))}(o):0;"onPointerDown"===i&&(l.initialClick=[o.offsetX,o.offsetY],l.initialHits=u.map(e=>e.eventObject)),c&&!u.length&&f<=2&&(r(o,l.interaction),a&&a(o)),s&&n(u),!function(e,t,r,i){if(e.length){let o={stopped:!1};for(let a of e){let l=D(a.object);if(l||a.object.traverseAncestors(e=>{let t=D(e);if(t)return l=t,!1}),l){let{raycaster:s,pointer:c,camera:u,internal:f}=l,p=new d.Pq0(c.x,c.y,0).unproject(u),v=e=>{var t,n;return null!=(t=null==(n=f.capturedMap.get(e))?void 0:n.has(a.eventObject))&&t},h=e=>{let n={intersection:a,target:t.target};f.capturedMap.has(e)?f.capturedMap.get(e).set(a.eventObject,n):f.capturedMap.set(e,new Map([[a.eventObject,n]])),t.target.setPointerCapture(e)},m=e=>{let t=f.capturedMap.get(e);t&&V(f.capturedMap,a.eventObject,t,e)},g={};for(let e in t){let n=t[e];"function"!=typeof n&&(g[e]=n)}let b={...a,...g,pointer:c,intersections:e,stopped:o.stopped,delta:r,unprojectedPoint:p,ray:s.ray,camera:u,stopPropagation(){let r="pointerId"in t&&f.capturedMap.get(t.pointerId);(!r||r.has(a.eventObject))&&(b.stopped=o.stopped=!0,f.hovered.size&&Array.from(f.hovered.values()).find(e=>e.eventObject===a.eventObject)&&n([...e.slice(0,e.indexOf(a)),a]))},target:{hasPointerCapture:v,setPointerCapture:h,releasePointerCapture:m},currentTarget:{hasPointerCapture:v,setPointerCapture:h,releasePointerCapture:m},nativeEvent:t};if(i(b),!0===o.stopped)break}}}}(u,o,f,function(e){let t=e.eventObject,n=t.__r3f;if(!(null!=n&&n.eventCount))return;let a=n.handlers;if(s){if(a.onPointerOver||a.onPointerEnter||a.onPointerOut||a.onPointerLeave){let t=K(e),n=l.hovered.get(t);n?n.stopped&&e.stopPropagation():(l.hovered.set(t,e),null==a.onPointerOver||a.onPointerOver(e),null==a.onPointerEnter||a.onPointerEnter(e))}null==a.onPointerMove||a.onPointerMove(e)}else{let n=a[i];n?(!c||l.initialHits.includes(t))&&(r(o,l.interaction.filter(e=>!l.initialHits.includes(e))),n(e)):c&&l.initialHits.includes(t)&&r(o,l.interaction.filter(e=>!l.initialHits.includes(e)))}})}}}}(e);return{priority:1,enabled:!0,compute(e,t,n){t.pointer.set(e.offsetX/t.size.width*2-1,-(2*(e.offsetY/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)},connected:void 0,handlers:Object.keys(eI).reduce((e,n)=>({...e,[n]:t(n)}),{}),update:()=>{var t;let{events:n,internal:r}=e.getState();null!=(t=r.lastEvent)&&t.current&&n.handlers&&n.handlers.onPointerMove(r.lastEvent.current)},connect:t=>{let{set:n,events:r}=e.getState();if(null==r.disconnect||r.disconnect(),n(e=>({events:{...e.events,connected:t}})),r.handlers)for(let e in r.handlers){let n=r.handlers[e],[i,o]=eI[e];t.addEventListener(i,n,{passive:o})}},disconnect:()=>{let{set:t,events:n}=e.getState();if(n.connected){if(n.handlers)for(let e in n.handlers){let t=n.handlers[e],[r]=eI[e];n.connected.removeEventListener(r,t)}t(e=>({events:{...e.events,connected:void 0}}))}}}}},5442:(e,t,n)=>{n.d(t,{UC:()=>e8,YJ:()=>te,q7:()=>tt,ZL:()=>e9,bL:()=>e6,wv:()=>tn,l9:()=>e7});var r=n(7776),i=n(6773),o=n(410),a=n(3520),l=n(6739),s=n(5176),c=n(6139),u=n(5315),d=n(8394),f=n(5285),p=n(2930),v=n(591),h=n(5455),m=n(6027),g=n(5812),b=n(8231),y=n(9564),w="rovingFocusGroup.onEntryFocus",x={bubbles:!1,cancelable:!0},E="RovingFocusGroup",[_,S,j]=(0,c.N)(E),[M,C]=(0,a.A)(E,[j]),[A,P]=M(E),L=r.forwardRef((e,t)=>(0,y.jsx)(_.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,y.jsx)(_.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,y.jsx)(T,{...e,ref:t})})}));L.displayName=E;var T=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:a,loop:c=!1,dir:d,currentTabStopId:f,defaultCurrentTabStopId:p,onCurrentTabStopIdChange:v,onEntryFocus:h,preventScrollOnEntryFocus:m=!1,...g}=e,_=r.useRef(null),j=(0,o.s)(t,_),M=(0,u.jH)(d),[C,P]=(0,l.i)({prop:f,defaultProp:null!=p?p:null,onChange:v,caller:E}),[L,T]=r.useState(!1),D=(0,b.c)(h),O=S(n),R=r.useRef(!1),[I,U]=r.useState(0);return r.useEffect(()=>{let e=_.current;if(e)return e.addEventListener(w,D),()=>e.removeEventListener(w,D)},[D]),(0,y.jsx)(A,{scope:n,orientation:a,dir:M,loop:c,currentTabStopId:C,onItemFocus:r.useCallback(e=>P(e),[P]),onItemShiftTab:r.useCallback(()=>T(!0),[]),onFocusableItemAdd:r.useCallback(()=>U(e=>e+1),[]),onFocusableItemRemove:r.useCallback(()=>U(e=>e-1),[]),children:(0,y.jsx)(s.sG.div,{tabIndex:L||0===I?-1:0,"data-orientation":a,...g,ref:j,style:{outline:"none",...e.style},onMouseDown:(0,i.mK)(e.onMouseDown,()=>{R.current=!0}),onFocus:(0,i.mK)(e.onFocus,e=>{let t=!R.current;if(e.target===e.currentTarget&&t&&!L){let t=new CustomEvent(w,x);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=O().filter(e=>e.focusable);k([e.find(e=>e.active),e.find(e=>e.id===C),...e].filter(Boolean).map(e=>e.ref.current),m)}}R.current=!1}),onBlur:(0,i.mK)(e.onBlur,()=>T(!1))})})}),D="RovingFocusGroupItem",O=r.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:o=!0,active:a=!1,tabStopId:l,children:c,...u}=e,d=(0,v.B)(),f=l||d,p=P(D,n),h=p.currentTabStopId===f,m=S(n),{onFocusableItemAdd:g,onFocusableItemRemove:b,currentTabStopId:w}=p;return r.useEffect(()=>{if(o)return g(),()=>b()},[o,g,b]),(0,y.jsx)(_.ItemSlot,{scope:n,id:f,focusable:o,active:a,children:(0,y.jsx)(s.sG.span,{tabIndex:h?0:-1,"data-orientation":p.orientation,...u,ref:t,onMouseDown:(0,i.mK)(e.onMouseDown,e=>{o?p.onItemFocus(f):e.preventDefault()}),onFocus:(0,i.mK)(e.onFocus,()=>p.onItemFocus(f)),onKeyDown:(0,i.mK)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey)return void p.onItemShiftTab();if(e.target!==e.currentTarget)return;let t=function(e,t,n){var r;let i=(r=e.key,"rtl"!==n?r:"ArrowLeft"===r?"ArrowRight":"ArrowRight"===r?"ArrowLeft":r);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(i))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(i)))return R[i]}(e,p.orientation,p.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let n=m().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)n.reverse();else if("prev"===t||"next"===t){"prev"===t&&n.reverse();let r=n.indexOf(e.currentTarget);n=p.loop?function(e,t){return e.map((n,r)=>e[(t+r)%e.length])}(n,r+1):n.slice(r+1)}setTimeout(()=>k(n))}}),children:"function"==typeof c?c({isCurrentTabStop:h,hasTabStop:null!=w}):c})})});O.displayName=D;var R={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function k(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.activeElement;for(let r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}var I=n(5536),U=n(517),z=n(172),N=["Enter"," "],F=["ArrowUp","PageDown","End"],B=["ArrowDown","PageUp","Home",...F],H={ltr:[...N,"ArrowRight"],rtl:[...N,"ArrowLeft"]},q={ltr:["ArrowLeft"],rtl:["ArrowRight"]},G="Menu",[W,Y,K]=(0,c.N)(G),[V,X]=(0,a.A)(G,[K,h.Bk,C]),$=(0,h.Bk)(),Z=C(),[Q,J]=V(G),[ee,et]=V(G),en=e=>{let{__scopeMenu:t,open:n=!1,children:i,dir:o,onOpenChange:a,modal:l=!0}=e,s=$(t),[c,d]=r.useState(null),f=r.useRef(!1),p=(0,b.c)(a),v=(0,u.jH)(o);return r.useEffect(()=>{let e=()=>{f.current=!0,document.addEventListener("pointerdown",t,{capture:!0,once:!0}),document.addEventListener("pointermove",t,{capture:!0,once:!0})},t=()=>f.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",t,{capture:!0}),document.removeEventListener("pointermove",t,{capture:!0})}},[]),(0,y.jsx)(h.bL,{...s,children:(0,y.jsx)(Q,{scope:t,open:n,onOpenChange:p,content:c,onContentChange:d,children:(0,y.jsx)(ee,{scope:t,onClose:r.useCallback(()=>p(!1),[p]),isUsingKeyboardRef:f,dir:v,modal:l,children:i})})})};en.displayName=G;var er=r.forwardRef((e,t)=>{let{__scopeMenu:n,...r}=e,i=$(n);return(0,y.jsx)(h.Mz,{...i,...r,ref:t})});er.displayName="MenuAnchor";var ei="MenuPortal",[eo,ea]=V(ei,{forceMount:void 0}),el=e=>{let{__scopeMenu:t,forceMount:n,children:r,container:i}=e,o=J(ei,t);return(0,y.jsx)(eo,{scope:t,forceMount:n,children:(0,y.jsx)(g.C,{present:n||o.open,children:(0,y.jsx)(m.Z,{asChild:!0,container:i,children:r})})})};el.displayName=ei;var es="MenuContent",[ec,eu]=V(es),ed=r.forwardRef((e,t)=>{let n=ea(es,e.__scopeMenu),{forceMount:r=n.forceMount,...i}=e,o=J(es,e.__scopeMenu),a=et(es,e.__scopeMenu);return(0,y.jsx)(W.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(g.C,{present:r||o.open,children:(0,y.jsx)(W.Slot,{scope:e.__scopeMenu,children:a.modal?(0,y.jsx)(ef,{...i,ref:t}):(0,y.jsx)(ep,{...i,ref:t})})})})}),ef=r.forwardRef((e,t)=>{let n=J(es,e.__scopeMenu),a=r.useRef(null),l=(0,o.s)(t,a);return r.useEffect(()=>{let e=a.current;if(e)return(0,U.Eq)(e)},[]),(0,y.jsx)(eh,{...e,ref:l,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:(0,i.mK)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),ep=r.forwardRef((e,t)=>{let n=J(es,e.__scopeMenu);return(0,y.jsx)(eh,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),ev=(0,I.TL)("MenuContent.ScrollLock"),eh=r.forwardRef((e,t)=>{let{__scopeMenu:n,loop:a=!1,trapFocus:l,onOpenAutoFocus:s,onCloseAutoFocus:c,disableOutsidePointerEvents:u,onEntryFocus:v,onEscapeKeyDown:m,onPointerDownOutside:g,onFocusOutside:b,onInteractOutside:w,onDismiss:x,disableOutsideScroll:E,..._}=e,S=J(es,n),j=et(es,n),M=$(n),C=Z(n),A=Y(n),[P,T]=r.useState(null),D=r.useRef(null),O=(0,o.s)(t,D,S.onContentChange),R=r.useRef(0),k=r.useRef(""),I=r.useRef(0),U=r.useRef(null),N=r.useRef("right"),H=r.useRef(0),q=E?z.A:r.Fragment;r.useEffect(()=>()=>window.clearTimeout(R.current),[]),(0,f.Oh)();let G=r.useCallback(e=>{var t,n;return N.current===(null==(t=U.current)?void 0:t.side)&&function(e,t){return!!t&&function(e,t){let{x:n,y:r}=e,i=!1;for(let e=0,o=t.length-1;e<t.length;o=e++){let a=t[e],l=t[o],s=a.x,c=a.y,u=l.x,d=l.y;c>r!=d>r&&n<(u-s)*(r-c)/(d-c)+s&&(i=!i)}return i}({x:e.clientX,y:e.clientY},t)}(e,null==(n=U.current)?void 0:n.area)},[]);return(0,y.jsx)(ec,{scope:n,searchRef:k,onItemEnter:r.useCallback(e=>{G(e)&&e.preventDefault()},[G]),onItemLeave:r.useCallback(e=>{var t;G(e)||(null==(t=D.current)||t.focus(),T(null))},[G]),onTriggerLeave:r.useCallback(e=>{G(e)&&e.preventDefault()},[G]),pointerGraceTimerRef:I,onPointerGraceIntentChange:r.useCallback(e=>{U.current=e},[]),children:(0,y.jsx)(q,{...E?{as:ev,allowPinchZoom:!0}:void 0,children:(0,y.jsx)(p.n,{asChild:!0,trapped:l,onMountAutoFocus:(0,i.mK)(s,e=>{var t;e.preventDefault(),null==(t=D.current)||t.focus({preventScroll:!0})}),onUnmountAutoFocus:c,children:(0,y.jsx)(d.qW,{asChild:!0,disableOutsidePointerEvents:u,onEscapeKeyDown:m,onPointerDownOutside:g,onFocusOutside:b,onInteractOutside:w,onDismiss:x,children:(0,y.jsx)(L,{asChild:!0,...C,dir:j.dir,orientation:"vertical",loop:a,currentTabStopId:P,onCurrentTabStopIdChange:T,onEntryFocus:(0,i.mK)(v,e=>{j.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,y.jsx)(h.UC,{role:"menu","aria-orientation":"vertical","data-state":eB(S.open),"data-radix-menu-content":"",dir:j.dir,...M,..._,ref:O,style:{outline:"none",..._.style},onKeyDown:(0,i.mK)(_.onKeyDown,e=>{let t=e.target.closest("[data-radix-menu-content]")===e.currentTarget,n=e.ctrlKey||e.altKey||e.metaKey,r=1===e.key.length;t&&("Tab"===e.key&&e.preventDefault(),!n&&r&&(e=>{var t,n;let r=k.current+e,i=A().filter(e=>!e.disabled),o=document.activeElement,a=null==(t=i.find(e=>e.ref.current===o))?void 0:t.textValue,l=function(e,t,n){var r;let i=t.length>1&&Array.from(t).every(e=>e===t[0])?t[0]:t,o=n?e.indexOf(n):-1,a=(r=Math.max(o,0),e.map((t,n)=>e[(r+n)%e.length]));1===i.length&&(a=a.filter(e=>e!==n));let l=a.find(e=>e.toLowerCase().startsWith(i.toLowerCase()));return l!==n?l:void 0}(i.map(e=>e.textValue),r,a),s=null==(n=i.find(e=>e.textValue===l))?void 0:n.ref.current;!function e(t){k.current=t,window.clearTimeout(R.current),""!==t&&(R.current=window.setTimeout(()=>e(""),1e3))}(r),s&&setTimeout(()=>s.focus())})(e.key));let i=D.current;if(e.target!==i||!B.includes(e.key))return;e.preventDefault();let o=A().filter(e=>!e.disabled).map(e=>e.ref.current);F.includes(e.key)&&o.reverse(),function(e){let t=document.activeElement;for(let n of e)if(n===t||(n.focus(),document.activeElement!==t))return}(o)}),onBlur:(0,i.mK)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(R.current),k.current="")}),onPointerMove:(0,i.mK)(e.onPointerMove,eG(e=>{let t=e.target,n=H.current!==e.clientX;e.currentTarget.contains(t)&&n&&(N.current=e.clientX>H.current?"right":"left",H.current=e.clientX)}))})})})})})})});ed.displayName=es;var em=r.forwardRef((e,t)=>{let{__scopeMenu:n,...r}=e;return(0,y.jsx)(s.sG.div,{role:"group",...r,ref:t})});em.displayName="MenuGroup";var eg=r.forwardRef((e,t)=>{let{__scopeMenu:n,...r}=e;return(0,y.jsx)(s.sG.div,{...r,ref:t})});eg.displayName="MenuLabel";var eb="MenuItem",ey="menu.itemSelect",ew=r.forwardRef((e,t)=>{let{disabled:n=!1,onSelect:a,...l}=e,c=r.useRef(null),u=et(eb,e.__scopeMenu),d=eu(eb,e.__scopeMenu),f=(0,o.s)(t,c),p=r.useRef(!1);return(0,y.jsx)(ex,{...l,ref:f,disabled:n,onClick:(0,i.mK)(e.onClick,()=>{let e=c.current;if(!n&&e){let t=new CustomEvent(ey,{bubbles:!0,cancelable:!0});e.addEventListener(ey,e=>null==a?void 0:a(e),{once:!0}),(0,s.hO)(e,t),t.defaultPrevented?p.current=!1:u.onClose()}}),onPointerDown:t=>{var n;null==(n=e.onPointerDown)||n.call(e,t),p.current=!0},onPointerUp:(0,i.mK)(e.onPointerUp,e=>{var t;p.current||null==(t=e.currentTarget)||t.click()}),onKeyDown:(0,i.mK)(e.onKeyDown,e=>{let t=""!==d.searchRef.current;n||t&&" "===e.key||N.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});ew.displayName=eb;var ex=r.forwardRef((e,t)=>{let{__scopeMenu:n,disabled:a=!1,textValue:l,...c}=e,u=eu(eb,n),d=Z(n),f=r.useRef(null),p=(0,o.s)(t,f),[v,h]=r.useState(!1),[m,g]=r.useState("");return r.useEffect(()=>{let e=f.current;if(e){var t;g((null!=(t=e.textContent)?t:"").trim())}},[c.children]),(0,y.jsx)(W.ItemSlot,{scope:n,disabled:a,textValue:null!=l?l:m,children:(0,y.jsx)(O,{asChild:!0,...d,focusable:!a,children:(0,y.jsx)(s.sG.div,{role:"menuitem","data-highlighted":v?"":void 0,"aria-disabled":a||void 0,"data-disabled":a?"":void 0,...c,ref:p,onPointerMove:(0,i.mK)(e.onPointerMove,eG(e=>{a?u.onItemLeave(e):(u.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,i.mK)(e.onPointerLeave,eG(e=>u.onItemLeave(e))),onFocus:(0,i.mK)(e.onFocus,()=>h(!0)),onBlur:(0,i.mK)(e.onBlur,()=>h(!1))})})})}),eE=r.forwardRef((e,t)=>{let{checked:n=!1,onCheckedChange:r,...o}=e;return(0,y.jsx)(eL,{scope:e.__scopeMenu,checked:n,children:(0,y.jsx)(ew,{role:"menuitemcheckbox","aria-checked":eH(n)?"mixed":n,...o,ref:t,"data-state":eq(n),onSelect:(0,i.mK)(o.onSelect,()=>null==r?void 0:r(!!eH(n)||!n),{checkForDefaultPrevented:!1})})})});eE.displayName="MenuCheckboxItem";var e_="MenuRadioGroup",[eS,ej]=V(e_,{value:void 0,onValueChange:()=>{}}),eM=r.forwardRef((e,t)=>{let{value:n,onValueChange:r,...i}=e,o=(0,b.c)(r);return(0,y.jsx)(eS,{scope:e.__scopeMenu,value:n,onValueChange:o,children:(0,y.jsx)(em,{...i,ref:t})})});eM.displayName=e_;var eC="MenuRadioItem",eA=r.forwardRef((e,t)=>{let{value:n,...r}=e,o=ej(eC,e.__scopeMenu),a=n===o.value;return(0,y.jsx)(eL,{scope:e.__scopeMenu,checked:a,children:(0,y.jsx)(ew,{role:"menuitemradio","aria-checked":a,...r,ref:t,"data-state":eq(a),onSelect:(0,i.mK)(r.onSelect,()=>{var e;return null==(e=o.onValueChange)?void 0:e.call(o,n)},{checkForDefaultPrevented:!1})})})});eA.displayName=eC;var eP="MenuItemIndicator",[eL,eT]=V(eP,{checked:!1}),eD=r.forwardRef((e,t)=>{let{__scopeMenu:n,forceMount:r,...i}=e,o=eT(eP,n);return(0,y.jsx)(g.C,{present:r||eH(o.checked)||!0===o.checked,children:(0,y.jsx)(s.sG.span,{...i,ref:t,"data-state":eq(o.checked)})})});eD.displayName=eP;var eO=r.forwardRef((e,t)=>{let{__scopeMenu:n,...r}=e;return(0,y.jsx)(s.sG.div,{role:"separator","aria-orientation":"horizontal",...r,ref:t})});eO.displayName="MenuSeparator";var eR=r.forwardRef((e,t)=>{let{__scopeMenu:n,...r}=e,i=$(n);return(0,y.jsx)(h.i3,{...i,...r,ref:t})});eR.displayName="MenuArrow";var[ek,eI]=V("MenuSub"),eU="MenuSubTrigger",ez=r.forwardRef((e,t)=>{let n=J(eU,e.__scopeMenu),a=et(eU,e.__scopeMenu),l=eI(eU,e.__scopeMenu),s=eu(eU,e.__scopeMenu),c=r.useRef(null),{pointerGraceTimerRef:u,onPointerGraceIntentChange:d}=s,f={__scopeMenu:e.__scopeMenu},p=r.useCallback(()=>{c.current&&window.clearTimeout(c.current),c.current=null},[]);return r.useEffect(()=>p,[p]),r.useEffect(()=>{let e=u.current;return()=>{window.clearTimeout(e),d(null)}},[u,d]),(0,y.jsx)(er,{asChild:!0,...f,children:(0,y.jsx)(ex,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":l.contentId,"data-state":eB(n.open),...e,ref:(0,o.t)(t,l.onTriggerChange),onClick:t=>{var r;null==(r=e.onClick)||r.call(e,t),e.disabled||t.defaultPrevented||(t.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:(0,i.mK)(e.onPointerMove,eG(t=>{s.onItemEnter(t),!t.defaultPrevented&&(e.disabled||n.open||c.current||(s.onPointerGraceIntentChange(null),c.current=window.setTimeout(()=>{n.onOpenChange(!0),p()},100)))})),onPointerLeave:(0,i.mK)(e.onPointerLeave,eG(e=>{var t,r;p();let i=null==(t=n.content)?void 0:t.getBoundingClientRect();if(i){let t=null==(r=n.content)?void 0:r.dataset.side,o="right"===t,a=i[o?"left":"right"],l=i[o?"right":"left"];s.onPointerGraceIntentChange({area:[{x:e.clientX+(o?-5:5),y:e.clientY},{x:a,y:i.top},{x:l,y:i.top},{x:l,y:i.bottom},{x:a,y:i.bottom}],side:t}),window.clearTimeout(u.current),u.current=window.setTimeout(()=>s.onPointerGraceIntentChange(null),300)}else{if(s.onTriggerLeave(e),e.defaultPrevented)return;s.onPointerGraceIntentChange(null)}})),onKeyDown:(0,i.mK)(e.onKeyDown,t=>{let r=""!==s.searchRef.current;if(!e.disabled&&(!r||" "!==t.key)&&H[a.dir].includes(t.key)){var i;n.onOpenChange(!0),null==(i=n.content)||i.focus(),t.preventDefault()}})})})});ez.displayName=eU;var eN="MenuSubContent",eF=r.forwardRef((e,t)=>{let n=ea(es,e.__scopeMenu),{forceMount:a=n.forceMount,...l}=e,s=J(es,e.__scopeMenu),c=et(es,e.__scopeMenu),u=eI(eN,e.__scopeMenu),d=r.useRef(null),f=(0,o.s)(t,d);return(0,y.jsx)(W.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(g.C,{present:a||s.open,children:(0,y.jsx)(W.Slot,{scope:e.__scopeMenu,children:(0,y.jsx)(eh,{id:u.contentId,"aria-labelledby":u.triggerId,...l,ref:f,align:"start",side:"rtl"===c.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{var t;c.isUsingKeyboardRef.current&&(null==(t=d.current)||t.focus()),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,i.mK)(e.onFocusOutside,e=>{e.target!==u.trigger&&s.onOpenChange(!1)}),onEscapeKeyDown:(0,i.mK)(e.onEscapeKeyDown,e=>{c.onClose(),e.preventDefault()}),onKeyDown:(0,i.mK)(e.onKeyDown,e=>{let t=e.currentTarget.contains(e.target),n=q[c.dir].includes(e.key);if(t&&n){var r;s.onOpenChange(!1),null==(r=u.trigger)||r.focus(),e.preventDefault()}})})})})})});function eB(e){return e?"open":"closed"}function eH(e){return"indeterminate"===e}function eq(e){return eH(e)?"indeterminate":e?"checked":"unchecked"}function eG(e){return t=>"mouse"===t.pointerType?e(t):void 0}eF.displayName=eN;var eW="DropdownMenu",[eY,eK]=(0,a.A)(eW,[X]),eV=X(),[eX,e$]=eY(eW),eZ=e=>{let{__scopeDropdownMenu:t,children:n,dir:i,open:o,defaultOpen:a,onOpenChange:s,modal:c=!0}=e,u=eV(t),d=r.useRef(null),[f,p]=(0,l.i)({prop:o,defaultProp:null!=a&&a,onChange:s,caller:eW});return(0,y.jsx)(eX,{scope:t,triggerId:(0,v.B)(),triggerRef:d,contentId:(0,v.B)(),open:f,onOpenChange:p,onOpenToggle:r.useCallback(()=>p(e=>!e),[p]),modal:c,children:(0,y.jsx)(en,{...u,open:f,onOpenChange:p,dir:i,modal:c,children:n})})};eZ.displayName=eW;var eQ="DropdownMenuTrigger",eJ=r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,disabled:r=!1,...a}=e,l=e$(eQ,n),c=eV(n);return(0,y.jsx)(er,{asChild:!0,...c,children:(0,y.jsx)(s.sG.button,{type:"button",id:l.triggerId,"aria-haspopup":"menu","aria-expanded":l.open,"aria-controls":l.open?l.contentId:void 0,"data-state":l.open?"open":"closed","data-disabled":r?"":void 0,disabled:r,...a,ref:(0,o.t)(t,l.triggerRef),onPointerDown:(0,i.mK)(e.onPointerDown,e=>{!r&&0===e.button&&!1===e.ctrlKey&&(l.onOpenToggle(),l.open||e.preventDefault())}),onKeyDown:(0,i.mK)(e.onKeyDown,e=>{!r&&(["Enter"," "].includes(e.key)&&l.onOpenToggle(),"ArrowDown"===e.key&&l.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(e.key)&&e.preventDefault())})})})});eJ.displayName=eQ;var e1=e=>{let{__scopeDropdownMenu:t,...n}=e,r=eV(t);return(0,y.jsx)(el,{...r,...n})};e1.displayName="DropdownMenuPortal";var e0="DropdownMenuContent",e2=r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...o}=e,a=e$(e0,n),l=eV(n),s=r.useRef(!1);return(0,y.jsx)(ed,{id:a.contentId,"aria-labelledby":a.triggerId,...l,...o,ref:t,onCloseAutoFocus:(0,i.mK)(e.onCloseAutoFocus,e=>{var t;s.current||null==(t=a.triggerRef.current)||t.focus(),s.current=!1,e.preventDefault()}),onInteractOutside:(0,i.mK)(e.onInteractOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey,r=2===t.button||n;(!a.modal||r)&&(s.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});e2.displayName=e0;var e3=r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(em,{...i,...r,ref:t})});e3.displayName="DropdownMenuGroup",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eg,{...i,...r,ref:t})}).displayName="DropdownMenuLabel";var e4=r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(ew,{...i,...r,ref:t})});e4.displayName="DropdownMenuItem",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eE,{...i,...r,ref:t})}).displayName="DropdownMenuCheckboxItem",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eM,{...i,...r,ref:t})}).displayName="DropdownMenuRadioGroup",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eA,{...i,...r,ref:t})}).displayName="DropdownMenuRadioItem",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eD,{...i,...r,ref:t})}).displayName="DropdownMenuItemIndicator";var e5=r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eO,{...i,...r,ref:t})});e5.displayName="DropdownMenuSeparator",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eR,{...i,...r,ref:t})}).displayName="DropdownMenuArrow",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(ez,{...i,...r,ref:t})}).displayName="DropdownMenuSubTrigger",r.forwardRef((e,t)=>{let{__scopeDropdownMenu:n,...r}=e,i=eV(n);return(0,y.jsx)(eF,{...i,...r,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})}).displayName="DropdownMenuSubContent";var e6=eZ,e7=eJ,e9=e1,e8=e2,te=e3,tt=e4,tn=e5},6350:(e,t,n)=>{n.d(t,{E:()=>s});var r=n(827),i=n(7776),o=n(6625),a=n(5102),l=n(7812);let s=i.forwardRef(({sdfGlyphSize:e=64,anchorX:t="center",anchorY:n="middle",font:s,fontSize:c=1,children:u,characters:d,onSync:f,...p},v)=>{let h=(0,a.C)(({invalidate:e})=>e),[m]=i.useState(()=>new o.EY),[g,b]=i.useMemo(()=>{let e=[],t="";return i.Children.forEach(u,n=>{"string"==typeof n||"number"==typeof n?t+=n:e.push(n)}),[e,t]},[u]);return(0,l.DY)(()=>new Promise(e=>(0,o.PY)({font:s,characters:d},e)),["troika-text",s,d]),i.useLayoutEffect(()=>void m.sync(()=>{h(),f&&f(m)})),i.useEffect(()=>()=>m.dispose(),[m]),i.createElement("primitive",(0,r.A)({object:m,ref:v,font:s,text:b,anchorX:t,anchorY:n,fontSize:c,sdfGlyphSize:e},p),g)})},6619:(e,t,n)=>{e.exports=n(8255)},7207:(e,t,n)=>{e.exports=n(28)},7812:(e,t,n)=>{n.d(t,{DY:()=>a,IU:()=>s,uv:()=>l});let r=[];function i(e,t,n=(e,t)=>e===t){if(e===t)return!0;if(!e||!t)return!1;let r=e.length;if(t.length!==r)return!1;for(let i=0;i<r;i++)if(!n(e[i],t[i]))return!1;return!0}function o(e,t=null,n=!1,a={}){for(let o of(null===t&&(t=[e]),r))if(i(t,o.keys,o.equal)){if(n)return;if(Object.prototype.hasOwnProperty.call(o,"error"))throw o.error;if(Object.prototype.hasOwnProperty.call(o,"response"))return a.lifespan&&a.lifespan>0&&(o.timeout&&clearTimeout(o.timeout),o.timeout=setTimeout(o.remove,a.lifespan)),o.response;if(!n)throw o.promise}let l={keys:t,equal:a.equal,remove:()=>{let e=r.indexOf(l);-1!==e&&r.splice(e,1)},promise:("object"==typeof e&&"function"==typeof e.then?e:e(...t)).then(e=>{l.response=e,a.lifespan&&a.lifespan>0&&(l.timeout=setTimeout(l.remove,a.lifespan))}).catch(e=>l.error=e)};if(r.push(l),!n)throw l.promise}let a=(e,t,n)=>o(e,t,!1,n),l=(e,t,n)=>void o(e,t,!0,n),s=e=>{if(void 0===e||0===e.length)r.splice(0,r.length);else{let t=r.find(t=>i(e,t.keys,t.equal));t&&t.remove()}}},8255:(e,t,n)=>{var r=n(7776),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=r.useState,a=r.useEffect,l=r.useLayoutEffect,s=r.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!i(e,n)}catch(e){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=o({inst:{value:n,getSnapshot:t}}),i=r[0].inst,u=r[1];return l(function(){i.value=n,i.getSnapshot=t,c(i)&&u({inst:i})},[e,n,t]),a(function(){return c(i)&&u({inst:i}),e(function(){c(i)&&u({inst:i})})},[e]),s(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:u},8669:(e,t,n)=>{n.d(t,{Af:()=>l,Nz:()=>i,u5:()=>s,y3:()=>d});var r=n(7776);function i(e,t,n){if(!e)return;if(!0===n(e))return e;let r=t?e.return:e.child;for(;r;){let e=i(r,t,n);if(e)return e;r=t?null:r.sibling}}function o(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}(()=>{var e,t;return"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative")})()?r.useLayoutEffect:r.useEffect;let a=o(r.createContext(null));class l extends r.Component{render(){return r.createElement(a.Provider,{value:this._reactInternals},this.props.children)}}function s(){let e=r.useContext(a);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=r.useId();return r.useMemo(()=>{for(let n of[e,null==e?void 0:e.alternate]){if(!n)continue;let e=i(n,!1,e=>{let n=e.memoizedState;for(;n;){if(n.memoizedState===t)return!0;n=n.next}});if(e)return e}},[e,t])}let c=Symbol.for("react.context"),u=e=>null!==e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===c;function d(){let e=function(){let e=s(),[t]=r.useState(()=>new Map);t.clear();let n=e;for(;n;){let e=n.type;u(e)&&e!==a&&!t.has(e)&&t.set(e,r.use(o(e))),n=n.return}return t}();return r.useMemo(()=>Array.from(e.keys()).reduce((t,n)=>i=>r.createElement(t,null,r.createElement(n.Provider,{...i,value:e.get(n)})),e=>r.createElement(l,{...e})),[e])}},8838:(e,t,n)=>{n.d(t,{A:()=>r});let r=function(){return function(e){var t,n,r,i,o={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},a={},l={};a.L=1,l[1]="L",Object.keys(o).forEach(function(e,t){a[e]=1<<t+1,l[a[e]]=e}),Object.freeze(a);var s=a.LRI|a.RLI|a.FSI,c=a.L|a.R|a.AL,u=a.B|a.S|a.WS|a.ON|a.FSI|a.LRI|a.RLI|a.PDI,d=a.BN|a.RLE|a.LRE|a.RLO|a.LRO|a.PDF,f=a.S|a.WS|a.B|s|a.PDI|d,p=null;function v(e){if(!p){p=new Map;var t=function(e){if(o.hasOwnProperty(e)){var t=0;o[e].split(",").forEach(function(n){var r=n.split("+"),i=r[0],o=r[1];i=parseInt(i,36),o=o?parseInt(o,36):0,p.set(t+=i,a[e]);for(var l=0;l<o;l++)p.set(++t,a[e])})}};for(var n in o)t(n)}return p.get(e.codePointAt(0))||a.L}function h(e,t){var n,r=0,i=new Map,o=t&&new Map;return e.split(",").forEach(function e(a){if(-1!==a.indexOf("+"))for(var l=+a;l--;)e(n);else{n=a;var s=a.split(">"),c=s[0],u=s[1];c=String.fromCodePoint(r+=parseInt(c,36)),u=String.fromCodePoint(r+=parseInt(u,36)),i.set(c,u),t&&o.set(u,c)}}),{map:i,reverseMap:o}}function m(){if(!t){var e=h("14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",!0),i=e.map,o=e.reverseMap;t=i,n=o,r=h("6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye",!1).map}}function g(e){return m(),t.get(e)||null}function b(e){return m(),n.get(e)||null}function y(e){return m(),r.get(e)||null}var w=a.L,x=a.R,E=a.EN,_=a.ES,S=a.ET,j=a.AN,M=a.CS,C=a.B,A=a.S,P=a.ON,L=a.BN,T=a.NSM,D=a.AL,O=a.LRO,R=a.RLO,k=a.LRE,I=a.RLE,U=a.PDF,z=a.LRI,N=a.RLI,F=a.FSI,B=a.PDI;function H(e){if(!i){var t=h("14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",!0),n=t.map;t.reverseMap.forEach(function(e,t){n.set(t,e)}),i=n}return i.get(e)||null}function q(e,t,n,r){var i=e.length;n=Math.max(0,null==n?0:+n),r=Math.min(i-1,null==r?i-1:+r);var o=[];return t.paragraphs.forEach(function(i){var a=Math.max(n,i.start),l=Math.min(r,i.end);if(a<l){for(var s=t.levels.slice(a,l+1),c=l;c>=a&&v(e[c])&f;c--)s[c]=i.level;for(var u=i.level,d=1/0,p=0;p<s.length;p++){var h=s[p];h>u&&(u=h),h<d&&(d=1|h)}for(var m=u;m>=d;m--)for(var g=0;g<s.length;g++)if(s[g]>=m){for(var b=g;g+1<s.length&&s[g+1]>=m;)g++;g>b&&o.push([b+a,g+a])}}}),o}function G(e,t,n,r){for(var i=q(e,t,n,r),o=[],a=0;a<e.length;a++)o[a]=a;return i.forEach(function(e){for(var t=e[0],n=e[1],r=o.slice(t,n+1),i=r.length;i--;)o[n-i]=r[i]}),o}return e.closingToOpeningBracket=b,e.getBidiCharType=v,e.getBidiCharTypeName=function(e){return l[v(e)]},e.getCanonicalBracket=y,e.getEmbeddingLevels=function(e,t){for(var n=new Uint32Array(e.length),r=0;r<e.length;r++)n[r]=v(e[r]);var i=new Map;function o(e,t){var r=n[e];n[e]=t,i.set(r,i.get(r)-1),r&u&&i.set(u,i.get(u)-1),i.set(t,(i.get(t)||0)+1),t&u&&i.set(u,(i.get(u)||0)+1)}for(var a=new Uint8Array(e.length),l=new Map,p=[],h=null,m=0;m<e.length;m++)h||p.push(h={start:m,end:e.length-1,level:"rtl"===t?1:"ltr"===t?0:tL(m,!1)}),n[m]&C&&(h.end=m,h=null);for(var H=I|k|R|O|s|B|U|C,q=function(e){return e+(1&e?1:2)},G=function(e){return e+(1&e?2:1)},W=0;W<p.length;W++){var Y=[{_level:(h=p[W]).level,_override:0,_isolate:0}],K=void 0,V=0,X=0,$=0;i.clear();for(var Z=h.start;Z<=h.end;Z++){var Q=n[Z];if(K=Y[Y.length-1],i.set(Q,(i.get(Q)||0)+1),Q&u&&i.set(u,(i.get(u)||0)+1),Q&H)if(Q&(I|k)){a[Z]=K._level;var J=(Q===I?G:q)(K._level);!(J<=125)||V||X?!V&&X++:Y.push({_level:J,_override:0,_isolate:0})}else if(Q&(R|O)){a[Z]=K._level;var ee=(Q===R?G:q)(K._level);!(ee<=125)||V||X?!V&&X++:Y.push({_level:ee,_override:Q&R?x:w,_isolate:0})}else if(Q&s){Q&F&&(Q=1===tL(Z+1,!0)?N:z),a[Z]=K._level,K._override&&o(Z,K._override);var et=(Q===N?G:q)(K._level);et<=125&&0===V&&0===X?($++,Y.push({_level:et,_override:0,_isolate:1,_isolInitIndex:Z})):V++}else if(Q&B){if(V>0)V--;else if($>0){for(X=0;!Y[Y.length-1]._isolate;)Y.pop();var en=Y[Y.length-1]._isolInitIndex;null!=en&&(l.set(en,Z),l.set(Z,en)),Y.pop(),$--}K=Y[Y.length-1],a[Z]=K._level,K._override&&o(Z,K._override)}else Q&U?(0===V&&(X>0?X--:!K._isolate&&Y.length>1&&(Y.pop(),K=Y[Y.length-1])),a[Z]=K._level):Q&C&&(a[Z]=h.level);else a[Z]=K._level,K._override&&Q!==L&&o(Z,K._override)}for(var er=[],ei=null,eo=h.start;eo<=h.end;eo++){var ea=n[eo];if(!(ea&d)){var el=a[eo],es=ea&s,ec=ea===B;ei&&el===ei._level?(ei._end=eo,ei._endsWithIsolInit=es):er.push(ei={_start:eo,_end:eo,_level:el,_startsWithPDI:ec,_endsWithIsolInit:es})}}for(var eu=[],ed=0;ed<er.length;ed++){var ef=er[ed];if(!ef._startsWithPDI||ef._startsWithPDI&&!l.has(ef._start)){for(var ep=[ei=ef],ev=void 0;ei&&ei._endsWithIsolInit&&null!=(ev=l.get(ei._end));)for(var eh=ed+1;eh<er.length;eh++)if(er[eh]._start===ev){ep.push(ei=er[eh]);break}for(var em=[],eg=0;eg<ep.length;eg++)for(var eb=ep[eg],ey=eb._start;ey<=eb._end;ey++)em.push(ey);for(var ew=a[em[0]],ex=h.level,eE=em[0]-1;eE>=0;eE--)if(!(n[eE]&d)){ex=a[eE];break}var e_=em[em.length-1],eS=a[e_],ej=h.level;if(!(n[e_]&s)){for(var eM=e_+1;eM<=h.end;eM++)if(!(n[eM]&d)){ej=a[eM];break}}eu.push({_seqIndices:em,_sosType:Math.max(ex,ew)%2?x:w,_eosType:Math.max(ej,eS)%2?x:w})}}for(var eC=0;eC<eu.length;eC++){var eA=eu[eC],eP=eA._seqIndices,eL=eA._sosType,eT=eA._eosType,eD=1&a[eP[0]]?x:w;if(i.get(T))for(var eO=0;eO<eP.length;eO++){var eR=eP[eO];if(n[eR]&T){for(var ek=eL,eI=eO-1;eI>=0;eI--)if(!(n[eP[eI]]&d)){ek=n[eP[eI]];break}o(eR,ek&(s|B)?P:ek)}}if(i.get(E))for(var eU=0;eU<eP.length;eU++){var ez=eP[eU];if(n[ez]&E)for(var eN=eU-1;eN>=-1;eN--){var eF=-1===eN?eL:n[eP[eN]];if(eF&c){eF===D&&o(ez,j);break}}}if(i.get(D))for(var eB=0;eB<eP.length;eB++){var eH=eP[eB];n[eH]&D&&o(eH,x)}if(i.get(_)||i.get(M))for(var eq=1;eq<eP.length-1;eq++){var eG=eP[eq];if(n[eG]&(_|M)){for(var eW=0,eY=0,eK=eq-1;eK>=0&&(eW=n[eP[eK]])&d;eK--);for(var eV=eq+1;eV<eP.length&&(eY=n[eP[eV]])&d;eV++);eW===eY&&(n[eG]===_?eW===E:eW&(E|j))&&o(eG,eW)}}if(i.get(E)){for(var eX=0;eX<eP.length;eX++)if(n[eP[eX]]&E){for(var e$=eX-1;e$>=0&&n[eP[e$]]&(S|d);e$--)o(eP[e$],E);for(eX++;eX<eP.length&&n[eP[eX]]&(S|d|E);eX++)n[eP[eX]]!==E&&o(eP[eX],E)}}if(i.get(S)||i.get(_)||i.get(M))for(var eZ=0;eZ<eP.length;eZ++){var eQ=eP[eZ];if(n[eQ]&(S|_|M)){o(eQ,P);for(var eJ=eZ-1;eJ>=0&&n[eP[eJ]]&d;eJ--)o(eP[eJ],P);for(var e1=eZ+1;e1<eP.length&&n[eP[e1]]&d;e1++)o(eP[e1],P)}}if(i.get(E))for(var e0=0,e2=eL;e0<eP.length;e0++){var e3=eP[e0],e4=n[e3];e4&E?e2===w&&o(e3,w):e4&c&&(e2=e4)}if(i.get(u)){for(var e5=x|E|j,e6=e5|w,e7=[],e9=[],e8=0;e8<eP.length;e8++)if(n[eP[e8]]&u){var te=e[eP[e8]],tt=void 0;if(null!==g(te))if(e9.length<63)e9.push({char:te,seqIndex:e8});else break;else if(null!==(tt=b(te)))for(var tn=e9.length-1;tn>=0;tn--){var tr=e9[tn].char;if(tr===tt||tr===b(y(te))||g(y(tr))===te){e7.push([e9[tn].seqIndex,e8]),e9.length=tn;break}}}e7.sort(function(e,t){return e[0]-t[0]});for(var ti=0;ti<e7.length;ti++){for(var to=e7[ti],ta=to[0],tl=to[1],ts=!1,tc=0,tu=ta+1;tu<tl;tu++){var td=eP[tu];if(n[td]&e6){ts=!0;var tf=n[td]&e5?x:w;if(tf===eD){tc=tf;break}}}if(ts&&!tc){tc=eL;for(var tp=ta-1;tp>=0;tp--){var tv=eP[tp];if(n[tv]&e6){var th=n[tv]&e5?x:w;tc=th!==eD?th:eD;break}}}if(tc){if(n[eP[ta]]=n[eP[tl]]=tc,tc!==eD){for(var tm=ta+1;tm<eP.length;tm++)if(!(n[eP[tm]]&d)){v(e[eP[tm]])&T&&(n[eP[tm]]=tc);break}}if(tc!==eD){for(var tg=tl+1;tg<eP.length;tg++)if(!(n[eP[tg]]&d)){v(e[eP[tg]])&T&&(n[eP[tg]]=tc);break}}}}for(var tb=0;tb<eP.length;tb++)if(n[eP[tb]]&u){for(var ty=tb,tw=tb,tx=eL,tE=tb-1;tE>=0;tE--)if(n[eP[tE]]&d)ty=tE;else{tx=n[eP[tE]]&e5?x:w;break}for(var t_=eT,tS=tb+1;tS<eP.length;tS++)if(n[eP[tS]]&(u|d))tw=tS;else{t_=n[eP[tS]]&e5?x:w;break}for(var tj=ty;tj<=tw;tj++)n[eP[tj]]=tx===t_?tx:eD;tb=tw}}}for(var tM=h.start;tM<=h.end;tM++){var tC=a[tM],tA=n[tM];if(1&tC?tA&(w|E|j)&&a[tM]++:tA&x?a[tM]++:tA&(j|E)&&(a[tM]+=2),tA&d&&(a[tM]=0===tM?h.level:a[tM-1]),tM===h.end||v(e[tM])&(A|C))for(var tP=tM;tP>=0&&v(e[tP])&f;tP--)a[tP]=h.level}}return{levels:a,paragraphs:p};function tL(t,r){for(var i=t;i<e.length;i++){var o=n[i];if(o&(x|D))return 1;if(o&(C|w)||r&&o===B)break;if(o&s){var a=function(t){for(var r=1,i=t+1;i<e.length;i++){var o=n[i];if(o&C)break;if(o&B){if(0==--r)return i}else o&s&&r++}return -1}(i);i=-1===a?e.length:a}}return 0}},e.getMirroredCharacter=H,e.getMirroredCharactersMap=function(e,t,n,r){var i=e.length;n=Math.max(0,null==n?0:+n),r=Math.min(i-1,null==r?i-1:+r);for(var o=new Map,a=n;a<=r;a++)if(1&t[a]){var l=H(e[a]);null!==l&&o.set(a,l)}return o},e.getReorderSegments=q,e.getReorderedIndices=G,e.getReorderedString=function(e,t,n,r){var i=G(e,t,n,r),o=[].concat(e);return i.forEach(function(n,r){o[r]=(1&t.levels[n]?H(e[n]):null)||e[n]}),o.join("")},e.openingToClosingBracket=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({})}},8914:(e,t,n)=>{function r(){var e=Object.create(null);function t(e,t){var n=void 0;self.troikaDefine=function(e){return n=e};var r=URL.createObjectURL(new Blob(["/** "+e.replace(/\*/g,"")+" **/\n\ntroikaDefine(\n"+t+"\n)"],{type:"application/javascript"}));try{importScripts(r)}catch(e){console.error(e)}return URL.revokeObjectURL(r),delete self.troikaDefine,n}self.addEventListener("message",function(n){var r=n.data,i=r.messageId,o=r.action,a=r.data;try{"registerModule"===o&&function n(r,i){var o=r.id,a=r.name,l=r.dependencies;void 0===l&&(l=[]);var s=r.init;void 0===s&&(s=function(){});var c=r.getTransferables;if(void 0===c&&(c=null),!e[o])try{l=l.map(function(t){return t&&t.isWorkerModule&&(n(t,function(e){if(e instanceof Error)throw e}),t=e[t.id].value),t}),s=t("<"+a+">.init",s),c&&(c=t("<"+a+">.getTransferables",c));var u=null;"function"==typeof s?u=s.apply(void 0,l):console.error("worker module init function failed to rehydrate"),e[o]={id:o,value:u,getTransferables:c},i(u)}catch(e){e&&e.noLog||console.error(e),i(e)}}(a,function(e){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:{isCallable:"function"==typeof e}})}),"callModule"===o&&function(t,n){var r,i=t.id,o=t.args;e[i]&&"function"==typeof e[i].value||n(Error("Worker module "+i+": not found or its 'init' did not return a function"));try{var a=(r=e[i]).value.apply(r,o);a&&"function"==typeof a.then?a.then(l,function(e){return n(e instanceof Error?e:Error(""+e))}):l(a)}catch(e){n(e)}function l(t){try{var r=e[i].getTransferables&&e[i].getTransferables(t);r&&Array.isArray(r)&&r.length||(r=void 0),n(t,r)}catch(e){console.error(e),n(e)}}}(a,function(e,t){e instanceof Error?postMessage({messageId:i,success:!1,error:e.message}):postMessage({messageId:i,success:!0,result:e},t||void 0)})}catch(e){postMessage({messageId:i,success:!1,error:e.stack})}})}n.d(t,{Qw:()=>d,kl:()=>function e(t){if((!t||"function"!=typeof t.init)&&!l)throw Error("requires `options.init` function");var n,r=t.dependencies,a=t.init,s=t.getTransferables,u=t.workerId,d=((n=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return n._getInitResult().then(function(t){if("function"==typeof t)return t.apply(void 0,e);throw Error("Worker module function was called but `init` did not return a callable function")})})._getInitResult=function(){var e=t.dependencies,r=t.init,i=Promise.all(e=Array.isArray(e)?e.map(function(e){return e&&(e=e.onMainThread||e)._getInitResult&&(e=e._getInitResult()),e}):[]).then(function(e){return r.apply(null,e)});return n._getInitResult=function(){return i},i},n);null==u&&(u="#default");var v="workerModule"+ ++o,h=t.name||v,m=null;function g(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];if(!i())return d.apply(void 0,e);if(!m){m=p(u,"registerModule",g.workerModuleData);var n=function(){m=null,c[u].delete(n)};(c[u]||(c[u]=new Set)).add(n)}return m.then(function(t){if(t.isCallable)return p(u,"callModule",{id:v,args:e});throw Error("Worker module function was called but `init` did not return a callable function")})}return r=r&&r.map(function(t){return"function"!=typeof t||t.workerModuleData||(l=!0,t=e({workerId:u,name:"<"+h+"> function dependency: "+t.name,init:"function(){return (\n"+f(t)+"\n)}"}),l=!1),t&&t.workerModuleData&&(t=t.workerModuleData),t}),g.workerModuleData={isWorkerModule:!0,id:v,name:h,dependencies:r,init:f(a),getTransferables:s&&f(s)},g.onMainThread=d,g}}),n(5866);var i=function(){var e=!1;if("undefined"!=typeof window&&void 0!==window.document)try{new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"}))).terminate(),e=!0}catch(e){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+e.message+"]")}return i=function(){return e},e},o=0,a=0,l=!1,s=Object.create(null),c=Object.create(null),u=Object.create(null);function d(e){c[e]&&c[e].forEach(function(e){e()}),s[e]&&(s[e].terminate(),delete s[e])}function f(e){var t=e.toString();return!/^function/.test(t)&&/^\w+\s*\(/.test(t)&&(t="function "+t),t}function p(e,t,n){return new Promise(function(i,o){var l=++a;u[l]=function(e){e.success?i(e.result):o(Error("Error in worker "+t+" call: "+e.error))},(function(e){var t=s[e];if(!t){var n=f(r);(t=s[e]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+e.replace(/\*/g,"")+" **/\n\n;("+n+")()"],{type:"application/javascript"})))).onmessage=function(e){var t=e.data,n=t.messageId,r=u[n];if(!r)throw Error("WorkerModule response with empty or unknown messageId");delete u[n],r(t)}}return t})(e).postMessage({messageId:l,action:t,data:n})})}},9385:(e,t,n)=>{n.d(t,{G:()=>a});var r=n(7510),i=n(1197);let o=parseInt(r.sPf.replace(/\D+/g,""));class a extends r.BKk{constructor(e){super({type:"LineMaterial",uniforms:r.LlO.clone(r.LlO.merge([i.UniformsLib.common,i.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new r.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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