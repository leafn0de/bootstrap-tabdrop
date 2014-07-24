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

(function($) {
	'use strict';

	var WinResizer = (function() {
		var registered = [],
			inited = false,
			timer,
			i,
			count,

			resize = function() {
				clearTimeout(timer);
				timer = setTimeout(notify, 100);
			},

			notify = function() {
				for (i = 0, count = registered.length; i < count; i++) {
					registered[i].apply();
				}
			};
		return {
			/*
			 * Registers a handler to call on window resize.
			 *
			 * @param fn the resize event handler to bind to window resize events
			 */
			register: function(fn) {
				registered.push(fn);
				if (inited === false) {
					$(window).bind('resize', resize);
					inited = true;
				}
			},

			/*
			 * Deregisters a handler from being called on window resize.
			 *
			 * @param fn the resize event handler to unbind from window resize events
			 */
			unregister: function(fn) {
				for (i = 0, count = registered.length; i < count; i++) {
					if (registered[i] === fn) {
						delete registered[i];
						break;
					}
				}
			}
		};
	}());

	var TabDrop = function(element, options) {
		this.element = $(element);
		this.dropdown = $('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
			options.text + ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>').prependTo(this.element);
		if (this.element.parent().is('.tabs-below')) {
			this.dropdown.addClass('dropup');
		}
		WinResizer.register($.proxy(this.layout, this));
		this.layout();
	};

	TabDrop.prototype = {
		constructor: TabDrop,

		layout: function() {
			var collection = [];
			this.dropdown.removeClass('hide');
			this.element
				.append(this.dropdown.find('li'))
				.find('>li')
				.not('.tabdrop')
				.each(function() {
					if (this.offsetTop > 0) {
						collection.push(this);
					}
				});
			if (collection.length > 0) {
				collection = $(collection);
				this.dropdown
					.find('ul')
					.empty()
					.append(collection);
				if (this.dropdown.find('.active').length === 1) {
					this.dropdown.addClass('active');
				} else {
					this.dropdown.removeClass('active');
				}
			} else {
				this.dropdown.addClass('hide');
			}
		}
	};

	/* start-test-code */
	// This will be stripped when built for production. This is only exposed for testing.
	$.fn.winresizer = WinResizer;
	/* end-test-code */

	$.fn.tabdrop = function(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('tabdrop'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('tabdrop', (data = new TabDrop(this, $.extend({}, $.fn.tabdrop.defaults, options))));
			}
			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

	$.fn.tabdrop.defaults = {
		text: '<i class="icon-align-justify"></i>'
	};

	$.fn.tabdrop.Constructor = TabDrop;

}(window.jQuery));
