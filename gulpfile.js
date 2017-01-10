const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const pump = require('pump')

gulp.task('transpile-js', () => {
  gulp.src('src/js/app.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('minify-js', function (cb) {
  pump([
      gulp.src('dist/js/app.js'),
      uglify(),
      rename('app.min.js'),
      gulp.dest('dist/js')
    ],
        cb
    )
})

gulp.task('minify-css', () => {
  gulp.src('src/css/styles.css')
        .pipe(cleanCSS({
          compatibility: 'ie8'
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('minify-img', () =>
    gulp.src('src/img/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
)
