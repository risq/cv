var gulp = require("gulp")
  , gutil = require("gulp-util")
  , plumber = require("gulp-plumber")
  , myth = require("gulp-myth")
  , csso = require("gulp-csso")
  , options = require("minimist")(process.argv.slice(2))
  , debug = require('gulp-debug')
  , bower = require('gulp-bower-files')
  , gulpFilter = require('gulp-filter')
  , concat = require('gulp-concat')
  , clean = require('gulp-clean')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')

var src = {
  css: ['assets/**/*.css'],
  js: ['assets/**/*.js'],
  bower: ['bower.json', '.bowerrc']
}

var publishdir = 'dist'
var dist = {
  all: [publishdir + '/**/*'],
  css: publishdir + '/assets/css',
  js: publishdir + '/assets/js',
  img: publishdir + '/assets/img',
  fonts: publishdir + '/assets/fonts',
  vendor: publishdir + '/assets',
}


gulp.task("clean", function() {
  return gulp.src(publishdir, {read: false})
    .pipe(clean());
})

gulp.task('bower', function() {
  var jsFilter = gulpFilter('**/*.js')
  var cssFilter = gulpFilter('**/*.css')
  var fontsFilter = gulpFilter('**/fonts/**/*')
  return bower()
    .pipe(jsFilter)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(dist.js))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(dist.css))
    .pipe(cssFilter.restore())
    .pipe(fontsFilter)
    .pipe(rename(function(path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/'
      }
    }))
    .pipe(gulp.dest(dist.fonts))
})

gulp.task("css", function() {
  return gulp.src("./src/assets/css/*.css")
    .pipe(options.production ? plumber() : gutil.noop())
    .pipe(myth({sourcemap: !options.production}))
    .pipe(options.production ? csso() : gutil.noop())
    .pipe(gulp.dest(dist.css))
})

gulp.task("js", function() {
  return gulp.src("./src/assets/js/*.js")
    .pipe(gulp.dest(dist.js))
})

gulp.task("img", function() {
  return gulp.src("./src/assets/img/**/*")
    .pipe(gulp.dest(dist.img))
})

gulp.task("font", function() {
  return gulp.src("./src/assets/fonts/**/*")
    .pipe(gulp.dest(dist.fonts))
})

gulp.task('build', ['bower', 'css', 'js', 'img', 'font'], function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest(publishdir))
})



gulp.task("default", ["css"], function() {
  gulp.watch("./assets/css/**/*", ["css"])
})

gulp.on('err', function(e) {
  console.log(e.err.stack);
});
