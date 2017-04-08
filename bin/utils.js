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
// function workDir(filepath, callback) {
//   fs.readdir(filepath, (err, files) => {
//     if (err) {
//       console.log(chalk.red('遍历目录出现错误!'));
//     }
//     files.forEach(file => {
//       const innerFilepath = path.resolve(filepath,file);
//       fs.stat(innerFilepath, (err, stats) => {
//         if (err) {
//           console.log(err);
//         }
//         if (stats.isDirectory() && file !== 'node_modules') {
//           workDir(innerFilepath, callback);
//         }
//         if (file === 'i18n') {
//           callback(innerFilepath);
//         }
//       })
//     })
//   });
// }
// 同步遍历
function workDir(filepath, callback) {
  const files = fs.readdirSync(filepath);
  files.forEach(file => {
    const innerFilepath = path.resolve(filepath,file);
    const stats = fs.statSync(innerFilepath);
    if (stats.isDirectory() && file !== 'node_modules') {
      workDir(innerFilepath, callback);
    }
    if (file === 'i18n') {
      callback(innerFilepath);
    }
  });
}

utils.work = workDir;

module.exports = utils;
