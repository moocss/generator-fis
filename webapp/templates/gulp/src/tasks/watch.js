var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('watch', ['connect', 'server'], function() {
    var sr = $.livereload();

    // watch for changes
    var reload = function (file) {
        sr.changed(file.path);
    };
    gulp.watch([
        'app/*.html',
        '.tmp/css/**/*.css',
        'app/js/**/*.js',
        'app/img/**/*'
    ]).on('change', reload);
    <% if (includeSass) { %>
    gulp.watch('app/sass/**/*.scss', ['styles']);<% } else if (includeStylus) { %>
    gulp.watch('app/stylus/**/*.styl', ['styles']);<% } else if (includeLess) { %>
    gulp.watch('app/less/**/*.less', ['styles']);<% } else { %>
    gulp.watch('app/css/**/*.css', ['styles']);<% } %>
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/img/**/*', ['images']);

});