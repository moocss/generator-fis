var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../utilus/handleErrors');

gulp.task('styles', function () {<% if (includeSass) { %>
    return gulp.src('app/sass/**/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        <% } else if (includeStylus) { %>
    var nib = require('nib');
    return gulp.src('app/stylus/**/*.styl')
        .pipe($.stylus({use: [nib()]}))<% } else if (includeLess) { %>
    var path = require('path');
    return gulp.src('app/less/**/*.less')
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
         }))<% } else { %>
    return gulp.src('app/css/**/*.css')<% } %>
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.csso())
        .on('error', handleErrors)
        .pipe(gulp.dest('.tmp/css'))
        .pipe($.size())
});