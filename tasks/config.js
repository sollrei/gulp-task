const minimist = require('minimist');

const isDev = !(process.env.NODE_ENV === 'production');
const dist = isDev ? 'dist/dev/' : 'dist/pro/';

const { m = '**' } = minimist(process.argv.slice(2));

module.exports = {
  paths: {
    clean: dist + m,
    css: `src/${m}/**/src/*.+(scss|css)`,
    js: `src/${m}/**/src/*.+(js|es6)`,
    html: `src/${m}/**/html/*.html`,
    assets: `src/${m}/**/src/**/*.!(css|scss|js|es6|html)`,
    base: 'src/',
    dist: dist,
    rev: 'rev/',
    serve: 'dist/dev'
  },

  servePort: 80,
  isDev,

  templateData: {
    title: 'demo title'
  }
};
