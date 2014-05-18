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
        'src/**/*.html',
        '.tmp/css/**/*.css',
        'src/js/**/*.js',
        'src/img/**/*',
        'static/**/*'
    ]).on('change', reload);
    <% if (includeSass) { %>
        gulp.watch(['src/page/**/*.scss', 'src/module/**/*.scss', 'src/widget/**/*.scss'], ['styles']);<% } else if (includeStylus) { %>
        gulp.watch(['src/page/**/*.styl', 'src/module/**/*.styl', 'src/widget/**/*.styl'], ['styles']);<% } else if (includeLess) { %>
        gulp.watch(['src/page/**/*.less', 'src/module/**/*.less', 'src/widget/**/*.less'], ['styles']);<% } else { %>
        gulp.watch(['src/page/**/*.css', 'src/module/**/*.css', 'src/widget/**/*.css'], ['styles']);<% } %>
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('static/**/*', ['images']);
    gulp.watch('src/**/*', ['compass']);
    gulp.watch('bower.json', ['wiredep']);

});