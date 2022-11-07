/**
 * @name car-service
 * @description Easy and convenient way to register cars and their repairs.
 *
 * @version 1.0.0
 * @author Deyan 'stambolievv' Stamboliev
 * @license Apache-2.0
 */
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var ge=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},Y=We,$t=$e,yt=At,_t=Ye,bt=Ke,wt=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function $e(t){for(var e=[],n=0,s=0,r="",i;(i=wt.exec(t))!=null;){var a=i[0],o=i[1],l=i.index;if(r+=t.slice(s,l),s=l+a.length,o){r+=o[1];continue}r&&(e.push(r),r="");var c=i[2],d=i[3],h=i[4],p=i[5],v=i[6],P=i[7],T=v==="+"||v==="*",vt=v==="?"||v==="*",Se=c||"/",mt=h||p||(P?".*":"[^"+Se+"]+?");e.push({name:d||n++,prefix:c||"",delimiter:Se,optional:vt,repeat:T,pattern:Et(mt)})}return s<t.length&&(r+=t.substr(s)),r&&e.push(r),e}function At(t){return Ye($e(t))}function Ye(t){for(var e=new Array(t.length),n=0;n<t.length;n++)typeof t[n]=="object"&&(e[n]=new RegExp("^"+t[n].pattern+"$"));return function(s){for(var r="",i=s||{},a=0;a<t.length;a++){var o=t[a];if(typeof o=="string"){r+=o;continue}var l=i[o.name],c;if(l==null){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to be defined')}if(ge(l)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but received "'+l+'"');if(l.length===0){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(c=encodeURIComponent(l[d]),!e[a].test(c))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'", but received "'+c+'"');r+=(d===0?o.prefix:o.delimiter)+c}continue}if(c=encodeURIComponent(l),!e[a].test(c))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but received "'+c+'"');r+=o.prefix+c}return r}}function Ne(t){return t.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function Et(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function ye(t,e){return t.keys=e,t}function Ge(t){return t.sensitive?"":"i"}function Ct(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var s=0;s<n.length;s++)e.push({name:s,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return ye(t,e)}function Rt(t,e,n){for(var s=[],r=0;r<t.length;r++)s.push(We(t[r],e,n).source);var i=new RegExp("(?:"+s.join("|")+")",Ge(n));return ye(i,e)}function St(t,e,n){for(var s=$e(t),r=Ke(s,n),i=0;i<s.length;i++)typeof s[i]!="string"&&e.push(s[i]);return ye(r,e)}function Ke(t,e){e=e||{};for(var n=e.strict,s=e.end!==!1,r="",i=t[t.length-1],a=typeof i=="string"&&/\/$/.test(i),o=0;o<t.length;o++){var l=t[o];if(typeof l=="string")r+=Ne(l);else{var c=Ne(l.prefix),d=l.pattern;l.repeat&&(d+="(?:"+c+d+")*"),l.optional?c?d="(?:"+c+"("+d+"))?":d="("+d+")?":d=c+"("+d+")",r+=d}}return n||(r=(a?r.slice(0,-2):r)+"(?:\\/(?=$))?"),s?r+="$":r+=n&&a?"":"(?=\\/|$)",new RegExp("^"+r,Ge(e))}function We(t,e,n){return e=e||[],ge(e)?n||(n={}):(n=e,e=[]),t instanceof RegExp?Ct(t,e):ge(t)?Rt(t,e,n):St(t,e,n)}Y.parse=$t;Y.compile=yt;Y.tokensToFunction=_t;Y.tokensToRegExp=bt;var U=typeof document<"u",$=typeof window<"u",ie=typeof history<"u",Nt=typeof process<"u",ve=U&&document.ontouchstart?"touchstart":"click",_=$&&!!(window.history.location||window.location);function g(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}g.prototype.configure=function(t){var e=t||{};this._window=e.window||$&&window,this._decodeURLComponents=e.decodeURLComponents!==!1,this._popstate=e.popstate!==!1&&$,this._click=e.click!==!1&&U,this._hashbang=!!e.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):$&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(ve,this.clickHandler,!1):U&&n.document.removeEventListener(ve,this.clickHandler,!1),this._hashbang&&$&&!ie?n.addEventListener("hashchange",this._onpopstate,!1):$&&n.removeEventListener("hashchange",this._onpopstate,!1)};g.prototype.base=function(t){if(arguments.length===0)return this._base;this._base=t};g.prototype._getBase=function(){var t=this._base;if(t)return t;var e=$&&this._window&&this._window.location;return $&&this._hashbang&&e&&e.protocol==="file:"&&(t=e.pathname),t};g.prototype.strict=function(t){if(arguments.length===0)return this._strict;this._strict=t};g.prototype.start=function(t){var e=t||{};if(this.configure(e),e.dispatch!==!1){this._running=!0;var n;if(_){var s=this._window,r=s.location;this._hashbang&&~r.hash.indexOf("#!")?n=r.hash.substr(2)+r.search:this._hashbang?n=r.search+r.hash:n=r.pathname+r.search+r.hash}this.replace(n,null,!0,e.dispatch)}};g.prototype.stop=function(){if(!!this._running){this.current="",this.len=0,this._running=!1;var t=this._window;this._click&&t.document.removeEventListener(ve,this.clickHandler,!1),$&&t.removeEventListener("popstate",this._onpopstate,!1),$&&t.removeEventListener("hashchange",this._onpopstate,!1)}};g.prototype.show=function(t,e,n,s){var r=new G(t,e,this),i=this.prevContext;return this.prevContext=r,this.current=r.path,n!==!1&&this.dispatch(r,i),r.handled!==!1&&s!==!1&&r.pushState(),r};g.prototype.back=function(t,e){var n=this;if(this.len>0){var s=this._window;ie&&s.history.back(),this.len--}else setTimeout(t?function(){n.show(t,e)}:function(){n.show(n._getBase(),e)})};g.prototype.redirect=function(t,e){var n=this;typeof t=="string"&&typeof e=="string"&&ae.call(this,t,function(s){setTimeout(function(){n.replace(e)},0)}),typeof t=="string"&&typeof e>"u"&&setTimeout(function(){n.replace(t)},0)};g.prototype.replace=function(t,e,n,s){var r=new G(t,e,this),i=this.prevContext;return this.prevContext=r,this.current=r.path,r.init=n,r.save(),s!==!1&&this.dispatch(r,i),r};g.prototype.dispatch=function(t,e){var n=0,s=0,r=this;function i(){var o=r.exits[s++];if(!o)return a();o(e,i)}function a(){var o=r.callbacks[n++];if(t.path!==r.current){t.handled=!1;return}if(!o)return Pt.call(r,t);o(t,a)}e?i():a()};g.prototype.exit=function(t,e){if(typeof t=="function")return this.exit("*",t);for(var n=new K(t,null,this),s=1;s<arguments.length;++s)this.exits.push(n.middleware(arguments[s]))};g.prototype.clickHandler=function(t){if(this._which(t)===1&&!(t.metaKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented){var e=t.target,n=t.path||(t.composedPath?t.composedPath():null);if(n){for(var s=0;s<n.length;s++)if(!!n[s].nodeName&&n[s].nodeName.toUpperCase()==="A"&&!!n[s].href){e=n[s];break}}for(;e&&e.nodeName.toUpperCase()!=="A";)e=e.parentNode;if(!(!e||e.nodeName.toUpperCase()!=="A")){var r=typeof e.href=="object"&&e.href.constructor.name==="SVGAnimatedString";if(!(e.hasAttribute("download")||e.getAttribute("rel")==="external")){var i=e.getAttribute("href");if(!(!this._hashbang&&this._samePath(e)&&(e.hash||i==="#"))&&!(i&&i.indexOf("mailto:")>-1)&&!(r?e.target.baseVal:e.target)&&!(!r&&!this.sameOrigin(e.href))){var a=r?e.href.baseVal:e.pathname+e.search+(e.hash||"");a=a[0]!=="/"?"/"+a:a,Nt&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var o=a,l=this._getBase();a.indexOf(l)===0&&(a=a.substr(l.length)),this._hashbang&&(a=a.replace("#!","")),!(l&&o===a&&(!_||this._window.location.protocol!=="file:"))&&(t.preventDefault(),this.show(o))}}}}};g.prototype._onpopstate=function(){var t=!1;return $?(U&&document.readyState==="complete"?t=!0:window.addEventListener("load",function(){setTimeout(function(){t=!0},0)}),function(n){if(!!t){var s=this;if(n.state){var r=n.state.path;s.replace(r,n.state)}else if(_){var i=s._window.location;s.show(i.pathname+i.search+i.hash,void 0,void 0,!1)}}}):function(){}}();g.prototype._which=function(t){return t=t||$&&this._window.event,t.which==null?t.button:t.which};g.prototype._toURL=function(t){var e=this._window;if(typeof URL=="function"&&_)return new URL(t,e.location.toString());if(U){var n=e.document.createElement("a");return n.href=t,n}};g.prototype.sameOrigin=function(t){if(!t||!_)return!1;var e=this._toURL(t),n=this._window,s=n.location;return s.protocol===e.protocol&&s.hostname===e.hostname&&(s.port===e.port||s.port===""&&(e.port==80||e.port==443))};g.prototype._samePath=function(t){if(!_)return!1;var e=this._window,n=e.location;return t.pathname===n.pathname&&t.search===n.search};g.prototype._decodeURLEncodedURIComponent=function(t){return typeof t!="string"?t:this._decodeURLComponents?decodeURIComponent(t.replace(/\+/g," ")):t};function Ze(){var t=new g;function e(){return ae.apply(t,arguments)}return e.callbacks=t.callbacks,e.exits=t.exits,e.base=t.base.bind(t),e.strict=t.strict.bind(t),e.start=t.start.bind(t),e.stop=t.stop.bind(t),e.show=t.show.bind(t),e.back=t.back.bind(t),e.redirect=t.redirect.bind(t),e.replace=t.replace.bind(t),e.dispatch=t.dispatch.bind(t),e.exit=t.exit.bind(t),e.configure=t.configure.bind(t),e.sameOrigin=t.sameOrigin.bind(t),e.clickHandler=t.clickHandler.bind(t),e.create=Ze,Object.defineProperty(e,"len",{get:function(){return t.len},set:function(n){t.len=n}}),Object.defineProperty(e,"current",{get:function(){return t.current},set:function(n){t.current=n}}),e.Context=G,e.Route=K,e}function ae(t,e){if(typeof t=="function")return ae.call(this,"*",t);if(typeof e=="function")for(var n=new K(t,null,this),s=1;s<arguments.length;++s)this.callbacks.push(n.middleware(arguments[s]));else typeof t=="string"?this[typeof e=="string"?"redirect":"show"](t,e):this.start(t)}function Pt(t){if(!t.handled){var e,n=this,s=n._window;n._hashbang?e=_&&this._getBase()+s.location.hash.replace("#!",""):e=_&&s.location.pathname+s.location.search,e!==t.canonicalPath&&(n.stop(),t.handled=!1,_&&(s.location.href=t.canonicalPath))}}function Tt(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function G(t,e,n){var s=this.page=n||ae,r=s._window,i=s._hashbang,a=s._getBase();t[0]==="/"&&t.indexOf(a)!==0&&(t=a+(i?"#!":"")+t);var o=t.indexOf("?");this.canonicalPath=t;var l=new RegExp("^"+Tt(a));if(this.path=t.replace(l,"")||"/",i&&(this.path=this.path.replace("#!","")||"/"),this.title=U&&r.document.title,this.state=e||{},this.state.path=t,this.querystring=~o?s._decodeURLEncodedURIComponent(t.slice(o+1)):"",this.pathname=s._decodeURLEncodedURIComponent(~o?t.slice(0,o):t),this.params={},this.hash="",!i){if(!~this.path.indexOf("#"))return;var c=this.path.split("#");this.path=this.pathname=c[0],this.hash=s._decodeURLEncodedURIComponent(c[1])||"",this.querystring=this.querystring.split("#")[0]}}G.prototype.pushState=function(){var t=this.page,e=t._window,n=t._hashbang;t.len++,ie&&e.history.pushState(this.state,this.title,n&&this.path!=="/"?"#!"+this.path:this.canonicalPath)};G.prototype.save=function(){var t=this.page;ie&&t._window.history.replaceState(this.state,this.title,t._hashbang&&this.path!=="/"?"#!"+this.path:this.canonicalPath)};function K(t,e,n){var s=this.page=n||_e,r=e||{};r.strict=r.strict||s._strict,this.path=t==="*"?"(.*)":t,this.method="GET",this.regexp=Y(this.path,this.keys=[],r)}K.prototype.middleware=function(t){var e=this;return function(n,s){if(e.match(n.path,n.params))return n.routePath=e.path,t(n,s);s()}};K.prototype.match=function(t,e){var n=this.keys,s=t.indexOf("?"),r=~s?t.slice(0,s):t,i=this.regexp.exec(decodeURIComponent(r));if(!i)return!1;delete e[0];for(var a=1,o=i.length;a<o;++a){var l=n[a-1],c=this.page._decodeURLEncodedURIComponent(i[a]);(c!==void 0||!hasOwnProperty.call(e,l.name))&&(e[l.name]=c)}return!0};var _e=Ze(),m=_e,Ot=_e;m.default=Ot;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=window,be=Q.ShadowRoot&&(Q.ShadyCSS===void 0||Q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Je=Symbol(),Pe=new WeakMap;class It{constructor(e,n,s){if(this._$cssResult$=!0,s!==Je)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(be&&e===void 0){const s=n!==void 0&&n.length===1;s&&(e=Pe.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Pe.set(n,e))}return e}toString(){return this.cssText}}const Ut=t=>new It(typeof t=="string"?t:t+"",void 0,Je),xt=(t,e)=>{be?t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet):e.forEach(n=>{const s=document.createElement("style"),r=Q.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=n.cssText,t.appendChild(s)})},Te=be?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const s of e.cssRules)n+=s.cssText;return Ut(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de;const te=window,Oe=te.trustedTypes,Lt=Oe?Oe.emptyScript:"",Ie=te.reactiveElementPolyfillSupport,me={toAttribute(t,e){switch(e){case Boolean:t=t?Lt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},Xe=(t,e)=>e!==t&&(e==e||t==t),he={attribute:!0,type:String,converter:me,reflect:!1,hasChanged:Xe};class O extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var n;this.finalize(),((n=this.h)!==null&&n!==void 0?n:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((n,s)=>{const r=this._$Ep(s,n);r!==void 0&&(this._$Ev.set(r,s),e.push(r))}),e}static createProperty(e,n=he){if(n.state&&(n.attribute=!1),this.finalize(),this.elementProperties.set(e,n),!n.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,s,n);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,n,s){return{get(){return this[n]},set(r){const i=this[e];this[n]=r,this.requestUpdate(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||he}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const n=this.properties,s=[...Object.getOwnPropertyNames(n),...Object.getOwnPropertySymbols(n)];for(const r of s)this.createProperty(r,n[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)n.unshift(Te(r))}else e!==void 0&&n.push(Te(e));return n}static _$Ep(e,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(n=>n(this))}addController(e){var n,s;((n=this._$ES)!==null&&n!==void 0?n:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var n;(n=this._$ES)===null||n===void 0||n.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,n)=>{this.hasOwnProperty(n)&&(this._$Ei.set(n,this[n]),delete this[n])})}createRenderRoot(){var e;const n=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return xt(n,this.constructor.elementStyles),n}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var s;return(s=n.hostConnected)===null||s===void 0?void 0:s.call(n)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(n=>{var s;return(s=n.hostDisconnected)===null||s===void 0?void 0:s.call(n)})}attributeChangedCallback(e,n,s){this._$AK(e,s)}_$EO(e,n,s=he){var r;const i=this.constructor._$Ep(e,s);if(i!==void 0&&s.reflect===!0){const a=(((r=s.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?s.converter:me).toAttribute(n,s.type);this._$El=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$El=null}}_$AK(e,n){var s;const r=this.constructor,i=r._$Ev.get(e);if(i!==void 0&&this._$El!==i){const a=r.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?a.converter:me;this._$El=i,this[i]=o.fromAttribute(n,a.type),this._$El=null}}requestUpdate(e,n,s){let r=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Xe)(this[e],n)?(this._$AL.has(e)||this._$AL.set(e,n),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,i)=>this[i]=r),this._$Ei=void 0);let n=!1;const s=this._$AL;try{n=this.shouldUpdate(s),n?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(r=>{var i;return(i=r.hostUpdate)===null||i===void 0?void 0:i.call(r)}),this.update(s)):this._$Ek()}catch(r){throw n=!1,this._$Ek(),r}n&&this._$AE(s)}willUpdate(e){}_$AE(e){var n;(n=this._$ES)===null||n===void 0||n.forEach(s=>{var r;return(r=s.hostUpdated)===null||r===void 0?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((n,s)=>this._$EO(s,this[s],n)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}O.finalized=!0,O.elementProperties=new Map,O.elementStyles=[],O.shadowRootOptions={mode:"open"},Ie==null||Ie({ReactiveElement:O}),((de=te.reactiveElementVersions)!==null&&de!==void 0?de:te.reactiveElementVersions=[]).push("1.4.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const ne=window,x=ne.trustedTypes,Ue=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,Fe="?"+w,kt=`<${Fe}>`,L=document,M=(t="")=>L.createComment(t),z=t=>t===null||typeof t!="object"&&typeof t!="function",Qe=Array.isArray,Dt=t=>Qe(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xe=/-->/g,Le=/>/g,R=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ke=/'/g,De=/"/g,et=/^(?:script|style|textarea|title)$/i,jt=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),u=jt(1),A=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),je=new WeakMap,I=L.createTreeWalker(L,129,null,!1),Bt=(t,e)=>{const n=t.length-1,s=[];let r,i=e===2?"<svg>":"",a=j;for(let l=0;l<n;l++){const c=t[l];let d,h,p=-1,v=0;for(;v<c.length&&(a.lastIndex=v,h=a.exec(c),h!==null);)v=a.lastIndex,a===j?h[1]==="!--"?a=xe:h[1]!==void 0?a=Le:h[2]!==void 0?(et.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=R):h[3]!==void 0&&(a=R):a===R?h[0]===">"?(a=r!=null?r:j,p=-1):h[1]===void 0?p=-2:(p=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?R:h[3]==='"'?De:ke):a===De||a===ke?a=R:a===xe||a===Le?a=j:(a=R,r=void 0);const P=a===R&&t[l+1].startsWith("/>")?" ":"";i+=a===j?c+kt:p>=0?(s.push(d),c.slice(0,p)+"$lit$"+c.slice(p)+w+P):c+w+(p===-2?(s.push(void 0),l):P)}const o=i+(t[n]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Ue!==void 0?Ue.createHTML(o):o,s]};class q{constructor({strings:e,_$litType$:n},s){let r;this.parts=[];let i=0,a=0;const o=e.length-1,l=this.parts,[c,d]=Bt(e,n);if(this.el=q.createElement(c,s),I.currentNode=this.el.content,n===2){const h=this.el.content,p=h.firstChild;p.remove(),h.append(...p.childNodes)}for(;(r=I.nextNode())!==null&&l.length<o;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const p of r.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith(w)){const v=d[a++];if(h.push(p),v!==void 0){const P=r.getAttribute(v.toLowerCase()+"$lit$").split(w),T=/([.?@])?(.*)/.exec(v);l.push({type:1,index:i,name:T[2],strings:P,ctor:T[1]==="."?Mt:T[1]==="?"?qt:T[1]==="@"?Vt:oe})}else l.push({type:6,index:i})}for(const p of h)r.removeAttribute(p)}if(et.test(r.tagName)){const h=r.textContent.split(w),p=h.length-1;if(p>0){r.textContent=x?x.emptyScript:"";for(let v=0;v<p;v++)r.append(h[v],M()),I.nextNode(),l.push({type:2,index:++i});r.append(h[p],M())}}}else if(r.nodeType===8)if(r.data===Fe)l.push({type:2,index:i});else{let h=-1;for(;(h=r.data.indexOf(w,h+1))!==-1;)l.push({type:7,index:i}),h+=w.length-1}i++}}static createElement(e,n){const s=L.createElement("template");return s.innerHTML=e,s}}function k(t,e,n=t,s){var r,i,a,o;if(e===A)return e;let l=s!==void 0?(r=n._$Co)===null||r===void 0?void 0:r[s]:n._$Cl;const c=z(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((i=l==null?void 0:l._$AO)===null||i===void 0||i.call(l,!1),c===void 0?l=void 0:(l=new c(t),l._$AT(t,n,s)),s!==void 0?((a=(o=n)._$Co)!==null&&a!==void 0?a:o._$Co=[])[s]=l:n._$Cl=l),l!==void 0&&(e=k(t,l._$AS(t,e.values),l,s)),e}class Ht{constructor(e,n){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var n;const{el:{content:s},parts:r}=this._$AD,i=((n=e==null?void 0:e.creationScope)!==null&&n!==void 0?n:L).importNode(s,!0);I.currentNode=i;let a=I.nextNode(),o=0,l=0,c=r[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new W(a,a.nextSibling,this,e):c.type===1?d=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(d=new Yt(a,this,e)),this.u.push(d),c=r[++l]}o!==(c==null?void 0:c.index)&&(a=I.nextNode(),o++)}return i}p(e){let n=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,n),n+=s.strings.length-2):s._$AI(e[n])),n++}}class W{constructor(e,n,s,r){var i;this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=s,this.options=r,this._$Cm=(i=r==null?void 0:r.isConnected)===null||i===void 0||i}get _$AU(){var e,n;return(n=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&n!==void 0?n:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&e.nodeType===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=k(this,e,n),z(e)?e===f||e==null||e===""?(this._$AH!==f&&this._$AR(),this._$AH=f):e!==this._$AH&&e!==A&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Dt(e)?this.k(e):this.g(e)}O(e,n=this._$AB){return this._$AA.parentNode.insertBefore(e,n)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==f&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){var n;const{values:s,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=q.createElement(r.h,this.options)),r);if(((n=this._$AH)===null||n===void 0?void 0:n._$AD)===i)this._$AH.p(s);else{const a=new Ht(i,this),o=a.v(this.options);a.p(s),this.T(o),this._$AH=a}}_$AC(e){let n=je.get(e.strings);return n===void 0&&je.set(e.strings,n=new q(e)),n}k(e){Qe(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,r=0;for(const i of e)r===n.length?n.push(s=new W(this.O(M()),this.O(M()),this,this.options)):s=n[r],s._$AI(i),r++;r<n.length&&(this._$AR(s&&s._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,n);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var n;this._$AM===void 0&&(this._$Cm=e,(n=this._$AP)===null||n===void 0||n.call(this,e))}}class oe{constructor(e,n,s,r,i){this.type=1,this._$AH=f,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,n=this,s,r){const i=this.strings;let a=!1;if(i===void 0)e=k(this,e,n,0),a=!z(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{const o=e;let l,c;for(e=i[0],l=0;l<i.length-1;l++)c=k(this,o[s+l],n,l),c===A&&(c=this._$AH[l]),a||(a=!z(c)||c!==this._$AH[l]),c===f?e=f:e!==f&&(e+=(c!=null?c:"")+i[l+1]),this._$AH[l]=c}a&&!r&&this.j(e)}j(e){e===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Mt extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===f?void 0:e}}const zt=x?x.emptyScript:"";class qt extends oe{constructor(){super(...arguments),this.type=4}j(e){e&&e!==f?this.element.setAttribute(this.name,zt):this.element.removeAttribute(this.name)}}class Vt extends oe{constructor(e,n,s,r,i){super(e,n,s,r,i),this.type=5}_$AI(e,n=this){var s;if((e=(s=k(this,e,n,0))!==null&&s!==void 0?s:f)===A)return;const r=this._$AH,i=e===f&&r!==f||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==f&&(r===f||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n,s;typeof this._$AH=="function"?this._$AH.call((s=(n=this.options)===null||n===void 0?void 0:n.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class Yt{constructor(e,n,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const Be=ne.litHtmlPolyfillSupport;Be==null||Be(q,W),((ue=ne.litHtmlVersions)!==null&&ue!==void 0?ue:ne.litHtmlVersions=[]).push("2.4.0");const tt=(t,e,n)=>{var s,r;const i=(s=n==null?void 0:n.renderBefore)!==null&&s!==void 0?s:e;let a=i._$litPart$;if(a===void 0){const o=(r=n==null?void 0:n.renderBefore)!==null&&r!==void 0?r:null;i._$litPart$=a=new W(e.insertBefore(M(),o),o,void 0,n!=null?n:{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe,fe;class ee extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,n;const s=super.createRenderRoot();return(e=(n=this.renderOptions).renderBefore)!==null&&e!==void 0||(n.renderBefore=s.firstChild),s}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(n,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return A}}ee.finalized=!0,ee._$litElement$=!0,(pe=globalThis.litElementHydrateSupport)===null||pe===void 0||pe.call(globalThis,{LitElement:ee});const He=globalThis.litElementPolyfillSupport;He==null||He({LitElement:ee});((fe=globalThis.litElementVersions)!==null&&fe!==void 0?fe:globalThis.litElementVersions=[]).push("3.2.2");const Me={protocol:"https:",hostname:"parseapi.back4app.com"};async function le(t,e){try{const n=await fetch(`${Me.protocol}//${Me.hostname}${t}`,e);if(n.ok!==!0){n.status==403&&rt();const s=await n.json();throw new Error(s.error)}try{return await n.json()}catch{return n}}catch(n){throw n}}function ce(t,e){const n={method:t,headers:{"X-Parse-Application-Id":"0oqWvkMylRfPgcnXNXtOUe8SWSqDZPiHktiLW9Np","X-Parse-REST-API-Key":"4YzVVeTWOVJyamwDNrNaafCLGzwC5qWnt7dw9aot"}};typeof e<"u"&&(n.headers["Content-Type"]="application/json",n.body=JSON.stringify(e));const s=S();return s!==null&&(n.headers["X-Parse-Session-Token"]=s.token),n}const b=async t=>le(t,ce("GET")),Z=async(t,e)=>le(t,ce("POST",e)),nt=async(t,e)=>le(t,ce("PUT",e)),we=async t=>le(t,ce("DELETE")),Ae={LOGIN:"/login",REGISTER:"/users",LOGOUT:"/logout"};async function Gt(t){const e=await Z(Ae.LOGIN,t),n=JSON.stringify({username:t.username,id:e.objectId,token:e.sessionToken});return st(n),e}async function Kt(t){const e=await Z(Ae.REGISTER,t),n=JSON.stringify({username:t.username,id:e.objectId,token:e.sessionToken});return st(n),e}async function Wt(){await Z(Ae.LOGOUT,{}),rt()}const Ee="car_service_current_user_data";function S(){return JSON.parse(sessionStorage.getItem(Ee))}function st(t){sessionStorage.setItem(Ee,t)}function rt(){sessionStorage.removeItem(Ee)}function D(t,...e){const n=new FormData(t),s=e.reduce((l,c)=>Object.assign(l,{[c]:n.get(c).trim()}),{}),r=["vin","make","date","engine","description","profit"],i=Object.entries(s).reduce((l,[c,d])=>Object.assign(l,{[c]:!r.includes(c)&&d===""}),{});Object.values(i).filter(l=>l===!0).length>0&&o("\u041F\u043E\u043B\u0435\u0442\u0430\u0442\u0430 \u0441\u0430 \u0437\u0430\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u0438!"),s.username&&s.username.length<5&&(Object.assign(i,{username:!0}),o("\u041F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0441\u043A\u043E\u0442\u043E \u0438\u043C\u0435 \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 \u043F\u043E\u043D\u0435 5 \u0441\u0438\u043C\u0432\u043E\u043B\u0430!")),s.password&&s.password.length<6&&s.repass&&(Object.assign(i,{password:!0}),s.repass.length<6&&Object.assign(i,{repass:!0}),o("\u041F\u0430\u0440\u043E\u043B\u0430\u0442\u0430 \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 \u043F\u043E\u043D\u0435 6 \u0441\u0438\u043C\u0432\u043E\u043B\u0430!")),s.password!==s.repass&&s.repass&&(Object.assign(i,{password:!0,repass:!0}),o("\u041F\u0430\u0440\u043E\u043B\u0438\u0442\u0435 \u043D\u0435 \u0441\u044A\u0432\u043F\u0430\u0434\u0430\u0442!"));function o(l=""){throw{errorMsg:new Error(l).message,errorType:i,errorData:s}}return t.reset(),s}function Zt(t){const e=t.split(".");return e.length!==3?e.join("."):e.map((n,s)=>s===2?n:`0${n}`.slice(-2)).join(".")}function it(t){return t===""?{}:t.split("&").reduce((e,n)=>{const[s,r]=n.split("=");return Object.assign(e,{[s]:r})},{})}function y(t){const e=document.createElement(t.tag);for(const n in t)n==="children"?t[n].forEach(s=>e.appendChild(s)):n==="attributes"?t[n].forEach(s=>e.setAttribute(s.key,s.value)):n==="style"?Object.keys(t[n]).forEach(s=>e.style[s]=t.style[s]):n==="listeners"?Object.entries(t[n]).forEach(([s,r])=>e.addEventListener(s,i=>r(i))):e[n]=t[n];return e}const at=y({tag:"a",textContent:"\u0414\u0410",className:"btn-info",href:"javascript:void(0)"}),ot=y({tag:"a",textContent:"\u041E\u0422\u041A\u0410\u0417",className:"btn-danger",href:"javascript:void(0)"}),ze=y({tag:"div",className:"overlay",children:[y({tag:"div",className:"modal",children:[y({tag:"p",className:"modal-message"}),y({tag:"div",className:"actions",children:[y({tag:"div",children:[at]}),y({tag:"div",children:[ot]})]})]})]});let Ce;at.addEventListener("click",()=>Ce(!0));ot.addEventListener("click",()=>Ce(!1));function lt(t){return document.body.appendChild(ze),document.querySelector(".modal-message").textContent=t,new Promise(e=>{Ce=n=>ze.remove()&&e(n)})}const Jt=y({tag:"section",id:"notifications",children:[y({tag:"div",className:"notification",children:[y({tag:"span",className:"notification-span"})]})]});document.body.appendChild(Jt);function ct(t,e="errorBox"){const n=document.querySelector(".notification-span"),s=document.querySelector(".notification");n.textContent=t,s.id=e,s.style.display="block",s.style.opacity=1,setTimeout(()=>{const r=setInterval(()=>{if(s.style.opacity>0)return s.style.opacity-=.05;clearInterval(r),s.style.display="none"},30)},3e3)}const se={container:document.getElementById("site-content"),userNav:document.getElementById("userNav"),guestNav:document.getElementById("guestNav"),logoutBtn:document.getElementById("logoutBtn")};se.logoutBtn.addEventListener("click",Qt);function Xt(t,e){Object.assign(t,{render:n=>tt(n,se.container),updateNavigation:Re,getUserData:S,ownerUserOnly:Ft,showModal:lt,showNotify:ct}),e()}function N(t,e){S()!==null?e():m.redirect("/")}function Ft(t){const e=S();(e==null?void 0:e.id)!==t.owner.objectId&&m.redirect("/")}function Re(){const t=S();se.userNav.style.display=t?"inline-block":"none",se.guestNav.style.display=t?"none":"inline-block"}async function Qt(){if(!!await lt("\u0421\u0438\u0433\u0443\u0440\u0435\u043D \u043B\u0438 \u0441\u0438, \u0447\u0435 \u0438\u0441\u043A\u0430\u0448 \u0434\u0430 \u0438\u0437\u043B\u0435\u0437\u0435\u0448?"))try{await Wt(),Re(),m.redirect("/")}catch(e){ct(e.message,"errorBox")}}Re();function dt(t,e=""){return encodeURIComponent(JSON.stringify({[e]:{$regex:`(?i)${t}`}}))}function V(t,e,n){return{[t]:{__type:"Pointer",className:e,objectId:n}}}const X=10,B="/classes/Car",E={CREATE_CAR:`${B}`,CAR_BY_ID:t=>`${B}/${t}`,ALL_CARS:t=>`${B}?&order=-createdAt${t?`&skip=${(t-1)*X}&limit=${X}`:""}`,CARS_COUNT:t=>`${B}?count=1${t?`&where=${t}`:""}`,SEARCH_CARS:(t,e)=>`${B}?where=${e}&skip=${(t-1)*X}&limit=${X}`};async function en(t,e,n){return b(e?E.SEARCH_CARS(t,dt(e,n)):E.ALL_CARS(t))}async function tn(t,e){return b(t?E.CARS_COUNT(dt(t,e)):E.CARS_COUNT())}async function ht(t){return b(E.CAR_BY_ID(t))}async function nn(t){const{id:e}=S(),n=Object.assign({},t,V("owner","_User",e));return Z(E.CREATE_CAR,n)}async function sn(t,e){return nt(E.CAR_BY_ID(t),e)}async function rn(t){return we(E.CAR_BY_ID(t))}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const an=t=>t===null||typeof t!="object"&&typeof t!="function",on=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ln={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},cn=t=>(...e)=>({_$litDirective$:t,values:e});class dn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,s){this._$Ct=e,this._$AM=n,this._$Ci=s}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=(t,e)=>{var n,s;const r=t._$AN;if(r===void 0)return!1;for(const i of r)(s=(n=i)._$AO)===null||s===void 0||s.call(n,e,!1),H(i,e);return!0},re=t=>{let e,n;do{if((e=t._$AM)===void 0)break;n=e._$AN,n.delete(t),t=e}while((n==null?void 0:n.size)===0)},ut=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(n===void 0)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),pn(e)}};function hn(t){this._$AN!==void 0?(re(this),this._$AM=t,ut(this)):this._$AM=t}function un(t,e=!1,n=0){const s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(s))for(let i=n;i<s.length;i++)H(s[i],!1),re(s[i]);else s!=null&&(H(s,!1),re(s));else H(this,t)}const pn=t=>{var e,n,s,r;t.type==ln.CHILD&&((e=(s=t)._$AP)!==null&&e!==void 0||(s._$AP=un),(n=(r=t)._$AQ)!==null&&n!==void 0||(r._$AQ=hn))};class fn extends dn{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,n,s){super._$AT(e,n,s),ut(this),this.isConnected=e._$AU}_$AO(e,n=!0){var s,r;e!==this.isConnected&&(this.isConnected=e,e?(s=this.reconnected)===null||s===void 0||s.call(this):(r=this.disconnected)===null||r===void 0||r.call(this)),n&&(H(this,e),re(this))}setValue(e){if(on(this._$Ct))this._$Ct._$AI(e,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=e,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class gn{constructor(e){this.Y=e}disconnect(){this.Y=void 0}reconnect(e){this.Y=e}deref(){return this.Y}}class vn{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){var e;(e=this.Z)!==null&&e!==void 0||(this.Z=new Promise(n=>this.q=n))}resume(){var e;(e=this.q)===null||e===void 0||e.call(this),this.Z=this.q=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe=t=>!an(t)&&typeof t.then=="function";class mn extends fn{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new gn(this),this._$CX=new vn}render(...e){var n;return(n=e.find(s=>!qe(s)))!==null&&n!==void 0?n:A}update(e,n){const s=this._$Cyt;let r=s.length;this._$Cyt=n;const i=this._$CK,a=this._$CX;this.isConnected||this.disconnected();for(let o=0;o<n.length&&!(o>this._$Cwt);o++){const l=n[o];if(!qe(l))return this._$Cwt=o,l;o<r&&l===s[o]||(this._$Cwt=1073741823,r=0,Promise.resolve(l).then(async c=>{for(;a.get();)await a.get();const d=i.deref();if(d!==void 0){const h=d._$Cyt.indexOf(l);h>-1&&h<d._$Cwt&&(d._$Cwt=h,d.setValue(c))}}))}return A}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const J=cn(mn),$n=(t,e)=>u`
  <section id="catalog-page">
    <form autocomplete="off">
      <fieldset class="grid">
        <legend>Всички автомобили</legend>
        ${J(En(t,e),u`<div class="spinner"></div>`)}
      </fieldset>
    </form>
  </section>
`,yn=t=>u`
  <table class="table">
    <thead>
      <tr>
        <th>&#35;</th>
        <th>Рама:</th>
        <th>Pегистрационен &numero;</th>
        <th>Марка / Модел</th>
        <th>Двигател</th>
        <th>Име на клиента</th>
        <th>Ремонти по автомобила</th>
      </tr>
    </thead>
    <tbody>
      ${t.map((e,n)=>_n(e,n+1))}
    </tbody>
  </table>
`,_n=(t,e)=>u`
  <tr>
    <td>${e}</td>
    <td>${t.vin}</td>
    <td>${t.registration}</td>
    <td>${t.make}</td>
    <td>${t.engine}</td>
    <td>${t.customerName}</td>
    <td><a class="btn-success" href="/catalog/repairs/${t.objectId}">Виж</a></td>
  </tr>
`,bn=()=>u`<p class="empty">Нямаш добавени автомобили!</p>`,wn=(t,e)=>u`
  <fieldset class="search">
    <select id="searchOption" name="searchOption">
      <option value="registration">Регистрационен &numero;</option>
      <option value="customerName">Име на клиента</option>
    </select>
    <input id="search-input" type="text" name="search" placeholder="Въведи..." .value=${t} />
    <button class="btn-info" @click=${e}>Търси</button>
  </fieldset>
`,An=(t=1,e=1,n="")=>u`
  <fieldset class="pagination">
    <p>Page ${t} of ${e}</p>
    <div class="pager">
      ${t>1?u`<a href=${"/catalog/cars?page="+(t-1)+(n?`&search=${n}`:"")}>&lt;Prev</a>`:f}
      ${t<e?u`<a href=${"/catalog/cars?page="+(t+1)+(n?`&search=${n}`:"")}>Next&gt;</a>`:f}
    </div>
  </fieldset>
`;async function En(t,{page:e=1,search:n="",onSearch:s}){const[r,i]=await t,a=Math.ceil(i/10)||1,o=[wn(n,s),An(e,a,n)];return r.length!==0?o.push(yn(r)):o.push(bn()),o}async function Cn(t){const e=it(t.querystring),n=Number(e.page)||1,s=e.search||"",r={page:n,search:s,onSearch:i};t.render($n(Rn(n,s),r));function i(a){a.preventDefault();const o=document.querySelector("#search-input").value.trim();o?t.page.redirect(`/catalog/cars?search=${encodeURIComponent(o)}`):t.page.redirect("/catalog/cars")}}async function Rn(t=1,e=""){var i;const n=((i=document.querySelector("#searchOption"))==null?void 0:i.value)||"registration",[{results:s},{count:r}]=await Promise.all([en(t,e,n),tn(e,n)]);return[s,r]}const Sn=(t,e={})=>{var n,s;return u`
  <section id="create-page">
    <form @submit=${t} autocomplete="off">
      <fieldset class="grid">
        <legend>Добави автомобил</legend>
        <fieldset class="field">
          <label for="vin">VIN:</label>
          <input name="vin" type="text" placeholder="3N1BC13E99L480541" />

          <label for="registration">Pегистрационен &numero;:</label>
          <input name="registration" type="text" placeholder="AA1234BB" class=${(n=e.type)!=null&&n.registration?"error":""} />

          <label for="make">Марка / Модел:</label>
          <input name="make" type="text" placeholder="Opel Insignia" />

          <label for="engine">Двигател:</label>
          <input name="engine" type="text" placeholder="2.0" />

          <label for="customerName">Име на клиента:</label>
          <input name="customerName" type="text" placeholder="Георги Стамболиев" class=${(s=e.type)!=null&&s.customerName?"error":""} />
        </fieldset>

        <div class="button">
          <input class="btn-default" type="submit" value="Добави" />
          <input class="btn-danger" type="submit" value="Отказ" id="reject" />
        </div>
      </fieldset>
    </form>
  </section>
`};function Nn(t){const e=(s={})=>t.render(Sn(n,s));e();async function n(s){if(s.preventDefault(),s.submitter.id==="reject")return t.page.redirect("/catalog/cars");try{const r=D(s.target,"vin","registration","make","engine","customerName");await nn(r),t.showNotify(`\u0421\u044A\u0437\u0434\u0430\u0434\u043E\u0445\u0442\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B \u043D\u0430 ${r.customerName} - "${r.registration}"`,"infoBox"),t.page.redirect("/catalog/cars")}catch(r){const i={message:r.message||r.errorMsg,type:r.errorType||{},data:r.errorData||{}};t.showNotify(i.message),e(i)}}}const Ve=10,F="/classes/Repair",C={CREATE_REPAIR:`${F}`,REPAIR_BY_ID:t=>`${F}/${t}`,ALL_REPAIRS:(t,e)=>`${F}?where=${t}&order=-createdAt${e?`&skip=${(e-1)*Ve}&limit=${Ve}`:""}`,REPAIRS_COUNT:t=>`${F}?where=${t}&count=1`};async function pt(t,e){const n=encodeURIComponent(JSON.stringify(V("car","Car",t)));return b(C.ALL_REPAIRS(n,e))}async function Pn(t){const e=encodeURIComponent(JSON.stringify(V("car","Car",t)));return b(C.REPAIRS_COUNT(e))}async function Tn(t){return b(C.REPAIR_BY_ID(t))}async function On(t,e){const{id:n}=S(),s=Object.assign({},e,V("owner","_User",n),V("car","Car",t));return Z(C.CREATE_REPAIR,s)}async function In(t,e){return nt(C.REPAIR_BY_ID(t),e)}async function Un(t){return we(C.REPAIR_BY_ID(t))}async function xn(t){return t.map(({objectId:e})=>we(C.REPAIR_BY_ID(e)))}async function Ln(t){return b(C.REPAIR_BY_ID(t))}const ft=t=>u`<section id="edit-page">${J(Dn(t),u`<div class="spinner"></div>`)}</section>`,kn=(t,e,n)=>{var s,r;return u`
  <form @submit=${n.onSubmit} autocomplete="off">
    <fieldset class="grid">
      <legend>Редактирай автомобил</legend>

      <fieldset class="field">
        <label for="vin">VIN:</label>
        <input name="vin" type="text" placeholder="3N1BC13E99L480541" .value=${t.vin} />

        <label for="registration">Pегистрационен &numero;:</label>
        <input name="registration" type="text" placeholder="AA1234BB" class=${(s=e.type)!=null&&s.registration?"error":""}
          .value=${t.registration} />

        <label for="make">Марка / Модел:</label>
        <input name="make" type="text" placeholder="Opel Insignia" .value=${t.make} />

        <label for="engine">Двигател:</label>
        <input name="engine" type="text" placeholder="2.0" .value=${t.engine} />

        <label for="customerName">Име на клиента:</label>
        <input name="customerName" type="text" placeholder="Георги Стамболиев" class=${(r=e.type)!=null&&r.customerName?"error":""} .value=${t.customerName} />
      </fieldset>

      <div class="button">
        <input class="btn-danger" @click=${n.onDelete} type="button" value="Изтрий" />
        <input class="btn-default" type="submit" value="Запази промените" />
        <input class="btn-danger" type="submit" value="Отказ" id="reject" />
      </div>
    </fieldset>
  </form>
`};async function Dn(t){const{car:e,errors:n,actions:s}=await t;return kn(e,n,s)}function jn(t){t.render(ft(Bn(t)))}async function Bn(t){const e=await ht(t.params.id);t.ownerUserOnly(e);const n={onSubmit:s,onDelete:r};return{car:e,errors:{},actions:n};async function s(i){if(i.preventDefault(),i.submitter.id==="reject")return t.page.redirect(`/catalog/repairs/${e.objectId}`);try{const a=D(i.target,"vin","registration","make","engine","customerName");await sn(e.objectId,a),t.showNotify(`\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0445\u0442\u0435 \u0440\u0435\u043C\u043E\u043D\u0442 \u043D\u0430 ${a.customerName} - "${a.registration}"`,"infoBox"),t.page.redirect(`/catalog/repairs/${e.objectId}`)}catch(a){const o={message:a.errorMsg||a.message,type:a.errorType||{},data:a.errorData||{}};return t.showNotify(o.message),t.render(ft({car:o.data,errors:o,actions:n}))}}async function r(){if(!await t.showModal(`\u0421\u0438\u0433\u0443\u0440\u0435\u043D \u043B\u0438 \u0441\u0438, \u0447\u0435 \u0438\u0441\u043A\u0430\u0448 \u0434\u0430 \u0438\u0437\u0442\u0440\u0438\u0435\u0448 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0430 \u043D\u0430 ${e.customerName} - "${e.registration}"`))return;const a=await pt(e.objectId);await Promise.all([xn(a.results),rn(e.objectId)]),t.showNotify("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438\u0445\u0442\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0430","infoBox"),t.page.redirect("/catalog/cars")}}const Hn=(t,e=1)=>u`
  <section id="catalog-page">
    <form autocomplete="off">
      <fieldset class="grid">${J(Kn(t,e),u`<div class="spinner"></div>`)}</fieldset>
    </form>
  </section>
`,Mn=t=>u`<legend>Всичките ремонти на ${t.customerName} - "${t.registration}"</legend>`,zn=t=>u`
  <fieldset class="search">
    <div><a class="btn-default" href="/edit/car/${t.objectId}">Редактирай автомобил</a></div>
    <div><a class="btn-default" href="/create/repair/${t.objectId}">Добави ремонт</a></div>
    <div><a class="btn-danger" href="/catalog/cars">Назад</a></div>
  </fieldset>
`,qn=t=>u`
  <table class="table">
    <thead>
      <tr>
        <th>&#35;</th>
        <th>Извършен на</th>
        <th>Километри</th>
        <th>Детайли по ремонта</th>
      </tr>
    </thead>
    <tbody>
      ${t.map((e,n)=>Vn(e,n+1))}
    </tbody>
  </table>
`,Vn=(t,e)=>u`
  <tr>
    <td>${e}</td>
    <td>${t.date}</td>
    <td>${t.km}</td>
    <td><a class="btn-success" href="/details/repair/${t.objectId}">Детайли</a></td>
  </tr>
`,Yn=()=>u`<p class="empty">Нямаш завършени ремонти!</p>`,Gn=(t=1,e=1)=>u`
  <fieldset class="pagination">
    <p>Page ${t} of ${e}</p>
    <div class="pager">
      ${t>1?u`<a href=${"/catalog/repairs?page="+(t-1)}>&lt; Prev</a>`:f}
      ${t<e?u`<a href=${"/catalog/repairs?page="+(t+1)}>Next &gt;</a>`:f}
    </div>
  </fieldset>
`;async function Kn(t,e=1){const[n,s,r]=await t,i=Math.ceil(s/10)||1,a=[Mn(r),zn(r),Gn(e,i)];return n.length!==0?a.push(qn(n)):a.push(Yn()),a}function Wn(t){const e=t.params.id,n=it(t.querystring),s=Number(n.page)||1;t.render(Hn(Zn(e,s),s))}async function Zn(t,e=1){const[{results:n},{count:s},r]=await Promise.all([pt(t,e),Pn(t),ht(t)]);return[n,s,r]}const Jn=(t,e)=>{var n;return u`
  <section id="create-page">
    <form @submit=${t} autocomplete="off">
      <fieldset class="grid">
        <legend>Добави ремонт</legend>

        <fieldset class="field">
          <label for="km">Километри*:</label>
          <input name="km" type="text" placeholder="250800" class=${(n=e.type)!=null&&n.km?"error":""} />

          <label for="date">Датa на ремонта:</label>
          <input name="date" type="text" placeholder="01.01.2001" />

          <label for="description">Забележка:</label>
          <textarea name="description" placeholder=""></textarea>

          <label for="profit">Платена сума:</label>
          <input name="profit" type="text" placeholder="лв." />
        </fieldset>

        <div class="button">
          <input class="btn-default" type="submit" value="Добави" />
          <input class="btn-danger" type="submit" value="Отказ" id="reject" />
        </div>
      </fieldset>
    </form>
  </section>
`};function Xn(t){const e=(s={})=>t.render(Jn(n,s));e();async function n(s){s.preventDefault();const r=t.params.id;if(s.submitter.id==="reject")return t.page.redirect(`/catalog/repairs/${r}`);try{const i=D(s.target,"km","date","description","profit");i.date=Zt(i.date),await On(r,i),t.showNotify("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0445\u0442\u0435 \u0440\u0435\u043C\u043E\u043D\u0442","infoBox"),t.page.redirect(`/catalog/repairs/${r}`)}catch(i){const a={message:i.message||i.errorMsg,type:i.errorType||{},data:i.errorData||{}};t.showNotify(a.message),e(a)}}}const Fn=t=>u`<section id="details-page">${J(es(t),u`<div class="spinner"></div>`)}</section>`,Qn=(t,e)=>u`
  <form>
    <fieldset class="grid">
      <legend>Данни по ремонта</legend>

      <fieldset class="field">
        <legend>Обща информация</legend>
        <label>Създадена на:</label>
        <input disabled .value=${t.date} />
        <label>Километри:</label>
        <input disabled .value=${t.km} />
        <label>Получена сума:</label>
        <input disabled .value=${t.profit} />
      </fieldset>

      <fieldset class="field">
        <legend>Информация за ремонта</legend>
        <label>Забележка:</label>
        <textarea disabled .value=${t.description}></textarea>
      </fieldset>

      <div class="button">
        <a class="btn-danger" href="javascript:void(0)" @click=${e}>Изтрий</a>
      </div>
      <div class="button">
        <a class="btn-default" href="/edit/repair/${t.objectId}">Редактирай</a>
        <a class="btn-default" href="/catalog/repairs/${t.car.objectId}">Назад</a>
      </div>
    </fieldset>
  </form>
`;async function es(t){const{repair:e,onDelete:n}=await t;return Qn(e,n)}function ts(t){t.render(Fn(ns(t)))}async function ns(t){const e=t.params.id,n=await Ln(e);return t.ownerUserOnly(n),{repair:n,onDelete:s};async function s(){!await t.showModal(`\u0421\u0438\u0433\u0443\u0440\u0435\u043D \u043B\u0438 \u0441\u0438, \u0447\u0435 \u0438\u0441\u043A\u0430\u0448 \u0434\u0430 \u0438\u0437\u0442\u0440\u0438\u0435\u0448 \u0440\u0435\u043C\u043E\u043D\u0442 \u043E\u0442 \u0434\u0430\u0442\u0430 "${n.date}" ?`)||(await Un(n.objectId),t.showNotify("\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0438\u0437\u0442\u0440\u0438\u0445\u0442\u0435 \u0440\u0435\u043C\u043E\u043D\u0442\u0430","infoBox"),t.page.redirect(`/catalog/repairs/${n.car.objectId}`))}}const gt=t=>u`<section id="edit-page">${J(rs(t),u`<div class="spinner"></div>`)}</section>`,ss=(t,e,n={})=>{var s;return u`
  <form @submit=${e} autocomplete="off">
    <fieldset class="grid">
      <legend>Редактирай ремонт</legend>

      <fieldset class="field">
        <label for="km">Километри*:</label>
        <input name="km" type="text" placeholder="250800" class=${(s=n.type)!=null&&s.km?"error":""} .value=${t.km} />

        <label for="date">Датa на ремонта:</label>
        <input name="date" type="text" placeholder="01.01.2001" .value=${t.date} />

        <label for="description">Забележка:</label>
        <textarea name="description" placeholder="" .value=${t.description}></textarea>

        <label for="profit">Платена сума:</label>
        <input name="profit" type="text" placeholder="лв" .value=${t.profit} />
      </fieldset>

      <div class="button">
        <input class="btn-default" type="submit" value="Запази промените" />
        <input class="btn-danger" type="submit" value="Отказ" id="reject" />
      </div>
    </fieldset>
  </form>
`};async function rs(t){const{repair:e,onSubmit:n,errors:s}=await t;return ss(e,n,s)}function is(t){t.render(gt(as(t)))}async function as(t){const e=t.params.id,n=await Tn(e);return t.ownerUserOnly(n),{repair:n,onSubmit:s,errors:{}};async function s(r){if(r.preventDefault(),r.submitter.id==="reject")return t.page.redirect(`/details/repair/${n.objectId}`);try{const i=D(r.target,"km","date","description","profit");await In(e,i),t.showNotify(`\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0430\u0445\u0442\u0435 \u0440\u0435\u043C\u043E\u043D\u0442 \u043E\u0442 \u0434\u0430\u0442\u0430 "${i.date}"`,"infoBox"),t.page.redirect(`/details/repair/${n.objectId}`)}catch(i){const a={message:i.message||i.errorMsg,type:i.errorType||{},data:i.errorData||{}};return t.showNotify(a.message),t.render(gt({repair:a.data,onSubmit:s,errors:a}))}}}const os=(t,e)=>{var n,s;return u`
  <section id="auth-page">
    <form @submit=${t}>
      <fieldset>
        <legend>Вход</legend>

        <label for="username">Потребителско име:</label>
        <input name="username" type="text" placeholder="Въведи потребителско име..." class=${(n=e.type)!=null&&n.username?"error":""} />

        <label for="password">Парола:</label>
        <input name="password" type="password" placeholder="Въведи парола..." class=${(s=e.type)!=null&&s.password?"error":""} />

        <div><input class="btn-default" type="submit" value="Вход" /></div>

        <div>Ако все още нямаш профил цъкни <a href="/user/register">тук</a></div>
      </fieldset>
    </form>
  </section>
`};function ls(t){const e=(s={})=>t.render(os(n,s));e();async function n(s){s.preventDefault();try{const{username:r,password:i}=D(s.target,"username","password");await Gt({username:r,password:i}),t.updateNavigation(),t.page.redirect("/catalog/cars")}catch(r){const i={message:r.message||r.errorMsg,type:r.errorType||{},data:r.errorData||{}};t.showNotify(i.message),e(i)}}}const cs=(t,e)=>{var n,s,r;return u`
  <section id="auth-page">
    <form @submit=${t}>
      <fieldset>
        <legend>Регистрация</legend>

        <label for="username">Потребителско име:</label>
        <input name="username" type="text" placeholder="Въведи потребителско име..." class=${(n=e.type)!=null&&n.username?"error":""} />

        <label for="password">Парола:</label>
        <input name="password" type="password" placeholder="Въведи парола..." class=${(s=e.type)!=null&&s.password?"error":""} />

        <label for="repass">Повтори паролата:</label>
        <input name="repass" type="password" placeholder="Повтори паролата..." class=${(r=e.type)!=null&&r.repass?"error":""} />

        <div><input class="btn-default" type="submit" value="Регистрация" /></div>

        <div>Ако вече имаш създаден профил цъкни <a href="/user/login">тук</a></div>
      </fieldset>
    </form>
  </section>
`};function ds(t){const e=(s={})=>t.render(cs(n,s));e();async function n(s){s.preventDefault();try{const{username:r,password:i}=D(s.target,"username","password","repass");await Kt({username:r,password:i}),t.updateNavigation(),t.page.redirect("/catalog/cars")}catch(r){const i={message:r.message||r.errorMsg,type:r.errorType||{},data:r.errorData||{}};t.showNotify(i.message),e(i)}}}m(Xt);m("/catalog/cars",N,Cn);m("/create/car",N,Nn);m("/edit/car/:id",N,jn);m("/catalog/repairs/:id",N,Wn);m("/create/repair/:id",N,Xn);m("/edit/repair/:id",N,is);m("/details/repair/:id",N,ts);m("/user/login",ls);m("/user/register",ds);m.start();
