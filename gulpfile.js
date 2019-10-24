var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

/*var normalizePath = [
  'node_modules/normalize.css'
];*/


function sass() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      /*includePaths: normalizePath,*/
      outputStyle: 'compressed'
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ overrideBrowserslist: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
};

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", sass);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("js/app.js").on('change', browserSync.reload);
}

gulp.task('sass', sass);
gulp.task('serve', gulp.series('sass', serve));
gulp.task('default', gulp.series('sass', serve));