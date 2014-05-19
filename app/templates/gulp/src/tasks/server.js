var opn = require('opn');
var abc  = require('../../abc.json');
var gulp = require('gulp');

/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('server', ['connect', 'styles', 'scripts'], function() {
   opn('http://localhost:' + abc.port);
});
