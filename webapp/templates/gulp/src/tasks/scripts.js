var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../utilus/handleErrors');

gulp.task('scripts', function () {
    return gulp.src(['app/js/**/*.js', '!app/js/libs/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .on('error', handleErrors)
        .pipe($.size());
});
