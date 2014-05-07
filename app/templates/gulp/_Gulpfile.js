'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp');
// load plugins
var $ = require('gulp-load-plugins')();

// configurable paths
var folders = {
    app: 'app',
    bliud: 'bliud',
    dist: 'dist',
    tmp: '.tmp'
};

//<%%= folders.tmp %>

// Styles
gulp.task('styles', function () {<% if (includeSass) { %>
    return gulp.src('demo/sass/**/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: false
        }))
        .pipe(gulp.dest('demo/css'))<% } else if (includeStylus) { %>
        var nib = require('nib');
    return gulp.src('demo/stylus/**/*.styl')
        .pipe($.stylus({use: [nib()]}))
        .pipe(gulp.dest('demo/css'))<% } else if (includeLess) { %>
        var path = require('path');
    return gulp.src('demo/less/**/*.less')
        .pipe($.less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
         }))
        .pipe(gulp.dest('demo/css'))<% } else { %> 
    return gulp.src('demo/css/**/*.css')<% } %>
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('demo/css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.csso())
        .pipe(gulp.dest('demo/css'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('demo/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

// Html
gulp.task('html', ['styles', 'scripts'], function () {
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
    return gulp.src(['demo/**/*', '.tmp', 'dist'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'images','scripts']);

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
gulp.task('server', ['connect','styles'], function(){
    require('opn')('http://localhost:9000');
});

// Inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
<% if (includeSass) { %>
    gulp.src('demo/**/*.scss')
        .pipe(wiredep({
            directory: 'src/components'
        }))
        .pipe(gulp.dest('demo/css'));
<% } %>
    gulp.src('demo/*.html')
        .pipe(wiredep({
            directory: 'src/components'
        }))
        .pipe(gulp.dest('demo'));
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

    gulp.watch('demo/css/**/*.<%= includeStylus ? 'styl' : 'css' %>', ['styles']);
    gulp.watch('demo/js/**/*.js', ['scripts']);
    gulp.watch('demo/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);

});