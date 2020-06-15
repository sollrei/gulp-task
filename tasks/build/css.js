const { src, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const config = require('../config');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const isDev = config.isDev;

module.exports = function (pt) {
  let _path = config.paths.css;

  if (typeof pt === 'string') {
    _path = pt;
  }

  return src(_path, { base: config.paths.base })
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCss())
    .pipe(gulpIf(!isDev, rev()))
    .pipe(dest(config.paths.dist))
    .pipe(gulpIf(!isDev, rev.manifest('rev/css/map.json', {
      base: 'rev/css',
      merge: true
    })))
    .pipe(gulpIf(!isDev, dest('rev/css')));
  // .pipe(gulpIf(isDev, browserSync.stream()));
};
