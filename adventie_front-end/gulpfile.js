var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
    rename = require('gulp-rename'),
    
    /* Error Handling */
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),

    /* PostCss Procssors */
    autoprefixer = require('autoprefixer'),
    /* END | PostCss Procssors */

    uglify = require("gulp-uglify");

gulp.task('default', ['styles','watch']);

// Paths
var paths = {
    sass: ['./scss/**/*.scss']
};

// Server
gulp.task('server', function () {
    gulp.src('./')
        // Server
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            //directoryListing: true,
            open: true
        }));
});

// Watch Task
gulp.task('watch', function () {
    gulp.watch('./styles/main.scss', ['styles']);
});

// Styles
gulp.task('styles', function () {
    
    var processors = [
         // Prefixes
        autoprefixer({
            browsers: ['last 2 versions']
        }),
    ];

    return gulp.src('./styles/main.scss')
        // Compile Sass and Compress
        .pipe(sass({outputStyle: 'compressed'}))
        // Postcss Processors
        .pipe(postcss(processors))
        // Output
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./styles'));
});

// Copresse Scripts
/*gulp.task('scripts', function () {
    gulp.src('scripts/*.js')
        // Compresse
        .pipe(uglify())

    // Erorr Handling
    .pipe(gulp.dest('minjs'));
});*/

// Compress Images
/*gulp.task('images', function () {
    gulp.src('images/*')
        .pipe()
        .pipe(gulp.dest('build/imges'))
})*/

// lib
/*gulp.task('lib', function () {
    gulp.src('node_modules')
        .pipe()
        // Libraries for Prodaction
        .pipe(gulp.dest('scripts/lib.js'))
        // Copresse Libraries
        .pipe()
        // Libraries for Disrpotion
        .pipe(gulp.dest('build/lib.min.js'))
});*/

// Test
/*gulp.task('default', function() {
  return gulp.src(['test/test-*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }));
});*/

// Erorr Handling /* http://bit.ly/1RVNVYY */
var gulp_src = gulp.src;
gulp.src = function () {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function (error) {
            // Output an error message
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            // emit the end event, to properly end the task
            this.emit('end');
        }));
};