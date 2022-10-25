#!/usr/bin/env node
const Inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { startCase } = require('lodash')
const replaceAll = require('string.prototype.replaceall')
const parentTypeMap = require('./parentType')
const subParentTypeMap = require('./subParent')

const divider = () => {
  console.log(chalk.blue('-------------------------------'))
}

async function isTypeExists(type) {
  return fs.readFileSync(path.join(__dirname, '../../src/component-type.d.ts'), 'utf-8').includes(type)
}

async function generate(data) {
  const { parent, sub, type:_type, title, description, key:_key } = data 

  const parentType = startCase(parent)
  const subParentType = startCase(sub === 'custom' ? data['c-sub'] : sub)
  const type = _type.toUpperCase()
  const key = startCase(_key || type.toLowerCase())

  // 组件当中ts类型的名字
  const ComponentKey = startCase(key || type).split(' ').join('') 
  const componentParentPath = path.join(__dirname, `../../src/components/ChartComponents/${parentType}`)
  const componentSubPath = path.join(componentParentPath, `./${subParentType}`)
  const componentPath = path.join(componentSubPath, `./${ComponentKey}`)

  // 移动组件文件夹的位置
  return new Promise((resolve, reject) => {
    if(!fs.existsSync(componentParentPath)) {
      return reject(`文件夹不存在: ${componentParentPath}`)
    }
    if(!fs.existsSync(componentSubPath)) {
      fs.mkdirSync(componentSubPath)
      console.log(chalk.green(`文件夹不存在并自动创建: ${componentSubPath}`))
      divider()
    }
    if(fs.existsSync(componentPath)) {
      reject(`文件已经存在: ${componentPath}`)
    }else {
      resolve()
    }
  })
  // 生成组件文件夹
  .then(() => {
    const originPath = path.join(__dirname, './TemplateComponentFolder')
    const newPath = path.join(__dirname, `./${ComponentKey}`)
    console.log(chalk.green(`复制组件文件夹: ${originPath} 到 ${newPath}`))
    divider()
    return fs.copy(path.join(__dirname, './TemplateComponentFolder'), path.join(__dirname, `./${ComponentKey}`))
  })
  // 替换组件文件夹中的内容
  .then(() => {
    function replaceDir(filePath) {
      const isDir = fs.statSync(filePath).isDirectory()
      if(isDir) {
        return fs.readdir(filePath)
        .then(data => {
          return data.map((item) => {
            const realFilePath = path.join(filePath, item)
            return replaceDir(realFilePath)
          })
        })
      }
      return fs.readFile(filePath, 'utf-8')
      .then(data => {
        console.log(chalk.green(`替换组件文件: ${filePath}中的变量内容`))
        divider()
        return fs.writeFile(
          filePath, 
          replaceAll(data, '{{COMPONENT_NAME}}', ComponentKey).replace('{{COMPONENT_TYPE}}', type)
        )
      })
    }
    return replaceDir(path.join(__dirname, `./${ComponentKey}`))
  })
  // 移动组件文件夹的位置
  .then(() => {
    const currentPath = path.join(__dirname, `./${ComponentKey}`)
    console.log(chalk.green(`移动文件夹: ${currentPath} 到 ${componentPath}`))
    divider()
    return fs.move(currentPath, componentPath)
  })
  // 读取组件列表的引入文件
  .then(() => {
    return fs.readFile(path.join(__dirname, './TemplateComponentImport.txt'), 'utf-8')
  })
  // 生成组件列表的引入文件
  .then(templateData => {
    const filePath = path.join(__dirname, `../../src/utils/constants/component/GenerateList/${ComponentKey}Component.ts`)
    console.log(chalk.green(`创建组件列表引入文件：${filePath}`))
    divider()
    return fs.writeFile(
      filePath, 
      templateData
      .replace('component-parent-type-prefix', parentType)
      .replace('component-sub-parent-type-prefix', subParentType)
      .replace('component-type-prefix', type)
      .replace('component-title-prefix', title)
      .replace('component-description-prefix', description)
    )
  })
  // 添加组件列表的引入
  .then(() => {
    const filePath = path.join(__dirname, `../../src/utils/constants/component/GenerateList/index.tsx`)
    console.log(chalk.green(`添加组件列表引入文件: ${filePath}的引入`))
    divider()
    return fs.readFile(filePath, 'utf-8')
    .then(data => {
      return fs.writeFile(
        filePath, 
        data
        .replace('// component-generate-import', 
`import ${ComponentKey}Component from './${ComponentKey}Component'
// component-generate-import
`
        )
        .replace('// component-generate-insert', 
`GENERATE_COMPONENT_LIST.push(${ComponentKey}Component)
// component-generate-insert
`
        )
      )
    })
  })
  // 修改组件类型map文件
  .then(() => {
    const filePath = path.join(__dirname, '../../src/component-type.d.ts')
    console.log(chalk.green(`修改组件类型Map文件: ${filePath}`))
    divider()
    return fs.readFile(filePath, 'utf-8')
    .then(data => {
      return fs.writeFile(
        filePath, 
        data
        .replace(';', '')
        .replace(
          '// component-type-insert-prefix',
`  | '${type}';
// component-type-insert-prefix
`
        )
      )
    })
  })
  // 添加组件map引入
  .then(() => {
    const filePath = path.join(__dirname, '../../src/components/ChartComponents/index.ts')
    console.log(chalk.green(`添加组件到总引入入口Map文件: ${filePath}`))
    divider()
    return fs.readFile(filePath, 'utf-8')
    .then(data => {
      return fs.writeFile(
        filePath, 
        data
        .replace('// component-map-import-prefix', 
`import ${ComponentKey} from './${parentType}/${subParentType}/${ComponentKey}';
// component-map-import-prefix
`
        )
        .replace('// component-map-insert-prefix', 
`COMPONENT_MAP.set(${ComponentKey}.type, ${ComponentKey});
// component-map-insert-prefix
`
        )
      )
    })
  })
  .then(() => {
    console.log(chalk.greenBright(`组件创建成功，目录：${componentPath}`))
  })

}

const PROMOPT = [
  {
    name: 'parent',
    value: 'parent',
    message: "设置组件的顶级类型",
    pageSize: 10,
    type: "list",
    choices: parentTypeMap
  },
  {
    name: 'sub',
    value: 'sub',
    message: "设置组件的二级类型",
    pageSize: 10, 
    type: "list",
    choices: (answers) => {
      const source = subParentTypeMap.filter(item => {
        return item.parent === answers.parent 
      })
      return [
        ...source,
        {
          name: '自定义',
          value: 'custome'
        }
      ]
    }
  },
  {
    name: 'c-sub',
    value: 'c-sub',
    message: "设置组件的二级类型，英文，首字母大写，比如（Font）",
    when: answers => {
      return answers.sub === 'custom'
    },
    type: "input",
    validate: (value) => {
      if(!value) return '请填写二级类型'
      return true 
    }
  },
  {
    name: 'type',
    value: 'type',
    message: "设置组件的类型，唯一，英文大写，比如（BAR_BASIC）",
    type: "input",
    validate: (value) => {
      if(!value) return '请填写组件类型'
      return true 
    }
  },
  {
    name: 'title',
    value: 'title',
    message: '组件名称',
    type: "input",
    validate: (value) => {
      if(!value) return '请填写组件名称'
      return true 
    }
  },
  {
    name: 'description',
    value: 'description',
    message: '组件描述',
    type: "input",
  },
  {
    name: 'key',
    value: 'key',
    message: '组件的文件名称，英文，驼峰，比如（BarBasic）',
    type: "input",
  }
]

Inquirer
.prompt(PROMOPT)
.then(generate)
.catch(err => {
  console.log(chalk.red(err))
})

