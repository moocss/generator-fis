'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('css', function () {<% if (includeSass) { %>
    return gulp.src('demo/sass/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: true
        }))<% } else if (includeStylus) { %>
    return gulp.src('demo/stylus/*.styl')
        .pipe($.stylus())
        .pipe(gulp.dest('demo/css')) <% } else { %>
    return gulp.src('demo/css/main.css')<% } %>
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('demo/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.csso())
        .pipe(gulp.dest('demo/css'))
        .pipe($.size());
});

// Scripts
gulp.task('js', function () {
    return gulp.src('demo/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

// Html
gulp.task('html', ['css', 'js'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('demo/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src(['demo/**/*.png','demo/**/*.jpg','demo/**/*.gif','demo/**/*.jpeg'])
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['demo/css', 'demo/js', 'demo/images','.tmp', 'dist'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', function (){
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('demo'))
        .use(connect.directory('demo'));

    require('http').createServer(app).listen(9000)
        .on('listening',function(){
            console.log('Started connect web server on http://localhost:9000');
        });
});

// Server
gulp.task('server', ['connect','css'], function(){
    require('opn')('http://localhost:9000');
});

// Watch
gulp.task('watch', ['connect', 'server'], function (){
    var sr = $.livereload();

    // watch for changes
    gulp.watch([
        'demo/*.html',
        'demo/css/**/*.css',
        'demo/js/**/*.js',
        'demo/images/**/*'
    ]).on('change', function (file) {
        sr.changed(file.path);
    });

    gulp.watch('demo/css/**/*.<%= includeStylus ? 'styl' : 'css' %>', ['css']);
    gulp.watch('demo/js/**/*.js', ['scripts']);
    gulp.watch('demo/images/**/*', ['images']);

});