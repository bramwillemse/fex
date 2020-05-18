'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

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
  browserSync.init({
    server: {
      injectChanges: true,
      baseDir: "./dist" // change on your preferred
    }
  })

  watch(files.scripts, series(scriptsTask))
  watch(files.styles, series(stylesTask))
  watch(files.html).on('change', browserSync.reload)
  watch('./dist/css/*.css').on('change', browserSync.reload)
  watch('./dist/js/*.js').on('change', browserSync.reload)
}

exports.default = series(
  parallel(stylesTask, scriptsTask),
  watchTask
)

exports.styles = series(stylesTask)