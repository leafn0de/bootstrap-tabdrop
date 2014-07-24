'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jshintStylish = require('jshint-stylish'),
	minifyCSS = require('gulp-minify-css'),
	mochaPhantomJS = require('gulp-mocha-phantomjs'),
	rimraf = require('rimraf'),
	stripCode = require('gulp-strip-code'),
	uglify = require('gulp-uglify');

// Hint our javascript code
gulp.task('jshint', function() {
	return gulp.src('js/**')
		.pipe(jshint())
		.pipe(jshint.reporter(jshintStylish));
});

// Minify and strip test code from javascript files (sadly the gulp-strip-code options fail our jscs rules :( )
gulp.task('uglify', function() {
	return gulp.src('js/**')
		.pipe(stripCode({
			start_comment: 'start-test-code',
			end_comment: 'end-test-code'
		}))
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(gulp.dest('build'));
});

// Minify css
gulp.task('css', function() {
	return gulp.src('css/**')
		.pipe(minifyCSS())
		.pipe(gulp.dest('build'));
});

// Run our JavaScript tests
gulp.task('test', function() {
	return gulp
	.src('test/runner.html')
	.pipe(mochaPhantomJS({reporter: 'spec'}));
});

// Build our code ready for production
gulp.task('build', ['jshint', 'test', 'uglify', 'css']);

// Clean out the build directory and trigger a fresh build
gulp.task('clean', function() {
	rimraf('build', function() {
		gulp.start('build');
	});
});

// Watch our JavaScript files for changes and run our tests when something changes
gulp.task('watch', function() {
	gulp.watch(['test/*.js', 'js/*.js'], ['jshint', 'test']);
});
