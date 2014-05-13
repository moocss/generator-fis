var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
    return gulp.src(['static/**/*.png','static/**/*.jpg','static/**/*.gif','static/**/*.jpeg'])
    	.pipe($.changed('dist/img/**/*')) // Ignore unchanged files
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe($.size());
});