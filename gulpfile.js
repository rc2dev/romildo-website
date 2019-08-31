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
  redirects: 'website/_redirects'
};

function clean() {
    return del(['build']);
}

function css() {
  return gulp.src(paths.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
}

// Minify HTML
function html() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true, customAttrCollapse: /content/,
      minifyJS: true, removeComments: true }))
      //.pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/'));
}

function js() {
  return gulp.src(paths.js)
    .pipe(gulp.dest('build/js'));
}

function img() {
  return gulp.src(paths.images)
    // Pass in options to the task
    //.pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
}

function icons() {
  return gulp.src(paths.icons)
    // Pass in options to the task
    //.pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/icons'));
}

// Copy netlify redirects
function redirects() {
  return gulp.src(paths.redirects)
    .pipe(gulp.dest('build/'));
}

var build = gulp.series(clean, gulp.parallel(css, html, js, img,
	icons, redirects));

// Declare tasks
exports.clean = clean;

// Task to be called by just running `gulp` from cli
exports.default = build;
