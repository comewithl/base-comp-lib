/**
 * 将JS转为ES5语法的ESModule
 */
const path = require('path');
const fs = require('fs-extra');
const babel = require('@babel/core');
const sourceDir = path.resolve(__dirname, '../src');
const esDir = path.resolve(__dirname, '../es');

/**
 *
 * @param {*} source 源文件地址
 * @param {*} target 目标文件地址
 */

function transformFileSync (source, target) {
  const sourceCode = fs.readFileSync(source).toString();
  const { code } = babel.transformSync(sourceCode, {
    babelrc: true,
    extends: path.resolve(__dirname, './babel-react.config.js')
  });
  if (target) {
    fs.outputFileSync(target, code);
  }
  return code;
}

/**
 * 遍历文件，查找文件
 * @param {*} dir 源目录地址
 * @param {*} targetDir 输出目录地址
 */
function transformDirSync (dir, targetDir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const source = path.join(dir, file);
    const target = path.join(targetDir, file);
    const extname = path.extname(file)
    if (extname === '.js' || extname === '.jsx' || extname === 'tsx') {
      return transformFileSync(source, target);
    }
    if (extname === '.less') {
      var readStream = fs.createReadStream(source);
      var writeStream = fs.createWriteStream(target);
      return readStream.pipe(writeStream);
    }
    if (fs.lstatSync(source).isDirectory()) {
      return transformDirSync(source, target);
    }
  });
}

transformDirSync(sourceDir, esDir);
