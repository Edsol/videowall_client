(function(e){function t(t){for(var a,s,c=t[0],l=t[1],i=t[2],b=0,u=[];b<c.length;b++)s=c[b],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&u.push(r[s][0]),r[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);d&&d(t);while(u.length)u.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,c=1;c<n.length;c++){var l=n[c];0!==r[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},o=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var d=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0fd5":function(e,t,n){var a={"./af":"8206","./af.js":"8206","./ar":"cdac","./ar-dz":"7f26","./ar-dz.js":"7f26","./ar-kw":"8e88","./ar-kw.js":"8e88","./ar-ly":"cd65","./ar-ly.js":"cd65","./ar-ma":"e8d6","./ar-ma.js":"e8d6","./ar-sa":"a284","./ar-sa.js":"a284","./ar-tn":"64f7","./ar-tn.js":"64f7","./ar.js":"cdac","./az":"b139","./az.js":"b139","./be":"98e2","./be.js":"98e2","./bg":"a1a5","./bg.js":"a1a5","./bm":"4d0d","./bm.js":"4d0d","./bn":"e8ae","./bn-bd":"5dd8","./bn-bd.js":"5dd8","./bn.js":"e8ae","./bo":"bcf2","./bo.js":"bcf2","./br":"69f1","./br.js":"69f1","./bs":"24d1","./bs.js":"24d1","./ca":"3507","./ca.js":"3507","./cs":"d15f","./cs.js":"d15f","./cv":"7bfe","./cv.js":"7bfe","./cy":"1d35","./cy.js":"1d35","./da":"a019","./da.js":"a019","./de":"0cfa","./de-at":"edea","./de-at.js":"edea","./de-ch":"9aae","./de-ch.js":"9aae","./de.js":"0cfa","./dv":"1722","./dv.js":"1722","./el":"5390","./el.js":"5390","./en-au":"dad9","./en-au.js":"dad9","./en-ca":"6f13","./en-ca.js":"6f13","./en-gb":"6267","./en-gb.js":"6267","./en-ie":"80b1","./en-ie.js":"80b1","./en-il":"ad38","./en-il.js":"ad38","./en-in":"eb60","./en-in.js":"eb60","./en-nz":"39db","./en-nz.js":"39db","./en-sg":"c30d","./en-sg.js":"c30d","./eo":"1a30","./eo.js":"1a30","./es":"48a3","./es-do":"f306","./es-do.js":"f306","./es-mx":"56d9","./es-mx.js":"56d9","./es-us":"60bf","./es-us.js":"60bf","./es.js":"48a3","./et":"f891","./et.js":"f891","./eu":"a403","./eu.js":"a403","./fa":"ce14","./fa.js":"ce14","./fi":"fc14","./fi.js":"fc14","./fil":"f46e","./fil.js":"f46e","./fo":"2bf2","./fo.js":"2bf2","./fr":"c1e8","./fr-ca":"50a2","./fr-ca.js":"50a2","./fr-ch":"b087","./fr-ch.js":"b087","./fr.js":"c1e8","./fy":"4665","./fy.js":"4665","./ga":"b396","./ga.js":"b396","./gd":"056c","./gd.js":"056c","./gl":"efde","./gl.js":"efde","./gom-deva":"12ea","./gom-deva.js":"12ea","./gom-latn":"8e2c","./gom-latn.js":"8e2c","./gu":"533d","./gu.js":"533d","./he":"7520","./he.js":"7520","./hi":"d2f3","./hi.js":"d2f3","./hr":"7e79","./hr.js":"7e79","./hu":"148f","./hu.js":"148f","./hy-am":"6711","./hy-am.js":"6711","./id":"2b10","./id.js":"2b10","./is":"1feb","./is.js":"1feb","./it":"1b21","./it-ch":"8d2c","./it-ch.js":"8d2c","./it.js":"1b21","./ja":"926e","./ja.js":"926e","./jv":"5a78","./jv.js":"5a78","./ka":"5975","./ka.js":"5975","./kk":"cc93","./kk.js":"cc93","./km":"66e1","./km.js":"66e1","./kn":"5421","./kn.js":"5421","./ko":"1297","./ko.js":"1297","./ku":"16f8","./ku.js":"16f8","./ky":"3df9","./ky.js":"3df9","./lb":"c124","./lb.js":"c124","./lo":"20a5","./lo.js":"20a5","./lt":"c14a","./lt.js":"c14a","./lv":"c553","./lv.js":"c553","./me":"ae25","./me.js":"ae25","./mi":"6f56","./mi.js":"6f56","./mk":"c8fc","./mk.js":"c8fc","./ml":"752d","./ml.js":"752d","./mn":"f09e","./mn.js":"f09e","./mr":"0a56","./mr.js":"0a56","./ms":"55b6","./ms-my":"a9e9","./ms-my.js":"a9e9","./ms.js":"55b6","./mt":"624b","./mt.js":"624b","./my":"e256","./my.js":"e256","./nb":"e1d5","./nb.js":"e1d5","./ne":"761a","./ne.js":"761a","./nl":"a0f2","./nl-be":"5cb2","./nl-be.js":"5cb2","./nl.js":"a0f2","./nn":"4fda","./nn.js":"4fda","./oc-lnc":"ec3d","./oc-lnc.js":"ec3d","./pa-in":"2f2f","./pa-in.js":"2f2f","./pl":"317f","./pl.js":"317f","./pt":"5553","./pt-br":"a9ab","./pt-br.js":"a9ab","./pt.js":"5553","./ro":"db12","./ro.js":"db12","./ru":"7aa4","./ru.js":"7aa4","./sd":"e87b","./sd.js":"e87b","./se":"a296","./se.js":"a296","./si":"51ec","./si.js":"51ec","./sk":"608b","./sk.js":"608b","./sl":"b367","./sl.js":"b367","./sq":"f68f","./sq.js":"f68f","./sr":"0991","./sr-cyrl":"c577","./sr-cyrl.js":"c577","./sr.js":"0991","./ss":"cf76","./ss.js":"cf76","./sv":"0153","./sv.js":"0153","./sw":"cb6f","./sw.js":"cb6f","./ta":"8bfa","./ta.js":"8bfa","./te":"668b","./te.js":"668b","./tet":"eae7","./tet.js":"eae7","./tg":"70b1","./tg.js":"70b1","./th":"7180","./th.js":"7180","./tk":"4912","./tk.js":"4912","./tl-ph":"f8bb","./tl-ph.js":"f8bb","./tlh":"b026","./tlh.js":"b026","./tr":"371d","./tr.js":"371d","./tzl":"c744","./tzl.js":"c744","./tzm":"787a","./tzm-latn":"71e0","./tzm-latn.js":"71e0","./tzm.js":"787a","./ug-cn":"6b5c","./ug-cn.js":"6b5c","./uk":"8c0c","./uk.js":"8c0c","./ur":"519e","./ur.js":"519e","./uz":"7982","./uz-latn":"3137","./uz-latn.js":"3137","./uz.js":"7982","./vi":"ae22","./vi.js":"ae22","./x-pseudo":"1129","./x-pseudo.js":"1129","./yo":"b4bf","./yo.js":"b4bf","./zh-cn":"fdc4","./zh-cn.js":"fdc4","./zh-hk":"747d","./zh-hk.js":"747d","./zh-mo":"fe39","./zh-mo.js":"fe39","./zh-tw":"d3e0","./zh-tw.js":"d3e0"};function r(e){var t=o(e);return n(t)}function o(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=o,e.exports=r,r.id="0fd5"},"17d0":function(e,t,n){"use strict";n("3c86")},"1d8e":function(e,t,n){"use strict";n("5143")},"3c86":function(e,t,n){},5143:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),r=n("1344"),o=n("bc3a"),s=n.n(o),c={id:"app"},l={class:"wrapper"},i=Object(a["createElementVNode"])("hr",{class:"mt-5 mb-5"},null,-1);function d(e,t,n,r,o,s){var d=Object(a["resolveComponent"])("Navbar"),b=Object(a["resolveComponent"])("UrlLoader"),u=Object(a["resolveComponent"])("UrlList");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",c,[Object(a["createVNode"])(d),Object(a["createElementVNode"])("div",l,[Object(a["createVNode"])(b),i,Object(a["createVNode"])(u)])])}var b={class:"navbar navbar-expand-lg navbar-dark bg-dark"},u={class:"container-fluid"},j=Object(a["createElementVNode"])("a",{class:"navbar-brand",href:"#"},"Client",-1),f=Object(a["createElementVNode"])("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(a["createElementVNode"])("span",{class:"navbar-toggler-icon"})],-1),p={class:"collapse navbar-collapse",id:"navbarSupportedContent"},m={class:"navbar-nav me-auto mb-2 mb-lg-0"},h=Object(a["createElementVNode"])("li",{class:"nav-item"},[Object(a["createElementVNode"])("a",{class:"nav-link active","aria-current":"page",href:"#"},"Home")],-1),v={class:"nav-item dropdown"},O=Object(a["createElementVNode"])("li",{class:"nav-item dropdown"},null,-1);function g(e,t,n,r,o,s){var c=Object(a["resolveComponent"])("UtilsDropdown");return Object(a["openBlock"])(),Object(a["createElementBlock"])("nav",b,[Object(a["createElementVNode"])("div",u,[j,f,Object(a["createElementVNode"])("div",p,[Object(a["createElementVNode"])("ul",m,[h,Object(a["createElementVNode"])("li",v,[Object(a["createVNode"])(c)]),O])])])])}var y=Object(a["createElementVNode"])("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Options ",-1),k={class:"dropdown-menu","aria-labelledby":"navbarDropdown"};function N(e,t,n,r,o,s){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[y,Object(a["createElementVNode"])("ul",k,[Object(a["createElementVNode"])("li",null,[Object(a["createElementVNode"])("a",{class:"dropdown-item",href:"#",onClick:t[0]||(t[0]=function(){return s.reloadService&&s.reloadService.apply(s,arguments)})},"Reload service")]),Object(a["createElementVNode"])("li",null,[Object(a["createElementVNode"])("a",{class:"dropdown-item",href:"#",onClick:t[1]||(t[1]=function(){return s.reboot&&s.reboot.apply(s,arguments)})},"Reboot device")]),Object(a["createElementVNode"])("li",null,[Object(a["createElementVNode"])("a",{class:"dropdown-item",href:"#",onClick:t[2]||(t[2]=function(){return s.closeAllBrowser&&s.closeAllBrowser.apply(s,arguments)})},"Close all browser")]),Object(a["createElementVNode"])("li",null,[Object(a["createElementVNode"])("a",{class:"dropdown-item",href:"#",onClick:t[3]||(t[3]=function(){return s.identifyDevice&&s.identifyDevice.apply(s,arguments)})},"Identify device")])])])}var E={name:"UtilsDropdown",methods:{reloadService:function(){var e=this;this.axios.get(this.apiUrl+"reload").then((function(t){console.log("reloadService",t.data),!0===t.data.execute?e.$toast.open({message:"Service correctly reloaded",type:"success",duration:5e3,dismissible:!0}):e.$toast.open({message:t.data.error,type:"error",duration:5e3,dismissible:!0})}))},reboot:function(){console.log("reboot"),this.axios.get(this.apiUrl+"reboot")},closeAllBrowser:function(){console.log("closeAllBrowser"),this.axios.get(this.apiUrl+"closeBrowser")},identifyDevice:function(){console.log("identifyDevice"),this.axios.get(this.apiUrl+"osd/"+location.hostname)}}},V=n("6b0d"),U=n.n(V);const w=U()(E,[["render",N]]);var x=w,D={name:"Navbar",components:{UtilsDropdown:x}};const B=U()(D,[["render",g]]);var z=B,C=function(e){return Object(a["pushScopeId"])("data-v-bea111b2"),e=e(),Object(a["popScopeId"])(),e},L=C((function(){return Object(a["createElementVNode"])("span",{class:"text-bold h3"},"Url histories:",-1)})),S={id:"urlHistories",class:"table table-hover"},H=C((function(){return Object(a["createElementVNode"])("thead",null,[Object(a["createElementVNode"])("th",null,"date"),Object(a["createElementVNode"])("th",null,"url"),Object(a["createElementVNode"])("th",null,"port"),Object(a["createElementVNode"])("th")],-1)}));function P(e,t,n,r,o,s){var c=Object(a["resolveComponent"])("font-awesome-icon");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createElementVNode"])("div",null,[L,Object(a["createElementVNode"])("button",{class:"btn btn-sm btn-danger float-end pr-5",onClick:t[0]||(t[0]=function(){return s.clearUrlList&&s.clearUrlList.apply(s,arguments)}),title:"Clear all"},"Clear")]),Object(a["createElementVNode"])("table",S,[H,Object(a["createElementVNode"])("tbody",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(o.items,(function(e){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:e.id},[Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(s.formatDatetime(e.datetime)),1),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.url),1),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.display.port),1),Object(a["createElementVNode"])("td",null,[!1===e.close?(Object(a["openBlock"])(),Object(a["createBlock"])(c,{key:0,icon:"times-circle",class:"text-danger"})):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(c,{icon:"trash-alt",class:"text-danger cursor-pointer",onClick:function(t){return s.removeUrl(e.id)},title:"delete url"},null,8,["onClick"]),Object(a["createVNode"])(c,{icon:"retweet",class:"cursor-pointer",onClick:function(t){return s.useLink(e.id)},title:"use this URL"},null,8,["onClick"])])])})),128))])])])}n("7db0"),n("d3b7");var _=n("4e22"),M=null,T={data:function(){return{items:[]}},created:function(){var e=this;this.emitter.on("reloadUrlHistories-event",(function(t){console.log("reloadUrlHistories-event"),e.loadUrlHistories()})),M=this.backendUrl,this.$nextTick(this.loadUrlHistories)},methods:{formatDatetime:function(e){return _(e).format("YYYY-MM-DD HH:mm:ss")},loadUrlHistories:function(){var e=this;this.axios.get(M+"urlHistorylist/10").then((function(t){console.log("loadUrlHistories method",t.data),e.items=t.data}))},clearUrlList:function(){var e=this;this.axios.get(M+"clearHistoryList").then((function(t){t.data&&(e.items=[],e.$toast.open({message:"Url list has been cleaned",type:"success",duration:5e3,dismissible:!0}))}))},removeUrl:function(e){var t=this;this.axios.get(M+"removeUrl/"+e).then((function(e){"OK"===e.statusText&&(t.$toast.open({message:"Url has been removed",type:"success",duration:1e3,dismissible:!0}),t.loadUrlHistories())}))},useLink:function(e){var t=this.items.find((function(t){return t.id===e}));this.emitter.emit("updateUrl-event",{url:t.url})}}};n("1d8e");const F=U()(T,[["render",P],["__scopeId","data-v-bea111b2"]]);var $=F,A={class:"row"},q={class:"col-9"},I=Object(a["createElementVNode"])("label",{for:"url"},"URL",-1),R={class:"col-2"},Y=Object(a["createElementVNode"])("label",{for:"display"},"Display",-1),K=Object(a["createElementVNode"])("option",{disabled:"",value:""},"Please select one",-1),J=Object(a["createElementVNode"])("div",{class:"col-1"},[Object(a["createElementVNode"])("button",{class:"btn btn-primary mt-4",title:"Load url on selected display"},"Load")],-1);function G(e,t,n,r,o,s){return Object(a["openBlock"])(),Object(a["createElementBlock"])("form",{id:"urlForm",onSubmit:t[3]||(t[3]=function(){return s.checkForm&&s.checkForm.apply(s,arguments)}),action:"#"},[Object(a["createElementVNode"])("div",A,[Object(a["createElementVNode"])("div",q,[I,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{type:"url",id:"url",class:"form-control",placeholder:"http://example.com",onKeyup:t[0]||(t[0]=Object(a["withKeys"])((function(){return e.checkUrl&&e.checkUrl.apply(e,arguments)}),["enter"])),"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.url=t}),required:""},null,544),[[a["vModelText"],e.url]])]),Object(a["createElementVNode"])("div",R,[Y,Object(a["withDirectives"])(Object(a["createElementVNode"])("select",{name:"display",id:"display",class:"form-select","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.selectedDisplay=t}),required:""},[K,(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.displays,(function(e){return Object(a["openBlock"])(),Object(a["createElementBlock"])("option",{key:e.id},Object(a["toDisplayString"])(e.port),1)})),128))],512),[[a["vModelSelect"],e.selectedDisplay]])]),J])],32)}var Q=null,W=null,X={},Z={data:function(){return{displays:[],url:null,selectedDisplay:null}},created:function(){var e=this;Q=this.backendUrl,W=this.apiUrl,this.emitter.on("updateUrl-event",(function(t){e.url=t.url}))},mounted:function(){this.$nextTick(this.loadDisplayList)},methods:{loadDisplayList:function(){var e=this;this.axios.get(Q+"getDisplayList").then((function(t){console.log("Load displayList data",t.data),X=e.displays=t.data}))},openUrl:function(e,t){var n=this;console.log("openUrl",e,t,W),this.axios.post(W+"openUrl",{url:e,display:t}).then((function(e){e.data.executed?(console.log("executed",e.data),n.$toast.open({message:"Url correctly open",type:"success",duration:5e3,dismissible:!0}),n.emitter.emit("reloadUrlHistories-event"),n.url=null):console.log(e.data.errors)}))},checkForm:function(e){var t=this;console.log("Open url",this.url),e.preventDefault();var n=X.find((function(e){return e.port===t.selectedDisplay}));this.openUrl(this.url,n.id),this.selectedDisplay=null,this.url=null}}};const ee=U()(Z,[["render",G]]);var te=ee,ne={name:"App",created:function(){document.title="Videowall client"},components:{Navbar:z,UrlList:$,UrlLoader:te}};n("17d0");const ae=U()(ne,[["render",d]]);var re=ae,oe=n("b079"),se=n.n(oe),ce=(n("0deb"),n("f9e3"),n("4238"),n("ecee")),le=n("ad3d"),ie=n("c074");ce["c"].add(ie["a"],ie["d"],ie["c"],ie["b"]);var de=Object(r["a"])(),be=Object(a["createApp"])(re);be.config.globalProperties.backendUrl="http://"+location.hostname+":3000/frontend/",be.config.globalProperties.apiUrl="http://"+location.hostname+":3000/api/",be.config.globalProperties.emitter=de,be.config.globalProperties.axios=s.a,be.use(se.a),be.component("font-awesome-icon",le["a"]),be.mount("#app")}});
//# sourceMappingURL=app.0a99ee4d.js.map