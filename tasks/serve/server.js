const browserSync = require('browser-sync').create();
const config = require('../config');

module.exports = {
  sv: function (done) {
    browserSync.init({
      server: {
        baseDir: config.paths.serve
      },
      port: config.servePort
    });
    done();
  },
  browserSync
};
