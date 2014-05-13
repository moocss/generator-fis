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
    gulp.watch([
        'app/*.html',
        '.tmp/css/**/*.css',
        'app/js/**/*.js',
        'app/img/**/*'
    ]).on('change', reload);

    gulp.watch('app/css/**/*', ['styles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/img/**/*', ['images']);

});