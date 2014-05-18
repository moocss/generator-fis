var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../utilus/handleErrors');

gulp.task('styles', function () {<% if (includeSass) { %>
    return gulp.src(['src/page/**/*.scss', 'src/module/**/*.scss', 'src/widget/**/*.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        <% } else if (includeStylus) { %>
    var nib = require('nib');
    return gulp.src(['src/page/**/*.styl', 'src/module/**/*.styl', 'src/widget/**/*.styl'])
        .pipe($.stylus({use: [nib()]}))<% } else if (includeLess) { %>
    var path = require('path');
    return gulp.src(['src/page/**/*.less', 'src/module/**/*.less', 'src/widget/**/*.less'])
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
         }))<% } else { %>
    return gulp.src(['src/page/**/*.css', 'src/module/**/*.css', 'src/widget/**/*.css'])<% } %>
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.csso())
        .on('error', handleErrors)
        .pipe(gulp.dest('.tmp/css'))
        .pipe($.size());
});