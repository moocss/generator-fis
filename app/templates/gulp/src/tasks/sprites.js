var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sprites', function () {
    gulp.src('./src/img/*.png')
      .pipe($.sprite('sprites.png', {
        imagePath: 'dist/img',
        cssPath: './src/**/*.scss',
        preprocessor: 'scss'
      }))
      .pipe(gulp.dest('./dist/img/'));
});
