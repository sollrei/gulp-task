const minimist = require('minimist');

const isDev = !(process.env.NODE_ENV === 'production');
const dist = isDev ? 'dist/dev/' : 'dist/pro/';

console.log('isDev', isDev);

const { m = '**' } = minimist(process.argv.slice(2));

module.exports = {
  paths: {
    clean: dist + m,
    css: `src/${m}/**/src/*.scss`,
    js: `src/${m}/**/src/*.js`,
    html: `src/${m}/**/html/*.html`,
    base: 'src/',
    dist: dist,
    rev: 'rev/'
  },

  isDev
};
