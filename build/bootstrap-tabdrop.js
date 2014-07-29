/* ========================================================
 * bootstrap-tabdrop.js
 * https://github.com/leafn0de/bootstrap-tabdrop
 * =========================================================
 * @license
 * Copyright 2012 Stefan Petre
 * Copyright 2014 Helen Durrant
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(t){"use strict";var o=function(){var o,i=[],n=function(){i.forEach(function(t){t.call()})},e=function(){clearTimeout(o),o=setTimeout(n,100)};return{register:function(o){i.push(o),t(window).off("resize",e),t(window).on("resize",e)},unregister:function(t){i=i.filter(function(o){return o!==t})}}}(),i=function(i,n){this.options=n;var e="right"===n.position?"pull-right":"";this.element=t(i),this.dropdown=t('<li class="dropdown hide '+e+' tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+n.text+' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>'),e?this.dropdown.prependTo(this.element):this.dropdown.appendTo(this.element),o.register(t.proxy(this.layout,this)),this.layout()};i.prototype={constructor:i,layout:function(){var o,i=[];this.dropdown.removeClass("hide"),o=this.element.append(this.dropdown.find("li")),o.prepend(this.dropdown),o.find(">li").not(".tabdrop").each(function(){this.offsetTop>0&&i.push(this)}),"left"===this.options.position&&o.append(this.dropdown),i.length>0?(i=t(i),this.dropdown.find("ul").empty().append(i),1===this.dropdown.find(".active").length?this.dropdown.addClass("active"):this.dropdown.removeClass("active")):this.dropdown.addClass("hide")}},t.fn.tabdrop=function(o){var n="object"===t.type(o)?o:{};return n.position=-1!==["right","left"].indexOf(n.position)?n.position:"right",this.each(function(e,s){var d,r=t(s);(r.hasClass("nav-tabs")||r.hasClass("nav-pills"))&&(d=r.data("tabdrop"),d||r.data("tabdrop",d=new i(s,t.extend({},t.fn.tabdrop.defaults,n))),"layout"===o&&d[o]())})},t.fn.tabdrop.defaults={text:'<i class="glyphicon glyphicon-align-justify"></i>',position:"right"},t.fn.tabdrop.Constructor=i}(window.jQuery);