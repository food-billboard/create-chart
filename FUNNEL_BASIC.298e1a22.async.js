(self["webpackChunkcreate_chart"]=self["webpackChunkcreate_chart"]||[]).push([[8947],{97752:function(e,n,i){"use strict";i.r(n);var l=i(11849),t=i(93224),a=i(67294),o=i(96486),r=i(94184),u=i.n(r),s=i(68702),c=i(94610),h=i(83488),d=i(2258),m=i(69421),f=i(52182),v=i(85893),g=["itemStyle","label","maxSize","minSize"],x=["color"],p=["animation"],j=h.Z.getRgbaString,Z=function(e){var n=e.className,i=e.style,r=e.value,h=e.global,Z=e.children,b=e.wrapper,C=h.screenTheme,y=h.screenType,S=r.id,k=r.config,w=k.options,z=k.style.border,N=(0,c.LK)(w),L=N.legend,M=N.series,A=N.tooltip,E=N.animation,F=N.condition,K=(0,a.useRef)((0,o.uniqueId)(f.q)),O=(0,a.useRef)();(0,c.vF)(r,(function(){var e;null===O||void 0===O||null===(e=O.current)||void 0===e||e.resize()}));var q=(0,c.Co)({component:r,global:h}),R=q.request,V=q.syncInteractiveAction,_=q.linkageMethod,D=q.getValue,I=q.requestUrl,U=q.componentFilter,H=q.value,T=void 0===H?[]:H,B=q.componentFilterMap,G=q.onCondition,Y=(0,c.kY)(G,y),J=Y.onCondition,P=Y.style,Q=Y.className,W=(0,c.K7)(T,{map:B,fields:{seriesKey:"",xAxisKeyKey:"name",yAxisValue:"value"}}),X=W.xAxisKeys,$=W.yAxisValues,ee=function(e){var n=e.name,i=e.value,l={name:n,value:i};V("click",l),_("click-item",l)},ne=function(){var e=(0,d.S1)(document.querySelector("#".concat(K.current)),C,{renderer:"canvas"});O.current=e,le()},ie=function(){var e=M.itemStyle,n=M.label,i=M.maxSize,a=M.minSize,o=(0,t.Z)(M,g),r=E.animation,u=E.animationDuration,s=E.animationEasing,c=e.color,h=(0,t.Z)(e,x),d=(0,l.Z)((0,l.Z)({},o),{},{maxSize:i+"%",minSize:a+"%",label:(0,l.Z)((0,l.Z)({},n),{},{color:j(n.color)}),type:"funnel",itemStyle:h,data:X.map((function(e,n){return{name:e,value:$._defaultValue_[n],itemStyle:{color:j(c[n])}}})),animation:r,animationEasing:s,animationEasingUpdate:s,animationDuration:u,animationDurationUpdate:u});return[d]},le=function(){var e,n=A.animation,i=(0,t.Z)(A,p),a=ie();null===(e=O.current)||void 0===e||e.setOption({grid:{show:!1},legend:L,series:a,tooltip:(0,l.Z)((0,l.Z)({},i),{},{trigger:"item"})},!0),"edit"!==y&&n.show&&(0,c.ER)(O.current,a,{interval:n.speed})};return(0,c.x6)(O.current),(0,a.useEffect)((function(){return ne(),function(){var e;null===(e=O.current)||void 0===e||e.dispose()}}),[C]),(0,a.useEffect)((function(){var e,n;null===(e=O.current)||void 0===e||e.off("click"),null===(n=O.current)||void 0===n||n.on("click",ee)}),[V]),(0,s.Hp)((function(){le()}),[T,X,$]),(0,s.Hp)((function(){var e;le(),null===(e=O.current)||void 0===e||e.resize()}),[w]),(0,c.Oo)(O.current,E,le),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:u()(n,Q),style:(0,o.merge)({width:"100%",height:"100%"},i,P),children:(0,v.jsxs)(b,{border:z,children:[(0,v.jsx)("div",{id:K.current,className:"w-100 h-100"}),Z]})}),(0,v.jsx)(m.Z,{id:S,url:I,reFetchData:R,reGetValue:D,reCondition:J,componentFilter:U,componentCondition:F})]})},b=Z;b.id=f.q,n["default"]=b},54682:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return U}});var l=i(69610),t=i(54941),a=i(81306),o=i(80017),r=i(67294),u=i(35931),s=i(13631),c=i(45098),h=i(85893),d=function(e){var n=e.value,i=e.onChange,l=(0,r.useCallback)((function(e){i({config:{options:{legend:e}}})}),[i]);return(0,h.jsx)(c.Z,{value:n,ignore:["type"],onChange:l})},m=d,f=i(30647),v=i(61057),g=function(e){var n=e.value,i=e.onChange,l=(0,r.useCallback)((function(e){i({config:{options:{tooltip:e}}})}),[i]);return(0,h.jsx)(f.Z,{value:n,onChange:l,children:(0,h.jsx)(v.Z,{value:n.animation,onChange:function(e){l({animation:e})}})})},x=g,p=i(11849),j=i(32059),Z=i(66656),b=i(79837),C=i(96964),y=i(77269),S=i(11913),k=i(50962),w=i(13216),z=i(28832),N=i(52527),L=i(42791),M=i(97994),A=i(80856),E=s.Z.Item,F=function(e){var n=e.value,i=e.onChange,l=n.max,t=n.min,a=n.maxSize,o=n.minSize,u=n.label,c=n.itemStyle,d=n.labelLine,m=n.left,f=n.top,v=n.right,g=n.bottom,x=(0,r.useCallback)((function(e,n){i({config:{options:{series:(0,j.Z)({},e,n)}}})}),[i]),F=(0,r.useMemo)((function(){return(0,h.jsxs)(C.Z,(0,p.Z)((0,p.Z)({},u),{},{onChange:x.bind(null,"label"),ignore:["position"],parent:{defaultActiveKey:["label"]},children:[(0,h.jsx)(E,{label:"\u4f4d\u7f6e",children:(0,h.jsx)(b.Z,{children:(0,h.jsx)(Z.Z,{className:"w-100",value:u.position,onChange:function(e){x("label",{position:e})},options:[{label:"\u5185\u90e8",value:"inside"},{label:"\u5916\u90e8",value:"outside"}]})})}),(0,h.jsx)(S.Z,{value:u.formatter,onChange:function(e){x("label",{formatter:e})}})]}))}),[u,x]),K=(0,r.useMemo)((function(){return(0,h.jsxs)(k.u,{child:{header:"\u5f15\u5bfc\u7ebf",key:"labelLine",visibleRender:!0,onChange:function(e){x("labelLine",{show:e})},value:d.show},children:[(0,h.jsx)(E,{label:"\u7ebf\u6bb5",children:(0,h.jsx)(b.Z,{children:(0,h.jsx)(z.Z,{value:d.length,onChange:function(e){x("labelLine",{length:e})},className:"w-100"})})}),(0,h.jsxs)(E,{label:"\u6837\u5f0f",children:[(0,h.jsx)(w.Z,{label:"\u5bbd\u5ea6",children:(0,h.jsx)(z.Z,{value:d.lineStyle.width,onChange:function(e){x("labelLine",{lineStyle:{width:e}})},className:"w-100"})}),(0,h.jsx)(w.Z,{label:"\u7ebf\u6761\u7c7b\u578b",children:(0,h.jsx)(N.Z,{value:d.lineStyle.type,onChange:function(e){x("labelLine",{lineStyle:{type:e}})}})})]})]})}),[d,x]),O=(0,r.useMemo)((function(){return(0,h.jsx)(M.Z,{label:"\u6570\u503c\u8303\u56f4",value:{max:l,min:t},onChange:function(e){i({config:{options:{series:e}}})}})}),[t,l,x]),q=(0,r.useMemo)((function(){return(0,h.jsx)(M.Z,{label:"\u5bbd\u5ea6\u8303\u56f4(%)",value:{max:a,min:o},onChange:function(e){i({config:{options:{series:{minSize:e.min,maxSize:e.max}}}})}})}),[o,a,x]),R=(0,r.useMemo)((function(){return(0,h.jsx)(E,{label:"\u989c\u8272",children:(0,h.jsx)(y.Z,{value:c.color,onChange:function(e){x("itemStyle",{color:e})},max:A.Z.getChartSeriesCounter("FUNNEL_BASIC")})})}),[c,x,i]),V=(0,r.useMemo)((function(){return(0,h.jsx)(L.Z,{value:{left:m,top:f,right:v,bottom:g},onChange:function(e){i({config:{options:{series:e}}})}})}),[m,f,v,g,i]);return(0,h.jsxs)(s.Z,{children:[O,q,V,F,K,R]})},K=F,O=i(63243),q=function(e){var n=e.value,i=e.onChange,l=(0,r.useCallback)((function(e){i({config:{options:{animation:e}}})}),[i]);return(0,h.jsx)(O.Z,{value:n,onChange:l})},R=q,V=i(89426),_=function(e){var n=e.value,i=e.onChange,l=(0,r.useCallback)((function(e){i({config:{options:{condition:e}}})}),[i]);return(0,h.jsx)(V.Z,{value:n,onChange:l})},D=_,I=function(e){(0,a.Z)(i,e);var n=(0,o.Z)(i);function i(){return(0,l.Z)(this,i),n.apply(this,arguments)}return(0,t.Z)(i,[{key:"render",value:function(){var e=this.props,n=e.value,i=e.onChange,l=n.config.options,t=l.legend,a=l.series,o=l.tooltip,r=l.animation,c=l.condition;return(0,h.jsx)(u.Z,{items:[{label:(0,h.jsx)(u.O,{children:"\u56fe\u4f8b"}),children:(0,h.jsx)(s.Z,{level:1,children:(0,h.jsx)(m,{value:t,onChange:i})}),key:"1"},{label:(0,h.jsx)(u.O,{children:"\u63d0\u793a\u6587\u5b57"}),children:(0,h.jsx)(s.Z,{level:1,children:(0,h.jsx)(x,{value:o,onChange:i})}),key:"2"},{label:(0,h.jsx)(u.O,{children:"\u7cfb\u5217"}),children:(0,h.jsx)(s.Z,{level:1,children:(0,h.jsx)(K,{value:a,onChange:i})}),key:"3"},{label:(0,h.jsx)(u.O,{children:"\u52a8\u753b"}),children:(0,h.jsx)(s.Z,{level:1,children:(0,h.jsx)(R,{value:r,onChange:i})}),key:"4"},{label:(0,h.jsx)(u.O,{children:"\u6761\u4ef6"}),children:(0,h.jsx)(s.Z,{level:1,children:(0,h.jsx)(D,{value:c,onChange:i})}),key:"5"}]})}}]),i}(r.Component),U=I}}]);