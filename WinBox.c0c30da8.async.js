"use strict";(self.webpackChunkcreate_chart=self.webpackChunkcreate_chart||[]).push([[9463],{39752:function(wi,Q,v){v.r(Q),v.d(Q,{default:function(){return o}});var ei=v(97857),U=v.n(ei),_=v(5574),V=v.n(_),X=v(13769),z=v.n(X),D=v(67294),si=v(82052),ri=v(94184),y=v.n(ri),fi=v(33818),ai=v.n(fi),h=v(88192),d=v(85893),r=["widthRate","heightRate"],t=(0,D.forwardRef)(function(l,W){var C=l.widthRate,g=C===void 0?[.3,.6]:C,b=l.heightRate,E=b===void 0?[.3,.6]:b,j=z()(l,r),p=(0,si.Z)(function(){return document.body})||{},a=p.width,P=a===void 0?0:a,f=p.height,F=f===void 0?0:f,li=(0,D.useState)(!0),x=V()(li,2),e=x[0],H=x[1],hi=(0,h.RB)(),di=V()(hi,3),q=di[0],i=di[2],n=(0,D.useRef)(null);return(0,D.useImperativeHandle)(W,function(){return{open:function(){H(function(u){return!u})}}},[]),e?null:(0,d.jsx)(ai(),U()(U()({minWidth:Math.max(P*g[0],350),minHeight:F*E[0],maxWidth:P*g[1],maxHeight:F*E[1],x:"right",y:"bottom",ref:n},j),{},{className:y()(l.className,"modern"),background:"linear-gradient(90deg, ".concat(q,", ").concat(i,")"),hide:e,onClose:function(){H(!0)}}))}),o=t},33818:function(wi,Q,v){var ei=this&&this.__extends||function(){var h=function(d,r){return h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(t[l]=o[l])},h(d,r)};return function(d,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");h(d,r);function t(){this.constructor=d}d.prototype=r===null?Object.create(r):(t.prototype=r.prototype,new t)}}(),U=this&&this.__assign||function(){return U=Object.assign||function(h){for(var d,r=1,t=arguments.length;r<t;r++){d=arguments[r];for(var o in d)Object.prototype.hasOwnProperty.call(d,o)&&(h[o]=d[o])}return h},U.apply(this,arguments)},_=this&&this.__createBinding||(Object.create?function(h,d,r,t){t===void 0&&(t=r),Object.defineProperty(h,t,{enumerable:!0,get:function(){return d[r]}})}:function(h,d,r,t){t===void 0&&(t=r),h[t]=d[r]}),V=this&&this.__setModuleDefault||(Object.create?function(h,d){Object.defineProperty(h,"default",{enumerable:!0,value:d})}:function(h,d){h.default=d}),X=this&&this.__importStar||function(h){if(h&&h.__esModule)return h;var d={};if(h!=null)for(var r in h)r!=="default"&&Object.prototype.hasOwnProperty.call(h,r)&&_(d,h,r);return V(d,h),d},z=this&&this.__importDefault||function(h){return h&&h.__esModule?h:{default:h}};Object.defineProperty(Q,"__esModule",{value:!0});var D=v(85893),si=X(v(67294)),ri=z(v(7159)),y=z(v(73935)),fi=function(h){ei(d,h);function d(r){var t=h.call(this,r)||this;return t.cdmCount=0,t.checkReactVersionGE18=function(){var o=parseInt(si.default.version.split(".")[0]);return o>=18},t.getId=function(){var o;return(o=t.winBoxObj)===null||o===void 0?void 0:o.id},t.getIndex=function(){var o;return(o=t.winBoxObj)===null||o===void 0?void 0:o.index},t.getPosition=function(){if(t.winBoxObj)return{x:t.winBoxObj.x,y:t.winBoxObj.y}},t.getSize=function(){if(t.winBoxObj)return{width:t.winBoxObj.width,height:t.winBoxObj.height}},t.getSizeLimit=function(){if(t.winBoxObj)return{minWidth:t.winBoxObj.minwidth,minHeight:t.winBoxObj.minheight,maxWidth:t.winBoxObj.maxwidth,maxHeight:t.winBoxObj.maxheight}},t.getViewportBoundary=function(){if(t.winBoxObj)return{top:t.winBoxObj.top,right:t.winBoxObj.right,bottom:t.winBoxObj.bottom,left:t.winBoxObj.left}},t.isFocused=function(){var o,l;return(l=(o=t.winBoxObj)===null||o===void 0?void 0:o.focused)!==null&&l!==void 0?l:!1},t.isHidden=function(){var o,l;return(l=(o=t.winBoxObj)===null||o===void 0?void 0:o.hidden)!==null&&l!==void 0?l:!1},t.isMax=function(){var o,l;return(l=(o=t.winBoxObj)===null||o===void 0?void 0:o.max)!==null&&l!==void 0?l:!1},t.isMin=function(){var o,l;return(l=(o=t.winBoxObj)===null||o===void 0?void 0:o.min)!==null&&l!==void 0?l:!1},t.isFullscreen=function(){var o,l;return(l=(o=t.winBoxObj)===null||o===void 0?void 0:o.full)!==null&&l!==void 0?l:!1},t.isClosed=function(){return t.state.closed},t.focus=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.focus()},t.blur=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.blur()},t.minimize=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.minimize()},t.maximize=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.maximize()},t.fullscreen=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.fullscreen()},t.restore=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.restore()},t.hide=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.hide()},t.show=function(){var o;(o=t.winBoxObj)===null||o===void 0||o.show()},t.maintainStyle=function(){t.winBoxObj&&(t.winBoxObj[t.props.noAnimation?"addClass":"removeClass"]("no-animation"),t.winBoxObj[t.props.noClose?"addClass":"removeClass"]("no-close"),t.winBoxObj[t.props.noFull?"addClass":"removeClass"]("no-full"),t.winBoxObj[t.props.noMin?"addClass":"removeClass"]("no-min"),t.winBoxObj[t.props.noMax?"addClass":"removeClass"]("no-max"),t.winBoxObj[t.props.noMove?"addClass":"removeClass"]("no-move"),t.winBoxObj[t.props.noHeader?"addClass":"removeClass"]("no-header"),t.winBoxObj[t.props.noResize?"addClass":"removeClass"]("no-resize"),t.winBoxObj[t.props.noShadow?"addClass":"removeClass"]("no-shadow"),t.winBoxObj[t.props.modal?"addClass":"removeClass"]("modal"),t.winBoxObj[t.props.hide?"addClass":"removeClass"]("hide"))},t.maintain=function(o){var l,W,C,g,b,E,j,p,a,P,f,F;if(t.winBoxObj){var li=o!=null?o:{},x=li.force,e=li.prevProps;if((x||(e==null?void 0:e.title)!==t.props.title)&&typeof t.props.title=="string"&&t.winBoxObj.setTitle(t.props.title),(x||(e==null?void 0:e.icon)!==t.props.icon)&&typeof t.props.icon=="string"&&t.winBoxObj.setIcon(t.props.icon),(x||(e==null?void 0:e.url)!==t.props.url)&&t.props.url!=null&&t.winBoxObj.setUrl(t.props.url),(x||(e==null?void 0:e.background)!==t.props.background)&&t.props.background!=null&&t.winBoxObj.setBackground(t.props.background),x||(e==null?void 0:e.minWidth)!==t.props.minWidth||(e==null?void 0:e.minHeight)!==t.props.minHeight||(e==null?void 0:e.maxWidth)!==t.props.maxWidth||(e==null?void 0:e.maxHeight)!==t.props.maxHeight){var H=(l=t.props.minWidth)!==null&&l!==void 0?l:t.winBoxObj.minwidth,hi=(W=t.props.minHeight)!==null&&W!==void 0?W:t.winBoxObj.minheight,di=(C=t.props.maxWidth)!==null&&C!==void 0?C:t.winBoxObj.maxwidth,q=(g=t.props.maxHeight)!==null&&g!==void 0?g:t.winBoxObj.maxheight;t.winBoxObj.minwidth=H,t.winBoxObj.minheight=hi,t.winBoxObj.maxwidth=di,t.winBoxObj.maxheight=q}if(x||(e==null?void 0:e.width)!==t.props.width||(e==null?void 0:e.height)!==t.props.height){var i=(b=t.props.width)!==null&&b!==void 0?b:t.winBoxObj.width,n=(E=t.props.height)!==null&&E!==void 0?E:t.winBoxObj.height;t.winBoxObj.resize(i,n)}if(x||(e==null?void 0:e.x)!==t.props.x||(e==null?void 0:e.y)!==t.props.y){var s=(j=t.props.x)!==null&&j!==void 0?j:t.winBoxObj.x,u=(p=t.props.y)!==null&&p!==void 0?p:t.winBoxObj.y;t.winBoxObj.move(s,u)}if((x||(e==null?void 0:e.top)!==t.props.top||(e==null?void 0:e.right)!==t.props.right||(e==null?void 0:e.bottom)!==t.props.bottom||(e==null?void 0:e.left)!==t.props.left)&&(t.winBoxObj.top=(a=t.props.top)!==null&&a!==void 0?a:t.winBoxObj.top,t.winBoxObj.right=(P=t.props.right)!==null&&P!==void 0?P:t.winBoxObj.right,t.winBoxObj.bottom=(f=t.props.bottom)!==null&&f!==void 0?f:t.winBoxObj.bottom,t.winBoxObj.left=(F=t.props.left)!==null&&F!==void 0?F:t.winBoxObj.left,t.winBoxObj.move()),(x||(e==null?void 0:e.fullscreen)!==t.props.fullscreen)&&t.props.fullscreen!=null&&t.winBoxObj.fullscreen(t.props.fullscreen),(x||(e==null?void 0:e.min)!==t.props.min)&&t.props.min!=null&&t.winBoxObj.minimize(t.props.min),(x||(e==null?void 0:e.max)!==t.props.max)&&t.props.max!=null&&t.winBoxObj.maximize(t.props.max),x||(e==null?void 0:e.className)!==t.props.className){if((e==null?void 0:e.className)!=null)for(var c=e.className.replaceAll(/\s+/g," ").split(" ").filter(function(B){return B!=""}),m=0,O=c;m<O.length;m++){var M=O[m];t.winBoxObj.hasClass(M)&&t.winBoxObj.removeClass(M)}if(t.props.className!=null)for(var c=t.props.className.replaceAll(/\s+/g," ").split(" ").filter(function(L){return L!=""}),k=0,Y=c;k<Y.length;k++){var M=Y[k];t.winBoxObj.hasClass(M)||t.winBoxObj.addClass(M)}}(x||(e==null?void 0:e.customControls)!==t.props.customControls&&!ai(e==null?void 0:e.customControls,t.props.customControls))&&((e==null?void 0:e.customControls)!=null&&e.customControls.filter(function(B){return typeof B=="object"&&B.class}).forEach(function(B){return t.winBoxObj.removeControl(B.class)}),t.props.customControls!=null&&t.props.customControls.filter(function(B){return typeof B=="object"&&B.class}).forEach(function(B){return t.winBoxObj.addControl(B)})),t.maintainStyle()}},t.handleClose=function(){t.winBoxObj=void 0,t.setState({closed:!0})},t.state={closed:!1},t.winBoxObj=void 0,t}return d.prototype.componentDidMount=function(){var r=this,t,o,l,W,C,g,b,E,j;if(this.cdmCount++,!(this.checkReactVersionGE18()&&this.cdmCount>=2))try{if(this.props.id!==void 0&&this.props.id!==null&&document.getElementById(this.props.id))throw"duplicated window id";this.winBoxObj=ri.default.new(U(U({width:300,height:200,top:0,bottom:0,left:0,right:0,hidden:this.props.hide},this.props),{minwidth:(t=this.props.minWidth)!==null&&t!==void 0?t:150,maxwidth:(o=this.props.maxWidth)!==null&&o!==void 0?o:2147483647,minheight:(l=this.props.minHeight)!==null&&l!==void 0?l:35,maxheight:(W=this.props.maxHeight)!==null&&W!==void 0?W:2147483647,max:!1,min:!1,fullscreen:!1,class:""+((C=this.props.className)!==null&&C!==void 0?C:""),onclose:function(p){var a,P,f,F;return!((P=(a=r.props).onClose)===null||P===void 0)&&P.call(a,p!=null?p:!1)||!((F=(f=r.props).onclose)===null||F===void 0)&&F.call(f,p!=null?p:!1)?!0:(r.handleClose(),!1)},onmove:(g=this.props.onMove)!==null&&g!==void 0?g:this.props.onmove,onresize:(b=this.props.onResize)!==null&&b!==void 0?b:this.props.onresize,onblur:(E=this.props.onBlur)!==null&&E!==void 0?E:this.props.onblur,onfocus:(j=this.props.onFocus)!==null&&j!==void 0?j:this.props.onfocus,oncreate:this.props.onCreate,onfullscreen:this.props.onFullscreen,onminimize:this.props.onMinimize,onmaximize:this.props.onMaximize,onrestore:this.props.onRestore,onhide:this.props.onHide,onshow:this.props.onShow})),setTimeout(function(){r.forceUpdate()})}catch(p){console.error(p)}},d.prototype.componentDidUpdate=function(r,t){this.maintain({prevProps:r})},d.prototype.componentWillUnmount=function(){var r=this,t,o;try{this.checkReactVersionGE18()?this.cdmCount<=1?setTimeout(function(){var l;r.cdmCount<=1&&((l=r.winBoxObj)===null||l===void 0||l.close(!0))},100):(t=this.winBoxObj)===null||t===void 0||t.close(!0):(o=this.winBoxObj)===null||o===void 0||o.close(!0)}catch(l){}},d.prototype.forceUpdate=function(r){try{this.maintain({force:!0})}catch(t){console.error(t)}h.prototype.forceUpdate.call(this,r)},d.prototype.render=function(){return Object.keys(this.props).indexOf("url")!==-1&&this.props.url||!this.winBoxObj||!this.winBoxObj.body?null:y.default.createPortal(D.jsx(D.Fragment,{children:this.props.children},void 0),this.winBoxObj.body)},d}(si.Component);Q.default=fi;function ai(h,d){var r=Object.keys,t=typeof h,o=typeof d;return h&&d&&t==="object"&&t===o?r(h).length===r(d).length&&r(h).every(function(l){return ai(h[l],d[l])}):h===d}},7159:function(wi,Q,v){v.r(Q),v.d(Q,{default:function(){return P}});const ei=document.createElement("div");ei.innerHTML="<div class=wb-header><div class=wb-control><span class=wb-min></span><span class=wb-max></span><span class=wb-full></span><span class=wb-close></span></div><div class=wb-drag><div class=wb-icon></div><div class=wb-title></div></div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";function U(i){return(i||ei).cloneNode(!0)}function _(i,n,s,u){i&&i.addEventListener(n,s,u||!1)}function V(i,n,s,u){i&&i.removeEventListener(n,s,u||!1)}function X(i,n){i.stopPropagation(),i.cancelable&&i.preventDefault()}function z(i,n){return i.getElementsByClassName(n)[0]}function D(i,n){i.classList.add(n)}function si(i,n){return i.classList.contains(n)}function ri(i,n){i.classList.remove(n)}function y(i,n,s){s=""+s,i["_s_"+n]!==s&&(i.style.setProperty(n,s),i["_s_"+n]=s)}function fi(i,n,s){s=""+s,i["_a_"+n]!==s&&(i.setAttribute(n,s),i["_a_"+n]=s)}function ai(i,n){i["_a_"+n]!==null&&(i.removeAttribute(n),i["_a_"+n]=null)}function h(i,n){const s=i.firstChild;s?s.nodeValue=n:i.textContent=n}const d=!1,r=[],t={capture:!0,passive:!0};let o,l=0,W=10,C,g,b,E,j,p;function a(i,n){if(!(this instanceof a))return new a(i);o||F();let s,u,c,m,O,M,k,Y,B,L,A,T,w,R,S,ti,I,oi,$,G,ii,N,Z,J,K,mi,pi,ni,ui,ci,bi,gi,ji,Oi,yi,Bi,Ci,_i,zi,Mi,Ri,Wi,Hi;if(i&&(n&&(O=i,i=n),typeof i=="string"?O=i:(s=i.id,u=i.index,c=i.root,m=i.template,O=O||i.title,M=i.icon,k=i.mount,Y=i.html,B=i.url,L=i.width,A=i.height,T=i.minwidth,w=i.minheight,R=i.maxwidth,S=i.maxheight,ti=i.autosize,Z=i.min,J=i.max,K=i.hidden,mi=i.modal,I=i.x||(mi?"center":0),oi=i.y||(mi?"center":0),$=i.top,G=i.left,ii=i.bottom,N=i.right,pi=i.background,ni=i.border,ui=i.header,ci=i.class,gi=i.onclose,ji=i.onfocus,Oi=i.onblur,yi=i.onmove,Bi=i.onresize,Ci=i.onfullscreen,_i=i.onmaximize,zi=i.onminimize,Mi=i.onrestore,Ri=i.onhide,Wi=i.onshow,Hi=i.onload)),this.dom=U(m),this.dom.id=this.id=s||"winbox-"+ ++l,this.dom.className="winbox"+(ci?" "+(typeof ci=="string"?ci:ci.join(" ")):"")+(mi?" modal":""),this.dom.winbox=this,this.window=this.dom,this.body=z(this.dom,"wb-body"),this.header=ui||35,pi&&this.setBackground(pi),ni?y(this.body,"margin",ni+(isNaN(ni)?"":"px")):ni=0,ui){const Si=z(this.dom,"wb-header");y(Si,"height",ui+"px"),y(Si,"line-height",ui+"px"),y(this.body,"top",ui+"px")}O&&this.setTitle(O),M&&this.setIcon(M),k?this.mount(k):Y?this.body.innerHTML=Y:B&&this.setUrl(B,Hi),$=$?f($,p):0,ii=ii?f(ii,p):0,G=G?f(G,j):0,N=N?f(N,j):0;const vi=j-G-N,xi=p-$-ii;R=R?f(R,vi):vi,S=S?f(S,xi):xi,T=T?f(T,R):150,w=w?f(w,S):this.header,ti?((c||o).appendChild(this.body),L=Math.max(Math.min(this.body.clientWidth+ni*2+1,R),T),A=Math.max(Math.min(this.body.clientHeight+this.header+ni+1,S),w),this.dom.appendChild(this.body)):(L=L?f(L,R):Math.max(R/2,T)|0,A=A?f(A,S):Math.max(S/2,w)|0),I=I?f(I,vi,L):G,oi=oi?f(oi,xi,A):$,this.x=I,this.y=oi,this.width=L,this.height=A,this.minwidth=T,this.minheight=w,this.maxwidth=R,this.maxheight=S,this.top=$,this.right=N,this.bottom=ii,this.left=G,this.index=u,this.min=!1,this.max=!1,this.full=!1,this.hidden=!1,this.focused=!1,this.onclose=gi,this.onfocus=ji,this.onblur=Oi,this.onmove=yi,this.onresize=Bi,this.onfullscreen=Ci,this.onmaximize=_i,this.onminimize=zi,this.onrestore=Mi,this.onhide=Ri,this.onshow=Wi,J?this.maximize():Z?this.minimize():this.resize().move(),K?this.hide():(this.focus(),(u||u===0)&&(this.index=u,y(this.dom,"z-index",u),u>W&&(W=u))),li(this),(c||o).appendChild(this.dom),(bi=i.oncreate)&&bi.call(this,i)}a.new=function(i){return new a(i)};var P=a;function f(i,n,s){if(typeof i=="string")if(i==="center")i=(n-s)/2|0;else if(i==="right"||i==="bottom")i=n-s;else{const u=parseFloat(i);(""+u!==i&&i.substring((""+u).length))==="%"?i=n/100*u|0:i=u}return i}function F(){o=document.body,o[b="requestFullscreen"]||o[b="msRequestFullscreen"]||o[b="webkitRequestFullscreen"]||o[b="mozRequestFullscreen"]||(b=""),E=b&&b.replace("request","exit").replace("mozRequest","mozCancel").replace("Request","Exit"),_(window,"resize",function(){hi(),e()}),hi()}function li(i){H(i,"drag"),H(i,"n"),H(i,"s"),H(i,"w"),H(i,"e"),H(i,"nw"),H(i,"ne"),H(i,"se"),H(i,"sw"),_(z(i.dom,"wb-min"),"click",function(n){X(n),i.min?i.focus().restore():i.blur().minimize()}),_(z(i.dom,"wb-max"),"click",function(n){i.max?i.restore():i.maximize()}),b?_(z(i.dom,"wb-full"),"click",function(n){i.fullscreen()}):i.addClass("no-full"),_(z(i.dom,"wb-close"),"click",function(n){X(n),i.close()||(i=null)}),_(i.dom,"click",function(n){i.focus()})}function x(i){r.splice(r.indexOf(i),1),e(),i.removeClass("min"),i.min=!1,i.dom.title=""}function e(){const i=r.length,n={},s={};for(let u=0,c,m;u<i;u++)c=r[u],m=(c.left||c.right)+":"+(c.top||c.bottom),s[m]?s[m]++:(n[m]=0,s[m]=1);for(let u=0,c,m,O;u<i;u++)c=r[u],m=(c.left||c.right)+":"+(c.top||c.bottom),O=Math.min((j-c.left-c.right)/s[m],250),c.resize(O+1|0,c.header,!0).move(c.left+n[m]*O|0,p-c.bottom-c.header,!0),n[m]++}function H(i,n){const s=z(i.dom,"wb-"+n);if(!s)return;let u,c,m,O,M,k,Y=0;_(s,"mousedown",L),_(s,"touchstart",L,t);function B(){O=requestAnimationFrame(B),k&&(i.resize(),k=!1),M&&(i.move(),M=!1)}function L(w){if(X(w),i.focus(),n==="drag"){if(i.min){i.restore();return}const R=Date.now(),S=R-Y;if(Y=R,S<300){i.max?i.restore():i.maximize();return}}!i.max&&!i.min&&(D(o,"wb-lock"),d&&B(),(u=w.touches)&&(u=u[0])?(w=u,_(window,"touchmove",A,t),_(window,"touchend",T,t)):(_(window,"mousemove",A),_(window,"mouseup",T)),c=w.pageX,m=w.pageY)}function A(w){X(w),u&&(w=w.touches[0]);const R=w.pageX,S=w.pageY,ti=R-c,I=S-m,oi=i.width,$=i.height,G=i.x,ii=i.y;let N,Z,J,K;n==="drag"?(i.x+=ti,i.y+=I,J=K=1):(n==="e"||n==="se"||n==="ne"?(i.width+=ti,N=1):(n==="w"||n==="sw"||n==="nw")&&(i.x+=ti,i.width-=ti,N=1,J=1),n==="s"||n==="se"||n==="sw"?(i.height+=I,Z=1):(n==="n"||n==="ne"||n==="nw")&&(i.y+=I,i.height-=I,Z=1,K=1)),N&&(i.width=Math.max(Math.min(i.width,i.maxwidth,j-i.x-i.right),i.minwidth),N=i.width!==oi),Z&&(i.height=Math.max(Math.min(i.height,i.maxheight,p-i.y-i.bottom),i.minheight),Z=i.height!==$),(N||Z)&&(d?k=!0:i.resize()),J&&(i.x=Math.max(Math.min(i.x,j-i.width-i.right),i.left),J=i.x!==G),K&&(i.y=Math.max(Math.min(i.y,p-i.height-i.bottom),i.top),K=i.y!==ii),(J||K)&&(d?M=!0:i.move()),(N||J)&&(c=R),(Z||K)&&(m=S)}function T(w){X(w),ri(o,"wb-lock"),d&&cancelAnimationFrame(O),u?(V(window,"touchmove",A,t),V(window,"touchend",T,t)):(V(window,"mousemove",A),V(window,"mouseup",T))}}function hi(){const i=document.documentElement;j=i.clientWidth,p=i.clientHeight}a.prototype.mount=function(i){return this.unmount(),i._backstore||(i._backstore=i.parentNode),this.body.textContent="",this.body.appendChild(i),this},a.prototype.unmount=function(i){const n=this.body.firstChild;if(n){const s=i||n._backstore;s&&s.appendChild(n),n._backstore=i}return this},a.prototype.setTitle=function(i){const n=z(this.dom,"wb-title");return h(n,this.title=i),this},a.prototype.setIcon=function(i){const n=z(this.dom,"wb-icon");return y(n,"background-image","url("+i+")"),y(n,"display","inline-block"),this},a.prototype.setBackground=function(i){return y(this.dom,"background",i),this},a.prototype.setUrl=function(i,n){const s=this.body.firstChild;return s&&s.tagName.toLowerCase()==="iframe"?s.src=i:(this.body.innerHTML='<iframe src="'+i+'"></iframe>',n&&(this.body.firstChild.onload=n)),this},a.prototype.focus=function(i){return i===!1?this.blur():(g!==this&&this.dom&&(g&&g.blur(),y(this.dom,"z-index",++W),this.index=W,this.addClass("focus"),g=this,this.focused=!0,this.onfocus&&this.onfocus()),this)},a.prototype.blur=function(i){return i===!1?this.focus():(g===this&&(this.removeClass("focus"),this.focused=!1,this.onblur&&this.onblur(),g=null),this)},a.prototype.hide=function(i){if(i===!1)return this.show();if(!this.hidden)return this.onhide&&this.onhide(),this.hidden=!0,this.addClass("hide")},a.prototype.show=function(i){if(i===!1)return this.hide();if(this.hidden)return this.onshow&&this.onshow(),this.hidden=!1,this.removeClass("hide")},a.prototype.minimize=function(i){return i===!1?this.restore():(C&&q(),this.max&&(this.removeClass("max"),this.max=!1),this.min||(r.push(this),e(),this.dom.title=this.title,this.addClass("min"),this.min=!0,this.onminimize&&this.onminimize()),this)},a.prototype.restore=function(){return C&&q(),this.min&&(x(this),this.resize().move(),this.onrestore&&this.onrestore()),this.max&&(this.max=!1,this.removeClass("max").resize().move(),this.onrestore&&this.onrestore()),this},a.prototype.maximize=function(i){return i===!1?this.restore():(C&&q(),this.min&&x(this),this.max||(this.addClass("max").resize(j-this.left-this.right,p-this.top-this.bottom,!0).move(this.left,this.top,!0),this.max=!0,this.onmaximize&&this.onmaximize()),this)},a.prototype.fullscreen=function(i){if(this.min&&(x(this),this.resize().move()),!C||!q())this.body[b](),C=this,this.full=!0,this.onfullscreen&&this.onfullscreen();else if(i===!1)return this.restore();return this};function di(){return document.fullscreen||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement}function q(){if(C.full=!1,di())return document[E](),!0}a.prototype.close=function(i){if(this.onclose&&this.onclose(i))return!0;this.min&&x(this),this.unmount(),this.dom.remove(),this.dom.textContent="",this.dom.winbox=null,this.body=null,this.dom=null,g===this&&(g=null)},a.prototype.move=function(i,n,s){return!i&&i!==0?(i=this.x,n=this.y):s||(this.x=i?i=f(i,j-this.left-this.right,this.width):0,this.y=n?n=f(n,p-this.top-this.bottom,this.height):0),y(this.dom,"left",i+"px"),y(this.dom,"top",n+"px"),this.onmove&&this.onmove(i,n),this},a.prototype.resize=function(i,n,s){return!i&&i!==0?(i=this.width,n=this.height):s||(this.width=i?i=f(i,this.maxwidth):0,this.height=n?n=f(n,this.maxheight):0,i=Math.max(i,this.minwidth),n=Math.max(n,this.minheight)),y(this.dom,"width",i+"px"),y(this.dom,"height",n+"px"),this.onresize&&this.onresize(i,n),this},a.prototype.addControl=function(i){const n=i.class,s=i.image,u=i.click,c=i.index,m=document.createElement("span"),O=z(this.dom,"wb-control"),M=this;return n&&(m.className=n),s&&y(m,"background-image","url("+s+")"),u&&(m.onclick=function(k){u.call(this,k,M)}),O.insertBefore(m,O.childNodes[c||0]),this},a.prototype.removeControl=function(i){return i=z(this.dom,i),i&&i.remove(),this},a.prototype.addClass=function(i){return D(this.dom,i),this},a.prototype.removeClass=function(i){return ri(this.dom,i),this},a.prototype.hasClass=function(i){return si(this.dom,i)},a.prototype.toggleClass=function(i){return this.hasClass(i)?this.removeClass(i):this.addClass(i)}}}]);
