const glob = require('glob');
const fs = require('fs');
const path = require('path');

const config = require('../config');

module.exports = function (cb) {
  glob(config.paths.dist + '**/html/*.html', function (err, file) {
    const arr = {};
    file.forEach(item => {
      const pathArr = item.split('/');
      const [dist, dev, mod, unit, version, _html, filename] = pathArr;
      const url = item.replace(/^dist\/dev/, '');

      if (!arr[mod]) {
        arr[mod] = {};
      } 
      
      if (!arr[mod][unit]) {
        arr[mod][unit] = [];
      }

      arr[mod][unit].push(url);
    });

    let _str = '';

    function createMod(name) {
      return `<div class="w200 ft-h2 p10">${name}</div>`;
    }

    function createUnit(name) {
      return `<div class="w200 ft-h3 p10">${name}</div>`;
    }

    function createLink(linkArr) {
      const lk = linkArr.reduce((pre, item) => {
        const filename = path.basename(item);
        return pre + `<div class="p10"><a target="_blank" class="ft-primary" href="${item}">${filename}</a></div>`;
      }, '');
      return `<div class="ui-column stretch">${lk}</div>`;
    }

    Object.keys(arr).forEach(key => {
      const row = arr[key];
      const links = Object.keys(row).map(unitKey => {
        const link = row[unitKey];
        return '<div class="ui-row unit">' + createUnit(unitKey) + createLink(link) + '</div>';
      });
      _str += `<div class="ui-row">${createMod(key)} <div class="stretch">${links.join('')}</div></div>`;
    });
   
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sollrei/ui-pages/dist/ui.css">
      <title>Document</title>
      <style>
        body{background: #fafcfe;}
        .p10, .unit {padding: 3px 10px;margin: 2px;background: #fff;border-radius: 4px;}
        .w200 {width: 180px;display: flex;align-items: center;}
      </style>
    </head>
    <body>
      <div style="width: 1200px;margin: 0 auto;padding: 40px;">
      <div class="ui-row">
        <div class="w200 pl-12 ft-h2">模块</div>
        <div class="w200 pl-12 ft-h2">子模块</div>
        <div class="stretch pl-12 ft-h2">页面</div>
      </div>
      ${_str}
      </div>
    </body>
    </html>`;
  
    const f = new Buffer(html);
    fs.writeFile(config.paths.dist + 'index.html', f, function (_err) {
      if (_err) {
        console.log(_err);
      } else {
        console.log('success');
      }
    });
  });
  // cb();
};
