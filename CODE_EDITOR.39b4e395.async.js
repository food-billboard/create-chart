(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{hQta:function(e,t,n){"use strict";n.r(t);var a=n("0Owb"),o=(n("DYRE"),n("zeV3")),c=n("tJVT"),l=n("q1tI"),r=n.n(l),u=n("TSYQ"),i=n.n(u),s=n("jrin"),d=n("PpiC"),b=n("YOiT"),m=n("eYFr"),f=n("LvDl"),v=n("0lfv"),O=n("jGJC"),j=n.n(O),p=["options","onChange","autoFocus","onMount","disabled","className","bordered","onBlur","autoFormat","value","blurCanScroll"],g=Object(l["forwardRef"])((function(e,t){var n=Object(b["a"])(e),o=Object(c["a"])(n,2),u=o[0],O=o[1],g=Object(l["useState"])(null),C=Object(c["a"])(g,2),E=C[0],h=C[1],k=e.options,S=(e.onChange,e.autoFocus),y=void 0!==S&&S,w=e.onMount,N=e.disabled,M=void 0!==N&&N,T=e.className,_=e.bordered,R=e.onBlur,F=e.autoFormat,x=void 0!==F&&F,D=(e.value,e.blurCanScroll),V=void 0!==D&&D,z=Object(d["a"])(e,p),J=Object(l["useState"])(V),A=Object(c["a"])(J,2),q=A[0],B=A[1],I=Object(l["useMemo"])((function(){return Object(f["merge"])({},{selectOnLineNumbers:!0,tabSize:2,readOnly:!!M,lineNumbersMinChars:2,contextmenu:!1,scrollbar:{arrowSize:4,handleMouseWheel:!q,verticalScrollbarSize:5,horizontalScrollbarSize:5}},k||{})}),[k,M,q]),L=function(e){Q(e),Object(v["i"])(100).then((function(t){Q(e)}))},Y=Object(l["useCallback"])((function(e,t){var n=!0===x||!(null===x||void 0===x||!x[t]);n&&Object(v["i"])(200).then((function(t){L(e)}))}),[x]),G=function(e,t){t.editor.setTheme("vs-dark-custom"),null===w||void 0===w||w(e,t),y&&!M&&e.focus(),h(e),Y(e,"mount"),e.onDidFocusEditorText((function(){V&&B(!1)})),e.onDidBlurEditorText((function(){null===R||void 0===R||R(e.getValue()),Y(e,"blur"),V&&B(!0)}))},Q=function(e){try{var t=e||E;if(!t)return;M?(t.updateOptions({readOnly:!1}),t.getAction("editor.action.formatDocument").run().then((function(){t.updateOptions({readOnly:!0})}))):t.getAction("editor.action.formatDocument").run()}catch(n){}};return Object(l["useImperativeHandle"])(t,(function(){return{format:L,setValue:O}}),[E]),r.a.createElement(m["a"],Object(a["a"])({language:"javascript",value:u,options:I,onChange:function(e){return O(null!==e&&void 0!==e?e:"")},className:i()(Object(s["a"])({},j.a["component-code-editor"],!!_),T),theme:"vs-dark",onMount:G,beforeMount:function(e){z.language&&"javascript"!==z.language||e.languages.typescript.javascriptDefaults.setCompilerOptions({target:e.languages.typescript.ScriptTarget.Latest,module:e.languages.typescript.ModuleKind.ES2015,allowNonTsExtensions:!0,lib:["es2018"]}),e.editor.defineTheme("vs-dark-custom",{base:"vs-dark",inherit:!0,rules:[],colors:{"editor.background":"#141414"}})}},z))})),C=g,E=n("sxGJ"),h=n.n(E),k=n("lfch"),S=n("bRQS"),y=n("4i/N"),w=n("Emgl"),N=function(e){var t=e.value,n=Object(l["useState"])(!1),a=Object(c["a"])(n,2),o=a[0],u=a[1],i=Object(l["useState"])(!0),s=Object(c["a"])(i,2),d=s[0],b=s[1],m=Object(l["useRef"])(Object(f["uniqueId"])("code-editor-copy")),O=Object(l["useCallback"])((function(e){var n=new h.a("#".concat(m.current),{text:function(){return t}});n.on("success",(function(){n.destroy(),b(!0),u(!0),Object(v["i"])(2e3).then((function(e){u(!1)}))})),n.on("error",(function(e){n.destroy(),b(!1),u(!0),Object(v["i"])(2e3).then((function(e){u(!1)}))})),n.onClick(e)}),[t]),j=Object(l["useMemo"])((function(){return o?d?r.a.createElement(S["a"],null):r.a.createElement(y["a"],null):r.a.createElement(k["a"],{onClick:O,id:m.current})}),[d,o,O]);return r.a.createElement(w["a"],{title:"\u590d\u5236"},j)},M=N,T=(n("2qtc"),n("kLXV")),_=n("3R4v"),R=n("ZeU6"),F=n("dRMh"),x=function(e){var t=e.onClick;return r.a.createElement(w["a"],{title:"\u4e00\u952e\u6392\u7248",iconStyle:{margin:0}},r.a.createElement(F["a"],{onClick:null===t||void 0===t?void 0:t.bind(null,void 0)}))},D=x,V=function(e){var t=e.onConfirm,n=e.value,a=e.onCancel,o=e.language,u=e.action,i=void 0===u||u,s=Object(l["useState"])(n||""),d=Object(c["a"])(s,2),b=d[0],m=d[1],f=Object(l["useState"])(!1),v=Object(c["a"])(f,2),O=v[0],p=v[1],g=Object(l["useRef"])(null),E=Object(l["useCallback"])((function(){m(n),p(!0)}),[n]),h=Object(l["useCallback"])((function(){null===t||void 0===t||t(b),p(!1)}),[t,b]),k=Object(l["useCallback"])((function(){null===a||void 0===a||a(),p(!1)}),[a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(w["a"],{title:"\u5168\u5c4f\u7f16\u8f91",iconStyle:{margin:0}},r.a.createElement(_["a"],{onClick:E})),r.a.createElement(T["a"],{open:O,onOk:h,onCancel:k,wrapClassName:j.a["full-screen-editor-modal"],width:"70vw",maskClosable:!1},r.a.createElement(R["a"],{className:"pos-re w-100 h-100"},r.a.createElement(C,{value:b,onChange:function(e){return m(null!==e&&void 0!==e?e:"")},ref:g,language:o,autoFormat:!0}),r.a.createElement("div",{className:j.a["component-code-editor-action"]},i&&r.a.createElement(D,{onClick:function(){var e;return null===(e=g.current)||void 0===e?void 0:e.format()}})))))},z=V,J=Object(l["forwardRef"])((function(e,t){var n,u,s=e.onChange,d=e.action,b=void 0===d||d,m=e.language,f=e.onBlur,v=e.fullScreenAction,O=Object(l["useState"])(null!==(n=null!==(u=null===e||void 0===e?void 0:e.value)&&void 0!==u?u:null===e||void 0===e?void 0:e.defaultValue)&&void 0!==n?n:""),p=Object(c["a"])(O,2),g=p[0],E=p[1],h=Object(l["useRef"])(null),k=Object(l["useCallback"])((function(e,t){null===s||void 0===s||s(e,t),E(e)}),[s]),S=Object(l["useCallback"])((function(e){var t;null===(t=h.current)||void 0===t||t.setValue(e),null===f||void 0===f||f(e)}),[f]),y=Object(l["useMemo"])((function(){var e=r.a.createElement(z,{value:g,onConfirm:S,language:m,action:v}),t=r.a.createElement(M,{value:g}),n=r.a.createElement(D,{onClick:function(){var e;return null===(e=h.current)||void 0===e?void 0:e.format()}});if(!b)return null;var a=Array.isArray(b)?b:["full-screen","copy","typesetting"];return r.a.createElement(o["b"],null,a.includes("full-screen")&&e,a.includes("copy")&&t,a.includes("typesetting")&&n)}),[b,g,S,m]);return Object(l["useImperativeHandle"])(t,(function(){return h.current||{}}),[]),r.a.createElement("div",{className:"pos-re"},r.a.createElement(C,Object(a["a"])({},e,{onChange:k,ref:h})),r.a.createElement("div",{className:i()(j.a["component-code-editor-action"])},y))}));t["default"]=J},jGJC:function(e,t,n){e.exports={"component-code-editor":"component-code-editor___3aq2f","component-code-editor-action":"component-code-editor-action___25Wh_","full-screen-editor-modal":"full-screen-editor-modal___3X8kT"}}}]);