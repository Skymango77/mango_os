<!DOCTYPE html>
<!-- saved from url=(0132)blob:https://3okboa48eopweprbr9srqosz1mwp4z48oxbi4rp7q4o6pu1exk-h839267052.scf.usercontent.goog/b9edc4f1-92d4-4767-8fbb-20d911990bfb -->
<html lang="ko"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><script>(function(firebaseConfig, initialAuthToken, appId) {
        window.__firebase_config = firebaseConfig;
        window.__initial_auth_token = initialAuthToken;
        window.__app_id = appId;
            })("\n{\n  \"apiKey\": \"AIzaSyCqyCcs2R2e7AegGjvFAwG98wlamtbHvZY\",\n  \"authDomain\": \"bard-frontend.firebaseapp.com\",\n  \"projectId\": \"bard-frontend\",\n  \"storageBucket\": \"bard-frontend.firebasestorage.app\",\n  \"messagingSenderId\": \"175205271074\",\n  \"appId\": \"1:175205271074:web:2b7bd4d34d33bf38e6ec7b\"\n}\n","eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ4ZWQ3YTU3YzkyMTgwYzk0YjI2MzE3ZjMzYjY5MWE4MWRlNzYzNTEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0BiYXJkLWZyb250ZW5kLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxMDg2ODE1MjYzODA1NDcxMjYwNyIsImlzcyI6ImZpcmViYXNlLWFkbWluc2RrLWZic3ZjQGJhcmQtZnJvbnRlbmQuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJjbGFpbXMiOnsiYXBwSWQiOiJjXzRiMjA2N2JkNzczZTU5MzlfbWFuZ28vVHJhdmVsX3BvcnRhbC9pbmRleC5odG1sLTEwNyJ9LCJleHAiOjE3NjUyNjU0MzksImlhdCI6MTc2NTI2MTgzOSwiYWxnIjoiUlMyNTYifQ.Qu1ivYU9DZujAbluDNXFZB8MYXNOo_GYcLvCLycq2zie5byurw02d_ZuH_mSi1scJQYGtCN26b3Qnx-RfdXbL58RoP68y9AxoK6PI-XqUQrgQYLktncuwhTOHMIRclk3RSud4ZPSnnVWEpAz1oGKufOLDyePrgXET_-BQmdYsZ3ZTFuf40YMAHW-ClpVMtWxIs_NjcmL22QS4HRqMZp6eE45mo7eAg7ahKFWTmvLi_8G9EsIz6A6_fl99cnh-fesAe96LWac40laMcKIc8JJ5Otx9UGqdkWZZGptEBx8d7x4o0HDJR2KXmN9JzzyJ8cV2Pwi7NfLtfkHF-8Xkojbaw","c_4b2067bd773e5939_mango/Travel_portal/index.html-107")</script><script>'use strict';var h=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,b,d){if(a==Array.prototype||a==Object.prototype)return a;a[b]=d.value;return a};function l(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var d=a[b];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");}var n=l(this);
function p(a,b){if(b)a:{var d=n;a=a.split(".");for(var c=0;c<a.length-1;c++){var e=a[c];if(!(e in d))break a;d=d[e]}a=a[a.length-1];c=d[a];b=b(c);b!=c&&b!=null&&h(d,a,{configurable:!0,writable:!0,value:b})}}function r(a){function b(c){return a.next(c)}function d(c){return a.throw(c)}return new Promise(function(c,e){function f(g){g.done?c(g.value):Promise.resolve(g.value).then(b,d).then(f,e)}f(a.next())})}function t(a){return r(a())}
p("Object.values",function(a){return a?a:function(b){var d=[],c;for(c in b)Object.prototype.hasOwnProperty.call(b,c)&&d.push(b[c]);return d}});p("Array.prototype.includes",function(a){return a?a:function(b,d){var c=this;c instanceof String&&(c=String(c));var e=c.length;d=d||0;for(d<0&&(d=Math.max(d+e,0));d<e;d++){var f=c[d];if(f===b||Object.is(f,b))return!0}return!1}});/*

 MIT License

 Copyright (c) 2017-2023 W.Y.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

*/
function u(a,b){const d=a.style;b.backgroundColor&&(d.backgroundColor=b.backgroundColor);b.width&&(d.width=`${b.width}px`);b.height&&(d.height=`${b.height}px`);const c=b.style;c!=null&&Object.keys(c).forEach(e=>{d[e]=c[e]})};var v=(()=>{let a=0;return()=>{a+=1;return`u${`0000${(Math.random()*1679616<<0).toString(36)}`.slice(-4)}${a}`}})();function w(a){const b=[];for(let d=0,c=a.length;d<c;d++)b.push(a[d]);return b}let x=null;function y(a={}){return x?x:a.l?x=a.l:x=w(window.getComputedStyle(document.documentElement))}function z(a,b){return(a=(a.ownerDocument.defaultView||window).getComputedStyle(a).getPropertyValue(b))?parseFloat(a.replace("px","")):0}
function A(a,b={}){var d;if(!(d=b.width)){d=z(a,"border-left-width");var c=z(a,"border-right-width");d=a.clientWidth+d+c}(b=b.height)||(b=z(a,"border-top-width"),c=z(a,"border-bottom-width"),b=a.clientHeight+b+c);return{width:d,height:b}}function B(a){return new Promise((b,d)=>{const c=new Image;c.onload=()=>{c.decode().then(()=>{requestAnimationFrame(()=>b(c))})};c.onerror=d;c.crossOrigin="anonymous";c.decoding="async";c.src=a})}
function C(a){return t(function*(){return Promise.resolve().then(()=>(new XMLSerializer).serializeToString(a)).then(encodeURIComponent).then(b=>`data:image/svg+xml;charset=utf-8,${b}`)})}
function D(a,b,d){return t(function*(){const c=document.createElementNS("http://www.w3.org/2000/svg","svg"),e=document.createElementNS("http://www.w3.org/2000/svg","foreignObject");c.setAttribute("width",`${b}`);c.setAttribute("height",`${d}`);c.setAttribute("viewBox",`0 0 ${b} ${d}`);e.setAttribute("width","100%");e.setAttribute("height","100%");e.setAttribute("x","0");e.setAttribute("y","0");e.setAttribute("externalResourcesRequired","true");c.appendChild(e);e.appendChild(a);return C(c)})}
var E=(a,b)=>{if(a instanceof b)return!0;a=Object.getPrototypeOf(a);return a===null?!1:a.constructor.name===b.name||E(a,b)};function F(a,b){return y(b).map(d=>{const c=a.getPropertyValue(d),e=a.getPropertyPriority(d);return`${d}: ${c}${e?" !important":""};`}).join(" ")}
function G(a,b,d,c){a=window.getComputedStyle(a,d);var e=a.getPropertyValue("content");if(e!==""&&e!=="none"){var f=v();try{b.className=`${b.className} ${f}`}catch(k){return}e=document.createElement("style");var g=e.appendChild;d=`.${f}:${d}`;a.cssText?(c=a.getPropertyValue("content"),c=`${a.cssText} content: '${c.replace(/'|"/g,"")}';`):c=F(a,c);g.call(e,document.createTextNode(`${d}{${c}}`));b.appendChild(e)}};function H(a){return a.search(/^(data:)/)!==-1}function I(a,b,d){return t(function*(){const c=yield fetch(a,b);if(c.status===404)throw Error(`Resource "${c.url}" not found`);const e=yield c.blob();return new Promise((f,g)=>{const k=new FileReader;k.onerror=g;k.onloadend=()=>{try{f(d({o:c,result:k.result}))}catch(m){g(m)}};k.readAsDataURL(e)})})}const J={};function K(a,b,d){let c=a.replace(/\?.*/,"");d&&(c=a);/ttf|otf|eot|woff2?/i.test(c)&&(c=c.replace(/.*\//,""));return b?`[${b}]${c}`:c}
function L(a,b,d){return t(function*(){const c=K(a,b,d.C);if(J[c]!=null)return J[c];d.u&&(a+=(/\?/.test(a)?"&":"?")+(new Date).getTime());let e;try{const f=yield I(a,d.i,({o:g,result:k})=>{b||(b=g.headers.get("Content-Type")||"");return k.split(/,/)[1]});e=`data:${b};base64,${f}`}catch(f){e=d.B||""}return J[c]=e})};const M={P:"application/font-woff",R:"application/font-woff",N:"application/font-truetype",v:"application/vnd.ms-fontobject",H:"image/png",F:"image/jpeg",D:"image/jpeg",A:"image/gif",M:"image/tiff",L:"image/svg+xml",O:"image/webp"};function N(a){return(a=/\.([^./]*?)$/g.exec(a))?a[1]:""};function O(a){return t(function*(){const b=a.toDataURL();return b==="data:,"?a.cloneNode(!1):B(b)})}function aa(a,b){return t(function*(){if(a.currentSrc){var d=document.createElement("canvas");const c=d.getContext("2d");d.width=a.clientWidth;d.height=a.clientHeight;c==null||c.drawImage(a,0,0,d.width,d.height);d=d.toDataURL();return B(d)}d=a.poster;d=yield L(d,M[N(d).toLowerCase()]||"",b);return B(d)})}
function ba(a,b){return t(function*(){try{let d;if(a==null?0:(d=a.contentDocument)==null?0:d.body)return yield P(a.contentDocument.body,b,!0)}catch(d){}return a.cloneNode(!1)})}function ca(a,b){return t(function*(){return E(a,HTMLCanvasElement)?O(a):E(a,HTMLVideoElement)?aa(a,b):E(a,HTMLIFrameElement)?ba(a,b):a.cloneNode(a.tagName!=null&&a.tagName.toUpperCase()==="SVG")})}
function da(a,b,d){return t(function*(){if(b.tagName!=null&&b.tagName.toUpperCase()==="SVG")return b;let c=[];if(a.tagName!=null&&a.tagName.toUpperCase()==="SLOT"&&a.assignedNodes)c=w(a.assignedNodes());else{let e;if(E(a,HTMLIFrameElement)&&((e=a.contentDocument)==null?0:e.body))c=w(a.contentDocument.body.childNodes);else{let f;c=w(((f=a.shadowRoot)!=null?f:a).childNodes)}}if(c.length===0||E(a,HTMLVideoElement))return b;yield c.reduce((e,f)=>e.then(()=>P(f,d)).then(g=>{g&&b.appendChild(g)}),Promise.resolve());
return b})}function ea(a,b,d){const c=b.style;if(c){var e=window.getComputedStyle(a);e.cssText?(c.cssText=e.cssText,c.transformOrigin=e.transformOrigin):y(d).forEach(f=>{let g=e.getPropertyValue(f);f==="font-size"&&g.endsWith("px")&&(g=`${Math.floor(parseFloat(g.substring(0,g.length-2)))-.1}px`);E(a,HTMLIFrameElement)&&f==="display"&&g==="inline"&&(g="block");f==="d"&&b.getAttribute("d")&&(g=`path(${b.getAttribute("d")})`);c.setProperty(f,g,e.getPropertyPriority(f))})}}
function fa(a,b){E(a,HTMLSelectElement)&&(b=Array.from(b.children).find(d=>a.value===d.getAttribute("value")))&&b.setAttribute("selected","")}
function ha(a,b){return t(function*(){var d=a.querySelectorAll?a.querySelectorAll("use"):[];if(d.length===0)return a;var c={};for(var e=0;e<d.length;e++){var f=d[e].getAttribute("xlink:href");if(f){const g=document.querySelector(f);a.querySelector(f)||!g||c[f]||(c[f]=yield P(g,b,!0))}}d=Object.values(c);if(d.length){c=document.createElementNS("http://www.w3.org/1999/xhtml","svg");c.setAttribute("xmlns","http://www.w3.org/1999/xhtml");c.style.position="absolute";c.style.width="0";c.style.height="0";
c.style.overflow="hidden";c.style.display="none";e=document.createElementNS("http://www.w3.org/1999/xhtml","defs");c.appendChild(e);for(f=0;f<d.length;f++)e.appendChild(d[f]);a.appendChild(c)}return a})}
function P(a,b,d){return t(function*(){return d||!b.filter||b.filter(a)?Promise.resolve(a).then(c=>ca(c,b)).then(c=>da(a,c,b)).then(c=>{E(c,Element)&&(ea(a,c,b),G(a,c,":before",b),G(a,c,":after",b),E(a,HTMLTextAreaElement)&&(c.textContent=a.value),E(a,HTMLInputElement)&&c.setAttribute("value",a.value),fa(a,c));return c}).then(c=>ha(c,b)):null})};const Q=/url\((['"]?)([^'"]+?)\1\)/g,ia=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,ja=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function ka(a){const b=[];a.replace(Q,(d,c,e)=>{b.push(e);return d});return b.filter(d=>!H(d))}
function la(a,b,d,c){return t(function*(){try{const e=d?(new URL(b,d||void 0)).toString():b;let f;f=yield L(e,M[N(b).toLowerCase()]||"",c);return a.replace(new RegExp(`(url\\(['"]?)(${b.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")})(['"]?\\))`,"g"),`$1${f}$3`)}catch(e){}return a})}function ma(a,{I:b}){return b?a.replace(ja,d=>{for(;;){const [c,,e]=ia.exec(d)||[],f=c,g=e;if(!g)return"";if(g===b)return`src: ${f};`}}):a}
function R(a,b,d){return t(function*(){if(a.search(Q)===-1)return a;const c=ma(a,d);return ka(c).reduce((e,f)=>e.then(g=>la(g,f,b,d)),Promise.resolve(c))})};function S(a,b,d){return t(function*(){var c;const e=(c=b.style)==null?void 0:c.getPropertyValue(a);return e?(c=yield R(e,null,d),b.style.setProperty(a,c,b.style.getPropertyPriority(a)),!0):!1})}function na(a,b){return t(function*(){(yield S("background",a,b))||(yield S("background-image",a,b));(yield S("mask",a,b))||(yield S("-webkit-mask",a,b))||(yield S("mask-image",a,b))||(yield S("-webkit-mask-image",a,b))})}
function oa(a,b){return t(function*(){const d=E(a,HTMLImageElement);if(d&&!H(a.src)||E(a,SVGImageElement)&&!H(a.href.baseVal)){var c=d?a.src:a.href.baseVal,e=yield L(c,M[N(c).toLowerCase()]||"",b);yield new Promise((f,g)=>{a.onload=f;a.onerror=b.m?(...k)=>{try{f(b.m(...k))}catch(m){g(m)}}:g;a.decode&&(a.decode=f);a.loading==="lazy"&&(a.loading="eager");d?(a.srcset="",a.src=e):a.href.baseVal=e})}})}
function pa(a,b){return t(function*(){const d=w(a.childNodes).map(c=>T(c,b));yield Promise.all(d).then(()=>a)})}function T(a,b){return t(function*(){E(a,Element)&&(yield na(a,b),yield oa(a,b),yield pa(a,b))})};const U={};function V(a){return t(function*(){var b=U[a];if(b!=null)return b;b=yield(yield fetch(a)).text();b={url:a,cssText:b};return U[a]=b})}function W(a,b){return t(function*(){let d=a.cssText;const c=/url\(["']?([^"')]+)["']?\)/g,e=(d.match(/url\([^)]+\)/g)||[]).map(f=>t(function*(){let g=f.replace(c,"$1");g.startsWith("https://")||(g=(new URL(g,a.url)).href);return I(g,b.i,({result:k})=>{d=d.replace(f,`url(${k})`);return[f,k]})}));return Promise.all(e).then(()=>d)})}
function X(a){if(a==null)return[];const b=[];a=a.replace(/(\/\*[\s\S]*?\*\/)/gi,"");for(var d=RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");;){var c=d.exec(a);if(c===null)break;b.push(c[0])}a=a.replace(d,"");d=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;for(c=RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})","gi");;){let e=d.exec(a);if(e===null)if(e=c.exec(a),e===null)break;else d.lastIndex=c.lastIndex;else c.lastIndex=
d.lastIndex;b.push(e[0])}return b}
function qa(a,b){return t(function*(){const d=[],c=[];a.forEach(e=>{if("cssRules"in e)try{w(e.cssRules||[]).forEach((f,g)=>{if(f.type===CSSRule.IMPORT_RULE){let k=g+1;f=V(f.href).then(m=>W(m,b)).then(m=>X(m).forEach(q=>{try{e.insertRule(q,q.startsWith("@import")?k+=1:e.cssRules.length)}catch(Da){}})).catch(()=>{});c.push(f)}})}catch(f){const g=a.find(k=>k.href==null)||document.styleSheets[0];e.href!=null&&c.push(V(e.href).then(k=>W(k,b)).then(k=>X(k).forEach(m=>{g.insertRule(m,g.cssRules.length)})).catch(()=>
{}))}});return Promise.all(c).then(()=>{a.forEach(e=>{if("cssRules"in e)try{w(e.cssRules||[]).forEach(f=>{d.push(f)})}catch(f){}});return d})})}function ra(a){return a.filter(b=>b.type===CSSRule.FONT_FACE_RULE).filter(b=>b.style.getPropertyValue("src").search(Q)!==-1)}function sa(a,b){return t(function*(){if(a.ownerDocument==null)throw Error("Provided element is not within a Document");var d=w(a.ownerDocument.styleSheets);d=yield qa(d,b);return ra(d)})}
function ta(a){function b(c){(c.style.fontFamily||getComputedStyle(c).fontFamily).split(",").forEach(e=>{d.add(e.trim().replace(/["']/g,""))});Array.from(c.children).forEach(e=>{e instanceof HTMLElement&&b(e)})}const d=new Set;b(a);return d}function ua(a,b){return t(function*(){const d=yield sa(a,b),c=ta(a);return(yield Promise.all(d.filter(e=>c.has(e.style.fontFamily.trim().replace(/["']/g,""))).map(e=>R(e.cssText,e.parentStyleSheet?e.parentStyleSheet.href:null,b)))).join("\n")})}
function va(a,b){return t(function*(){const d=b.j!=null?b.j:b.K?null:yield ua(a,b);if(d){const c=document.createElement("style");c.appendChild(document.createTextNode(d));a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)}})};function wa(a,b={}){return t(function*(){const {width:d,height:c}=A(a,b),e=yield P(a,b,!0);yield va(e,b);yield T(e,b);u(e,b);return yield D(e,d,c)})}
function xa(a,b={}){return t(function*(){const {width:d,height:c}=A(a,b);var e=yield wa(a,b);e=yield B(e);const f=document.createElement("canvas"),g=f.getContext("2d"),k=b.G||window.devicePixelRatio||1,m=b.h||d,q=b.g||c;f.width=m*k;f.height=q*k;!b.J&&(f.width>16384||f.height>16384)&&(f.width>16384&&f.height>16384?f.width>f.height?(f.height*=16384/f.width,f.width=16384):(f.width*=16384/f.height,f.height=16384):f.width>16384?(f.height*=16384/f.width,f.width=16384):(f.width*=16384/f.height,f.height=
16384));f.style.width=`${m}`;f.style.height=`${q}`;b.backgroundColor&&(g.fillStyle=b.backgroundColor,g.fillRect(0,0,f.width,f.height));g.drawImage(e,0,0,f.width,f.height);return f})}function ya(a,b={}){return t(function*(){return(yield xa(a,b)).toDataURL()})};const za=["gemini.google.com","corp.google.com","proxy.googlers.com"];function Y(){return document.body.querySelectorAll('[class*="animate"]').length>0}function Z(a){return t(function*(){try{return yield ya(a,{h:a.offsetWidth,g:a.offsetHeight})}catch(d){var b=a.offsetHeight;const c=document.createElement("canvas");c.width=a.offsetWidth;c.height=b;return c.toDataURL("image/png")}})}
function Aa(){return t(function*(){const a=document.body.offsetWidth,b=document.body.offsetHeight,d=document.body.cloneNode(!0);d.querySelectorAll('[class*="animate"]').forEach(c=>{c.classList.remove(...Array.from(c.classList).filter(e=>e.startsWith("animate")))});d.style.width=`${a}px`;d.style.height=`${b}px`;return d})}
function Ba(a){return t(function*(){let b=document.body;if(Y()){var d=yield Aa();b=d;document.body.appendChild(d)}d=yield Z(b);Y()&&document.body.removeChild(b);window.parent.postMessage({type:"SEND_SCREENSHOT",image:d,topOffset:document.documentElement.scrollTop},a.origin)})}function Ca(a){return t(function*(){const b={type:"SEND_SCREENSHOT_FOR_DATA_VISUALIZATION",image:yield Z(document.body),topOffset:0};window.parent.postMessage(b,a.origin)})}
window.addEventListener("message",a=>t(function*(){if(za.some(d=>a.origin.includes(d))){var b=a.data;b&&(b.type==="MAKE_SCREENSHOT"&&(yield Ba(a)),b.type==="MAKE_SCREENSHOT_FOR_DATA_VISUALIZATION"&&(yield Ca(a)))}}));
</script><script>(function() {
  // Ensure this script is executed only once
  if (window.firebaseAuthBridgeScriptLoaded) {
    return;
  }
  window.firebaseAuthBridgeScriptLoaded = true;

  let nextTokenPromiseId = 0;

  // Stores { resolve, reject } for ongoing token requests
  const pendingTokenPromises = {};

  // Listen for messages from the Host Application
  window.addEventListener('message', function(event) {

    const messageData = event.data;

  if (messageData && messageData.type === 'RESOLVE_NEW_FIREBASE_TOKEN') {
      const { success, token, error, promiseId } = messageData ?? {};
      if (pendingTokenPromises[promiseId]) {
        if (success) {
          pendingTokenPromises[promiseId].resolve(token);
        } else {
          pendingTokenPromises[promiseId].reject(new Error(error || 'Token refresh failed from host.'));
        }
        delete pendingTokenPromises[promiseId];
      }
    }
  });

  // Expose a function for the Generated App to request a new Firebase token
  window.requestNewFirebaseToken = function() {
    const currentPromiseId = nextTokenPromiseId++;
    const promise = new Promise((resolve, reject) => {
      pendingTokenPromises[currentPromiseId] = { resolve, reject };
    });
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'REQUEST_NEW_FIREBASE_TOKEN',
        promiseId: currentPromiseId
      }, '*');
    } else {
      pendingTokenPromises[currentPromiseId].reject(new Error('No parent window to request token from.'));
      delete pendingTokenPromises[currentPromiseId];
    }
    return promise;
  };
})();</script><script>
let realOriginalGetUserMedia = null;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  realOriginalGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
}

(function() {
  if (navigator.mediaDevices && navigator.mediaDevices.__proto__) {
    try {
      Object.defineProperty(navigator.mediaDevices.__proto__, 'getUserMedia', {
        get: function() {
          return undefined; // Or throw an error
        },
        configurable: false
      });
    } catch (error) {
      console.error("Error defining prototype getter:", error);
    }
  }
})();

(function() {
  const pendingMediaResolvers = {};
  let nextMediaPromiseId = 0;

  function requestMediaPermissions(constraints) {
    const mediaPromiseId = nextMediaPromiseId++;
    const promise = new Promise((resolve, reject) => {
      pendingMediaResolvers[mediaPromiseId] = (granted) => {
        delete pendingMediaResolvers[mediaPromiseId];
        resolve(granted);
      };
    });

    window.parent.postMessage({
      type: 'requestMediaPermission',
      constraints: constraints,
      promiseId: mediaPromiseId,
    }, '*');

    return promise;
  }

  let originalGetUserMedia = realOriginalGetUserMedia;

  function interceptGetUserMedia() {
    if (navigator.mediaDevices) {
      Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
        value: function(constraints) {
          return requestMediaPermissions(constraints).then((granted) => {
            if (granted) {
              if (originalGetUserMedia) {
                return originalGetUserMedia(constraints);
              } else {
                throw new Error("Original getUserMedia not available.");
              }
            } else {
              throw new DOMException('Permission denied', 'NotAllowedError');
            }
          });
        },
        writable: false,
        configurable: false
      });
    }
  }

  interceptGetUserMedia();

  const observer = new MutationObserver(function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'reconfigured' && mutation.name === 'getUserMedia' && mutation.object === navigator.mediaDevices) {
        interceptGetUserMedia();
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'getUserMedia' && mutation.target === navigator.mediaDevices) {
        interceptGetUserMedia();
      } else if (mutation.type === 'childList' && mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node === navigator.mediaDevices) {
            interceptGetUserMedia();
          }
        });
      }
    }
  });

  function interceptSpeechRecognition() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      return;
    }

    const OriginalSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const SpeechRecognitionWrapper = function(...args) {
      const recognizer = new OriginalSpeechRecognition(...args);
      const originalStart = recognizer.start.bind(recognizer);

      recognizer.start = function() {
        requestMediaPermissions({ audio: true }).then(granted => {
          if (granted) {
            originalStart();
          } else {
            const errorEvent = new SpeechRecognitionErrorEvent('error');
            errorEvent.error = 'not-allowed'; // This is the standard error for permission denial.
            recognizer.dispatchEvent(errorEvent);
          }
        });
      };

      return recognizer;
    };

    SpeechRecognitionWrapper.prototype = OriginalSpeechRecognition.prototype;
    SpeechRecognitionWrapper.prototype.constructor = SpeechRecognitionWrapper;

    if (window.SpeechRecognition) {
      window.SpeechRecognition = SpeechRecognitionWrapper;
    }
    if (window.webkitSpeechRecognition) {
      window.webkitSpeechRecognition = SpeechRecognitionWrapper;
    }
  }

  interceptSpeechRecognition();

  window.addEventListener('message', function(event) {
    if (event.data) {
      if (event.data.type === 'resolveMediaPermission') {
        const { promiseId, granted } = event.data;
        if (pendingMediaResolvers[promiseId]) {
          pendingMediaResolvers[promiseId](granted);
        }
      }
    }
  });

})();</script><script>((function(modelInformation) {
  const originalFetch = window.fetch;
  // TODO: b/421908508 - Move these out of the script and match all generative AI model calls.
  let googleLlmBaseApiUrls = [
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.textModelName + ':streamGenerateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.textModelName + ':generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.imageModelName + ':predict',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.imageModelName + ':predictLongRunning',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.imageEditModelName + ':generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.imageTransformModelName + ':generateContent',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.videoModelName + ':predict',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.videoModelName + ':predictLongRunning',
    'https://generativelanguage.googleapis.com/v1beta/models/' + modelInformation.ttsModelName + ':generateContent',
  ];
  modelInformation.deprecatedTextModelNames.forEach((modelName) => {
    googleLlmBaseApiUrls.push(
      'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':streamGenerateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent',
    );
  });
  modelInformation.deprecatedImageModelNames.forEach((modelName) => {
    googleLlmBaseApiUrls.push(
      'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':predict',
      'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':predictLongRunning',
    );
  });

  const pendingFetchResolvers = {};
  let nextPromiseId = 0;

  function handleStringInput(input, optionsArgument) {
    const actualUrl = input;
    const fetchCallArgs = [actualUrl, optionsArgument];
    const effectiveOptions = optionsArgument || {};
    const bodyForApiKeyCheck = effectiveOptions.body;
    const bodyForPostMessage = effectiveOptions.body;
    return { actualUrl, fetchCallArgs, effectiveOptions, bodyForApiKeyCheck, bodyForPostMessage };
  }

  function handleRequestInput(input, optionsArgument) {
    const actualUrl = input.url;
    const fetchCallArgs = [input, optionsArgument];
    const effectiveOptions = { method: input.method, headers: new Headers(input.headers) };
    let bodyForApiKeyCheck;
    let bodyForPostMessage;

    if (optionsArgument) {
      if (optionsArgument.method) effectiveOptions.method = optionsArgument.method;
      if (optionsArgument.headers) effectiveOptions.headers = new Headers(optionsArgument.headers);
      if ('body' in optionsArgument) {
        bodyForApiKeyCheck = optionsArgument.body;
        bodyForPostMessage = optionsArgument.body;
      } else {
        bodyForApiKeyCheck = undefined;
        bodyForPostMessage = input.body;
      }
    } else {
      bodyForApiKeyCheck = undefined;
      bodyForPostMessage = input.body;
    }
    return { actualUrl, fetchCallArgs, effectiveOptions, bodyForApiKeyCheck, bodyForPostMessage };
  }

  window.fetch = function(input, optionsArgument) {
    let actualUrl;
    let fetchCallArgs;
    let effectiveOptions = {};
    let bodyForApiKeyCheck;
    let bodyForPostMessage;

    if (typeof input === 'string') {
      ({actualUrl, fetchCallArgs, effectiveOptions, bodyForApiKeyCheck, bodyForPostMessage} = handleStringInput(input, optionsArgument));
    } else if (input instanceof Request) {
      ({actualUrl, fetchCallArgs, effectiveOptions, bodyForApiKeyCheck, bodyForPostMessage} = handleRequestInput(input, optionsArgument));
    } else {
      return originalFetch.apply(window, [input, optionsArgument]);
    }

    effectiveOptions.method = effectiveOptions.method || 'GET';
    if (!effectiveOptions.headers) {
      effectiveOptions.headers = new Headers();
    }


    if (typeof actualUrl === 'string' && googleLlmBaseApiUrls.some((url) => actualUrl.startsWith(url))) {
      let apiKeyIsNull = true;

      const regex = new RegExp("models/([^:]+)");
      const modelNameMatch = actualUrl.match(regex);
      const modelName = modelNameMatch ? modelNameMatch[1] : 'unspecified';


      try {
        const urlObject = new URL(actualUrl);  // Use URL object for robust parsing
        const apiKeyParam = urlObject.searchParams.get('key');
        if (apiKeyParam) {
          apiKeyIsNull = false;
        }
      } catch (e) {
        // Continue checks even if URL parsing fails
      }

      if (apiKeyIsNull && effectiveOptions.headers) {
        const h = new Headers(effectiveOptions.headers);
        const apiKeyHeaderValue = h.get('X-API-Key') || h.get('x-api-key');
        if (apiKeyHeaderValue) {
          apiKeyIsNull = false;
          return originalFetch.apply(window, fetchCallArgs);
        }
      }

      if (apiKeyIsNull && effectiveOptions.method && ['POST', 'PUT', 'PATCH'].includes(effectiveOptions.method.toUpperCase()) && typeof bodyForApiKeyCheck === 'string') {
        try {
          const bodyData = JSON.parse(bodyForApiKeyCheck);
          if (bodyData && bodyData.apiKey) {
            apiKeyIsNull = false;
            return originalFetch.apply(window, fetchCallArgs);
          }
        } catch (e) {
          // Ignore JSON parsing errors
        }
      }

      if(apiKeyIsNull) {
        const promiseId = nextPromiseId++;
        const promise = new Promise((resolve) => {
          pendingFetchResolvers[promiseId] = (resolvedResponse) => {
            delete pendingFetchResolvers[promiseId];
            resolve(resolvedResponse);
          };
        });

        let serializedBodyForPostMessage;
        if (typeof bodyForPostMessage === 'string' || bodyForPostMessage == null) {
            serializedBodyForPostMessage = bodyForPostMessage;
        } else if (bodyForPostMessage instanceof ReadableStream) {
            serializedBodyForPostMessage = null;
        } else {
            try {
                serializedBodyForPostMessage = JSON.stringify(bodyForPostMessage);
            } catch (e) {
                serializedBodyForPostMessage = null;
            }
        }

        const messageOptions = {
            method: effectiveOptions.method,
            headers: Object.fromEntries(new Headers(effectiveOptions.headers).entries()),
            body: serializedBodyForPostMessage
        };

        window.parent.postMessage({
          type: 'requestFetch',
          url: actualUrl,
          modelName: modelName,
          options: messageOptions,
          promiseId: promiseId,
        }, '*');

        return promise;
      }
      return originalFetch.apply(window, fetchCallArgs);
    }
    return originalFetch.apply(window, fetchCallArgs);
  };

  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'resolveFetch') {
      const { promiseId, response } = event.data;
      if (pendingFetchResolvers[promiseId]) {
        try {
          const reconstructedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers),
          });
          pendingFetchResolvers[promiseId](reconstructedResponse);
        } catch (error) {
          pendingFetchResolvers[promiseId](new Response(null, { status: 500, statusText: "Interceptor Response Reconstruction Error" }));
        }
      }
    }
  });

}))({"textModelName":"gemini-2.5-flash-preview-09-2025","imageModelName":"imagen-4.0-generate-001","imageEditModelName":"gemini-2.5-flash-image-preview","imageTransformModelName":"gemini-2.5-flash-image-preview","videoModelName":"veo-2.0-generate-001","ttsModelName":"gemini-2.5-flash-preview-tts","deprecatedTextModelNames":["gemini-2.0-flash","gemini-2.5-flash-preview-04-17","gemini-2.5-flash-preview-05-20"],"deprecatedImageModelNames":["imagen-3.0-generate-001","imagen-3.0-generate-002"]})</script><script>(function() {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

    /**
   * Normalizes an error event or a promise rejection reason into a structured error object.
   * @param {*} errorEventOrReason The error object or reason.
   * @return {object} Structured error data { message, name, stack }.
   */
  function getErrorObject(errorEventOrReason) {
    if (errorEventOrReason instanceof Error) {
      return {
        message: errorEventOrReason.message,
        name: errorEventOrReason.name,
        stack: errorEventOrReason.stack,
      };
    }
    // Fallback for non-Error objects.
    try {
      return {
        message: JSON.stringify(errorEventOrReason),
        name: 'UnknownErrorType',
        stack: null,
      };
    } catch (e) {
      return {
        message: String(errorEventOrReason),
        name: 'UnknownErrorTypeNonStringifiable',
        stack: null,
      };
    }
  }

  /**
   * Converts an array of arguments (from log/error) into a single string.
   * Handles Error objects specially to include their message and stack.
   * @param {Array<*>} args - Arguments passed to console methods.
   * @return {string} A string representation of the arguments.
   */
  function stringifyArgs(args) {
    return args
      .map((arg) => {
        if (arg instanceof Error) {
          const {message, stack} = arg;
          return `Error: ${message}${stack ? ('\nStack: ' + stack) : ''}`;
        }
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg);
          } catch (error) {
            return '[Circular Object]';
          }
        } else {
          return String(arg);
        }
      })
      .join(' ');
  }

  console.log = function(...args) {
    const logString = stringifyArgs(args);
    window.parent.postMessage({ type: 'log', message: logString }, '*');
    originalConsoleLog.apply(console, args);
  };

  console.error = function(...args) {
    let errorData;
    if (args.length > 0 && args[0] instanceof Error) {
      const err = args[0];
      // If the first arg is an Error, capture its details.
      errorData = {
        type: 'error',
        source: 'CONSOLE_ERROR',
        ...getErrorObject(err),
        rawArgsString: stringifyArgs(args.slice(1)),
        timestamp: new Date().toISOString(),
      };
    } else {
      // If not an Error object, treat all args as a general error message.
      errorData = {
        type: 'error',
        source: 'CONSOLE_ERROR',
        message: stringifyArgs(args),
        name: 'ConsoleLoggedError',
        stack: null,
        timestamp: new Date().toISOString(),
      };
    }
    window.parent.postMessage(errorData, '*');
    originalConsoleError.apply(console, args);
  };

  // Listen for global unhandled synchronous errors.
  window.addEventListener('error', function(event) {
    const errorDetails = event.error ? getErrorObject(event.error) : {
      message: event.message,
      name: 'GlobalError',
      stack: null,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    };

    window.parent.postMessage({
      type: 'error',
      source: 'global',
      ...errorDetails,
      message: errorDetails.message || event.message,
      timestamp: new Date().toISOString(),
    }, '*');
  });

  // Listen for unhandled promise rejections (asynchronous errors).
  window.addEventListener('unhandledrejection', function(event) {
    const errorDetails = getErrorObject(event.reason);

    window.parent.postMessage({
      type: 'error',
      source: 'unhandledrejection',
      ...errorDetails,
      message: errorDetails.message || 'Unhandled Promise Rejection',
      timestamp: new Date().toISOString(),
    }, '*');
  });

})();</script>
   
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mango Travel Portal - 통합 여행 대시보드</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com/"></script>
    <!-- Google Font - Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest" crossorigin="anonymous"></script>
    <!-- Firebase SDKs -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        // addDoc, collection import for public sharing
        import { getFirestore, doc, onSnapshot, collection, query, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
       
        // Firestore 디버그 로깅 설정
        setLogLevel('Debug');
       
        // Canvas 환경 변수 로드
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        // Firebase 초기화
        let app, db, auth;
        let userId = null;
        let isAuthReady = false;
        let currentTripData = null; // 현재 로드된 여행 데이터를 저장할 변수

        try {
            app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
        } catch (e) {
            console.error("Firebase 초기화 중 오류 발생:", e);
            document.getElementById('scheduler-status').textContent = 'Error: Firebase 초기화 실패.';
        }

        /**
         * Firebase 인증 및 데이터 로딩
         */
        async function setupFirebase() {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
               
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        userId = user.uid;
                        isAuthReady = true;
                        console.log("Firebase Auth 성공. User ID:", userId);
                        document.getElementById('user-id-display').textContent = `사용자 ID: ${userId}`;
                        loadUserSchedule();

                    } else {
                        userId = crypto.randomUUID(); // 비인증 사용자 ID
                        isAuthReady = true;
                        console.log("익명 로그인 또는 Auth 실패. 임시 User ID:", userId);
                        document.getElementById('user-id-display').textContent = `사용자 ID: (임시) ${userId}`;
                        document.getElementById('scheduler-status').textContent = '인증 완료. 데이터를 로드합니다...';
                    }
                });
            } catch (error) {
                console.error("Auth 및 Firestore 설정 중 오류:", error);
                document.getElementById('scheduler-status').textContent = `Error: 인증 실패. ${error.message}`;
            }
        }

        /**
         * Firestore에서 사용자 스케줄 실시간 리스너 설정
         */
        function loadUserSchedule() {
            if (!isAuthReady || !userId) return;

            // 개인 데이터 경로: /artifacts/{appId}/users/{userId}/schedules/current_trip
            const scheduleRef = doc(db, `artifacts/${appId}/users/${userId}/schedules/current_trip`);
           
            onSnapshot(scheduleRef, (docSnap) => {
                const statusElement = document.getElementById('scheduler-status');
                const listElement = document.getElementById('itinerary-list');
                const summaryElement = document.getElementById('itinerary-summary');

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    currentTripData = data; // 전역 변수에 데이터 저장
                   
                    statusElement.textContent = `현재 여행: ${data.tripName} (${data.dates})`;
                    statusElement.classList.remove('text-red-400', 'text-yellow-400');
                    statusElement.classList.add('text-green-400');
                   
                    renderItinerary(data.itinerary || []);
                    document.getElementById('current-memo').value = data.memo || '';
                   
                    const totalEvents = (data.itinerary || []).reduce((sum, day) => sum + day.events.length, 0);
                    const totalDays = (data.itinerary || []).length;
                    summaryElement.innerHTML = `<i data-lucide="sun" class="w-4 h-4 inline-block mr-1"></i>${totalDays}일간의 여정 | <i data-lucide="list-checks" class="w-4 h-4 inline-block mr-1"></i> 총 ${totalEvents}개 이벤트`;
                    lucide.createIcons();
                   
                } else {
                    currentTripData = null; // 데이터가 없으면 초기화
                    statusElement.textContent = '저장된 여행 스케줄이 없습니다. 새로 작성해주세요.';
                    statusElement.classList.remove('text-red-400', 'text-green-400');
                    statusElement.classList.add('text-yellow-400');
                    listElement.innerHTML = '<li class="text-center text-gray-500 py-4">일정이 비어있습니다.</li>';
                    document.getElementById('current-memo').value = '';
                    summaryElement.textContent = '여정을 시작해보세요.';
                   
                    createInitialSchedule(scheduleRef);
                }
            }, (error) => {
                console.error("스케줄 데이터 로드 중 오류 발생:", error);
                document.getElementById('scheduler-status').textContent = `Error: 스케줄 로드 실패. ${error.message}`;
                document.getElementById('scheduler-status').classList.add('text-red-400');
            });
        }
       
        // 초기 스케줄 구조 생성 (데이터가 없을 경우)
        function createInitialSchedule(scheduleRef) {
             const initialData = {
                tripName: "제주도 힐링 여행",
                dates: "2025-10-05 ~ 2025-10-07",
                memo: "이번 여행은 반드시 휴식 위주로 진행할 것. 맛집 리스트 확보 필수.",
                itinerary: [
                    { day: 1, date: "2025-10-05", events: [
                        { time: "10:00", title: "김포 출발 (ZE701)", type: "flight" },
                        { time: "12:30", title: "렌터카 픽업 후 해녀의 집 방문", type: "activity" }
                    ] },
                    { day: 2, date: "2025-10-06", events: [
                        { time: "09:00", title: "협재 해수욕장 산책", type: "activity" },
                        { time: "13:00", title: "고기 국수 전문점 (점심)", type: "food" },
                        { time: "19:00", title: "흑돼지 맛집 (예약 확인)", type: "food" }
                    ] },
                ]
            };
            setDoc(scheduleRef, initialData, { merge: true }).catch(e => console.error("초기 스케줄 저장 오류:", e));
        }

        // --- 새로운 공유 기능 ---
        document.addEventListener('DOMContentLoaded', () => {
             const memoInput = document.getElementById('current-memo');
             const saveBtn = document.getElementById('save-memo-btn');
             const shareBtn = document.getElementById('share-trip-btn'); // 공유 버튼 참조

             saveBtn.addEventListener('click', async () => {
                 if (!isAuthReady || !userId) {
                     document.getElementById('memo-feedback').textContent = '⚠️ 사용자 인증 대기 중입니다.';
                     document.getElementById('memo-feedback').classList.add('text-red-400');
                     return;
                 }
                 try {
                     const scheduleRef = doc(db, `artifacts/${appId}/users/${userId}/schedules/current_trip`);
                     await setDoc(scheduleRef, { memo: memoInput.value }, { merge: true });
                     document.getElementById('memo-feedback').textContent = '✅ 메모가 저장되었습니다!';
                     document.getElementById('memo-feedback').classList.remove('text-red-400');
                     document.getElementById('memo-feedback').classList.add('text-green-400');
                     setTimeout(() => document.getElementById('memo-feedback').textContent = '', 2000);
                 } catch (e) {
                     console.error("메모 저장 실패:", e);
                     document.getElementById('memo-feedback').textContent = `❌ 메모 저장 실패: ${e.message}`;
                     document.getElementById('memo-feedback').classList.add('text-red-400');
                 }
             });
             
             // 여행 추천/공유 기능 이벤트 리스너
             shareBtn.addEventListener('click', shareTrip);
        });

        async function shareTrip() {
            const shareFeedbackElement = document.getElementById('share-feedback');
            shareFeedbackElement.textContent = '공유 중...';
            shareFeedbackElement.classList.remove('text-red-400', 'text-green-400');
            shareFeedbackElement.classList.add('text-yellow-400');

            if (!isAuthReady || !userId) {
                shareFeedbackElement.textContent = '⚠️ 사용자 인증이 필요합니다.';
                shareFeedbackElement.classList.add('text-red-400');
                return;
            }

            if (!currentTripData || !currentTripData.itinerary || currentTripData.itinerary.length === 0) {
                shareFeedbackElement.textContent = '⚠️ 공유할 여행 일정이 없습니다.';
                shareFeedbackElement.classList.add('text-red-400');
                return;
            }

            try {
                // 공개 데이터 경로: /artifacts/{appId}/public/data/shared_trips
                const sharedCollectionRef = collection(db, `artifacts/${appId}/public/data/shared_trips`);
               
                // 공유할 데이터 생성
                const dataToShare = {
                    ...currentTripData,
                    sharedBy: userId,
                    timestamp: new Date().toISOString(),
                    // 공유 포털에서 사용될 간단한 메타데이터
                    summary: `${currentTripData.tripName} (${currentTripData.dates})`,
                    recommendCount: 0 // 추천 수 카운트 필드 초기화
                };

                // 새로운 문서로 추가 (addDoc)
                const docRef = await addDoc(sharedCollectionRef, dataToShare);

                shareFeedbackElement.textContent = `✅ 여행이 성공적으로 공유되었습니다! (ID: ${docRef.id})`;
                shareFeedbackElement.classList.remove('text-yellow-400');
                shareFeedbackElement.classList.add('text-green-400');
               
                // 3초 후 메시지 초기화
                setTimeout(() => shareFeedbackElement.textContent = '', 5000);

            } catch (e) {
                console.error("여행 공유 실패:", e);
                shareFeedbackElement.textContent = `❌ 공유 실패: ${e.message}`;
                shareFeedbackElement.classList.remove('text-yellow-400');
                shareFeedbackElement.classList.add('text-red-400');
            }
        }
        // --- 공유 기능 끝 ---


        /**
         * 일정표를 UI에 렌더링
         */
        function renderItinerary(itinerary) {
            const listElement = document.getElementById('itinerary-list');
            listElement.innerHTML = ''; // 기존 목록 초기화
           
            itinerary.forEach(day => {
                // Day Header
                let dayHtml = `
                    <li class="mt-4 border-b border-gray-700 pb-2">
                        <h4 class="text-base font-bold text-orange-400 sm:text-lg">${day.day}일차: ${day.date}</h4>
                    </li>
                `;
               
                // Events for the day
                day.events.forEach(event => {
                    let icon;
                    let colorClass = 'text-teal-400';
                    let extraClass = '';
                    switch (event.type) {
                        case 'flight': icon = 'plane'; colorClass = 'text-pink-400'; break;
                        case 'stay': icon = 'hotel'; colorClass = 'text-green-400'; break;
                        case 'activity': icon = 'sparkles'; break;
                        case 'food': icon = 'utensils-crossed'; colorClass = 'text-yellow-400'; extraClass = 'bg-gray-700/50 p-1 rounded'; break; // 맛집 강조
                        default: icon = 'map-pin';
                    }

                    dayHtml += `
                        <li class="flex items-start space-x-3 py-2 ml-3 border-l border-gray-800 pl-3 transition hover:bg-gray-800/50 rounded-r">
                            <i data-lucide="${icon}" class="w-4 h-4 mt-1 ${colorClass} min-w-4 min-h-4"></i>
                            <div class="${extraClass}">
                                <span class="font-medium text-gray-400 text-xs sm:text-sm">${event.time}</span>
                                <p class="text-white text-sm sm:text-base">${event.title}</p>
                            </div>
                        </li>
                    `;
                });

                listElement.innerHTML += dayHtml;
            });
            lucide.createIcons(); // 동적으로 생성된 아이콘 다시 렌더링
        }
       
        // Firebase Setup 시작
        setupFirebase();

        // 탭 전환 로직은 이전과 동일
        const tabsContainer = document.getElementById('search-tabs');
        const tabContents = {
            'flight': document.getElementById('tab-content-flight'),
            'stay': document.getElementById('tab-content-stay'),
            'rental': document.getElementById('tab-content-rental'),
            'activity': document.getElementById('tab-content-activity')
        };
        let activeTab = 'flight';

        tabsContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const targetTab = event.target.getAttribute('data-tab');
                activeTab = targetTab;

                tabsContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('tab-active');
                    btn.classList.add('tab-inactive');
                });
                event.target.classList.remove('tab-inactive');
                event.target.classList.add('tab-active');

                for (const key in tabContents) {
                    if (key === targetTab) {
                        tabContents[key].classList.remove('hidden');
                    } else {
                        tabContents[key].classList.add('hidden');
                    }
                }
            }
        });

        window.onload = function() {
            lucide.createIcons();
        }
    </script>
    <style>
        /* Dark Tropical Theme */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0c0c0c; /* Deep dark background */
            color: #e0e0e0;
        }

        /* --- Global Neon Frame Style (Used for main sections) --- */
        .tropical-neon-frame {
            background: #1a1a1a; /* Dark panel background */
            border-radius: 1.5rem;
            padding: 1.5rem;
            position: relative;
            transition: all 0.3s ease;
           
            /* Multi-layer tropical neon glow/border effect - Orange, Pink, Teal */
            box-shadow:
                /* Inner soft glow (Cyan/Teal) */
                0 0 8px 1px rgba(20, 184, 166, 0.5),
                /* Outer thick border 1 (Orange/Mango) */
                0 0 0 6px #f97316,
                /* Outer thick border 2 (Neon Pink/Magenta) */
                0 0 0 8px #ec4899;
           
            border: 3px solid #0c0c0c; /* Helps separate the box from the shadow */
        }
       
        /* Widget frame for secondary info - Optimized for Mobile */
        .widget-frame {
            background: #222222;
            border-radius: 1rem;
            padding: 1rem;
            border: 1px solid #333333;
            box-shadow: 0 0 5px rgba(16, 185, 129, 0.4); /* Subtle green glow */
            overflow-y: visible;
        }

        /* Neon Buttons for main actions */
        .neon-btn {
            background-color: #14b8a6; /* Vibrant Teal */
            color: #0c0c0c;
            font-weight: 700;
            transition: all 0.2s;
            box-shadow: 0 0 10px rgba(20, 184, 166, 0.7);
        }
        .neon-btn:hover {
            background-color: #0d9488;
            box-shadow: 0 0 15px rgba(20, 184, 166, 1);
        }

        /* Tab styling */
        .tab-active {
            color: #f97316; /* Mango Orange for active tab text */
            border-bottom: 3px solid #f97316;
            font-weight: 600;
        }
        .tab-inactive {
            color: #888888;
            border-bottom: 3px solid transparent;
        }
       
        /* Custom scrollbar for dark theme (for itinerary list) */
        #itinerary-list-container::-webkit-scrollbar {
            width: 8px;
        }
        #itinerary-list-container::-webkit-scrollbar-thumb {
            background-color: #555555;
            border-radius: 10px;
        }
        #itinerary-list-container::-webkit-scrollbar-track {
            background: #222222;
        }
    </style>
<style>*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.mb-1{margin-bottom:0.25rem}.mb-2{margin-bottom:0.5rem}.mb-3{margin-bottom:0.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.mr-1{margin-right:0.25rem}.mr-2{margin-right:0.5rem}.mt-1{margin-top:0.25rem}.mt-10{margin-top:2.5rem}.mt-2{margin-top:0.5rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.inline{display:inline}.flex{display:flex}.grid{display:grid}.hidden{display:none}.h-24{height:6rem}.h-4{height:1rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-8{height:2rem}.max-h-64{max-height:16rem}.min-h-96{min-height:24rem}.min-h-screen{min-height:100vh}.w-4{width:1rem}.w-5{width:1.25rem}.w-6{width:1.5rem}.w-8{width:2rem}.w-full{width:100%}.max-w-6xl{max-width:72rem}.flex-grow{flex-grow:1}.grid-cols-1{grid-template-columns:repeat(1, minmax(0, 1fr))}.grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr))}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-4{gap:1rem}.gap-6{gap:1.5rem}.space-x-1 > :not([hidden]) ~ :not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.25rem * var(--tw-space-x-reverse));margin-left:calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-2 > :not([hidden]) ~ :not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.5rem * var(--tw-space-x-reverse));margin-left:calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))}.space-x-3 > :not([hidden]) ~ :not([hidden]){--tw-space-x-reverse:0;margin-right:calc(0.75rem * var(--tw-space-x-reverse));margin-left:calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))}.space-y-1 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.space-y-3 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.75rem * var(--tw-space-y-reverse))}.space-y-4 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.overflow-y-auto{overflow-y:auto}.rounded-lg{border-radius:0.5rem}.rounded-xl{border-radius:0.75rem}.border{border-width:1px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-gray-600{--tw-border-opacity:1;border-color:rgb(75 85 99 / var(--tw-border-opacity, 1))}.border-gray-700{--tw-border-opacity:1;border-color:rgb(55 65 81 / var(--tw-border-opacity, 1))}.border-gray-800{--tw-border-opacity:1;border-color:rgb(31 41 55 / var(--tw-border-opacity, 1))}.border-teal-600\/50{border-color:rgb(13 148 136 / 0.5)}.bg-gray-700{--tw-bg-opacity:1;background-color:rgb(55 65 81 / var(--tw-bg-opacity, 1))}.bg-gray-800{--tw-bg-opacity:1;background-color:rgb(31 41 55 / var(--tw-bg-opacity, 1))}.bg-orange-600{--tw-bg-opacity:1;background-color:rgb(234 88 12 / var(--tw-bg-opacity, 1))}.bg-pink-600{--tw-bg-opacity:1;background-color:rgb(219 39 119 / var(--tw-bg-opacity, 1))}.bg-pink-600\/50{background-color:rgb(219 39 119 / 0.5)}.bg-yellow-600{--tw-bg-opacity:1;background-color:rgb(202 138 4 / var(--tw-bg-opacity, 1))}.p-2{padding:0.5rem}.p-3{padding:0.75rem}.p-4{padding:1rem}.px-2{padding-left:0.5rem;padding-right:0.5rem}.px-3{padding-left:0.75rem;padding-right:0.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-2\.5{padding-top:0.625rem;padding-bottom:0.625rem}.py-3{padding-top:0.75rem;padding-bottom:0.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pt-4{padding-top:1rem}.text-center{text-align:center}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:0.75rem;line-height:1rem}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-gray-400{--tw-text-opacity:1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-600{--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.text-green-400{--tw-text-opacity:1;color:rgb(74 222 128 / var(--tw-text-opacity, 1))}.text-orange-400{--tw-text-opacity:1;color:rgb(251 146 60 / var(--tw-text-opacity, 1))}.text-orange-500{--tw-text-opacity:1;color:rgb(249 115 22 / var(--tw-text-opacity, 1))}.text-pink-400{--tw-text-opacity:1;color:rgb(244 114 182 / var(--tw-text-opacity, 1))}.text-teal-400{--tw-text-opacity:1;color:rgb(45 212 191 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-400{--tw-text-opacity:1;color:rgb(250 204 21 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity:1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.text-red-400{--tw-text-opacity:1;color:rgb(248 113 113 / var(--tw-text-opacity, 1))}.shadow-none{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.transition{transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-150{transition-duration:150ms}.duration-200{transition-duration:200ms}.duration-300{transition-duration:300ms}.hover\:bg-orange-700:hover{--tw-bg-opacity:1;background-color:rgb(194 65 12 / var(--tw-bg-opacity, 1))}.hover\:bg-pink-600:hover{--tw-bg-opacity:1;background-color:rgb(219 39 119 / var(--tw-bg-opacity, 1))}.hover\:bg-pink-700:hover{--tw-bg-opacity:1;background-color:rgb(190 24 93 / var(--tw-bg-opacity, 1))}.hover\:bg-yellow-700:hover{--tw-bg-opacity:1;background-color:rgb(161 98 7 / var(--tw-bg-opacity, 1))}.hover\:text-orange-300:hover{--tw-text-opacity:1;color:rgb(253 186 116 / var(--tw-text-opacity, 1))}.hover\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.hover\:shadow-orange-500\/50:hover{--tw-shadow-color:rgb(249 115 22 / 0.5);--tw-shadow:var(--tw-shadow-colored)}.hover\:shadow-pink-500\/50:hover{--tw-shadow-color:rgb(236 72 153 / 0.5);--tw-shadow:var(--tw-shadow-colored)}.hover\:shadow-yellow-500\/50:hover{--tw-shadow-color:rgb(234 179 8 / 0.5);--tw-shadow:var(--tw-shadow-colored)}.focus\:border-orange-400:focus{--tw-border-opacity:1;border-color:rgb(251 146 60 / var(--tw-border-opacity, 1))}.focus\:border-pink-400:focus{--tw-border-opacity:1;border-color:rgb(244 114 182 / var(--tw-border-opacity, 1))}.focus\:border-teal-400:focus{--tw-border-opacity:1;border-color:rgb(45 212 191 / var(--tw-border-opacity, 1))}.focus\:border-yellow-400:focus{--tw-border-opacity:1;border-color:rgb(250 204 21 / var(--tw-border-opacity, 1))}.focus\:ring-orange-400:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(251 146 60 / var(--tw-ring-opacity, 1))}.focus\:ring-pink-400:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(244 114 182 / var(--tw-ring-opacity, 1))}.focus\:ring-teal-400:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(45 212 191 / var(--tw-ring-opacity, 1))}.focus\:ring-yellow-400:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(250 204 21 / var(--tw-ring-opacity, 1))}@media (min-width: 640px){.sm\:mb-8{margin-bottom:2rem}.sm\:h-10{height:2.5rem}.sm\:w-10{width:2.5rem}.sm\:p-8{padding:2rem}.sm\:px-4{padding-left:1rem;padding-right:1rem}.sm\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\:text-4xl{font-size:2.25rem;line-height:2.5rem}.sm\:text-base{font-size:1rem;line-height:1.5rem}.sm\:text-lg{font-size:1.125rem;line-height:1.75rem}.sm\:text-sm{font-size:0.875rem;line-height:1.25rem}.sm\:text-xl{font-size:1.25rem;line-height:1.75rem}}@media (min-width: 768px){.md\:grid-cols-2{grid-template-columns:repeat(2, minmax(0, 1fr))}}@media (min-width: 1024px){.lg\:col-span-1{grid-column:span 1 / span 1}.lg\:col-span-2{grid-column:span 2 / span 2}.lg\:grid-cols-3{grid-template-columns:repeat(3, minmax(0, 1fr))}}</style></head>
<body>

    <div id="app" class="min-h-screen p-4 sm:p-8 flex flex-col items-center">
        <!-- Header / Logo -->
        <header class="w-full max-w-6xl mb-6 sm:mb-8 flex flex-col items-center">
             <div class="flex items-center space-x-3 p-3 rounded-xl">
                 <img src="/assets/img/mango-logo.svg" class="h-8" alt="Mango Logo">
                 <img src="/assets/img/travel/travel-mark.svg" class="h-6 opacity-90" alt="Travel Mark">
                <h1 class="text-3xl sm:text-4xl font-extrabold text-white"><span class="sr-only">Mango</span> <span class="text-orange-500">Travel Portal</span></h1>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">여행객, 파트너를 위한 올인원 대시보드</p>
        </header>
       
        <!-- Main Content Grid -->
        <main class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- 1. Left Column (Main Search/User Dashboard) - lg:col-span-2 -->
            <section class="lg:col-span-2 tropical-neon-frame min-h-96">
                <h2 class="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plane-takeoff" class="lucide lucide-plane-takeoff w-6 h-6 text-pink-400"><path d="M2 22h20"></path><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"></path></svg>
                    <span>여행 상품 통합 검색 및 예약</span>
                </h2>
               
                <!-- Search Tabs -->
                <div class="flex border-b border-gray-600 mb-6 text-sm sm:text-base" id="search-tabs">
                    <button class="py-2 px-3 sm:px-4 transition duration-150 tab-active" data-tab="flight">항공권</button>
                    <button class="py-2 px-3 sm:px-4 transition duration-150 tab-inactive" data-tab="stay">숙박</button>
                    <button class="py-2 px-3 sm:px-4 transition duration-150 tab-inactive" data-tab="rental">렌터카</button>
                    <button class="py-2 px-3 sm:px-4 transition duration-150 tab-inactive" data-tab="activity">액티비티</button>
                </div>

                <!-- Tab Content: Flight Search (Default) -->
                <div id="tab-content-flight">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-gray-400 mb-1">출발지 / 도착지</label>
                            <input type="text" placeholder="서울 (ICN) - 뉴욕 (JFK)" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        </div>
                        <div class="flex flex-col">
                            <label class="text-sm font-medium text-gray-400 mb-1">가는 날 / 오는 날</label>
                            <input type="text" placeholder="2025.07.01 - 2025.07.10" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col">
                        <label class="text-sm font-medium text-gray-400 mb-1">인원 및 좌석 등급</label>
                        <input type="text" placeholder="성인 2, 비즈니스" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                    </div>
                    <button class="neon-btn w-full mt-6 py-3 rounded-xl flex items-center justify-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search w-5 h-5"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                        <span>최적의 항공권 검색</span>
                    </button>
                </div>
               
                <!-- Tab Content: Stay Search (Placeholder) -->
                <div id="tab-content-stay" class="hidden">
                    <div class="flex flex-col space-y-4">
                        <input type="text" placeholder="도시 또는 숙소 이름" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        <input type="text" placeholder="체크인 / 체크아웃 날짜" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        <input type="text" placeholder="객실 수, 인원" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        <button class="neon-btn w-full py-3 rounded-xl flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="building" class="lucide lucide-building w-5 h-5"><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M12 6h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M16 6h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path><path d="M8 6h.01"></path><path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path><rect x="4" y="2" width="16" height="20" rx="2"></rect></svg>
                            <span>맞춤형 숙소 검색</span>
                        </button>
                    </div>
                </div>

                <!-- Tab Content: Rental Car Search -->
                <div id="tab-content-rental" class="hidden">
                    <div class="flex flex-col space-y-4">
                        <input type="text" placeholder="픽업 장소 (예: 제주 국제공항)" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="픽업 날짜 및 시간" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                            <input type="text" placeholder="반납 날짜 및 시간" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        </div>
                        <input type="text" placeholder="차량 크기 또는 모델" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-teal-400 focus:border-teal-400 text-white text-sm">
                        <button class="neon-btn w-full py-3 rounded-xl flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="car" class="lucide lucide-car w-5 h-5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
                            <span>렌터카 실시간 검색</span>
                        </button>
                    </div>
                </div>

                <!-- Tab Content: Activity Search (Placeholder) -->
                <div id="tab-content-activity" class="hidden">
                    <p class="text-gray-400 text-sm">액티비티 검색 기능이 이곳에 표시됩니다.</p>
                </div>

            </section>

            <!-- 2. Right Column (Itinerary Scheduler & Partner Check) -->
            <div class="lg:col-span-1 space-y-6">
               
                <!-- Widget 1: My Trip / Itinerary Scheduler (Core Feature) -->
                <section class="widget-frame">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-5 h-5 text-yellow-500"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>My Trip &amp; 여정 스케줄러</span>
                        </h3>
                        <div class="flex space-x-2">
                             <!-- 새로 추가된 공유 버튼 -->
                             <button id="share-trip-btn" class="text-xs bg-pink-600/50 hover:bg-pink-600 text-white py-1 px-2 rounded-lg font-medium flex items-center space-x-1 transition duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="share-2" class="lucide lucide-share-2 w-4 h-4"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                                <span>여행 공유</span>
                            </button>
                             <button class="text-xs text-orange-400 hover:text-orange-300 font-medium flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" class="lucide lucide-plus w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                <span>새 일정</span>
                            </button>
                        </div>
                    </div>
                   
                    <!-- 스케줄 요약 정보 및 공유 피드백 -->
                    <p id="scheduler-status" class="text-sm text-yellow-400 font-medium mb-1 text-red-400">Error: 스케줄 로드 실패. Missing or insufficient permissions.</p>
                    <p id="share-feedback" class="text-sm font-medium mb-2"></p>
                    <p id="itinerary-summary" class="text-xs text-gray-500 mb-4 flex items-center space-x-2">여정을 시작해보세요.</p>
                   
                    <!-- 동선 시각화 Placeholder -->
                    <h4 class="text-base sm:text-lg font-semibold text-teal-400 mb-2 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="route" class="lucide lucide-route w-5 h-5"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>
                        <span>오늘의 동선 (Route Flow)</span>
                    </h4>
                    <div class="bg-gray-800 border border-teal-600/50 p-3 rounded-lg mb-4 h-24 flex items-center justify-center text-center text-sm text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map" class="lucide lucide-map w-5 h-5 mr-2"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path><path d="M15 5.764v15"></path><path d="M9 3.236v15"></path></svg>
                        <span>AI 기반 경로 최적화 맵 (여정 단계 선택 시 표시)</span>
                    </div>

                    <!-- 맛집/장소 검색 -->
                    <h4 class="text-base sm:text-lg font-semibold text-yellow-400 mt-4 mb-2 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="utensils" class="lucide lucide-utensils w-5 h-5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
                        <span>맛집/장소 검색 및 추가</span>
                    </h4>
                    <div class="flex space-x-2 mb-4">
                        <input type="text" id="restaurant-search-input" placeholder="맛집 또는 관광지 검색" class="flex-grow p-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400 text-white text-sm">
                        <button class="neon-btn bg-yellow-600 hover:bg-yellow-700 shadow-none hover:shadow-lg hover:shadow-yellow-500/50 py-2 px-3 rounded-lg text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search w-4 h-4 inline"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                        </button>
                    </div>
                   
                    <!-- 일정표 (Timetable) -->
                    <h4 class="text-base sm:text-lg font-semibold text-teal-400 mt-4 mb-2 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="calendar-days" class="lucide lucide-calendar-days w-5 h-5"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                        <span>여행 상세 일정표</span>
                    </h4>
                    <div id="itinerary-list-container" class="bg-gray-800 p-3 rounded-lg max-h-64 overflow-y-auto border border-gray-700">
                        <ul id="itinerary-list" class="text-sm space-y-1">
                            <!-- 일정 데이터가 여기에 동적으로 로드됩니다 -->
                            <li class="text-center text-gray-500 py-4">Firebase 데이터를 로드하는 중...</li>
                        </ul>
                    </div>
                   
                    <!-- 메모 (Memo) -->
                    <h4 class="text-base sm:text-lg font-semibold text-pink-400 mt-4 mb-2 flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="book-open" class="lucide lucide-book-open w-5 h-5"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                        <span>개인 메모</span>
                    </h4>
                    <textarea id="current-memo" placeholder="여행 중 필요한 중요한 메모를 남겨주세요." rows="3" class="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-pink-400 focus:border-pink-400 text-white text-sm"></textarea>
                    <div class="flex justify-between items-center mt-2">
                        <button id="save-memo-btn" class="neon-btn bg-pink-600 hover:bg-pink-700 shadow-none hover:shadow-lg hover:shadow-pink-500/50 py-2 px-4 rounded-lg text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="save" class="lucide lucide-save w-4 h-4 inline mr-1"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg> 메모 저장
                        </button>
                        <!-- 메모 저장 결과 피드백 -->
                        <span id="memo-feedback" class="text-xs text-green-400 transition-opacity duration-300"></span>
                    </div>
                </section>
               
                <!-- Widget 2: Partner Portal -->
                <section class="widget-frame">
                    <h3 class="text-lg sm:text-xl font-bold text-white mb-4 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="handshake" class="lucide lucide-handshake w-5 h-5 text-orange-500"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg>
                        <span>파트너 포털</span>
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">여행사/항공사/숙박업 파트너 연동 상태 확인 및 예약 관리</p>
                    <div class="flex flex-col space-y-3">
                        <input type="text" placeholder="위치 또는 숙박업체 이름 검색 (예: 제주 신라)" class="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-orange-400 focus:border-orange-400 text-white text-sm">
                        <button class="neon-btn bg-orange-600 hover:bg-orange-700 shadow-none hover:shadow-lg hover:shadow-orange-500/50 w-full py-2.5 rounded-lg flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin w-5 h-5"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span>주변 파트너 숙소 확인</span>
                        </button>
                    </div>
                </section>

            </div>

        </main>
       
        <!-- Footer -->
        <footer class="w-full max-w-6xl mt-10 text-center text-xs sm:text-sm text-gray-600 border-t border-gray-800 pt-4">
            <p id="user-id-display" class="mb-1">사용자 ID: 10868152638054712607</p>
            © 2025 Mango Travel Corp. | Tropical Vibes UI
        </footer>
    </div>

</body></html>