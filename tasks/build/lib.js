const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const config = require('../config');

const { base, dist, lib } = config.paths;

module.exports = function (cb) {
  src(lib, { base })
    .pipe(uglify())
    .pipe(dest(dist));
  cb();
};
