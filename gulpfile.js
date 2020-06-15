const { task, series, watch } = require('gulp');
const config = require('./tasks/config');

const clean = require('./tasks/clean');

const css = require('./tasks/build/css');
const js = require('./tasks/build/javascript');
const assets = require('./tasks/build/assets');
const html = require('./tasks/build/html');

const rev = require('./tasks/rev/rev');

const index = require('./tasks/plugin/gulp-index');

const test = 'abc';

task('clean', () => { return clean(); });

// build

task('css', () => { return css(); });

task('js', () => { return js(); });

task('assets', (cb) => { return assets(cb, test); });

task('html', () => { return html(); });

task('rev', () => { return rev(); });

task('index', (cb) => { return index(cb); });

exports.dev = series(
  ['clean'],
  ['css', 'js', 'html']
);

exports.build = series(
  ['clean'],
  ['css', 'js', 'html', 'rev']
);

exports.watch = series(
  function (done) {
    watch(config.paths.js, { delay: 1000 }, js);
    watch(config.paths.css, { delay: 1000 }, css);
    watch(config.paths.html, { delay: 1000 }, html);
    done();
  }
);
