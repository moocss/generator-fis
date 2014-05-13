var wiredep = require('wiredep').stream;
var gulp = require('gulp');

// Inject bower components
gulp.task('wiredep', function () {
<% if (includeSass) { %>
    gulp.src('app/**/*.scss')<% } else if (includeStylus) { %>
    gulp.src('app/**/*.styl')<% } else if (includeLess) { %>
    gulp.src('app/**/*.less')<% } %>
    .pipe(wiredep({
        directory: 'app/components'
    }))
    .pipe(gulp.dest('app/css'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/components'
        }))
        .pipe(gulp.dest('app'));
});