const shelljs = require('shelljs')
const signale = require('signale')

const { Signale } = signale

const tasks = [
  'rm -rf lib/ es/ dist/ ts/',
  'tsc',
  // 'node ./build/build-module.js',
  'webpack --config build/webpack.build.js -p',
  'webpack --config build/webpack.build.dev.js -p',
  'node ./build/copyFiles.js'
  // 'webpack --config build/webpack.build.js -p'
]

tasks.forEach(task => {
  signale.start(task)

  const interactive = new Signale({ interactive: true })
  interactive.pending(task)
  const { code } = shelljs.exec(task)
  const success = code === 0
  if (success) {
    interactive.success(task)
  } else {
    interactive.error(task)
    process.exit(code)
  }
  return true
})
