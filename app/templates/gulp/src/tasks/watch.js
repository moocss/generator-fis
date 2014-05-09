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

    gulp.watch(folders.dist + '/**/*').on('change', reload);

    gulp.watch(app + '/**/*', ['scripts', 'styles', 'images']);

});
