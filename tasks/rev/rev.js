const { src, dest } = require('gulp');
const revCollector = require('gulp-rev-collector');

const config = require('../config');

module.exports = function () {
  return src(['rev/**/*.json', 'dist/pro/!(lib)/**/*.js'])
    .pipe(
      revCollector()
    )
    .pipe(dest(config.paths.dist));
};
