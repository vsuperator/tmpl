"use strict";

var gulp = require('gulp'),
    opn = require('opn'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');

// Start the server Port:8080

gulp.task('connect', function() {
    connect.server({
        root: '../public/',
        livereload: true
    });
    opn('http://localhost:8080/');
})
// Compile scss to css

gulp.task('css', function() {
    gulp.src('../_dev/_styles/*.scss')
    	.pipe(plumber({errorHandler: notify.onError("Error: CSS")}))
    	.pipe(sass())
    	.pipe(prefix({
    		browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
    	}))
    	.pipe(minify({keepBreaks:true}))
    	.pipe(gulp.dest('../public/css'))
    	.pipe(connect.reload())
    	.pipe(notify('Css compiled'));
})

gulp.task('watch', function() {
	gulp.watch('../_dev/_styles/**/*.scss', ['css']);
})

gulp.task('default', ['connect', 'watch']);