var del = require('del');

var gulp = require('gulp');

var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');


gulp.task('build', ['clean'], function () {
	return gulp.src('./src/**/*.es6')
		.pipe(babel())
		.pipe(rename(function (path) {
			path.extname = '.js';
		}))
		.pipe(gulp.dest('./dist'));
});


gulp.task('clean', function() {
  del.sync(['./dist']);
});


gulp.task('test', ['build'], function () {
	return gulp.src('./dist/tests/**/*.js', {read: false})
		.pipe(mocha());
});


gulp.task('watch', ['build'], function () {
	gulp.watch('./src/**/*', ['build']);
});


gulp.task('pre-npm-release', ['build'], function () {
  gulp.src('./dist/notes.js')
    .pipe(rename(function (path) {
      path.basename = 'index';
    }))
    .pipe(gulp.dest('.'));
});


gulp.task('default', ['build']);