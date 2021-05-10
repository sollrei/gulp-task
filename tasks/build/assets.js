const { src, dest } = require('gulp');

const config = require('../config');

const { base, dist, assets } = config.paths;

module.exports = function (_path) {
  let path = typeof _path === 'string' ? _path : assets;

  return src(path, { base })
    .pipe(dest(dist));
};
