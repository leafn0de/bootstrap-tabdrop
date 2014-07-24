/*globals chai*/

(function() {
	'use strict';

	var expect = chai.expect,
		$ = window.jQuery;

	describe('winresizer', function() {

		it('should exist', function() {
			expect($.fn.winresizer).to.be.an('object');
		});
	});

	describe('tabdrop', function() {

		it('should exist', function() {
			expect($.fn.tabdrop).to.be.a('function');
		});
	});
}());
