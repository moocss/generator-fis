/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('connect', function() {
    var app = connect()
        .use(livereload())
        .use(connect.static(folders.app))
        .use(connect.directory(folders.dist));

    http.createServer(app).listen(config.port)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:' + config.port);
        });
});
