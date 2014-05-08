'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();


// Scripts
gulp.task('scripts', function () {

});

// Clean
gulp.task('clean', function () {

});

// Build
gulp.task('build', ['scripts']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Watch
gulp.task('watch', ['build'], function (){

});
