(self["webpackChunkcreate_chart"]=self["webpackChunkcreate_chart"]||[]).push([[3751],{67347:function(e){e.exports={"designer-water-mark":"designer-water-mark___16Cvh"}},41029:function(e){e.exports={"page-preview-pc":"page-preview-pc___1JC2S","page-preview-h5":"page-preview-h5___1NG1C","page-preview-h5-wrapper":"page-preview-h5-wrapper___2kRaV"}},73924:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Y}});var r=n(11849),a=n(93224),c=n(67294),i=n(28216),s=n(68702),o=n(82376),l=n(44382),f=n(2824),h=n(94184),u=n.n(h),g=n(45210),p=n(19228),d=function(e){var t=e.containerWidth,n=e.containerHeight,r=e.setScale,a=e.flag,i=void 0===a?"PC":a,s=e.scale,o=(0,c.useState)({width:1920,height:1080}),l=(0,f.Z)(o,2),h=l[0],u=h.width,g=h.height,d=l[1],v=function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;d({width:e,height:t})},w=(0,c.useMemo)((function(){var e=u/t,r=g/n;if("H5"===i)return[e,e];switch(s){case"full":return[e,r];case"fit-width":return[e,e];case"fit-height":return[r,r];case"fit-height-scroll":return[r,r];case"none":default:return[1,1]}}),[u,g,t,n,i,s]),m=(0,f.Z)(w,2),y=m[0],b=m[1];return(0,c.useEffect)((function(){return(0,p._v)(1e3).then(v),window.addEventListener("resize",v),function(){window.removeEventListener("resize",v)}}),[]),(0,c.useEffect)((function(){r(100*y)}),[y,r]),[y,b]},v=d,w=n(41029),m=n.n(w),y=function(e){var t=e.containerWidth,n=e.containerHeight,r=e.setScale,a=e.flag,i=void 0===a?"PC":a,s=e.scale,o=v({containerWidth:t,containerHeight:n,setScale:r,flag:i,scale:s}),l=(0,f.Z)(o,2),h=l[0],p=l[1];return(0,c.useEffect)((function(){var e=document.querySelector("html"),r=document.body,a=document.querySelector("#root"),c="";if(e)switch(s){case"full":case"fit-width":case"fit-height":case"none":e.style.overflow="hidden visible";break;case"fit-height-scroll":e.style.overflow="visible hidden";break}switch(s){case"full":c+="transform: scale(".concat(h,", ").concat(p,");");break;case"fit-width":c+="transform: scale(".concat(h,") translateY(-50%);position: relative;top:50%;");break;case"fit-height":c+="transform: scale(".concat(h,") translateX(-50%);position: relative;left:50%;");break;case"none":break;case"fit-height-scroll":c+="transform: scale(".concat(h,") translateX(-50%);position: relative;left:50%;");break}c+="transform-origin: left top;width: ".concat(t,"px; height: ").concat(n,"px"),r.style.cssText=c,a&&(a.style.overflow="visible")}),[i,h,p,s,t,n]),(0,g.Z)((function(){var e=document.querySelector("html"),t=document.body,n=document.querySelector("#root");e&&(e.style.overflow=""),t.style.cssText="transform: '';width: '';height: '';position:'';left:'';top:'';",n&&(n.style.overflow="")})),"H5"===i?{className:u()(m()["page-preview-h5"],"page-preview-container"),style:{transform:"scale(".concat(h,") translateX(0)"),minHeight:"calc( 100vh / ".concat(h," )")},scale:h}:{className:u()(m()["page-preview-pc"],"page-preview-container"),style:{transform:"scale(1)"},scale:h}},b=y,k=(n(13254),n(14277)),S=n(63805),x=n.n(S),_=n(22649),j=n(85893),H=x()();function Z(e){var t=e.flag,n=e.children,r=e.scale,a=(0,_.Z)((function(){return document.querySelector(".page-preview-container")}))||{},c=a.height,i=void 0===c?0:c;return H&&"PC"===t?(0,j.jsx)(k.Z,{description:"\u8bf7\u5728\u7535\u8111\u7aef\u4f7f\u7528",style:{position:"relative",top:"50%",transform:"translateY(-50%)"}}):H||"H5"!==t?"H5"===t?(0,j.jsx)("div",{className:u()("w-100 h-100 zero-scrollbar",m()["page-preview-h5-wrapper"]),children:(0,j.jsx)("div",{className:"w-100",style:{height:i*r,overflow:"hidden"},children:n})}):(0,j.jsx)(j.Fragment,{children:n}):(0,j.jsx)(k.Z,{description:"\u8bf7\u5728\u624b\u673a\u7aef\u4f7f\u7528",style:{position:"relative",top:"50%",transform:"translateY(-50%)"}})}var C=(0,i.$j)((function(e){return{flag:e.global.screenData.config.flag.type}}),(function(){return{}}))(Z),E=function(e){return{waterMark:e.global.screenData.config.attr.waterMark}},D=function(e){return{}},N=n(67347),q=n.n(N),T=function(e){var t=e.waterMark;return(0,j.jsx)("div",{className:q()["designer-water-mark"],style:{display:t?"block":"none"}})},W=(0,i.$j)(E,D)(T),M=function(e){return{width:e.global.screenData.config.style.width,height:e.global.screenData.config.style.height,flag:e.global.screenData.config.flag.type,scale:e.global.screenData.config.attr.scale}},z=function(e){return{setScreenType:function(t){return e({type:"global/setScreenType",value:t})},setScale:function(t){return e({type:"global/setScale",value:t})}}},P=["scale"];function X(e){var t=e.setScreenType,n=e.width,i=e.height,f=e.setScale,h=e.flag,u=e.scale,g=b({containerWidth:n,containerHeight:i,setScale:f,flag:h,scale:u}),p=g.scale,d=(0,a.Z)(g,P);return(0,c.useEffect)((function(){t("preview")}),[t]),(0,s.Un)((function(){})),(0,j.jsxs)(C,{scale:p,children:[(0,j.jsx)(l.rb,(0,r.Z)({},d)),(0,j.jsx)(o.Z,{}),(0,j.jsx)(W,{})]})}var Y=(0,i.$j)(M,z)(X)}}]);