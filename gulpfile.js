// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var exec = require('child_process').exec;

// Generate our site
gulp.task('sculpin', function() {
    return exec('vendor/bin/sculpin generate');
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('output_dev/js'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/dln.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('output_dev/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('source/*.html', ['sculpin']);
    gulp.watch('source/_layouts/*.twig', ['sculpin']);
    gulp.watch('source/_layouts/*/*.twig', ['sculpin']);
});

// Default Task
gulp.task('default', ['sculpin', 'lint', 'scripts', 'sass', 'watch']);