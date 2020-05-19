'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
const source = require("vinyl-source-stream");

// File paths
const files = {
  styles: './src/scss/**/*.scss',
  scripts: './src/js/**/*.js',
  scriptsMain: './src/js/main.js',
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
  return (
    browserify({
        entries: files.scriptsMain,
        transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(dest('./dist/js'))
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
  watch(files.html).3on('change', browserSync.reload)
  watch('./dist/css/*.css').on('change', browserSync.reload)
  watch('./dist/js/*.js').on('change', browserSync.reload)
}

exports.default = series(
  parallel(stylesTask, scriptsTask),
  watchTask
)

exports.styles = series(stylesTask)