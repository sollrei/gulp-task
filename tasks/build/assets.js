const { src, dest } = require('gulp');

const config = require('../config');

const { base, dist, assets } = config.paths;

module.exports = function (cb) {
  src(assets, { base })
    .pipe(dest(dist));
  cb();
};