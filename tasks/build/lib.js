const { src, dest } = require('gulp');

const config = require('../config');

const { base, dist, lib } = config.paths;

module.exports = function (cb) {
  src(lib, { base })
    .pipe(dest(dist));
  cb();
};
