/* ========================================================
 * bootstrap-tabdrop.js
 * http://www.eyecon.ro/bootstrap-tabdrop
 * =========================================================
 * @license
 * Copyright 2012 Stefan Petre
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
!function(t){"use strict";var o=function(){var o,e,n,i=[],d=!1,s=function(){clearTimeout(o),o=setTimeout(r,100)},r=function(){for(e=0,n=i.length;n>e;e++)i[e].apply()};return{register:function(o){i.push(o),d===!1&&(t(window).bind("resize",s),d=!0)},unregister:function(t){for(e=0,n=i.length;n>e;e++)if(i[e]===t){delete i[e];break}}}}(),e=function(e,n){this.element=t(e),this.dropdown=t('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+n.text+' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>').prependTo(this.element),this.element.parent().is(".tabs-below")&&this.dropdown.addClass("dropup"),o.register(t.proxy(this.layout,this)),this.layout()};e.prototype={constructor:e,layout:function(){var o=[];this.dropdown.removeClass("hide"),this.element.append(this.dropdown.find("li")).find(">li").not(".tabdrop").each(function(){this.offsetTop>0&&o.push(this)}),o.length>0?(o=t(o),this.dropdown.find("ul").empty().append(o),1===this.dropdown.find(".active").length?this.dropdown.addClass("active"):this.dropdown.removeClass("active")):this.dropdown.addClass("hide")}},t.fn.tabdrop=function(o){return this.each(function(){var n=t(this),i=n.data("tabdrop"),d="object"==typeof o&&o;i||n.data("tabdrop",i=new e(this,t.extend({},t.fn.tabdrop.defaults,d))),"string"==typeof o&&i[o]()})},t.fn.tabdrop.defaults={text:'<i class="icon-align-justify"></i>'},t.fn.tabdrop.Constructor=e}(window.jQuery);