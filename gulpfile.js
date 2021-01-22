const { task, series, watch } = require('gulp');
const clean = require('./tasks/util/clean');
const css = require('./tasks/build/css');
const js = require('./tasks/build/javascript');
const assets = require('./tasks/build/assets');
const html = require('./tasks/build/html');
const rev = require('./tasks/rev/rev');
const index = require('./tasks/plugin/gulp-index');
const serve = require('./tasks/serve/server').sv;
const config = require('./tasks/config');

const { paths } = config;

task('clean', clean);

task('css', css);

task('js', js);

task('assets', assets);

task('html', html);

task('rev', rev);

task('index', index);

task('serve', serve);

// NODE_ENV=development gulp dev -m global/common
exports.dev = series(['clean'], ['css', 'js', 'html'], ['index']);

// NODE_ENV=production gulp build -m global/common
exports.build = series(['clean'], ['css', 'js', 'html', 'rev']);

exports.watch = series(
  serve,
  function (done) {
    watch(paths.js).on('change', js);

    watch(paths.js).on('unlink', clean);

    watch(paths.css).on('change', css);

    watch(paths.css).on('unlink', clean);

    watch(paths.html).on('change', html);

    watch(paths.html).on('add', (file) => {
      series(() => html(file), ['index'])();
    });

    watch(paths.html).on('unlink', function (file) {
      series(() => clean(file), ['index'])();
    });
    
    watch(paths.assets).on('change', assets);

    watch(paths.assets).on('add', assets);

    watch(paths.assets).on('unlink', clean);

    done();
  }
);
