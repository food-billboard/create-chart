(self["webpackChunkcreate_chart"]=self["webpackChunkcreate_chart"]||[]).push([[3656],{68400:function(e){e.exports={"component-other-qr-code":"component-other-qr-code___2HQAO","component-other-qr-code-content":"component-other-qr-code-content___1z8v-","component-other-qr-code-content-image":"component-other-qr-code-content-image___PI-sP","component-other-qr-code-logo":"component-other-qr-code-logo___38cKv"}},80288:function(e,n,o){"use strict";o.r(n);var r=o(39428),t=o(3182),c=o(2824),i=o(67294),l=o(96486),a=o(94184),s=o.n(a),u=o(92592),h=o(35776),d=o(94610),g=o(69421),p=o(83488),m=o(9101),f=o(50998),x=o(77111),C=o(68400),v=o.n(C),b=o(85893),j=p.Z.getRgbaString,Z=p.Z.getHexString,y=function(e){var n=(0,i.useState)(""),o=(0,c.Z)(n,2),a=o[0],p=o[1],C=e.className,y=e.style,k=e.value,w=e.global,q=e.children,_=e.wrapper,K=w.screenType,R=k.id,M=k.config,z=M.options,F=M.style.border,N=z.condition,D=z.logo,P=z.base,I=(0,i.useRef)((0,l.uniqueId)(x.q)),O=(0,d.Co)({component:k,global:w}),S=O.request,V=O.linkageMethod,A=O.getValue,G=O.requestUrl,H=O.componentFilter,U=O.value,L=void 0===U?[]:U,Q=O.componentFilterMap,T=O.onCondition,Y=(0,d.kY)(T,K),B=Y.onCondition,E=Y.style,J=Y.className,W=(0,i.useMemo)((function(){return m.ZP.getFieldMapValue(L,{map:Q})}),[L,Q]),X=function(){V("click",{value:W.value})},$=(0,i.useMemo)((function(){var e=D.show,n=D.size,o=D.image,r=D.borderRadius,t=D.border;return e&&o?(0,b.jsx)("img",{className:v()["component-other-qr-code-logo"],src:o,style:{borderRadius:r,border:"".concat(t.width,"px ").concat(t.type," ").concat(j(t.color)),width:n.width,height:n.height}}):null}),[D]),ee=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(n,o){return(0,r.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){u.toDataURL(n,o,(function(n,o){n?r(n):e(o)}))})).then((function(e){p(e)})).catch((function(e){console.error(e)})));case 1:case"end":return e.stop()}}),e)})));return function(n,o){return e.apply(this,arguments)}}(),ne=(0,i.useMemo)((function(){return s()(C,"w-100 h-100",v()["component-other-qr-code"],J)}),[C,J]),oe=(0,i.useMemo)((function(){return(0,l.merge)(y,E)}),[y,E]);return(0,h.Z)((function(){ee(W.value,{margin:P.margin,color:{light:Z(P.backgroundColor),dark:Z(P.codeColor)}})}),[W.value,P]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:ne,style:oe,id:I.current,onClick:X,children:(0,b.jsxs)(_,{border:F,children:[q,(0,b.jsxs)("div",{className:v()["component-other-qr-code-content"],style:{backgroundColor:j(P.backgroundColor),borderRadius:f.dG,overflow:"hidden"},children:[(0,b.jsx)("img",{src:a,className:v()["component-other-qr-code-content-image"]}),$]})]})}),(0,b.jsx)(g.Z,{id:R,url:G,reFetchData:S,reGetValue:A,reCondition:B,componentFilter:H,componentCondition:N})]})},k=y;k.id=x.q,n["default"]=k},16791:function(e,n,o){"use strict";o.r(n),o.d(n,{default:function(){return q}});var r=o(32059),t=o(69610),c=o(54941),i=o(81306),l=o(80017),a=o(67294),s=o(68628),u=o(80585),h=o(35931),d=o(83488),g=o(13631),p=o(46201),m=o(13216),f=o(24473),x=o(50962),C=o(79837),v=o(28832),b=o(89426),j=o(85893),Z=function(e){var n=e.value,o=e.onChange,r=(0,a.useCallback)((function(e){o({config:{options:{condition:e}}})}),[o]);return(0,j.jsx)(b.Z,{value:n,onChange:r})},y=Z,k=g.Z.Item,w=function(e){(0,i.Z)(o,e);var n=(0,l.Z)(o);function o(){var e;(0,t.Z)(this,o);for(var c=arguments.length,i=new Array(c),l=0;l<c;l++)i[l]=arguments[l];return e=n.call.apply(n,[this].concat(i)),e.onKeyChange=function(n,o){e.props.onChange({config:{options:(0,r.Z)({},n,o)}})},e}return(0,c.Z)(o,[{key:"render",value:function(){var e=this,n=this.props.value,o=n.config.options,r=o.condition,t=o.logo,c=o.base;return(0,j.jsx)(h.Z,{items:[{label:(0,j.jsx)(h.O,{children:"\u5168\u5c40\u6837\u5f0f"}),children:(0,j.jsxs)(g.Z,{level:1,children:[(0,j.jsx)(k,{label:"\u4e8c\u7ef4\u7801\u989c\u8272",placeholder:(0,j.jsx)(u.Z,{title:"\u989c\u8272\u9700\u8981\u6bd4\u80cc\u666f\u989c\u8272\u6df1",children:(0,j.jsx)(s.Z,{})}),children:(0,j.jsx)(C.Z,{children:(0,j.jsx)(d.D,{value:c.codeColor,onChange:function(n){e.onKeyChange("base",{codeColor:n})}})})}),(0,j.jsx)(k,{label:"\u80cc\u666f\u989c\u8272",children:(0,j.jsx)(C.Z,{children:(0,j.jsx)(d.D,{value:c.backgroundColor,onChange:function(n){e.onKeyChange("base",{backgroundColor:n})}})})}),(0,j.jsx)(k,{label:"\u5916\u8fb9\u8ddd",children:(0,j.jsx)(C.Z,{children:(0,j.jsx)(v.Z,{value:c.margin,onChange:function(n){e.onKeyChange("base",{margin:n})}})})}),(0,j.jsxs)(x.u,{child:{header:"logo",key:"logo",visibleRender:!0,value:t.show,onChange:function(n){e.onKeyChange("logo",{show:n})}},parent:{activeKey:["logo"]},children:[(0,j.jsx)(k,{label:"\u56fe\u5f62",children:(0,j.jsx)(C.Z,{children:(0,j.jsx)(p.Z,{value:t.image,onChange:function(n){e.onKeyChange("logo",{image:n})}})})}),(0,j.jsxs)(k,{label:"\u56fe\u7247\u5c3a\u5bf8",placeholder:(0,j.jsx)(u.Z,{title:"\u5c3a\u5bf8\u8fc7\u5927\u53ef\u80fd\u4f1a\u5f71\u54cd\u626b\u7801",children:(0,j.jsx)(s.Z,{})}),children:[(0,j.jsx)(m.Z,{label:"\u5bbd\u5ea6",children:(0,j.jsx)(v.Z,{value:t.size.width,onChange:function(n){e.onKeyChange("logo",{size:{width:n}})}})}),(0,j.jsx)(m.Z,{label:"\u9ad8\u5ea6",children:(0,j.jsx)(v.Z,{value:t.size.height,onChange:function(n){e.onKeyChange("logo",{size:{height:n}})}})})]}),(0,j.jsx)(k,{label:"\u5706\u89d2",children:(0,j.jsx)(C.Z,{children:(0,j.jsx)(v.Z,{value:t.borderRadius,onChange:function(n){e.onKeyChange("logo",{borderRadius:n})}})})}),(0,j.jsx)(f.Z,{value:t.border,onChange:function(n){e.onKeyChange("logo",{border:n})}})]})]}),key:"1"},{label:(0,j.jsx)(h.O,{children:"\u6761\u4ef6"}),children:(0,j.jsx)(g.Z,{level:1,children:(0,j.jsx)(y,{value:r,onChange:this.onKeyChange.bind(null,"condition")})}),key:"2"}]})}}]),o}(a.Component),q=w}}]);