const { resolve, extname, relative, join } = require('path')
const babel = require('@babel/core')
const fs = require('fs-extra')
const chalk = require('chalk')

const cwd = resolve(__dirname, '../')
const esDir = resolve(__dirname, '../es')
const libDir = resolve(__dirname, '../lib')
const srcDir = resolve(__dirname, '../src')

const isTypeScriptFile = filename => {
  return /\.jsx?/.test(extname(filename))
}
const isSlient = process.argv.indexOf('--slient') > 0

function transformDir (dir) {
  const fileList = fs.readdirSync(dir)
  return fileList.reduce((result, name) => {
    const filename = join(dir, name)

    if (fs.statSync(filename).isDirectory()) {
      return result.concat(transformDir(filename))
    }

    if (isTypeScriptFile(filename)) {
      return result.concat(transFromTypeScriptFile(filename))
    }

    return result
  }, [])
}

function transFromTypeScriptFile (filename) {
  const sourceCode = fs.readFileSync(filename).toString()
  const result = babel.transformSync(sourceCode, {
    cwd,
    filename,
    extends: require('path').resolve(__dirname, './babel-react.config.js')
  })
  return {
    sourceCode,
    code: result.code,
    filename,
    relativePath: relative(srcDir, filename),
  }
}

function emitFile (item, outDir, override = false) {
  const sourceFilename = resolve(outDir, item.relativePath)
  const targetFilename = sourceFilename.replace(/\.jsx?$/, '.js')
  if (!isSlient) {
    console.log(`emit ${chalk.green(targetFilename)}`)
  }
  if (override) {
    fs.outputFileSync(sourceFilename, item.code)
    fs.renameSync(sourceFilename, targetFilename)
  } else {
    fs.outputFileSync(targetFilename, item.code)
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
  const prevTarget = process.env.BUILD_TARGET
  // set target
  process.env.BUILD_TARGET = 'es'
  fs.copySync(srcDir, esDir)
  const result = transformDir(srcDir).map(item => emitFile(item, esDir, true))

  // restore target
  process.env.BUILD_TARGET = prevTarget
  return result
}

/**
 * JSX转为JS，输出到lib目录，babel配置被cache了，与输出到es目录的一致
 * @return {(*|{targetFilename: string})[]}
 */
function buildLib () {
  const prevTarget = process.env.BUILD_TARGET

  // set target
  process.env.BUILD_TARGET = 'lib'
  const result = transformDir(srcDir).map(item => emitFile(item, libDir))

  // restore target
  process.env.BUILD_TARGET = prevTarget
  return result
}

buildLES()
