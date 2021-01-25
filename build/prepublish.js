const program = require('commander')
const shell = require('shelljs')
const inquirer = require('inquirer')
const package = require('../package.json')

const UpdateVersionTypeEnum = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major'
}
const updateVersionTypeOption = [
  { name: '补丁', value: UpdateVersionTypeEnum.PATCH, command: 'patch', key: 'p' },
  { name: '小版本（）', value: UpdateVersionTypeEnum.MINOR, command: 'minor', key: 'm' },
  { name: '大版本（不可兼容）', value: UpdateVersionTypeEnum.MAJOR, command: 'major', key: 'a' },
  { name: '升级测试版', value: null, command: '', key: 'e' }
]

const updateVersion = async (updateType = updateVersionTypeOption[0].patch, isAlpha) => {
  if (!updateType && !isAlpha) {
    const result = await inquirer.prompt([
      {
        name: 'updateType',
        type: 'list',
        message: '请选择你本次要升级的版本类型',
        choices: updateVersionTypeOption,
        pageSize: 2
      },
      {
        name: 'isAlpha',
        type: 'confirm',
        message: '是否是alpha测试版'
      }
    ])
    updateType = result.updateType
    isAlpha = result.isAlpha
    console.log(result)
    if (!result) {
      console.log('缺乏更新版本类型及是否为alpha标识')
      return false
    }
  }
  if (updateType) {
    const alphaPrefix = isAlpha ? 'pre' : ''
    const matchOption = updateVersionTypeOption.filter(item => item.value === updateType)
    if (matchOption.length === 0) {
      console.log('没有对应匹配的更新选项')
      return false
    }
    shell.exec(`yarn version --${alphaPrefix}${matchOption[0].command}`)
  } else {
    shell.exec('yarn version --prerelease')
  }
}

program
  .version(package.version)
  .usage('update publish version')
  .option('-uv --updateVersion <type> [isAlpha]', 'Add version')
  .option('-a --alpha', 'alpha版本', (args, isAlpha) => {
    console.log(args)
    console.log(isAlpha)
  })
  .parse(process.argv)
updateVersion(program.updateVersion, program.alpha)
// console.log(program.per)

// program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     console.log(source)
//     console.log(destination)
//     console.log('clone command called')
//   })
//   .parse(process.argv)
