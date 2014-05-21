var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
    all: ['src/**/*', '.tmp/**/*', 'static/**/*'],
    styles: <%
    if (includeSass) { %> ['src/**/*.scss'], <%
    } else if (includeStylus) { %> ['src/**/*.styl'], <%
    } else if (includeLess) { %> ['src/**/*.less'], <%
    } else { %> ['src/**/*.css'], <%
    } %>
    scripts: ['src/**/*.js'],
    images: ['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.jpeg', 'static/**/*.png', 'static/**/*.jpg', 'static/**/*.gif', 'static/**/*.jpeg']
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
