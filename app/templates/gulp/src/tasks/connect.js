var http = require('http');
var connect = require('connect');
var livereload = require('connect-livereload');
var abc  = require('../../abc.json');

var gulp = require('gulp');

/**
 * [description]
 * @return {[type]} [description]
 */
gulp.task('connect', function() {
	//connect.logger();
    var app = connect()
        .use(livereload())
        .use(connect.static('dist'))  //设置root路径作为静态文件服务器
        .use(connect.directory('dist', {hidden:true})); //列出指定目录下的文件

    http.createServer(app)
        .listen(abc.port)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:' + abc.port);
        });
});
