var M=Object.defineProperty,R=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var b=(o,n,t)=>n in o?M(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t,w=(o,n)=>{for(var t in n||(n={}))k.call(n,t)&&b(o,t,n[t]);if(_)for(var t of _(n))C.call(n,t)&&b(o,t,n[t]);return o},x=(o,n)=>R(o,P(n));import{R as i,r as p,dh as A,d5 as F,cr as H,S as O}from"./index.d85f42cd.js";import{C as B}from"./index.416b97a2.js";import"./index.9a267f19.js";import{P as I}from"./index.9188d624.js";import{R as U,g as j}from"./common.9f7dcf02.js";import{L as S}from"./index.92f84358.js";import"./index.d8dd6c9b.js";import"./Pagination.08be496f.js";import{D as z}from"./index.bc2518e5.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var T=function(o,n){return T=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},T(o,n)};function $(o,n){T(o,n);function t(){this.constructor=o}o.prototype=n===null?Object.create(n):(t.prototype=n.prototype,new t)}var m=function(){return m=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++){t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},m.apply(this,arguments)};function K(o,n,t,e){var r,s=!1,c=0;function g(){r&&clearTimeout(r)}function E(){g(),s=!0}typeof n!="boolean"&&(e=t,t=n,n=void 0);function f(){var y=this,d=Date.now()-c,l=arguments;if(s)return;function u(){c=Date.now(),t.apply(y,l)}function a(){r=void 0}e&&!r&&u(),g(),e===void 0&&d>o?u():n!==!0&&(r=setTimeout(e?a:u,e===void 0?o-d:o))}return f.cancel=E,f}var h={Pixel:"Pixel",Percent:"Percent"},N={unit:h.Percent,value:.8};function Y(o){return typeof o=="number"?{unit:h.Percent,value:o*100}:typeof o=="string"?o.match(/^(\d*(\.\d+)?)px$/)?{unit:h.Pixel,value:parseFloat(o)}:o.match(/^(\d*(\.\d+)?)%$/)?{unit:h.Percent,value:parseFloat(o)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),N):(console.warn("scrollThreshold should be string or number"),N)}var W=function(o){$(n,o);function n(t){var e=o.call(this,t)||this;return e.lastScrollTop=0,e.actionTriggered=!1,e.startY=0,e.currentY=0,e.dragging=!1,e.maxPullDownDistance=0,e.getScrollableTarget=function(){return e.props.scrollableTarget instanceof HTMLElement?e.props.scrollableTarget:typeof e.props.scrollableTarget=="string"?document.getElementById(e.props.scrollableTarget):(e.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},e.onStart=function(r){e.lastScrollTop||(e.dragging=!0,r instanceof MouseEvent?e.startY=r.pageY:r instanceof TouchEvent&&(e.startY=r.touches[0].pageY),e.currentY=e.startY,e._infScroll&&(e._infScroll.style.willChange="transform",e._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},e.onMove=function(r){!e.dragging||(r instanceof MouseEvent?e.currentY=r.pageY:r instanceof TouchEvent&&(e.currentY=r.touches[0].pageY),!(e.currentY<e.startY)&&(e.currentY-e.startY>=Number(e.props.pullDownToRefreshThreshold)&&e.setState({pullToRefreshThresholdBreached:!0}),!(e.currentY-e.startY>e.maxPullDownDistance*1.5)&&e._infScroll&&(e._infScroll.style.overflow="visible",e._infScroll.style.transform="translate3d(0px, "+(e.currentY-e.startY)+"px, 0px)")))},e.onEnd=function(){e.startY=0,e.currentY=0,e.dragging=!1,e.state.pullToRefreshThresholdBreached&&(e.props.refreshFunction&&e.props.refreshFunction(),e.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){e._infScroll&&(e._infScroll.style.overflow="auto",e._infScroll.style.transform="none",e._infScroll.style.willChange="unset")})},e.onScrollListener=function(r){typeof e.props.onScroll=="function"&&setTimeout(function(){return e.props.onScroll&&e.props.onScroll(r)},0);var s=e.props.height||e._scrollableNode?r.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!e.actionTriggered){var c=e.props.inverse?e.isElementAtTop(s,e.props.scrollThreshold):e.isElementAtBottom(s,e.props.scrollThreshold);c&&e.props.hasMore&&(e.actionTriggered=!0,e.setState({showLoader:!0}),e.props.next&&e.props.next()),e.lastScrollTop=s.scrollTop}},e.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},e.throttledOnScrollListener=K(150,e.onScrollListener).bind(e),e.onStart=e.onStart.bind(e),e.onMove=e.onMove.bind(e),e.onEnd=e.onEnd.bind(e),e}return n.prototype.componentDidMount=function(){if(typeof this.props.dataLength=="undefined")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},n.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},n.prototype.componentDidUpdate=function(t){this.props.dataLength!==t.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},n.getDerivedStateFromProps=function(t,e){var r=t.dataLength!==e.prevDataLength;return r?m(m({},e),{prevDataLength:t.dataLength}):null},n.prototype.isElementAtTop=function(t,e){e===void 0&&(e=.8);var r=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,s=Y(e);return s.unit===h.Pixel?t.scrollTop<=s.value+r-t.scrollHeight+1:t.scrollTop<=s.value/100+r-t.scrollHeight+1},n.prototype.isElementAtBottom=function(t,e){e===void 0&&(e=.8);var r=t===document.body||t===document.documentElement?window.screen.availHeight:t.clientHeight,s=Y(e);return s.unit===h.Pixel?t.scrollTop+r>=t.scrollHeight-s.value:t.scrollTop+r>=s.value/100*t.scrollHeight},n.prototype.render=function(){var t=this,e=m({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),r=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),s=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return i.createElement("div",{style:s,className:"infinite-scroll-component__outerdiv"},i.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(c){return t._infScroll=c},style:e},this.props.pullDownToRefresh&&i.createElement("div",{style:{position:"relative"},ref:function(c){return t._pullDown=c}},i.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!r&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},n}(p.exports.Component);const q=o=>{var d;const{type:n}=o,[t,e]=p.exports.useState({}),[r,s]=p.exports.useState([]),[c,g]=p.exports.useState({current:1,pageSize:10,total:0}),E=A(),f=async(l,u)=>{const a=await E(w({page:l,rows:c.pageSize},t));let v=[];u?v=a==null?void 0:a.data:v=r==null?void 0:r.concat(a==null?void 0:a.data),v.sort((L,D)=>L.rankNum<D.rankNum?-1:L.rankNum==D.rankNum?0:1),s(v),g(x(w({},c),{total:a==null?void 0:a.total,current:l,showQuickJumper:!0}))};p.exports.useEffect(()=>{f(1,!0)},[n]);function y(){f(c.current+1,!1)}return i.createElement("div",{className:"rank-list",id:"scrollableDiv"},i.createElement(W,{dataLength:(d=r==null?void 0:r.length)!=null?d:0,next:y,hasMore:!0,loader:i.createElement(F,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:i.createElement(z,{plain:!0},"\u6CA1\u6709\u66F4\u591A \u{1F910}"),scrollableTarget:"scrollableDiv"},i.createElement(S,{dataSource:r,renderItem:l=>{const u=i.createElement(S.Item,{key:l.id},i.createElement(S.Item.Meta,{avatar:i.createElement(H,{size:48,src:l.shoperManagerAvatar}),title:i.createElement("div",{className:"rank-item-title"},i.createElement("span",{className:"shopName"},"\u5E97\u540D:",l.shopName),i.createElement("span",{className:"shoperManagerName"},"\u5E97\u957F:",l.shoperManagerName)),description:i.createElement("div",{className:"rank-item-desp"},i.createElement("span",{className:"cityName"},"\u57CE\u5E02\u540D:",l.cityName),i.createElement("span",{className:"rankName"},"\u6392\u540D:",l.rankNum))}));let a=u;return l.rankNum<=3&&(a=i.createElement(O.Ribbon,{text:`\u6392\u540D\uFF1A${l.rankNum}`,color:"red",placement:"start"},u)),a}})))},oe=()=>{const[o,n]=p.exports.useState(U.SUMMARY),t=e=>{n(e)};return i.createElement(I,{className:"rank-list-page"},i.createElement(B,{className:"rank-list-card",style:{width:"100%"},tabList:j,activeTabKey:o,onTabChange:t},i.createElement(q,{type:o})))};export{oe as default};