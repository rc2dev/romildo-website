var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

var paths = {
  css: 'website/css/style.css',
  js: 'website/js/*',
  html: 'website/*.html',
  images: 'website/img/*',
  icons: 'website/icons/*',
  netlify: 'website/_redirects'
};

gulp.task('clean', function() {
    return del(['build']);
});

// Minify and copy all JavaScript (except vendor scripts)
// with sourcemaps all the way down
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

// Minify HTML
gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true, customAttrCollapse: /content/,
      minifyJS: true, removeComments: true }))
      //.pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/'));
});

// Copy vendor JS
gulp.task('js', ['clean'], function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('img', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    //.pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Copy static icons
gulp.task('icons', ['clean'], function() {
  return gulp.src(paths.icons)
    // Pass in options to the task
    //.pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/icons'));
});

// Copy _netlify
gulp.task('netlify', ['clean'], function() {
  return gulp.src(paths.netlify)
    .pipe(gulp.dest('build/'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'html', 'js', 'img', 'icons', 'netlify']);
