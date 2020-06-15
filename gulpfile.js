const { task, series, watch } = require('gulp');
const config = require('./tasks/config');

const clean = require('./tasks/util/clean');

const css = require('./tasks/build/css');
const js = require('./tasks/build/javascript');
const assets = require('./tasks/build/assets');
const html = require('./tasks/build/html');

const rev = require('./tasks/rev/rev');

const serve = require('./tasks/serve/server');

const index = require('./tasks/plugin/gulp-index');

task('clean', () => { return clean(); });

task('css', () => { return css(); });

task('js', () => { return js(); });

task('assets', (cb) => { return assets(cb); });

task('html', () => { return html(); });

task('rev', () => { return rev(); });

task('index', (cb) => { return index(cb); });

task('serve', serve);

// NODE_ENV=development gulp dev -m global/common
exports.dev = series(['clean'], ['css', 'js', 'html'], ['index']);

exports.build = series(['clean'], ['css', 'js', 'html', 'rev']);

exports.watch = series(
  serve,
  function (done) {
    watch(config.paths.js, { delay: 1000 }, js);
    watch(config.paths.css, { delay: 1000 }, css);
    watch(config.paths.html, { delay: 1000 }, html);
    done();
  }
);
