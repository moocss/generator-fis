var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('scripts', ['jshint'], function () {
    return gulp.src(['src/**/*.js', '!src/widget/**/*.js'])
        .pipe(gulp.dest('.tmp/js'))
        .pipe($.size());
});

gulp.task('jshint', function () {
    return gulp.src(['src/**/*.js', '!src/widget/**/*.js','!src/components/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(gulp.dest('.tmp/js'))
        .pipe($.size());
});