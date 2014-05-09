var fs = require('fs');
var path = require('path');
var http = require('http');

var connect = require('connect');
var livereload = require('connect-livereload');
var nib = require('nib');
var jshintStylish = require('jshint-stylish');
var opn = require('opn');
var through2 = require('through2');
var wiredep = require('wiredep');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var onlyScripts = require('./utilus/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
tasks.forEach(function(task) {
    require('./tasks/' + task);
});