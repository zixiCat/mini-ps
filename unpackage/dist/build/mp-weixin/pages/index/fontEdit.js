(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/fontEdit"],{"0cfd":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement;t._self._c},o=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return o})},"70dc":function(t,i,e){"use strict";e.r(i);var n=e("94a3"),o=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,function(){return n[t]})}(s);i["default"]=o.a},"87cf":function(t,i,e){"use strict";e.r(i);var n=e("0cfd"),o=e("70dc");for(var s in o)"default"!==s&&function(t){e.d(i,t,function(){return o[t]})}(s);var c=e("2877"),u=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,null,null);i["default"]=u.exports},"94a3":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={props:{value:Array,active:Number},data:function(){return{xAxis:null,yAxis:null,x0:null,y0:null}},watch:{value:function(t){this.$emit("input",t)}},methods:{touchStart:function(t,i,e){this.active!==e&&this.$emit("update:active",e),this.determineDirection(t,i,e)},longPress:function(t,i,e){this.value.splice(e,1),this.$emit("update:active",-1)},touchMove:function(t,i,e){i.isMove?(i.position.x=t.touches[0].clientX-this.x0,i.position.y=t.touches[0].clientY-this.y0):this.adjustItem(t,i,e)},touchEnd:function(t,i,e){i.isMove=!1,this.xAxis=null,this.yAxis=null},determineDirection:function(t,i,e){t.touches[0].clientX<i.position.x+30?(this.xAxis="-",this.x0=i.position.x+i.position.w):t.touches[0].clientX<i.position.x+i.position.w+30&&t.touches[0].clientX>i.position.x+i.position.w-30&&(this.xAxis="+",this.x0=i.position.x),this.xAxis||this.yAxis||(this.x0=t.touches[0].clientX-i.position.x,this.y0=t.touches[0].clientY-i.position.y,i.isMove=!0)},adjustItem:function(t,i,e){switch(this.xAxis){case"-":if(this.x0-t.touches[0].clientX<60||!i.position.w)break;i.position.x=t.touches[0].clientX,i.position.w=this.x0-t.touches[0].clientX;break;case"+":if(t.touches[0].clientX-this.x0<60)break;i.position.w=t.touches[0].clientX-this.x0;break;default:break}},handleFontSize:function(t){this.value[this.active].config.size=t},handleFontLineHeight:function(t){this.value[this.active].config.lineHeight=t},handleFontCenter:function(t){this.value[this.active].position.x=(t-this.value[this.active].position.w)/2},handleFontWeight:function(){this.value[this.active].config.weight=!this.value[this.active].config.weight},handleFontLineThrough:function(){this.value[this.active].config.lineThrough=!this.value[this.active].config.lineThrough}}};i.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/fontEdit-create-component',
    {
        'pages/index/fontEdit-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("87cf"))
        })
    },
    [['pages/index/fontEdit-create-component']]
]);