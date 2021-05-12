const del = require('del');
const config = require('../config');

module.exports = function (file) {
  if (file && typeof file === 'string') {
    const dist = config.paths.dist;
    const filePath = file.replace('src/', dist);
    return del([filePath]);
  }

  return del([config.paths.clean]);
};
