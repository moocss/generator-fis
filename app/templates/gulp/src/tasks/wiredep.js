var wiredep = require('wiredep').stream;
var gulp = require('gulp');

// Inject bower components
gulp.task('wiredep', function () {
<% if (includeSass) { %>
    gulp.src('src/**/*.scss')<% } else if (includeStylus) { %>
    gulp.src('src/**/*.styl')<% } else if (includeLess) { %>
    gulp.src('src/**/*.less')<% } %>
    .pipe(wiredep({
        directory: 'src/components'
    }))
    .pipe(gulp.dest('dist/css'));

    gulp.src('src/*.html')
        .pipe(wiredep({
            directory: 'src/components'
        }))
        .pipe(gulp.dest('src'));
});