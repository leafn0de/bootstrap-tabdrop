/*globals chai*/

// Might need to look into using Must.js or equivalent, I'm uncomfortable turning this off to support Chai's assertion style
/* jshint expr:true */

(function() {
	'use strict';

	var expect = chai.expect,
		$ = window.jQuery,

		TabDrop = $.fn.tabdrop.Constructor,

		testContent = $('#testContent'),

		generateTabContainer = function(options) {

			var tabsOrPills = options && options.tabsOrPills === 'pills' ? 'nav-pills' : 'nav-tabs',
				template = '<ul class="nav ' + tabsOrPills + '">' + '<li class="active"><a href="#">Tab 1</a></li>',
				i;

			for (i = 2; i <= 5; i++) {
				template += '<li><a href="#">Tab ' + i + '</a></li>';
			}

			return template + '</ul>';
		};

	describe('tabdrop', function() {

		beforeEach(function() {
			testContent.append(generateTabContainer());
			testContent.removeClass();
		});

		afterEach(function() {
			testContent.empty();
		});

		it('should construct a new tabdrop when invoked on an element', function() {

			var navTabs = $('.nav-tabs');

			navTabs.tabdrop();

			expect(navTabs.data('tabdrop')).to.be.an.instanceOf(TabDrop);
		});

		it('should construct a new tabdrop for each element if called on a collection', function() {

			var navs;

			testContent.append(generateTabContainer({tabsOrPills: 'pills'}));

			navs = $('.nav');

			expect(navs).to.have.length.of(2);

			navs.tabdrop();

			navs.each(function(i, nav) {
				expect($(nav).data('tabdrop')).to.be.an.instanceOf(TabDrop);
			});
		});

		it('should prepend markup for the dropdown', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			navTabs.tabdrop();

			// Length should be our default number of tabs (5) + 1 extra for the dropdown
			expect(navTabs.children()).to.have.length.of(6);

			dropdownTab = $(navTabs.children().get(0));

			// As we're prepending, the first child should be the dropdown tab, and it should have the pull-right class
			expect(dropdownTab.hasClass('dropdown')).to.be.true;
			expect(dropdownTab.hasClass('pull-right')).to.be.true;
			expect(dropdownTab.children('ul')).to.have.length.of(1);
		});

		it('should use the icon-align-justify icon as the default dropdown tab label content', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab,
				dropdownToggle,
				icon;

			navTabs.tabdrop();

			dropdownTab = $(navTabs.children().get(0));
			dropdownToggle = $(dropdownTab.children('a'));
			icon = $(dropdownToggle.children('i'));

			expect(dropdownTab.hasClass('dropdown')).to.be.true;
			expect(dropdownToggle.hasClass('dropdown-toggle')).to.be.true;
			expect(icon.hasClass('icon-align-justify')).to.be.true;
		});

		it('should overflow tabs into the dropdown if tabs do not fit in one line', function() {

			var navTabs = $('.nav-tabs'),
				inlineTabs,
				droppedTabs;

			testContent.addClass('fixed-width');

			navTabs.tabdrop();

			inlineTabs = $(navTabs.children('li').not('.dropdown'));
			droppedTabs = $(navTabs.children('.dropdown')).find('li');

			// Some of the tabs should be dropped down into the overflow menu
			expect(inlineTabs).to.have.length.below(5);

			// The number of dropped tabs should equal 5 - the number of inline tabs
			expect(droppedTabs).to.have.length.of(5 - inlineTabs.length);
		});

		// Future behaviour
		it('should not construct a new tabdrop if the element is not a bootstrap tab container');

		it('should append instead of prepending if float-left is specified');

	});
}());
