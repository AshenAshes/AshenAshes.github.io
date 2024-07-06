var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

const { series } = require('gulp');

function cssMinify () {
    //压缩css
    return gulp.src('./source/css/main.css')    //需要操作的文件
        .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
        .pipe(cleanCSS())   //执行压缩
        .pipe(gulp.dest('./source/css'));   //输出文件夹
}

function jsMinify () {
    return gulp.src('./source/js/Vateral.js')      //需要操作的文件
        .pipe(babel())
        //.pipe(concat('main.js'))    //合并所有js到main.js
        //.pipe(gulp.dest('js'))       //输出到文件夹
        .pipe(rename({ suffix: '.min' }))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./source/js'));  //输出
}

exports.default = series(cssMinify)
// exports.default = cssMinify()