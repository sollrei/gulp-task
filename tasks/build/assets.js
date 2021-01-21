const { src, dest } = require('gulp');

const config = require('../config');

const { base, dist } = config.paths;

module.exports = function (_path) {
  src(_path, { base })
    .pipe(dest(dist));
};
