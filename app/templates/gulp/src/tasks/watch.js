var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('watch', ['connect', 'server'], function() {
    var sr = $.livereload();

    // watch for changes
    var reload = function(file) {
        sr.changed(file.path);
    };
    gulp.watch(['src/**/*', '.tmp/**/*']).on('change', reload);
    gulp.watch('src/**/*', ['scripts', 'styles', 'images']);
    gulp.watch('src/**/*', ['compass']);
    gulp.watch('bower.json', ['wiredep']);
});