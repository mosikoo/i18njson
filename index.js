#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const parser = require('xlsx');
const chalk = require('chalk');
const process = require('process');

function isExcel(filepath) {
  const isExist = fs.existsSync(filepath);
  if (isExist) {
    const ext = path.extname(filepath).slice(1);
    return ext === 'xlsx' || ext === 'xls';
  }
  return false;
}

function processData(json) {
  // need to optimize
  var str = JSON.stringify(json).replace(/,/g, ',\n  ')
    .replace(/:/g, ': ').replace(/[{}]/g, '');
  str = 'module.exports = {\n  ' + str + '\n};\n';
  return str;
}

const filepath = path.resolve(process.cwd(), process.argv[2]);

if(!isExcel(filepath)) {
  console.log(chalk.green('please select a file with \'xlsx\' or \'xls\' extname! '))
  process.exit(1);
}

const workbook = parser.readFile(filepath);
// 默认只取第一张表
const workSheet = workbook.Sheets[workbook.SheetNames[0]];
const data = parser.utils.sheet_to_json(workSheet);

const en = {};
const zh = {};
const dataKeys = Object.keys(data[0]);

data.forEach(function(item) {
  const key = item[dataKeys[2]];
  en[key] = item[dataKeys[0]];
  zh[key] = item[dataKeys[1]];
});
// console.log(zh, en);

fs.writeFile(__dirname + '/en.js', processData(en), function(err) {
  console.log(chalk.yellow('en done\n'));
});
fs.writeFile(__dirname + '/zh-cn.js', processData(zh), function(err) {
  console.log(chalk.yellow('zh done\n'));
});
