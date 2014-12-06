"use strict";

var gulp = require('gulp'),
        sass = require('gulp-sass'),
        minCSS = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        prefix = require('gulp-autoprefixer'),
        connect = require("gulp-connect"),
        uglify = require("gulp-uglify"),
        jade = require("gulp-jade"),
        plumber = require("gulp-plumber"),
        compass = require("gulp-compass");


//---- connect
gulp.task('connect', function() {
    connect.server({
        root: 'public/',
        livereload: true
    });
})


// Compile sass to css
gulp.task('css', function() {
    gulp.src('src/sass/*.scss')
        .pipe(plumber())
        // .pipe(sass())
        .pipe(compass({
          sass: 'src/sass/',
          css: 'src/sass/',
          style: 'expanded'
         }))
        .pipe(prefix({
            browsers: ['last 3 version', 'ie 8', 'ie 9', 'Opera 12.1'],
        }))
        /*.pipe(minCSS())
        .pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(gulp.dest('public/css/'))
        .pipe(connect.reload());
});


// Compile Jade to html
gulp.task('html', function() {
    gulp.src('src/jade/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
            }))
        .pipe(gulp.dest('public/'))
        .pipe(connect.reload());
});


// Compile js to minify.js
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
/*        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

// Enable watchers
gulp.task('watch', function() {

    gulp.watch('src/sass/**/*.scss', ['css']),
    gulp.watch('src/jade/**/*.jade', ['html']),
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);