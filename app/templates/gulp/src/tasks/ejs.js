var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
gulp.task('ejs', function () {
    gulp.src('./src/**/*.ejs')
        .pipe($.changed('./src/', { extension: '.html' }))
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))
});