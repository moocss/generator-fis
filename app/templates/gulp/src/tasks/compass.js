var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../utilus/handleErrors');

gulp.task('compass', function() {
	return gulp.src('src/sass/**/*.scss')
		.pipe($.compass({
			config_file: 'compass.rb',
			css: 'build',
			sass: 'scss'
		}))
		.on('error', handleErrors);
});

