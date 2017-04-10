const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const utils = {};

utils.isExist = (filepath) => {
  if (!fs.existsSync(filepath)) {
    console.log(chalk.red('请输入一个正确的文件路径~'));
    exit(1);
  }
}
// 异步遍历recursion
var fileNum = 0, fileNum2 = 0;
function workDir(filepath, callback ) {
  fs.readdir(filepath, (err, files) => {
    if (err) {
      console.log(chalk.red('遍历目录出现错误!'));
    }
    var length = files.length;
    if (length <= 0) {
      return callback(null, json);
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
          workDir(innerFilepath, (error ,json) => {
            if (error) {
              return callback(error);
            }
            length -= 1;
            if (length <= 0) {
              callback(error, json);
            }
          });
        } else {
          length -= 1;
          if (length <= 0) {
            callback(null, json);
          }
        }
      })
    });

  });
}

utils.work = workDir;

module.exports = utils;
