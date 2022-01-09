
# h5大屏可视化设计

## 框架使用  
- umi（外部框架）  
- echarts（数据可视化图表）  
- antd+antd pro（ui框架）  
- dva（状态管理）  

## 页面  
### 编辑页  
#### 头部菜单栏  
- 右边操作：保存、预览
- 左侧：展开收起图层，展开收起组件列表，主题切换    
#### 左侧列表页图表分类及图层    
- 列表内容，具体分类见下方组件    
- 可进行折叠  
- 可进行搜索  
- 点击图标可以展示中间的图层  
- 点击图层可进行选择，进行撇量删除，拖动可进行排序（如果多个做不了排序就单个），可对其进行显示隐藏操作，以及右键弹出框显示置顶及置底        
#### 中间操作画布  
- 功能  
  1. 鼠标拖拽全选（再说）  
  2. 鼠标点击拖动排序  
  3. 鼠标点击图标设置大小  
  4. 点击选中对应图表显示对应配置  
  5. cv复制粘贴  
  6. 取消右键弹出菜单  
  7. 底部进行画布的缩放  
  8. 按住空格同时使用鼠标可以进行画布拖动（在说）
#### 右侧配置  
1. 全局配置  
name、poster  
- 全局操作按钮：回到背景图层，
- 组件操作按钮：删除、切换、
2. 基础配置  
width、height、left、top、rotate、opacity  
3. 数据配置  
  - 数据类型  
  静态数据、api数据  
  - 请求频率  
  - 数据过滤  
  设置过滤函数，可以新增，将保存在全局，可在组件之间复用  
  - 字段映射  
  设置后台数据字段的映射  
4. 事件配置  
再说  


### 预览页  
使用`winbox`弹窗的形式展示对应的页面  

### 列表页  
`table`页面，做大屏展示  
1. 列表形式  
2. card形式  
- 大屏名称、id、截图、创建时间、更新时间  
- 操作：复制、分享、删除、编辑、预览、新增  

### 分享页  
- 类预览页，但是需要进行密码输入操作  

## 数据格式  
- 基础配置  
```ts
  type TBaseConfig = {
    style: {
      width: number 
      height: number 
      left: number 
      top: number 
      opacity: number 
      rotate: number 
      zIndex: number // 这个可以暂时不设置，因为没有重叠的情况
    }
    attr: {
      // TODO  
    },
    event: {
      // TODO
    },
    data: {
      request: {
        url: string 
        method: 'POST' | 'GET'
        headers: object  
        body: object 
        frequency: number 
        type: 'api' | 'static'
        value: any[] | object  
      }
      filter: {
        show: boolean 
        fields: {
          name: string 
          description: string 
        }[]
        value: {
          name: string 
        }[]
        map: {
          field: string 
          map: string 
        }[]
      }
    }
  }
```
- 组件类型  
```ts
  type TComponentType = ''
```
- 组件自身类型  
```ts
  type TComponentSelfType = ''
```
- 数据过滤  
```ts
  type TFilterConfig = {
    name: string 
    code: string 
  }
```
- 背景数据  
```ts
  type TPosterConfig = {
    type: 'image' | 'color'  
    value: string 
  }
```
- 整体格式  
```ts
  type TScreenData = {

    id?: string 
    description: string 
    name: string 
    components: TComponentData[]
    config: {
      style: {
        width: number 
        height: number 
      }
      attr: {
        name: string 
        poster: TPosterConfig 
        filter: TFilterConfig[]
      },
      flag: {
        type: 'WEB' | 'H5'
      }
    }

  }
```
- 组件格式  
```ts
  type TComponentData<T extends object = {}> = {
    description: string 
    name: string 
    id: string 
    type: TComponentType  
    componentType: TComponentSelfType
    config: TBaseConfig & {
      options: T
    }
  }
```
- 文字配置  
```ts
  type TFontConfig = {
    fontSize: number 
    fontWeight: number 
    fontFamily: string 
    color: string 
  }
```

## 组件  
- 颜色选择组件  
- 文字样式配置  
- 背景设置组件  
- 定位配置  
- 配置展开收起列表配置  
- 代码编辑器组件  
- 进度条  
- loading  
- tooltip图标提示  
- 配色  

## 图表  
### 文字
- 标题  
- 时间  
- 翻牌器  
### 柱形图  
- 基础柱形图  
- 折现柱形图  
- 堆叠柱形图  
### 折线图  
- 基础折线图  
- 面积图  
- 瀑布图  
- 堆叠面积图  
### 雷达图
- 基础雷达图    
### 饼图  
- 基础饼图  
- 百分比图  
- 玫瑰图  
- 环图  
### 仪表盘  
- 基础仪表盘  
### 散点图  
- 基础散点图  
### 媒体 
- 图片  
- 视频  
- 轮播图  
### 地图  
- 地图组件  
### 其他  
- 辅助线框 
- 辅助标题线框 
- iframe  
- 列表   
- 词云  
- 排行榜  
- 天气**这个再说**  
- 热力图 
### 联动  
- tab  
- select 

## 思考的问题  
- 尝试使用`json`来表示右边配置  
- 尝试在全局设置全局数据配置，可供其下所有组件使用  
- 尝试使用暗黑主题切换   
- 尝试设置标尺线吸附  
- 尝试用户自定义组件**这个再说**  
- 类似`tab`的切换效果**这个后面再说**  
- 部分文字前缀等可使用antd的对应图标等**这个再说**  
- 画布中存在多个鼠标、键盘操作可能存在冲突，需要注意  
- 设置单独的配置文件夹放置可进行定制化修改的配置，比如`接口`，配色    

## 可能使用到的库  
- lodash  
- react-undo-component（撤销、重做）  
- chunk-upload-component（文件上传）  
- chunk-file-load（文件上传）  
- react-beautiful-dnd（拖拽）    
- react-rnd（拖拽缩放）  
- re-resizable（调整大小）  
- react-sortable-hoc（拖拽排序）  
- react-monaco-editor（代码编辑器）    
- html2canvas（截图）  
- react-color（颜色选择）  
- animate.css（动画）  
- RulersGuides.js（标尺clone下来自己改下）  
- countup.js（数字动画-翻牌器）  
- ahooks（hooks）  
- antd（ui）  
- antd pro（ui）    
- react-json-view（json预览）  
- react-responsive（响应式媒体查询）  
- nprogress（顶部进度条）  
- json5（JSON加强版）  
- react-syntax-highlighter（代码高亮显示）  
- react-google-maps | google-map-react | react-amap（地图，还没仔细看过，再说） 
- react-player（视频播放） 
- react-contextmenu（右键菜单）  
- react-split-pane （区域分隔）  
- react-fast-marquee（文字轮播）
- react-move | Ant Motion | react-spring（动画，暂时先不管）  
- axios（数据请求）  

