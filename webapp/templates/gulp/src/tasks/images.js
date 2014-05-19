var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
    return gulp.src(['app/img/**/*.png','app/img/**/*.jpg','app/img/**/*.gif','app/img/**/*.jpeg'])
    	.pipe($.changed('dist/img/**/*')) // Ignore unchanged files
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe($.size());
});