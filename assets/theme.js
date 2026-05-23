!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarousel=t()}(this,(function(){"use strict";function n(n){return"number"==typeof n}function t(n){return"string"==typeof n}function e(n){return"boolean"==typeof n}function o(n){return"[object Object]"===Object.prototype.toString.call(n)}function i(n){return Math.abs(n)}function r(n){return Math.sign(n)}function s(n,t){return i(n-t)}function c(n){return f(n).map(Number)}function a(n){return n[u(n)]}function u(n){return Math.max(0,n.length-1)}function l(n,t){return t===u(n)}function d(n,t=0){return Array.from(Array(n),((n,e)=>t+e))}function f(n){return Object.keys(n)}function p(n,t){return[n,t].reduce(((n,t)=>(f(t).forEach((e=>{const i=n[e],r=t[e],s=o(i)&&o(r);n[e]=s?p(i,r):r})),n)),{})}function m(n,t){return void 0!==t.MouseEvent&&n instanceof t.MouseEvent}function g(){let n=[];const t={add:function(e,o,i,r={passive:!0}){let s;if("addEventListener"in e)e.addEventListener(o,i,r),s=()=>e.removeEventListener(o,i,r);else{const n=e;n.addListener(i),s=()=>n.removeListener(i)}return n.push(s),t},clear:function(){n=n.filter((n=>n()))}};return t}function h(n=0,t=0){const e=i(n-t);function o(t){return t<n}function r(n){return n>t}function s(n){return o(n)||r(n)}return{length:e,max:t,min:n,constrain:function(e){return s(e)?o(e)?n:t:e},reachedAny:s,reachedMax:r,reachedMin:o,removeOffset:function(n){return e?n-e*Math.ceil((n-t)/e):n}}}function v(n,t,e){const{constrain:o}=h(0,n),r=n+1;let s=c(t);function c(n){return e?i((r+n)%r):o(n)}function a(){return s}function u(){return v(n,a(),e)}const l={get:a,set:function(n){return s=c(n),l},add:function(n){return u().set(a()+n)},clone:u};return l}function y(n,t,o,c,a,u,l,d,f,p,v,y,x,b,E,S,w,M,D){const{cross:O,direction:T}=n,L=["INPUT","SELECT","TEXTAREA"],A={passive:!1},I=g(),F=g(),P=h(50,225).constrain(b.measure(20)),N={mouse:300,touch:400},V={mouse:500,touch:600},j=E?43:25;let C=!1,B=0,H=0,k=!1,z=!1,R=!1,W=!1;function U(n){if(!m(n,c)&&n.touches.length>=2)return X(n);const t=u.readPoint(n),e=u.readPoint(n,O),o=s(t,B),i=s(e,H);if(!z&&!W){if(!n.cancelable)return X(n);if(z=o>i,!z)return X(n)}const r=u.pointerMove(n);o>S&&(R=!0),p.useFriction(.3).useDuration(.75),d.start(),a.add(T(r)),n.preventDefault()}function X(n){const t=v.byDistance(0,!1).index!==y.get(),e=u.pointerUp(n)*(E?V:N)[W?"mouse":"touch"],o=function(n,t){const e=y.add(-1*r(n)),o=v.byDistance(n,!E).distance;return E||i(n)<P?o:w&&t?.5*o:v.byIndex(e.get(),0).distance}(T(e),t),c=function(n,t){if(0===n||0===t)return 0;if(i(n)<=i(t))return 0;const e=s(i(n),i(t));return i(e/n)}(e,o),a=j-10*c,l=M+c/50;z=!1,k=!1,F.clear(),p.useDuration(a).useFriction(l),f.distance(o,!E),W=!1,x.emit("pointerUp")}function G(n){R&&(n.stopPropagation(),n.preventDefault(),R=!1)}return{init:function(n){if(!D)return;function i(i){(e(D)||D(n,i))&&function(n){const e=m(n,c);W=e,R=E&&e&&!n.buttons&&C,C=s(a.get(),l.get())>=2,e&&0!==n.button||function(n){const t=n.nodeName||"";return L.includes(t)}(n.target)||(k=!0,u.pointerDown(n),p.useFriction(0).useDuration(0),a.set(l),function(){const n=W?o:t;F.add(n,"touchmove",U,A).add(n,"touchend",X).add(n,"mousemove",U,A).add(n,"mouseup",X)}(),B=u.readPoint(n),H=u.readPoint(n,O),x.emit("pointerDown"))}(i)}const r=t;I.add(r,"dragstart",(n=>n.preventDefault()),A).add(r,"touchmove",(()=>{}),A).add(r,"touchend",(()=>{})).add(r,"touchstart",i).add(r,"mousedown",i).add(r,"touchcancel",X).add(r,"contextmenu",X).add(r,"click",G,!0)},destroy:function(){I.clear(),F.clear()},pointerDown:function(){return k}}}function x(n,t){let e,o;function r(n){return n.timeStamp}function s(e,o){const i="client"+("x"===(o||n.scroll)?"X":"Y");return(m(e,t)?e:e.touches[0])[i]}return{pointerDown:function(n){return e=n,o=n,s(n)},pointerMove:function(n){const t=s(n)-s(o),i=r(n)-r(e)>170;return o=n,i&&(e=n),t},pointerUp:function(n){if(!e||!o)return 0;const t=s(o)-s(e),c=r(n)-r(e),a=r(n)-r(o)>170,u=t/c;return c&&!a&&i(u)>.1?u:0},readPoint:s}}function b(n,t,o,r,s,c,a){const u=[n].concat(r);let l,d,f=[],p=!1;function m(n){return s.measureSize(a.measure(n))}return{init:function(s){c&&(d=m(n),f=r.map(m),l=new ResizeObserver((o=>{(e(c)||c(s,o))&&function(e){for(const o of e){if(p)return;const e=o.target===n,c=r.indexOf(o.target),a=e?d:f[c];if(i(m(e?n:r[c])-a)>=.5){s.reInit(),t.emit("resize");break}}}(o)})),o.requestAnimationFrame((()=>{u.forEach((n=>l.observe(n)))})))},destroy:function(){p=!0,l&&l.disconnect()}}}function E(n,t,e,o,r){const s=r.measure(10),c=r.measure(50),a=h(.1,.99);let u=!1;function l(){return!u&&!!n.reachedAny(e.get())&&!!n.reachedAny(t.get())}return{shouldConstrain:l,constrain:function(r){if(!l())return;const u=n.reachedMin(t.get())?"min":"max",d=i(n[u]-t.get()),f=e.get()-t.get(),p=a.constrain(d/c);e.subtract(f*p),!r&&i(f)<s&&(e.set(n.constrain(e.get())),o.useDuration(25).useBaseFriction())},toggleActive:function(n){u=!n}}}function S(n,t,e,o){const i=t.min+.1,r=t.max+.1,{reachedMin:s,reachedMax:c}=h(i,r);return{loop:function(t){if(!function(n){return 1===n?c(e.get()):-1===n&&s(e.get())}(t))return;const i=n*(-1*t);o.forEach((n=>n.add(i)))}}}function w(t,o,i,r,s,c,a,u){const l={passive:!0,capture:!0};let d=0;function f(n){"Tab"===n.code&&(d=(new Date).getTime())}return{init:function(p){u&&(c.add(document,"keydown",f,!1),o.forEach(((o,f)=>{c.add(o,"focus",(o=>{(e(u)||u(p,o))&&function(e){if((new Date).getTime()-d>10)return;a.emit("slideFocusStart"),t.scrollLeft=0;const o=i.findIndex((n=>n.includes(e)));n(o)&&(s.useDuration(0),r.index(o,0),a.emit("slideFocus"))}(f)}),l)})))}}}function M(t){let e=t;function o(t){return n(t)?t:t.get()}return{get:function(){return e},set:function(n){e=o(n)},add:function(n){e+=o(n)},subtract:function(n){e-=o(n)}}}function D(n,t){const e="x"===n.scroll?function(n){return`translate3d(${n}px,0px,0px)`}:function(n){return`translate3d(0px,${n}px,0px)`},o=t.style;let i=null,r=!1;return{clear:function(){r||(o.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(t){if(r)return;const s=(c=n.direction(t),Math.round(100*c)/100);var c;s!==i&&(o.transform=e(s),i=s)},toggleActive:function(n){r=!n}}}function O(n,t,e,o,i,r,s,a,u){const l=c(i),d=c(i).reverse(),f=function(){const n=s[0];return g(m(d,n),e,!1)}().concat(function(){const n=t-s[0]-1;return g(m(l,n),-e,!0)}());function p(n,t){return n.reduce(((n,t)=>n-i[t]),t)}function m(n,t){return n.reduce(((n,e)=>p(n,t)>0?n.concat([e]):n),[])}function g(i,s,c){const l=function(n){return r.map(((e,i)=>({start:e-o[i]+.5+n,end:e+t-.5+n})))}(s);return i.map((t=>{const o=c?0:-e,i=c?e:0,r=c?"end":"start",s=l[t][r];return{index:t,loopPoint:s,slideLocation:M(-1),translate:D(n,u[t]),target:()=>a.get()>s?o:i}}))}return{canLoop:function(){return f.every((({index:n})=>p(l.filter((t=>t!==n)),t)<=.1))},clear:function(){f.forEach((n=>n.translate.clear()))},loop:function(){f.forEach((n=>{const{target:t,translate:e,slideLocation:o}=n,i=t();i!==o.get()&&(e.to(i),o.set(i))}))},loopPoints:f}}function T(n,t,o){let i,r=!1;return{init:function(s){o&&(i=new MutationObserver((n=>{r||(e(o)||o(s,n))&&function(n){for(const e of n)if("childList"===e.type){s.reInit(),t.emit("slidesChanged");break}}(n)})),i.observe(n,{childList:!0}))},destroy:function(){i&&i.disconnect(),r=!0}}}function L(n,t,e,o){const i={};let r,s=null,c=null,a=!1;return{init:function(){r=new IntersectionObserver((n=>{a||(n?.forEach((n=>{const e=t.indexOf(n.target);i[e]=n})),s=null,c=null,e.emit("slidesInView"))}),{root:n.parentElement,threshold:o}),t.forEach((n=>r.observe(n)))},destroy:function(){r&&r.disconnect(),a=!0},get:function(n=!0){if(n&&s)return s;if(!n&&c)return c;const t=function(n){return f(i).reduce(((t,e)=>{const o=parseInt(e),{isIntersecting:r}=i[o];return(n&&r||!n&&!r)&&t.push(o),t}),[])}(n);return n&&(s=t),n||(c=t),t}}}function A(t,e,o,r,s,l,d,f,p){const{startEdge:m,endEdge:g,direction:h}=t,v=n(o);return{groupSlides:function(n){return v?function(n,t){return c(n).filter((n=>n%t==0)).map((e=>n.slice(e,e+t)))}(n,o):function(n){return n.length?c(n).reduce(((t,o,c)=>{const v=a(t)||0,y=0===v,x=o===u(n),b=s[m]-l[v][m],E=s[m]-l[o][g],S=!r&&y?h(d):0,w=i(E-(!r&&x?h(f):0)-(b+S));return c&&w>e+p&&t.push(o),x&&t.push(n.length),t}),[]).map(((t,e,o)=>{const i=Math.max(o[e-1]||0);return n.slice(i,t)})):[]}(n)}}}function I(n,e,o,f,p,m,I){const{align:F,axis:P,direction:N,startIndex:V,loop:j,duration:C,dragFree:B,dragThreshold:H,inViewThreshold:k,slidesToScroll:z,skipSnaps:R,containScroll:W,watchResize:U,watchSlides:X,watchDrag:G,watchFocus:Y}=m,$={measure:function(n){const{offsetTop:t,offsetLeft:e,offsetWidth:o,offsetHeight:i}=n;return{top:t,right:e+o,bottom:t+i,left:e,width:o,height:i}}},q=$.measure(e),Q=o.map($.measure),Z=function(n,t){const e="rtl"===t,o="y"===n,i=!o&&e?-1:1;return{scroll:o?"y":"x",cross:o?"x":"y",startEdge:o?"top":e?"right":"left",endEdge:o?"bottom":e?"left":"right",measureSize:function(n){const{height:t,width:e}=n;return o?t:e},direction:function(n){return n*i}}}(P,N),J=Z.measureSize(q),K=function(n){return{measure:function(t){return n*(t/100)}}}(J),_=function(n,e){const o={start:function(){return 0},center:function(n){return i(n)/2},end:i};function i(n){return e-n}return{measure:function(i,r){return t(n)?o[n](i):n(e,i,r)}}}(F,J),nn=!j&&!!W,tn=j||!!W,{slideSizes:en,slideSizesWithGaps:on,startGap:rn,endGap:sn}=function(n,t,e,o,r,s){const{measureSize:c,startEdge:u,endEdge:d}=n,f=e[0]&&r,p=function(){if(!f)return 0;const n=e[0];return i(t[u]-n[u])}(),m=function(){if(!f)return 0;const n=s.getComputedStyle(a(o));return parseFloat(n.getPropertyValue(`margin-${d}`))}(),g=e.map(c),h=e.map(((n,t,e)=>{const o=!t,i=l(e,t);return o?g[t]+p:i?g[t]+m:e[t+1][u]-n[u]})).map(i);return{slideSizes:g,slideSizesWithGaps:h,startGap:p,endGap:m}}(Z,q,Q,o,tn,p),cn=A(Z,J,z,j,q,Q,rn,sn,2),{snaps:an,snapsAligned:un}=function(n,t,e,o,r){const{startEdge:s,endEdge:c}=n,{groupSlides:u}=r,l=u(o).map((n=>a(n)[c]-n[0][s])).map(i).map(t.measure),d=o.map((n=>e[s]-n[s])).map((n=>-i(n))),f=u(d).map((n=>n[0])).map(((n,t)=>n+l[t]));return{snaps:d,snapsAligned:f}}(Z,_,q,Q,cn),ln=-a(an)+a(on),{snapsContained:dn,scrollContainLimit:fn}=function(n,t,e,o){const i=h(-t+n,0),r=e.map(((n,t)=>{const{min:o,max:r}=i,s=i.constrain(n),c=!t,a=l(e,t);return c?r:a||u(o,s)?o:u(r,s)?r:s})).map((n=>parseFloat(n.toFixed(3)))),c=function(){const n=r[0],t=a(r);return h(r.lastIndexOf(n),r.indexOf(t)+1)}();function u(n,t){return s(n,t)<=1}return{snapsContained:function(){if(t<=n+2)return[i.max];if("keepSnaps"===o)return r;const{min:e,max:s}=c;return r.slice(e,s)}(),scrollContainLimit:c}}(J,ln,un,W),pn=nn?dn:un,{limit:mn}=function(n,t,e){const o=t[0];return{limit:h(e?o-n:a(t),o)}}(ln,pn,j),gn=v(u(pn),V,j),hn=gn.clone(),vn=c(o),yn=function(n,t,e,o){const i=g(),r=1e3/60;let s=null,c=0,a=0;function u(n){if(!a)return;s||(s=n,e(),e());const i=n-s;for(s=n,c+=i;c>=r;)e(),c-=r;o(c/r),a&&(a=t.requestAnimationFrame(u))}function l(){t.cancelAnimationFrame(a),s=null,c=0,a=0}return{init:function(){i.add(n,"visibilitychange",(()=>{n.hidden&&(s=null,c=0)}))},destroy:function(){l(),i.clear()},start:function(){a||(a=t.requestAnimationFrame(u))},stop:l,update:e,render:o}}(f,p,(()=>(({dragHandler:n,scrollBody:t,scrollBounds:e,options:{loop:o}})=>{o||e.constrain(n.pointerDown()),t.seek()})(Pn)),(n=>(({scrollBody:n,translate:t,location:e,offsetLocation:o,previousLocation:i,scrollLooper:r,slideLooper:s,dragHandler:c,animation:a,eventHandler:u,scrollBounds:l,options:{loop:d}},f)=>{const p=n.settled(),m=!l.shouldConstrain(),g=d?p:p&&m;g&&!c.pointerDown()&&(a.stop(),u.emit("settle")),g||u.emit("scroll");const h=e.get()*f+i.get()*(1-f);o.set(h),d&&(r.loop(n.direction()),s.loop()),t.to(o.get())})(Pn,n))),xn=pn[gn.get()],bn=M(xn),En=M(xn),Sn=M(xn),wn=M(xn),Mn=function(n,t,e,o,s){let c=0,a=0,u=s,l=.68,d=n.get(),f=0;function p(n){return u=n,g}function m(n){return l=n,g}const g={direction:function(){return a},duration:function(){return u},velocity:function(){return c},seek:function(){const t=o.get()-n.get();let i=0;return u?(e.set(n),c+=t/u,c*=l,d+=c,n.add(c),i=d-f):(c=0,e.set(o),n.set(o),i=t),a=r(i),f=d,g},settled:function(){return i(o.get()-t.get())<.001},useBaseFriction:function(){return m(.68)},useBaseDuration:function(){return p(s)},useFriction:m,useDuration:p};return g}(bn,Sn,En,wn,C),Dn=function(n,t,e,o,s){const{reachedAny:c,removeOffset:u,constrain:l}=o;function d(n){return n.concat().sort(((n,t)=>i(n)-i(t)))[0]}function f(t,o){const i=[t,t+e,t-e];if(!n)return t;if(!o)return d(i);const s=i.filter((n=>r(n)===o));return s.length?d(s):a(i)-e}return{byDistance:function(e,o){const r=s.get()+e,{index:a,distance:d}=function(e){const o=n?u(e):l(e),r=t.map(((n,t)=>({diff:f(n-o,0),index:t}))).sort(((n,t)=>i(n.diff)-i(t.diff))),{index:s}=r[0];return{index:s,distance:o}}(r),p=!n&&c(r);return!o||p?{index:a,distance:e}:{index:a,distance:e+f(t[a]-d,0)}},byIndex:function(n,e){return{index:n,distance:f(t[n]-s.get(),e)}},shortcut:f}}(j,pn,ln,mn,wn),On=function(n,t,e,o,i,r,s){function c(i){const c=i.distance,a=i.index!==t.get();r.add(c),c&&(o.duration()?n.start():(n.update(),n.render(1),n.update())),a&&(e.set(t.get()),t.set(i.index),s.emit("select"))}return{distance:function(n,t){c(i.byDistance(n,t))},index:function(n,e){const o=t.clone().set(n);c(i.byIndex(o.get(),e))}}}(yn,gn,hn,Mn,Dn,wn,I),Tn=function(n){const{max:t,length:e}=n;return{get:function(n){return e?(n-t)/-e:0}}}(mn),Ln=g(),An=L(e,o,I,k),{slideRegistry:In}=function(n,t,e,o,i,r){const{groupSlides:s}=i,{min:c,max:f}=o;return{slideRegistry:function(){const o=s(r),i=!n||"keepSnaps"===t;return 1===e.length?[r]:i?o:o.slice(c,f).map(((n,t,e)=>{const o=!t,i=l(e,t);return o?d(a(e[0])+1):i?d(u(r)-a(e)[0]+1,a(e)[0]):n}))}()}}(nn,W,pn,fn,cn,vn),Fn=w(n,o,In,On,Mn,Ln,I,Y),Pn={ownerDocument:f,ownerWindow:p,eventHandler:I,containerRect:q,slideRects:Q,animation:yn,axis:Z,dragHandler:y(Z,n,f,p,wn,x(Z,p),bn,yn,On,Mn,Dn,gn,I,K,B,H,R,.68,G),eventStore:Ln,percentOfView:K,index:gn,indexPrevious:hn,limit:mn,location:bn,offsetLocation:Sn,previousLocation:En,options:m,resizeHandler:b(e,I,p,o,Z,U,$),scrollBody:Mn,scrollBounds:E(mn,Sn,wn,Mn,K),scrollLooper:S(ln,mn,Sn,[bn,Sn,En,wn]),scrollProgress:Tn,scrollSnapList:pn.map(Tn.get),scrollSnaps:pn,scrollTarget:Dn,scrollTo:On,slideLooper:O(Z,J,ln,en,on,an,pn,Sn,o),slideFocus:Fn,slidesHandler:T(e,I,X),slidesInView:An,slideIndexes:vn,slideRegistry:In,slidesToScroll:cn,target:wn,translate:D(Z,e)};return Pn}const F={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function P(n){function t(n,t){return p(n,t||{})}const e={mergeOptions:t,optionsAtMedia:function(e){const o=e.breakpoints||{},i=f(o).filter((t=>n.matchMedia(t).matches)).map((n=>o[n])).reduce(((n,e)=>t(n,e)),{});return t(e,i)},optionsMediaQueries:function(t){return t.map((n=>f(n.breakpoints||{}))).reduce(((n,t)=>n.concat(t)),[]).map(n.matchMedia)}};return e}function N(n,e,o){const i=n.ownerDocument,r=i.defaultView,s=P(r),c=function(n){let t=[];return{init:function(e,o){return t=o.filter((({options:t})=>!1!==n.optionsAtMedia(t).active)),t.forEach((t=>t.init(e,n))),o.reduce(((n,t)=>Object.assign(n,{[t.name]:t})),{})},destroy:function(){t=t.filter((n=>n.destroy()))}}}(s),a=g(),u=function(){let n,t={};function e(n){return t[n]||[]}const o={init:function(t){n=t},emit:function(t){return e(t).forEach((e=>e(n,t))),o},off:function(n,i){return t[n]=e(n).filter((n=>n!==i)),o},on:function(n,i){return t[n]=e(n).concat([i]),o},clear:function(){t={}}};return o}(),{mergeOptions:l,optionsAtMedia:d,optionsMediaQueries:f}=s,{on:p,off:m,emit:h}=u,v=L;let y,x,b,E,S=!1,w=l(F,N.globalOptions),M=l(w),D=[];function O(t){const e=I(n,b,E,i,r,t,u);return t.loop&&!e.slideLooper.canLoop()?O(Object.assign({},t,{loop:!1})):e}function T(e,o){S||(w=l(w,e),M=d(w),D=o||D,function(){const{container:e,slides:o}=M,i=t(e)?n.querySelector(e):e;b=i||n.children[0];const r=t(o)?b.querySelectorAll(o):o;E=[].slice.call(r||b.children)}(),y=O(M),f([w,...D.map((({options:n})=>n))]).forEach((n=>a.add(n,"change",L))),M.active&&(y.translate.to(y.location.get()),y.animation.init(),y.slidesInView.init(),y.slideFocus.init(C),y.eventHandler.init(C),y.resizeHandler.init(C),y.slidesHandler.init(C),y.options.loop&&y.slideLooper.loop(),b.offsetParent&&E.length&&y.dragHandler.init(C),x=c.init(C,D)))}function L(n,t){const e=j();A(),T(l({startIndex:e},n),t),u.emit("reInit")}function A(){y.dragHandler.destroy(),y.eventStore.clear(),y.translate.clear(),y.slideLooper.clear(),y.resizeHandler.destroy(),y.slidesHandler.destroy(),y.slidesInView.destroy(),y.animation.destroy(),c.destroy(),a.clear()}function V(n,t,e){M.active&&!S&&(y.scrollBody.useBaseFriction().useDuration(!0===t?0:M.duration),y.scrollTo.index(n,e||0))}function j(){return y.index.get()}const C={canScrollNext:function(){return y.index.add(1).get()!==j()},canScrollPrev:function(){return y.index.add(-1).get()!==j()},containerNode:function(){return b},internalEngine:function(){return y},destroy:function(){S||(S=!0,a.clear(),A(),u.emit("destroy"),u.clear())},off:m,on:p,emit:h,plugins:function(){return x},previousScrollSnap:function(){return y.indexPrevious.get()},reInit:v,rootNode:function(){return n},scrollNext:function(n){V(y.index.add(1).get(),n,-1)},scrollPrev:function(n){V(y.index.add(-1).get(),n,1)},scrollProgress:function(){return y.scrollProgress.get(y.location.get())},scrollSnapList:function(){return y.scrollSnapList},scrollTo:V,selectedScrollSnap:j,slideNodes:function(){return E},slidesInView:function(){return y.slidesInView.get()},slidesNotInView:function(){return y.slidesInView.get(!1)}};return T(e,o),setTimeout((()=>u.emit("init")),0),C}return N.globalOptions=void 0,N})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselAutoHeight=t()}(this,(function(){"use strict";function n(n={}){let t,e=[];const o=["select","slideFocus"];function i(){t.containerNode().style.height=`${function(){const{slideRegistry:n}=t.internalEngine();return n[t.selectedScrollSnap()].map((n=>e[n])).reduce(((n,t)=>Math.max(n,t)),0)}()}px`}return{name:"autoHeight",options:n,init:function(n){t=n;const{options:{axis:r},slideRects:s}=t.internalEngine();"y"!==r&&(e=s.map((n=>n.height)),o.forEach((n=>t.on(n,i))),i())},destroy:function(){o.forEach((n=>t.off(n,i)));const n=t.containerNode();n.style.height="",n.getAttribute("style")||n.removeAttribute("style")}}}return n.globalOptions=void 0,n})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselAutoScroll=t()}(this,(function(){"use strict";const n={direction:"forward",speed:2,startDelay:1e3,active:!0,breakpoints:{},playOnInit:!0,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,rootNode:null};function t(e={}){let o,i,r,s,c,a=!1,u=!0,l=0;function d(){if(r||a)return;if(!u)return;i.emit("autoScroll:play");const n=i.internalEngine(),{ownerWindow:t}=n;l=t.setTimeout((()=>{n.scrollBody=function(n){const{location:t,previousLocation:e,offsetLocation:r,target:s,scrollTarget:c,index:a,indexPrevious:u,limit:{reachedMin:l,reachedMax:d,constrain:p},options:{loop:m}}=n,g="forward"===o.direction?-1:1,h=()=>S;let v=0,y=0,x=t.get(),b=0,E=!1;const S={direction:()=>y,duration:()=>-1,velocity:()=>v,settled:()=>E,seek:function(n){const h=n/1e3;let w=0;e.set(t),v=g*o.speed*55,x+=v,t.add(v*h),s.set(t),w=x-b,y=Math.sign(w),b=x;const M=c.byDistance(0,!1).index;a.get()!==M&&(u.set(a.get()),a.set(M),i.emit("select"));const D="forward"===o.direction?l(r.get()):d(r.get());if(!m&&D){E=!0;const n=p(t.get());t.set(n),s.set(t),f()}return S},useBaseFriction:h,useBaseDuration:h,useFriction:h,useDuration:h};return S}(n),n.animation.start()}),s),a=!0}function f(){if(r||!a)return;i.emit("autoScroll:stop");const n=i.internalEngine(),{ownerWindow:t}=n;n.scrollBody=c,t.clearTimeout(l),l=0,a=!1}function p(){u&&d(),i.off("settle",p)}function m(){i.on("settle",p)}return{name:"autoScroll",options:e,init:function(a,l){i=a;const{mergeOptions:p,optionsAtMedia:g}=l,h=p(n,t.globalOptions),v=p(h,e);if(o=g(v),i.scrollSnapList().length<=1)return;s=o.startDelay,r=!1,c=i.internalEngine().scrollBody;const{eventStore:y}=i.internalEngine(),x=i.rootNode(),b=o.rootNode&&o.rootNode(x)||x,E=i.containerNode();i.on("pointerDown",f),o.stopOnInteraction||i.on("pointerUp",m),o.stopOnMouseEnter&&(y.add(b,"mouseenter",(()=>{u=!1,f()})),o.stopOnInteraction||y.add(b,"mouseleave",(()=>{u=!0,d()}))),o.stopOnFocusIn&&(i.on("slideFocusStart",f),o.stopOnInteraction||y.add(E,"focusout",d)),o.playOnInit&&d()},destroy:function(){i.off("pointerDown",f).off("pointerUp",m).off("slideFocusStart",f).off("settle",p),f(),r=!0,a=!1},play:function(n){void 0!==n&&(s=n),u=!0,d()},stop:function(){a&&f()},reset:function(){a&&(f(),m())},isPlaying:function(){return a}}}return t.globalOptions=void 0,t})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselAutoplay=t()}(this,(function(){"use strict";const n={active:!0,breakpoints:{},delay:4e3,jump:!1,playOnInit:!0,stopOnFocusIn:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function t(e={}){let o,i,r,s=!1,c=!0,a=!1,u=0;function l(){if(r)return;if(!c)return;s||i.emit("autoplay:play");const{ownerWindow:n}=i.internalEngine();n.clearInterval(u),u=n.setInterval(g,o.delay),s=!0}function d(){if(r)return;s&&i.emit("autoplay:stop");const{ownerWindow:n}=i.internalEngine();n.clearInterval(u),u=0,s=!1}function f(){if(p())return c=s,d();c&&l()}function p(){const{ownerDocument:n}=i.internalEngine();return"hidden"===n.visibilityState}function m(n){void 0!==n&&(a=n),c=!0,l()}function g(){const{index:n}=i.internalEngine(),t=n.clone().add(1).get(),e=i.scrollSnapList().length-1;o.stopOnLastSnap&&t===e&&d(),i.canScrollNext()?i.scrollNext(a):i.scrollTo(0,a)}return{name:"autoplay",options:e,init:function(s,u){i=s;const{mergeOptions:m,optionsAtMedia:g}=u,h=m(n,t.globalOptions),v=m(h,e);if(o=g(v),i.scrollSnapList().length<=1)return;a=o.jump,r=!1;const{eventStore:y,ownerDocument:x}=i.internalEngine(),b=i.rootNode(),E=o.rootNode&&o.rootNode(b)||b,S=i.containerNode();i.on("pointerDown",d),o.stopOnInteraction||i.on("pointerUp",l),o.stopOnMouseEnter&&(y.add(E,"mouseenter",(()=>{c=!1,d()})),o.stopOnInteraction||y.add(E,"mouseleave",(()=>{c=!0,l()}))),o.stopOnFocusIn&&(i.on("slideFocusStart",d),o.stopOnInteraction||y.add(S,"focusout",l)),y.add(x,"visibilitychange",f),o.playOnInit&&!p()&&l()},destroy:function(){i.off("pointerDown",d).off("pointerUp",l).off("slideFocusStart",d),d(),r=!0,s=!1},play:m,stop:function(){s&&d()},reset:function(){s&&m()},isPlaying:function(){return s}}}return t.globalOptions=void 0,t})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselClassNames=t()}(this,(function(){"use strict";const n={active:!0,breakpoints:{},snapped:"is-snapped",inView:"is-in-view",draggable:"is-draggable",dragging:"is-dragging"};function t(n,t){if(!n||!t)return;const{classList:e}=n;e.contains(t)&&e.remove(t)}function e(n,t){if(!n||!t)return;const{classList:e}=n;e.contains(t)||e.add(t)}function o(i={}){let r,s,c,a;const u=["select"],l=["pointerDown","pointerUp"],d=["slidesInView"];function f(n,o){"pointerDown"===o?e(c,r.dragging):t(c,r.dragging)}function p(n,o){var i;(i=s.containerNode().querySelectorAll(`.${o}`),Array.from(i)).forEach((n=>t(n,o))),n.forEach((n=>e(a[n],o)))}function m(){const{slideRegistry:n}=s.internalEngine();p(n[s.selectedScrollSnap()],r.snapped)}function g(){p(s.slidesInView(),r.inView)}return{name:"classNames",options:i,init:function(t,p){s=t;const{mergeOptions:h,optionsAtMedia:v}=p,y=h(n,o.globalOptions),x=h(y,i);r=v(x),c=s.rootNode(),a=s.slideNodes(),!!s.internalEngine().options.watchDrag&&e(c,r.draggable),r.dragging&&l.forEach((n=>s.on(n,f))),r.snapped&&(u.forEach((n=>s.on(n,m))),m()),r.inView&&(d.forEach((n=>s.on(n,g))),g())},destroy:function(){t(c,r.draggable),l.forEach((n=>s.off(n,f))),u.forEach((n=>s.off(n,m))),d.forEach((n=>s.off(n,g))),a.forEach((n=>t(n,r.snapped)))}}}return o.globalOptions=void 0,o})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselFade=t()}(this,(function(){"use strict";function n(n,t,e){return Math.min(Math.max(n,t),e)}function t(n){return"number"==typeof n&&!isNaN(n)}function e(e={}){const o=1e3/60;let i,r,s,c,a=[],u=0,l=0,d=0,f=!1;function p(){y(i.selectedScrollSnap(),1)}function m(){f=!1}function g(){f=!1,u=0,l=0}function h(){const n=i.internalEngine().scrollBody.duration();l=n?0:1,f=!0,n||p()}function v(n){const{scrollSnaps:e,location:o,target:r}=i.internalEngine();!t(n)||a[n]<.5||(o.set(e[n]),r.set(o))}function y(t,e){i.scrollSnapList().forEach(((o,r)=>{const s=Math.abs(e),c=a[r],l=r===t,p=n(l?c+s:c-s,0,1);a[r]=p;const m=l&&f,g=i.previousScrollSnap();m&&(a[g]=1-p),l&&function(n,t){const{index:e,dragHandler:o,scrollSnaps:r}=i.internalEngine(),s=o.pointerDown(),c=1/(r.length-1);let a=n,l=s?i.selectedScrollSnap():i.previousScrollSnap();if(s&&a===l){const n=-1*Math.sign(u);a=l,l=e.clone().set(l).add(n).get()}d=l*c+(a-l)*c*t}(t,p),function(n){const t=i.internalEngine().slideRegistry[n],{scrollSnaps:e,containerRect:o}=i.internalEngine(),r=a[n];t.forEach((t=>{const s=i.slideNodes()[t].style,c=parseFloat(r.toFixed(2)),a=c>0,u=function(n){const{axis:t}=i.internalEngine();return`translate${t.scroll.toUpperCase()}(${t.direction(n)}px)`}(a?e[n]:o.width+2);a&&(s.transform=u),s.opacity=c.toString(),s.pointerEvents=r>.5?"auto":"none",a||(s.transform=u)}))}(r)}))}function x(){const{dragHandler:n,index:t,scrollBody:e}=i.internalEngine(),o=i.selectedScrollSnap();if(!n.pointerDown())return o;const r=Math.sign(e.velocity()),s=Math.sign(u),c=t.clone().set(o).add(-1*r).get();return r&&s?s===r?c:o:null}function b(){const{target:n,location:e}=i.internalEngine(),s=n.get()-e.get(),c=Math.abs(s)>=1,d=x(),f=!t(d);return function(n){const{dragHandler:e,scrollBody:i}=n.internalEngine(),s=o/1e3,c=e.pointerDown(),d=i.velocity()*s,f=i.duration(),p=x(),m=!t(p);if(c){if(!d)return;u+=d,l=Math.abs(d/r),v(p)}if(!c){if(!f||m)return;l+=(1-a[p])/f,l*=.68}m||y(p,l)}(i),!f&&!c&&a[d]>.999}function E(){return d}return{name:"fade",options:e,init:function(t){i=t;const e=i.selectedScrollSnap(),{scrollBody:o,containerRect:u,axis:l}=i.internalEngine(),d=l.measureSize(u);r=n(.75*d,200,500),f=!1,a=i.scrollSnapList().map(((n,t)=>t===e?1:0)),s=o.settled,c=i.scrollProgress,o.settled=b,i.scrollProgress=E,i.on("select",h).on("slideFocus",p).on("pointerDown",g).on("pointerUp",m),function(){const{translate:n,slideLooper:t}=i.internalEngine();n.clear(),n.toggleActive(!1),t.loopPoints.forEach((({translate:n})=>{n.clear(),n.toggleActive(!1)}))}(),p()},destroy:function(){const{scrollBody:n}=i.internalEngine();n.settled=s,i.scrollProgress=c,i.off("select",h).off("slideFocus",p).off("pointerDown",g).off("pointerUp",m),i.slideNodes().forEach((n=>{const t=n.style;t.opacity="",t.transform="",t.pointerEvents="",n.getAttribute("style")||n.removeAttribute("style")}))}}}return e.globalOptions=void 0,e})),function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n=n||self).EmblaCarouselWheelGestures=t()}(this,(function(){"use strict";function n(){return(n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])}return n}).apply(this,arguments)}function t(n,t){if(n.length!==t.length)throw new Error("vectors must be same length");return n.map((function(n,e){return n+t[e]}))}function e(n){return Math.max.apply(Math,n.map(Math.abs))}function o(n){return Object.freeze(n),Object.values(n).forEach((function(n){null===n||"object"!=typeof n||Object.isFrozen(n)||o(n)})),n}var i=[1,18,"undefined"!=typeof window&&window.innerHeight||800],r=[-1,-1,-1],s=o({preventWheelAction:!0,reverseSign:[!0,!0,!1]}),c={active:!0,breakpoints:{},wheelDraggingClass:"is-wheel-dragging",forceWheelAxis:void 0,target:void 0};function a(u){var l;void 0===u&&(u={});var d=function(){};return{name:"wheelGestures",options:u,init:function(f,p){var m,g,h=p.mergeOptions,v=p.optionsAtMedia,y=h(c,a.globalOptions),x=h(y,u);l=v(x);var b,E=f.internalEngine(),S=null!=(m=l.target)?m:f.containerNode().parentNode,w=null!=(g=l.forceWheelAxis)?g:E.options.axis,M=function(c){void 0===c&&(c={});var a,u,l,d=function(){var n={};function t(t,e){n[t]=(n[t]||[]).filter((function(n){return n!==e}))}return o({on:function(e,o){return n[e]=(n[e]||[]).concat(o),function(){return t(e,o)}},off:t,dispatch:function(t,e){t in n&&n[t].forEach((function(n){return n(e)}))}})}(),f=d.on,p=d.off,m=d.dispatch,g=s,h={isStarted:!1,isStartPublished:!1,isMomentum:!1,startTime:0,lastAbsDelta:1/0,axisMovement:[0,0,0],axisVelocity:[0,0,0],accelerationFactors:[],scrollPoints:[],scrollPointsToMerge:[],willEndTimeout:400},v=!1,y=function(n){Array.isArray(n)?n.forEach((function(n){return E(n)})):E(n)},x=function(t){return void 0===t&&(t={}),Object.values(t).some((function(n){return null==n}))?g:g=o(n({},s,g,t))},b=function(e){var o=n({event:a,isStart:!1,isEnding:!1,isMomentumCancel:!1,isMomentum:h.isMomentum,axisDelta:[0,0,0],axisVelocity:h.axisVelocity,axisMovement:h.axisMovement,get axisMovementProjection(){return t(o.axisMovement,o.axisVelocity.map((function(n){return void 0===t&&(t=.996),n*t/(1-t);var t})))}},e);m("wheel",n({},o,{previous:u})),u=o},E=function(o){var s,c=function(t){return n({},t,{axisDelta:t.axisDelta.map((function(n){return Math.min(Math.max(-700,n),700)}))})}(function(t,e){if(!e)return t;var o=!0===e?r:e.map((function(n){return n?-1:1}));return n({},t,{axisDelta:t.axisDelta.map((function(n,t){return n*o[t]}))})}({timeStamp:(s=o).timeStamp,axisDelta:[s.deltaX*i[s.deltaMode],s.deltaY*i[s.deltaMode],(s.deltaZ||0)*i[s.deltaMode]]},g.reverseSign)),u=c.axisDelta,l=c.timeStamp,d=e(u);o.preventDefault&&function(n,t){var e=g.preventWheelAction,o=t[0],i=t[1],r=t[2];if("boolean"==typeof e)return e;switch(e){case"x":return Math.abs(o)>=n;case"y":return Math.abs(i)>=n;case"z":return Math.abs(r)>=n;default:return!1}}(d,u)&&o.preventDefault(),h.isStarted?h.isMomentum&&d>Math.max(2,2*h.lastAbsDelta)&&(F(!0),A()):A(),0===d&&Object.is&&Object.is(o.deltaX,-0)?v=!0:(a=o,h.axisMovement=t(h.axisMovement,u),h.lastAbsDelta=d,h.scrollPointsToMerge.push({axisDelta:u,timeStamp:l}),S(),b({axisDelta:u,isStart:!h.isStartPublished}),h.isStartPublished=!0,I())},S=function(){var n;2===h.scrollPointsToMerge.length?(h.scrollPoints.unshift({axisDeltaSum:h.scrollPointsToMerge.map((function(n){return n.axisDelta})).reduce(t),timeStamp:(n=h.scrollPointsToMerge.map((function(n){return n.timeStamp})),n.reduce((function(n,t){return n+t}))/n.length)}),M(),h.scrollPointsToMerge.length=0,h.scrollPoints.length=1,h.isMomentum||T()):h.isStartPublished||w()},w=function(){var n;h.axisVelocity=(n=h.scrollPointsToMerge,n[n.length-1]).axisDelta.map((function(n){return n/h.willEndTimeout}))},M=function(){var n=h.scrollPoints,t=n[0],e=n[1];if(e&&t){var o=t.timeStamp-e.timeStamp;if(!(o<=0)){var i=t.axisDeltaSum.map((function(n){return n/o})),r=i.map((function(n,t){return n/(h.axisVelocity[t]||1)}));h.axisVelocity=i,h.accelerationFactors.push(r),D(o)}}},D=function(n){var t=10*Math.ceil(n/10)*1.2;h.isMomentum||(t=Math.max(100,2*t)),h.willEndTimeout=Math.min(1e3,Math.round(t))},O=function(n){return 0===n||n<=.96&&n>=.6},T=function(){if(h.accelerationFactors.length>=5){if(v&&(v=!1,e(h.axisVelocity)>=.2))return void L();var n=h.accelerationFactors.slice(-5);n.every((function(n){var t=!!n.reduce((function(n,t){return n&&n<1&&n===t?1:0})),e=n.filter(O).length===n.length;return t||e}))&&L(),h.accelerationFactors=n}},L=function(){h.isMomentum=!0},A=function(){(h={isStarted:!1,isStartPublished:!1,isMomentum:!1,startTime:0,lastAbsDelta:1/0,axisMovement:[0,0,0],axisVelocity:[0,0,0],accelerationFactors:[],scrollPoints:[],scrollPointsToMerge:[],willEndTimeout:400}).isStarted=!0,h.startTime=Date.now(),u=void 0,v=!1},I=function(){clearTimeout(l),l=setTimeout(F,h.willEndTimeout)},F=function(n){void 0===n&&(n=!1),h.isStarted&&(b(h.isMomentum&&n?{isEnding:!0,isMomentumCancel:!0}:{isEnding:!0}),h.isMomentum=!1,h.isStarted=!1)},P=function(n){var t=[],e=function(e){e.removeEventListener("wheel",n),t=t.filter((function(n){return n!==e}))};return o({observe:function(o){return o.addEventListener("wheel",n,{passive:!1}),t.push(o),function(){return e(o)}},unobserve:e,disconnect:function(){t.forEach(e)}})}(y),N=P.observe,V=P.unobserve,j=P.disconnect;return x(c),o({on:f,off:p,observe:N,unobserve:V,disconnect:j,feedWheel:y,updateOptions:x})}({preventWheelAction:w,reverseSign:[!0,!0,!1]}),D=M.observe(S),O=M.on("wheel",(function(n){var t=n.axisDelta,e=t[0],o=t[1],i="x"===w?o:e,r=n.isEnding&&!n.isMomentum||n.isMomentum&&n.previous&&!n.previous.isMomentum;Math.abs("x"===w?e:o)>Math.abs(i)&&!T&&!n.isMomentum&&function(n){try{F(b=new MouseEvent("mousedown",n.event))}catch(n){return d()}T=!0,document.documentElement.addEventListener("mousemove",A,!0),document.documentElement.addEventListener("mouseup",A,!0),document.documentElement.addEventListener("mousedown",A,!0),l.wheelDraggingClass&&S.classList.add(l.wheelDraggingClass)}(n),T&&(r?function(n){T=!1,F(I("mouseup",n)),L(),l.wheelDraggingClass&&S.classList.remove(l.wheelDraggingClass)}(n):F(I("mousemove",n)))})),T=!1;function L(){document.documentElement.removeEventListener("mousemove",A,!0),document.documentElement.removeEventListener("mouseup",A,!0),document.documentElement.removeEventListener("mousedown",A,!0)}function A(n){T&&n.isTrusted&&n.stopImmediatePropagation()}function I(n,t){var e,o;if(w===E.options.axis){var i=t.axisMovement;e=i[0],o=i[1]}else{var r=t.axisMovement;o=r[0],e=r[1]}if(!E.options.skipSnaps&&!E.options.dragFree){var s=E.containerRect.width,c=E.containerRect.height;e=e<0?Math.max(e,-s):Math.min(e,s),o=o<0?Math.max(o,-c):Math.min(o,c)}return new MouseEvent(n,{clientX:b.clientX+e,clientY:b.clientY+o,screenX:b.screenX+e,screenY:b.screenY+o,movementX:e,movementY:o,button:0,bubbles:!0,cancelable:!0,composed:!0})}function F(n){f.containerNode().dispatchEvent(n)}d=function(){D(),O(),L()}},destroy:function(){return d()}}}return a.globalOptions=void 0,a}));
// Animation for accordion.
class btyAccordion {
	constructor( el, toggle = 'summary', view = '.details-content' ) {
		const accordion = this;

		accordion.el      = el;
		accordion.summary = el.querySelector( toggle );
		accordion.content = el.querySelector( view );

		accordion.animation   = null;
		accordion.isClosing   = false;
		accordion.isExpanding = false;

		if ( ! accordion.content ) {
			return;
		}

		accordion.summary.addEventListener(
			'click',
			function( e ) {
				accordion.onClick( e );
			}
		);
	}

	onClick(e) {
		e.preventDefault();
		const accordion = this;

		accordion.el.style.overflow = 'hidden';

		let aria = accordion.summary.getAttribute( 'aria-expanded' );

		if ( accordion.isClosing || ! accordion.el.open ) {
			accordion.open();

			if ( aria ) {
				accordion.summary.setAttribute( 'aria-expanded', 'true' );
			}
		} else if ( accordion.isExpanding || accordion.el.open ) {
			accordion.shrink();

			if ( aria ) {
				accordion.summary.setAttribute( 'aria-expanded', 'false' );
			}
		}
	}

	shrink() {
		const accordion = this;

		accordion.isClosing = true;

		let startHeight = accordion.el.offsetHeight + 'px',
			endHeight   = accordion.summary.offsetHeight + 'px';

		if ( accordion.animation ) {
			accordion.animation.cancel();
		}

		accordion.animation = accordion.el.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 200,
				easing: 'ease-out'
			}
		);

		accordion.animation.onfinish = function() {
			accordion.onAnimationFinish( false );
		}

		accordion.animation.oncancel = function() {
			accordion.isClosing = false;
		}
	}

	open() {
		const accordion = this;

		accordion.el.style.height = accordion.el.offsetHeight + 'px';
		accordion.el.open         = true;

		window.requestAnimationFrame(
			function() {
				accordion.expand();
			}
		);
	}

	expand() {
		const accordion = this;

		accordion.isExpanding = true;

		let startHeight = accordion.el.offsetHeight + 'px',
			endHeight   = ( accordion.summary.offsetHeight + accordion.content.offsetHeight ) + 'px';

		if (accordion.animation) {
			accordion.animation.cancel();
		}

		accordion.animation = accordion.el.animate(
			{
				height: [startHeight, endHeight]
			},
			{
				duration: 200,
				easing: 'ease-out'
			}
		);

		accordion.animation.onfinish = function() {
			accordion.onAnimationFinish( true );
		}

		accordion.animation.oncancel = function() {
			accordion.isExpanding = false;
		}
	}

	onAnimationFinish(open) {
		const accordion = this;

		accordion.el.open     = open;
		accordion.animation   = null;
		accordion.isClosing   = false;
		accordion.isExpanding = false;

		accordion.el.removeAttribute( 'style' );
	}
}

function btyAccordionHandle( doc = document ) {
	let details = doc.querySelectorAll( 'details' );
	if ( ! details.length ) {
		return;
	}

	details.forEach(
		function( el ) {
			// No apply effect for motion reduce node.
			if ( el.hasAttribute( 'data-motion-reduce' ) ) {
				return;
			}

			new btyAccordion( el );
		}
	);
}

// Accordion hover.
function btyAccordionHover( doc = document ) {
	let menus = doc.querySelectorAll( '.menu-map.faq-accordion' );

	if ( ! menus.length ) {
		return;
	}

	menus.forEach(
		function( el ) {
			let section   = el.closest( '.shopify-section' ),
				id        = el.getAttribute( 'data-id' ),
				container = section ? section.querySelectorAll( '.content-map[data-id="' + id + '"]' ) : [];

			el.addEventListener(
				'mouseenter',
				function() {
					if ( window.matchMedia( '(max-width: 991px)' ).matches || window.matchMedia( '(hover: none)' ).matches ) {
						return;
					}

					if ( container.length ) {
						container.forEach(
							function( con ) {
								let sibs = btySiblings( con );
								if ( sibs.length ) {
									sibs.forEach(
										function( sib ) {
											sib.classList.remove( 'active' );
										}
									);
								}

								con.classList.add( 'active' );
							}
						);
					}
				}
			);
		}
	);
}

// Footer accordion.
function btyFooterAccordion( doc = document ) {
	let headings = doc.querySelectorAll( '.ft-block-heading' );
	if ( ! headings.length ) {
		return;
	}

	headings.forEach(
		function ( el ) {
			let block = el.parentNode.querySelector( '.ft-block-content' );
			if ( ! block ) {
				return;
			}

			if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
				el.parentNode.classList.remove( 'open' );
				block.removeAttribute( 'style' );

				return;
			}

			el.onclick = function () {
				if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
					return;
				}

				if ( 'none' === window.getComputedStyle( block ).display ) {
					btySlideDown( block );
					el.parentNode.classList.add( 'open' );
				} else {
					btySlideUp( block );
					el.parentNode.classList.remove( 'open' );
				}
			}
		}
	);
}

// Add class to style footer menu css.
function btyAddElementClass() {
	let elements = document.querySelectorAll('.ft-block-item.ft-block-menu');

	if ( !elements.length ) {
		return;
	}

	let lastElement = elements[elements.length - 1];

	elements[0].classList.add('first', 'open');
	lastElement.classList.add('last');

	if (elements.length === 1) {
		elements[0].classList.remove('first', 'last');
		elements[0].classList.add('has-radius');
	}
}

// Scroll in animation logic.
function btyIntersection( elements, observer ) {
	const offscreen = 'scroll-trigger-offscreen';

	elements.forEach(
		( el, index ) => {
			if ( el.isIntersecting ) {
				const target = el.target;

				if ( target.classList.contains( offscreen ) ) {
					target.classList.remove( offscreen );

					target.setAttribute( 'style', '--animation-order: ' + index + ';' );
				}

				observer.unobserve( target );
			} else {
				el.target.classList.add( offscreen );
			}
		}
	);
}

// Scroll trigger.
function btyScrollAnimationTrigger( doc = document, designMode = false ) {
	const selectors = Array.from( doc.getElementsByClassName( 'scroll-trigger' ) );
	if ( ! selectors.length ) {
		return;
	}

	if ( designMode ) {
		selectors.forEach(
			( el ) => {
				el.classList.add( 'scroll-trigger-design-mode' );
			}
		);

		return;
	}

	const observer = new IntersectionObserver(
		btyIntersection,
		{
			rootMargin: '0px 0px -20px 0px',
		}
	);

	selectors.forEach( ( el ) => observer.observe( el ) );
}

class ArticleImageOverlay extends HTMLElement {
	constructor() {
		super();
		this.applyStylesAndReorder = this.applyStylesAndReorder.bind(this);
	}

	connectedCallback() {
		this.applyStylesAndReorder();

		window.addEventListener('resize', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:load', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:select', this.applyStylesAndReorder);
		document.addEventListener('shopify:block:select', this.applyStylesAndReorder);
	}

	applyStylesAndReorder() {
		let header          	= document.querySelector('.header.transparent-header'),
			breadcrumb          = document.querySelector('.breadcrumb-section'),
			breadcrumbScrolling = document.querySelector('.breadcrumb-section .scrolling'),
			articleImage        = document.querySelector('.blog-single-section .cover-image'),
			isArticleTemplate   = document.body.classList.contains('template-article');

		// If there's no article image, remove applied styles
		if (!articleImage) {
			document.body.classList.remove('has-image-cover');

			if (breadcrumb) {
				breadcrumb.classList.remove('transparent');
				breadcrumb.style.top = ''; // Reset to default
			}
			return;
		} else {
			document.body.classList.add('has-image-cover');
		}

		if (breadcrumb && header && articleImage && isArticleTemplate) {
			breadcrumb.classList.add('transparent');
		}
	}
}

// Define custom element with a proper name
customElements.define('article-image', ArticleImageOverlay);

class BreadcrumbOverlay extends HTMLElement {
	constructor() {
		super();
		this.applyStylesAndReorder = this.applyStylesAndReorder.bind(this);
	}

	connectedCallback() {
		this.applyStylesAndReorder();

		window.addEventListener('resize', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:load', this.applyStylesAndReorder);
		document.addEventListener('shopify:section:select', this.applyStylesAndReorder);
		document.addEventListener('shopify:block:select', this.applyStylesAndReorder);
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.applyStylesAndReorder);
		document.removeEventListener('shopify:section:load', this.applyStylesAndReorder);
		document.removeEventListener('shopify:section:select', this.applyStylesAndReorder);
		document.removeEventListener('shopify:block:select', this.applyStylesAndReorder);
	}

	applyStylesAndReorder() {
		let header            = document.querySelector('.header.transparent-header'),
			breadcrumbWrapper = document.querySelector('.breadcrumb-section .section-wrapper');

		if (!header || !breadcrumbWrapper) {
			return;
		}

		if (window.innerWidth > 1) {
			let headerHeight = header.offsetHeight;
			breadcrumbWrapper.style.paddingTop = headerHeight + 'px';
		} else {
			breadcrumbWrapper.style.paddingTop = null;
		}
	}
}

// Define custom element with a proper name
customElements.define('header-breadcrumb-overlay', BreadcrumbOverlay);

document.addEventListener('click', e => {
	const trigger = e.target.closest('.has-popup');
	if (!trigger) return;

	e.preventDefault();

	const sourcePopup = trigger.nextElementSibling;
	if (!sourcePopup || !sourcePopup.classList.contains('popup')) return;

	closeGlobalPopup();

	const overlay = document.createElement('div');
	overlay.className = 'global-popup-overlay';

	const popup = document.createElement('div');
	popup.className = 'global-popup';
	popup.innerHTML = sourcePopup.innerHTML;

	const closeBtn = document.createElement('button');
	closeBtn.className = 'global-popup-close';
	closeBtn.type = 'button';
	closeBtn.innerHTML = '×';

	closeBtn.addEventListener('click', closeGlobalPopup);
	overlay.addEventListener('click', ev => {
		if (ev.target === overlay) closeGlobalPopup();
	});

	popup.appendChild(closeBtn);
	overlay.appendChild(popup);
	document.body.appendChild(overlay);
	document.body.classList.add('popup-open');

	requestAnimationFrame(() => {
		document.dispatchEvent(new Event('scroll'));
		window.dispatchEvent(new Event('resize'));
	});
});

function closeGlobalPopup() {
	const overlay = document.querySelector('.global-popup-overlay');
	if (overlay) overlay.remove();
	document.body.classList.remove('popup-open');
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeGlobalPopup();
});

class BtyAccordionDetails extends HTMLElement {
	constructor() {
		super();
		this.handlePointerDown = this.handlePointerDown.bind(this);
		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);

		this._suppressBlurCloseUntil = 0; // guard for right-click & context menu
	}

	connectedCallback() {
		this.detailsElements = this.querySelectorAll("details");
			if (!this.detailsElements.length) return;

			this.detailsElements.forEach((details) => {
				details.addEventListener("toggle", () => {
				const sum = details.querySelector(":scope > summary");
				if (sum) sum.setAttribute("aria-expanded", details.hasAttribute("open") ? "true" : "false");
				this.closeOthers(details);
			});
			const sum = details.querySelector(":scope > summary");
			if (sum && !sum.hasAttribute("aria-expanded")) {
			sum.setAttribute("aria-expanded", details.hasAttribute("open") ? "true" : "false");
			}
		});

		// Close on primary-button click outside (NOT right/middle)
		document.addEventListener("pointerdown", this.handlePointerDown, true);

		// Esc to close deepest open
		document.addEventListener("keydown", this.handleKeydown, true);

		// Mark contextmenu (right-click) inside to avoid closing
		this.addEventListener("contextmenu", this.handleContextMenu, true);
	}

	disconnectedCallback() {
		document.removeEventListener("pointerdown", this.handlePointerDown, true);
		document.removeEventListener("keydown", this.handleKeydown, true);
		this.removeEventListener("contextmenu", this.handleContextMenu, true);
	}

	closeOthers(openedDetails) {
		this.detailsElements.forEach((details) => {
			if (details !== openedDetails) {
				details.removeAttribute("open");
				details.querySelector(":scope > summary")?.setAttribute("aria-expanded", "false");
			}
		});
	}

  	// Only close on primary-button click outside this component
	handlePointerDown(event) {
		if (event.button !== 0) return; // ignore right/middle clicks
		if (this.contains(event.target)) return;

		this.closeAll();
	}

	handleKeydown(event) {
		// ESC: đóng panel đang mở sâu nhất
		if (event.key === "Escape" || event.key === "Esc") {
			const openPanels = this.querySelectorAll("details[open]");
			// Nếu bên trong component có focus hoặc đang có panel mở
			if (!openPanels.length && !this.contains(document.activeElement)) return;

			const deepest = openPanels[openPanels.length - 1];
			if (deepest) {
				event.preventDefault();
				deepest.removeAttribute("open");
				const sum = deepest.querySelector(":scope > summary");
				sum?.setAttribute("aria-expanded", "false");
				sum?.focus();
				event.stopPropagation();
			}
			return;
		}

		// TAB: nếu đang có panel mở mà focus NHẢY RA KHỎI panel → đóng
		if (event.key === "Tab") {
			const openDetails = this.querySelector("details[open]");
			if (!openDetails) {
				return; // không có cái nào mở thì thôi
			}

			// Sau khi browser move focus xong mới kiểm tra
			requestAnimationFrame(() => {
				const root   = this.getRootNode?.() || document;
				const active = root.activeElement || document.activeElement;

				// Nếu focus mới vẫn nằm trong panel đang mở → giữ nguyên
				if (active && openDetails.contains(active)) {
					return;
				}

				// Nếu tới đây: focus đã ra ngoài panel (VD: sang menu khác / icon khác) → đóng
				this.closeAll();
			});
		}
	}

	handleContextMenu(e) {
		// If right-click happens inside the component, suppress blur-closing briefly
		if (this.contains(e.target)) {
			// suppress for a short window to ride out focus/blur churn from context menu
			this._suppressBlurCloseUntil = performance.now() + 400; // ms
		}
	}

	closeAll() {
		this.detailsElements.forEach((details) => {
			details.removeAttribute("open");
			details.querySelector(":scope > summary")?.setAttribute("aria-expanded", "false");
		});
  	}
}

customElements.define('bty-accordion-details', BtyAccordionDetails);

function btyHeaderSticky() {
	let header = document.querySelector( '.header.is-sticky' );
	if ( ! header ) {
		return;
	}

	let doc            = document.documentElement,
		top            = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
		regular        = header.dataset.colorScheme || '',
		transparent    = header.dataset.transparentScheme || '',
		hasTransparent = header.dataset.hasTransparent === 'true'
		threshold      = header.offsetHeight || 1,
		atTop          = top <= threshold;

	// Clean any prior color classes, then apply only what's allowed
	header.classList.remove(regular, transparent);
	if (hasTransparent && atTop) {
		header.classList.add(transparent);
	} else {
		header.classList.add(regular);
	}

	// Your existing solid state after scroll
	header.classList.toggle('solid-sticky', !atTop);
	header.classList.toggle('is-scrolled', !atTop);
}

class LookbookSync extends HTMLElement {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	connectedCallback() {
		this.addEventListener('click', this.onClick);
		this.bindEmbla();
	}

	disconnectedCallback() {
		this.removeEventListener('click', this.onClick);
	}

	bindEmbla() {
		const unitySlider = this.querySelector('unity-slider');
		if (!unitySlider || !unitySlider.thumbSlider) {
			requestAnimationFrame(() => this.bindEmbla());
			return;
		}

		this.thumbSlider = unitySlider.thumbSlider;
	}

	onClick(e) {
		const item = e.target.closest('.item');
		if (!item || !this.contains(item)) return;

		const index = Number(item.dataset.index);
		if (Number.isNaN(index)) return;

		const emblaIndex = index - 1;

		this.syncItems(index);
		this.syncThumbs(index);

		if (this.thumbSlider) {
			this.thumbSlider.scrollTo(emblaIndex, true);
		}
	}

	syncItems(index) {
		const items = this.querySelectorAll('.item');
		items.forEach((el) => {
			el.classList.toggle(
				'active',
				Number(el.dataset.index) === index
			);
		});
	}

	syncThumbs(index) {
		const thumbs = this.querySelectorAll('.unity-thumbs-slide');
		thumbs.forEach((thumb) => {
			const isMatch = Number(thumb.dataset.index) === index;
			thumb.classList.toggle('selected', isMatch);
			thumb.classList.toggle('unity-thumbs-slide-selected', isMatch);
		});
	}
}

customElements.define('lookbook-sync', LookbookSync);

class PopupHandler extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const dots      = this.querySelector( '.dot' );
		const itemInner = this.querySelector( '.item-inner' );
		const body      = document.body;

		if (!dots || !itemInner) return;

		dots.addEventListener('click', (e) => {
			e.stopPropagation();
			body.classList.add( 'popup-map' );
			itemInner.classList.add( 'show-inner' );
		});

		itemInner.addEventListener('click', (e) => {
			e.stopPropagation();
		});

		document.addEventListener('click', () => {
			body.classList.remove( 'popup-map' );
			itemInner.classList.remove( 'show-inner' );
		});
	}
}

customElements.define( 'popup-handler', PopupHandler );

function btyToggleNavMenu ( doc = document ) {
	let selectors = doc.querySelectorAll( '.header-navigation .menu-item .menu-toggle' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function ( el ) {
			let parent = el.parentNode;

			el.onclick = function() {
				parent.classList.toggle( 'open' );
			}

			document.addEventListener(
				'click',
				(event) => {
					if ( ! parent.contains( event.target ) ) {
						parent.classList.remove( 'open' );
					}
				}
			);
		}
	);
}
class btfMultimediaCollage extends HTMLElement {

	constructor() {
		super();
		this.observers = [];
	}

	connectedCallback() {
		this.init();

		this._onSectionLoad = () => {
			this.destroy();
			this.init();
		};

		document.addEventListener(
			'shopify:section:load',
			this._onSectionLoad
		);
	}

	disconnectedCallback() {
		document.removeEventListener(
			'shopify:section:load',
			this._onSectionLoad
		);

		this.destroy();
	}

	destroy() {
		this.observers.forEach(o => o.disconnect());
		this.observers = [];
	}

	init() {

		const items = this.querySelectorAll('.video-item');

		items.forEach(item => {

			const isAutoplay =
				item.dataset.autoplay === "true";

			const playBtn =
				item.querySelector('.play-video');

			const localVideo =
				item.querySelector('.js-local-video');

			const iframe =
				item.querySelector('.js-video-embed');

			const removeOverlay = () => {
				item.querySelector('.video-image-wrapper')?.remove();
				playBtn?.remove();
			};

			/* =====================
					CLICK PLAY (MP4)
			===================== */
			if (playBtn && localVideo) {

				playBtn.addEventListener('click', () => {

					const source =
						localVideo.querySelector('source');

					if (source?.dataset.src && !source.src) {
						source.src = source.dataset.src;
						localVideo.load();
					}

					localVideo.muted = false;
					localVideo.play().catch(()=>{});
					localVideo.style.display = 'block';

					removeOverlay();

				}, { once:true });
			}

			/* =====================
					AUTOPLAY
			===================== */
			if (isAutoplay) {

				const observer =
					new IntersectionObserver(entries => {

						entries.forEach(entry => {

							if (!entry.isIntersecting) return;

							/* MP4 */
							if (localVideo) {

								const source =
									localVideo.querySelector('source');

								if (source?.dataset.src && !source.src) {
									source.src = source.dataset.src;
									localVideo.load();
								}

								localVideo.muted = true;
								localVideo.play().catch(()=>{});

								removeOverlay();
							}

							/* Youtube / Vimeo */
							if (iframe &&
									iframe.dataset.src &&
									!iframe.src) {

								iframe.src = iframe.dataset.src;
								removeOverlay();
							}

						});

					}, { threshold: 0.4 });

				observer.observe(item);
				this.observers.push(observer);
			}

		});
	}
}

customElements.define(
	'btf-multimedia-collage',
	btfMultimediaCollage
);
class PredictiveSearch extends HTMLElement {
	constructor() {
		super();

		this.input                   = document.querySelector('.quick-search-form input[type="search"]');
		this.predictiveSearchResults = document.querySelector('#predictive-search');
		this.modalSearch             = document.querySelector('.quick-search-form .search-modal');
		this.searchButton            = document.querySelector('.quick-search-form .align-view-all');
		this.resetButton             = document.querySelector('.quick-search .reset-button');
		this.closeButton             = document.querySelector('.quick-search .close-search-button');
		this.container               = document.querySelector('.quick-search-container');

		if (!this.input || !this.predictiveSearchResults) {
			console.warn('[PredictiveSearch] Required DOM elements not found.');
			return;
		}

		this.input.addEventListener(
			'input',
			this.debounce((event) => {
				this.onChange(event);
				this.toggleResetButton();
			}, 300)
		);

		this.input.addEventListener('focus', (event) => this.onFocus(event));

		document.querySelector('.quick-search-form')?.addEventListener('reset', this.onFormReset.bind(this));

		if (this.resetButton) {
			this.resetButton.addEventListener('click', () => {
				this.input.value = '';
				this.input.dispatchEvent(new Event('input', { bubbles: true }));
				this.input.focus();
			});
		}

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => {
				document.documentElement.classList.remove('quick-search-open');
				document.querySelector('.quick-search')?.setAttribute('aria-hidden', 'true');
			});
		}

		window.addEventListener('resize', () => {
			if (this.hasAttribute('results')) {
				this.predictiveSearchResults.style.maxHeight = `${this.getResultsMaxHeight()}px`;
			}
		});

		document.addEventListener('mousedown', (event) => {
			const target = event.target;
			const isInside = target.closest('.quick-search-container');
			const isClose = target.closest('.close-search-button');

			if (!isInside && !isClose && this.hasAttribute('open')) {
				document.documentElement.classList.remove('quick-search-open');
				document.querySelector('.quick-search')?.setAttribute('aria-hidden', 'true');
				this.close();
			}
		});
	}

	getQuery() {
		return this.input.value.trim();
	}

	onFocus() {
		this.open();
	}

	onChange() {
		const searchTerm = this.getQuery();
		const defaultSearch = document.querySelector('.default-search');

		if (searchTerm.length > 0) {
			this.getSearchResults(searchTerm);
			if (defaultSearch) defaultSearch.classList.add('hidden');
		} else {
			this.close();
			if (defaultSearch) defaultSearch.classList.remove('hidden');
		}
	}

	getSearchResults(searchTerm) {
		fetch(`/search/suggest?q=${searchTerm}&resources[type]=query,product,collection,page,article&section_id=predictive-search`)
			.then((response) => {
				if (!response.ok) {
					this.close();
					throw new Error(response.status);
				}
				return response.text();
			})
			.then((text) => {
				const htmlDoc = new DOMParser().parseFromString(text, 'text/html');
				const section = htmlDoc.querySelector('#shopify-section-predictive-search');

				const resultsMarkup = section?.innerHTML;
				if (!resultsMarkup) return;

				this.predictiveSearchResults.innerHTML = '';
				this.predictiveSearchResults.insertAdjacentHTML('beforeend', resultsMarkup);

				// Re-initialize any dynamic JS components.
				btyAnimationImageLoad(this.predictiveSearchResults);
				btyQuickView(this.predictiveSearchResults);
				btyAddToCart(this.predictiveSearchResults);
				btyQuickAdd(this.predictiveSearchResults);
				btySwatch(this.predictiveSearchResults);
				btyHoverMediaVideo(this.predictiveSearchResults);

				this.open();
				document.dispatchEvent(new CustomEvent('product-card-updated'));
			})
			.catch((error) => {
				this.close();
				console.error('PredictiveSearch error:', error);
			});
	}

	getResultsMaxHeight() {
		const inputRect = this.input?.getBoundingClientRect();
		if (!inputRect) return 300;

		const offsetBottom = inputRect.bottom;
		let subtractHeight;

		if (window.innerWidth >= 768) {
			subtractHeight = 32 + 152;
		} else {
			subtractHeight = 32;
		}

		this.resultsMaxHeight = window.innerHeight - offsetBottom - subtractHeight;
		return this.resultsMaxHeight;
	}


	toggleResetButton() {
		const resetIsHidden = this.resetButton?.classList.contains('hidden');
		if (this.input.value.length > 0 && resetIsHidden) {
			this.searchButton?.classList.remove('hidden');
			this.resetButton?.classList.remove('hidden');
		} else if (this.input.value.length === 0 && !resetIsHidden) {
			this.searchButton?.classList.add('hidden');
			this.resetButton?.classList.add('hidden');
		}
	}

	shouldResetForm() {
		return !document.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		event.preventDefault();
		if (this.shouldResetForm()) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
			this.close();
		}
	}

	open() {
		this.setAttribute('results', true);
		this.setAttribute('open', true);
		this.input.setAttribute('aria-expanded', true);
		this.predictiveSearchResults.style.maxHeight = `${this.getResultsMaxHeight()}px`;
	}

	close() {
		this.removeAttribute('results');
		this.input.setAttribute('aria-expanded', false);
		this.resultsMaxHeight = false;
		this.predictiveSearchResults.removeAttribute('style');
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout(t);
			t = setTimeout(() => fn.apply(this, args), wait);
		};
	}
}

customElements.define('predictive-search', PredictiveSearch);

class MainSearch extends HTMLElement {
	constructor() {
		super();

		this.form = this.querySelector('.quick-search-form');
		this.input = this.querySelector('input[type="search"]');
		this.predictiveSearchResults = this.querySelector('#predictive-search');
		this.searchButton = this.querySelector('.align-view-all');
		this.resetButton = this.querySelector('.reset-button');
		this.closeButton = this.querySelector('.close-search-button');
		this.container = this;

		if (!this.input || !this.predictiveSearchResults) {
			console.warn('[MainSearch] Required DOM elements not found.');
			return;
		}

		this.initEvents();
	}

	initEvents() {
		this.input.addEventListener(
			'input',
			this.debounce((event) => {
				this.onChange(event);
				this.toggleResetButton();

				if (this.input.value.length > 0) {
					this.addBodyFocus();
				} else {
					this.removeBodyFocus();
				}
			}, 300)
		);

		this.input.addEventListener('focus', (event) => {
			this.addBodyFocus();
			this.onFocus(event);
		});

		this.form?.addEventListener('reset', this.onFormReset.bind(this));

		if (this.resetButton) {
			this.resetButton.addEventListener('click', () => {
				this.input.value = '';
				this.input.dispatchEvent(new Event('input', { bubbles: true }));
				this.input.focus();
			});
		}

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => {
				this.close();
			});
		}

		window.addEventListener('resize', () => {
			if (this.hasAttribute('results')) {
				this.predictiveSearchResults.style.maxHeight =
					`${this.getResultsMaxHeight()}px`;
			}
		});

		document.addEventListener('mousedown', (event) => {
			const target = event.target;
			const isInside = target.closest('main-search');
			const isClose = target.closest('.close-search-button');

			if (!isInside && !isClose && this.hasAttribute('open')) {
				this.close();
			}
		});
	}

	addBodyFocus() {
		document.body.classList.add('predictive-search--focus');
	}

	removeBodyFocus() {
		document.body.classList.remove('predictive-search--focus');
	}

	getQuery() {
		return this.input.value.trim();
	}

	onFocus() {
		this.open();
	}

	onChange() {
		const searchTerm = this.getQuery();
		const defaultSearch = this.querySelector('.default-search');

		if (searchTerm.length > 0) {
			this.getSearchResults(searchTerm);
			if (defaultSearch) defaultSearch.classList.add('hidden');
		} else {
			this.close();
			if (defaultSearch) defaultSearch.classList.remove('hidden');
		}
	}

	getSearchResults(searchTerm) {
		fetch(
			`/search/suggest?q=${searchTerm}&resources[type]=query,product,collection,page,article&section_id=predictive-search`
		)
			.then((response) => {
				if (!response.ok) {
					this.close();
					throw new Error(response.status);
				}
				return response.text();
			})
			.then((text) => {
				const htmlDoc = new DOMParser().parseFromString(text, 'text/html');
				const section = htmlDoc.querySelector(
					'#shopify-section-predictive-search'
				);

				const resultsMarkup = section?.innerHTML;
				if (!resultsMarkup) return;

				this.predictiveSearchResults.innerHTML = '';
				this.predictiveSearchResults.insertAdjacentHTML(
					'beforeend',
					resultsMarkup
				);

				// Re-initialize dynamic JS components.
				if (typeof btyAnimationImageLoad === 'function')
					btyAnimationImageLoad(this.predictiveSearchResults);

				if (typeof btyQuickView === 'function')
					btyQuickView(this.predictiveSearchResults);

				if (typeof btyAddToCart === 'function')
					btyAddToCart(this.predictiveSearchResults);

				if (typeof btyQuickAdd === 'function')
					btyQuickAdd(this.predictiveSearchResults);

				if (typeof btySwatch === 'function')
					btySwatch(this.predictiveSearchResults);

				if (typeof btyHoverMediaVideo === 'function')
					btyHoverMediaVideo(this.predictiveSearchResults);

				this.open();
				document.dispatchEvent(
					new CustomEvent('product-card-updated')
				);
			})
			.catch((error) => {
				this.close();
				console.error('MainSearch error:', error);
			});
	}

	getResultsMaxHeight() {
		const inputRect = this.input?.getBoundingClientRect();
		if (!inputRect) return 300;

		const offsetBottom = inputRect.bottom;

		let subtractHeight;

		if (window.innerWidth >= 768) {
			subtractHeight = 32 + 152;
		} else {
			subtractHeight = 32;
		}

		this.resultsMaxHeight =
			window.innerHeight - offsetBottom - subtractHeight;

		return this.resultsMaxHeight;
	}

	toggleResetButton() {
		const resetIsHidden =
			this.resetButton?.classList.contains('hidden');

		if (this.input.value.length > 0 && resetIsHidden) {
			this.searchButton?.classList.remove('hidden');
			this.resetButton?.classList.remove('hidden');
		} else if (
			this.input.value.length === 0 &&
			!resetIsHidden
		) {
			this.searchButton?.classList.add('hidden');
			this.resetButton?.classList.add('hidden');
		}
	}

	shouldResetForm() {
		return !this.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		event.preventDefault();
		if (this.shouldResetForm()) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
			this.close();
		}
	}

	open() {
		this.setAttribute('results', true);
		this.setAttribute('open', true);
		this.input.setAttribute('aria-expanded', true);
		this.predictiveSearchResults.style.maxHeight =
			`${this.getResultsMaxHeight()}px`;
	}

	close() {
		this.removeAttribute('results');
		this.removeAttribute('open');
		this.input.setAttribute('aria-expanded', false);
		this.resultsMaxHeight = false;
		this.predictiveSearchResults.removeAttribute('style');

		this.removeBodyFocus();
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout(t);
			t = setTimeout(() => fn.apply(this, args), wait);
		};
	}
}

customElements.define('main-search', MainSearch);
class ScrollingRow extends HTMLElement {
	constructor() {
		super();
		this.onScroll = this.onScroll.bind(this);
	}

	connectedCallback() {
		this.items = this.querySelectorAll('.full-services__item');
		if (!this.items.length) return;

		this.onScroll();
		window.addEventListener('scroll', this.onScroll, { passive: true });
	}

	disconnectedCallback() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll() {
		const viewportHeight = window.innerHeight;

		this.items.forEach((item, index) => {
			if (index === this.items.length - 1) return;

			const nextItem = this.items[index + 1];
			const nextRect = nextItem.getBoundingClientRect();
			const distanceToTop = nextRect.top;

			if (distanceToTop < viewportHeight && distanceToTop > 0) {
				const progress = 1 - distanceToTop / viewportHeight;
				const scale = 1 - progress * 0.05;
				const opacity = 1 - progress * 0.2;

				item.style.transform = `scale(${scale})`;
				item.style.opacity = opacity;
			} else if (distanceToTop >= viewportHeight) {
				item.style.transform = 'scale(1)';
				item.style.opacity = '1';
			}
		});
	}
}

customElements.define('scrolling-row', ScrollingRow);

class ScrollingHandler extends HTMLElement {
	constructor() {
		super();

		this.width     = 0;
		this.scrolling = this.querySelector( '.scrolling-inner' );

		window.addEventListener( 'DOMContentLoaded', this.handler.bind( this ) );
		window.addEventListener( 'resize', this.handler.bind( this ) );

		document.addEventListener( 'shopify:section:load', this.handler.bind( this ) );
		document.addEventListener( 'shopify:section:select', this.handler.bind( this ) );
		document.addEventListener( 'shopify:block:select', this.handler.bind( this ) );
		document.addEventListener( 'product-card-updated', this.handler.bind( this ) );
	}

	handler() {
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.scrolling.classList.remove( 'scrolling-animation' );
		let boxes = this.querySelectorAll( '.scrolling-dup' );
		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let localWidth = this.closest( '.scrolling-wrapper' ).offsetWidth,
			length     = localWidth / this.scrolling.offsetWidth,
			dup        = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.scrolling.cloneNode( true );
			dup.classList.add( 'scrolling-dup', 'scrolling-animation' );
			this.prepend( dup );
		}

		this.scrolling.classList.add( 'scrolling-animation' );
	}
}
customElements.define( 'scrolling-item', ScrollingHandler );
class SearchForm extends HTMLElement {
	constructor() {
		super();
		this.input        = this.querySelector('.quick-search-form input[type="search"]');
		this.searchButton = this.querySelector( '.quick-search-form .search-button' );
		this.resetButton  = this.querySelector('.quick-search-form .reset-button');

		if (this.input) {
			this.input.form.addEventListener( 'reset', this.onFormReset.bind( this ) );
			this.input.addEventListener(
				'input',
				this.debounce(
					(event) => {
						this.onChange(event);
					},
					300
				).bind( this )
			);
		}
	}

	toggleResetButton() {
		const resetIsHidden = this.resetButton.classList.contains( 'hidden' );
		if ( this.input.value.length > 0 && resetIsHidden ) {
			this.searchButton.classList.add( 'hidden' );
			this.resetButton.classList.remove( 'hidden' );
		} else if ( this.input.value.length === 0 && !resetIsHidden ) {
			this.searchButton.classList.remove( 'hidden' );
			this.resetButton.classList.add( 'hidden' );
		}
	}

	onChange() {
		this.toggleResetButton();
	}

	shouldResetForm() {
		return !document.querySelector('[aria-selected="true"] a');
	}

	onFormReset(event) {
		// Prevent default so the form reset doesn't set the value gotten from the url on page load
		event.preventDefault();
		// Don't reset if the user has selected an element on the predictive search dropdown
		if ( this.shouldResetForm() ) {
			this.input.value = '';
			this.input.focus();
			this.toggleResetButton();
		}
	}

	debounce(fn, wait) {
		let t;
		return (...args) => {
			clearTimeout( t );
			t = setTimeout( () => fn.apply( this, args ), wait );
		};
	}
}

customElements.define('search-form', SearchForm);

// Featured product slider.
function btyFeaturedProductSlider( doc = document ) {
	let selectors = doc.querySelectorAll( '.featured-products-wrapper .product-gallery[data-id="layout-1"]' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let swiper_thumbs,
				swiper_main,
				gallery_media  = el.querySelector( '.gallery-media' ),
				gallery_thumbs = el.querySelector( '.gallery-thumbs' );

			if ( ! gallery_media || ! gallery_thumbs ) {
				return;
			}

			swiper_thumbs = new Swiper(
				gallery_thumbs,
				{
					direction: 'horizontal',
					spaceBetween: 4,
					slidesPerView: 3,
					freeMode: false,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					watchOverflow: true,
					navigation: {
						nextEl: el.querySelector( '.swiper-button-next' ),
						prevEl: el.querySelector( '.swiper-button-prev' )
					},
					breakpoints: {
						992: {
							slidesPerView: 4
						}
					}
				}
			);

			swiper_main = new Swiper(
				gallery_media,
				{
					spaceBetween: 20,
					thumbs: {
						swiper: swiper_thumbs
					}
				}
			);
		}
	);
}
// class ParallaxBanner extends HTMLElement {
// 	constructor() {
// 		super();
// 		this._raf = null;
// 		this._onScroll = this._onScroll.bind(this);
// 	}

// 	connectedCallback() {
// 		this.speed = parseFloat(this.dataset.speed) || 0.25;
// 		this.scale = parseFloat(this.dataset.scale) || 1.5;

// 		this.image = this.querySelector('.banner-image:not(.hidden-desktop)');
// 		if (!this.image) return;

// 		this.img = this.image.querySelector('img');
// 		if (!this.img) return;

// 		this._prepareImage();
// 		this._onScroll();
// 		window.addEventListener('scroll', this._onScroll, { passive: true });
// 		window.addEventListener('resize', this._onScroll);
// 	}

// 	disconnectedCallback() {
// 		window.removeEventListener('scroll', this._onScroll);
// 		window.removeEventListener('resize', this._onScroll);
// 		cancelAnimationFrame(this._raf);
// 	}

// 	_prepareImage() {
// 		this.style.position = 'relative';
// 		this.style.overflow = 'hidden';

// 		this.image.style.willChange = 'transform';
// 		this.img.style.transform = `scale(${this.scale})`;
// 		this.img.style.transformOrigin = 'center';
// 	}

// 	_onScroll() {
// 		if (this._raf) return;

// 		this._raf = requestAnimationFrame(() => {
// 			this._raf = null;

// 			const rect = this.getBoundingClientRect();
// 			const vh = window.innerHeight;

// 			if (rect.bottom <= 0 || rect.top >= vh) return;

// 			const sectionCenter = rect.top + rect.height / 2;
// 			const distance = sectionCenter - vh / 2;

// 			const maxOffset = rect.height * (this.scale - 1) / 2;
// 			let offset = distance * this.speed;
// 			offset = Math.max(-maxOffset, Math.min(maxOffset, offset));

// 			this.image.style.transform = `translateY(${offset}px)`;
// 		});
// 	}
// }

// customElements.define('parallax-banner', ParallaxBanner);
class ImageSpotlightSection extends HTMLElement {
	connectedCallback() {
		this.items = Array.from(this.querySelectorAll('.item'));
		this.isDesignSelecting = false;

		this.items.forEach(item => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();

				const id = item.dataset.id;
				if (!id) return;

				const isActive = item.classList.contains('active');

				this.clearActive();

				if (!isActive) {
					item.classList.add('active');

					if (window.innerWidth <= 991) {
						const dot = this.querySelector(
							`.unity-dot[data-id="${id}"]`
						);
						if (dot) dot.click();
					}
				}
			});
		});

		this.addEventListener('click', (e) => {
			const dot = e.target.closest('.unity-dot');
			if (!dot) return;

			e.stopPropagation();

			const id = dot.dataset.id;
			if (!id) return;

			this.clearActive();

			const targetItem = this.querySelector(
				`.item[data-id="${id}"]`
			);
			if (targetItem) {
				targetItem.classList.add('active');
			}
		});

		this.handleOutsideClick = (e) => {
			if (this.isDesignSelecting) return;

			const clickedItem = e.target.closest('.item');

			if (!clickedItem || !this.contains(clickedItem)) {
				this.clearActive();
			}
		};

		document.addEventListener('click', this.handleOutsideClick);

		if (Shopify.designMode) {
			document.addEventListener('shopify:block:select', (e) => {
				const blockId = e.detail.blockId;

				const selectedItem = this.querySelector(
					`.item[data-block-id="${blockId}"]`
				);
				if (!selectedItem) return;

				this.isDesignSelecting = true;

				const id = selectedItem.dataset.id;

				this.clearActive();
				selectedItem.classList.add('active');

				setTimeout(() => {
					this.isDesignSelecting = false;
				}, 0);
			});

			document.addEventListener('shopify:block:deselect', () => {
				this.clearActive();
			});
		}
	}

	disconnectedCallback() {
		document.removeEventListener(
			'click',
			this.handleOutsideClick
		);
	}

	clearActive() {
		this.items.forEach(el => el.classList.remove('active'));
	}
}

customElements.define(
	'image-spotlight-section',
	ImageSpotlightSection
);

class LoadMore extends HTMLElement {
	constructor() {
		super();
		this.items          = [...document.querySelectorAll( '.location-grid-section .column-item' )];
		this.loadMoreButton = document.querySelector( '.location-grid-section .load-more' );
		this.currentIndex   = 0;
		this.itemsPerLoad   = this.getItemsPerRow();
		this.handleResize   = this.handleResize.bind( this );
	}

	connectedCallback() {
		this.init();
		window.addEventListener( 'resize', this.handleResize );
	}

	disconnectedCallback() {
		window.removeEventListener( 'resize', this.handleResize );
	}

	getItemsPerRow() {
		return parseInt( document.querySelector( '.location-grid-section .multicolumn-inner' ).getAttribute( 'data-row' ), 10 );
	}

	init() {
		this.itemsPerLoad = this.getItemsPerRow();
		let initialLoad   = this.itemsPerLoad * 2;

		this.items.forEach(( item, index ) => {
			item.style.display = index < initialLoad ? 'block' : 'none';
		});

		this.currentIndex = initialLoad;
		this.updateButtonState();
		this.loadMoreButton.addEventListener( 'click', () => this.loadItems() );
	}

	loadItems() {
		let endIndex = this.currentIndex + this.itemsPerLoad;

		this.items.slice( this.currentIndex, endIndex ).forEach(item => {
			item.style.display = 'block';
		});

		this.currentIndex = endIndex;
		this.updateButtonState();
	}

	updateButtonState() {
		this.loadMoreButton.style.display = (this.currentIndex >= this.items.length) ? 'none' : 'block';
	}

	handleResize() {
		this.itemsPerLoad = this.getItemsPerRow();
	}
}

customElements.define( 'load-more', LoadMore );
document.addEventListener( 'DOMContentLoaded', () => {
    const checkGrid = setInterval(() => {
        if ( document.querySelector( '.location-grid-section .multicolumn-inner' ) ) {
            clearInterval( checkGrid );
            new LoadMore();
        }
    }, 100);
});

// Marquee.
class MarqueeHandler extends HTMLElement {
	constructor() {
		super();

		this.width = 0;
		this.marquee = this.querySelector( '.marquee-wrapper' );
		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );
		this.querySelectorAll( '[loading]' ).forEach(
			( item ) => {
				item.removeAttribute( 'loading' );
			}
		);
	}
	resizeHandler(){
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.marquee.classList.remove( 'marquee-animation' );
		let boxes = this.querySelectorAll( '.marquee-dup' );

		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let local_width = this.closest( '.marquee-section' ).offsetWidth,
			length      = local_width / this.marquee.offsetWidth,
			dup         = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.marquee.cloneNode( true );
			dup.classList.add( 'marquee-dup', 'marquee-animation' );
			this.prepend( dup );
		}

		this.marquee.classList.add( 'marquee-animation' );
	}
}
customElements.define( 'marquee-section', MarqueeHandler );

// Marquee vertical.
class MarqueeHandlerHeight extends HTMLElement {
	constructor() {
		super();

		this.height  = 0;
		this.marquee = this.querySelector( '.two-marquee .marquee-wrapper' );

		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );

		this.querySelectorAll( '[loading]' ).forEach( ( item ) => {
			item.removeAttribute( 'loading' );
		});
	}

	resizeHandler() {
		if (this.height === window.innerHeight) {
			return;
		}

		this.height = window.innerHeight;
		this.marquee.classList.remove( 'marquee-animation' );

		let boxes = this.querySelectorAll( '.marquee-dup' );
		if (boxes.length) {
			boxes.forEach( ( e ) => e.remove() );
		}

		let marqueeSection = this.closest( '.two-columns' );

		if ( ! marqueeSection ) {
			return;
		}

		let local_height = marqueeSection.offsetHeight,
			length       = local_height / this.marquee.offsetHeight,
			dup          = false;

		length = length === Infinity?5 : Math.ceil( length );

		for (let i = 0; i < length; i++) {
			dup = this.marquee.cloneNode( true );
			dup.classList.add( 'marquee-dup' );
			this.append( dup );
		}

		setTimeout(() => {
			this.querySelectorAll( '.marquee-dup, .marquee-wrapper' ).forEach(( item ) => {
				item.classList.add( 'marquee-animation' );
			});
		}, 50);
	}
}

customElements.define( 'marquee-vertical', MarqueeHandlerHeight );
// Marquee.
class ScrollingTextHandler extends HTMLElement {
	constructor() {
		super();

		this.width = 0;
		this.scrolling = this.querySelector( '.scrolling-wrapper' );
		setTimeout( this.resizeHandler.bind( this ), 100 );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ), false );
		this.querySelectorAll( '[loading]' ).forEach(
			( item ) => {
				item.removeAttribute( 'loading' );
			}
		);
	}

	connectedCallback() {
		this.width   = 0;
		this.wrapper = this.parentNode;
		this.item    = this.querySelector( '.scrolling-animation' );

		window.addEventListener( 'DOMContentLoaded', this.resizeHandler.bind( this ) );
		window.addEventListener( 'resize', this.resizeHandler.bind( this ) );

		document.addEventListener( 'shopify:section:load', this.resizeHandler.bind( this ) );
		document.addEventListener( 'shopify:section:select', this.resizeHandler.bind( this ) );
		document.addEventListener( 'shopify:block:select', this.resizeHandler.bind( this ) );
	}

	resizeHandler(){
		if ( this.width == window.innerWidth ) {
			return;
		}

		this.width = window.innerWidth;
		this.scrolling.classList.remove( 'scrolling-animation' );
		let boxes = this.querySelectorAll( '.scrolling-dup' );

		if ( boxes.length ) {
			boxes.forEach(e => e.remove());
		}

		let local_width = this.offsetWidth,
			length      = local_width / this.scrolling.offsetWidth,
			dup         = false;

		length = length == Infinity ? 5 : length;

		for ( let i = 0; i < length; i++ ) {
			dup = this.scrolling.cloneNode( true );
			dup.classList.add( 'scrolling-dup', 'scrolling-animation' );
			this.prepend( dup );
		}

		this.scrolling.classList.add( 'scrolling-animation' );
	}
}
customElements.define( 'scrolling-promotion-section', ScrollingTextHandler );
function setupThumbProgress(section) {
	let $$ = (root, sel) => Array.from(root.querySelectorAll(sel));

	let getEmbla = (el) => {
		if (el.slider) return el.slider;
		let map = window.__unitySliderInstances;
		if (map instanceof Map) {
			let id = el.closest('[id^="shopify-section-"]')?.id;
			let inst = id ? map.get(id) : null;
			return inst?.slider || inst || null;
		}
		return null;
	};

	// Add <span class="progress-arc"> into each thumb if missing
	let ensureArcs = (thumbs) => {
		thumbs.forEach((btn) => {
			if (!btn.querySelector('.progress-arc')) {
				let arc = document.createElement('span');
				arc.className = 'progress-arc';
				arc.setAttribute('aria-hidden', 'true');
				btn.prepend(arc);
			}
		});
	};

	// Get the currently active thumb index based on .unity-thumbs-slide-selected
	let activeIdxFromDOM = (sliderEl, thumbs) => {
		let slide = sliderEl.querySelector('.unity-thumbs-slide-selected');
		if (!slide) return 0;
		let btn = slide.querySelector('.unity-thumb-number');
		let i = thumbs.indexOf(btn);
		return i >= 0 ? i : 0;
	};

	// Write progress to the thumb's arc
	let setArc = (btn, ratio) => {
		let arc = btn?.querySelector('.progress-arc');
		if (!arc) return;
		let r = Math.max(0, Math.min(1, ratio));
		arc.style.setProperty('--deg', (r * 360) + 'deg');
	};

	// Fallback manual advance if no embla: just move the .unity-thumbs-slide-selected class
	let fallbackAdvanceSelectedThumb = (sliderEl, thumbs) => {
		let cur = activeIdxFromDOM(sliderEl, thumbs);
		let next = cur + 1;
		if (next >= thumbs.length) next = 0;

		// remove current selected class from all slides
		sliderEl.querySelectorAll('.unity-thumbs-slide-selected').forEach((n) => {
			n.classList.remove('unity-thumbs-slide-selected');
		});

		// add selected class to the next thumb's wrapper
		let targetThumb = thumbs[next];
		if (!targetThumb) return;
		let wrap = targetThumb.closest('.unity-thumbs-slide');
		if (wrap) {
			wrap.classList.add('unity-thumbs-slide-selected');
		}
	};

	let root = section || document;

	// scope to slideshow-section only
	let sliders = root.querySelectorAll('.slideshow-section unity-slider');

	sliders.forEach((sliderEl) => {
		if (sliderEl.__thumbProgressInit) return;
		sliderEl.__thumbProgressInit = true;

		let embla    = getEmbla(sliderEl);
		let viewport = sliderEl.querySelector('.unity-slider-viewport');
		let wrap     = sliderEl.querySelector('.unity-thumbs-slider-container')
		             || sliderEl.querySelector('.thumb-slider')
		             || sliderEl;
		let thumbs   = $$(sliderEl, '.unity-thumb-number');

		// autoplay duration (ms)
		let autoplayMs = Number(sliderEl.options?._autoplay) || 5000;
		if (!thumbs.length || autoplayMs < 1) return;

		ensureArcs(thumbs);

		let raf    = 0;
		let t0     = null;
		let paused = false;

		let clearOthers = () => {
			let a = activeIdxFromDOM(sliderEl, thumbs);
			thumbs.forEach((b, i) => {
				if (i !== a) setArc(b, 0);
			});
		};

		let advanceSlide = () => {
			if (embla && typeof embla.scrollNext === 'function') {
				embla.scrollNext();
			} else {
				fallbackAdvanceSelectedThumb(sliderEl, thumbs);
			}
		};

		let step = (ts) => {
			if (t0 == null) t0 = ts;

			if (!paused) {
				let i = activeIdxFromDOM(sliderEl, thumbs);
				let progress = (ts - t0) / autoplayMs;

				setArc(thumbs[i], progress);

				if (progress >= 1) {
					advanceSlide();
				}
			}

			raf = requestAnimationFrame(step);
		};

		let restart = () => {
			cancelAnimationFrame(raf);
			t0 = null;
			paused = false;
			clearOthers();
			raf = requestAnimationFrame(step);
		};

		// Embla tells us slide actually changed
		if (embla && embla.on) {
			embla.on('select', () => {
				setTimeout(restart, 20);
			});
		}

		// MutationObserver fallback if theme updates .unity-thumbs-slide-selected manually
		if (wrap) {
			let mo = new MutationObserver(() => {
				setTimeout(restart, 0);
			});
			mo.observe(wrap, {
				subtree: true,
				childList: true,
				attributes: true,
				attributeFilter: ['class']
			});
			sliderEl.__thumbProgressObserver = mo;
		}

		// Manual thumb click should also restart timer
		sliderEl.addEventListener('click', (e) => {
			if (e.target.closest('.unity-thumb-number')) {
				setTimeout(restart, 0);
			}
		});

		// Start the loop
		clearOthers();
		raf = requestAnimationFrame(step);

		// Cleanup if section unloads
		sliderEl.__thumbProgressCleanup = () => {
			cancelAnimationFrame(raf);
			sliderEl.__thumbProgressObserver?.disconnect();
			[viewport, wrap].filter(Boolean).forEach((el) => {
				el.replaceWith(el);
			});
		};
	});
}

function btyShortDescription( doc = document ) {
	let button  = doc.querySelector( '.read-more-btn' );
	let short   = doc.querySelector( '.short-content' );
	let content = doc.querySelector( '.full-content' );

	if ( ! short || ! button || ! content ) {
		return;
	}

	if ( button ) {
		const buttonHandle = function() {
			if ( content.style.display === "none" ) {
				short.style.display   = "none";
				content.style.display = "block";
				button.textContent    = btyStrings.product.read_less;
			} else {
				content.style.display = "none";
				short.style.display   = "block";
				button.textContent    = btyStrings.product.read_more;
			}
		}

		button.addEventListener( 'click', buttonHandle );
	}
}

// Update Progress Bar Cart.
function btyUpdateProgressBarCart( cartTotal, itemCount  ) {
	const progressWrapper = document.getElementById( 'cart-progress-wrapper' );

	if ( ! progressWrapper ) {
		return;
	}

	const moneyFormat            = progressWrapper.dataset.moneyFormat;
	const preGoalMessageTemplate = progressWrapper.dataset.preGoalMessageTemplate;
	const postGoalMessage        = progressWrapper.dataset.postGoalMessage;

	const progressBar        = document.getElementById( 'cart-progress-bar' );
	const goalMessageElement = document.querySelector( '.goal-message' );

	let progressThreshold = Math.round(progressWrapper.dataset.threshold * (Shopify.currency.rate || 1));

	if ( ! moneyFormat || ! progressThreshold || ! preGoalMessageTemplate || ! postGoalMessage || ! progressBar || ! goalMessageElement ) {
		return;
	}

	if ( itemCount === 0 || cartTotal === 0 ) {
		if ( progressWrapper ) {
			progressWrapper.style.display = 'none';
		}
		if ( goalMessageElement ) {
			goalMessageElement.style.display = 'none';
		}
	} else {
		if ( progressWrapper ) {
			progressWrapper.style.display = 'block';
			progressWrapper.setAttribute( 'data-threshold-selected-currency', progressThreshold );
		}

		if ( progressBar ) {
			progressBar.style.display = 'block';

			let progressPercentage = null;

			// console.log( cartTotal );

			if ( cartTotal ) {
				progressPercentage = Math.min( ( cartTotal / progressThreshold ) * 100, 100 );
			} else {
				let sideCartPrice = document.querySelector( '.side-cart-footer .total-price' );
				if ( sideCartPrice ) {
					let total_price_str    = sideCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						progressPercentage = Math.min( ( total_price_number * 100 / progressThreshold ) * 100, 100 );
					} else {
						progressPercentage = Math.min( ( total_price_number / progressThreshold ) * 100, 100 );
					}
				}

				let mainCartPrice = document.querySelector( '.cart-page-section .cart-totals .totals-price' );
				if ( mainCartPrice ) {
					let total_price_str    = mainCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						progressPercentage = Math.min( ( total_price_number * 100 / progressThreshold ) * 100, 100 );
					} else {
						progressPercentage = Math.min( ( total_price_number / progressThreshold ) * 100, 100 );
					}
				}
			}

			progressBar.style.width = `${progressPercentage}%`;

			if ( progressPercentage >= 100 ) {
				progressWrapper.classList.add( 'full' );
			} else {
				progressWrapper.classList.remove( 'full' );
			}
		}

		if ( goalMessageElement ) {
			goalMessageElement.style.display = 'block';

			let remainingForGoal = null;

			if ( cartTotal ) {
				remainingForGoal = progressThreshold - cartTotal;
			} else {
				let sideCartPrice = document.querySelector( '.side-cart-footer .total-price' );
				if ( sideCartPrice ) {
					let total_price_str    = sideCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						remainingForGoal = progressThreshold - Math.min( total_price_number * 100 );
					} else {
						remainingForGoal = progressThreshold - total_price_number;
					}
				}

				let mainCartPrice = document.querySelector( '.cart-page-section .cart-totals .totals-price' );
				if ( mainCartPrice ) {
					let total_price_str    = mainCartPrice.textContent.replace( /\D/g,'' ),
						total_price_number = Number( total_price_str );

					if ( moneyFormat.includes( '{{amount_no_decimals}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_comma_separator}}' ) || moneyFormat.includes( '{{amount_no_decimals_with_space_separator}}' ) ) {
						remainingForGoal = progressThreshold - Math.min( total_price_number * 100 );
					} else {
						remainingForGoal = progressThreshold - total_price_number;
					}
				}
			}

			if ( remainingForGoal < 0 ) {
				remainingForGoal = 0;
			}

			let remainingAmount = remainingForGoal;

			let remainingAmountFormatted = btyFormatPrice(remainingAmount);

			const preGoalMessage = preGoalMessageTemplate.replace( '[remainingForGoalFormatted]', remainingAmountFormatted );

			goalMessageElement.innerHTML = remainingForGoal > 0 ? preGoalMessage : postGoalMessage;
		}
	}
}

// Minicart recommendations.
function btyMinicartRecommendations( doc = document ) {
	let selector = doc.querySelector( '.minicart-recommendations[data-source]' );
	if ( ! selector ) {
		return;
	}

	let url = selector.getAttribute( 'data-url' );

	if ( selector.innerHTML.trim() || ! url ) {
		return;
	}

	fetch( url )
		.then(
			function( r ) {
				if ( 200 !== r.status ) {
					console.log( 'Status Code: ' + r.status );
					throw r;
				}

				return r.text();
			}
		).then(
			function( res ) {
				selector.innerHTML = btyGetSectionHtml( res, '.minicart-recommendations[data-source]' );

				btyAddToCart( selector );
				btyQuickView( selector );
				btySwatch( selector );
				btyAnimationImageLoad( selector );
				btyHoverMediaVideo( selector );
				btyQuickAdd( selector );
				btyScrollAnimationTrigger( selector );

				// Fire when product card updated.
				document.dispatchEvent( new CustomEvent( 'product-card-updated' ) );
			}
		).catch(
			function( err ) {
				console.log( err );
			}
		);
}

// Side cart click outer popup.
function btySideCartPopupOuter( doc = document ) {
	let selector = doc.querySelector( '.side-cart-inner' ),
		overlay  = selector ? selector.querySelector( '.mini-cart-overlay' ) : false,
		popup    = selector ? selector.querySelectorAll( '.popup-toolDown' ) : false;

	if ( ! popup.length || ! overlay) {
		return;
	}

	popup.forEach(
		function( el ) {
			selector.addEventListener(
				'mousedown',
				function( e ) {
					if ( ! el.contains( e.target ) ) {
						if ( el.classList.contains( 'open' ) && overlay.classList.contains( 'open' ) ) {
							el.classList.remove( "open" );
							overlay.classList.remove( "open" );
						}
					}
				}
			);
		}
	);
}

// Cart checkbox agree to terms.
function btyAgreeToTerms( doc = document ) {
	let selector = document.querySelectorAll( '.agree-to-terms' );

	if ( ! selector.length ) {
		return;
	}

	selector.forEach(
		function( el ) {
			let agreeCheckbox = el.querySelector( '#agree' );
			let checkoutButton = el.parentNode.querySelector( 'button[name="checkout"]' );

			if ( ! agreeCheckbox || ! checkoutButton ) {
				return;
			}

			// Disable the checkout button initially
			checkoutButton.disabled = true;

			agreeCheckbox.addEventListener('change', function() {
				checkoutButton.disabled = !this.checked;
			});
		}
	);
}

// Side cart update product item when apply discount.
function btyUpdateDiscountSideCartItem( doc = document ) {
	let item = doc.querySelectorAll( '.side-cart .product-item[data-id]' );
	if ( ! item.length ) {
		return;
	}

	// Register dom html need an update when the response available.
	let modules = [
		{
			node: '.side-cart .cart-items',
			section: 'side-cart',
			selector: '.side-cart .cart-items'
		},
		{
			node: '.side-cart .sub-total',
			section: 'side-cart',
			selector: '.side-cart .sub-total'
		}
	];

	item.forEach(
		function( el ) {
			let id = el.getAttribute( 'data-id' );

			if ( ! id ) {
				return;
			}

			let discountApplyButton = el.closest( '.side-cart' ).querySelector( '.side-cart-footer [data-update-coupon]' );

			if ( ! discountApplyButton ) {
				return;
			}

			discountApplyButton.onclick = function() {
				let inputs  = el.querySelectorAll( '.quantity-input' );

				if ( inputs.length ) {
					inputs.forEach(
						function( input ) {
							let data;

							data = {
								id: id,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							setTimeout(() => {
								btyFetchCart( data, modules, el );
							}, "500");
						}
					);
				}
			}
		}
	);
}
class btyUnitySlider extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.slider             = null;
		this.thumbSlider        = null;
		this.options            = this.querySelector('[data-options]');
		this.thumbOptions       = this.querySelector('[data-thumbs-options]');
		this.viewport           = this.querySelector('.unity-slider-viewport');
		this.thumbsViewport     = this.querySelector('.unity-thumbs-slider-viewport');
		this.isVariantScrolling = false;

		this.init();

		if (!window.__unitySliderInstances) window.__unitySliderInstances = new Map();
		const sectionId = this.closest('[id^="shopify-section-"]')?.id;
		if (sectionId) window.__unitySliderInstances.set(sectionId, this);

		this._onSectionEvent = (event) => {
			const currentSectionId = this.closest('[id^="shopify-section-"]')?.id;
			const changedSectionId = `shopify-section-${event.detail.sectionId}`;

			if (currentSectionId !== changedSectionId) return;

			requestAnimationFrame(() => {
				this.cleanup();
				this.init();
			});
		};

		document.addEventListener('shopify:section:load', this._onSectionEvent);
		document.addEventListener('shopify:section:select', this._onSectionEvent);
		document.addEventListener('shopify:block:select', this._onSectionEvent);
		document.addEventListener('product-variant-updated', (e) => this.scrollToVariantImage(e));
	}

	cleanup() {
		try {
			if (this.slider?.destroy) this.slider.destroy();
			if (this.thumbSlider?.destroy) this.thumbSlider.destroy();
		} catch (err) {
			console.warn('[unity-slider] cleanup error:', err);
		}
		this.slider      = null;
		this.thumbSlider = null;
		this.classList.remove('initialized');
	}

	disconnectedCallback() {
		document.removeEventListener('shopify:section:load', this._onSectionEvent);
		document.removeEventListener('shopify:section:select', this._onSectionEvent);
		document.removeEventListener('shopify:block:select', this._onSectionEvent);
		this.cleanup();
	}

 	findControl(selector) {
		if (!selector) return null;

		let el = this.querySelector(selector);
		if (el) return el;

		const section = this.closest('[id^="shopify-section-"]');
		if (section) {
			el = section.querySelector(selector);
			if (el) return el;
		}

		const themeComponent = this.closest('.theme-component');
		if (themeComponent) {
			el = themeComponent.querySelector(selector);
			if (el) return el;
		}

		return null;
	}

	toggleArrows(bsSlider, prevBtn, nextBtn) {
		const arrowState = () => {
			bsSlider.canScrollPrev()
				? prevBtn.removeAttribute('disabled')
				: prevBtn.setAttribute('disabled', 'disabled');
			bsSlider.canScrollNext()
				? nextBtn.removeAttribute('disabled')
				: nextBtn.setAttribute('disabled', 'disabled');
		};
		bsSlider.on('select', arrowState).on('init', arrowState).on('reInit', arrowState);
		return () => {
			prevBtn.removeAttribute('disabled');
			nextBtn.removeAttribute('disabled');
		};
	}

	addArrows(bsSlider, prevBtn, nextBtn) {
		const scrollPrev = () => bsSlider.scrollPrev();
		const scrollNext = () => bsSlider.scrollNext();
		prevBtn.addEventListener('click', scrollPrev, false);
		nextBtn.addEventListener('click', scrollNext, false);
		const removeToggle = this.toggleArrows(bsSlider, prevBtn, nextBtn);
		return () => {
			removeToggle();
			prevBtn.removeEventListener('click', scrollPrev, false);
			nextBtn.removeEventListener('click', scrollNext, false);
		};
	}

	addDots(bsSlider, dotsNode) {
		let dotNodes = [];

		const addDotHandle = () => {
			dotsNode.innerHTML = bsSlider
				.scrollSnapList()
				.map((_, i) => `<button class="unity-dot" type="button" data-id="${i + 1}"></button>`)
				.join('');

			dotNodes = dotsNode.querySelectorAll( '.unity-dot' );

			if (!dotsNode.querySelector('.pagination-current')) {
				const span = document.createElement('span');
				span.className = 'pagination-current';
				span.setAttribute('aria-hidden', 'true');
				dotsNode.appendChild(span);
			}

			dotNodes.forEach((dotNode, index) => {
				dotNode.addEventListener('click', () => bsSlider.scrollTo(index), false);
			});
		};

		const toggleDot = () => {
			const previous = bsSlider.previousScrollSnap();
			const selected = bsSlider.selectedScrollSnap();

			if (dotNodes[previous]) {
				dotNodes[previous].classList.remove( 'selected' );
			}

			if (dotNodes[selected]) {
				dotNodes[selected].classList.add( 'selected' );
			}

			const paginationCurrent = dotsNode.querySelector( '.pagination-current' );
			if (paginationCurrent) {
				paginationCurrent.style.transform = `translateX(${selected * 100}%)`;
			}
		};

		bsSlider
			.on( 'init', addDotHandle )
			.on( 'reInit', addDotHandle )
			.on( 'init', toggleDot )
			.on( 'reInit', toggleDot )
			.on( 'select', toggleDot );

		return () => {
			dotsNode.innerHTML = '';
		};
	}

	init(event) {
		if (this.classList.contains('initialized')) {
			this.cleanup();
		}
		if (!this.options || !this.viewport) return;

		let options = JSON.parse(this.options.content.textContent),
			plugins = [EmblaCarouselClassNames()];

		let prevBtn  = this.findControl(options._prevBtn);
		let nextBtn  = this.findControl(options._nextBtn);
		let dotsNode = this.findControl(options._dotsNode);

		if (!prevBtn || !nextBtn) {
			const section = this.closest('[id^="shopify-section-"]');
			if (section) {
				if (!prevBtn) prevBtn = section.querySelector(options._prevBtn);
				if (!nextBtn) nextBtn = section.querySelector(options._nextBtn);
			}
		}

		if (options._autoplay) {
			plugins.push(
				EmblaCarouselAutoplay({
					delay: Number(options._autoplay || 5000),
					stopOnMouseEnter: true,
					stopOnInteraction: false,
				})
			);
		}

		if (options._autoheight) plugins.push(EmblaCarouselAutoHeight());
		if (options._fade) plugins.push(EmblaCarouselFade());

		this.slider = EmblaCarousel(this.viewport, options, plugins);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.slider && this.slider.reInit();
				setTimeout(() => {
					this.slider?.reInit();
				}, 100);
			});
		});

		this.enableClickToScroll(this.slider);

		if (dotsNode) {
			this.addDots( this.slider, dotsNode );
		}

		if (prevBtn && nextBtn) this.addArrows(this.slider, prevBtn, nextBtn);

		const handleMedia = (slide, isActive) => {

			// HTML5 VIDEO.
			slide.querySelectorAll('video').forEach((video) => {
				const source = video.querySelector('source');

				if (isActive) {
					// Lazy-load source.
					if (source && !source.src && source.dataset.src) {
						source.src = source.dataset.src;
						source.removeAttribute('data-src');
						video.load();
					}

					video.muted = true;
					video.play().catch(() => {});
				} else {
					video.pause();
				}
			});

			// YOUTUBE.
			const yt = slide.querySelector('iframe[src*="youtube"], iframe[src*="youtu.be"]');
			if (yt) {
				yt.contentWindow?.postMessage(
					isActive
						? '{"event":"command","func":"playVideo","args":""}'
						: '{"event":"command","func":"pauseVideo","args":""}',
					"*"
				);
			}

			// VIMEO.
			const vimeo = slide.querySelector('iframe[src*="vimeo"]');
			if (vimeo) {
				vimeo.contentWindow?.postMessage(
					{ method: isActive ? 'play' : 'pause' },
					vimeo.src
				);
			}

			// MODEL VIEWER.
			const model = slide.querySelector('model-viewer, model-viewer[data-shopify-model]');
			if (model) {
				if (isActive) model.play?.();
				else model.pause?.();
			}

			// GENERIC IFRAME RESET.
			const genericIframe = slide.querySelector(
				'iframe:not([src*="youtube"]):not([src*="youtu"]):not([src*="vimeo"])'
			);
			if (genericIframe && !isActive) {
				genericIframe.src = genericIframe.src;
			}
		};

		const handleVideoPlayback = () => {
			if (!this.slider) return;

			const slides = this.slider.slideNodes?.() || [];
			const selectedIndex = this.slider.selectedScrollSnap();

			slides.forEach((slide, i) => {
				handleMedia(slide, i === selectedIndex);
			});
		};

		this.slider.on('init', handleVideoPlayback);
		this.slider.on('select', handleVideoPlayback);

		if (this.thumbsViewport && !this.thumbsViewport.closest(' .slideshow-section' )) {

			const mainViewport = this.viewport;

			if (mainViewport) {
				mainViewport.setAttribute('tabindex', '-1');
				mainViewport.setAttribute('aria-hidden', 'true');

				mainViewport.querySelectorAll('a, button, input, video, iframe, [tabindex]')
				.forEach((el) => {
					el.setAttribute('tabindex', '-1');
					el.setAttribute('aria-hidden', 'true');
				});
			}
		}

		if (this.thumbOptions && this.thumbsViewport) {
			this.initThumbSlider();
			let lastWidth = window.innerWidth;
			window.addEventListener('resize', () => {
				const currentWidth = window.innerWidth;
				if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
					this.initThumbSlider();
				}
				lastWidth = currentWidth;
			});
		}

		this.classList.add('initialized');
	}

	enableClickToScroll(embla) {
		if (!embla) return;

		const slides = embla.slideNodes();

		slides.forEach((slide, index) => {
			slide.addEventListener('click', (e) => {
				if (e.target.closest('a, button, form, input, video')) return;

				const selected = embla.selectedScrollSnap();
				if (index === selected) return;

				embla.scrollTo(index);
			});
		});
	}

	initThumbSlider() {
		if (!this.thumbOptions || !this.thumbsViewport) return;

		const productGallery = this.closest('.product-gallery');
		const isLayout2 = productGallery?.getAttribute('data-id') === 'layout-2';

		if (this.thumbSlider?.destroy) this.thumbSlider.destroy();

		this.thumbSlider = EmblaCarousel(this.thumbsViewport, {
			axis: isLayout2 ? 'x' : window.innerWidth <= 991 ? 'x' : 'y',
			...JSON.parse(this.thumbOptions.content.textContent),
		});

		if (!this.thumbSlider?.slideNodes) return;

		const slidesThumbs = this.thumbSlider.slideNodes();
		const thumbPrev    = this.querySelector('.unity-thumb-prev');
		const thumbNext    = this.querySelector('.unity-thumb-next');

		if (slidesThumbs.length < 4 && thumbPrev && thumbNext) {
			thumbPrev.style.display = 'none';
			thumbNext.style.display = 'none';
		} else if (thumbPrev && thumbNext) {
			thumbPrev.style.display = '';
			thumbNext.style.display = '';
			this.addArrows(this.thumbSlider, thumbPrev, thumbNext);
		}

		const updateSelectedClass = () => {
			if (this.isVariantScrolling) return;
			const slides = this.slider?.slideNodes?.() || [];
			const thumbs = this.thumbSlider?.slideNodes?.() || [];
			if (!slides.length || !thumbs.length) return;

			const selectedIndex = this.slider.selectedScrollSnap?.() || 0;

			slides.forEach((s, i) => s.classList.toggle('selected', i === selectedIndex));
			thumbs.forEach((t, i) => {
				t.classList.toggle('selected', i === selectedIndex);
				t.classList.toggle('unity-thumbs-slide-selected', i === selectedIndex);
			});

			try {
				this.thumbSlider.scrollTo(selectedIndex);
			} catch {}
		};

		slidesThumbs.forEach((thumb, index) => {
			thumb.addEventListener('click', () => {
				this.slider?.scrollTo(index);
				setTimeout(updateSelectedClass, 100);
			});
		});

		this.slider?.on?.('select', updateSelectedClass);

		const fixThumbFocus = () => {
			const thumbs = this.thumbsViewport.querySelectorAll('.unity-thumbs-slide');
			thumbs.forEach((thumb, index) => {
				const button = thumb.querySelector('button');
				const isClone = thumb.hasAttribute('data-embla-clone');

				if (isClone) {
					thumb.setAttribute('tabindex', '-1');
					thumb.setAttribute('aria-hidden', 'true');
					if (button) {
						button.setAttribute('tabindex', '-1');
						button.setAttribute('aria-hidden', 'true');
					}
				} else {
					thumb.removeAttribute('aria-hidden');
					thumb.setAttribute('tabindex', '-1');
					if (button) {
						button.setAttribute('tabindex', '0');
						button.removeAttribute('aria-hidden');
						button.addEventListener('focus', () => {
							this.slider?.scrollTo(index);
							this.thumbSlider?.scrollTo(index);
						});
					}
				}
			});
		};

		this.thumbSlider.on('init', () => {
			updateSelectedClass();
			setTimeout(fixThumbFocus, 150);
		});
		this.thumbSlider.on('reInit', () => setTimeout(fixThumbFocus, 150));
	}

	scrollToVariantImage(e) {
		const selected = e?.detail?.selected;
		if (!selected?.featured_media?.id || !this.slider) return;

		const slides = this.slider.slideNodes?.() || [];
		const thumbs = this.thumbSlider?.slideNodes?.() || [];
		if (!slides.length) return;

		const mediaId = selected.featured_media.id;
		let index = slides.findIndex((s) => Number(s.dataset.mediaId) === mediaId);
		if (index < 0) index = 0;

		this.isVariantScrolling = true;

		try {
			this.slider.scrollTo(index, true);
			this.thumbSlider?.scrollTo(index, true);
		} catch (err) {
			console.warn('[unity-slider] scrollToVariantImage error:', err);
		}

		setTimeout(() => {
			slides.forEach((s, i) => s.classList.toggle('selected', i === index));
			thumbs.forEach((t, i) => t.classList.toggle('selected', i === index));
			this.isVariantScrolling = false;
		}, 600);
	}
}

customElements.define('unity-slider', btyUnitySlider);
class BtyTimeline extends HTMLElement {
	constructor() {
		super();
		this.eventsMinDistance = 60;
	}

	connectedCallback() {
		this.initTimeline();
		if ( window.Shopify && window.Shopify.designMode ) {
			document.addEventListener('shopify:block:select', ( event ) => {
				const blockId = event.detail?.blockId;

				if ( !this.timelineComponents || !this.timelineComponents.timelineEvents ) {
					setTimeout(() => this.selectEventByBlockId(blockId), 300);
				} else {
					this.selectEventByBlockId(blockId);
				}
			});
		}
	}

	initTimeline() {
		const timeline = this.querySelector( '.timeline-wrapper' );
		if ( ! timeline ) return;

		this.timelineComponents = {
			timelineWrapper: timeline.querySelector( '.events-wrapper' ),
			eventsWrapper: timeline.querySelector( '.events' ),
			fillingLine: timeline.querySelector( '.filling-line' ),
			timelineEvents: timeline.querySelectorAll( '.events a' ),
			timelineNavigation: timeline.querySelector( '.cd-timeline-navigation' ),
			eventsContent: timeline.querySelector( '.events-content' )
		};

		const originalEvents = Array.from(this.timelineComponents.timelineEvents);
		const parsedDates = this.parseDate(originalEvents);

		const zipped = originalEvents.map((el, i) => ({
			date: parsedDates[i],
			el
		})).filter(item => item.date instanceof Date && !isNaN(item.date));

		zipped.sort((a, b) => a.date - b.date);

		this.timelineComponents.timelineDates = zipped.map(item => item.date);
		this.timelineComponents.timelineEvents = zipped.map(item => item.el);

		const eventsContainer = this.timelineComponents.eventsWrapper;
		eventsContainer.innerHTML = '';
		this.timelineComponents.timelineEvents.forEach(el => eventsContainer.appendChild(el));

		this.timelineComponents.eventsMinLapse = this.minLapse(this.timelineComponents.timelineDates);

		this.setDatePosition();
		this.timelineTotWidth = this.setTimelineWidth();
		timeline.classList.add( 'loaded' );

		this.addNavigationHandlers();
		this.addEventSelectionHandler();
		this.addKeyboardNavigation();

		const selectedEvent = this.querySelector( '.events a.selected' ) || this.timelineComponents.timelineEvents[0];

		if (selectedEvent) this.updateFilling(selectedEvent);
	}

	addNavigationHandlers() {
		const { timelineNavigation } = this.timelineComponents;
		if ( !timelineNavigation ) return;

		const nextBtn = timelineNavigation.querySelector( '.next' );
		const prevBtn = timelineNavigation.querySelector( '.prev' );

		if ( nextBtn ) nextBtn.addEventListener('click', (event) => this.updateSlide(event, 'next'));
		if ( prevBtn ) prevBtn.addEventListener('click', (event) => this.updateSlide(event, 'prev'));
	}

	selectEventByBlockId(blockId) {
		const matchedLink = Array.from(this.timelineComponents.timelineEvents).find(
			link => link.dataset.blockId === blockId
		);
		if ( matchedLink ) matchedLink.click();
	}

	addEventSelectionHandler() {
		this.timelineComponents.eventsWrapper.addEventListener('click', (event) => {
			const target = event.target.closest('a');
			if (target) {
				event.preventDefault();

				this.timelineComponents.timelineEvents.forEach(ev => ev.classList.remove('selected'));
				target.classList.add('selected');
				this.updateFilling(target);

				const blockId   = target.dataset.blockId;
				const section   = target.closest('[id^="shopify-section-"]');
				const sectionId = section?.id;
				if (!sectionId) return;

				const unitySliderInstance = window.__unitySliderInstances?.get(sectionId);
				if (!unitySliderInstance || !unitySliderInstance.slider) return;

				const slides     = Array.from(section.querySelectorAll('.unity-slide'));
				const slideIndex = slides.findIndex(el => el.dataset.blockId === blockId);

				if (slideIndex !== -1) {
					unitySliderInstance.slider.scrollTo(slideIndex);
				}
			}
		});

		// 👇 Thêm đoạn này để đồng bộ ngược lại
		const section = this.closest('[id^="shopify-section-"]');
		const sectionId = section?.id;
		const unitySliderInstance = window.__unitySliderInstances?.get(sectionId);

		if (unitySliderInstance?.slider) {
			unitySliderInstance.slider.on('select', () => {
				const index = unitySliderInstance.slider.selectedScrollSnap();
				const slides = Array.from(section.querySelectorAll('.unity-slide'));
				const activeSlide = slides[index];
				if (!activeSlide) return;

				const blockId = activeSlide.dataset.blockId;
				const matchedLink = Array.from(this.timelineComponents.timelineEvents)
					.find(link => link.dataset.blockId === blockId);

				if (matchedLink) {
					this.timelineComponents.timelineEvents.forEach(ev => ev.classList.remove('selected'));
					matchedLink.classList.add('selected');
					this.updateFilling(matchedLink);
				}
			});
		}
	}


	addKeyboardNavigation() {
		document.addEventListener('keyup', (event) => {
			if (!this.elementInViewport(this)) return;
			if (event.key === 'ArrowLeft') this.showNewContent('prev');
			if (event.key === 'ArrowRight') this.showNewContent('next');
		});
	}

	updateSlide(event, direction) {
		event.preventDefault();
		const translateValue = this.getTranslateValue();
		const wrapperWidth = this.timelineComponents.timelineWrapper.clientWidth;
		const newValue = direction === 'next'
			? translateValue - (wrapperWidth - this.eventsMinDistance)
			: translateValue + (wrapperWidth - this.eventsMinDistance);
		this.translateTimeline(newValue, wrapperWidth - this.timelineTotWidth);
	}

	translateTimeline(value, totWidth) {
		const { eventsWrapper, timelineNavigation } = this.timelineComponents;
		value = Math.max(totWidth, Math.min(0, value));
		eventsWrapper.style.transform = `translateX(${value}px)`;

		timelineNavigation.querySelector('.prev').classList.toggle('disabled', value === 0);
		timelineNavigation.querySelector('.next').classList.toggle('disabled', value === totWidth);
	}

	updateFilling(selectedEvent) {
		const eventLeft = selectedEvent.offsetLeft + selectedEvent.offsetWidth / 2;
		const scaleValue = eventLeft / this.timelineTotWidth;
		this.timelineComponents.fillingLine.style.transform = `scaleX(${scaleValue})`;
	}

	setDatePosition() {
		this.timelineComponents.timelineEvents.forEach((event, i) => {
			const distance = this.daydiff(this.timelineComponents.timelineDates[0], this.timelineComponents.timelineDates[i]);
			event.style.left = (Math.round(distance / this.timelineComponents.eventsMinLapse) + 2) * this.eventsMinDistance + 'px';
		});
	}

	setTimelineWidth() {
		const wrapperWidth = this.timelineComponents.timelineWrapper.clientWidth;

		const timeSpan = this.daydiff(
			this.timelineComponents.timelineDates[0],
			this.timelineComponents.timelineDates.at(-1)
		);
		const estimatedWidth = (Math.round(timeSpan / this.timelineComponents.eventsMinLapse) + 4) * this.eventsMinDistance;

		const totalWidth = Math.max(estimatedWidth, wrapperWidth);

		this.timelineComponents.eventsWrapper.style.width = `${totalWidth}px`;
		this.updateFilling(this.timelineComponents.timelineEvents[0]);

		const { timelineNavigation } = this.timelineComponents;
		if (timelineNavigation) {
			const prev = timelineNavigation.querySelector('.prev');
			const next = timelineNavigation.querySelector('.next');

			const shouldDisable = totalWidth <= wrapperWidth;

			if (prev) prev.classList.toggle('disabled', shouldDisable);
			if (next) next.classList.toggle('disabled', shouldDisable);
		}
		return totalWidth;
	}

	getTranslateValue() {
		const transform = window.getComputedStyle(this.timelineComponents.eventsWrapper).transform;
		return transform.includes('(') ? parseFloat(transform.split('(')[1].split(')')[0].split(',')[4]) || 0 : 0;
	}

	parseDate(events) {
		const validDates = [];
		return Array.from(events).map(event => {
			const dateStr = event.dataset.date?.trim();
			if (!dateStr) return null;

			const parts = dateStr.split('/').map(Number);
			let date;
			if (parts.length === 1 && !isNaN(parts[0])) {
				date = new Date(parts[0], 0, 1);
			} else if (parts.length === 3 && parts.every(n => !isNaN(n))) {
				date = new Date(parts[2], parts[1] - 1, parts[0]);
			} else {
				return null;
			}

			validDates.push(date);
			return date;
		});
	}

	daydiff(first, second) {
		const msPerDay = 1000 * 60 * 60 * 24;
		return Math.round((second - first) / msPerDay);
	}

	minLapse(dates) {
		return Math.min(...dates.slice(1).map((date, i) => this.daydiff(dates[i], date)));
	}

	elementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.top < window.innerHeight && rect.bottom > 0;
	}
}

customElements.define( 'timeline-carousel', BtyTimeline );

/**
 * Theme js
 *
 * @package Dev
 */

'use strict';

// Set scrollbar width.
function btyScrollBar( doc = document ) {
	let domId = document.getElementById( 'dynamic-variables-theme-css' );
	if ( ! domId ) {
		return;
	}

	let scrollbarWidth = window.innerWidth - document.body.clientWidth,
		megaMenu       = doc.querySelector( '.header-nav .mega-menu-wrap' ),
		currentWidth   = window.innerWidth - document.documentElement.clientWidth;

	// Custom event.
	const scrollbarEvent = new Event( 'scrollbar-width' );

	const observer = new ResizeObserver(() => {
		const newWidth = window.innerWidth - document.documentElement.clientWidth;

		if ( newWidth !== currentWidth ) {
			scrollbarEvent.detail = {
				previous: currentWidth,
				current: newWidth
			};

			currentWidth = newWidth;

			window.dispatchEvent( scrollbarEvent );
		}
	});

	observer.observe( document.documentElement );

	// First load.
	const updateContainerContent = function() {
		const initialWidth = window.innerWidth - document.documentElement.clientWidth;
		domId.innerHTML = ':root{--scrollbar-width:' + initialWidth + 'px;--container-content:' + ( megaMenu ? megaMenu.offsetWidth : 0 ) + 'px}';
	}

	updateContainerContent();
	window.addEventListener( 'resize', updateContainerContent );

	// Start listening for changes.
	window.addEventListener(
		'scrollbar-width',
		function( e ) {
			let newMegaMenu = doc.querySelector( '.header-nav .mega-menu-wrap .container .mega-menu' );
			domId.innerHTML = ':root{--scrollbar-width:' + e.detail.current + 'px;--container-content:' + ( newMegaMenu ? newMegaMenu.offsetWidth : 0 ) + 'px}';
		}
	);

	return observer;
}

// Siblings.
function btySiblings( el, filter ) {
	// create an empty array.
	let siblings = [];

	// if no parent, return empty list.
	if ( ! el || ! el.parentNode ) {
		return siblings;
	}

	// first child of the parent node.
	let sibling = el.parentNode.firstElementChild;

	// loop through next siblings until `null`.
	do {
		// push sibling to array.
		if ( sibling != el && ( ! filter || filter( sibling ) ) ) {
			siblings.push( sibling );
		}
	} while ( sibling = sibling.nextElementSibling );

	return siblings;
}

// Slide up.
function btySlideUp( target, duration = 200 ) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height             = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow      = 'hidden';
	target.style.height        = 0;
	target.style.paddingTop    = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop     = 0;
	target.style.marginBottom  = 0;

	window.setTimeout(
		function() {
			target.style.display = 'none';
			target.style.removeProperty( 'height' );
			target.style.removeProperty( 'padding-top' );
			target.style.removeProperty( 'padding-bottom' );
			target.style.removeProperty( 'margin-top' );
			target.style.removeProperty( 'margin-bottom' );
			target.style.removeProperty( 'overflow' );
			target.style.removeProperty( 'transition-duration' );
			target.style.removeProperty( 'transition-property' );
		},
		duration
	);
}

// Slide down.
function btySlideDown( target, duration = 200 ) {
	target.style.removeProperty( 'display' );
	let display = window.getComputedStyle( target ).display;

	if ( 'none' === display ) {
		display = 'block';
	}

	target.style.display = display;

	let height = target.offsetHeight;

	target.style.overflow      = 'hidden';
	target.style.height        = 0;
	target.style.paddingTop    = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop     = 0;
	target.style.marginBottom  = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height             = height + 'px';

	target.style.removeProperty( 'padding-top' );
	target.style.removeProperty( 'padding-bottom' );
	target.style.removeProperty( 'margin-top' );
	target.style.removeProperty( 'margin-bottom' );

	window.setTimeout(
		function() {
			target.style.removeProperty( 'height' );
			target.style.removeProperty( 'overflow' );
			target.style.removeProperty( 'transition-duration' );
			target.style.removeProperty( 'transition-property' );
		},
		duration
	);
}

// Toggle dropdown.
function btyToggleDropdown( doc = document ) {
	let toggle = doc.querySelectorAll( '.toggle-dropdown .dropdown-summary' );
	if ( ! toggle.length ) {
		return;
	}

	toggle.forEach(
		function( el ) {
			let parent      = el.parentNode,
				title       = el.querySelector( '.summary-info' ),
				mobileTitle = el.parentNode.querySelector( '.dropdown-content-title' );

			const clickAnyWhere = function( e ) {
				let target = e.target;

				if ( target === el || target.classList.contains( 'content' ) || target.closest( '.dropdown-summary' ) ) {
					return;
				}

				if ( target.classList.contains( 'tab-head', 'active' ) ) {
					if ( title ) {
						title.innerText = target.innerText;
					}

					if ( mobileTitle ) {
						mobileTitle.innerText = target.innerText;
					}
				}

				parent.removeAttribute( 'open' );

				document.removeEventListener( 'click', clickAnyWhere );
			}

			el.onclick = function( e ) {
				document.addEventListener( 'click', clickAnyWhere );

				let aria = el.hasAttribute( 'aria-expanded' );

				if ( parent.hasAttribute( 'open' ) ) {
					parent.removeAttribute( 'open' );

					if ( aria ) {
						el.setAttribute( 'aria-expanded', 'false' );
					}
				} else {
					let sibling = parent.parentNode.querySelector( '.toggle-dropdown[open]' );
					if ( sibling ) {
						sibling.removeAttribute( 'open' );

						let sibAria = sibling.querySelector( '.dropdown-summary[aria-expanded]' );
						if ( sibAria ) {
							sibAria.setAttribute( 'aria-expanded', 'false' );
						}
					}

					parent.setAttribute( 'open', '' );

					if ( aria ) {
						el.setAttribute( 'aria-expanded', 'true' );
					}
				}
			}
		}
	);
}

// Update aria expanded for summary <details> tag only.
function btyToggleDetails( doc = document ) {
	let details = doc.querySelectorAll( 'details' );
	if ( ! details.length ) {
		return;
	}

	details.forEach(
		function( el ) {
			let summary = el.querySelector( 'summary' );
			if ( el.classList.contains( 'product-accordion' ) || el.classList.contains( 'collapsible-item' ) || el.classList.contains( 'order-note' ) || ! summary ) {
				return;
			}

			document.addEventListener(
				'click',
				function( e ) {
					let target = e.target;

					if ( target === el || el.contains( target ) || target.closest( '.toggle-dropdown' ) ) {
						return;
					}

					let tmpAria = doc.querySelector( '[open] [aria-expanded]' );
					if ( tmpAria ) {
						tmpAria.setAttribute( 'aria-expanded', 'false' );
					}
				}
			);

			el.onclick = function( e ) {
				let aria = summary.getAttribute( 'aria-expanded' );
				if ( ! aria ) {
					return;
				}

				if ( 'string' === typeof( el.getAttribute( 'open' ) ) ) {
					if ( aria ) {
						summary.setAttribute( 'aria-expanded', 'false' );
					}
				} else {
					let sibling = el.parentNode.querySelector( '[open]' );
					if ( sibling ) {
						let sibAria = sibling.querySelector( '[open] [aria-expanded]' );
						if ( sibAria ) {
							sibAria.setAttribute( 'aria-expanded', 'false' );
						}
					}

					if ( aria ) {
						summary.setAttribute( 'aria-expanded', 'true' );
					}
				}
			}
		}
	);
}

// Json parse.
function btyJsonParse( string ) {
	try {
		return JSON.parse( string.trim() );
	} catch ( e ) {
		return false;
	}
}

// Remove item in array.
function btyRemoveArrayItem( arr = [], item ) {
	if ( ! arr.length || ! item ) {
		return [];
	}

	return arr.filter(
		function( el ) {
			return el != item;
		}
	);
}

// Set delay time when user typing.
const btySearchDelay = function( timer = 0 ) {
	return function( callback, ms ) {
		clearTimeout( timer );
		timer = setTimeout( callback, ms );
	};
}();

// Get image src.
function btyGetImageSrc( img ) {
	// Create canvas.
	let canvas  = document.createElement( 'canvas' ),
		context = canvas.getContext( '2d' );

	// Set width and height.
	canvas.width  = img.width;
	canvas.height = img.height;

	// Draw the image.
	context.drawImage( img, 0, 0 );

	return canvas.toDataURL( 'image/jpeg', 1.0 );
}

// Google map.
function btyGoogleMap( doc = document ) {
	let selectors = doc.querySelectorAll( '.contact-map' );
	if ( ! selectors.length ) {
		return;
	}

	// Map style.
	let styledMapType = new google.maps.StyledMapType(
		[
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [{ "color": "#444444" }]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [{ "color": "#f2f2f2" }]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#052366" },
					{ "saturation": "-70" },
					{ "lightness": "85" }
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{ "visibility": "simplified" },
					{ "lightness": "-53" },
					{ "weight": "1.00" },
					{ "gamma": "0.98" }
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.icon",
				"stylers": [{ "visibility": "simplified" }]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 45 },
					{ "visibility": "on" }
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [{ "saturation": "-18" }]
			},
			{
				"featureType": "road",
				"elementType": "labels",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [{ "visibility": "on" }]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [{ "visibility": "off" }]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{ "color": "#57677a" },
					{ "visibility": "on" }
				]
			}
		],
		{ name: "Styled Map" }
	);

	// Init.
	selectors.forEach(
		function( el ) {
			let data    = el.querySelector( '[data-options]' ),
				options = data ? btyJsonParse( data.content.textContent ) : false;
			if ( ! options ) {
				return;
			}

			// Remove template.
			data.remove();

			let coordinates = options.coordinates.split( ',' );

			coordinates = { lat: Number( coordinates[0].trim()), lng: Number( coordinates[1].trim()) }

			let map = new google.maps.Map(
				el,
				{
					zoom: options.zoom,
					center: coordinates,
					disableDefaultUI: true,
					mapTypeControlOptions: {
						mapTypeIds: [ 'roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map' ]
					}
				}
			);

			map.mapTypes.set( 'styled_map', styledMapType );
			map.setMapTypeId( 'styled_map' );

			let marker = new google.maps.Marker(
				{
					position: coordinates,
					map: map
				}
			);
		}
	);
}

// Scrolling detect direction.
function btyScrollingDetect() {
	let body = document.body;

	if ( window.oldScroll > window.scrollY ) {
		body.classList.add( 'direction-up' );
		body.classList.remove( 'direction-down' );
	} else {
		body.classList.remove( 'direction-up' );
		body.classList.add( 'direction-down' );
	}

	// Reset state.
	window.oldScroll = window.scrollY;
}

// Set loading animation for image.
function btyImageLoad( image, image_src, image_key, ele_loading ) {
	let newImage = new Image();

	newImage.crossOrigin = 'anonymous';

	// Check local storage first.
	if ( sessionStorage.getItem( image_key ) ) {
		image.src = sessionStorage.getItem( image_key );
		return;
	}

	// Add loading animation.
	image.parentNode.classList.add( 'loading' );

	// Handle.
	newImage.onload = function() {
		ele_loading.classList.remove( 'loading' );
		let renderImage = btyGetImageSrc( newImage );

		// Set final image src.
		image.src = renderImage;

		// Save image to local storage.
		if ( image_key ) {
			sessionStorage.setItem( image_key, renderImage );
		}
	}

	newImage.onerror = function() {
		ele_loading.classList.remove( 'loading' );
	}

	// Set image src for 'newImage.onload' function handle.
	newImage.src = image_src;
}

// Get form data.
function btySerializeForm( form, type = 'string' ) {
	let obj      = {},
		formData = new FormData( form );

	for ( let key of formData.keys() ) {
		obj[ key ] = formData.get( key );
	}

	return 'string' === type ? JSON.stringify( obj ) : obj;
};

// Get price format.
function btyFormatPrice( money = 0, format = false ) {
	if ( 'string' === typeof( money ) ) {
		money = money.replace( '.', '' );
	}

	if ( false === format ) {
		format = btyGlobals.money_format;
	}

	let value            = '',
		placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

	function defaultOption( opt, def ) {
		return 'undefined' === typeof( opt ) ? def : opt;
	}

	function formatWithDelimiters( number, precision, thousands, decimal ) {
		precision = defaultOption( precision, 2 );
		thousands = defaultOption( thousands, ',' );
		decimal   = defaultOption( decimal, '.' );

		if ( isNaN( number ) || number == null ) {
			return 0;
		}

		number = ( number / 100.0 ).toFixed( precision );

		let parts   = number.split( '.' ),
			dollars = parts[0].replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands ),
			money   = parts[1] ? ( decimal + parts[1] ) : '';

		return dollars + money;
	}

	switch ( format.match( placeholderRegex )[1] ) {
		case 'amount':
			value = formatWithDelimiters( money, 2 );
			break;
		case 'amount_no_decimals':
			value = formatWithDelimiters( money, 0 );
			break;
		case 'amount_with_comma_separator':
			value = formatWithDelimiters( money, 2, '.', ',' );
			break;
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters( money, 0, '.', ',' );
			break;
		case 'amount_with_space_separator':
			value = formatWithDelimiters( money, 2, ' ', ',' );
			break;
		case 'amount_with_period_and_space_separator':
			value = formatWithDelimiters( money, 2, ' ', '.' );
			break;
		case 'amount_no_decimals_with_space_separator':
			value = formatWithDelimiters( money, 0, '.', '' );
			break;
		case 'amount_with_apostrophe_separator':
			value = formatWithDelimiters( money, 2, "'", '.' );
			break;
	}

	return format.replace( placeholderRegex, value );
}

// Render price html.
function btyPriceHtml( price, compare_price = false, unit_price = false, unit_price_measurement = {} ) {
	let html         = '',
		regularPrice = btyStrings.product.regular_price;

	if ( compare_price ) {
		const savedPercent = Math.round((1 - price / compare_price) * 100);

		html += '<span class="price">';
		html += '<span class="sr-only">' + btyStrings.product.sale_price + ': </span>';
		html += btyFormatPrice( price );
		html += '</span>';

		html += '<s class="regular-price">';
		html += '<span class="sr-only">' + regularPrice + ': </span>';
		html += btyFormatPrice( compare_price );
		html += '</s>';

		html += '<span class="product-sale-label">';
		html += '<span class="sr-only">' + btyStrings.product.on_sale + ': </span>';
		html += '<span class="sale-total">-' + savedPercent + '%</span>';
		html += '</span>';

	} else {
		html += '<span class="regular-price">';
		html += '<span class="sr-only">' + regularPrice + ': </span>';
		html += btyFormatPrice( price );
		html += '</span>';
	}

	if ( unit_price ) {
		html += '<span class="unit-price">';
		html += btyFormatPrice( unit_price ) + '/' + unit_price_measurement.quantity_unit;
		html += '</span>';
	}

	return html;
}

// Parse html dom.
function btyGetSectionHtml( text = '', selector = '.shopify-section', html = 'inner' ) {
	let el = new DOMParser().parseFromString( text, 'text/html' ).querySelector( selector );

	return el ? ( 'inner' === html ? el.innerHTML : el.outerHTML ) : '';
}

/**
 * Update html dom.
 *
 * @param  array sections The response sections.
 * @param  array modules  The modules need update html dom.
 */
function btyUpdateHtml( sections, modules ) {
	modules.forEach(
		function( mod ) {
			let query = document.querySelectorAll( mod.node );
			if ( ! query.length ) {
				return;
			}

			query.forEach(
				function( el ) {
					el.innerHTML = btyGetSectionHtml( sections[ mod.section ], mod.selector );
				}
			);

			// Re-init function.
			btyAddToCart();
			btySwatch();
			btyQuickAdd();
		}
	);
}

// Countdown time.
function btyCountdownTime( doc = document ) {
	let selectors = doc.querySelectorAll( '.countdown-time' );

	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let time        = el.getAttribute( 'data-time' ),
				dayField    = el.querySelector( '.days' ),
				hourField   = el.querySelector( '.hours' ),
				minuteField = el.querySelector( '.minutes' ),
				secondField = el.querySelector( '.seconds' );

			if ( ! dayField || ! hourField || ! minuteField || ! secondField ) {
				return;
			}

			// Check time first.
			if ( isNaN( Date.parse( time ) ) ) {
				return;
			}

			// Convert to milisecond.
			let interval,
				second = 1000,
				minute = second * 60,
				hour   = minute * 60,
				day    = hour * 24,
				today  = new Date();

			const countDownFn = function() {
				let countDown = new Date( time ).getTime(),
					now       = new Date().getTime(),
					distance  = countDown - now,
					dayInner  = Math.floor( distance / day );

				if ( distance < 0 ) {
					el.parentNode.remove();

					clearInterval( init );

					return;
				}

				if ( 0 == dayInner && dayField ) {
					dayField.parentNode.remove();
				} else {
					dayField.innerText = dayInner;
				}

				hourField.innerText   = ( '0' + Math.floor( ( distance % day ) / hour ) ).slice( -2 );
				minuteField.innerText = ( '0' + Math.floor( ( distance % hour ) / minute ) ).slice( -2 );
				secondField.innerText = ( '0' + Math.floor( ( distance % minute ) / second ) ).slice( -2 );

				// Show countdown.
				el.parentNode.classList.remove( 'hidden' );
			}

			let init = setInterval( countDownFn, 0 );
		}
	);
}

/**
 * Close theme popup
 *
 * @param  string class_name  Class name remove form <html>
 * @return node   parent_node Parent node to implement click overlay.
 */
function btyClosePopup(class_name, parent_node, overlay = true) {
	if (!class_name) return;

	let doc = document.documentElement,
		button = parent_node ? parent_node.querySelector('.close-button, .side-cart-close') : false;

	// CLICK OVERLAY.
	if (parent_node && overlay) {
		const parentHandle = function (e) {
			if (e.target != parent_node) return;

			doc.classList.remove(class_name);

			parent_node._lastFocused?.focus();

			parent_node.removeEventListener('click', parentHandle);
			document.dispatchEvent(new CustomEvent('theme-popup-close'));
		};

		parent_node.addEventListener('click', parentHandle);
	}

	// ESC KEY.
	doc.addEventListener('keyup', function (e) {
		if (e.keyCode !== 27) return;

		doc.classList.remove(class_name);

		parent_node?._lastFocused?.focus();

		document.dispatchEvent(new CustomEvent('theme-popup-close'));
	});

	// CLOSE BUTTON.
	if (button) {
		const buttonHandle = function () {
			doc.classList.remove(class_name);

			parent_node?._lastFocused?.focus();

			button.removeEventListener('click', buttonHandle);
			document.dispatchEvent(new CustomEvent('theme-popup-close'));
		};

		button.addEventListener('click', buttonHandle);
	}
}

// Quick search.
function btyQuickSearch() {
	const actions          = document.querySelectorAll( '.action-search' );
	const dialog           = document.querySelector( '.quick-search' );
	const input            = document.querySelector( '.quick-search .search-input' );
	const button           = document.querySelector( '.quick-search .search-button' );
	const closeBtn         = document.querySelector( '.quick-search .close-search-button' );
	const suggestions      = document.querySelector( '.quick-search .suggestions-product' );
	const predictiveResult = document.querySelector( '#predictive-search' );

	if (!actions.length || !input || !button || !predictiveResult ) {
		return;
	}

	// dialog semantics (safe to repeat).
	dialog.setAttribute('role','dialog');
	dialog.setAttribute('aria-modal','true');
	dialog.setAttribute('inert','');


	const FOCUSABLE = 'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

	if (Shopify.designMode && document.documentElement.classList.contains( 'quick-search-open' )) {
		btyClosePopup( 'quick-search-open', dialog );
	}

	actions.forEach((el) => {
		el.onclick = function (e) {
			e.preventDefault();
			document.documentElement.classList.add( 'quick-search-open' );
			btyClosePopup( 'quick-search-open', dialog );

			// remember opener to restore focus on close.
			dialog._returnFocus = el;

			dialog.removeAttribute('inert');
			input.focus();
			input.removeAttribute( 'tabindex' );

			// one-time focus trap + Esc to close.
			if (!dialog._trap) {
				dialog._trap = true;
				dialog.addEventListener('keydown', (ev) => {
					if (ev.key === 'Escape') {
						ev.preventDefault();
						closeBtn?.click();
						return;
					}
					if (ev.key !== 'Tab') return;
					const els = dialog.querySelectorAll(FOCUSABLE);
					if (!els.length) return;
					const first = els[0], last = els[els.length - 1];
					if (ev.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
						ev.preventDefault(); last.focus();
					} else if (!ev.shiftKey && document.activeElement === last) {
						ev.preventDefault(); first.focus();
					}
				});
			}
		};
	});

	if (closeBtn) {
		closeBtn.addEventListener('click', function () {
			document.documentElement.classList.remove( 'quick-search-open' );
			dialog.setAttribute('inert','');
			(dialog._returnFocus || actions[0])?.focus();
		});
	}

	input.addEventListener('input', function () {
		const value = input.value.trim();
		if (!value) {
			predictiveResult.innerHTML = '';
			suggestions?.classList.remove( 'sr-only' );
			return;
		}

		dialog.classList.add( 'searching' );
		suggestions?.classList.add( 'sr-only' );
		predictiveResult.innerHTML = btyGlobals.card_placeholder;

		const url = `${btyGlobals.search_url}?section_id=predictive-search&type=product&q=${encodeURIComponent(value)}`;

		fetch(url)
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.text();
			})
			.then((html) => {
				const temp = document.createElement('div');
				temp.innerHTML = html;

				const section = temp.querySelector( '#shopify-section-predictive-search' );
				if (!section) return;

				predictiveResult.innerHTML = section.innerHTML;

				if (predictiveResult.innerHTML.trim() === '') {
					predictiveResult.classList.add( 'hidden' );
				} else {
					predictiveResult.classList.remove( 'hidden' );
				}

				btyAnimationImageLoad(predictiveResult);
				btyQuickView( predictiveResult );
				btyAddToCart( predictiveResult );
				btyQuickAdd( predictiveResult );
				btySwatch( predictiveResult );
				btyHoverMediaVideo( predictiveResult );
			})
			.catch(console.error)
			.finally(() => {
				dialog.classList.remove( 'searching' );
			});
	});
}

// Quantity button.
function btyQuantityButton( doc = document ) {
	let buttons = doc.querySelectorAll( '.quantity-button' );
	if ( ! buttons.length ) {
		return;
	}

	buttons.forEach(
		function( el ) {
			let eventChange = new Event( 'change', { bubbles: true } );

			el.onclick = function() {
				let input = el.parentNode.querySelector( '.quantity-input' );
				if ( ! input ) {
					return;
				}

				let current = Number( input.value || 0 ),
					step    = Number( input.getAttribute( 'step' ) || 1 ),
					min     = Number( input.getAttribute( 'min' ) || 0 ),
					max     = Number( input.getAttribute( 'max' ) ),
					name    = el.name;

				if ( 'minus' === name && current >= step ) { // Minus button.
					if ( current <= min || ( current - step ) < min ) {
						return;
					}

					input.value = current - step;
				} else if ( 'plus' === name ) { // Plus button.
					if ( max && ( current >= max || ( current + step ) > max ) ) {
						return;
					}

					input.value = current + step;
				}

				// Trigger event.
				input.dispatchEvent( eventChange );
			}
		}
	);
}

// Main menu.
function btyNavMenu( doc = document, event = false ) {
	let toggles = doc.querySelectorAll( '.toggle-panel-button' ),
		panel  = doc.querySelector( '.site-panel' );

	if ( ! toggles.length || ! panel ) {
		return;
	}

	// Close site panel when settings update.
	if ( event && event.detail.load ) {
		btyClosePopup( 'site-panel-open', panel );
	}

	toggles.forEach(
		function( el ) {
			// Toggle site panel.
			el.onclick = function() {
				document.documentElement.classList.add( 'site-panel-open' );

				btyClosePopup( 'site-panel-open', panel );
			}
		})

	// Toggle sub menu.
	let links = doc.querySelectorAll( '.site-panel .has-children' );
	if ( ! links.length ) {
		return;
	}

	links.forEach(
		function( el ) {
			el.onclick = function( e ) {
				if ( e.target.classList.contains( 'menu-text' ) && !el.contains(e.target) ) {
					return;
				}

				e.preventDefault();

				let menu    = el.closest( '.toggle-navigation' ),
					parent  = el.parentNode,
					subMenu = parent.querySelector( '.sub-menu' ) || parent.querySelector( '.sub-mega-menu' );
				if ( ! subMenu ) {
					return;
				}

				parent.classList.add( 'active' );

				// Update current sub menu.
				let level = Number( subMenu.getAttribute( 'data-level' ) || 1 ),
					back  = parent.querySelector( '.back' );
				if ( level ) {
					menu.setAttribute( 'data-level', level );
				}

				// Go back parent level.
				if ( back ) {
					back.onclick = function() {
						parent.classList.remove( 'active' );
						menu.setAttribute( 'data-level', level - 1 );
					}
				}
			}
		}
	);
}

// Split Slider.
function btySplitSlider( doc = document ) {
	let selectors = doc.querySelectorAll( '.split-slider' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let imageCarouselOption, imageCarousel, textCarouselOption, textCarousel,
				imageEl = el.querySelector( '.image-content .swiper' ),
				textEl  = el.querySelector( '.text-content .swiper' ),
				mobile  = window.matchMedia( '(max-width: 991px)' ).matches || window.matchMedia( '(hover: none)' ).matches

			imageCarouselOption = {
				speed: 600,
				spaceBetween: 40,
				scrollbar: {
					el: ".split-slider .swiper-scrollbar",
					draggable: true
				},
				breakpoints: {
					240: {
						slidesPerView: 1
					},
					992: {
						slidesPerView: 1.25
					}
				}
			}

			// Image card.
			if ( imageEl && ! imageEl.classList.contains( 'swiper-initialized' ) ) {
				imageCarousel = new Swiper( imageEl, imageCarouselOption );
			}

			textCarouselOption = {
				speed: 600,
				spaceBetween: 40,
				scrollbar: {
					el: ".split-slider .swiper-scrollbar",
					draggable: true
				},
				breakpoints: {
					240: {
						slidesPerView: 1
					},
					992: {
						slidesPerView: 1
					}
				}
			}

			// Layout.
			if ( el.classList.contains( 'content-layout' ) ) {
				textCarouselOption.centeredSlides = true;
				textCarouselOption.spaceBetween   = 200;

				if ( mobile ) {
					textCarouselOption.autoHeight = true;
				}
			} else {
				textCarouselOption.autoHeight  = true;

				textCarouselOption.navigation = {
					nextEl: el.querySelector( '.text-content .swiper-button-next' ),
					prevEl: el.querySelector( '.text-content .swiper-button-prev' )
				}
			}

			// Text content.
			if ( textEl && ! textEl.classList.contains( 'swiper-initialized' ) ) {
				textCarousel = new Swiper( textEl, textCarouselOption );
			}

			// Sync controls.
			if ( textCarousel && imageCarousel ) {
				textCarousel.controller.control  = imageCarousel;
				imageCarousel.controller.control = textCarousel;
			}
		}
	);
}

// Account popup.
function btyAccountPopup( doc = document ) {
	let selectors = doc.querySelectorAll( '.action-account' ),
		customer  = document.querySelector( '.customer-wraper' );
	if ( ! selectors.length || ! customer || document.body.classList.contains( 'has-account-details' ) ) {
		return;
	}

	// Get display style.
	const getStyles = function( el, property = 'display' ) {
		let obj = window.getComputedStyle( el, null );

		return obj.getPropertyValue( property );
	}

	// Get first input field.
	const getInput = function( parent ) {
		return parent.querySelector( '.field input' );
	}

	// Toggle popup.
	selectors.forEach(
		function( el ) {
			el.onclick = function( e ) {
				if ( el.classList.contains( 'new-customer-accounts' ) ) {
					return;
				}

				e.preventDefault();

				let login    = customer.querySelector( '.login' ),
					loginBox = login ? login.querySelector( '#login-container' ) : false,
					recover  = login ? login.querySelector( '#recover-container' ) : false,
					register = customer.querySelector( '.register' );

				if ( ! recover || ! loginBox || ! register ) {
					return;
				}

				document.documentElement.classList.add( 'customer-open' );

				// Focus input field on desktop.
				if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
					if ( getStyles( register ) === 'block' ) {
						getInput( register ).focus();
					} else if ( getStyles( recover ) === 'block' ) {
						getInput( recover ).focus();
					} else if ( getStyles( loginBox ) === 'block' ) {
						getInput( loginBox ).focus();
					}
				}

				// Close popup.
				btyClosePopup( 'customer-open', customer );

				customer.onclick = function( e ) {
					let target = e.target;

					// Create account.
					if ( target.classList.contains( 'create-account' ) ) {
						e.preventDefault();

						login.classList.add( 'hidden' );
						register.classList.remove( 'hidden' );

						getInput( register ).focus();
					}

					// Sign-in.
					if ( target.classList.contains( 'sign-in' ) ) {
						e.preventDefault();

						login.classList.remove( 'hidden' );
						register.classList.add( 'hidden' );

						getInput( loginBox ).focus();
					}

					// Fogot password.
					if ( target.classList.contains( 'forgot-password' ) ) {
						setTimeout(
							function() {
								getInput( recover ).focus();
							}
						);
					}

					// Cancel login.
					if ( target.classList.contains( 'login-cancel' ) ) {
						setTimeout(
							function() {
								getInput( loginBox ).focus();
							}
						);
					}
				}
			}
		}
	);
}

// Update cart item count.
function btyCartItemCount( items = 1 ) {
	let count = document.querySelectorAll( '.cart-item-count' ),
		label = document.querySelectorAll( '.item-count-label' );
	if ( ! count.length ) {
		return;
	}

	items = Number( items );

	count.forEach(
		function( el ) {
			el.innerHTML = items;

			if ( items < 1 ) {
				el.classList.add( 'hidden' );
			} else {
				el.classList.remove( 'hidden' );
			}
		}
	);

	label.forEach(
		function( el ) {
			if (typeof window.cartText !== 'undefined') {
				el.textContent = items === 1 ? window.cartText.one : window.cartText.other;
			} else {
				el.textContent = items === 1 ? 'item' : 'items';
			}
		}
	);
}

// Find if two arrays contain any common item in Javascript.
function btyDiffObject( haystack, arr ) {
	return arr.every(
		function( v ) {
			return haystack.includes( v );
		}
	);
};

// Selected variant image.
function btySelectedVariant( variant, data, slider ) {
	for ( let opt in data ) {
		if ( btyDiffObject( Object.values( variant ), data[opt].options ) ) {
			if ( 'object' === typeof( slider ) && Object.keys( slider ).length && data[opt].featured_media ) {
				slider.slideTo( ( data[opt].featured_media.position - 1 ), 500, false );
			}

			return data[opt];
		}
	}
}

// Fetch cart data.
function btyFetchCart( obj, modules, item ) {
	let body = JSON.stringify( obj );

	fetch( btyGlobals.cart_change_url, {...btyFetchConfig(), ...{ body } } )
		.then(
			function( r ) {
				return r.json();
			}
		).then(
			function( res ) {
				let warning = item.querySelectorAll( '.product-warning' );
				if ( warning.length ) {
					warning.forEach(
						function( el ) {
							el.innerHTML = '';
						}
					);
				}

				if ( res.errors && warning.length ) {
					warning.forEach(
						function( el ) {
							el.innerHTML = btyGlobals.svg_warning + res.errors;
						}
					);

					let qtyInput = item.querySelectorAll( '.quantity-input' );
					if ( qtyInput.length ) {
						qtyInput.forEach(
							function( el ) {
								el.value = el.getAttribute( 'data-qty' );
							}
						);
					}

					return;
				}

				// Update cart item count first.
				btyCartItemCount( res.item_count );

				// Cart empty.
				if ( ! res.items.length ) {
					let cartTable       = document.querySelector( '.cart-page-section .container' ),
						cartSubtotal    = cartTable ? cartTable.querySelector( '.cart-footer' ) : false,
						sideCartContent = document.querySelector( '.side-cart-content' ),
						sideCartFooter  = document.querySelector( '.side-cart-footer' );

					// Update cart table section.
					if ( cartTable ) {
						cartTable.innerHTML = btyGetSectionHtml( res.sections['main-cart'], '.container' );
					}

					// Remove cart subtotal section.
					if ( cartSubtotal ) {
						cartSubtotal.remove();
					}

					// Update side cart content.
					if ( sideCartContent ) {
						sideCartContent.innerHTML = btyGetSectionHtml( res.sections['side-cart'], '.side-cart-content' );
					}

					// Remove side cart footer.
					if ( sideCartFooter ) {
						sideCartFooter.remove();
					}

					// Open login popup when cart empty.
					btyAccountPopup();
				}

				// Update current item.
				let currentItem = res.items.filter( (e) => e.line === Number( obj.line ) );
				if ( currentItem.length ) {
					let sidecartContent = item.closest( '.side-cart-content' ),
						totalPrice      = item.querySelector( '.totals-item-price' ),
						quantityUnit    = item.querySelectorAll( '[name="quantity"]' );
					if ( totalPrice ) {
						totalPrice.innerHTML = btyGetSectionHtml( res.sections['main-cart'], '[data-line="' + obj.line + '"] .totals-item-price' );
					}

					if ( sidecartContent ) {
						item.innerHTML = btyGetSectionHtml( res.sections['side-cart'], '[data-line="' + obj.line + '"]' );
					}

					if ( quantityUnit.length ) {
						quantityUnit.forEach(
							function( el ) {
								el.setAttribute( 'data-qty', obj.quantity );
							}
						);
					}
				} else {
					item.remove();
				}

				// Update html.
				btyUpdateHtml( res.sections, modules );

				// Re-init quantity button.
				btyQuantityButton();

				// Re-init update product quantity.
				btyUpdateProductQuantity();

				// Update cart progress bar.
				btyUpdateProgressBarCart( res.total_price );

				// Re-init minicart recommendations.
				btyAnimationImageLoad();
				btyScrollAnimationTrigger();
				btyMinicartRecommendations();

				// Re-init cart popup outer.
				btySideCartPopupOuter();

				// Reinit checkbox agree to terms.
				btyAgreeToTerms();
			}
		).catch(
			function( e ) {
				console.error( e );
			}
		).finally(
			function() {
				// Remove loading.
				item.classList.remove( 'updating' );
			}
		);
}

// Update product quantity.
function btyUpdateProductQuantity( doc = document ) {
	let item = doc.querySelectorAll( '.product-item[data-line]' );
	if ( ! item.length ) {
		return;
	}

	// Register dom html need an update when the response available.
	let modules = [
		{
			node: '.cart-totals',
			section: 'main-cart',
			selector: '.cart-totals'
	},
		{
			node: '.agree-to-terms',
			section: 'main-cart',
			selector: '.agree-to-terms'
	},
		{
			node: '.cart-table',
			section: 'main-cart',
			selector: '.cart-table'
	},
		{
			node: '.cart-items',
			section: 'side-cart',
			selector: '.cart-items'
	},
		{
			node: '.minicart-recommendations-wrapper',
			section: 'side-cart',
			selector: '.minicart-recommendations-wrapper'
	},
		{
			node: '.side-cart .sub-total',
			section: 'side-cart',
			selector: '.side-cart .sub-total'
	},
		{
			node: '.side-cart .agree-to-terms',
			section: 'side-cart',
			selector: '.side-cart .agree-to-terms'
	}
	];

	item.forEach(
		function( el ) {
			let line = parseInt( el.getAttribute( 'data-line' ), 10 );

			if ( ! line || isNaN( line ) ) {
				return;
			}

			let removes = el.querySelectorAll( '.product-remove' ),
				inputs  = el.querySelectorAll( '.quantity-input' );

			// Quantity change.
			if ( inputs.length ) {
				inputs.forEach(
					function( input ) {
						input.onchange = function() {
							let data, quantity = Number( input.value.trim() );

							// Loading effect.
							el.classList.add( 'updating' );

							data = {
								line: line,
								quantity: quantity,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							btyFetchCart( data, modules, el );
						}
					}
				);
			}

			// Remove button click.
			if ( removes.length ) {
				removes.forEach(
					function( remove ) {
						remove.onclick = function( e ) {
							e.preventDefault();

							// Loading effect.
							el.classList.add( 'updating' );

							let data = {
								line: line,
								quantity: 0,
								sections: modules.map( (s) => s.section ),
								sections_url: window.location.pathname
							}

							// Fetch data.
							btyFetchCart( data, modules, el );
						}
					}
				);
			}
		}
	);
}

// Variant options.
function btyProductVariants(doc = document, output = false) {
	let data,
		selector = doc.querySelectorAll('.product-variants');
	if (!selector.length) return;

	selector.forEach(function (sl) {
		let variants = sl.parentNode.querySelector('[data-product-variants]'),
			quantity = sl.parentNode.querySelector('[data-inventory-quantity]'),
			field = sl.querySelectorAll('.field-value');
		if (!field.length || !variants || !quantity) return;

		let product      = sl.closest('.main-product'),
			gallery      = product ? product.querySelector('.product-gallery') : false,
			featured     = sl.closest('.featured-product-product'),
			image        = featured ? featured.querySelector('.media-preview') : false,
			summary      = sl.closest('.product-summary'),
			variant_pick = {};

		variants = btyJsonParse(variants.textContent);
		quantity = btyJsonParse(quantity.textContent);

		let price       = summary.querySelector('.product-price'),
			form        = summary.querySelector('[data-type="add-to-cart-form"]'),
			input       = form ? form.querySelector('.quantity-input') : false,
			productId   = form ? form.querySelector('[name="id"]') : false,
			button      = form ? form.querySelector('[name="add"]') : false,
			price_2     = summary.querySelector('.product-price-floated .product-price'),
			form_2      = summary.querySelector('.product-floated-product-form [data-type="add-to-cart-form"]'),
			input_2     = form_2 ? form_2.querySelector('.quantity-input') : false,
			productId_2 = form_2 ? form_2.querySelector('[name="id"]') : false,
			button_2    = form_2 ? form_2.querySelector('[name="add"]') : false,
			productUrl  = sl.getAttribute('data-url'),
			pickup      = summary.querySelector('.pickup-availability'),
			amount      = summary.querySelector('.product-sale-label .sale-total .saved-number');

		field.forEach(function (el) {
			if (el.type === 'radio') {
				if (el.checked) variant_pick[el.name] = el.value;
			} else {
				variant_pick[el.name] = el.value;
			}

			el.onchange = function () {
				variant_pick[el.name] = el.value;
				btyUpdateStockStatusProduct(variants, sl);

				let selected = btySelectedVariant(variant_pick, variants);

				if ( form ) {
					let sellingMessage = form.parentNode.querySelector( '.selling-plan-message' ),
						button         = form.querySelector( '.add-to-cart-button' ),
						paymentButton  = form.querySelector( '.shopify-payment-button' );

					if ( sellingMessage && ! sellingMessage.classList.contains( 'hidden' ) ) {
						sellingMessage.innerHTML = '';
						sellingMessage.classList.add( 'hidden' );
					}

					if ( selected.requires_selling_plan && selected.selling_plan_allocations.length == 0 ) {
						if ( button ) {
							button.classList.add( 'selling-plan-error' );
						}

						if ( paymentButton ) {
							paymentButton.classList.add( 'hidden' );
						}
					} else {
						if ( button ) {
							button.classList.remove( 'selling-plan-error' );
						}

						if ( paymentButton ) {
							paymentButton.classList.remove( 'hidden' );
						}
					}
				}

				if (!selected) {
					if (button) {
						button.classList.add('disabled');
						button.innerHTML = btyStrings.product.unavailable;
					}
					if (button_2) {
						button_2.classList.add('disabled');
						button_2.innerHTML = btyStrings.product.unavailable;
					}
					if (form) form.classList.add('disabled');
					if (form_2) form_2.classList.add('disabled');
					if (pickup) pickup.innerHTML = '';
					if (amount) amount.closest('.product-sale-label').classList.add('hidden');
					return;
				}

				if (productId) productId.value = selected.id;
				if (productId_2) productId_2.value = selected.id;

				if (image && selected.featured_image) {
					image.removeAttribute('srcset');
					btyImageLoad(image, selected.featured_image.src, selected.featured_media.id, image.parentNode);
				}

				if (productUrl && gallery) {
					window.history.replaceState({}, '', productUrl + '?variant=' + selected.id);
				}

				if (price) {
					price.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
				}
				if (price_2) {
					price_2.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
				}

				if (amount) {
					if (selected.compare_at_price) {
						let amountTotal = 100 * (selected.compare_at_price - selected.price) / selected.compare_at_price;
						amount.innerHTML = amountTotal.toFixed(0);
						amount.closest('.product-sale-label').classList.remove('hidden');
					} else {
						amount.closest('.product-sale-label').classList.add('hidden');
					}
				}

				if (input) {
					let max = quantity.filter(e => e.id === selected.id);
					if (max.length) {
						let qty = max[0].qty;
						if (qty > 0) {
							if (Number(input.value) > qty) input.value = qty;
							input.setAttribute('max', qty);
						} else {
							input.removeAttribute('max');
						}
					} else {
						input.removeAttribute('max');
					}
				}

				let groupImage = document.querySelectorAll('.check-group-image .swiper[data-color]');
				if (groupImage.length) {
					let colorName = selected.featured_media && selected.featured_media.alt ? selected.featured_media.alt.split('_')[0] : false;
					if (colorName) {
						groupImage.forEach(function (gi) {
							let label = gi.getAttribute('data-color');
							if (!label) return;
							if (colorName.trim().toLowerCase() == label) gi.classList.remove('group-hidden');
							else gi.classList.add('group-hidden');
						});
					}
				}

				let shopifyPayment = document.querySelector('shopify-payment-terms');
				if (shopifyPayment) shopifyPayment.setAttribute('variant-id', selected.id);

				if (pickup) {
					if (selected.available) btyPickupAvailability(doc, productId.value, pickup);
					else pickup.innerHTML = '';
				}

				let selectedOption = el.closest('.variant-field')?.querySelector('.field-title .selected-value');
				if (selectedOption) selectedOption.innerText = el.value.trim();

				if (form) form.classList.toggle('disabled', !selected.available);
				if (form_2) form_2.classList.toggle('disabled', !selected.available);

				if (button) {
					if (selected.available) {
						if (button.classList.contains('has-price')) {

							let priceHTML = '';
							if (selected.compare_at_price && selected.compare_at_price > selected.price) {
								const discount = Math.round((1 - selected.price / selected.compare_at_price) * 100);
								priceHTML = `
									<span> - </span>
									${btyPriceHtml(
										selected.price,
										selected.compare_at_price,
										selected.unit_price,
										selected.unit_price_measurement
									)}
								`;
							} else {
								priceHTML = `
									<span> - </span>
									${btyPriceHtml(
										selected.price,
										selected.compare_at_price,
										selected.unit_price,
										selected.unit_price_measurement
									)}
								`;
							}

							button.innerHTML = `${btyStrings.product.add_to_cart}${priceHTML}`;
						} else {
							button.innerHTML = btyStrings.product.add_to_cart;
						}

						button.classList.remove('disabled');
					} else {
						button.innerHTML = btyStrings.product.out_of_stock;
						button.classList.add('disabled');
					}
				}

				if (button_2) {
					if (selected.available) {
						button_2.innerHTML = btyStrings.product.add_to_cart;
						button_2.classList.remove('disabled');
					} else {
						button_2.innerHTML = btyStrings.product.out_of_stock;
						button_2.classList.add('disabled');
					}
				}

				document.dispatchEvent(new CustomEvent('product-variant-updated', { detail: { selected } }));
			};

			if (amount?.textContent.trim()) {
				amount.closest('.product-sale-label')?.classList.remove('hidden');
			} else {
				amount?.closest('.product-sale-label')?.classList.add('hidden');
			}
		});

		let firstSelected = btySelectedVariant(variant_pick, variants);

		if (!firstSelected && variants.length) {
			let cheapest = variants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
			firstSelected = cheapest;
			variant_pick = cheapest.options.reduce((obj, val, index) => {
				obj['option' + (index + 1)] = val;
				return obj;
			}, {});

			if (productId) productId.value = cheapest.id;
			if (productId_2) productId_2.value = cheapest.id;
			if (price) price.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);
			if (price_2) price_2.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);

			if (button) {
				if (cheapest.available) {

					if (button.classList.contains('has-price')) {
						button.innerHTML = `
							${btyStrings.product.add_to_cart}
							<span> - </span>
							${btyPriceHtml(
								cheapest.price,
								cheapest.compare_at_price,
								cheapest.unit_price,
								cheapest.unit_price_measurement
							)}
						`;
					} else {
						button.innerHTML = btyStrings.product.add_to_cart;
					}

					button.classList.remove('disabled');
				} else {
					button.classList.add('disabled');
					button.innerHTML = btyStrings.product.out_of_stock;
				}
			}

			if (button_2) {
				if (cheapest.available) {
					button_2.classList.remove('disabled');
					button_2.innerHTML = btyStrings.product.add_to_cart;
				} else {
					button_2.classList.add('disabled');
					button_2.innerHTML = btyStrings.product.out_of_stock;
				}
			}

			field.forEach(el => {
				let value = cheapest.options.find(v => v === el.value);
				if (value) {
					el.checked = true;
					el.dispatchEvent(new Event('change'));
				}
			});
		} else if (firstSelected) {
			let checkedField = sl.querySelector('.field-value:checked');
			if (checkedField) {
				checkedField.dispatchEvent(new Event('change'));
			}
		}

		if (pickup && firstSelected && firstSelected.available) btyPickupAvailability(doc, firstSelected.id, pickup);

		if (input && firstSelected) {
			let max = quantity.filter(e => e.id === firstSelected.id);
			if (max.length) {
				let qty = max[0].qty;
				if (qty > 0) {
					if (Number(input.value) > qty) input.value = qty;
					input.setAttribute('max', qty);
				} else {
					input.removeAttribute('max');
				}
			} else {
				input.removeAttribute('max');
			}
		}

		data = firstSelected;
	});

	if (output) return data;
}

// Quick view variant options.
function btyQuickViewVariants(doc = document, slider = {}) {
	let selector = doc.querySelector('.product-variants');
	if (!selector) return;

	let variants = selector.parentNode.querySelector('[data-product-variants]'),
		quantity = selector.parentNode.querySelector('[data-inventory-quantity]'),
		field    = selector.querySelectorAll('.field-value');
	if (!field.length || !variants || !quantity) return;

	let summary      = selector.closest('.product-summary') || selector.parentNode,
		image        = summary.querySelector('.media-preview'),
		form         = summary.querySelector('[data-type="add-to-cart-form"]'),
		price        = summary.querySelector('.product-price'),
		button       = form ? form.querySelector('[name="add"]') : false,
		productId    = form ? form.querySelector('[name="id"]') : false,
		input        = form ? form.querySelector('.quantity-input') : false,
		pickup       = summary.querySelector('.pickup-availability'),
		amount       = summary.querySelector('.product-sale-label .sale-total .saved-number'),
		productUrl   = selector.getAttribute('data-url'),
		productLink  = summary.querySelector('.product-url'),
		shareInput   = summary.querySelector('.product-share .field-input'),
		variant_pick = {};

	variants = btyJsonParse(variants.textContent);
	quantity = btyJsonParse(quantity.textContent);

	field.forEach((el) => {
		if (el.type === 'radio') {
			if (el.checked) variant_pick[el.name] = el.value;
		} else {
			variant_pick[el.name] = el.value;
		}

		el.onchange = function () {
			variant_pick[el.name] = el.value;
			btyUpdateStockStatusProduct(variants, selector);

			let selected = btySelectedVariant(variant_pick, variants, slider);
			if (!selected) {
				if (button) {
					button.classList.add('disabled');
					button.innerHTML = btyStrings.product.unavailable;
				}
				if (form) form.classList.add('disabled');
				if (pickup) pickup.innerHTML = '';
				if (amount) amount.closest('.product-sale-label')?.classList.add('hidden');
				return;
			}

			// Check variant selling plan.
			if ( form ) {
				let sellingMessage = form.parentNode.querySelector( '.selling-plan-message' );

				if ( sellingMessage && ! sellingMessage.classList.contains( 'hidden' ) ) {
					sellingMessage.innerHTML = '';
					sellingMessage.classList.add( 'hidden' );
				}
			}

			if (productId) productId.value = selected.id;

			if (image && selected.featured_image) {
				image.removeAttribute('srcset');
				btyImageLoad(image, selected.featured_image.src, selected.featured_media?.id, image.parentNode);
			}

			if (productUrl) {
				if (productLink) productLink.href = productUrl + '?variant=' + selected.id;
				if (shareInput) shareInput.value = window.location.origin + productUrl + '?variant=' + selected.id;
			}

			if (price) {
				price.innerHTML = btyPriceHtml(selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement);
			}

			if (amount) {
				if (selected.compare_at_price) {
					let amountTotal = 100 * (selected.compare_at_price - selected.price) / selected.compare_at_price;
					amount.innerHTML = amountTotal.toFixed(0);
					amount.closest('.product-sale-label')?.classList.remove('hidden');
				} else {
					amount.closest('.product-sale-label')?.classList.add('hidden');
				}
			}

			if (input) {
				let max = quantity.find(e => e.id === selected.id);
				if (max) {
					let qty = max.qty;
					if (qty > 0) {
						if (Number(input.value) > qty) input.value = qty;
						input.setAttribute('max', qty);
					} else input.removeAttribute('max');
				} else input.removeAttribute('max');
			}

			if (form) form.classList.toggle('disabled', !selected.available);

			if (button) {
				if (selected.available) {
					let priceHTML = '';
					if (selected.compare_at_price && selected.compare_at_price > selected.price) {
						const discount = Math.round((1 - selected.price / selected.compare_at_price) * 100);
						priceHTML = `
							<span> - </span>
							${btyPriceHtml(
								selected.price,
								selected.compare_at_price,
								selected.unit_price,
								selected.unit_price_measurement
							)}
						`;
					} else {
						priceHTML = `
							<span> - </span>
							${btyPriceHtml(
								selected.price,
								selected.compare_at_price,
								selected.unit_price,
								selected.unit_price_measurement
							)}
						`;
					}
					button.innerHTML = `${btyStrings.product.add_to_cart}${priceHTML}`;
					button.classList.remove('disabled');
				} else {
					button.innerHTML = btyStrings.product.out_of_stock;
					button.classList.add('disabled');
				}
			}

			if (pickup) {
				if (selected.available) btyPickupAvailability(doc, selected.id, pickup);
				else pickup.innerHTML = '';
			}

			let selectedOption = el.closest('.variant-field')?.querySelector('.field-title .selected-value');
			if (selectedOption) selectedOption.innerText = el.value.trim();

			document.dispatchEvent(new CustomEvent('product-variant-updated', { detail: { selected } }));
		};
	});

	let firstSelected = btySelectedVariant(variant_pick, variants, slider);
	if (!firstSelected && variants.length) {
		let cheapest = variants.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
		firstSelected = cheapest;
		variant_pick = cheapest.options.reduce((obj, val, index) => {
			obj['option' + (index + 1)] = val;
			return obj;
		}, {});

		if (productId) productId.value = cheapest.id;
		if (price) price.innerHTML = btyPriceHtml(cheapest.price, cheapest.compare_at_price, cheapest.unit_price, cheapest.unit_price_measurement);

		if (button) {
			if (cheapest.available) {
				button.classList.remove('disabled');
				button.innerHTML = btyStrings.product.add_to_cart;
			} else {
				button.classList.add('disabled');
				button.innerHTML = btyStrings.product.out_of_stock;
			}
		}

		field.forEach(el => {
			let value = cheapest.options.find(v => v === el.value);
			if (value) {
				el.checked = true;
				el.dispatchEvent(new Event('change'));
			}
		});
	} else if (firstSelected) {
		let checkedField = selector.querySelector('.field-value:checked');
		if (checkedField) checkedField.dispatchEvent(new Event('change'));
	}

	if (pickup && firstSelected && firstSelected.available) {
		btyPickupAvailability(doc, firstSelected.id, pickup);
	}

	if (input && firstSelected) {
		let max = quantity.find(e => e.id === firstSelected.id);
		if (max) {
			let qty = max.qty;
			if (qty > 0) {
				if (Number(input.value) > qty) input.value = qty;
				input.setAttribute('max', qty);
			} else input.removeAttribute('max');
		} else input.removeAttribute('max');
	}
}

// Quick view.
function btyQuickView( doc = document ) {
	let box      = document.querySelector( '.quick-view' ),
		content  = box ? box.querySelector( '.quick-view-content' ) : false,
		selector = doc.querySelectorAll( '.product-quick-view' );

	if ( ! content || ! selector.length ) {
		return;
	}

	selector.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();
				let product_id = el.parentNode.getAttribute( 'data-id' );
				if ( product_id == box.getAttribute( 'data-id' ) ) {
					document.documentElement.classList.add( 'quick-view-open' );
					return;
				}

				document.documentElement.classList.add( 'quick-view-open' );
				box.classList.add( 'loading' );
				box.setAttribute( 'data-id', product_id );

				fetch( el.href + '?sections=quickview' )
					.then(
						function( r ) {
							if ( 200 !== r.status ) {
								console.log( 'Status Code: ' + r.status );
								throw r;
							}

							return r.json();
						}
					).then(
						function( res ) {
							content.innerHTML = btyGetSectionHtml( res.quickview );

							let options,
								gallery = document.querySelector( '.quick-view .product-gallery .swiper' );

							if ( gallery ) {
								options = {
									slidesPerView: 1,
									spaceBetween: 10,
									navigation: {
										nextEl: '.quick-view .swiper-button-next',
										prevEl: '.quick-view .swiper-button-prev'
									},
									pagination: {
										el: '.quick-view .swiper-pagination',
										type: 'bullets',
										clickable: true
									}
								}

								let quickViewSlide = new Swiper( gallery, options );

								btyQuickViewVariants( box, quickViewSlide );
							} else {
								btyQuickViewVariants( box, {} );
							}
						}
					).catch(
						function( e ) {
							console.error( e );
						}
					).finally(
						function() {
							// Re-init share.
							btyProductShare();

							// Re-init quantity.
							btyQuantityButton();

							// Update lazy load image.
							btyAnimationImageLoad( box, 0 );

							// Re-init add to cart.
							btyAddToCart();

							// Remove loading.
							box.classList.remove( 'loading' );

							// Close popup.
							btyClosePopup( 'quick-view-open', box );
						}
					);
			}
		}
	);
}

// Update storage.
function btyUpdateStorage( key, array, id, type = 'local' ) {
	let storage = 'local' === type ? localStorage : sessionStorage;

	if ( ! storage.getItem( key ) ) {
		// Set key.
		storage.setItem( key, JSON.stringify( array ) );
	} else if ( ! storage.getItem( key ).includes( id ) ) {
		// Add new id.
		let parseStorage = btyJsonParse( storage.getItem( key ) );
		if ( ! parseStorage ) {
			return;
		}

		parseStorage.push( id );

		storage.setItem( key, JSON.stringify( parseStorage ) );
	}
}

// Update variants on popup.
function btyVariantsPopup( doc = document, popup ) {
	let variants = doc.querySelectorAll( '.product-variants' );
	if ( ! popup || ! variants.length ) {
		return;
	}

	variants.forEach(
		function( el ) {
			let variantData = el.querySelector( '[data-product-variants]' ),
				productId   = el.getAttribute( 'data-id' ),
				select      = el.querySelectorAll( '.field-value' ),
				imageLink   = popup.querySelector( '.preview-image [data-id="' + productId + '"]' ),
				image       = imageLink ? imageLink.querySelector( 'img' ) : false,
				price       = popup.querySelector( '[data-id="' + productId + '"] .product-price' ),
				stock       = popup.querySelector( '[data-id="' + productId + '"] .product-stock-status' ),
				form        = popup.querySelector( '.form-add-to-cart[data-id="' + productId + '"]' ),
				inputId     = form ? form.querySelector( '[name="id"]' ) : false,
				variantPick = {};

			if ( ! select.length ) {
				return;
			}

			variantData = variantData ? btyJsonParse( variantData.textContent ) : false;
			if ( ! variantData ) {
				return;
			}

			// Foreach.
			select.forEach(
				function( sel ) {
					variantPick[ sel.name ] = sel.value;

					// Change event.
					sel.onchange = function() {
						variantPick[ sel.name ] = sel.value;

						let selected = btySelectedVariant( variantPick, variantData );

						// Update image.
						if ( image ) {
							image.removeAttribute( 'srcset' );
							btyImageLoad( image, selected.featured_media.preview_image.src, selected.featured_media.id, image.parentNode );
						}

						// Update current variant id.
						if ( inputId ) {
							inputId.value = selected.id;
						}

						// Update stock status, add to cart button text.
						if ( selected.available ) {
							if ( form ) {
								form.classList.remove( 'disabled' );
							}

							if ( stock ) {
								stock.innerHTML = btyStrings.product.in_stock;
								stock.classList.remove( 'inventory--low' );
								stock.classList.add( 'inventory--high' );
							}
						} else {
							if ( form ) {
								form.classList.add( 'disabled' );
							}

							if ( stock ) {
								stock.innerHTML = btyStrings.product.out_of_stock;
								stock.classList.remove( 'inventory--high' );
								stock.classList.add( 'inventory--low' );
							}
						}

						// Update price.
						if ( price ) {
							price.innerHTML = btyPriceHtml( selected.price, selected.compare_at_price );
						}
					}
				}
			);

			// First matching variants.
			let firstSelected = btySelectedVariant( variantPick, variantData );
			if ( firstSelected.available ) {
				if ( form ) {
					form.classList.remove( 'disabled' );
				}

				if ( stock ) {
					stock.innerHTML = btyStrings.product.in_stock;
					stock.classList.remove( 'inventory--low' );
					stock.classList.add( 'inventory--high' );
				}
			} else {
				if ( form ) {
					form.classList.add( 'disabled' );
				}

				if ( stock ) {
					stock.innerHTML = btyStrings.product.out_of_stock;
					stock.classList.remove( 'inventory--high' );
					stock.classList.add( 'inventory--low' );
				}
			}

			if ( price ) {
				price.innerHTML = btyPriceHtml( firstSelected.price, firstSelected.compare_at_price );
			}
		}
	);
}

// Open side cart.
function btySideCart() {
	let buttons  = document.querySelectorAll( '.action-cart' ),
		sideCart = document.querySelector( '.side-cart' );
	if ( ! buttons.length || ! sideCart ) {
		return;
	}

	buttons.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();

				document.documentElement.classList.add( 'side-cart-open' );

				btyClosePopup( 'side-cart-open', sideCart );

				const closeBtn = sideCart.querySelector('.side-cart-close');
				if (closeBtn) setTimeout(() => closeBtn.focus(), 300);
				if (!sideCart._trap) {
					sideCart._trap = true; // prevent duplicates
					sideCart.addEventListener('keydown', function(ev){
						if (ev.key !== 'Tab') return;

						const els = sideCart.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
						const first = els[0];
						const last  = els[els.length - 1];

						if (ev.shiftKey && document.activeElement === first) {
							ev.preventDefault();
							last.focus();
						} else if (!ev.shiftKey && document.activeElement === last) {
							ev.preventDefault();
							first.focus();
						}
					});
				}
			}
		}
	);
}

// Get fetch config.
function btyFetchConfig( type = 'json' ) {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/' + type
		}
	};
}

// ValidateEmail.
function btyValidateEmail( selector ) {
	let mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	selector.focus();

	if ( selector.value.match( mailformat ) ) {
		selector.classList.remove( 'email-invalid' );

		return true;
	} else {
		selector.classList.add( 'email-invalid' );

		return false;
	}
}

function btyCheckInventoryOnLoad(doc = document) {
	let qtyInputs = doc.querySelectorAll('input[name="quantity"][max]');
	qtyInputs.forEach((qtyInput) => {
		let max = parseInt(qtyInput.getAttribute('max') || 0);
		let val = parseInt(qtyInput.value || 1);
		let warning = qtyInput.closest('form')?.querySelector('.product-warning');

		if (max && val > max) {
			qtyInput.value = max;
			if (warning) {
				warning.innerHTML = btyGlobals.svg_warning + `Chỉ còn ${max} sản phẩm trong kho.`;
			}
		}
	});
}

// Ajax add to cart.
function btyAddToCart(doc = document) {
	let buttons = doc.querySelectorAll('.add-to-cart-button');
	if (!buttons.length) return;

	let modules = [
		{
			node: '.side-cart-inner',
			section: 'side-cart',
			selector: '.side-cart-inner'
		},
		{
			section: 'cart-count'
		}
	];

	buttons.forEach(function (button) {
		// Hidden payment button if require selling plan.
		if (button.classList.contains('selling-plan-error')) {
			let formEl = button.closest('[data-type="add-to-cart-form"]');
			if (formEl) {
				let paymentButton = formEl.querySelector('.shopify-payment-button');
				if (paymentButton) paymentButton.classList.add('hidden');
			}
		}

		button.onclick = function (e) {
			let form = button.closest('[data-type="add-to-cart-form"]');
			// Check selling plan
			if (button.classList.contains('selling-plan-error')) {
				if (form) {
					let sellingMessage = form.parentNode?.querySelector('.selling-plan-message');
					if (sellingMessage) {
						sellingMessage.innerHTML = btyStrings.product.selling_plan_message;
						sellingMessage.classList.remove('hidden');
					}
				}
				e.preventDefault();
				return;
			}

			let sideCartNode = document.querySelector('.side-cart');
			if (sideCartNode) sideCartNode._lastFocused = document.activeElement;

			if (button.classList.contains('disabled')) {
				e.preventDefault();
				return;
			}

			if (button.tagName.toUpperCase() === 'A') return;
			e.preventDefault();

			if (
				button.classList.contains('add-product-variants') &&
				window.matchMedia('(max-width: 767px)').matches
			) {
				return;
			}

			button.classList.add('loading');

			if (!form) {
				button.classList.remove('loading');
				return;
			}

			let formData = new FormData(form),
				warning = form.parentNode.querySelector('.product-warning'),
				config = btyFetchConfig('javascript');

			let qtyInput = form.querySelector('input[name="quantity"]');
			let max = parseInt(qtyInput?.getAttribute('max') || 0);
			let val = parseInt(qtyInput?.value || 1);

			// Validate.
			if (max && val > max) {
				if (warning) {
					const msg = btyStrings.product.warning_message.replace('{{max}}', max);
					console.log( msg );
					warning.innerHTML = btyGlobals.svg_warning + msg;
					warning.classList.remove('hidden');
				}

				qtyInput.value = max;
				button.classList.remove('loading');
				return;
			}


			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			formData.append('sections', modules.map((s) => s.section));
			formData.append('sections_url', window.location.pathname);
			config.body = formData;

			fetch(btyGlobals.cart_add_url, config)
				.then((r) => r.json())
				.then((res) => {
					if (warning) {
						warning.innerHTML = res.status
							? btyGlobals.svg_warning + (res.message || res.description)
							: '';
					}

					if (res.status) return;

					const safeModules = modules.filter(
						(m) => res.sections && res.sections[m.section]
					);

					if (safeModules.length) {
						btyUpdateHtml(res.sections, safeModules);
					}
					btyAnimationImageLoad();
					btyScrollAnimationTrigger();
					btyMinicartRecommendations();
					btySideCartPopupOuter();
					if (res.sections && res.sections['cart-count']) {
						btyCartItemCount(
							btyGetSectionHtml(res.sections['cart-count'], '.shopify-section')
						);
					}
					setTimeout(() => {
						document.documentElement.classList.add('side-cart-open');
					});
					btyUpdateProgressBarCart(res.total_price);
				})
				.catch((e) => console.error(e))
				.finally(() => {
					btyQuantityButton();
					btyUpdateProductQuantity();
					button.classList.remove('loading');

					let quickAddLoading = doc.querySelector('.quick-add-box .field-item.loading');
					if (quickAddLoading) quickAddLoading.classList.remove('loading');

					document.documentElement.classList.remove('quick-view-open');

					btyClosePopup('side-cart-open', document.querySelector('.side-cart'));

					let sideCart = document.querySelector('.side-cart'),
						closeButton = sideCart?.querySelector('.side-cart-close');

					if (closeButton) {
						setTimeout(() => closeButton.focus(), 400);
					}

					btyAgreeToTerms();
				});
		};
	});
}

// Ajax add all set to cart.
function btyAddMultiProductToCart(doc = document) {
	let selectors = doc.querySelectorAll('.add-multiple-products');
	if (!selectors.length) return;

	selectors.forEach(function (el) {
		let items = el.parentNode.querySelectorAll('.product-card [name="id"]');
		if (!items.length) return;

		items.forEach(function (item, index) {
			item.addEventListener('change', function () {
				let currentId = el.querySelector('[data-index="' + index + '"]');
				if (currentId) currentId.value = item.value;
			});
		});
	});
}

// Check product inventory.
function btyProductInventory( doc = document, variants = {} ) {
	let variant   = {},
		quickAdds = doc.querySelectorAll( '.quick-add-box .field-swatch .selected' ),
		swatches  = doc.querySelector( '.product-swatches .selected' );
	if ( ! quickAdds.length && ! swatches ) {
		return;
	}

	let selected = btySelectedVariant( variant, variants );
}

/**
 * Update stock status
 *
 * @param  object variants The product variants.
 * @param  node   siblings The product card.
 */
function btyUpdateStockStatus( variants, card ) {
	let getSelected = card.querySelectorAll( '.field-swatch .selected' ),
		swatch      = card.querySelector( '.product-swatches .swatch.selected' );
	if ( getSelected.length ) {
		getSelected.forEach(
			function( el ) {
				let current = {};

				// Check color variant.
				if ( swatch ) {
					current[ swatch.getAttribute( 'data-name' ) ] = swatch.getAttribute( 'data-value' );
				}

				// Get siblings to save 2 fix variant, ex: ABC ABD ABX ABY.
				let siblings = btySiblings(
					el.parentNode,
					function( e ) {
						return e.classList.contains( 'field-swatch' );
					}
				);

				if ( siblings.length ) {
					siblings.forEach(
						function( si ) {
							let siSelected = si.querySelector( '.selected' );
							if ( ! siSelected ) {
								return;
							}

							current[ siSelected.getAttribute( 'data-name' ) ] = siSelected.getAttribute( 'data-value' );
						}
					);
				}

				// Update stock status on quick add.
				let indexSelected = el.parentNode.querySelectorAll( '.field-item' );
				if ( indexSelected.length ) {
					indexSelected.forEach(
						function( is ) {
							current[ is.getAttribute( 'data-name' ) ] = is.getAttribute( 'data-value' );

							let selected = btySelectedVariant( current, variants );
							if ( selected ) {
								if ( selected.available ) {
									is.classList.remove( 'soldout' );
								} else {
									is.classList.add( 'soldout' );
								}
							} else {
								is.classList.add( 'soldout' );
							}
						}
					);
				}
			}
		);
	}

	if ( swatch ) {
		swatch.parentNode.querySelectorAll( '.swatch' ).forEach(
			function( el ) {
				let current = {};

				if ( getSelected.length ) {
					getSelected.forEach(
						function( si ) {
							current[ si.getAttribute( 'data-name' ) ] = si.getAttribute( 'data-value' );
						}
					);
				}

				current[ el.getAttribute( 'data-name' ) ] = el.getAttribute( 'data-value' );

				let selected = btySelectedVariant( current, variants );
				if ( selected ) {
					if ( selected.available ) {
						el.classList.remove( 'soldout' );
					} else {
						el.classList.add( 'soldout' );
					}
				} else {
					el.classList.add( 'soldout' );
				}
			}
		);
	}
}

/**
 * Update stock status for product page
 *
 * @param  object variants The product variants.
 * @param  node   siblings The product card.
 */
function btyUpdateStockStatusProduct( variants, element ) {
	let getSelected = element.querySelectorAll( '.variant-field .field-value:checked' );
	if ( ! getSelected.length ) {
		return;
	}

	getSelected.forEach(
		function( el ) {
			let current = {};

			// Get siblings to save 2 fix variant, ex: ABC ABD ABX ABY.
			let siblings = btySiblings(
				el.closest( '.variant-field' ),
				function( e ) {
					return e.classList.contains( 'variant-field' );
				}
			);

			if ( siblings.length ) {
				siblings.forEach(
					function( si ) {
						let siSelected = si.querySelector( '.field-value:checked' );
						if ( ! siSelected ) {
							return;
						}

						current[ siSelected.getAttribute( 'name' ) ] = siSelected.getAttribute( 'value' );
					}
				);
			}

			// Update stock status on quick add.
			let indexSelected = el.closest( '.variant-field' ).querySelectorAll( '.field-value' );
			if ( indexSelected.length ) {
				indexSelected.forEach(
					function( is ) {
						let inputId = is.getAttribute( 'id' ),
							label   = inputId ? is.parentNode.querySelector( 'label[for="' + inputId + '"]' ) : false;

						if ( ! label ) {
							return;
						}

						current[ is.getAttribute( 'name' ) ] = is.getAttribute( 'value' );

						let selected = btySelectedVariant( current, variants );
						if ( selected ) {
							if ( selected.available ) {
								label.classList.remove( 'soldout' );
							} else {
								label.classList.add( 'soldout' );
							}
						} else {
							label.classList.add( 'soldout' );
						}
					}
				);
			}
		}
	);
}

// Quick add.
function btyQuickAdd( doc = document ) {
	let selectors = doc.querySelectorAll( '.quick-add .field-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			el.onclick = function() {
				let form   = el.closest( '[data-type="add-to-cart-form"]' ),
					submit = form ? form.querySelector( '[type="submit"]' ) : false,
					card   = form.closest( '.product-card' );
				if ( ! card || ! submit ) {
					return;
				}

				// Highlight selected.
				if ( ! el.classList.contains( 'selected' ) ) {
					let oldActive = el.parentNode.querySelector( '.field-item.selected' );
					if ( oldActive ) {
						oldActive.classList.remove( 'selected' );
					}

					el.classList.add( 'selected' );
				}

				// Update swatch.
				let variants  = form.querySelector( '[data-product-variants]' ),
					productId = form.querySelector( '[name="id"]' );

				if ( productId && variants ) {
					// Json parse.
					variants = btyJsonParse( variants.textContent );

					let variant_pick     = {},
						quickAddSelected = card.querySelectorAll( '.quick-add-box .selected' );

					if ( quickAddSelected.length ) {
						quickAddSelected.forEach(
							function( qas ) {
								variant_pick[ qas.getAttribute( 'data-name' ) ] = qas.getAttribute( 'data-value' );
							}
						);
					}

					// Get option from Swatch.
					let selectedSwatch = card.querySelector( '.product-swatches .swatch.selected' );
					if ( selectedSwatch ) {
						variant_pick[ selectedSwatch.getAttribute( 'data-name' ) ] = selectedSwatch.getAttribute( 'data-value' );
					}

					// Found selected variant.
					let selected = btySelectedVariant( variant_pick, variants );
					if ( selected ) {
						productId.value = selected.id;

						// Update stock status.
						btyUpdateStockStatus( variants, card );

						// Update product price.
						let price = card.querySelector( '.product-price' );
						if ( price ) {
							price.innerHTML = btyPriceHtml( selected.price, selected.compare_at_price, selected.unit_price, selected.unit_price_measurement );
						}

						if ( selected.available ) {
							el.classList.add( 'loading' );

							submit.click();
						} else {
							alert( 'This item is currently out of stock.' );

							return;
						}
					}
				}
			}

			el.addEventListener('keydown', function(e) {
			// Trigger on Enter or Space
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					el.click();
				}
			});
		}
	);
}

// Swatch list.
function btySwatch( doc = document ) {
	let swatch = doc.querySelectorAll( '.product-card .swatch' );
	if ( ! swatch.length ) {
		return;
	}

	swatch.forEach(
		function( el ) {
			el.onclick = function( e ) {
				e.preventDefault();

				if ( el.classList.contains( 'selected' ) ) {
					return;
				}

				let swatchValue = el.parentNode.querySelector( '.swatch-selected' );
				if ( swatchValue ) {
					swatchValue.innerText = el.innerText.trim();
				}

				// Get wrapper.
				let card    = el.closest( '.product-card' ),
					wrapper = card.querySelector( '.product-media-wrap' );
				if ( ! wrapper ) {
					return;
				}

				// Get product image.
				let image = wrapper.querySelector( '.product-image img' );

				// Handle loading image.
				const imageLoadHandle = function( dataSrc, main ) {
					if ( ! image ) {
						return;
					}

					let newImage     = new Image(),
						variationImg = el.getAttribute( 'data-key' ) || false,
						mainImg      = image.getAttribute( 'data-key' ) || false;

					newImage.crossOrigin = 'anonymous';

					// Main image.
					if ( main ) {
						variationImg = mainImg;
					}

					// Check local storage first.
					if ( sessionStorage.getItem( variationImg ) ) {
						image.src = sessionStorage.getItem( variationImg );
						image.removeAttribute( 'srcset' );
						return;
					}

					// Save main product image first.
					if ( 'string' !== typeof( image.getAttribute( 'data-loaded' ) ) && mainImg ) {
						let mainImage = new Image();

						mainImage.crossOrigin = 'anonymous';

						mainImage.onload = function() {
							let renderMainImage = btyGetImageSrc( mainImage );

							if ( mainImg ) {
								sessionStorage.setItem( mainImg, renderMainImage );
							}

							image.setAttribute( 'data-loaded', '' );
						}

						mainImage.src = image.src;
					}

					// Add loading animation.
					wrapper.classList.add( 'loading' );

					// Handle.
					newImage.onload = function() {
						wrapper.classList.remove( 'loading' );
						let renderImage = btyGetImageSrc( newImage );

						// Set final image src.
						image.src = renderImage;
						image.removeAttribute( 'srcset' );

						// Save image to local storage.
						if ( variationImg ) {
							sessionStorage.setItem( variationImg, renderImage );
						}
					}

					newImage.onerror = function() {
						wrapper.classList.remove( 'loading' );
					}

					// Set image src for 'newImage.onload' function handle.
					newImage.src = dataSrc;
				}

				// Get old selected.
				let oldActive = card.querySelector( '.swatch.selected' );
				if ( oldActive ) {
					oldActive.classList.remove( 'selected' );
				}

				// Set swatch selected.
				el.classList.add( 'selected' );

				// Update product image src.
				if ( image ) {
					let src = el.getAttribute( 'data-src' ) || '';
					if ( src && src != image.src ) {
						imageLoadHandle( src );
					}
				}

				// Update swatch.
				let form      = el.closest( '.product-card' ).querySelector( '[data-type="add-to-cart-form"]' ),
					addToCart = form ? form.querySelector( '.add-to-cart-button' ) : false,
					variants  = form ? form.querySelector( '[data-product-variants]' ) : false,
					productId = form ? form.querySelector( '[name="id"]' ) : false;

				if ( productId && variants ) {
					let variant_pick = {},
						dataName     = el.getAttribute( 'data-name' ),
						dataValue    = el.getAttribute( 'data-value' );

					variants = btyJsonParse( variants.textContent );

					variant_pick[ dataName ] = dataValue;

					// Update stock status.
					btyUpdateStockStatus( variants, card );

					// Get quick add value.
					let quickAdd = card.querySelectorAll( '.quick-add .field-item.selected' );
					if ( quickAdd.length ) {
						quickAdd.forEach(
							function( qa ) {
								variant_pick[ qa.getAttribute( 'data-name' ) ] = qa.getAttribute( 'data-value' );
							}
						);
					}

					let selected = btySelectedVariant( variant_pick, variants );
					if ( selected ) {
						productId.value = selected.id;

						// Dispatch 'change' event.
						productId.dispatchEvent( new Event( 'change' ) );

						// Update add to cart button status.
						if ( addToCart ) {
							if ( selected.available ) {
								addToCart.classList.remove( 'disabled' );
							} else {
								addToCart.classList.add( 'disabled' );
							}
						}

						// Update product url.
						let ahref = el.closest( '.product-card' ).querySelectorAll( 'a[href]:not(.swatch)' );
						if ( ahref.length ) {
							ahref.forEach(
								function( link ) {
									link.setAttribute( 'href', link.href.split( '?' )[1] ? link.href.split( '?' )[0] + '?variant=' + selected.id : link.href + '?variant=' + selected.id );
								}
							);
						}
					}
				}
			}
		}
	);
}

// Product tabs.
function btyProductTabs(doc = document, event = {}) {
	let selectors = doc.querySelectorAll('.tabs .tab-head');
	if (!selectors.length) return;

	selectors.forEach(function (el) {
		let wrap   = el.closest('.tabs'),
			index  = el.getAttribute('data-index'),
			tab    = wrap.querySelector('.tab-content[data-index="' + index + '"]'),
			slide  = wrap.querySelector('.product-main-slide:nth-child(' + index + ')'), // slide tương ứng
			arrows = wrap.querySelector('.unity-arrows[data-index="' + index + '"]');

		if (!tab) return;

		// Design mode.
		if (Shopify.designMode && Object.keys(event).length) {
			let currentTab = doc.querySelector('.tab-head[data-id="' + event.detail.blockId + '"]');
			if (currentTab) currentTab.click();
		}

		el.addEventListener('click', function () {

			if (el.classList.contains('active')) return;

			let navActived    = wrap.querySelector('.tab-head.active'),
				tabActived    = wrap.querySelector('.tab-content.active'),
				slideActived  = wrap.querySelector('.product-main-slide.active'),
				arrowsActived = wrap.querySelector('.unity-arrows.active');

			// Remove active
			if (navActived) navActived.classList.remove('active');
			if (tabActived) tabActived.classList.remove('active');
			if (slideActived) slideActived.classList.remove('active');
			if (arrowsActived) arrowsActived.classList.remove('active');

			// Add active
			el.classList.add('active');
			tab.classList.add('active');
			if (slide) slide.classList.add('active');
			if (arrows) arrows.classList.add('active');
		});
	});

	// Dropdown
	let dropdown = doc.querySelectorAll('.dropdown-content li');
	if (dropdown.length) {
		dropdown.forEach(function (el) {
			el.addEventListener('click', function () {
				let parent  = el.closest('.tabs'),
					current = parent.querySelector('.tab-head[data-index="' + el.getAttribute('data-index') + '"]');
				if (!current) return;

				current.click();
			});
		});
	}
}


// Video.
function btyVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.video-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let imageWrapper = el.querySelector( '.video-image-wrapper' );

			if ( ! imageWrapper ) {
				return;
			}

			let playBtn = el.querySelector('.play-video');
			if (playBtn) {
				playBtn.addEventListener('click', function(e) {
					e.preventDefault();
					imageWrapper.click();
				});
			}

			imageWrapper.addEventListener(
				'click',
				function() {
					let iframe = el.querySelector( 'iframe' ),
						video  = el.querySelector( 'video' );

					if ( iframe ) {
						iframe.src = iframe.getAttribute( 'data-src' );

						btyMediaAction( el, 'play' );
					}

					if ( video ) {
						video.setAttribute( 'data-ready', '' );

						let playPromise = video.play();
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				}
			);
		}
	);
}

// Video background.
function btyBackgroundVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.toggle-popup-bg-video' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			el.addEventListener(
				'click',
				function() {
					let section = el.closest( '.video-background-section' ),
						popup   = section ? section.querySelector( '.background-video-popup' ) : false,
						iframe  = popup ? popup.querySelector( 'iframe' ) : false,
						video   = popup ? popup.querySelector( 'video' ) : false;

					if ( ! popup ) {
						return;
					}

					document.documentElement.classList.add( 'bg-video-popup-open' );
					btyClosePopup( 'bg-video-popup-open', popup );

					if ( iframe ) {
						iframe.src = iframe.getAttribute( 'data-src' );

						btyMediaAction( popup, 'play' );
					}

					if ( video ) {
						video.setAttribute( 'data-ready', '' );

						let playPromise = video.play();
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				}
			);
		}
	);
}

// Action for media.
function btyMediaAction( doc = document, type = 'pause' ) {
	let video = doc.querySelectorAll( '.js-youtube, .js-vimeo, video' );
	if ( ! video.length ) {
		return;
	}

	let youtubeFunc = 'stopVideo';

	switch ( type ) {
		case 'pause':
			youtubeFunc = 'pauseVideo';
			break;
		case 'play':
			youtubeFunc = 'playVideo';
			break;
		case 'stop':
			youtubeFunc = 'stopVideo';
			break;
	}

	if ( video.length ) {
		video.forEach(
			function( vd ) {
				if ( 'video' === vd.tagName.toLowerCase() ) {
					let playPromise = vd.play();

					if ( 'pause' === type ) {
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {
									vd.pause();
								}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					} else {
						if ( undefined !== playPromise ) {
							playPromise.then(
								function() {}
							).catch(
								function( error ) {
									console.log( error );
								}
							);
						}
					}
				} else if ( vd.classList.contains( 'js-youtube' ) ) {
					vd.contentWindow.postMessage( '{"event":"command","func":"' + youtubeFunc + '","args":""}', '*' );
				} else if ( vd.classList.contains( 'js-vimeo' ) ) {
					vd.contentWindow.postMessage( '{"method":"' + type + '"}', '*' );
				}
			}
		);
	}
}

// Address box section.
function btyAddress( doc =document ) {
	let selectors = doc.querySelectorAll( '.address-box .address-summary' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let items = el.querySelectorAll( '.summary-item' );
			if ( items.length < 2 ) {
				return;
			}

			items.forEach(
				function( im, index ) {
					im.addEventListener(
						'click',
						function( e ) {
							e.preventDefault();

							const mobile = window.matchMedia( '(max-width: 767px)' ).matches;

							let oldActive = el.querySelector( '.summary-item.active' ),
								subBox    = im.querySelector( '.address-sub' ),
								image     = el.parentNode.querySelector( '.address-content-inner' );

							if ( im.classList.contains( 'active' ) ) {
								return;
							}

							if ( oldActive ) {
								let oldSubBox = oldActive.querySelector( '.address-sub' );
								if ( oldSubBox && mobile ) {
									btySlideUp( oldSubBox );
								}
								oldActive.classList.remove( 'active' );
							}

							if ( image ) {
								image.setAttribute( 'data-level', index );
							}

							im.classList.add( 'active' );

							if ( subBox && mobile ) {
								btySlideDown( subBox );
							}
						}
					);
				}
			);
		}
	);
}

// Pickup availability.
function btyPickupAvailability( doc = document, variant_id = false, pickup = false ) {
	let panel = document.querySelector( '.pickup-availability-panel' );
	if ( ! pickup || ! panel ) {
		return;
	}

	fetch( '/variants/' + variant_id + '?section_id=pickup-availability' )
		.then(
			function( r ) {
				if ( 200 !== r.status ) {
					console.log( 'Status Code: ' + r.status );
					throw r;
				}

				return r.text();
			}
		).then(
			function( res ) {
				pickup.innerHTML = btyGetSectionHtml( res, '.pickup-availability-info', 'outer' );
				panel.innerHTML  = btyGetSectionHtml( res, '.pickup-availability-modal', 'outer' );

				let toggle = pickup.querySelector( '.toggle-modal' );
				if ( toggle ) {
					toggle.onclick = function() {
						document.documentElement.classList.add( 'pickup-availability-open' );

						btyClosePopup( 'pickup-availability-open', panel );
					}
				}
			}
		).catch(
			function( e ) {
				console.error( e );
			}
		);
}

// Pickup availability for simple product.
function btyPickupAvailabilityInit( doc = document ) {
	let variants = doc.querySelectorAll( '.product-variants' );
	if ( variants.length ) {
		return;
	}

	let inner     = doc.querySelector( '.product-summary-inner[data-selected-id]' ),
		pickup    = doc.querySelector( '.pickup-availability' ),
		productId = inner ? inner.getAttribute( 'data-selected-id' ) : false;

	if ( ! pickup || ! productId ) {
		return;
	}

	btyPickupAvailability( doc, productId, pickup );
}

// Popup content.
function btyProductPopup( doc = document ) {
	let selectors = doc.querySelectorAll( '.product-popup' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let summary = el.closest( '.product-summary' ),
				button  = el.querySelector( '.popup-toggle' ),
				view    = el.querySelector( '.popup-view' ),
				close   = el.querySelector( '.popup-close' );

			if ( ! summary || ! button || ! view || ! close ) {
				return;
			}

			button.onclick = function() {
				summary.classList.add( 'open' );

				// Target.
				view.onclick = function( e ) {
					if ( view !== e.target ) {
						return;
					}

					summary.classList.remove( 'open' );
				}

				// Use ESC key.
				document.addEventListener(
					'keyup',
					function( e ) {
						if ( 27 !== e.keyCode ) {
							return;
						}

						summary.classList.remove( 'open' );
					}
				);

				// Use close button.
				close.onclick = function() {
					summary.classList.remove( 'open' );
				}
			}
		}
	);
}

// Share button.
function btyProductShare( doc = document ) {
	let selector = doc.querySelector( '.product-share[data-os]' );
	if ( ! selector ) {
		return;
	}

	let button  = selector.querySelector( '.share-button' ),
		summary = selector.querySelector( 'summary' ),
		input   = selector.querySelector( '.field-input' ),
		message = selector.querySelector( '.share-message' ),
		copy    = selector.querySelector( '.share-button-copy' ),
		close   = selector.querySelector( '.share-button-close' );

	if ( ! button || ! summary || ! copy || ! close ) {
		return;
	}

	let closeAction = function() {
		summary.parentNode.removeAttribute( 'open' );
		close.classList.add( 'hidden' );
		message.classList.add( 'hidden' );
		message.textContent = '';
	}

	if ( navigator.share ) {
		button.classList.remove( 'hidden' );
		button.onclick = function() {
			navigator.share(
				{
					url: document.location.href,
					title: document.title
				}
			);
		}
	} else {
		summary.classList.remove( 'hidden' );

		copy.onclick = function() {
			navigator.clipboard.writeText( input.value ).then(
				function() {
					message.classList.remove( 'hidden' );
					close.classList.remove( 'hidden' );

					message.textContent = btyStrings.general.share_success;
				}
			);
		}

		// Click any to close.
		document.addEventListener(
			'click',
			function( e ) {
				if ( e.target.closest( '.product-share' ) ) {
					return;
				}

				closeAction();
			}
		);

		// Use ESC key.
		document.addEventListener(
			'keyup',
			function( e ) {
				if ( 27 !== e.keyCode ) {
					return;
				}

				closeAction();
			}
		);

		// Close button.
		close.onclick = closeAction;
	}
}

// Sale notification.
function btySalesNotification( doc = document ) {
	let selector = doc.querySelector( '.sales-notification' );
	if ( ! selector ) {
		return;
	}

	let inner   = selector.querySelector( '.sn-inner' ),
		options = selector.querySelector( '[data-options]' ),
		items   = selector.querySelector( '[data-items]' );
	if ( ! inner || ! options || ! items ) {
		return;
	}

	let parseOptions = btyJsonParse( options.content.textContent ),
		parseItems   = new DOMParser().parseFromString( items.innerHTML, 'text/html' );

	// Remove html template.
	options.remove();
	items.remove();

	let length = parseItems.querySelectorAll( '.sn-item' );
	if ( ! length.length ) {
		return;
	}

	// Get random item in array.
	const randomItem = function( arr = [] ) {
		return arr[ Math.floor( Math.random() * arr.length ) ];
	}

	// Display function.
	const displayFn = function() {
		let item     = randomItem( length ),
			time     = item.querySelector( '.sn-time' ),
			customer = item.querySelector( '.sn-customer' );

		// Append time text.
		if ( time ) {
			time.innerText = randomItem( parseOptions.virtual_times );
		}

		// Append customer text.
		if ( customer ) {
			customer.innerText = randomItem( parseOptions.virtual_customers ) + parseOptions.purchased;
		}

		inner.innerHTML = item.outerHTML;

		let current = inner.querySelector( '.sn-item' );
		if ( ! current ) {
			return;
		}

		// Set animation.
		setTimeout(
			function() {
				current.classList.add( 'active' );
			},
			50
		);

		// Start loading bar when animation end.
		setTimeout(
			function() {
				current.insertAdjacentHTML( 'beforeend', '<span class="underline-animated' + ( parseOptions.loading_bar ? '' : ' visibility-hidden' ) + '"></span>' );

				// Remove notification after animation end.
				let animation = current.querySelector( '.underline-animated' );
				if ( animation ) {
					animation.addEventListener(
						'animationend',
						function() {
							current.classList.add( 'down' );
						}
					);
				}
			},
			300
		);

		// Remove notification by click to Close button.
		let closeBtn = current.querySelector( '.sn-close' );
		if ( closeBtn ) {
			closeBtn.onclick = function() {
				current.classList.add( 'down' );
			}
		}
	}

	let init, timeTotal = parseOptions.time_total * 1000;
	setTimeout(
		function() {
			displayFn();

			init = setInterval( displayFn, timeTotal );
		},
		( parseOptions.time_init * 1000 )
	);
}

// Newsletter popup.
function btyNewsletterPopup( doc = document ) {
	let form = doc.querySelector( '.newsletter-popup-form' );
	if ( ! form ) {
		return;
	}

	let delay = form.getAttribute( 'data-delay' );

	setTimeout(
		function() {
			// Always show popup when Display mode set to Test mode.
			if ( Shopify.designMode && '' === form.getAttribute( 'data-mode' ) ) {
				form.parentNode.classList.add( 'closed' );
			} else {
				if ( 'test' === form.getAttribute( 'data-mode' ) ) {
					form.parentNode.classList.remove( 'closed' );
				} else {
					if ( form.classList.contains( 'first-visit' ) ) {
						const getCookie = new URLSearchParams( document.cookie.replaceAll( '&', '%26' ).replaceAll( '; ', '&' ) );
						if ( ! getCookie.get( 'newsletter-popup-cookie' ) ) {
							form.parentNode.classList.remove( 'closed' );
						}

						function setCookie( cname, cvalue, exdays ) {
							let d = new Date();

							d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000) );

							let expires = 'expires=' + d.toUTCString();

							document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
						}

						setCookie( 'newsletter-popup-cookie', 1, 30 );
					} else {
						form.parentNode.classList.remove( 'closed' );
					}
				}
			}

			const isAgeVerification = form.closest( '.age-verification-section' ) !== null;

			// Click to popup overlay.
			if ( ! isAgeVerification ) {
				form.addEventListener('click', function ( e ) {
					if ( e.target !== form ) return;
					form.parentNode.classList.add( 'closed' );
				});

				// Use ESC key.
				document.addEventListener('keyup', function ( e ) {
					if ( e.keyCode !== 27 ) return;
						form.parentNode.classList.add( 'closed' );
					});
				}

				// Use close buttons.
				const section = form.closest('.newsletter-popup-section');

				form.querySelectorAll('.close-button').forEach(btn => {
					btn.addEventListener('click', function (e) {
						e.preventDefault();
						e.stopPropagation();
						section.classList.add('closed');
					});
				});
			},
		Number( delay )
	);
}

// Age verification popup.
function btyAgeverificationPopup(doc = document) {
	// Function to check the cookies.
	function checkAgeVerification() {
		const cookieString = doc.cookie && doc.cookie.split('; ').find(row => row.startsWith('acceptAgeVerification='));
		if ( ! cookieString || Shopify.designMode ) {
			let allowSection = doc.querySelector( ".age-verification-section .allow" );
			if (allowSection) {
				allowSection.classList.remove( "hidden" );
			}
		}
	}

	// Function to set the cookie.
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = "expires=" + d.toUTCString();
		doc.cookie = `${name}=${value};${expires};path=/`;
	}

	// Check and attach event to the "Yes" button.
	let yesBtn = doc.querySelector( ".age-verification-section .yes-btn" );

	if (yesBtn) {
		yesBtn.addEventListener("click", function () {
			let allowSection = doc.querySelector( ".age-verification-section .allow" );
			if (allowSection) {
				allowSection.classList.add( "hidden" );
			}
			// Add 'closed' class and set cookie when clicking "Yes".
			let form = doc.querySelector( '.age-verification-section .newsletter-popup-form' );
			if (form) {
				form.parentNode.classList.add( 'closed' );
			}
			setCookie( 'acceptAgeVerification', 1, 30 );
		});
	}

	// Check and attach event to the "No" button.
	let noBtn = doc.querySelector( ".age-verification-section .no-btn" );
	if (noBtn) {
		noBtn.addEventListener("click", function () {
			let allowSection    = doc.querySelector( ".age-verification-section .allow" );
			let notAllowSection = doc.querySelector( ".age-verification-section .not-allow" );
			if (allowSection && notAllowSection) {
				allowSection.classList.add( "hidden" );
				notAllowSection.classList.remove( "hidden" );
			}
		});
	}

	// Check and attach event to the "Back" button.
	let backBtn = doc.querySelector( ".age-verification-section .back-btn" );
	if (backBtn) {
		backBtn.addEventListener("click", function () {
			let notAllowSection = doc.querySelector( ".age-verification-section .not-allow" );
			let allowSection    = doc.querySelector( ".age-verification-section .allow" );
			if (notAllowSection && allowSection) {
				notAllowSection.classList.add( "hidden" );
				allowSection.classList.remove( "hidden" );
			}
		});
	}

	// Call the cookie check function.
	checkAgeVerification();
}

// Cookies bar.
function btyCookiesBar( doc = document ) {
	let box    = doc.querySelector( '.cookies-bar' ),
		button = doc.querySelector( '.button-cookies' );

	if ( ! box || ! button || ( Shopify.designMode && '' === box.getAttribute( 'data-mode' ) ) ) {
		return;
	}

	const getCookie = new URLSearchParams( document.cookie.replaceAll( '&', '%26' ).replaceAll( '; ', '&' ) );
	if ( ! getCookie.get( 'acceptCookies' ) ) {
		box.classList.add( 'show' );
	}

	function setCookie( cname, cvalue, exdays ) {
		let d = new Date();

		d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000) );

		let expires = 'expires=' + d.toUTCString();

		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	button.onclick = function () {
		if ( '' === box.getAttribute( 'data-mode' ) ) {
			setCookie( 'acceptCookies', 1, 30 );
		} else {
			document.cookie = 'acceptCookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		}

		box.classList.remove( 'show' );
	}
}

// Hover media video.
function btyHoverMediaVideo( doc = document ) {
	let selectors = doc.querySelectorAll( '.hover-media-video' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			let parent = el.parentNode;

			parent.addEventListener(
				'mousemove',
				function( e ) {
					btyMediaAction( parent, 'play' );

					return;
				}
			);

			parent.addEventListener(
				'mouseleave',
				function( e ) {
					btyMediaAction( parent, 'pause' );

					return;
				}
			);
		}
	);
}

// Animation for image load.
function btyAnimationImageLoad( doc = document, delay = 0 ) {
	let images = doc.querySelectorAll( '.lazy-image img' );
	if ( ! images.length ) {
		return;
	}

	const imgLazyObserver = new IntersectionObserver(
		function( entries, observer ) {
			entries.forEach(
				function( entry ) {
					if ( entry.isIntersecting ) {
						if ( entry.target.dataset.src ) {
							entry.target.src = entry.target.dataset.src;
						}

						if ( entry.target.dataset.srcSet ) {
							entry.target.srcSet = entry.target.dataset.srcSet;
						} else if ( entry.target.dataset.srcset ) {
							entry.target.setAttribute( 'srcset', entry.target.dataset.srcset );
						}

						entry.target.removeAttribute( 'data-src' );
						entry.target.removeAttribute( 'data-srcset' );

						entry.target.addEventListener(
							'load',
							function () {
								entry.target.parentNode.classList.add( 'lazy-loaded' );
							}
						);

						observer.unobserve( entry.target );
					}
				}
			);
		},
		{
			rootMargin: '-20px 0px -20px 0px'
		}
	);

	images.forEach(
		function( img ) {
			if ( img.parentNode.classList.contains( 'lazy-loaded' ) ) {
				return;
			}

			imgLazyObserver.observe( img );
		}
	);
}

// Animation for animated-image-collage.
function btyAnimationCollageLoad(doc = document) {
	const sections = doc.querySelectorAll( '.collection-list-section' );

	if ( sections.length === 0 ) {
		return;
	}

	const observer = new IntersectionObserver(( entries, obs ) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const section = entry.target;

				section.querySelectorAll( '.lazy-image img' ).forEach(( img ) => {
					if (img.dataset.src) {
						img.src = img.dataset.src;
					}
					if (img.dataset.srcset) {
						img.srcset = img.dataset.srcset;
					}
					img.removeAttribute( 'data-src' );
					img.removeAttribute( 'data-srcset' );

					if (img.parentNode) {
						img.parentNode.classList.add( 'lazy-loaded' );
					}
				});

				obs.unobserve( section );
			}
		});
	}, { rootMargin: '50px' });

	sections.forEach(( section ) => observer.observe( section ));
}

// Collection sticky.
function btyCollectionSticky( doc = document ) {
	let items = doc.querySelectorAll( '.collection-sticky' );
	if ( ! items.length ) {
		return
	}

	const stickCollection = function() {
		items.forEach(
			function( el ) {
				let box        = el.querySelector( '.heading-box' ),
					subHeading = box ? box.querySelector( '.sub-heading .dynamic-label' ) : false,
					heading    = box ? box.querySelector( '.heading .dynamic-label' ) : false,
					button     = box ? box.querySelector( '.collection-list-button .dynamic-label' ) : false,
					cards      = el.querySelectorAll( '.card-item' );
				if ( ! cards.length ) {
					return;
				}

				for ( let i = 0, j = cards.length; i < j; i++ ) {
					let rect    = cards[i].getBoundingClientRect(),
						index   = i + 1,
						current = el.querySelector( '.card-item:nth-child(' + index + ')' );

					if ( ! current ) {
						return;
					}

					let title          = current.getAttribute( 'data-title' ),
						dataSubHeading = current.getAttribute( 'data-subheading' ),
						dataHeading    = current.getAttribute( 'data-heading' ),
						href           = current.getAttribute( 'data-href' );
					if ( rect.top <= 1 && ( rect.top >= rect.height * -1 ) ) {
						if ( button && button.innerText != title ) {
							if ( href.trim() ) {
								button.parentNode.href = href;
							}

							if ( title.trim() ) {
								button.innerText = title;
							}

							button.parentNode.classList.add( 'bounce-it' );
							setTimeout(
								function() {
									button.parentNode.classList.remove( 'bounce-it' );
								},
								1000
							);
						}

						if ( dataSubHeading.trim() && subHeading ) {
							subHeading.innerText = dataSubHeading;
						}

						if ( dataHeading.trim() && heading ) {
							heading.innerText = dataHeading;
						}
					}
				}
			}
		);
	}

	stickCollection();

	// Trigger.
	window.addEventListener(
		'scroll',
		function() {
			stickCollection();
		}
	);
}

// Recipient form.
function btyRecipientForm( doc = document ) {
	let input  = doc.querySelector( '.recipient-checkbox-label input[type="checkbox"]' ),
		fields = doc.querySelector( '.recipient-fields' );

	if ( ! input || ! fields ) {
		return;
	}

	input.onchange = function() {
		if ( input.checked ) {
			fields.classList.add( 'open' );
		} else {
			fields.classList.remove( 'open' );
		}
	}
}

// Load media.
function btyLoadMedia( selector = undefined, action = 'play' ) {
	if ( ! selector ) {
		return;
	}

	let wrapper = selector.querySelector( '.media-preview-wrap' ),
		playBtn = selector.querySelector( '.view-media' );

	if ( ! playBtn ) {
		return;
	}

	// Return if media loaded.
	if ( wrapper.classList.contains( 'media-loaded' ) ) {
		btyMediaAction( wrapper, action );

		return;
	}

	// Play current video.
	btyMediaAction( wrapper, action );

	if ( selector.hasAttribute( 'data-model' ) ) {
		return;
	}

	let template = selector.querySelector( 'template' ),
		mediaDiv = wrapper.querySelector( '.media-content' );

	if ( ! mediaDiv ) {
		wrapper.classList.add( 'media-loaded' );

		if ( template ) {
			wrapper.insertAdjacentHTML( 'beforeend', '<div class="media-content">' + template.innerHTML + '</div>' );
		}
	}

	// Remove model after loaded, inside <template> tag.
	if ( template ) {
		template.remove();
	}
}

// Load media on desktop.
function btyMediaDesktop( doc = document ) {
	let selectors = doc.querySelectorAll( '.main-item' );
	if ( ! selectors.length ) {
		return;
	}

	selectors.forEach(
		function( el ) {
			if ( el.hasAttribute( 'data-model' ) ) {
				return;
			}

			el.addEventListener(
				'click',
				function() {
					btyLoadMedia( el, 'play' );
				}
			);
		}
	);
}

// Scroll to top.
function btyScrollToTop() {
	let myButton = document.getElementById( 'btnScrollToTop' );

	if ( ! myButton ) {
		return;
	}

	window.onscroll = function() {
		// Display after 400px height.
		if ( window.pageYOffset >= 400 ) {
			myButton.style.display = 'block';
		} else {
			myButton.style.display = 'none';
		}
	}

	// Onclick function.
	myButton.addEventListener(
		'click',
		function() {
			window.scrollTo(
				{
					top: 0,
					left: 0,
					behavior: "smooth"
				}
			);
		}
	);
}

// Open localization form.
function btyToggleLocalization() {
	let toggles = document.querySelectorAll( '.localization-selector' ),
		form    = document.querySelector( '.localization-form-wrapper' );

	if ( ! toggles.length || ! form ) {
		return;
	}

	// Toggle localization form.
	toggles.forEach(
		function ( el ) {
			el.onclick = function ( e ) {
				e.preventDefault();

				document.documentElement.classList.add( 'localization-form-open' );

				btyClosePopup( 'localization-form-open', form );
				let closeButton = form.querySelector( '.close-button' );
				if ( closeButton ) {
					setTimeout(
						function() {
							closeButton.focus();
						},
						400
					);
				}

			}
		}
	);

}

function btySubmitLocalization( doc = document ) {
	let forms = doc.querySelectorAll( '.localization-form' );
	if ( ! forms.length ) {
		return;
	}

	forms.forEach(
		function( form ) {
			let select = form.querySelectorAll( 'select' );
			if ( ! select.length ) {
				return;
			}

			select.forEach(
				function( el ) {
					el.addEventListener(
						'change',
						function() {
							form.submit();
						}
					);
				}
			);
		}
	);
}

// Popup focus.
function btyTrapFocus( container, firstFocusableElement ) {
	const focusableElements = container.querySelectorAll(
		'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
	);

	const firstElement = firstFocusableElement || focusableElements[0];
	const lastElement  = focusableElements[focusableElements.length - 1];

	function handleKeyDown(e) {
		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
	}

	container.addEventListener( 'keydown', handleKeyDown );
}

// DOM Loaded.
document.addEventListener(
	'DOMContentLoaded',
	function() {
		btyAccordionHover();
		btyScrollBar();
		btyRecipientForm();
		btyNewsletterPopup();
		btyAgeverificationPopup();
		btyToggleDetails();
		btyQuickAdd();
		btyHoverMediaVideo();
		btyCollectionSticky();
		btyAnimationImageLoad();
		btyAnimationCollageLoad();
		btyAccountPopup();
		btySplitSlider();
		btyProductTabs();
		btyCountdownTime();
		btyNavMenu();
		btyCookiesBar();
		btyQuantityButton();
		btySideCart();
		btyQuickSearch();
		btyCheckInventoryOnLoad();
		btyAddToCart();
		btyAddMultiProductToCart();
		btyUpdateProductQuantity();
		btyQuickView();
		btyQuickViewVariants();
		btySwatch();
		btyAccordionHandle();
		btyToggleDropdown();
		btyVideo();
		btyBackgroundVideo();
		btyAddress();
		btyPickupAvailabilityInit();
		btyProductVariants();
		btyProductPopup();
		btyProductShare();
		btyScrollAnimationTrigger();
		btyHeaderSticky();
		btyMediaDesktop();
		btyMinicartRecommendations();
		btySideCartPopupOuter();
		btyFeaturedProductSlider();
		btyShortDescription();
		btyScrollToTop();
		btyAgreeToTerms();
		btyUpdateProgressBarCart();
		btyToggleNavMenu();
		btyToggleLocalization();
		btySubmitLocalization();
		btyFooterAccordion();
		btyAddElementClass();
		setupThumbProgress();

		window.addEventListener(
			'resize',
			function() {
				btyHeaderSticky();
				btyFooterAccordion();
				btyAddElementClass();
				btySplitSlider();
				btyMediaDesktop();
			}
		);

		window.addEventListener(
			'scroll',
			function() {
				btyHeaderSticky();
				btyScrollingDetect();
				btyAnimationImageLoad();
				btyAnimationCollageLoad();
			}
		);
	}
);

// Design mode event.
document.addEventListener(
	'shopify:section:load',
	function( e ) {
		let section = e.target;

		btySplitSlider( section );
		btyAccordionHover( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyCountdownTime( section );
		btyProductTabs( section );
		btyAccordionHandle( section );
		btyToggleDropdown( section );
		btyVideo( section );
		btyBackgroundVideo( section );
		btyAddress( section );
		btyProductVariants( section );
		btyProductPopup( section );
		btyProductShare( section );
		btyCollectionSticky( section );
		btyQuantityButton( section );
		btyScrollAnimationTrigger( section, true );
		btyMinicartRecommendations( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btySideCartPopupOuter( section );
		btyFeaturedProductSlider( section );
		btyToggleNavMenu( section );
		btyToggleLocalization( section );
		btySubmitLocalization( section );
		btyQuickView();
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
		setupThumbProgress( section );

		console.log( 'Section load.' );
	}
);
document.addEventListener(
	'shopify:section:select',
	function( e ) {
		let section = e.target;

		btySplitSlider( section );
		btyAccordionHover( section );
		btyQuickSearch();
		btyCookiesBar( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyNavMenu( section, e );
		btyToggleDropdown( section );
		btyProductTabs( section );
		btyCountdownTime( section );
		btyAccordionHandle( section );
		btyVideo( section );
		btyBackgroundVideo( section );
		btyAddress( section );
		btyProductVariants( section );
		btyProductPopup( section );
		btyProductShare( section );
		btyAccountPopup( section );
		btyQuickAdd( section );
		btyScrollBar( section );
		btyHoverMediaVideo( section );
		btySwatch( section );
		btyCollectionSticky( section );
		btyCheckInventoryOnLoad( section );
		btyAddToCart( section );
		btyAddMultiProductToCart( section );
		btyQuantityButton( section );
		btyMinicartRecommendations( section );
		btySideCartPopupOuter( section );
		btyFeaturedProductSlider( section );
		btyShortDescription( section );
		btyToggleNavMenu( section );
		btyToggleLocalization( section );
		btySubmitLocalization( section );
		setupThumbProgress( section );
		btyQuickView();
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
		console.log( 'Section select.' );
	}
);
document.addEventListener(
	'shopify:block:select',
	function( e ) {
		console.log( 'Block select.' );

		let section = document.getElementById( 'shopify-section-' + e.detail.sectionId );
		if ( ! section ) {
			return;
		}

		btySplitSlider( section );
		btyAccordionHover( section );
		btyNewsletterPopup( section );
		btyAgeverificationPopup( section );
		btyAnimationImageLoad( section );
		btyAnimationCollageLoad( section );
		btyProductVariants( section );
		btyProductTabs( section, e );
		btyCollectionSticky( section );
		btyMinicartRecommendations( section );
		btySideCartPopupOuter( section );
		btyShortDescription( section );
		btyQuickView( section );
		btyQuickViewVariants();
		btyFooterAccordion();
		btyAddElementClass();
	}
);
document.addEventListener(
	'shopify:section:reorder',
	function( e ) {
		let section = e.target;

		btyScrollAnimationTrigger( section, true );

		console.log( 'Section reorder.' );
	}
);
