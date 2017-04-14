## i18njson  [![NPM version](https://img.shields.io/npm/v/i18njson.svg)](https://www.npmjs.org/package/i18njson)

根据zh-cn.js自动生成翻译excel文档及生成en.js

---

## Feature

- 根据zh-cn.js自动生成翻译excel文档及生成en.js

## Install

```bash
$ npm i i18njson -g
```

## Usage

```bash
$ i18njson --help
```

##### 遍历执行目录下的i18n文件夹，整理其目录下的zh-cn.js内容生成i18n.xlsx
格式: `i18njson excel filepath`

```
i18njson excel ./
```

##### 根据翻译文档自动在相应的路径下自动生成「en.js」文件

格式：`i18njson json xxx.xlsx`
如：

```
i18njson json i18n.xlsx
```

##### 大致使用流程
- 在项目中建立各个i18n文件夹，及其目录下的zh-cn.js，完善里面的key值及中文填写
- 在项目的根目录下执行`i18njson excel ./`生成`i18n.excel`文档
- 将`i18n.excel`将给翻译小组翻译写入相应的英文(excel文档下可能有多个sheets，提醒翻译小组别漏译)
- 对翻译过的`i18n.excel`执行命令, `i18njson json i18n.excel`

##### i18njson build 废弃
