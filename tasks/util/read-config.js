const fs = require('fs');

module.exports = function (url) {
  try {
    const _url = url.replace(/\/src$/, '/config.json');
    const data = fs.readFileSync(_url, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};
