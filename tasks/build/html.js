const { src, dest } = require('gulp');

const removeEmptyLines = require('gulp-remove-empty-lines');
const nunjucksRender = require('gulp-nunjucks-render');
const path = require('path');
const foreach = require('gulp-foreach');

const config = require('../config');
const browserSync = require('../serve/server').browserSync;

module.exports = (pt) => {
  let _path = config.paths.html;

  if (typeof pt === 'string') {
    _path = pt;
  }

  return src(_path, { base: config.paths.base })
    .pipe(
      foreach((stream) => {
        return stream.pipe(
          nunjucksRender({
            path: [path.resolve(__dirname, '../../', config.paths.base)],
            data: config.templateData
          })
        );
      })
    )
    .pipe(removeEmptyLines())
    .pipe(dest(config.paths.dist))
    .pipe(browserSync.stream());
};
