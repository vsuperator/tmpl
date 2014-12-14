"use strict";

var gulp = require('gulp'),
    plumber = require("gulp-plumber"),
    jade = require("gulp-jade"),
    compass = require("gulp-compass");

// Convert jade to html and save index.html to public folder
gulp.task('jade', function () {
    gulp.src('_dev/_makeups/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty : true,
            indent_size: 4
        }))
        .pipe(gulp.dest('public'))
})

// Convert main.scss to main.css when we have a changes
// in any files in styles folder

gulp.task('css', function() {
    gulp.src('_dev/_styles/*.scss')
        .pipe(plumber())
        .pipe(compass({
            sass: '_dev/_styles/',
            css: '_dev/_styles/',
            style: 'expanded'
         }))
        // .pipe(prefix({
        //     browsers: ['last 3 version', 'ie 8', 'ie 9', 'Opera 12.1'],
        // }))
        .pipe(gulp.dest('public/css/'))
});

//----watch
gulp.task('watch', function() {
    gulp.watch('_dev/_makeups/**/*.jade', ['jade']);
    gulp.watch('_dev/_styles/**/*.scss', ['css']);
})

gulp.task('default', ['watch'])