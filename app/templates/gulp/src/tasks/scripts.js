var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});
