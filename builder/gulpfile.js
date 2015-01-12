"use strict";

var gulp = require('gulp'),
    opn = require('opn'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
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
    	.pipe(minify({
            keepBreaks:true,
            suffix: '.min'
        }))
    	.pipe(gulp.dest('../public/css'))
    	.pipe(connect.reload())
    	.pipe(notify('Css compiled'));
})

// Compile Jade to HTML

gulp.task('html', function() {
    gulp.src('../_dev/_makeups/*.jade')
        .pipe(plumber({errorHandler: notify.onError("Error: HTML")}))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('../public/'))
        .pipe(connect.reload())
        .pipe(notify('HTML compiled'));
})

// Concatanation js scripts

gulp.task('js', function() {
    gulp.src('../_dev/_js/*.js')
        .pipe(plumber({errorHandler: notify.onError("Error: JS")}))
        .pipe(concat('main.js', {newLine: ';'}))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('../public/js/'))
        .pipe(connect.reload())
        .pipe(notify("JS compiled"));
})

gulp.task('watch', function() {
    gulp.watch('../_dev/_styles/**/*.scss', ['css']);
    gulp.watch('../_dev/_makeups/**/*.jade', ['html']);
	gulp.watch('../_dev/_js/*.js', ['js']);
})

gulp.task('default', ['connect', 'watch']);