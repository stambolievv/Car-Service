/**
 * @name car-service
 * @description Easy and convenient way to register cars and their repairs.
 *
 * @version 1.0.0
 * @author Deyan 'stambolievv' Stamboliev
 * @license Apache-2.0
 */
var e,t,a,r,o,n,i,s=(e,t,a)=>{if(!t.has(e))throw TypeError("Cannot "+a)},c=(e,t,a)=>(s(e,t,"read from private field"),a?a.call(e):t.get(e)),l=(e,t,a)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,a)},d=(e,t,a)=>(s(e,t,"access private method"),a);import{D as u,x as p,p as m,m as f}from"./vendor.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();function g(e){if(!e)return{};try{return decodeURIComponent(e).split("&").reduce(((e,t)=>{const[a,r]=t.split("=");return e[a.trim()]=(null==r?void 0:r.includes(","))?r.split(",").map(decodeURIComponent):decodeURIComponent(null==r?void 0:r.trim()),e}),{})}catch(t){return console.error(t),{}}}function b(e){if(!e)return"";try{return Object.entries(e).filter((([e,t])=>{const a="string"==typeof e&&e.trim().length>0,r="string"==typeof t?t.trim().length>0:Array.isArray(t)&&t.every((e=>"string"==typeof e&&e.trim().length>0));return a&&r})).map((([e,t])=>{const a=Array.isArray(t)?t.map((e=>encodeURIComponent(e.trim()))).join(","):encodeURIComponent(t.trim());return`${encodeURIComponent(e.trim())}=${a}`})).join("&")}catch(t){return console.error(t),""}}function y(e){const t=new FormData(e);return[Object.fromEntries(Array.from(t,(([e,t])=>[e,"string"==typeof t?t.trim():t]))),t=>Array.from(e.elements).forEach((e=>t?e.setAttribute("disabled","true"):e.removeAttribute("disabled")))]}function h(){if(crypto&&crypto.randomUUID)return crypto.randomUUID();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const t=~~(16*Math.random());return("x"===e?t:3&t|8).toString(16)}))}function v(e,t={}){const{parent:a,prepend:r=!1,attributes:o,children:n,style:i,...s}=t,c=document.createElement(e);if(void 0!==o)for(const l in o)c.setAttribute(l,o[l]);if(Array.isArray(n))for(const l of n)c.append(l);if(void 0!==i&&Object.assign(c.style,i),Object.assign(c,s),void 0!==a){const e="string"==typeof a?document.querySelector(a):a;e&&e[r?"prepend":"append"](c)}return c}function w(e,t="bg-BG"){try{const a=6e4*(new Date).getTimezoneOffset(),r=Number(new Date(e))+a;return Intl.DateTimeFormat(t).format(r)}catch{return e.toString()}}function _(e){return`${e}T${function(e){const t=6e4*(new Date).getTimezoneOffset(),a=e&&Number(new Date(e).getTime()+t)||Date.now(),r=new Date(a-t).toISOString();return r.split("T")[1].slice(0,-5)}()}.000Z`}function C(e){const t=6e4*(new Date).getTimezoneOffset(),a=e?Number(new Date(e).getTime()+t):Date.now();return new Date(a-t).toISOString().split("T")[0]}const $={storageKeys:{userService:"car-service-current-user-data",memoization:"car-service-cache-initialized"},catalogsTable:{rowsPerPage:10},pagination:{relativePageLinks:3}},x=$.storageKeys.memoization;e=new WeakMap;const k=new class{constructor(t){var a,r,o,n;l(this,e,void 0),o=t,s(a=this,r=e,"write to private field"),n?n.call(a,o):r.set(a,o),this.supported||console.warn("Cache API is not supported in this environment"),this.supported&&!sessionStorage.getItem(x)&&(sessionStorage.setItem(x,"true"),this.deleteCache())}get supported(){return!!window.caches}get databaseName(){return c(this,e)}async getCacheData(t){if(!this.supported)return Promise.resolve(null);const a=await caches.open(c(this,e)),r=await a.match(new Request(t));return r&&r.ok?await r.json():Promise.resolve(null)}async updateCacheData(t,a){if(!this.supported)return Promise.resolve();return(await caches.open(c(this,e))).put(new Request(t),new Response(JSON.stringify(a)))}async clearCacheData(t){if(!this.supported)return Promise.resolve(!1);return(await caches.open(c(this,e))).delete(new Request(t))}async deleteCache(){return this.supported?caches.delete(c(this,e)):Promise.resolve(!1)}}("CarServiceCacheDatabase"),N="rgba(0 0 0 / 0.5)",I=3,D={default:{icon:"",color:"#555555",backgroundColor:"#f2f2f2"},info:{icon:"info",color:"#217ca3",backgroundColor:"#cfe8f3"},success:{icon:"check_circle",color:"#45874a",backgroundColor:"#e5f6e4"},warning:{icon:"error",color:"#b0822f",backgroundColor:"#fef5dc"},error:{icon:"cancel",color:"#b23c3a",backgroundColor:"#f2dede"}};t=new WeakMap,a=new WeakSet,r=function(e,t){switch(e){case"cube-flip":return v("div",{className:"notice-loading-cube-flip",style:{backgroundColor:t}});case"dots-zoom":return v("div",{className:"notice-loading-dots-zoom",children:[v("div",{className:"notice-loading-dots-zoom1",style:{backgroundColor:t}}),v("div",{className:"notice-loading-dots-zoom2",style:{backgroundColor:t}})]});case"line":return v("div",{className:"notice-loading-line",children:[v("div",{className:"notice-loading-line-rect1",style:{backgroundColor:t}}),v("div",{className:"notice-loading-line-rect2",style:{backgroundColor:t}}),v("div",{className:"notice-loading-line-rect3",style:{backgroundColor:t}}),v("div",{className:"notice-loading-line-rect4",style:{backgroundColor:t}}),v("div",{className:"notice-loading-line-rect5",style:{backgroundColor:t}})]});case"dots-spin":return v("div",{className:"notice-loading-spin-dots",children:[v("div",{className:"notice-loading-spin-dot1",style:{backgroundColor:t}}),v("div",{className:"notice-loading-spin-dot2",style:{backgroundColor:t}})]});case"dots":return v("div",{className:"notice-loading-dots",children:[v("div",{className:"notice-loading-dot1",style:{backgroundColor:t}}),v("div",{className:"notice-loading-dot2",style:{backgroundColor:t}}),v("div",{style:{backgroundColor:t}})]});case"cube-zoom":return v("div",{className:"notice-loading-cube-zoom",children:[v("div",{className:"notice-loading-cube-zoom-1",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-2",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-3",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-4",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-5",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-6",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-7",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-8",style:{backgroundColor:t}}),v("div",{className:"notice-loading-cube-zoom-9",style:{backgroundColor:t}})]});default:return null}},o=new WeakSet,n=function(e,t,a,r){const o=v("div",{className:"notice-modal-buttons"});switch(e){case"yes-no":return v("button",{parent:o,attributes:{"data-button-type":"info"},textContent:"Да",onclick:e=>{t.remove(),"function"==typeof a&&a(e)}}),v("button",{parent:o,attributes:{"data-button-type":"danger"},textContent:"Не",onclick:e=>{t.remove(),"function"==typeof r&&r(e)}}),o;case"ok":return v("button",{parent:o,textContent:"Добре",onclick:e=>{t.remove(),"function"==typeof a&&a(e)}}),o;case"ok-cancel":return v("button",{parent:o,textContent:"Добре",onclick:e=>{t.remove(),"function"==typeof a&&a(e)}}),v("button",{parent:o,attributes:{"data-button-type":"danger"},textContent:"Отказ",onclick:e=>{t.remove(),"function"==typeof r&&r(e)}}),o;case"retry-cancel":return v("button",{parent:o,attributes:{"data-button-type":"info"},textContent:"Нов опит",onclick:e=>{t.remove(),"function"==typeof a&&a(e)}}),v("button",{parent:o,attributes:{"data-button-type":"danger"},textContent:"Отказ",onclick:e=>{t.remove(),"function"==typeof r&&r(e)}}),o;default:return null}};const S=new class{constructor(){l(this,a),l(this,o),l(this,t,document.body)}showLoading(e={}){const{type:o="dots",color:n="white",autoClose:i,title:s,titleColor:l,maskColor:u=N}=e,p=v("div",{parent:c(this,t),className:"notice-loading notice-flex-center notice-fixed-all-page",id:"notice-loading"});v("div",{parent:p,className:"notice-mask notice-fixed-all-page",style:{backgroundColor:u}});const m=d(this,a,r).call(this,o,n)||d(this,a,r).call(this,"dots",n),f=v("div",{parent:p,className:"notice-flex-center notice-loading-main",children:[m]});s&&v("p",{parent:f,style:{color:l},textContent:s}),i&&setTimeout((()=>p.remove()),1e3*i)}hideLoading(){var e;null==(e=document.getElementById("notice-loading"))||e.remove()}showToast(e){const{text:a,type:r="default",autoClose:o=I,showClose:n=!0}=e;if(!a)return;const{icon:i,color:s,backgroundColor:l}=D[r]||D.default,d=document.getElementById("notice-toast")||v("div",{parent:c(this,t),className:"notice-toast",id:"notice-toast"}),u=v("div",{parent:d,className:"notice-toast-main notice-toast-main-active",id:`notice-toast-${h()}`,style:{backgroundColor:l}}),p=v("div",{parent:u,className:"notice-toast-container",children:[v("p",{className:"notice-toast-text",style:{color:s},textContent:a})]});i&&v("i",{parent:p,prepend:!0,className:"material-icons notice-toast-icon",style:{color:s},textContent:i}),(n||!o)&&v("i",{parent:p,className:"material-icons notice-close-icon",textContent:"close",onclick:()=>f()});const m=!!Number(getComputedStyle(d).getPropertyValue("--_should-auto-close"));if(o||m){setTimeout((()=>f()),1e3*(o||I))}function f(){if(!u)return;const e=parseFloat(window.getComputedStyle(u).getPropertyValue("transition-duration"));u.classList.remove("notice-toast-main-active"),setTimeout((()=>{u&&u.remove(),d.children.length||d.remove()}),1e3*e)}}showModal(e={}){const{type:a="yes-no",color:r,backgroundColor:i,title:s,titleColor:l,message:u,messageColor:p,maskColor:m=N,onConfirm:f,onCancel:g}=e,b=v("div",{parent:c(this,t),className:"notice-modal notice-flex-center notice-fixed-all-page",id:"notice-modal"});v("div",{parent:b,className:"notice-mask notice-fixed-all-page",style:{backgroundColor:m}});const y=v("div",{parent:b,className:"notice-flex-center notice-modal-main",style:{backgroundColor:i},children:[d(this,o,n).call(this,a,b,f,g)||d(this,o,n).call(this,"yes-no",b,f,g)]});u&&v("p",{parent:y,prepend:!0,style:{color:p||r},textContent:u}),s&&v("h2",{parent:y,prepend:!0,style:{color:l||r},textContent:s})}},A=document.querySelectorAll(".user-navigation"),E=document.querySelectorAll(".guest-navigation");function T(){B()?(A.forEach((e=>e.removeAttribute("hidden"))),E.forEach((e=>e.setAttribute("hidden","")))):(A.forEach((e=>e.setAttribute("hidden",""))),E.forEach((e=>e.removeAttribute("hidden"))))}async function L(e,t){const a=new URL(e,"https://parseapi.back4app.com"),r=await fetch(a,t);if(!0!==r.ok){r.status>=400&&r.status<500&&(await W(),T());const{message:e,error:t}=await r.json();throw new Error(`${e||t} Status: ${r.status}`,{cause:r})}return r.json()}function P(e,t){const a=new Headers({"X-Parse-Application-Id":"0oqWvkMylRfPgcnXNXtOUe8SWSqDZPiHktiLW9Np","X-Parse-REST-API-Key":"4YzVVeTWOVJyamwDNrNaafCLGzwC5qWnt7dw9aot"}),r=U();return r&&a.append("X-Parse-Session-Token",r.token),t&&a.append("Content-Type","application/json"),{method:e,headers:a,...t?{body:JSON.stringify(t)}:{}}}const R=e=>L(e,P("GET")),j=(e,t)=>L(e,P("POST",t)),O=(e,t)=>L(e,P("PUT",t)),q=e=>L(e,P("DELETE")),V={LOGIN:"/login",REGISTER:"/users",LOGOUT:"/logout"},z={CREATE_CAR:"/classes/Car",ALL_CARS:(e="")=>`/classes/Car?${b({order:"-createdAt",where:e})}`,CAR_BY_ID:e=>`/classes/Car/${e}`},J={CREATE_REPAIR:"/classes/Repair",ALL_REPAIRS_BY_CAR:e=>`/classes/Repair?${b({order:"-date",where:e})}`,REPAIR_BY_ID:e=>`/classes/Repair/${e}`},M=$.storageKeys.userService;function B(){return!!sessionStorage.getItem(M)}function U(){var e;const t=$.storageKeys.userService;return JSON.parse(null!=(e=sessionStorage.getItem(t))?e:"null")}async function Y(e){await k.deleteCache().catch(console.error),sessionStorage.setItem(M,JSON.stringify(e))}async function W(){await k.deleteCache().catch(console.error),sessionStorage.removeItem(M)}const G=$.catalogsTable.rowsPerPage;async function H(e){const t="/cars",a=await k.getCacheData(t),r=a&&a.find((t=>t.objectId===e));if(r)return r;const o=await R(z.CAR_BY_ID(e));if(a){const e=[o,...a].sort(((e,t)=>+new Date(t.createdAt)-+new Date(e.createdAt)));await k.updateCacheData(t,JSON.parse(JSON.stringify(e)))}return o}async function K(e){var t;const a=await q(z.CAR_BY_ID(e)),r="/cars",o=(null!=(t=await k.getCacheData(r))?t:[]).filter((t=>t.objectId!==e));return await(o.length>0?k.updateCacheData(r,JSON.parse(JSON.stringify(o))):k.clearCacheData(r)),a}const X=(e,t)=>{const a=Number(new Date(e.date))||Number(new Date(e.createdAt));return(Number(new Date(t.date))||Number(new Date(t.createdAt)))-a};async function F(e,t){const a=JSON.stringify({car:{__type:"Pointer",className:"Car",objectId:e}}),r=`/cars/${e}/repairs`,o=await k.getCacheData(r);let n;if(o?n=o:(({results:n}=await R(J.ALL_REPAIRS_BY_CAR(a))),await k.updateCacheData(r,JSON.parse(JSON.stringify(n)))),!t)return{results:n,count:n.length};const i=10*(t-1),s=10*t;return{results:n.slice(i,s),count:n.length}}async function Q(e,t){const a=`/cars/${e}/repairs`,r=await k.getCacheData(a),o=r&&r.find((e=>e.objectId===t));if(o)return o;const n=await R(J.REPAIR_BY_ID(t));if(r){const e=[n,...r].sort(X);await k.updateCacheData(a,JSON.parse(JSON.stringify(e)))}return n}async function Z(e){const{results:t}=await F(e),a=t.map((({objectId:e})=>q(J.REPAIR_BY_ID(e)))),r=`/cars/${e}/repairs`;return await k.clearCacheData(r),Promise.all(a)}const ee=document.getElementById("site-content")||document.body,te=document.querySelector("meta[name=viewport]"),ae=["/user/login","/user/register"],re=["/cars","/repairs"];function oe(e,t={}){const{container:a,...r}=t,o=a&&(a instanceof HTMLElement||a instanceof DocumentFragment)?a:"string"==typeof a?document.querySelector(a):null;return u(e,o||ee,r)}const ne=$.pagination.relativePageLinks;function ie(e,t,a){const r=(r,o)=>{const n=e===o||o<1||o>t,i="number"==typeof r&&e===o,s=n?"#":function(e,t){const a=b({...g(window.location.search.slice(1)),...t,page:e.toString()});return`${window.location.pathname}?${a}`}(o,a);return p`<a .href=${s} .className=${`${n?"not-selectable":""} ${i?"active":""}`}>${r}</a>`},o=r(p`<i class="material-icons">keyboard_double_arrow_left</i>`,1),n=r(p`<i class="material-icons">chevron_left</i>`,e-1),i=function(e,t){const a=Math.floor(ne/2),r=Math.min(Math.max(1,e-a),Math.max(1,t-ne+1)),o=Math.max(Math.min(t,e+a),Math.min(t,ne));return Array.from({length:Math.min(o-r+1,t)},((e,t)=>r+t))}(e,t).map((e=>r(e,e))),s=r(p`<i class="material-icons">chevron_right</i>`,e+1),c=r(p`<i class="material-icons">keyboard_double_arrow_right</i>`,t);return p`<fieldset class="pagination">${o}${n}${i}${s}${c}</fieldset>`}const se=$.catalogsTable.rowsPerPage,ce=(e,t)=>e.length>0?le(e,t):p`<p class="empty">Нямаш добавени автомобили!</p>`,le=(e,t)=>p`<table role="table"><thead role="rowgroup"><tr role="row"><th role="columnheader">Рама</th><th role="columnheader">Pегистрационен &numero;</th><th role="columnheader">Марка / Модел</th><th role="columnheader">Двигател</th><th role="columnheader">Име на клиента</th><th role="columnheader">Ремонти</th><th role="columnheader">Редакция</th><th role="columnheader">Изтриване</th></tr></thead><tbody role="rowgroup">${e.map((e=>de(e,t)))}</tbody></table>`,de=(e,t)=>p`<tr role="row"><td role="cell" data-cell-content="Рама">${e.vin}</td><td role="cell" data-cell-content="Pегистрационен &numero;">${e.registration}</td><td role="cell" data-cell-content="Марка / Модел">${e.make}</td><td role="cell" data-cell-content="Двигател">${e.engine}</td><td role="cell" data-cell-content="Име на клиента">${e.customerName}</td><td role="cell" data-cell-content="Ремонти"><div class="buttons"><a role="button" data-button-type="info" href="${m.base()}/cars/${e.objectId}/repairs"><i class="material-icons">car_repair</i></a></div></td><td role="cell" data-cell-content="Редакция"><div class="buttons"><a role="button" href="${m.base()}/cars/${e.objectId}/edit"><i class="material-icons">edit</i></a></div></td><td role="cell" data-cell-content="Изтриване"><div class="buttons"><button data-button-type="danger" @click=${a=>t(a,e)}><i class="material-icons">delete_forever</i></button></div></td></tr>`,ue=$.catalogsTable.rowsPerPage,pe=(e,t)=>e.length>0?me(e,t):p`<p class="empty">Нямаш завършени ремонти!</p>`,me=(e,t)=>p`<table role="table"><thead role="rowgroup"><tr role="row"><th role="columnheader">Извършен на</th><th role="columnheader">Километри</th><th role="columnheader">Детайли по ремонта</th><th role="columnheader">Изтриване</th></tr></thead><tbody role="rowgroup">${e.map((e=>fe(e,t)))}</tbody></table>`,fe=(e,t)=>p`<tr role="row"><td role="cell" data-cell-content="Извършен на">${w(e.date)}</td><td role="cell" data-cell-content="Километри">${e.km}</td><td role="cell" data-cell-content="Детайли по ремонта"><div class="buttons"><a role="button" data-button-type="info" href="${m.base()}/cars/${e.car.objectId}/repairs/${e.objectId}">Детайли</a></div></td><td role="cell" data-cell-content="Изтриване"><div class="buttons"><button data-button-type="danger" @click=${a=>t(a,e)}><i class="material-icons">delete_forever</i></button></div></td></tr>`;async function ge(e){e.preventDefault();const t=e.target,[a,r]=y(t);try{r(!0),S.showLoading({type:"cube-zoom"}),await async function(e){const t=await j(V.LOGIN,e);return await Y({username:e.username,id:t.objectId,token:t.sessionToken}),T(),t}(a),m.redirect("/cars")}catch(o){const e=o instanceof Error?o.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{r(!1),S.hideLoading(),t.reset()}}function be(e){e.preventDefault();const t=e.target,a=t.previousElementSibling,r="password"===a.type?"text":"password";a.setAttribute("type",r),t.textContent="password"===r?"visibility_off":"visibility"}async function ye(e){e.preventDefault();const t=e.target,[{username:a,password:r,repass:o},n]=y(t);if(r===o)try{n(!0),S.showLoading({type:"cube-zoom"}),await async function(e){const t=await j(V.REGISTER,e);return await Y({username:e.username,id:t.objectId,token:t.sessionToken}),T(),{username:e.username,updatedAt:t.createdAt,...t}}({username:a,password:r}),m.redirect("/cars")}catch(i){const e=i instanceof Error?i.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{n(!1),S.hideLoading(),t.reset()}else S.showToast({text:"Паролите не съвпадат!",type:"warning"})}function he(e){var t,a,r;e.preventDefault();const o=e.target,n=o.previousElementSibling,i=null==(r=null==(a=null==(t=o.parentElement)?void 0:t.parentElement)?void 0:a.nextElementSibling)?void 0:r.lastElementChild,s="password"===n.type?"text":"password";n.setAttribute("type",s),i.setAttribute("type",s),o.textContent="password"===s?"visibility_off":"visibility"}function ve(e){e.preventDefault();const t=document.getElementById("search-options").value.trim(),a=document.getElementById("search-input").value.trim();t&&a?m.redirect(`/cars?${b({filter:t,query:a})}`):m.redirect("/cars")}async function we(e,t){e.preventDefault();if(await new Promise((e=>S.showModal({message:`Сигурен ли си, че искаш да изтриеш автомобила на ${t.customerName} - "${t.registration}"`,onConfirm:()=>e(!0),onCancel:()=>e(!1)}))))try{S.showLoading(),await Promise.all([Z(t.objectId),K(t.objectId)]),S.showToast({text:`Успешно изтрихте автомобила на ${t.customerName} - "${t.registration}"`,type:"info"})}catch(a){const e=a instanceof Error?a.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{S.hideLoading(),m.redirect("/cars")}}async function _e(e){e.preventDefault();const t=e.target,[a,r]=y(t);try{r(!0),S.showLoading(),await async function(e){var t;const{id:a}=U(),r={owner:Object.freeze({__type:"Pointer",className:"_User",objectId:a})},o=Object.assign({},e,r),n=await j(z.CREATE_CAR,o),i="/cars",s=null!=(t=await k.getCacheData(i))?t:[],c={...o,...n},l=[c,...s].sort(((e,t)=>+new Date(t.createdAt)-+new Date(e.createdAt)));return await k.updateCacheData(i,JSON.parse(JSON.stringify(l))),c}(a),S.showToast({text:`Успешно създадохте автомобил на ${a.customerName} - "${a.registration}"`,type:"success"})}catch(o){const e=o instanceof Error?o.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{r(!1),S.hideLoading(),t.reset(),m.redirect("/cars")}}async function Ce(e,t){e.preventDefault();if(await new Promise((e=>S.showModal({message:`Сигурен ли си, че искаш да изтриеш ремонта от дата ${w(t.date)}`,onConfirm:()=>e(!0),onCancel:()=>e(!1)}))))try{S.showLoading(),await async function(e,t){var a;const r=await q(J.REPAIR_BY_ID(t)),o=`/cars/${e}/repairs`,n=(null!=(a=await k.getCacheData(o))?a:[]).filter((e=>e.objectId!==t));return await(n.length>0?k.updateCacheData(o,JSON.parse(JSON.stringify(n))):k.clearCacheData(o)),r}(t.car.objectId,t.objectId),S.showToast({text:"Успешно изтрихте ремонта",type:"info"})}catch(a){const e=a instanceof Error?a.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{S.hideLoading(),m.redirect(`/cars/${t.car.objectId}/repairs`)}}null==(i=document.getElementById("logout-button"))||i.addEventListener("click",(async function(e){if(e.preventDefault(),await new Promise((e=>S.showModal({message:"Сигурен ли си, че искаш да излезеш от профила си?",title:"Изход",onConfirm:()=>e(!0),onCancel:()=>e(!1)}))))try{S.showLoading({type:"cube-zoom"}),await async function(){const e=await j(V.LOGOUT,{});return await W(),T(),e}(),m.redirect("/user/login")}catch(t){const e=t instanceof Error?t.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{S.hideLoading()}})),m.base("/Car-Service"),m((function(e,t){const a=Object.assign(e,{root:ee,render:oe});!function(e){const{origin:t,pathname:a,search:r}=window.location,o=t+e.pathname;re.some((e=>a.endsWith(e)))&&o!==t+a&&(e.state.prev=a+r)}(a),function(e){if(!te)return;const t="interactive-widget=resizes-content",a=te.content.split(",").map((e=>e.trim())),r=a.includes(t),o=ae.includes(e.path);if(o&&!r)a.push(t);else if(!o&&r){const e=a.indexOf(t);a.splice(e,1)}te.content=a.join(", ")}(a),T(),function(e){if(!e)return;if(!document.startViewTransition)return void e();document.startViewTransition(e)}((()=>{const a=B(),r=!a&&!ae.includes(e.path),o=a&&ae.includes(e.path);r?e.page.redirect(ae[0]):o?window.history.back():t()}))})),m("/user/login",(function(e){e.render(p`<section id="auth-page"><form @submit=${ge}><fieldset class="input-fields"><legend>Вход</legend><div class="field"><label for="user__username">Потребителско име: <span class='required'>*</span></label><input name="username" id="user__username" type="text" placeholder="Въведи потребителско име..." autocomplete="username" required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="user__password">Парола: <span class='required'>*</span></label><div class="password-field"><input name="password" id="user__password" type="password" placeholder="Въведи парола..." autocomplete="current-password" required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}"/><i class="material-icons eye-icon" @click=${be}>visibility_off</i></div></div><div class="buttons"><input role="button" data-button-type="info" type="submit" value="Вход" /></div><div class="form-link"><span>Все още нямаш профил? <a href="${m.base()}/user/register">Регистрирай се</a></span></div></fieldset></form></section>`)})),m("/user/register",(function(e){e.render(p`<section id="auth-page"><form @submit=${ye}><fieldset class="input-fields"><legend>Регистрация</legend><div class="field"><label for="user__username">Потребителско име: <span class='required'>*</span></label><input name="username" id="user__username" type="text" placeholder="Въведи потребителско име..." required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="user__password">Парола: <span class='required'>*</span></label><div class="password-field"><input name="password" id="user__password" type="password" placeholder="Въведи парола..." required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /><i class="material-icons eye-icon" @click=${he}>visibility_off</i></div></div><div class="field"><label for="user__repass">Потвърди паролата: <span class='required'>*</span></label><input name="repass" id="user__repass" type="password" placeholder="Повтори паролата..." required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="buttons"><input role="button" data-button-type="info" type="submit" value="Регистрация" /></div><div class="form-link"><span>Вече имаш създаден профил? <a href="${m.base()}/user/login">Вход</a></span></div></fieldset></form></section>`)})),m("/cars",(function(e){const{page:t="1",filter:a="",query:r=""}=g(e.querystring);e.render(f((async()=>{const e=await async function(e,t,a){try{const{results:r,count:o}=await async function(e,t,a){const r=t&&a?JSON.stringify({[t]:{$regex:`(?i)${a}`}}):null,o="/cars",n=await k.getCacheData(o);let i;if(r?({results:i}=await R(z.ALL_CARS(r))):(i=null!=n?n:(await R(z.ALL_CARS())).results,n||await k.updateCacheData(o,i)),!e)return{results:i,count:i.length};const s=(e-1)*G,c=e*G;return{results:i.slice(s,c),count:i.length}}(e,t,a);return{cars:r,carsCount:o,pageNumber:e,searchCategory:t,searchQuery:a}}catch(r){const e=r instanceof Error?r.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"}),m.redirect("/")}finally{S.hideLoading()}}(Number(t)||1,a,r);if(e)return(e=>{const{cars:t,carsCount:a,pageNumber:r,searchCategory:o,searchQuery:n,onSearch:i,onDelete:s}=e,c=Math.max(Math.ceil(a/se),1);return p`<section id="catalog-page"><form autocomplete="off"><fieldset><legend>Всички автомобили</legend><fieldset class="search"><label for="search-options" id="search-label" aria-hidden="true">Търсачка</label><select id="search-options" aria-labelledby="search-label"><option value="registration" .selected=${"registration"===o}>Регистрационен &numero;</option><option value="make" .selected=${"make"===o}>Марка</option><option value="engine" .selected=${"engine"===o}>Двигател</option><option value="customerName" .selected=${"customerName"===o}>Име на клиента</option></select><input id="search-input" type="search" placeholder="Въведи..." .value=${n} /><button @click=${i}>Търси</button></fieldset>${ce(t,s)}${ie(r,c,{filter:o,query:n})}</fieldset></form></section>`})({...e,onSearch:ve,onDelete:we})})(),S.showLoading()))})),m("/cars/create",(function(e){const{prev:t=`${m.base()}/cars`}=e.state;e.render((e=>{const{prev:t,onSubmit:a}=e;return p`<section id="create-page"><form @submit=${a} autocomplete="off"><fieldset><legend>Добави автомобил</legend><fieldset class="input-fields"><div class="field"><label for="car__vin">VIN:</label><input name="vin" id="car__vin" type="text" /></div><div class="field"><label for="car__registration">Pегистрационен &numero;: <span class='required'>*</span></label><input name="registration" id="car__registration" type="text" required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="car__make">Марка / Модел:</label><input name="make" id="car__make" type="text" /></div><div class="field"><label for="car__engine">Двигател:</label><input name="engine" id="car__engine" type="text" /></div><div class="field"><label for="car__customer">Име на клиента: <span class='required'>*</span></label><input name="customerName" id="car__customer" type="text" required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div></fieldset><div class="buttons"><button data-button-type="success" type="submit">Добави</button><a role="button" data-button-type="danger" href="${t}">Отказ</a></div></fieldset></form></section>`})({prev:t,onSubmit:_e}))})),m("/cars/:carId/edit",(function(e){const{carId:t}=e.params,{prev:a=`${m.base()}/cars`}=e.state;e.render(f((async()=>{const e=await async function(e){try{return await H(e)}catch(t){const e=t instanceof Error?t.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"}),m.redirect("/cars")}finally{S.hideLoading()}}(t);if(e)return(e=>{const{car:t,prev:a,onSubmit:r}=e;return p`<section id="edit-page"><form @submit=${r} autocomplete="off"><fieldset><legend>Редактирай автомобил</legend><fieldset class="input-fields"><div class="field"><label for="car__vin">VIN:</label><input name="vin" id="car__vin" type="text" .value=${t.vin} /></div><div class="field"><label for="car__registration">Pегистрационен &numero;: <span class='required'>*</span></label><input name="registration" id="car__registration" type="text" .value=${t.registration} required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="car__make">Марка / Модел:</label><input name="make" id="car__make" type="text" .value=${t.make} /></div><div class="field"><label for="car__engine">Двигател:</label><input name="engine" id="car__engine" type="text" .value=${t.engine} /></div><div class="field"><label for="car__customer">Име на клиента: <span class='required'>*</span></label><input name="customerName" id="car__customer" type="text" .value=${t.customerName} required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div></fieldset><div class="buttons"><button data-button-type="success" type="submit">Запази промените</button><a role="button" data-button-type="danger" href="${a}">Отказ</a></div></fieldset></form></section>`})({car:e,prev:a,onSubmit:t=>async function(e,t){e.preventDefault();const a=e.target,[r,o]=y(a);try{o(!0),S.showLoading(),await async function(e,t){var a;const r=await O(z.CAR_BY_ID(e),t),o="/cars",n=null!=(a=await k.getCacheData(o))?a:[],i=n.findIndex((t=>t.objectId===e)),s={...-1!==i?n.splice(i,1)[0]:{},...t,...r},c=[s,...n].sort(((e,t)=>+new Date(t.createdAt)-+new Date(e.createdAt)));return await k.updateCacheData(o,JSON.parse(JSON.stringify(c))),s}(t.objectId,r),S.showToast({text:`Успешно редактирахте ремонт на ${r.customerName} - "${r.registration}"`,type:"info"})}catch(n){const e=n instanceof Error?n.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{o(!1),S.hideLoading(),a.reset(),m.redirect("/cars")}}(t,e)})})(),S.showLoading()))})),m("/cars/:carId/repairs",(function(e){const{carId:t}=e.params,{page:a="1"}=g(e.querystring),{prev:r=`${m.base()}/cars`}=e.state;e.render(f((async()=>{const e=await async function(e,t){try{const[{results:a,count:r},o]=await Promise.all([F(e,t),H(e)]);return{repairs:a,repairsCount:r,car:o,pageNumber:t}}catch(a){const e=a instanceof Error?a.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"}),m.redirect("/cars")}finally{S.hideLoading()}}(t,Number(a)||1);if(e)return(e=>{const{repairs:t,repairsCount:a,car:r,pageNumber:o,prev:n,onDelete:i}=e,s=Math.max(Math.ceil(a/ue),1);return p`<section id="catalog-page"><form autocomplete="off"><fieldset><legend>Всички ремонти на ${r.customerName} - рег. &numero; "${r.registration}"</legend><fieldset class="search"><div class="buttons"><a role="button" data-button-type="success" href="${m.base()}/cars/${r.objectId}/repairs/create">Добави ремонт</a><a role="button" href="${n}">Назад</a></div></fieldset>${pe(t,i)}${ie(o,s)}</fieldset></form></section>`})({...e,prev:r,onDelete:Ce})})(),S.showLoading()))})),m("/cars/:carId/repairs/create",(function(e){const{carId:t}=e.params,{prev:a=`${m.base()}/cars/${t}/repairs`}=e.state;e.render((e=>{const{prev:t,onSubmit:a}=e;return p`<section id="create-page"><form @submit=${a} autocomplete="off"><fieldset><legend>Добави ремонт</legend><fieldset class="input-fields"><div class="field"><label for="repair__date">Датa на ремонта: <span class='required'>*</span></label><input name="date" id="repair__date" type="date" .value="${C()}" style="cursor: pointer;" required @click="${({target:e})=>e.showPicker()}" @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="repair__km">Километри: <span class='required'>*</span></label><input name="km" id="repair__km" type="number" required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="repair__profit">Платена сума:</label><input name="profit" id="repair__profit" type="text" /></div><div class="field"><label for="repair__description">Забележка:</label><textarea data-scrollbar name="description" id="repair__description" @keyup="${({target:e})=>{e.scrollHeight>e.clientHeight&&e.style.setProperty("height",e.scrollHeight+"px")}}"></textarea></div></fieldset><div class="buttons"><button data-button-type="success" type="submit">Добави</button><a role="button" data-button-type="danger" href="${t}">Отказ</a></div></fieldset></form></section>`})({prev:a,onSubmit:e=>async function(e,t){e.preventDefault();const a=e.target,[r,o]=y(a);r.date=_(r.date);try{o(!0),S.showLoading(),await async function(e,t){var a;const{id:r}=U(),o={owner:Object.freeze({__type:"Pointer",className:"_User",objectId:r})},n={car:Object.freeze({__type:"Pointer",className:"Car",objectId:e})},i=Object.assign({},t,o,n),s=await j(J.CREATE_REPAIR,i),c=`/cars/${e}/repairs`,l=null!=(a=await k.getCacheData(c))?a:[],d={...i,...s},u=[d,...l].sort(X);return await k.updateCacheData(c,JSON.parse(JSON.stringify(u))),d}(t,r),S.showToast({text:"Успешно добавихте ремонт",type:"success"})}catch(n){const e=n instanceof Error?n.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{o(!1),S.hideLoading(),a.reset(),m.redirect(`/cars/${t}/repairs`)}}(e,t)}))})),m("/cars/:carId/repairs/:repairId",(function(e){const{carId:t,repairId:a}=e.params,{prev:r=`${m.base()}/cars/${t}/repairs`}=e.state;e.render(f((async()=>{const e=await async function(e,t){try{return await Q(e,t)}catch(a){const t=a instanceof Error?a.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:t,type:"error"}),m.redirect(`/cars/${e}/repairs`)}finally{S.hideLoading()}}(t,a);if(e)return(e=>{const{repair:t,prev:a}=e;return p`<section id="details-page"><form autocomplete="off"><fieldset><legend>Детайли по ремонта</legend><fieldset class="search"><div class="buttons"><a role="button" href="${m.base()}/cars/${t.car.objectId}/repairs/${t.objectId}/edit">Редактирай</a><a role="button" href="${a}">Назад</a></div></fieldset><fieldset class="input-fields"><legend>Обща информация</legend><div class="field"><label for="repair__date">Датa на ремонта:</label><input disabled name="date" id="repair__date" .value=${w(t.date)} /></div><div class="field"><label for="repair__km">Километри:</label><input disabled name="km" id="repair__km" .value=${t.km} /></div><div class="field"><label for="repair__profit">Платена сума:</label><input disabled name="profit" id="repair__profit" .value=${t.profit} /></div></fieldset><fieldset disabled class="input-fields"><legend>Информация за ремонта</legend><div class="field"><label for="repair__description">Забележка:</label><textarea data-scrollbar name="description" id="repair__description" .value=${t.description}></textarea></div></fieldset></fieldset></form></section>`})({repair:e,prev:r})})(),S.showLoading()))})),m("/cars/:carId/repairs/:repairId/edit",(function(e){const{carId:t,repairId:a}=e.params;e.render(f((async()=>{const e=await async function(e,t){try{return await Q(e,t)}catch(a){const t=a instanceof Error?a.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:t,type:"error"}),m.redirect(`/cars/${e}/repairs`)}finally{S.hideLoading()}}(t,a);if(e)return(e=>{const{repair:t,onSubmit:a}=e;return p`<section id="edit-page"><form @submit=${a} autocomplete="off"><fieldset><legend>Редактирай ремонт</legend><fieldset class="input-fields"><div class="field"><label for="repair__date">Датa на ремонта: <span class='required'>*</span></label><input name="date" id="repair__date" type="date" .value=${C(t.date)} style="cursor: pointer;" required @click="${({target:e})=>e.showPicker()}" @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="repair__km">Километри: <span class='required'>*</span></label><input name="km" id="repair__km" type="number" .value=${t.km} required @invalid="${({target:e})=>e.setCustomValidity("Полето е задължително!")}" @input="${({target:e})=>e.setCustomValidity("")}" /></div><div class="field"><label for="repair__profit">Платена сума:</label><input name="profit" id="repair__profit" type="text" .value=${t.profit} /></div><div class="field"><label for="repair__description">Забележка:</label><textarea data-scrollbar name="description" id="repair__description" .value=${t.description} @keyup="${({target:e})=>{e.scrollHeight>e.clientHeight&&e.style.setProperty("height",e.scrollHeight+"px")}}"></textarea></div></fieldset><div class="buttons"><button data-button-type="success" type="submit">Запази промените</button><a role="button" data-button-type="danger" href="${m.base()}/cars/${t.car.objectId}/repairs/${t.objectId}">Отказ</a></div></fieldset></form></section>`})({repair:e,onSubmit:t=>async function(e,t){e.preventDefault();const a=e.target,[r,o]=y(a),n=r.date;r.date=_(r.date);try{o(!0),S.showLoading(),await async function(e,t,a){var r;const o=await O(J.REPAIR_BY_ID(t),a),n=`/cars/${e}/repairs`,i=null!=(r=await k.getCacheData(n))?r:[],s=i.findIndex((e=>e.objectId===t)),c={...-1!==s?i.splice(s,1)[0]:{},...a,...o},l=[c,...i].sort(X);return await k.updateCacheData(n,JSON.parse(JSON.stringify(l))),c}(t.car.objectId,t.objectId,r),S.showToast({text:`Успешно редактирахте ремонт от дата "${n}"`,type:"info"})}catch(i){const e=i instanceof Error?i.message:"Възникна грешка, моля опитайте по-късно";S.showToast({text:e,type:"error"})}finally{o(!1),S.hideLoading(),a.reset(),m.redirect(`/cars/${t.car.objectId}/repairs/${t.objectId}`)}}(t,e)})})(),S.showLoading()))})),m.start();
