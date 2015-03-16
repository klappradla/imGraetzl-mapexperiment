var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  babelify = require("babelify"),
  browserify = require("browserify"),
  buffer = require('vinyl-buffer'),
  source = require('vinyl-source-stream');

//TODO: replace ruby-sass with node-sass when sourcemaps are working
gulp.task('css', function () {
  sass('src/scss/style.scss', {sourcemap: true, style: 'compressed'})
    .pipe(autoprefixer('last 4 version'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js-vendor',function(){
  gulp.src('src/js/vendor/*.js')
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
});

gulp.task('js-custom',function(){
  browserify('./src/js/main.js', {debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./app/assets/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch("src/scss/*/*.scss", ['css']);
  gulp.watch("src/js/**/*.js", ['js-custom']);
  gulp.watch("app/*.html", ['bs-reload']);
});

gulp.task('default', ['css', 'js-vendor', 'js-custom', 'browser-sync', 'watch']);
