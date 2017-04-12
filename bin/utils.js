const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const assign = require('object-assign');
const utils = {};

utils.isExist = (filepath) => {
  if (!fs.existsSync(filepath)) {
    console.log(chalk.red('请输入一个正确的文件路径~'));
    exit(1);
  }
}
// 异步遍历recursion
var fileNum = 0, fileNum2 = 0;
function workDir(filepath, processCallback, callback ) {
  fs.readdir(filepath, (err, files) => {
    if (err) {
      console.log(chalk.red('遍历目录出现错误!'));
    }
    var length = files.length;
    if (length <= 0) {
      return callback(null);
    }
    if (/\/i18n$/.test(filepath)) {
      processCallback(files, filepath);
    }
    files.forEach(file => {
      const innerFilepath = path.resolve(filepath,file);
      fs.stat(innerFilepath, (err, stats) => {
        if (err) {
          console.log(err);
        }
        if (stats.isDirectory() && file !== 'node_modules') {
          if (file === 'i18n') {
            // callback(innerFilepath);
          }
          workDir(innerFilepath, processCallback, (error) => {
            if (error) {
              return callback(error);
            }
            length -= 1;
            if (length <= 0) {
              callback(null);
            }
          });
        } else {
          length -= 1;
          if (length <= 0) {
            callback(null);
          }
        }
      })
    });

  });
}

utils.work = workDir;

/*
 * 转换成 worksheet 需要的结构
 *
 *
 * @retrun {object} 如
 * {!ref: 'A1:C2', A1: {v: 1}, B1: {v: 2}, C1: {v: 3}, A2: {v: 1}, B2: {v: 2}, C2: {v: 3}}
 */
utils.formatWb = (headers, json, i18nPath) => {
  var index = 2;
  const fileHeader = {
    A1: {
      v: 'filepath',
    },
    B1: {
      v: i18nPath,
    },
    C1: {
      v: 'no translate!'
    },
  };
  const headersData = headers.map((key, i) => ({
    v: key,
    position: String.fromCharCode(65 + i) + index,
  })).reduce((pre, cur) => assign({}, pre, { [cur.position]: {v: cur.v} }), {});
  index += 1;
  const data = Object.keys(json).reduce((pre, cur) => {
    const curObj = {
      [String.fromCharCode(65) + index]: {
        v: cur,
      },
      [String.fromCharCode(66) + index]: {
        v: json[cur],
      },
      [String.fromCharCode(67) + index]: {
        v: '',
      },
    };
    index += 1;
    return assign({}, pre, curObj);
  }, {});

  const workbook = assign({}, fileHeader, headersData, data);
  const keys = Object.keys(workbook);
  const ref = {
    '!ref': keys[0] + ':' + keys[keys.length - 1],
  };

  return assign({}, workbook, ref);
};

module.exports = utils;
