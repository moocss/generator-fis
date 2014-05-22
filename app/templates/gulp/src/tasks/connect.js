var gulp = require('gulp');
var http = require('http');
var connect = require('connect');
var livereload = require('connect-livereload');
var ssi = require('simple-ssi');
var abc  = require('../../abc.json');

/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('connect', function() {
    var app = connect()
        .use(connect.logger('dev'))
        .use(livereload())
        .use(ssi('src/page'))
        .use(connect.static('src/page'))  //设置root路径作为静态文件服务器
        .use(connect.static('.tmp'))
        .use(connect.directory('src/page', {hidden:true})); //列出指定目录下的文件
    http.createServer(app)
        .listen(abc.port)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:' + abc.port);
        });
});
