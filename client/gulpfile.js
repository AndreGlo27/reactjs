'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');

var scss_src = './src/Assets/scss/**/*.scss';
var scss_dest = './src/Assets/css';

gulp.task('compile_scss',function(){
    gulp.src(scss_src)
    .pipe(sass().on('eror',sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix:'.min'}))
    .pipe(changed(scss_dest))
    .pipe(gulp.dest(scss_dest));
});

gulp.task('watch_scss',function(){
    gulp.watch(scss_src,gulp.series('compile_scss'));
});

gulp.task('default',gulp.series('watch_scss'));