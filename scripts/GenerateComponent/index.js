#!/usr/bin/env node
const program = require('commander')
const fs = require('fs-extra')
const path = require('path')
const { startCase } = require('lodash')
const replaceAll = require('string.prototype.replaceall')

async function isTypeExists(type) {
  return fs.readFileSync(path.join(__dirname, '../../src/component-type.d.ts'), 'utf-8').includes(type)
}

// program
// .version('0.1.0')
// .command('create <name>')
// .description('create a new project')
// .action(name => { 
//     create(name)
// })

// program.parse()

// const { parent: parentType, sub: subParentType, type, title, description, key } = options 

const parentType = 'Font'
const subParentType = 'Font'
const type = 'NEW_TYPE'
const title = '测试组件名称' 
const description = '测试组件描述'
const key = 'NewType' 


// 组件当中ts类型的名字
const ComponentKey = startCase(key || type).split(' ').join('') 

fs.readFile(path.join(__dirname, './TemplateComponentImport.txt'), 'utf-8')
// 生成组件列表的引入文件
.then(templateData => {
  return fs.writeFile(
    path.join(__dirname, `../../src/utils/constants/component/GenerateList/${ComponentKey}Component.ts`), 
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
// 生成组件文件夹
.then(() => {
  return fs.copy(path.join(__dirname, './TemplateComponentFolder'), path.join(__dirname, `./${ComponentKey}`))
})
// 替换组件文件夹中的内容
.then(() => {
  function replaceDir(filePath) {
    const isDir = fs.statSync(filePath).isDirectory()
    if(isDir) {
      return fs.readdir(filePath)
      .then(data => {
        return data.map(replaceDir)
      })
    }
    return fs.readFile(filePath, 'utf-8')
    .then(data => {
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
  const componentParentPath = path.join(__dirname, `../../src/components/ChartComponents/${parentType}`)
  const componentSubPath = path.join(componentParentPath, `./${subParentType}`)
  const componentPat = path.join(componentSubPath, `./${ComponentKey}`)
  if(!fs.existsSync(componentParentPath)) fs.mkdirSync(componentParentPath)
  if(!fs.existsSync(componentSubPath)) fs.mkdirSync(componentSubPath)
  if(fs.existsSync(componentPat)) {
    return Promise.reject('文件已经存在')
  }
  return fs.move(`./${ComponentKey}`, path.join())
})
// 添加组件map引入
.then(() => {
  const filePath = path.join(__dirname, '../../src/components/ChartComponents/index.ts')
  return fs.readFile(filePath, 'utf-8')
  .then(data => {
    return fs.writeFile(
      filePath, 
      data
      .replace('// component-map-import-prefix', `
        import ${ComponentKey} from './${parentType}/${subParentType}/${ComponentKey}';
        // component-map-import-prefix
      `)
      .replace('// component-map-insert-prefix', `
        COMPONENT_MAP.set(${ComponentKey}.type, ${ComponentKey});
        // component-map-insert-prefix
      `)
    )
  })
})