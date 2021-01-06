(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e3007686"],{"0436":function(t,e,a){},"148a":function(t,e,a){"use strict";a("243f")},"243f":function(t,e,a){},"25f0":function(t,e,a){"use strict";var n=a("6eeb"),s=a("825a"),i=a("d039"),o=a("ad6d"),r="toString",c=RegExp.prototype,l=c[r],u=i((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=r;(u||d)&&n(RegExp.prototype,r,(function(){var t=s(this),e=String(t.source),a=t.flags,n=String(void 0===a&&t instanceof RegExp&&!("flags"in c)?o.call(t):a);return"/"+e+"/"+n}),{unsafe:!0})},"2b83":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Navbar",{attrs:{currPage:"reservation"}}),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 form"},[a("h1",[t._v("Reservation Information")]),a("label",[t._m(0),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Fill your name"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("label",[t._m(1),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.phone,expression:"phone",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"Fill your phone number"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"reserve_btn",class:{disabled:""===t.name||""===t.phone},on:{click:function(e){return e.preventDefault(),t.bookRoom(e)}}},[t._v("RESERVE NOW")])]),a("div",{staticClass:"col-6 info"},[a("img",{attrs:{src:t.singleRoom.imageUrl[0],alt:t.singleRoom.name}}),a("div",{staticClass:"room_name"},[t._v(t._s(t.singleRoom.name))]),a("div",[a("i",{staticClass:"fas fa-calendar-check"}),a("em",[t._v("Check-In")]),a("span",{staticClass:"date"},[t._v(t._s(t.reserveFrom))])]),a("div",[a("i",{staticClass:"fas fa-calendar-check"}),a("em",[t._v("Check-Out")]),a("span",{staticClass:"date"},[t._v(t._s(t.reserveTo))])]),a("div",[a("div",{staticClass:"booking-subtotal"},[a("ul",[a("li",{staticClass:"workingDay"},[a("span",[t._v(" "+t._s(t._f("currency")(t.singleRoom.normalDayPrice))+" X "+t._s(t.workingDay)+" night (Weekdays)")]),a("span",{staticClass:"subtotal"},[t._v(" "+t._s(t._f("currency")(t.singleRoom.normalDayPrice*t.workingDay)))])]),a("li",{staticClass:"holiday"},[a("span",[t._v(" "+t._s(t._f("currency")(t.singleRoom.holidayPrice))+" X "+t._s(t.holiday)+" night (Holidays)")]),a("span",{staticClass:"subtotal"},[t._v(" "+t._s(t._f("currency")(t.singleRoom.holidayPrice*t.holiday)))])]),a("li",{staticClass:"service_fee"},[a("span",[t._v("Service Fee")]),a("span",{staticClass:"subtotal"},[t._v(" "+t._s(t._f("currency")(t.serviceFee)))])])]),a("div",{staticClass:"total_price"},[a("span",[t._v("TOTAL")]),a("span",{staticClass:"item"},[t._v(" "+t._s(t._f("currency")(t.totalprice)))])])])])])])])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i",{staticClass:"fas fa-user"}),t._v("Name")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i",{staticClass:"fas fa-mobile-alt"}),t._v("Phone")])}],i=(a("b0c0"),a("9c9e")),o=a("d178"),r={name:"Reservation",mixins:[i["a"]],components:{Navbar:o["a"]},data:function(){return{name:"",phone:"",roomid:this.$route.params.id}},computed:{serviceFee:function(){return this.$store.state.serviceFee},singleRoom:function(){return this.$store.state.singleroominfo},reservations:function(){return this.$store.state.reservation},reserveFrom:function(){return this.reservations.date[0]},reserveTo:function(){var t=new Date(this.reservations.date[this.reservations.date.length-1]);return this.dateFormat(this.addDate(t,1))}},methods:{bookRoom:function(){var t=this;console.log("bookRoom!"),this.$store.dispatch("roomBooking",{roomName:this.singleRoom.name,roomId:this.roomid,name:this.name,tel:this.phone,date:this.reservations.date}).then((function(){t.$router.push({name:"Thanks"})}))}},created:function(){var t=this;this.$store.dispatch("isLoading",!0),this.$store.dispatch("getSingleroom",this.roomid).then((function(){t.countDate(t.reserveFrom,t.reserveTo)})),this.$store.dispatch("isLoading",!1),console.log(this.workingDay),console.log(this.holiday),console.log(this.booking.date)}},c=r,l=(a("cd65"),a("2877")),u=Object(l["a"])(c,n,s,!1,null,"d8051162",null);e["default"]=u.exports},"99af":function(t,e,a){"use strict";var n=a("23e7"),s=a("d039"),i=a("e8b5"),o=a("861d"),r=a("7b0b"),c=a("50c4"),l=a("8418"),u=a("65f0"),d=a("1dde"),h=a("b622"),m=a("2d00"),f=h("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",p=m>=51||!s((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),b=d("concat"),_=function(t){if(!o(t))return!1;var e=t[f];return void 0!==e?!!e:i(t)},w=!p||!b;n({target:"Array",proto:!0,forced:w},{concat:function(t){var e,a,n,s,i,o=r(this),d=u(o,0),h=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?o:arguments[e],_(i)){if(s=c(i.length),h+s>v)throw TypeError(g);for(a=0;a<s;a++,h++)a in i&&l(d,h,i[a])}else{if(h>=v)throw TypeError(g);l(d,h++,i)}return d.length=h,d}})},"9c9e":function(t,e,a){"use strict";a("99af"),a("a9e3"),a("d3b7"),a("25f0");var n={data:function(){return{maxDate:this.addDate(new Date,90),workingDay:0,holiday:0,booking:{start:"",end:"",date:[]}}},computed:{totalprice:function(){return this.singleRoom?this.singleRoom.holidayPrice*this.holiday+this.singleRoom.normalDayPrice*this.workingDay+this.serviceFee:0}},methods:{addDate:function(t,e){var a=e||0,n=new Date(Number(t));return n.setDate(t.getDate()+a),n},resetDate:function(){this.booking.start="",this.booking.end=""},updateDate:function(t){this.booking.start=new Date(t.start),this.booking.end=new Date(t.end),this.countDate()},countDate:function(t,e){this.booking.date=[];var a=0,n=0,s=t?new Date(t):this.booking.start,i=e?new Date(e):this.booking.end;while(s<i){var o=s.getDay();0===o||6===o?n+=1:a+=1,t||e||this.booking.date.push(this.dateFormat(s)),s.setDate(s.getDate()+1)}this.workingDay=a,this.holiday=n},dateFormat:function(t){var e=t.getFullYear().toString(),a=(t.getMonth()+1).toString(),n=t.getDate().toString();return a=1===a.length?"0".concat(a):a,n=1===n.length?"0".concat(n):n,"".concat(e,"-").concat(a,"-").concat(n)}}};e["a"]=n},cd65:function(t,e,a){"use strict";a("0436")},d178:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("transition",{attrs:{name:"slide"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"navbar"},[a("a",{staticClass:"navbar-brand",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.backHome(e)}}},[a("i",{staticClass:"fab fa-houzz"})]),a("ul",{staticClass:"navbar-nav"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.backHome(e)}}},[a("i",{staticClass:"fas fa-bed"}),t._v("ROOMS")])])])])])],1)},s=[],i={name:"Navbar",props:{currPage:{type:String,default:"Home"}},data:function(){return{show:!1}},methods:{showAndhide:function(){var t=this;if("Home"===this.currPage){var e=80;window.addEventListener("scroll",(function(){window.pageYOffset>e?t.show=!0:t.show=!1}))}else this.show=!0},backHome:function(){"Home"!==this.currPage&&this.$router.push({name:"Home"})}},mounted:function(){this.showAndhide()}},o=i,r=(a("148a"),a("2877")),c=Object(r["a"])(o,n,s,!1,null,"5634ef63",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-e3007686.89abbdb5.js.map