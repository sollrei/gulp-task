const path = require('path');
const through = require('through2');
const fs = require('fs');

module.exports = function () {
  return through.obj({ objectMode: true }, function (file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error');
      return callback(null, file);
    }

    let content = file.contents.toString();

    const arr = content.match(/__inline\(["'](\S*)["']\)/g);

    if (!arr) {
      return callback(null, file);
    }

    if (arr) {
      arr.forEach(function (item) {
        const url = item.match(/__inline\(["'](\S*)["']\)/)[1];
        const filePath = path.resolve(path.dirname(file.path), url);
        
        try {
          const data = fs.readFileSync(filePath, 'utf-8');
          const str = data.replace(/\n[ ]*/g, '');
          content = content.replace(item, '`' + str + '`');
        } catch (err) {
          console.log(err);
        }
      });
    }

    let newFile = file;
    newFile.contents = new Buffer(String(content));
    return callback(null, file);
  });
};
