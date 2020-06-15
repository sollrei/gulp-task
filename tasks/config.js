const isDev = !!(process.env.NODE_ENV === 'development');
const dist = isDev ? 'dist/dev/' : 'dist/pro/';

module.exports = {
  paths: {
    clean: dist,
    css: 'src/**/src/*.scss',
    js: 'src/**/src/*.js',
    html: 'src/**/html/*.html',
    base: 'src/',
    dist: dist,
    rev: 'rev/'
  },

  isDev
};
