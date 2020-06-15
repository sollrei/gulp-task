const { task, series, watch } = require('gulp');

const clean = require('./tasks/clean');

const css = require('./tasks/build/css');
const js = require('./tasks/build/javascript');
const assets = require('./tasks/build/assets');
const html = require('./tasks/build/html');

const rev = require('./tasks/rev/rev');

const test = 'abc';

task('clean', () => { return clean(); });

// build

task('css', () => { return css(); });

task('js', () => { return js(); });

task('assets', (cb) => { return assets(cb, test); });

task('html', () => { return html(); });

task('rev', () => { return rev(); });


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
    watch('src/**/*.js', { delay: 1000 }, js);
    watch('src/**/*.scss', { delay: 1000 }, css);
    done();
  }
);
