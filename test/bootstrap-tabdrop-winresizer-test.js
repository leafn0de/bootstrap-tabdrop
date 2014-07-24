/*globals chai, sinon*/

(function() {
	'use strict';

	var expect = chai.expect,
		$ = window.jQuery,

		winresizer = $.fn.winresizer,

		clock,

		// The winresizer waits 100 milliseconds before calling any handlers, so we should wait at least that long. Well, fake it, anyway.
		resizeAndWait = function(numberOfResizes, waitTime) {

			for (var i = 0; i < numberOfResizes; i++) {
				$(window).trigger('resize');
				clock.tick(50);
			}

			clock.tick(waitTime);
		},

		generateHandler = (function() {
			var count = 0,
				handler;

			handler = function() {
				count++;
			};

			handler.getCount = function() {
				return count;
			};

			return handler;
		});

	describe('winresizer', function() {

		beforeEach(function() {
			clock = sinon.useFakeTimers();
		});

		afterEach(function() {
			clock.restore();
			winresizer.removeAll();
		});

		it('should call registered handler on window resize', function() {

			var eventHandler = generateHandler();

			winresizer.register(eventHandler);
			resizeAndWait(1, 110);
			expect(eventHandler.getCount()).to.equal(1);
		});

		it('should only call handlers once if multiple resizes happen less than 100 milliseconds apart', function() {

			var eventHandler = generateHandler();

			winresizer.register(eventHandler);
			resizeAndWait(2, 110);
			expect(eventHandler.getCount()).to.equal(1);
		});

		it('should call all registered handlers on window resize', function() {

			var handler1 = generateHandler(),
				handler2 = generateHandler();

			winresizer.register(handler1);
			winresizer.register(handler2);

			resizeAndWait(2, 110);

			expect(handler1.getCount()).to.equal(1);
			expect(handler2.getCount()).to.equal(1);
		});

		it('should not call a registered handler that has been unregistered', function() {

			var eventHandler = generateHandler();

			winresizer.register(eventHandler);
			winresizer.unregister(eventHandler);

			resizeAndWait(1, 110);
			expect(eventHandler.getCount()).to.equal(0);
		});
	});
}());
