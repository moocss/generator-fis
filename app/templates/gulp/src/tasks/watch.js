var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    all: ['src/**/*', '.tmp/css/**/*', 'static/**/*'],
    styles: <%
    if (includeSass) { %> ['src/page/**/*.scss', 'src/module/**/*.scss', 'src/widget/**/*.scss'], <%
    } else if (includeStylus) { %> ['src/page/**/*.styl', 'src/module/**/*.styl', 'src/widget/**/*.styl'], <%
    } else if (includeLess) { %> ['src/page/**/*.less', 'src/module/**/*.less', 'src/widget/**/*.less'], <%
    } else { %> ['src/page/**/*.css', 'src/module/**/*.css', 'src/widget/**/*.css'], <%
    } %>
    scripts: ['src/page/**/*.js', 'src/module/**/*.js', 'src/widget/**/*.js'],
    images: ['src/page/**/*', 'src/module/**/*', 'src/widget/**/*', 'static/**/*']
};

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
    gulp.watch(paths.all).on('change', reload);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);

    //gulp.watch('src/**/*', ['compass']);
    //gulp.watch('bower.json', ['wiredep']);

});
