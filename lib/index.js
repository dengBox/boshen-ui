(function(z,se){typeof exports=="object"&&typeof module<"u"?se(exports):typeof define=="function"&&define.amd?define(["exports"],se):(z=typeof globalThis<"u"?globalThis:z||self,se(z.baseUI={}))})(this,function(z){"use strict";const se="";function Ht(e,t){const n=Object.create(null),s=e.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return t?r=>!!n[r.toLowerCase()]:r=>!!n[r]}function Oe(e){if(_(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=R(s)?Ut(s):Oe(s);if(r)for(const o in r)t[o]=r[o]}return t}else{if(R(e))return e;if(b(e))return e}}const Wt=/;(?![^(]*\))/g,Bt=/:(.+)/;function Ut(e){const t={};return e.split(Wt).forEach(n=>{if(n){const s=n.split(Bt);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function Se(e){let t="";if(R(e))t=e;else if(_(e))for(let n=0;n<e.length;n++){const s=Se(e[n]);s&&(t+=s+" ")}else if(b(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const V=process.env.NODE_ENV!=="production"?Object.freeze({}):{};process.env.NODE_ENV!=="production"&&Object.freeze([]);const qe=()=>{},Jt=()=>!1,qt=/^on[^a-z]/,Gt=e=>qt.test(e),I=Object.assign,Lt=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Yt=Object.prototype.hasOwnProperty,h=(e,t)=>Yt.call(e,t),_=Array.isArray,G=e=>oe(e)==="[object Map]",Zt=e=>oe(e)==="[object Set]",w=e=>typeof e=="function",R=e=>typeof e=="string",xe=e=>typeof e=="symbol",b=e=>e!==null&&typeof e=="object",Qt=e=>b(e)&&w(e.then)&&w(e.catch),Xt=Object.prototype.toString,oe=e=>Xt.call(e),Ge=e=>oe(e).slice(8,-1),kt=e=>oe(e)==="[object Object]",Ve=e=>R(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,en=(e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))})(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=(e,t)=>!Object.is(e,t),tn=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})};let Le;const nn=()=>Le||(Le=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ye(e,...t){console.warn(`[Vue warn] ${e}`,...t)}let rn;function sn(e,t=rn){t&&t.active&&t.effects.push(e)}const ve=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Ze=e=>(e.w&M)>0,Qe=e=>(e.n&M)>0,on=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=M},cn=e=>{const{deps:t}=e;if(t.length){let n=0;for(let s=0;s<t.length;s++){const r=t[s];Ze(r)&&!Qe(r)?r.delete(e):t[n++]=r,r.w&=~M,r.n&=~M}t.length=n}},ye=new WeakMap;let X=0,M=1;const De=30;let O;const A=Symbol(process.env.NODE_ENV!=="production"?"iterate":""),Ie=Symbol(process.env.NODE_ENV!=="production"?"Map key iterate":"");class ln{constructor(t,n=null,s){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,sn(this,s)}run(){if(!this.active)return this.fn();let t=O,n=K;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=O,O=this,K=!0,M=1<<++X,X<=De?on(this):Xe(this),this.fn()}finally{X<=De&&cn(this),M=1<<--X,O=this.parent,K=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){O===this?this.deferStop=!0:this.active&&(Xe(this),this.onStop&&this.onStop(),this.active=!1)}}function Xe(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let K=!0;const ke=[];function et(){ke.push(K),K=!1}function tt(){const e=ke.pop();K=e===void 0?!0:e}function y(e,t,n){if(K&&O){let s=ye.get(e);s||ye.set(e,s=new Map);let r=s.get(n);r||s.set(n,r=ve());const o=process.env.NODE_ENV!=="production"?{effect:O,target:e,type:t,key:n}:void 0;un(r,o)}}function un(e,t){let n=!1;X<=De?Qe(e)||(e.n|=M,n=!Ze(e)):n=!e.has(O),n&&(e.add(O),O.deps.push(e),process.env.NODE_ENV!=="production"&&O.onTrack&&O.onTrack(Object.assign({effect:O},t)))}function P(e,t,n,s,r,o){const i=ye.get(e);if(!i)return;let c=[];if(t==="clear")c=[...i.values()];else if(n==="length"&&_(e))i.forEach((f,d)=>{(d==="length"||d>=s)&&c.push(f)});else switch(n!==void 0&&c.push(i.get(n)),t){case"add":_(e)?Ve(n)&&c.push(i.get("length")):(c.push(i.get(A)),G(e)&&c.push(i.get(Ie)));break;case"delete":_(e)||(c.push(i.get(A)),G(e)&&c.push(i.get(Ie)));break;case"set":G(e)&&c.push(i.get(A));break}const u=process.env.NODE_ENV!=="production"?{target:e,type:t,key:n,newValue:s,oldValue:r,oldTarget:o}:void 0;if(c.length===1)c[0]&&(process.env.NODE_ENV!=="production"?ce(c[0],u):ce(c[0]));else{const f=[];for(const d of c)d&&f.push(...d);process.env.NODE_ENV!=="production"?ce(ve(f),u):ce(ve(f))}}function ce(e,t){const n=_(e)?e:[...e];for(const s of n)s.computed&&nt(s,t);for(const s of n)s.computed||nt(s,t)}function nt(e,t){(e!==O||e.allowRecurse)&&(process.env.NODE_ENV!=="production"&&e.onTrigger&&e.onTrigger(I({effect:e},t)),e.scheduler?e.scheduler():e.run())}const an=Ht("__proto__,__v_isRef,__isVue"),rt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(xe)),fn=Re(),pn=Re(!0),dn=Re(!0,!0),st=hn();function hn(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const s=p(this);for(let o=0,i=this.length;o<i;o++)y(s,"get",o+"");const r=s[t](...n);return r===-1||r===!1?s[t](...n.map(p)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){et();const s=p(this)[t].apply(this,n);return tt(),s}}),e}function Re(e=!1,t=!1){return function(s,r,o){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&o===(e?t?dt:pt:t?Rn:ft).get(s))return s;const i=_(s);if(!e&&i&&h(st,r))return Reflect.get(st,r,o);const c=Reflect.get(s,r,o);return(xe(r)?rt.has(r):an(r))||(e||y(s,"get",r),t)?c:S(c)?i&&Ve(r)?c:c.value:b(c)?e?_t(c):ht(c):c}}const _n=gn();function gn(e=!1){return function(n,s,r,o){let i=n[s];if(W(i)&&S(i)&&!S(r))return!1;if(!e&&(!Pe(r)&&!W(r)&&(i=p(i),r=p(r)),!_(n)&&S(i)&&!S(r)))return i.value=r,!0;const c=_(n)&&Ve(s)?Number(s)<n.length:h(n,s),u=Reflect.set(n,s,r,o);return n===p(o)&&(c?ie(r,i)&&P(n,"set",s,r,i):P(n,"add",s,r)),u}}function mn(e,t){const n=h(e,t),s=e[t],r=Reflect.deleteProperty(e,t);return r&&n&&P(e,"delete",t,void 0,s),r}function En(e,t){const n=Reflect.has(e,t);return(!xe(t)||!rt.has(t))&&y(e,"has",t),n}function wn(e){return y(e,"iterate",_(e)?"length":A),Reflect.ownKeys(e)}const Nn={get:fn,set:_n,deleteProperty:mn,has:En,ownKeys:wn},ot={get:pn,set(e,t){return process.env.NODE_ENV!=="production"&&Ye(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0},deleteProperty(e,t){return process.env.NODE_ENV!=="production"&&Ye(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},bn=I({},ot,{get:dn}),Te=e=>e,le=e=>Reflect.getPrototypeOf(e);function ue(e,t,n=!1,s=!1){e=e.__v_raw;const r=p(e),o=p(t);n||(t!==o&&y(r,"get",t),y(r,"get",o));const{has:i}=le(r),c=s?Te:n?je:Fe;if(i.call(r,t))return c(e.get(t));if(i.call(r,o))return c(e.get(o));e!==r&&e.get(t)}function ae(e,t=!1){const n=this.__v_raw,s=p(n),r=p(e);return t||(e!==r&&y(s,"has",e),y(s,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function fe(e,t=!1){return e=e.__v_raw,!t&&y(p(e),"iterate",A),Reflect.get(e,"size",e)}function it(e){e=p(e);const t=p(this);return le(t).has.call(t,e)||(t.add(e),P(t,"add",e,e)),this}function ct(e,t){t=p(t);const n=p(this),{has:s,get:r}=le(n);let o=s.call(n,e);o?process.env.NODE_ENV!=="production"&&at(n,s,e):(e=p(e),o=s.call(n,e));const i=r.call(n,e);return n.set(e,t),o?ie(t,i)&&P(n,"set",e,t,i):P(n,"add",e,t),this}function lt(e){const t=p(this),{has:n,get:s}=le(t);let r=n.call(t,e);r?process.env.NODE_ENV!=="production"&&at(t,n,e):(e=p(e),r=n.call(t,e));const o=s?s.call(t,e):void 0,i=t.delete(e);return r&&P(t,"delete",e,void 0,o),i}function ut(){const e=p(this),t=e.size!==0,n=process.env.NODE_ENV!=="production"?G(e)?new Map(e):new Set(e):void 0,s=e.clear();return t&&P(e,"clear",void 0,void 0,n),s}function pe(e,t){return function(s,r){const o=this,i=o.__v_raw,c=p(i),u=t?Te:e?je:Fe;return!e&&y(c,"iterate",A),i.forEach((f,d)=>s.call(r,u(f),u(d),o))}}function de(e,t,n){return function(...s){const r=this.__v_raw,o=p(r),i=G(o),c=e==="entries"||e===Symbol.iterator&&i,u=e==="keys"&&i,f=r[e](...s),d=n?Te:t?je:Fe;return!t&&y(o,"iterate",u?Ie:A),{next(){const{value:l,done:a}=f.next();return a?{value:l,done:a}:{value:c?[d(l[0]),d(l[1])]:d(l),done:a}},[Symbol.iterator](){return this}}}}function C(e){return function(...t){if(process.env.NODE_ENV!=="production"){const n=t[0]?`on key "${t[0]}" `:"";console.warn(`${en(e)} operation ${n}failed: target is readonly.`,p(this))}return e==="delete"?!1:this}}function On(){const e={get(o){return ue(this,o)},get size(){return fe(this)},has:ae,add:it,set:ct,delete:lt,clear:ut,forEach:pe(!1,!1)},t={get(o){return ue(this,o,!1,!0)},get size(){return fe(this)},has:ae,add:it,set:ct,delete:lt,clear:ut,forEach:pe(!1,!0)},n={get(o){return ue(this,o,!0)},get size(){return fe(this,!0)},has(o){return ae.call(this,o,!0)},add:C("add"),set:C("set"),delete:C("delete"),clear:C("clear"),forEach:pe(!0,!1)},s={get(o){return ue(this,o,!0,!0)},get size(){return fe(this,!0)},has(o){return ae.call(this,o,!0)},add:C("add"),set:C("set"),delete:C("delete"),clear:C("clear"),forEach:pe(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=de(o,!1,!1),n[o]=de(o,!0,!1),t[o]=de(o,!1,!0),s[o]=de(o,!0,!0)}),[e,n,t,s]}const[Sn,xn,Vn,vn]=On();function $e(e,t){const n=t?e?vn:Vn:e?xn:Sn;return(s,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(h(n,r)&&r in s?n:s,r,o)}const yn={get:$e(!1,!1)},Dn={get:$e(!0,!1)},In={get:$e(!0,!0)};function at(e,t,n){const s=p(n);if(s!==n&&t.call(e,s)){const r=Ge(e);console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}const ft=new WeakMap,Rn=new WeakMap,pt=new WeakMap,dt=new WeakMap;function Tn(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function $n(e){return e.__v_skip||!Object.isExtensible(e)?0:Tn(Ge(e))}function ht(e){return W(e)?e:Me(e,!1,Nn,yn,ft)}function _t(e){return Me(e,!0,ot,Dn,pt)}function he(e){return Me(e,!0,bn,In,dt)}function Me(e,t,n,s,r){if(!b(e))return process.env.NODE_ENV!=="production"&&console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=r.get(e);if(o)return o;const i=$n(e);if(i===0)return e;const c=new Proxy(e,i===2?s:n);return r.set(e,c),c}function H(e){return W(e)?H(e.__v_raw):!!(e&&e.__v_isReactive)}function W(e){return!!(e&&e.__v_isReadonly)}function Pe(e){return!!(e&&e.__v_isShallow)}function Ce(e){return H(e)||W(e)}function p(e){const t=e&&e.__v_raw;return t?p(t):e}function Mn(e){return tn(e,"__v_skip",!0),e}const Fe=e=>b(e)?ht(e):e,je=e=>b(e)?_t(e):e;function S(e){return!!(e&&e.__v_isRef===!0)}function Pn(e){return S(e)?e.value:e}const Cn={get:(e,t,n)=>Pn(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return S(r)&&!S(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function Fn(e){return H(e)?e:new Proxy(e,Cn)}const B=[];function jn(e){B.push(e)}function zn(){B.pop()}function x(e,...t){et();const n=B.length?B[B.length-1].component:null,s=n&&n.appContext.config.warnHandler,r=An();if(s)U(s,n,11,[e+t.join(""),n&&n.proxy,r.map(({vnode:o})=>`at <${jt(n,o.type)}>`).join(`
`),r]);else{const o=[`[Vue warn]: ${e}`,...t];r.length&&o.push(`
`,...Kn(r)),console.warn(...o)}tt()}function An(){let e=B[B.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const s=e.component&&e.component.parent;e=s&&s.vnode}return t}function Kn(e){const t=[];return e.forEach((n,s)=>{t.push(...s===0?[]:[`
`],...Hn(n))}),t}function Hn({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",s=e.component?e.component.parent==null:!1,r=` at <${jt(e.component,e.type,s)}`,o=">"+n;return e.props?[r,...Wn(e.props),o]:[r+o]}function Wn(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(s=>{t.push(...gt(s,e[s]))}),n.length>3&&t.push(" ..."),t}function gt(e,t,n){return R(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:S(t)?(t=gt(e,p(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):w(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=p(t),n?t:[`${e}=`,t])}const mt={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",[0]:"setup function",[1]:"render function",[2]:"watcher getter",[3]:"watcher callback",[4]:"watcher cleanup function",[5]:"native event handler",[6]:"component event handler",[7]:"vnode hook",[8]:"directive hook",[9]:"transition hook",[10]:"app errorHandler",[11]:"app warnHandler",[12]:"ref function",[13]:"async component loader",[14]:"scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"};function U(e,t,n,s){let r;try{r=s?e(...s):e()}catch(o){Et(o,t,n)}return r}function ze(e,t,n,s){if(w(e)){const o=U(e,t,n,s);return o&&Qt(o)&&o.catch(i=>{Et(i,t,n)}),o}const r=[];for(let o=0;o<e.length;o++)r.push(ze(e[o],t,n,s));return r}function Et(e,t,n,s=!0){const r=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,c=process.env.NODE_ENV!=="production"?mt[n]:n;for(;o;){const f=o.ec;if(f){for(let d=0;d<f.length;d++)if(f[d](e,i,c)===!1)return}o=o.parent}const u=t.appContext.config.errorHandler;if(u){U(u,null,10,[e,i,c]);return}}Bn(e,n,r,s)}function Bn(e,t,n,s=!0){if(process.env.NODE_ENV!=="production"){const r=mt[t];if(n&&jn(n),x(`Unhandled error${r?` during execution of ${r}`:""}`),n&&zn(),s)throw e;console.error(e)}else console.error(e)}let _e=!1,Ae=!1;const T=[];let F=0;const L=[];let $=null,j=0;const wt=Promise.resolve();let Ke=null;const Un=100;function Jn(e){const t=Ke||wt;return e?t.then(this?e.bind(this):e):t}function qn(e){let t=F+1,n=T.length;for(;t<n;){const s=t+n>>>1;k(T[s])<e?t=s+1:n=s}return t}function He(e){(!T.length||!T.includes(e,_e&&e.allowRecurse?F+1:F))&&(e.id==null?T.push(e):T.splice(qn(e.id),0,e),Nt())}function Nt(){!_e&&!Ae&&(Ae=!0,Ke=wt.then(Ot))}function bt(e){_(e)?L.push(...e):(!$||!$.includes(e,e.allowRecurse?j+1:j))&&L.push(e),Nt()}function Gn(e){if(L.length){const t=[...new Set(L)];if(L.length=0,$){$.push(...t);return}for($=t,process.env.NODE_ENV!=="production"&&(e=e||new Map),$.sort((n,s)=>k(n)-k(s)),j=0;j<$.length;j++)process.env.NODE_ENV!=="production"&&St(e,$[j])||$[j]();$=null,j=0}}const k=e=>e.id==null?1/0:e.id,Ln=(e,t)=>{const n=k(e)-k(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function Ot(e){Ae=!1,_e=!0,process.env.NODE_ENV!=="production"&&(e=e||new Map),T.sort(Ln);const t=process.env.NODE_ENV!=="production"?n=>St(e,n):qe;try{for(F=0;F<T.length;F++){const n=T[F];if(n&&n.active!==!1){if(process.env.NODE_ENV!=="production"&&t(n))continue;U(n,null,14)}}}finally{F=0,T.length=0,Gn(e),_e=!1,Ke=null,(T.length||L.length)&&Ot(e)}}function St(e,t){if(!e.has(t))e.set(t,1);else{const n=e.get(t);if(n>Un){const s=t.ownerInstance,r=s&&Ft(s.type);return x(`Maximum recursive updates exceeded${r?` in component <${r}>`:""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`),!0}else e.set(t,n+1)}}const ee=new Set;process.env.NODE_ENV!=="production"&&(nn().__VUE_HMR_RUNTIME__={createRecord:We(Yn),rerender:We(Zn),reload:We(Qn)});const ge=new Map;function Yn(e,t){return ge.has(e)?!1:(ge.set(e,{initialDef:te(t),instances:new Set}),!0)}function te(e){return zt(e)?e.__vccOpts:e}function Zn(e,t){const n=ge.get(e);!n||(n.initialDef.render=t,[...n.instances].forEach(s=>{t&&(s.render=t,te(s.type).render=t),s.renderCache=[],s.update()}))}function Qn(e,t){const n=ge.get(e);if(!n)return;t=te(t),xt(n.initialDef,t);const s=[...n.instances];for(const r of s){const o=te(r.type);ee.has(o)||(o!==n.initialDef&&xt(o,t),ee.add(o)),r.appContext.optionsCache.delete(r.type),r.ceReload?(ee.add(o),r.ceReload(t.styles),ee.delete(o)):r.parent?(He(r.parent.update),r.parent.type.__asyncLoader&&r.parent.ceReload&&r.parent.ceReload(t.styles)):r.appContext.reload?r.appContext.reload():typeof window<"u"?window.location.reload():console.warn("[HMR] Root or manually mounted instance modified. Full reload required.")}bt(()=>{for(const r of s)ee.delete(te(r.type))})}function xt(e,t){I(e,t);for(const n in e)n!=="__file"&&!(n in t)&&delete e[n]}function We(e){return(t,n)=>{try{return e(t,n)}catch(s){console.error(s),console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.")}}}let J=null,Xn=null;function zr(){}const kn=e=>e.__isSuspense;function er(e,t){t&&t.pendingBranch?_(e)?t.effects.push(...e):t.effects.push(e):bt(e)}const Vt={};function tr(e,t,{immediate:n,deep:s,flush:r,onTrack:o,onTrigger:i}=V){process.env.NODE_ENV!=="production"&&!t&&(n!==void 0&&x('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),s!==void 0&&x('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));const c=g=>{x("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},u=Q;let f,d=!1,l=!1;if(S(e)?(f=()=>e.value,d=Pe(e)):H(e)?(f=()=>e,s=!0):_(e)?(l=!0,d=e.some(g=>H(g)||Pe(g)),f=()=>e.map(g=>{if(S(g))return g.value;if(H(g))return Y(g);if(w(g))return U(g,u,2);process.env.NODE_ENV!=="production"&&c(g)})):w(e)?t?f=()=>U(e,u,2):f=()=>{if(!(u&&u.isUnmounted))return a&&a(),ze(e,u,3,[m])}:(f=qe,process.env.NODE_ENV!=="production"&&c(e)),t&&s){const g=f;f=()=>Y(g())}let a,m=g=>{a=D.onStop=()=>{U(g,u,4)}},E=l?[]:Vt;const v=()=>{if(!!D.active)if(t){const g=D.run();(s||d||(l?g.some((Cr,Fr)=>ie(Cr,E[Fr])):ie(g,E)))&&(a&&a(),ze(t,u,3,[g,E===Vt?void 0:E,m]),E=g)}else D.run()};v.allowRecurse=!!t;let be;r==="sync"?be=v:r==="post"?be=()=>Dt(v,u&&u.suspense):(v.pre=!0,u&&(v.id=u.uid),be=()=>He(v));const D=new ln(f,be);return process.env.NODE_ENV!=="production"&&(D.onTrack=o,D.onTrigger=i),t?n?v():E=D.run():r==="post"?Dt(D.run.bind(D),u&&u.suspense):D.run(),()=>{D.stop(),u&&u.scope&&Lt(u.scope.effects,D)}}function nr(e,t,n){const s=this.proxy,r=R(e)?e.includes(".")?rr(s,e):()=>s[e]:e.bind(s,s);let o;w(t)?o=t:(o=t.handler,n=t);const i=Q;Ct(this);const c=tr(r,o.bind(s),n);return i?Ct(i):br(),c}function rr(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}function Y(e,t){if(!b(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),S(e))Y(e.value,t);else if(_(e))for(let n=0;n<e.length;n++)Y(e[n],t);else if(Zt(e)||G(e))e.forEach(n=>{Y(n,t)});else if(kt(e))for(const n in e)Y(e[n],t);return e}const sr=Symbol(),Be=e=>e?Or(e)?Sr(e)||e.proxy:Be(e.parent):null,me=I(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>process.env.NODE_ENV!=="production"?he(e.props):e.props,$attrs:e=>process.env.NODE_ENV!=="production"?he(e.attrs):e.attrs,$slots:e=>process.env.NODE_ENV!=="production"?he(e.slots):e.slots,$refs:e=>process.env.NODE_ENV!=="production"?he(e.refs):e.refs,$parent:e=>Be(e.parent),$root:e=>Be(e.root),$emit:e=>e.emit,$options:e=>cr(e),$forceUpdate:e=>e.f||(e.f=()=>He(e.update)),$nextTick:e=>e.n||(e.n=Jn.bind(e.proxy)),$watch:e=>nr.bind(e)}),or=e=>e==="_"||e==="$",ir={get({_:e},t){const{ctx:n,setupState:s,data:r,props:o,accessCache:i,type:c,appContext:u}=e;if(process.env.NODE_ENV!=="production"&&t==="__isVue")return!0;if(process.env.NODE_ENV!=="production"&&s!==V&&s.__isScriptSetup&&h(s,t))return s[t];let f;if(t[0]!=="$"){const m=i[t];if(m!==void 0)switch(m){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(s!==V&&h(s,t))return i[t]=1,s[t];if(r!==V&&h(r,t))return i[t]=2,r[t];if((f=e.propsOptions[0])&&h(f,t))return i[t]=3,o[t];if(n!==V&&h(n,t))return i[t]=4,n[t];i[t]=0}}const d=me[t];let l,a;if(d)return t==="$attrs"&&(y(e,"get",t),process.env.NODE_ENV!=="production"&&void 0),d(e);if((l=c.__cssModules)&&(l=l[t]))return l;if(n!==V&&h(n,t))return i[t]=4,n[t];if(a=u.config.globalProperties,h(a,t))return a[t];process.env.NODE_ENV!=="production"&&J&&(!R(t)||t.indexOf("__v")!==0)&&(r!==V&&or(t[0])&&h(r,t)?x(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`):e===J&&x(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`))},set({_:e},t,n){const{data:s,setupState:r,ctx:o}=e;return r!==V&&h(r,t)?(r[t]=n,!0):s!==V&&h(s,t)?(s[t]=n,!0):h(e.props,t)?(process.env.NODE_ENV!=="production"&&x(`Attempting to mutate prop "${t}". Props are readonly.`,e),!1):t[0]==="$"&&t.slice(1)in e?(process.env.NODE_ENV!=="production"&&x(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`,e),!1):(process.env.NODE_ENV!=="production"&&t in e.appContext.config.globalProperties?Object.defineProperty(o,t,{enumerable:!0,configurable:!0,value:n}):o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,propsOptions:o}},i){let c;return!!n[i]||e!==V&&h(e,i)||t!==V&&h(t,i)||(c=o[0])&&h(c,i)||h(s,i)||h(me,i)||h(r.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:h(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};process.env.NODE_ENV!=="production"&&(ir.ownKeys=e=>(x("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."),Reflect.ownKeys(e)));function cr(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,c=o.get(t);let u;return c?u=c:!r.length&&!n&&!s?u=t:(u={},r.length&&r.forEach(f=>Ee(u,f,i,!0)),Ee(u,t,i)),b(t)&&o.set(t,u),u}function Ee(e,t,n,s=!1){const{mixins:r,extends:o}=t;o&&Ee(e,o,n,!0),r&&r.forEach(i=>Ee(e,i,n,!0));for(const i in t)if(s&&i==="expose")process.env.NODE_ENV!=="production"&&x('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');else{const c=lr[i]||n&&n[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const lr={data:vt,props:q,emits:q,methods:q,computed:q,beforeCreate:N,created:N,beforeMount:N,mounted:N,beforeUpdate:N,updated:N,beforeDestroy:N,beforeUnmount:N,destroyed:N,unmounted:N,activated:N,deactivated:N,errorCaptured:N,serverPrefetch:N,components:q,directives:q,watch:ar,provide:vt,inject:ur};function vt(e,t){return t?e?function(){return I(w(e)?e.call(this,this):e,w(t)?t.call(this,this):t)}:t:e}function ur(e,t){return q(yt(e),yt(t))}function yt(e){if(_(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function N(e,t){return e?[...new Set([].concat(e,t))]:t}function q(e,t){return e?I(I(Object.create(null),e),t):t}function ar(e,t){if(!e)return t;if(!t)return e;const n=I(Object.create(null),e);for(const s in t)n[s]=N(e[s],t[s]);return n}function fr(){return{app:null,config:{isNativeTag:Jt,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}const Dt=er,pr=e=>e.__isTeleport,It=Symbol(process.env.NODE_ENV!=="production"?"Fragment":void 0),dr=Symbol(process.env.NODE_ENV!=="production"?"Text":void 0),hr=Symbol(process.env.NODE_ENV!=="production"?"Comment":void 0);Symbol(process.env.NODE_ENV!=="production"?"Static":void 0);let Z=null;function _r(e){return e?e.__v_isVNode===!0:!1}const gr=(...e)=>Mt(...e),Rt="__vInternal",Tt=({key:e})=>e!=null?e:null,we=({ref:e,ref_key:t,ref_for:n})=>e!=null?R(e)||S(e)||w(e)?{i:J,r:e,k:t,f:!!n}:e:null;function mr(e,t=null,n=null,s=0,r=null,o=e===It?0:1,i=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Tt(t),ref:t&&we(t),scopeId:Xn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null};return c?(Ue(u,n),o&128&&e.normalize(u)):n&&(u.shapeFlag|=R(n)?8:16),process.env.NODE_ENV!=="production"&&u.key!==u.key&&x("VNode created with invalid key (NaN). VNode type:",u.type),!i&&Z&&(u.patchFlag>0||o&6)&&u.patchFlag!==32&&Z.push(u),u}const $t=process.env.NODE_ENV!=="production"?gr:Mt;function Mt(e,t=null,n=null,s=0,r=null,o=!1){if((!e||e===sr)&&(process.env.NODE_ENV!=="production"&&!e&&x(`Invalid vnode type when creating vnode: ${e}.`),e=hr),_r(e)){const c=Ne(e,t,!0);return n&&Ue(c,n),!o&&Z&&(c.shapeFlag&6?Z[Z.indexOf(e)]=c:Z.push(c)),c.patchFlag|=-2,c}if(zt(e)&&(e=e.__vccOpts),t){t=Er(t);let{class:c,style:u}=t;c&&!R(c)&&(t.class=Se(c)),b(u)&&(Ce(u)&&!_(u)&&(u=I({},u)),t.style=Oe(u))}const i=R(e)?1:kn(e)?128:pr(e)?64:b(e)?4:w(e)?2:0;return process.env.NODE_ENV!=="production"&&i&4&&Ce(e)&&(e=p(e),x("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",`
Component that was made reactive: `,e)),mr(e,t,n,s,r,i,o,!0)}function Er(e){return e?Ce(e)||Rt in e?I({},e):e:null}function Ne(e,t,n=!1){const{props:s,ref:r,patchFlag:o,children:i}=e,c=t?Nr(s||{},t):s;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Tt(c),ref:t&&t.ref?n&&r?_(r)?r.concat(we(t)):[r,we(t)]:we(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:process.env.NODE_ENV!=="production"&&o===-1&&_(i)?i.map(Pt):i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==It?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ne(e.ssContent),ssFallback:e.ssFallback&&Ne(e.ssFallback),el:e.el,anchor:e.anchor}}function Pt(e){const t=Ne(e);return _(e.children)&&(t.children=e.children.map(Pt)),t}function wr(e=" ",t=0){return $t(dr,null,e,t)}function Ue(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(_(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),Ue(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!(Rt in t)?t._ctx=J:r===3&&J&&(J.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else w(t)?(t={default:t,_ctx:J},n=32):(t=String(t),s&64?(n=16,t=[wr(t)]):n=8);e.children=t,e.shapeFlag|=n}function Nr(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=Se([t.class,s.class]));else if(r==="style")t.style=Oe([t.style,s.style]);else if(Gt(r)){const o=t[r],i=s[r];i&&o!==i&&!(_(o)&&o.includes(i))&&(t[r]=o?[].concat(o,i):i)}else r!==""&&(t[r]=s[r])}return t}fr();let Q=null;const Ct=e=>{Q=e,e.scope.on()},br=()=>{Q&&Q.scope.off(),Q=null};function Or(e){return e.vnode.shapeFlag&4}function Sr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Fn(Mn(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in me)return me[n](e)}}))}const xr=/(?:^|[-_])(\w)/g,Vr=e=>e.replace(xr,t=>t.toUpperCase()).replace(/[-_]/g,"");function Ft(e,t=!0){return w(e)?e.displayName||e.name:e.name||t&&e.__name}function jt(e,t,n=!1){let s=Ft(t);if(!s&&t.__file){const r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(s=r[1])}if(!s&&e&&e.parent){const r=o=>{for(const i in o)if(o[i]===t)return i};s=r(e.components||e.parent.type.components)||r(e.appContext.components)}return s?Vr(s):n?"App":"Anonymous"}function zt(e){return w(e)&&"__vccOpts"in e}Symbol(process.env.NODE_ENV!=="production"?"ssrContext":"");function Je(e){return!!(e&&e.__v_isShallow)}function vr(){if(process.env.NODE_ENV==="production"||typeof window>"u")return;const e={style:"color:#3ba776"},t={style:"color:#0b1bc9"},n={style:"color:#b62e24"},s={style:"color:#9d288c"},r={header(l){return b(l)?l.__isVue?["div",e,"VueInstance"]:S(l)?["div",{},["span",e,d(l)],"<",c(l.value),">"]:H(l)?["div",{},["span",e,Je(l)?"ShallowReactive":"Reactive"],"<",c(l),`>${W(l)?" (readonly)":""}`]:W(l)?["div",{},["span",e,Je(l)?"ShallowReadonly":"Readonly"],"<",c(l),">"]:null:null},hasBody(l){return l&&l.__isVue},body(l){if(l&&l.__isVue)return["div",{},...o(l.$)]}};function o(l){const a=[];l.type.props&&l.props&&a.push(i("props",p(l.props))),l.setupState!==V&&a.push(i("setup",l.setupState)),l.data!==V&&a.push(i("data",p(l.data)));const m=u(l,"computed");m&&a.push(i("computed",m));const E=u(l,"inject");return E&&a.push(i("injected",E)),a.push(["div",{},["span",{style:s.style+";opacity:0.66"},"$ (internal): "],["object",{object:l}]]),a}function i(l,a){return a=I({},a),Object.keys(a).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},l],["div",{style:"padding-left:1.25em"},...Object.keys(a).map(m=>["div",{},["span",s,m+": "],c(a[m],!1)])]]:["span",{}]}function c(l,a=!0){return typeof l=="number"?["span",t,l]:typeof l=="string"?["span",n,JSON.stringify(l)]:typeof l=="boolean"?["span",s,l]:b(l)?["object",{object:a?p(l):l}]:["span",n,String(l)]}function u(l,a){const m=l.type;if(w(m))return;const E={};for(const v in l.ctx)f(m,v,a)&&(E[v]=l.ctx[v]);return E}function f(l,a,m){const E=l[m];if(_(E)&&E.includes(a)||b(E)&&a in E||l.extends&&f(l.extends,a,m)||l.mixins&&l.mixins.some(v=>f(v,a,m)))return!0}function d(l){return Je(l)?"ShallowRef":l.effect?"ComputedRef":"Ref"}window.devtoolsFormatters?window.devtoolsFormatters.push(r):window.devtoolsFormatters=[r]}function yr(){vr()}process.env.NODE_ENV!=="production"&&yr();function Dr(e,t){for(let n=0;n<t.length;n++)if(e===t[n])return!0;return!1}const ne={name:"Button",mixins:[{props:{size:{validator(e){return Dr(e,["small","middle","large"])},default:"middle"},prefix:{type:String,default:"sh-"}},data(){return{}},computed:{sizes(){return this.size||this.$shui&&this.$shui.size},prefixs(){return this.prefix||this.$prefix&&this.$shui.prefix}},watch:{size(e){this.sizes=e},"$shui.size":e=>{globalThis.sizes=e.size}}}],components:{},data(){return{}},computed:{countClass(){return`${this.prefixs}Button`}},render(){return $t("div",null,[this.prefixs])},methods:{clickBtn(e){this.$emit("on-click",e)}}},Ir=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));ne.install=function(e){e.component(ne.name,ne)};const Rr=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"})),Tr="0.0.1",$r=["Base"],At=Object.assign({"./Button/index.ts":Rr,"./Button/src/Index.vue":Ir}),re={};for(const e in At)if(/\.\/[A-Za-z]+\/index\.ts/.test(e)){const t=e.split("./")[1].split("/")[0];$r.find(n=>n===t)||(re[t]=At[e].default)}const Kt=function(e,t={}){Object.keys(re).forEach(n=>{e.component(n,re[n])}),e.config.globalProperties.$shui={size:t.size||"",prefix:t.prefix||""}};typeof window<"u"&&window.Vue&&Kt(window.Vue);const Mr={version:Tr,install:Kt,...re},Pr=re.Button;z.Button=Pr,z.default=Mr,Object.defineProperties(z,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});