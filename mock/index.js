// const fs = require('fs');
// const path = require('path');
// var fileNum = 0,filesInfo = [];
//
// const filepath = path.resolve(process.cwd(), process.argv[2]);
// function recursion (filepath) {
// 	fs.readdir(filepath, (err, files) => {
// 	 	if(files && files.length){
// 			fileNum += files.length;
// 			files.forEach(file => {
//         const innerFilepath = path.resolve(filepath,file);
//         fs.stat(innerFilepath, (err, stats) => {
//           // doSomething(); // 这里做一些收集文件信息的操作,收集的文件信息放到filesInfo里
//           filesInfo.push('fileInfo');
//           recursion(innerFilepath);
//         });
// 	});
// 	}else{
//       console.log( fileNum, filesInfo.length, filepath)
// 			if(fileNum === filesInfo.length){	//代表处理所有的目录完毕
//         console.log('success')
// 			}
// 		}
// 	});
// }
//
// recursion(filepath);

'use strict';

const fs = require('fs');
const path = require('path');
const filepath = path.resolve(process.cwd(), process.argv[2]);

function readDirectory(_path, ignorePattenList, callback) {
    if (typeof ignorePattenList === 'function') {
        callback = ignorePattenList;
        ignorePattenList = [];
    }

    let result = {
        path: _path,
        name: path.basename(_path),
        type: 'directory'
    };

    fs.readdir(_path, function (error, files) {
        if (error) {
            return callback(error);
        }

        let length = files.length;
        if (length <= 0) {
            return callback(undefined, result);
        }

        result.children = [];

        files.forEach(function (file) {
            let filePath = path.resolve(_path, file);
            fs.stat(filePath, function (error, fileStat) {
                if (error) {
                    return callback(error);
                }
                console.log(filepath)
                if (fileStat.isDirectory()) {
                    readDirectory(filePath, ignorePattenList, function (error, _result) {
                        if (error) {
                            return callback(error);
                        }

                        result.children.push(_result);

                        length -= 1;
                        if (length <= 0) {
                            return callback(undefined, result);
                        }
                    });
                } else {
                    result.children.push({
                        path: filePath,
                        name: file,
                        type: 'file'
                    });

                    length -= 1;
                    if (length <= 0) {
                        return callback(undefined, result);
                    }
                }
            });
        });
    });
}

// async traverse
// async function recursion (filepath) {
//     let [files,stat] = await Promise.all([fs.readdir(filepath), fs.stat(filepath)]);
//     let res = [stat];
//     if(files && files.length){
//         const promises = files.map(function (file) {
//             const innerFilepath = path.resolve(filepath,file);
//             return recursion(innerFilepath);
//         });
//         const stats = await Promise.all(promises);
//         for(let item of stats){
//             res = res.concat(item);
//         }
//     }
//     return res;
// }


readDirectory(filepath, () => {console.log('success')});
