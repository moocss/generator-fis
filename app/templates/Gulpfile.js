var gulp = require('gulp'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');
    /*livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();*/

// Styles
gulp.task('styles', function() {
    return gulp.src('demo/sass/*.scss')
        .pipe(watch())
        .pipe(plumber())
        .pipe(sass({
            style: 'expanded',
            sourcemap: true
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('demo/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        //.pipe(livereload(server))
        .pipe(gulp.dest('demo/css'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['demo/css', 'demo/js', 'demo/images'], {read: false})
    	.pipe(clean());
});

// Default task
gulp.task('default',['clean'], function() {
    gulp.start('styles');
});

