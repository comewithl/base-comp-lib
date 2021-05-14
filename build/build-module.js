const { resolve, extname, relative, join, dirname } = require('path');

const babel = require('@babel/core');
const fs = require('fs-extra');
const chalk = require('chalk');
const less = require('less');

const cwd = resolve(__dirname, '../');
const esDir = resolve(__dirname, '../es');
const srcDir = resolve(__dirname, '../src');

const transfromScriptExtRegx = /\.[j,t]sx?/
const transfromLessExtRegx = /\.less/

const isTypeScriptFile = (filename) => {
  return transfromScriptExtRegx.test(extname(filename));
};
const isLessFile = (filename) => {
  return transfromLessExtRegx.test(extname(filename));
};
const isSlient = process.argv.indexOf('--slient') > 0;

async function transformDir (dir) {
  const fileList = fs.readdirSync(dir);
  let resutlList = []
  for (let item of fileList) {
    const filename = join(dir, item);
    if (fs.statSync(filename).isDirectory()) {
      resutlList = resutlList.concat(await transformDir(filename));
    }
    if (isTypeScriptFile(filename)) {
      resutlList = resutlList.concat(transFromTypeScriptFile(filename));
    }

    if (isLessFile(filename)) {
      resutlList = resutlList.concat(await transformLessFile(filename));
    }
    
  }
  return resutlList
}
// TODO：对于tsx文件分析如果有less,sass拿到文件地址转化为css更改引入
function transFromTypeScriptFile (filename) {
  const sourceCode = fs.readFileSync(filename).toString();
  const result = babel.transformSync(sourceCode, {
    cwd,
    filename,
    extends: require('path').resolve(__dirname, './babel-react.config.js')
  });
  return {
    sourceCode,
    code: result.code,
    filename,
    relativePath: relative(srcDir, filename),
  }
}

async function transformLessFile (inputlessFilePath) {
  const sourceCode = fs.readFileSync(inputlessFilePath, 'utf8')
  const { css: resultCode } = await less.render(sourceCode, {
    paths: [dirname(inputlessFilePath)]
  })

  return {
    sourceCode,
    code: resultCode,
    filename: inputlessFilePath,
    relativePath: relative(srcDir, inputlessFilePath),
  }
}

function emitFile (item, outDir, override = false) {
  const sourceFilename = resolve(outDir, item.relativePath);
  // 文件后缀名修改为.css
  const targetFilename = sourceFilename.replace(transfromScriptExtRegx, '.js').replace(transfromLessExtRegx, '.css');
  if (!isSlient) {
    console.log(`emit ${chalk.green(targetFilename)}`);
  }
  if (override) {
    fs.outputFileSync(sourceFilename, item.code);
    fs.renameSync(sourceFilename, targetFilename);
  } else {
    fs.outputFileSync(targetFilename, item.code);
  }
  return {
    ...item,
    targetFilename,
  }
}

/**
 * 转为es5语法，package.json中module引用这个包下面的文件，webpack会默认读取
 * @return {(*|{targetFilename: string})[]}
 */
function buildLES () {
  const prevTarget = process.env.BUILD_TARGET;
  // set target
  process.env.BUILD_TARGET = 'es';
  fs.copySync(srcDir, esDir, {
    filter: function (src) {
      // 不移动的文件格式mdx
      if (src.indexOf('.mdx') >= 0) {
        return true
      }
      return false
    }
  });
  transformDir(srcDir).then(resultList => {
    resultList.map(item => emitFile(item, esDir, true));
    process.env.BUILD_TARGET = prevTarget;
  }).catch(e => {
    console.log(e)
  })
}

buildLES()
