var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    csscomb = require('gulp-csscomb'),
	notify = require( 'gulp-notify' ),
    pug = require('gulp-pug');
    

gulp.task('pug', function () {
	return gulp.src('app/project/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('pre-relise'))
});

gulp.task('stylus', function () {
	return gulp.src('app/project/main.styl')
        .pipe(stylus({
				  'include css': true
				}
			).on( 'error', notify.onError(
					{
						message: "<%= error.message %>",
        				title  : "Sass error!"
					}
				)
			)
		 )
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('pre-relise'))
});

gulp.task('json', function () {
    return gulp.src('app/template/*.json')
        .pipe(gulp.dest('pre-relise'))
});

gulp.task('js', function() {
    return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/common/**/*.js',
		'app/project/**/*.js'
		]) 
        .pipe(concat('main.js'))
        .pipe(gulp.dest('pre-relise'))
});

gulp.task('image', function() {
    return gulp.src(['app/images/**/**/*'])
        .pipe(gulp.dest('pre-relise/images/'))
});

gulp.task('font', function(){
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('pre-relise/fonts'))
});

gulp.task('default', ['stylus', 'image', 'js', 'font', 'pug', 'json'], function () {
    gulp.watch('app/**/*.styl', ['stylus']);
    gulp.watch('app/project/*.json', ['json']);
    gulp.watch('app/project/*.pug', ['pug']);
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/images/**/*', ['image']);
    gulp.watch('app/font/**/*', ['font']);
});