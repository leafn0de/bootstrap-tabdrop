/*globals chai*/

// Might need to look into using Must.js or equivalent, I'm uncomfortable turning this off to support Chai's assertion style
/* jshint expr:true */

(function() {
	'use strict';

	var expect = chai.expect,
		$ = window.jQuery,

		TabDrop = $.fn.tabdrop.Constructor,

		testContent = $('.test-container'),

		// gulp-mocha-phantomjs does not currently support passing arguments through to PhantomJS, meaning I can't set the viewport size.
		// The default phantomjs window size is 400 x 300. This means we can only fit a small number of tabs without overflowing. See this
		// issue: https://github.com/mrhooray/gulp-mocha-phantomjs/issues/16
		defaultNumberOfTabs = 4,

		generateTabContainer = function(options) {

			var tabsOrPills = options && options.tabsOrPills === 'pills' ? 'nav-pills' : 'nav-tabs',
				template = '<ul class="nav ' + tabsOrPills + '">' + '<li class="active"><a href="#">Tab 1</a></li>',
				i;

			for (i = 2; i <= defaultNumberOfTabs; i++) {
				template += '<li><a href="#">Tab ' + i + '</a></li>';
			}

			return template + '</ul>';
		};

	describe('tabdrop', function() {

		beforeEach(function() {
			testContent.append(generateTabContainer());
			testContent.removeClass('fixed-width');
		});

		afterEach(function() {
			testContent.empty();
		});

		it('should construct a new tabdrop when invoked on an element', function() {

			var navTabs = $('.nav-tabs');

			navTabs.tabdrop();

			expect(navTabs.data('tabdrop')).to.be.an.instanceOf(TabDrop);
		});

		it('should not construct a new tabdrop if the element is not a bootstrap tab container', function() {

			var notTabs;

			testContent.append('<div class="not-tabs"></div>');

			notTabs = $('.not-tabs');
			notTabs.tabdrop();

			expect(notTabs.data('tabdrop')).not.to.be.an.instanceOf(TabDrop);
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

		it('should pass options through to the TabDrop contructor if it is an object', function() {

			var navTabs = $('.nav-tabs');
			navTabs.tabdrop();
			expect($(navTabs).data('tabdrop').options).to.be.an('object');
		});

		it('should default options to an object if options is not an object or a string', function() {

			var navTabs = $('.nav-tabs');

			[[], false, 1, null, undefined].forEach(function(parameter) {
				navTabs.tabdrop(parameter);
				expect($(navTabs).data('tabdrop').options).to.be.an('object');
				navTabs.removeData('tabdrop');
			});
		});

		it('should use the glyphicon-align-justify icon as the default text option if not provided', function() {

			var navTabs = $('.nav-tabs');

			navTabs.tabdrop();
			expect($(navTabs).data('tabdrop').options).to.be.an('object');
			expect($(navTabs).data('tabdrop').options.text).to.be.a('string');
			expect($(navTabs).data('tabdrop').options.text).to.equal('<i class="glyphicon glyphicon-align-justify"></i>');

		});

		it('should use the provided text option instead of the default if provided');

		it('should call the layout function if options is the string \'layout\'', function() {

			var called = false,
				navTabs = $('.nav-tabs'),
				layout = TabDrop.prototype.layout;

			// Tabdrop calls layout in it's initialiser so we must call that before we call layout on it's own
			navTabs.tabdrop();

			TabDrop.prototype.layout = function() {
				called = true;
			};

			navTabs.tabdrop('layout');
			expect(called).to.be.true;

			TabDrop.prototype.layout = layout;
		});

		it('should ignore options if it is a string that is not the string \'layout\'', function() {
			var called = false,
				navTabs = $('.nav-tabs'),
				layout = TabDrop.prototype.layout;

			// Tabdrop calls layout in it's initialiser so we must call that before we call layout on it's own
			navTabs.tabdrop();

			TabDrop.prototype.layout = function() {
				called = true;
			};

			navTabs.tabdrop('not-layout');
			expect(called).to.be.false;

			TabDrop.prototype.layout = layout;
		});

		it('should default to positioning the dropdown tab to the right of existing tabs if no position is specified', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			navTabs.tabdrop();

			expect($(navTabs).data('tabdrop').options).to.be.an('object');
			expect($(navTabs).data('tabdrop').options.position).to.be.a('string');
			expect($(navTabs).data('tabdrop').options.position).to.equal('right');

			// Length should be our default number of tabs (defaultNumberOfTabs) + 1 extra for the dropdown
			expect(navTabs.children()).to.have.length.of(defaultNumberOfTabs + 1);

			dropdownTab = $(navTabs.children().get(0));

			// As we're positioning at the right, the tab should be prepended and pulled right. This means the first child should be the
			// dropdown tab, and it should have the pull-right class
			expect(dropdownTab.hasClass('dropdown')).to.be.true;
			expect(dropdownTab.hasClass('pull-right')).to.be.true;
			expect(dropdownTab.children('ul')).to.have.length.of(1);
		});

		it('should position the dropdown tab to the left if position \'left\' is specified', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			navTabs.tabdrop({position: 'left'});

			expect($(navTabs).data('tabdrop').options).to.be.an('object');
			expect($(navTabs).data('tabdrop').options.position).to.be.a('string');
			expect($(navTabs).data('tabdrop').options.position).to.equal('left');

			// Length should be our default number of tabs (defaultNumberOfTabs) + 1 extra for the dropdown
			expect(navTabs.children()).to.have.length.of(defaultNumberOfTabs + 1);

			dropdownTab = $(navTabs.children('li:last'));

			// As we're positioning at the left, the tab should be appended. This means the last child should be the dropdown tab, and it
			// should not have the pull-right class
			expect(dropdownTab.hasClass('dropdown')).to.be.true;
			expect(dropdownTab.hasClass('pull-right')).to.be.false;
			expect(dropdownTab.children('ul')).to.have.length.of(1);
		});

		it('should default to positioning the dropdown tab to the right of existing tabs if an invalid position is specified', function() {

			var navTabs = $('.nav-tabs');

			navTabs.tabdrop({position: 'not-left-or-right'});

			expect($(navTabs).data('tabdrop').options).to.be.an('object');
			expect($(navTabs).data('tabdrop').options.position).to.be.a('string');
			expect($(navTabs).data('tabdrop').options.position).to.equal('right');

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
			expect(inlineTabs).to.have.length.below(defaultNumberOfTabs);

			// The number of dropped tabs should equal defaultNumberOfTabs - the number of inline tabs
			expect(droppedTabs).to.have.length.of(defaultNumberOfTabs - inlineTabs.length);
		});

		it('should not let the dropdown tab flow to the next line when positioned right', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			testContent.addClass('fixed-width');

			navTabs.tabdrop({position: 'right'});
			dropdownTab = navTabs.children('.dropdown').get(0);
			expect(navTabs.children('.dropdown')).to.have.length(1);
			expect(dropdownTab.offsetTop).to.be.at.most(0);
		});

		it('should not let the dropdown tab flow to the next line when positioned left', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			testContent.addClass('fixed-width');

			navTabs.tabdrop({position: 'left'});
			dropdownTab = navTabs.children('.dropdown').get(0);
			expect(navTabs.children('.dropdown')).to.have.length(1);
			expect(dropdownTab.offsetTop).to.be.at.most(0);
		});

		it('should activate the dropdown tab if one of the overflowing tabs was active', function() {

			var navTabs = $('.nav-tabs'),
				dropdownTab;

			navTabs.tabdrop();

			// Activate the last tab
			$('.nav-tabs a:last').tab('show');

			// Contain the tab container to a smaller size to trigger overflow
			testContent.addClass('fixed-width');
			navTabs.tabdrop('layout');

			dropdownTab = $(navTabs.children('.dropdown'));

			expect(dropdownTab).to.have.length.of(1);
			expect(dropdownTab.hasClass('active')).to.be.true;
		});
	});
}());
