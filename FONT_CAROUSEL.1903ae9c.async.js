(self.webpackChunkcreate_chart=self.webpackChunkcreate_chart||[]).push([[5169],{52241:function(_,D,n){"use strict";n.d(D,{Z:function(){return r}});var O=n(15009),F=n.n(O),t=n(99289),T=n.n(t),P=n(90700),W=n(77598),h=n(96486),y=n(67294),K=n(34104),$=function(o){return{params:o.global.screenData.config.attr.params,filter:o.global.screenData.config.attr.filter,constants:o.global.screenData.config.attr.constants,screenType:o.global.screenType}},A=function(o){return{}},E=n(85893),c=function(o){var Z=o.params,b=o.filter,Y=o.constants,z=o.componentFilter,H=o.componentParams,Q=H===void 0?[]:H,a=o.componentCondition,I=a===void 0?{value:[],initialState:"visible"}:a,w=o.url,B=o.reParams,e=B===void 0?h.noop:B,p=o.reFetchData,M=o.reGetValue,i=o.reCondition,d=i===void 0?h.noop:i,v=o.id,C=I.value,m=C===void 0?[]:C,u=I.initialState,l=(0,y.useRef)(new P.MI({url:w,id:v,componentFilter:z,componentCondition:m,componentConstants:Y,componentParams:Q,onParams:e,onFetch:function(){var s=T()(F()().mark(function R(){return F()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.abrupt("return",p());case 1:case"end":return S.stop()}},R)}));function g(){return s.apply(this,arguments)}return g}(),onFilter:function(){var s=T()(F()().mark(function R(){return F()().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.abrupt("return",M());case 1:case"end":return S.stop()}},R)}));function g(){return s.apply(this,arguments)}return g}(),onCondition:function(g){return d(g,u)},onHashChange:function(){var g;(g=l.current)===null||g===void 0||g.compare(Z)}},b,Z));return(0,W.Z)(function(){var s;(s=l.current)===null||s===void 0||s.compare(Z)},[Z]),(0,y.useEffect)(function(){m.forEach(function(s){d(s,u)})},[m,d,u]),(0,y.useEffect)(function(){p().then(M)},[]),(0,E.jsx)(E.Fragment,{})},r=(0,K.connect)($,A)(c)},90866:function(_,D,n){"use strict";n.r(D),n.d(D,{default:function(){return b}});var O=n(97857),F=n.n(O),t=n(67294),T=n(96486),P=n(94184),W=n.n(P),h=n(97005),y=n(44698),K=n(52241),$=n(78166),A=n(90700),E=n(19305),c={"component-font-carousel-wrapper":"component-font-carousel-wrapper___T8zwE","component-font-carousel-main":"component-font-carousel-main___EFSmZ"},r=n(85893),L=$.Z.getRgbaString,o=function(z){var H=z.className,Q=z.style,a=z.value,I=z.global,w=z.children,B=z.wrapper,e=I.screenType,p=a.id,M=a.config,i=M.options,d=M.style,v=d.height,C=d.border,m=i.textStyle,u=i.speed,l=i.direction,s=i.play,g=i.delay,R=i.pauseOnHover,X=i.condition,S=(0,t.useRef)((0,T.uniqueId)(E.q)),x=(0,y.Co)({component:a,global:I}),N=x.request,J=x.syncInteractiveAction,f=x.linkageMethod,k=x.getValue,G=x.requestUrl,V=x.componentFilter,nn=x.value,j=nn===void 0?[]:nn,U=x.componentFilterMap,en=x.onCondition,q=(0,y.kY)(en,e),on=q.onCondition,rn=q.style,an=q.className,tn=(0,t.useMemo)(function(){return A.ZP.getFieldMapValue(j,{map:U})},[j,U]),ln=(0,t.useCallback)(function(){J("click",{value:tn.value}),f("click",{value:tn.value})},[J,tn]),sn=(0,t.useMemo)(function(){var cn=F()(F()({},m),{},{color:L(m.color)});return cn},[m]),un=(0,t.useMemo)(function(){return W()(H,c["component-font-carousel"],an)},[H,an]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:un,style:(0,T.merge)({width:"100%",height:"100%"},Q,sn,rn),id:S.current,onClick:ln,children:(0,r.jsxs)(B,{border:C,children:[w,(0,r.jsx)(h.Z,{gradient:!1,play:e!=="edit"&&s,speed:u,direction:l,pauseOnHover:R,delay:g,children:(0,r.jsx)("div",{className:c["component-font-carousel-main"],style:{height:v},children:tn.value||""})})]})}),(0,r.jsx)(K.Z,{id:p,url:G,reFetchData:N,reGetValue:k,reCondition:on,componentFilter:V,componentCondition:X})]})},Z=o;Z.id=E.q;var b=Z},65182:function(_,D,n){"use strict";n.r(D),n.d(D,{default:function(){return M}});var O=n(12444),F=n.n(O),t=n(72004),T=n.n(t),P=n(25098),W=n.n(P),h=n(31996),y=n.n(h),K=n(26037),$=n.n(K),A=n(9783),E=n.n(A),c=n(67294),r=n(83134),L=n(94594),o=n(92618),Z=n(52445),b=n(4494),Y=n(57483),z=n(32687),H=n(24058),Q=n(98553),a=n(85893),I=function(d){var v=d.value,C=d.onChange,m=(0,c.useCallback)(function(u){C({config:{options:{condition:u}}})},[C]);return(0,a.jsx)(Q.Z,{value:v,onChange:m})},w=I,B=n(66960),e=Z.Z.Item,p=function(i){y()(v,i);var d=$()(v);function v(){var C;F()(this,v);for(var m=arguments.length,u=new Array(m),l=0;l<m;l++)u[l]=arguments[l];return C=d.call.apply(d,[this].concat(u)),E()(W()(C),"onKeyChange",function(s,g){C.props.onChange({config:{options:E()({},s,g)}})}),C}return T()(v,[{key:"render",value:function(){var m=this,u=this.props.value,l=u.config.options,s=l.textStyle,g=l.play,R=l.pauseOnHover,X=l.speed,S=l.direction,x=l.delay,N=l.condition;return(0,a.jsx)(o.Z,{items:[{label:(0,a.jsx)(o.O,{children:"\u57FA\u7840"}),children:(0,a.jsxs)(Z.Z,{level:1,children:[(0,a.jsx)(b.u,{child:{header:"\u6587\u5B57\u6837\u5F0F",key:"textStyle"},children:(0,a.jsx)(z.g,{value:s,onChange:this.onKeyChange.bind(null,"textStyle")})}),(0,a.jsx)(e,{label:"\u6EDA\u52A8\u65B9\u5411",children:(0,a.jsx)(r.ZP.Group,{value:S,onChange:function(f){return m.onKeyChange("direction",f.target.value)},options:[{label:"\u4ECE\u5DE6\u5411\u53F3",value:"right"},{label:"\u4ECE\u53F3\u5411\u5DE6",value:"left"}]})}),(0,a.jsx)(e,{label:"\u6EDA\u52A8\u901F\u5EA6",children:(0,a.jsx)(Y.Z,{children:(0,a.jsx)(B.Z,{value:X,onChange:this.onKeyChange.bind(this,"speed")})})}),(0,a.jsxs)(e,{label:"\u6EDA\u52A8",children:[(0,a.jsx)(H.Z,{label:"\u9ED8\u8BA4\u6EDA\u52A8",children:(0,a.jsx)(L.Z,{checked:g,onChange:this.onKeyChange.bind(this,"play")})}),(0,a.jsx)(H.Z,{label:"\u9F20\u6807\u79FB\u5165\u6682\u505C",children:(0,a.jsx)(L.Z,{checked:R,onChange:this.onKeyChange.bind(this,"pauseOnHover")})})]}),(0,a.jsx)(e,{label:"\u5EF6\u8FDF\u6EDA\u52A8",children:(0,a.jsx)(H.Z,{children:(0,a.jsx)(B.Z,{value:x,onChange:this.onKeyChange.bind(this,"delay")})})})]}),key:"1"},{label:(0,a.jsx)(o.O,{children:"\u6761\u4EF6"}),children:(0,a.jsx)(Z.Z,{level:1,children:(0,a.jsx)(w,{value:N,onChange:this.onKeyChange.bind(null,"condition")})}),key:"2"}]})}}]),v}(c.Component),M=p},19569:function(_,D,n){"use strict";var O=n(30565);D.Z=(0,O.Z)(function(){return n.e(2339).then(n.bind(n,54448))})},80:function(_,D,n){"use strict";n.d(D,{Z:function(){return E}});var O=n(97857),F=n.n(O),t=n(13769),T=n.n(t),P=n(71577),W=n(94184),h=n.n(W),y={"design-config-ghost-btn":"design-config-ghost-btn___aFLrM"},K=n(85893),$=["className"],A=function(r){var L=r.className,o=T()(r,$);return(0,K.jsx)(P.Z,F()({type:"primary",ghost:!0,className:h()(y["design-config-ghost-btn"],L)},o))},E=A},11057:function(_,D,n){"use strict";n.d(D,{v:function(){return I},Z:function(){return w}});var O=n(97857),F=n.n(O),t=n(5574),T=n.n(t),P=n(13769),W=n.n(P),h=n(37899),y=n(18081),K=n(32808),$=n(94184),A=n.n($),E=n(96486),c=n(67294),r=n(34104),L=function(e){var p=e.global.screenData.config.attr,M=p.constants,i=p.params;return{params:i,constants:M}},o=function(e){return{}},Z={"params-select-checkbox":"params-select-checkbox___akkRi"},b=n(85893),Y=["params","constants","value","onChange","onBlur","needChangeLazy","changeLazy","style","onChangeLazyChange","wrapperClassName","wrapperStyle"],z=["params","constants","value","onChange","onBlur","needChangeLazy","changeLazy","onChangeLazyChange","style","wrapperClassName","wrapperStyle"],H=h.Z.Option,Q=function(e){var p=e.params,M=e.constants,i=e.value,d=e.onChange,v=e.onBlur,C=e.needChangeLazy,m=C===void 0?!1:C,u=e.changeLazy,l=e.style,s=e.onChangeLazyChange,g=e.wrapperClassName,R=e.wrapperStyle,X=W()(e,Y),S=(0,c.useState)(i),x=T()(S,2),N=x[0],J=x[1],f=(0,c.useMemo)(function(){return y.Z.getAllGlobalParams4Array(p,M)},[p,M]),k=(0,c.useMemo)(function(){return f.map(function(j){var U=j.key,en=j.id;return{label:U,value:en}})},[f]),G=(0,c.useCallback)(function(j){(0,E.isEqual)(i,N)||d==null||d(N),v==null||v(j)},[d,N,v,i]),V=(0,c.useCallback)(function(j){J(j)},[]),nn=(0,c.useMemo)(function(){return m?(0,b.jsx)(K.Z,{checked:u,onChange:function(U){return s==null?void 0:s(U.target.checked)},className:Z["params-select-checkbox"],style:{marginLeft:8},children:"\u61D2\u66F4\u65B0"}):null},[m,u,s]);return(0,b.jsxs)("div",{className:A()("dis-flex flex-al-cen",g),style:R,children:[(0,b.jsx)(h.Z,F()(F()({mode:"tags",allowClear:!0,style:(0,E.merge)(l,{width:m?"calc(100% - 80px)":"100%"}),placeholder:"\u9009\u62E9\u5168\u5C40\u53C2\u6570",value:N,onChange:V,onBlur:G},X),{},{options:k})),nn]})},a=function(e){var p=e.params,M=e.constants,i=e.value,d=e.onChange,v=e.onBlur,C=e.needChangeLazy,m=C===void 0?!1:C,u=e.changeLazy,l=e.onChangeLazyChange,s=e.style,g=e.wrapperClassName,R=e.wrapperStyle,X=W()(e,z),S=(0,c.useState)(i),x=T()(S,2),N=x[0],J=x[1],f=(0,c.useMemo)(function(){return y.Z.getAllGlobalParams4Array(p,M)},[p,M]),k=(0,c.useMemo)(function(){return f.map(function(j){var U=j.key,en=j.value,q=j.id;return{label:U,value:q}})},[f]),G=(0,c.useCallback)(function(j){N!==i&&(d==null||d(N)),v==null||v(j)},[d,N,v,i]),V=(0,c.useCallback)(function(j){var U=j.slice(-1),en=T()(U,1),q=en[0];J(q||"")},[]),nn=(0,c.useMemo)(function(){return m?(0,b.jsx)(K.Z,{checked:u,onChange:function(U){return l==null?void 0:l(U.target.checked)},className:Z["params-select-checkbox"],style:{marginLeft:8},children:"\u61D2\u66F4\u65B0"}):null},[m,u,l]);return(0,b.jsxs)("div",{className:A()("dis-flex flex-al-cen",g),style:R,children:[(0,b.jsx)(h.Z,F()(F()({mode:"tags",allowClear:!0,style:(0,E.merge)(s,{width:m?"calc(100% - 80px)":"100%"}),placeholder:"\u9009\u62E9\u5168\u5C40\u53C2\u6570",value:N?[N]:[],onChange:V,onBlur:G},X),{},{options:k})),nn]})},I=(0,r.connect)(L,o)(a),w=(0,r.connect)(L,o)(Q)},97005:function(_,D,n){var O;function F(h){if(!h||typeof window=="undefined")return;const y=document.createElement("style");return y.setAttribute("type","text/css"),y.innerHTML=h,document.head.appendChild(y),h}O={value:!0};var t=n(67294);function T(h){return h&&typeof h=="object"&&"default"in h?h:{default:h}}var P=T(t);F(`.marquee-container {
  overflow-x: hidden !important;
  display: flex !important;
  flex-direction: row !important;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.overlay::before, .overlay::after {
  background: linear-gradient(to right, var(--gradient-color));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
}
.overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.overlay::before {
  left: 0;
  top: 0;
}

.marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
}

.child {
  transform: var(--transform);
}`);const W=t.forwardRef(function({style:y={},className:K="",autoFill:$=!1,play:A=!0,pauseOnHover:E=!1,pauseOnClick:c=!1,direction:r="left",speed:L=50,delay:o=0,loop:Z=0,gradient:b=!1,gradientColor:Y=[255,255,255],gradientWidth:z=200,onFinish:H,onCycleComplete:Q,onMount:a,children:I},w){const[B,e]=t.useState(0),[p,M]=t.useState(0),[i,d]=t.useState(1),[v,C]=t.useState(!1),m=t.useRef(null),u=w||m,l=t.useRef(null),s=t.useCallback(()=>{if(l.current&&u.current){const f=u.current.getBoundingClientRect(),k=l.current.getBoundingClientRect();let G=f.width,V=k.width;(r==="up"||r==="down")&&(G=f.height,V=k.height),d($&&G&&V&&V<G?Math.ceil(G/V):1),e(G),M(V)}},[$,u,r]);t.useEffect(()=>{if(v&&(s(),l.current&&u.current)){const f=new ResizeObserver(()=>s());return f.observe(u.current),f.observe(l.current),()=>{f&&f.disconnect()}}},[s,u,v]),t.useEffect(()=>{s()},[s,I]),t.useEffect(()=>{C(!0)},[]),t.useEffect(()=>{typeof a=="function"&&a()},[]);const g=t.useMemo(()=>$?p*i/L:p<B?B/L:p/L,[$,B,p,i,L]),R=`rgba(${Y[0]}, ${Y[1]}, ${Y[2]}`,X=t.useMemo(()=>Object.assign(Object.assign({},y),{["--pause-on-hover"]:!A||E?"paused":"running",["--pause-on-click"]:!A||E&&!c||c?"paused":"running",["--width"]:r==="up"||r==="down"?"100vh":"100%",["--transform"]:r==="up"?"rotate(-90deg)":r==="down"?"rotate(90deg)":"none"}),[y,A,E,c,r]),S=t.useMemo(()=>({["--gradient-color"]:`${R}, 1), ${R}, 0)`,["--gradient-width"]:typeof z=="number"?`${z}px`:z}),[R,z]),x=t.useMemo(()=>({["--play"]:A?"running":"paused",["--direction"]:r==="left"?"normal":"reverse",["--duration"]:`${g}s`,["--delay"]:`${o}s`,["--iteration-count"]:Z?`${Z}`:"infinite",["--min-width"]:$?"auto":"100%"}),[A,r,g,o,Z,$]),N=t.useMemo(()=>({["--transform"]:r==="up"?"rotate(90deg)":r==="down"?"rotate(-90deg)":"none"}),[r]),J=t.useCallback(f=>[...Array(Number.isFinite(f)&&f>=0?f:0)].map((k,G)=>P.default.createElement(t.Fragment,{key:G},t.Children.map(I,V=>P.default.createElement("div",{style:N,className:"child"},V)))),[N,I]);return v?P.default.createElement("div",{ref:u,style:X,className:"marquee-container "+K},b&&P.default.createElement("div",{style:S,className:"overlay"}),P.default.createElement("div",{className:"marquee",style:x,onAnimationIteration:Q,onAnimationEnd:H},P.default.createElement("div",{className:"initial-child-container",ref:l},t.Children.map(I,f=>P.default.createElement("div",{style:N,className:"child"},f))),J(i-1)),P.default.createElement("div",{className:"marquee",style:x},J(i))):null});D.Z=W}}]);
