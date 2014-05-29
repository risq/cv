var gulp        = require("gulp"),
    gutil       = require("gulp-util"),
    myth        = require("gulp-myth"),
    csso        = require("gulp-csso"),
    debug       = require('gulp-debug'),
    bower       = require('gulp-bower-files'),
    gulpFilter  = require('gulp-filter'),
    concat      = require('gulp-concat'),
    clean       = require('gulp-clean'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    useref      = require('gulp-useref'),
    runSequence = require('run-sequence'),
    open        = require("gulp-open");

var src = {
    css: ['assets/**/*.css'],
    js: ['assets/**/*.js'],
    bower: ['bower.json', '.bowerrc']
}

var publishdir = 'dist'
var dist = {
    all:       [publishdir + '/**/*'],
    css:        publishdir + '/assets/css',
    js:         publishdir + '/assets/js',
    img:        publishdir + '/assets/img',
    fonts:      publishdir + '/assets/fonts',
    vendor:     publishdir + '/assets',
    modernizr:  publishdir + 'modernizr_custom'
}

var sourcesdir = 'src'
var sources = {
    css:    sourcesdir + '/assets/css',
    js:     sourcesdir + '/assets/js',
    fonts:  sourcesdir + '/assets/fonts'
}


gulp.task("clean", function () {
    return gulp.src(publishdir, {
            read: false
        })
        .pipe(clean());
})

gulp.task('bower-build', function () {
    var jsFilter = gulpFilter('**/*.js')
    var cssFilter = gulpFilter('**/*.css')
    var fontsFilter = gulpFilter('**/fonts/**/*')
    return bower()
        .pipe(jsFilter)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(dist.js))
        .pipe(gulp.dest(sources.js))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(dist.css))
        .pipe(gulp.dest(sources.css))
        .pipe(cssFilter.restore())
        .pipe(fontsFilter)
        .pipe(rename(function (path) {
            if (~path.dirname.indexOf('fonts')) {
                path.dirname  = '/'
            }
        }))
        .pipe(gulp.dest(dist.fonts))
        .pipe(gulp.dest(sources.fonts))
})

gulp.task("html", function () {
    return gulp.src('./src/*.html')
        .pipe(useref())
        .pipe(gulp.dest(publishdir))
})

gulp.task("css", function () {
    return gulp.src("./src/assets/css/*.css")
        .pipe(concat('main.css'))
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest(dist.css))
})

gulp.task("js", function () {
    gulp.src("./src/assets/js/*/*.js")
        .pipe(gulp.dest(dist.js))
    return gulp.src("./src/assets/js/*.js")
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist.js))
})

gulp.task("img", function () {
    return gulp.src("./src/assets/img/**/*")
        .pipe(gulp.dest(dist.img))
})

gulp.task("font", function () {
    return gulp.src("./src/assets/fonts/**/*")
        .pipe(gulp.dest(dist.fonts))
})

gulp.task('build', function () {
    runSequence('clean',
                ['bower-build', 'css', 'js', 'img', 'font', 'html'],
                function() {
                    gulp.src("./dist/index.html")
                        .pipe(open("<%file.path%>"));
                });
})

gulp.task("default", ["bower-build"], function () {
        gulp.src("./src/index.html")
            .pipe(open("<%file.path%>"));
})

gulp.on('err', function (e) {
    console.log(e.err.stack);
});
