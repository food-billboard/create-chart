"use strict";(self.webpackChunkcreate_chart=self.webpackChunkcreate_chart||[]).push([[2447],{92618:function(X,B,e){e.d(B,{O:function(){return i},Z:function(){return D}});var A=e(71461),o=e(94184),N=e.n(o),y={"design-config-default-tab":"design-config-default-tab___S7Hbn","design-config-default-tab-title":"design-config-default-tab-title___4tu3F"},b=e(85893),W=A.Z.TabPane,j=function(p){var _=p.items,P=_===void 0?[]:_;return(0,b.jsx)(A.Z,{tabPosition:"left",defaultActiveKey:"0",className:y["design-config-default-tab"],items:P})},i=function(p){var _=p.icon,P=p.children;return(0,b.jsxs)("div",{className:N()(y["design-config-default-tab-title"],"dis-flex-column"),children:[_,(0,b.jsx)("div",{children:P})]})},D=j},52241:function(X,B,e){e.d(B,{Z:function(){return J}});var A=e(15009),o=e.n(A),N=e(99289),y=e.n(N),b=e(90700),W=e(77598),j=e(96486),i=e(67294),D=e(34104),T=function(f){return{params:f.global.screenData.config.attr.params,filter:f.global.screenData.config.attr.filter,constants:f.global.screenData.config.attr.constants,screenType:f.global.screenType}},p=function(f){return{}},_=e(85893),P=function(f){var G=f.params,L=f.filter,d=f.constants,a=f.componentFilter,x=f.componentParams,t=x===void 0?[]:x,s=f.componentCondition,u=s===void 0?{value:[],initialState:"visible"}:s,S=f.url,O=f.reParams,r=O===void 0?j.noop:O,l=f.reFetchData,m=f.reGetValue,h=f.reCondition,v=h===void 0?j.noop:h,M=f.id,c=u.value,n=c===void 0?[]:c,C=u.initialState,E=(0,i.useRef)(new b.MI({url:S,id:M,componentFilter:a,componentCondition:n,componentConstants:d,componentParams:t,onParams:r,onFetch:function(){var g=y()(o()().mark(function Z(){return o()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.abrupt("return",l());case 1:case"end":return U.stop()}},Z)}));function I(){return g.apply(this,arguments)}return I}(),onFilter:function(){var g=y()(o()().mark(function Z(){return o()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.abrupt("return",m());case 1:case"end":return U.stop()}},Z)}));function I(){return g.apply(this,arguments)}return I}(),onCondition:function(I){return v(I,C)},onHashChange:function(){var I;(I=E.current)===null||I===void 0||I.compare(G)}},L,G));return(0,W.Z)(function(){var g;(g=E.current)===null||g===void 0||g.compare(G)},[G]),(0,i.useEffect)(function(){n.forEach(function(g){v(g,C)})},[n,v,C]),(0,i.useEffect)(function(){l().then(m)},[]),(0,_.jsx)(_.Fragment,{})},J=(0,D.connect)(T,p)(P)},95619:function(X,B,e){var A=e(97857),o=e.n(A),N=e(15009),y=e.n(N),b=e(99289),W=e.n(b),j=e(5574),i=e.n(j),D=e(13769),T=e.n(D),p=e(67294),_=e(85402),P=e(71577),J=e(94184),z=e.n(J),f=e(88192),G=e(19515),L=e(85893),d=["onClick","modalProps"];function a(x){return function(t){var s=t.onClick,u=t.modalProps,S=T()(t,d),O=(0,f.q2)(!1),r=i()(O,2),l=r[0],m=r[1],h=(0,p.useCallback)(W()(y()().mark(function M(){return y()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,G._v)(100);case 2:m(!1);case 3:case"end":return n.stop()}},M)})),[]),v=(0,p.useCallback)(function(){m(!0);for(var M=arguments.length,c=new Array(M),n=0;n<M;n++)c[n]=arguments[n];s==null||s.apply(void 0,c)},[s]);return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(x,o()(o()({},S),{},{onClick:v})),(0,L.jsx)(_.Z,o()(o()({open:l,title:"\u7F16\u8F91",onCancel:h,footer:(0,L.jsx)(P.Z,{onClick:h,children:"\u5173\u95ED"}),width:420,destroyOnClose:!0},u),{},{wrapClassName:z()(u==null?void 0:u.wrapClassName,"design-config-format-font-size"),children:(0,L.jsx)(x,o()({},S))}))]})}}B.Z=a},66960:function(X,B,e){var A=e(97857),o=e.n(A),N=e(5574),y=e.n(N),b=e(13769),W=e.n(b),j=e(67294),i=e(79915),D=e(94184),T=e.n(D),p=e(45210),_=e(88192),P=e(95619),J=e(85893),z=["triggerOnChangeInOnChange","validator"],f=function(d){var a,x=d.triggerOnChangeInOnChange,t=x===void 0?!1:x,s=d.validator,u=s===void 0?[]:s,S=W()(d,z),O=S.value,r=S.defaultValue,l=S.onChange,m=S.onBlur,h=S.className,v=S.onFocus,M=(0,j.useState)((a=O!=null?O:r)!==null&&a!==void 0?a:0),c=y()(M,2),n=c[0],C=c[1],E=(0,j.useRef)(!!d.autoFocus),g=(0,j.useCallback)(function(K){C(K),t&&(l==null||l(K))},[l,t]),I=(0,_.r3)(g),Z=I.validator,V=(0,j.useCallback)(function(K){var R=Z(O,"",u);R!==n&&(l==null||l(n)),m==null||m(K),E.current=!1},[m,l,n,O,u]),U=(0,j.useCallback)(function(K){v==null||v(K),E.current=!0},[v]);return(0,j.useEffect)(function(){O!==void 0&&C(O)},[O]),(0,p.Z)(function(){O!==n&&E.current&&(l==null||l(n))}),(0,J.jsx)(i.Z,o()(o()({},S),{},{className:T()("w-100",h),onChange:g,onBlur:V,value:n,onFocus:U}))},G=(0,P.Z)(f);B.Z=f},52445:function(X,B,e){e.d(B,{Z:function(){return G}});var A=e(9783),o=e.n(A),N=e(67294),y=e(94184),b=e.n(y),W=e(44960),j=e(30616),i={"design-config-form-item-container":"design-config-form-item-container___ZdY5S"},D=e(85893),T=function(d){var a=d.children;return(0,D.jsx)("div",{className:i["design-config-form-item-container"],children:a})},p=T,_={"design-config":"design-config___a968s","design-config-field":"design-config-field___NhTKj","design-config-field-title-level1":"design-config-field-title-level1___vDBez","design-config-field-title-level2":"design-config-field-title-level2___DoOiG","design-config-field-title-level3":"design-config-field-title-level3___wLjb6","design-config-field-title-level4":"design-config-field-title-level4___gkTyO","design-config-field-title":"design-config-field-title___gp26d","design-config-field-container":"design-config-field-container___B94rW","design-config-field-disabled":"design-config-field-disabled___f0GA1","design-config-level-1":"design-config-level-1___Sp1EZ"},P=function(d){var a=d.children,x=d.level,t=x===void 0?0:x,s=d.className,u=d.style;return(0,D.jsx)("div",{className:b()(_["design-config"],_["design-config-level-".concat(t)],s),style:u,children:a})},J=function(d){var a=d.children;return(0,D.jsx)("div",{className:_["design-config-field-container"],children:(0,D.jsx)(p,{children:a})})},z=function(d){var a=d.label,x=d.labelProps,t=x===void 0?{}:x,s=t.className,u=t.style,S=t.title,O=t.level,r=O===void 0?1:O,l=d.placeholder,m=d.children,h=d.disabled,v=d.onDisabledChange,M=(0,N.useMemo)(function(){return l!==!0?l:(0,D.jsx)(W.Z,{checked:!h,onChange:v})},[h,l,v]);return(0,D.jsxs)("div",{className:b()(_["design-config-field"],"dis-flex","pos-re","design-config-format-font-size",o()({},_["design-config-field-disabled"],!!h)),children:[(0,D.jsx)(j.Z,{children:M}),(0,D.jsx)("div",{className:b()("text-ellipsis",_["design-config-field-title"],_["design-config-field-title-level".concat(r)],s),style:u,title:S||(typeof a=="string"?a:""),children:a}),(0,D.jsx)(J,{children:m})]})},f=P;f.Item=z;var G=f},57483:function(X,B,e){e.d(B,{Z:function(){return W}});var A=e(94184),o=e.n(A),N={"design-config-full-form":"design-config-full-form___BCMV0","design-config-full-form-content":"design-config-full-form-content___QuG6P","design-config-full-form-label":"design-config-full-form-label___YnpNw"},y=e(85893),b=function(i){var D=i.children,T=i.label,p=i.style,_=i.className;return(0,y.jsxs)("div",{className:o()(N["design-config-full-form"],_),style:p,children:[(0,y.jsx)("div",{className:N["design-config-full-form-content"],children:D}),T&&(0,y.jsx)("div",{className:o()(N["design-config-full-form-label"],"text-ellipsis"),children:T})]})},W=b},30616:function(X,B,e){e.d(B,{Z:function(){return i}});var A=e(9783),o=e.n(A),N=e(94184),y=e.n(N),b={"design-right-placeholder":"design-right-placeholder___Z8wDQ"},W=e(85893),j=function(T){var p=T.children,_=T.style,P=T.className;return(0,W.jsx)("i",{className:y()(b["design-right-placeholder"],o()({},b["design-right-placeholder-show"],!!p),P),style:_,children:p})},i=j},44960:function(X,B,e){e.d(B,{Z:function(){return T}});var A=e(97857),o=e.n(A),N=e(67294),y=e(94594),b=e(94184),W=e.n(b),j={"design-config-switch":"design-config-switch___nLObB"},i=e(85893),D=function(_){return(0,i.jsx)("span",{className:W()(j["design-config-switch"]),children:(0,i.jsx)(y.Z,o()({},_))})},T=D},92781:function(X,B,e){e.r(B),e.d(B,{default:function(){return M}});var A=e(67294),o=e(96486),N=e(94184),y=e.n(N),b=e(77598),W=e(45210),j=e(44698),i=e(52241),D=e(90700),T=e(97857),p=e.n(T),_=e(13769),P=e.n(_),J=e(12444),z=e.n(J),f=e(72004),G=e.n(f),L=e(9783),d=e.n(L),a=e(96975),x=e(18081),t=["id","actionType"],s=function(c){return c.INIT_RELATION_PARAMS="INIT_RELATION_PARAMS",c.RELATION_PARAMS_CHANGE="RELATION_PARAMS_CHANGE",c.POST_PARAMS="POST_PARAMS",c}(s||{}),u=function(c){return c.GET_PARAMS="GET_PARAMS",c.RELATION_PARAMS_CHANGE="RELATION_PARAMS_CHANGE",c}(u||{}),S=function(){function c(n,C){z()(this,c),d()(this,"iframeId",""),d()(this,"iframeWindow",void 0),d()(this,"iframeUrl",""),d()(this,"interactive",void 0),this.iframeId=n,this.interactive=C}return G()(c,[{key:"eventBind",value:function(){window.addEventListener("message",this.onMessage)}},{key:"eventUnBind",value:function(){window.removeEventListener("message",this.onMessage)}},{key:"onMessage",value:function(C){var E;try{var g=C.data,I=C.origin,Z=JSON.parse(g),V=Z.id,U=Z.actionType,K=P()(Z,t);if(V!==this.iframeId||this.getDomain(this.iframeUrl)!==this.getDomain(I)||!u[U])return;switch(U){case u.GET_PARAMS:var R=K.value;if(Array.isArray(R)){var F=this.getGlobalData(),Q=F.params,Y=F.constants,ee=x.Z.getAllGlobalParams4Array(Q,Y);this.postMessage({actionType:s.POST_PARAMS,value:R.map(function(w){return ee.find(function(q){return q.key===w})}).filter(Boolean).map(function(w){return{key:w.key,value:w.value}})})}break;case u.RELATION_PARAMS_CHANGE:default:(E=this.interactive)===null||E===void 0||E.call(this,"message",K)}}catch(w){}}},{key:"getDomain",value:function(C){try{return new URL(C).origin}catch(E){return""}}},{key:"getGlobalData",value:function(){var C=(0,a.pA)();return(0,o.get)(C,"screenData.config.attr")}},{key:"postMessage",value:function(C){this.iframeWindow&&this.iframeWindow.postMessage(JSON.stringify(p()(p()({},C),{},{id:this.iframeId})),this.getDomain(this.iframeUrl))}},{key:"onParamsChange",value:function(C,E){this.postMessage({value:[{key:C.variable,value:E}],actionType:s.RELATION_PARAMS_CHANGE})}},{key:"create",value:function(C,E){this.eventUnBind(),this.iframeWindow=window.frames[this.iframeId],this.iframeUrl=C,this.eventBind();var g=this.getGlobalData(),I=g.params,Z=g.constants,V=x.Z.getAllGlobalParams4Array(I,Z),U=E.map(function(K){var R=V.find(function(F){return F.id===K});return R?{key:R.key,value:R.value}:null}).filter(Boolean);this.postMessage({value:U,actionType:s.INIT_RELATION_PARAMS})}},{key:"destroy",value:function(){this.iframeWindow=null,this.eventUnBind()}}]),c}(),O=S,r=e(24571),l={"component-other-iframe":"component-other-iframe___v1sOr"},m=e(85893),h=function(n){var C=n.className,E=n.style,g=n.value,I=n.global,Z=n.children,V=n.wrapper,U=g.id,K=g.config,R=K.options,F=R.scrolling,Q=R.scale,Y=R.pointEvent,ee=R.relationParams,w=K.style.border,q=(0,A.useRef)((0,o.uniqueId)(r.q)),$=(0,A.useRef)(!1),H=(0,j.Co)({component:g,global:I}),ae=H.request,re=H.getValue,ue=H.requestUrl,me=H.componentFilter,se=H.value,ie=se===void 0?[]:se,ce=H.componentFilterMap,ve=H.syncInteractiveAction,oe=(0,A.useRef)(new O(q.current,ve)),te=(0,A.useMemo)(function(){var k;return(k=D.ZP.getFieldMapValue(ie,{map:ce}))===null||k===void 0?void 0:k.value},[ie,ce]),_e=(0,A.useCallback)(function(){$.current=!0,de(te)},[te]),he=(0,A.useCallback)(function(k,le){var ne;te&&((ne=oe.current)===null||ne===void 0||ne.onParamsChange(k,le))},[]),de=function(le){var ne;!le||!$.current||(ne=oe.current)===null||ne===void 0||ne.create(le,ee)};return(0,b.Z)(function(){de(te)},[te]),(0,W.Z)(function(){var k;(k=oe.current)===null||k===void 0||k.destroy()}),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:y()(C,l["component-other-iframe"]),style:(0,o.merge)({width:"100%",height:"100%"},E),id:q.current,children:(0,m.jsx)("div",{className:"w-100 h-100",style:(0,o.merge)({transform:"scale(".concat(Q,")")},Y?{}:{pointerEvents:"none"}),children:(0,m.jsxs)(V,{border:w,children:[Z,(0,m.jsx)("iframe",{src:te,name:q.current,width:"100%",height:"100%",frameBorder:"0",scrolling:F,onLoad:_e,style:Y?{}:{pointerEvents:"none"}})]})})}),(0,m.jsx)(i.Z,{id:U,url:ue,reFetchData:ae,reGetValue:re,reParams:he,componentFilter:me,componentParams:ee})]})},v=h;v.id=r.q;var M=v},81648:function(X,B,e){e.r(B);var A=e(12444),o=e.n(A),N=e(72004),y=e.n(N),b=e(25098),W=e.n(b),j=e(31996),i=e.n(j),D=e(26037),T=e.n(D),p=e(9783),_=e.n(p),P=e(67294),J=e(94594),z=e(92618),f=e(37899),G=e(66960),L=e(52445),d=e(57483),a=e(11057),x=e(25506),t=e(85893),s=L.Z.Item,u=function(S){i()(r,S);var O=T()(r);function r(){var l;o()(this,r);for(var m=arguments.length,h=new Array(m),v=0;v<m;v++)h[v]=arguments[v];return l=O.call.apply(O,[this].concat(h)),_()(W()(l),"onKeyChange",function(M,c){l.props.onChange({config:{options:_()({},M,c)}})}),l}return y()(r,[{key:"render",value:function(){var m=this.props.value,h=m.config.options,v=h.scale,M=h.scrolling,c=h.pointEvent,n=h.relationParams;return(0,t.jsx)(z.Z,{items:[{label:(0,t.jsx)(z.O,{children:"\u5168\u5C40\u914D\u7F6E"}),children:(0,t.jsxs)(L.Z,{level:1,children:[(0,t.jsx)(s,{label:"\u70B9\u51FB\u4E8B\u4EF6",children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(J.Z,{checked:c,onChange:this.onKeyChange.bind(this,"pointEvent")})})}),(0,t.jsx)(s,{label:"\u5173\u8054\u53C2\u6570",placeholder:(0,t.jsx)(x.rl,{}),children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(a.Z,{value:n,onChange:this.onKeyChange.bind(this,"relationParams")})})}),(0,t.jsx)(s,{label:"\u6EDA\u52A8\u6761",children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(f.Z,{className:"w-100",value:M,onChange:this.onKeyChange.bind(this,"scrolling"),options:[{label:"\u81EA\u52A8",value:"auto"},{label:"\u663E\u793A",value:"yes"},{label:"\u9690\u85CF",value:"no"}]})})}),(0,t.jsx)(s,{label:"\u653E\u5927",children:(0,t.jsx)(d.Z,{children:(0,t.jsx)(G.Z,{value:v,onChange:this.onKeyChange.bind(this,"scale")})})})]}),key:"1"}]})}}]),r}(P.Component);B.default=u},11057:function(X,B,e){e.d(B,{v:function(){return u},Z:function(){return S}});var A=e(97857),o=e.n(A),N=e(5574),y=e.n(N),b=e(13769),W=e.n(b),j=e(37899),i=e(18081),D=e(32808),T=e(94184),p=e.n(T),_=e(96486),P=e(67294),J=e(34104),z=function(r){var l=r.global.screenData.config.attr,m=l.constants,h=l.params;return{params:h,constants:m}},f=function(r){return{}},G={"params-select-checkbox":"params-select-checkbox___akkRi"},L=e(85893),d=["params","constants","value","onChange","onBlur","needChangeLazy","changeLazy","style","onChangeLazyChange","wrapperClassName","wrapperStyle"],a=["params","constants","value","onChange","onBlur","needChangeLazy","changeLazy","onChangeLazyChange","style","wrapperClassName","wrapperStyle"],x=j.Z.Option,t=function(r){var l=r.params,m=r.constants,h=r.value,v=r.onChange,M=r.onBlur,c=r.needChangeLazy,n=c===void 0?!1:c,C=r.changeLazy,E=r.style,g=r.onChangeLazyChange,I=r.wrapperClassName,Z=r.wrapperStyle,V=W()(r,d),U=(0,P.useState)(h),K=y()(U,2),R=K[0],F=K[1],Q=(0,P.useMemo)(function(){return i.Z.getAllGlobalParams4Array(l,m)},[l,m]),Y=(0,P.useMemo)(function(){return Q.map(function($){var H=$.key,ae=$.id;return{label:H,value:ae}})},[Q]),ee=(0,P.useCallback)(function($){(0,_.isEqual)(h,R)||v==null||v(R),M==null||M($)},[v,R,M,h]),w=(0,P.useCallback)(function($){F($)},[]),q=(0,P.useMemo)(function(){return n?(0,L.jsx)(D.Z,{checked:C,onChange:function(H){return g==null?void 0:g(H.target.checked)},className:G["params-select-checkbox"],style:{marginLeft:8},children:"\u61D2\u66F4\u65B0"}):null},[n,C,g]);return(0,L.jsxs)("div",{className:p()("dis-flex flex-al-cen",I),style:Z,children:[(0,L.jsx)(j.Z,o()(o()({mode:"tags",allowClear:!0,style:(0,_.merge)(E,{width:n?"calc(100% - 80px)":"100%"}),placeholder:"\u9009\u62E9\u5168\u5C40\u53C2\u6570",value:R,onChange:w,onBlur:ee},V),{},{options:Y})),q]})},s=function(r){var l=r.params,m=r.constants,h=r.value,v=r.onChange,M=r.onBlur,c=r.needChangeLazy,n=c===void 0?!1:c,C=r.changeLazy,E=r.onChangeLazyChange,g=r.style,I=r.wrapperClassName,Z=r.wrapperStyle,V=W()(r,a),U=(0,P.useState)(h),K=y()(U,2),R=K[0],F=K[1],Q=(0,P.useMemo)(function(){return i.Z.getAllGlobalParams4Array(l,m)},[l,m]),Y=(0,P.useMemo)(function(){return Q.map(function($){var H=$.key,ae=$.value,re=$.id;return{label:H,value:re}})},[Q]),ee=(0,P.useCallback)(function($){R!==h&&(v==null||v(R)),M==null||M($)},[v,R,M,h]),w=(0,P.useCallback)(function($){var H=$.slice(-1),ae=y()(H,1),re=ae[0];F(re||"")},[]),q=(0,P.useMemo)(function(){return n?(0,L.jsx)(D.Z,{checked:C,onChange:function(H){return E==null?void 0:E(H.target.checked)},className:G["params-select-checkbox"],style:{marginLeft:8},children:"\u61D2\u66F4\u65B0"}):null},[n,C,E]);return(0,L.jsxs)("div",{className:p()("dis-flex flex-al-cen",I),style:Z,children:[(0,L.jsx)(j.Z,o()(o()({mode:"tags",allowClear:!0,style:(0,_.merge)(g,{width:n?"calc(100% - 80px)":"100%"}),placeholder:"\u9009\u62E9\u5168\u5C40\u53C2\u6570",value:R?[R]:[],onChange:w,onBlur:ee},V),{},{options:Y})),q]})},u=(0,J.connect)(z,f)(s),S=(0,J.connect)(z,f)(t)},94594:function(X,B,e){e.d(B,{Z:function(){return d}});var A=e(87462),o=e(4942),N=e(50888),y=e(94184),b=e.n(y),W=e(97685),j=e(45987),i=e(67294),D=e(21770),T=e(15105),p=i.forwardRef(function(a,x){var t,s=a.prefixCls,u=s===void 0?"rc-switch":s,S=a.className,O=a.checked,r=a.defaultChecked,l=a.disabled,m=a.loadingIcon,h=a.checkedChildren,v=a.unCheckedChildren,M=a.onClick,c=a.onChange,n=a.onKeyDown,C=(0,j.Z)(a,["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"]),E=(0,D.Z)(!1,{value:O,defaultValue:r}),g=(0,W.Z)(E,2),I=g[0],Z=g[1];function V(F,Q){var Y=I;return l||(Y=F,Z(Y),c==null||c(Y,Q)),Y}function U(F){F.which===T.Z.LEFT?V(!1,F):F.which===T.Z.RIGHT&&V(!0,F),n==null||n(F)}function K(F){var Q=V(!I,F);M==null||M(Q,F)}var R=b()(u,S,(t={},(0,o.Z)(t,"".concat(u,"-checked"),I),(0,o.Z)(t,"".concat(u,"-disabled"),l),t));return i.createElement("button",Object.assign({},C,{type:"button",role:"switch","aria-checked":I,disabled:l,className:R,ref:x,onKeyDown:U,onClick:K}),m,i.createElement("span",{className:"".concat(u,"-inner")},I?h:v))});p.displayName="Switch";var _=p,P=e(53124),J=e(98866),z=e(97647),f=e(68349),G=function(a,x){var t={};for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&x.indexOf(s)<0&&(t[s]=a[s]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,s=Object.getOwnPropertySymbols(a);u<s.length;u++)x.indexOf(s[u])<0&&Object.prototype.propertyIsEnumerable.call(a,s[u])&&(t[s[u]]=a[s[u]]);return t},L=i.forwardRef(function(a,x){var t,s=a.prefixCls,u=a.size,S=a.disabled,O=a.loading,r=a.className,l=r===void 0?"":r,m=G(a,["prefixCls","size","disabled","loading","className"]),h=i.useContext(P.E_),v=h.getPrefixCls,M=h.direction,c=i.useContext(z.Z),n=i.useContext(J.Z),C=(S!=null?S:n)||O,E=v("switch",s),g=i.createElement("div",{className:"".concat(E,"-handle")},O&&i.createElement(N.Z,{className:"".concat(E,"-loading-icon")})),I=b()((t={},(0,o.Z)(t,"".concat(E,"-small"),(u||c)==="small"),(0,o.Z)(t,"".concat(E,"-loading"),O),(0,o.Z)(t,"".concat(E,"-rtl"),M==="rtl"),t),l);return i.createElement(f.Z,{insertExtraNode:!0},i.createElement(_,(0,A.Z)({},m,{prefixCls:E,className:I,disabled:C,ref:x,loadingIcon:g})))});L.__ANT_SWITCH=!0;var d=L}}]);
