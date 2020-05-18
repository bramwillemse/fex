'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');

// File paths
const files = {
  styles: './src/scss/**/*.scss',
  scripts: './src/js/**/*.js',
  html: './**/*.html'
}

function stylesTask() {
  return src(files.styles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css')
  )
}

function scriptsTask(){
  return src(files.scripts)
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(dest('./dist/js')
  )
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
  watch(files.scripts, series(scriptsTask))
  watch(files.styles, series(stylesTask))
  watch(files.html).on('change', reload)
  watch('./dist/css/*.css').on('change', reload)
  watch('./dist/js/*.js').on('change', reload)


  browserSync.init({
    server: {
      baseDir: "./" // change on your preferred
    }
  })
}

exports.default = series(
  parallel(stylesTask, scriptsTask),
  watchTask
)

exports.styles = series(stylesTask)