var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sprites', function () {
    gulp.src('app/img/**/*.png')
      .pipe($.sprite('sprites.png', {
        imagePath: 'dist/img',
		<% if (includeSass) { %>
        cssPath: 'src/**/*.scss',
        preprocessor: 'scss'
		<% } else if (includeStylus) { %>
        cssPath: 'src/**/*.styl',
        preprocessor: 'styl'
		<% } else if (includeLess) { %>
        cssPath: 'src/**/*.less',
        preprocessor: 'less'
		<% } else { %>
        cssPath: 'src/**/*.css',
        preprocessor: 'css'
		<% } %>
      }))
      .pipe(gulp.dest('dist/img'));
});
