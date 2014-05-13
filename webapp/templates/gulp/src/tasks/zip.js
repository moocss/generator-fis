var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var abc  = require('../../abc.json');

// zip
gulp.task('zip', function() {
    gulp.src(config.folders.app+'/**/*')
        .pipe($.zip('<%= abc.name %>-<%= abc.version  %>.zip'))
        .pipe(gulp.dest(config.folders.dist))
        .pipe($.size());
});