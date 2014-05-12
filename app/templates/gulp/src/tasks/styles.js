var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {<% if (includeSass) { %>
    return gulp.src('src/**/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        .pipe(gulp.dest('dist/css'))<% } else if (includeStylus) { %>
    var nib = require('nib');
    return gulp.src('src/**/*.styl')
        .pipe($.stylus({use: [nib()]}))
        .pipe(gulp.dest('dist/css'))<% } else if (includeLess) { %>
    var path = require('path');
    return gulp.src('src/**/*.less')
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
         }))
        .pipe(gulp.dest('dist/css'))<% } else { %>
    return gulp.src('src/**/*.css')<% } %>
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.csso())
        .pipe(gulp.dest('dist/css'))
        .pipe($.size());
});