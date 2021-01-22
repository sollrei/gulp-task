const { src, dest } = require('gulp');

const rollup = require('gulp-better-rollup');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');

const config = require('../config');
const inline = require('../plugin/gulp-inline');
const browserSync = require('../serve/server').browserSync;

const isDev = config.isDev;

let _conf = {
  format: 'umd'
};

module.exports = function (pt) {
  let _path = config.paths.js;

  if (typeof pt === 'string') {
    _path = pt;
  }

  return src(_path, { base: config.paths.base })
    .pipe(rollup(_conf))
    .pipe(inline())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(gulpIf(!isDev, rev()))
    .pipe(dest(config.paths.dist))
    .pipe(gulpIf(!isDev, rev.manifest('rev/js/map.json', {
      base: 'rev/js',
      merge: true
    })))
    .pipe(gulpIf(!isDev, dest('rev/js')))
    .pipe(gulpIf(isDev, browserSync.stream()));
};
