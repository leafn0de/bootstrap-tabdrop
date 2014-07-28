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

(function($) {
	'use strict';

	var WinResizer = (function() {

		var registered = [],
			timer,

			notify = function() {
				registered.forEach(function(handler) {
					handler.call();
				});
			},

			resize = function() {
				clearTimeout(timer);
				timer = setTimeout(notify, 100);
			};

		return {
			/* start-test-code */
			removeAll: function() {
				registered = [];
			},
			/* end-test-code */

			/*
			 * Registers a handler to call on window resize.
			 *
			 * @param fn the resize event handler to bind to window resize events
			 */
			register: function(fn) {
				registered.push(fn);

				$(window).off('resize', resize);
				$(window).on('resize', resize);
			},

			/*
			 * Deregisters a handler from being called on window resize.
			 *
			 * @param fn the resize event handler to unbind from window resize events
			 */
			unregister: function(fn) {
				registered = registered.filter(function(handler) {
					return handler !== fn;
				});
			}
		};
	}());

	/* start-test-code */
	// Expose for testing
	$.fn.winresizer = WinResizer;
	/* end-test-code */

	var TabDrop = function(element, options) {

		/* start-test-code */
		// Expose for testing
		this.options = options;
		/* end-test-code */

		this.element = $(element);
		this.dropdown = $(
			'<li class="dropdown hide pull-right tabdrop">' +
				'<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
					options.text + ' <b class="caret"></b>' +
				'</a>' +
				'<ul class="dropdown-menu"></ul>' +
			'</li>').prependTo(this.element);

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

	$.fn.tabdrop = function(option) {

		var options = $.type(option) === 'object' ? option : {};

		return this.each(function(index, element) {

			var $element = $(element),
				data = $element.data('tabdrop');

			if (!data)  {
				$element.data('tabdrop', (data = new TabDrop(element, $.extend({}, $.fn.tabdrop.defaults, options))));
			}
			if (option === 'layout') {
				data[option]();
			}
		});
	};

	$.fn.tabdrop.defaults = {
		text: '<i class="icon-align-justify"></i>'
	};

	$.fn.tabdrop.Constructor = TabDrop;

}(window.jQuery));
