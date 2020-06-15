const { src, dest } = require('gulp');
const path = require('path');

const through = require('through2');
const rollup = require('gulp-better-rollup');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');

const config = require('../config');
const rd = require('../util/read-config');
const inline = require('../plugin/gulp-inline');

const isDev = config.isDev;

let mod = '';

module.exports = function () {
  return src(config.paths.js, { base: config.paths.base })
    .pipe(
      through.obj({ objectMode: true }, function (file, enc, callback) {
        const { bundle } = rd(path.dirname(file.path));

        if (bundle && Array.isArray(bundle) && bundle.includes(path.basename(file.path))) {
          if (file.isBuffer()) {
            mod = 'umd';
          }
        }

        callback(null, file);
      })
    )
    .pipe(rollup({}, mod))
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
    .pipe(gulpIf(!isDev, dest('rev/js')));
};
