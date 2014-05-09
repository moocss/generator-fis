/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('server', ['connect'], function() {
    require('opn')('http://localhost:' + config.port);
});
