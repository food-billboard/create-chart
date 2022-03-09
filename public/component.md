
# 组件完成情况

## 开发上面的Tips 
- resize  
``` tsx 
  window.resize = function() {
    chart.resize() 
  }
```
- dispose   
``` tsx
  componentWillUnmount = () => {
    chart.dispose()
  }
```
- 深色主题  
```tsx 
  echarts.init(dom, 'dark')
```
- 高亮    
`emphasis`  

### 常用的配置项  

#### animation 动画
animation 动画是否开启
(animationEasing | animationEasingUpdate) 动画效果 
linear quadraticIn quadraticOut quadraticInOut 
cubicIn cubicOut cubicInOut quarticIn 
quarticInOut quinticIn quinticOut quinticInOut 
sinusoidalIn sinusoidalOut sinusoidalInOut 
exponentialIn exponentialOut exponentialInOut  
circularIn circularOut circularInOut elasticIn 
elasticOut elasticInOut  
backIn backOut backInOut  
bounceIn bounceOut bounceInOut 
animationDuration | animationDurationUpdate 动画时间

#### legend 图例  
type show left top right bottom orient itemGap  
textStyle.color textStyle.fontFamily textStyle.fontWeight textStyle.fontSize 
data.name 可选  

#### grid 网格  (可选)
show left right bottom top backgroundColor  

#### xAxis 横坐标  
show position  
axisLabel.show axisLabel.rotate axisLabel.margin  
axisLabel.color axisLabel.fontSize axisLabel.fontWeight axisLabel.fontFamily  
data.value 

#### yAxis 纵坐标  
show position  
axisLabel.show axisLabel.rotate axisLabel.margin  
axisLabel.color axisLabel.fontSize axisLabel.fontWeight axisLabel.fontFamily  
data.value 

#### tooltip 提示框  
show  
formatter 这个属性可以写一个组件专门可以定制  
backgroundColor 
textStyle.color textStyle.fontFamily textStyle.fontWeight textStyle.fontSize 

#### series 系列  
##### line 
smooth 
label.show label.position label.rotate  
label.color label.fontFamily label.fontWeight label.fontSize  
itemStyle.color itemStyle.decal.symbol itemStyle.decal.symbolSize  
lineStyle.color lineStyle.width lineStyle.type
areaStyle.color  
data.name data.value  

##### bar 
showBackground backgroundStyle.color  
label.show label.position label.rotate  
label.color label.fontFamily label.fontWeight label.fontSize  
itemStyle.color 
barGap barWidth  
data.name data.value 

##### pie 
label.show label.position label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
labelLine.show labelLine.length labelLine.length2 labelLine.smooth  
labelLine.lineStyle.width labelLine.lineStyle.type  
itemStyle.opacity itemStyle.color 
center
radius 基础的话就只能设置外面  
data.name data.value data.itemStyle.color  

##### scatter 
symbol symbolSize  
itemStyle.color itemStyle.borderColor itemStyle.borderWidth itemStyle.borderType      
data.name data.value  

##### radar 
symbol symbolSize  
label.show label.position label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
data.name data.value  
data.itemStyle.color  
data.lineStyle.color data.lineStyle.width data.lineStyle.type  
data.areaStyle.color  

##### treemap 
left top right bottom  
nodeClick  
label.show label.position label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
data.value data.name data.color  

##### sunburst   
center radius  
label.show label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
nodeClick  
data.value data.name data.itemStyle  

##### boxplot  
boxWidth  
itemStyle.color itemStyle.borderWidth itemStyle.borderColor itemStyle.borderType  
data.name data.value 

##### candlestick  
barWidth data.name data.value data.itemStyle.color data.itemStyle.color0   

##### sankey  
left right top bottom  nodeWidth nodeGap nodeAlign orient draggable  
label.show label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
data.name data.value data.itemStyle.color 

##### funnel  
left top right bottom  
orient gap  
label.show label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
data.name data.value data.itemStyle.color  

##### gauge  
center radius startAngle endAngle clockwise  
min max splitNumber  
axisLine.show axisLine.lineStyle.color axisLine.lineStyle.width  
progress.show progress.width progress.color  
splitLine.show splitLine.length  splitLine.lineStyle.color splitLine.lineStyle.width  
axisTick.show axisTick.splitNumber axisTick.length axisTick.lineStyle.color axisTick.lineStyle.width axisTick.lineStyle.type   
axisLabel.show axisLabel.distance axisLabel.color axisLabel.fontSize axisLabel.fontFamily axisLabel.fontWeight  
pointer.show pointer.length pointer.width pointer.itemStyle.color  
title.show title.color title.fontSize title.fontWeight title.fontFamily title.offsetCenter  
detail.show detail.color detail.fontWeight detail.fontSize detail.fontFamily  
data.name data.value  

##### pictorialBar  
label.show label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
data.name data.value data.symbol data.symbolRotate  

#### wordCloud
**npm install echarts-wordcloud**

|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| shape | 轮廓类型 | cardioid \| circle \| diamond\| square\| triangle-forward \| triangle \| pentagon \| star | - |
| keepAspect | 保持图形的1:1宽高比 | boolean | - |
| maskImage | 遮罩图片 | string | - |
| left | 左 | string | center |
| right | 右 | string | null |
| bottom | 下 | string | null |
| top | 上 | string | center |
| width | 宽 | string | 70% |
| height | 高 | string | 80% |
| sizeRange | 文字大小范围 | [ number, number ] | [12, 60] |
| rotationRange | 文字旋转范围 | [ number, number ] | [-90, 90] |
| rotationStep | 文字旋转step | number | 45 |
| gridSize | 词间距 | number | 8 |
| drawOutOfBound | 允许词超出容器 | boolean | false |
| layoutAnimation | 动画 | boolean | true |
| textStyle.fontWeight | 文字粗细 | string | - |
| textStyle.fontFamily | 文字字体 | string | - |
| textStyle.color | 颜色 | function | - |
| data.name | 名称 | string | - |
| data.value | 值 | number | - |

**文字颜色的函数**  
```js
function color() {
  // Random color
  return 'rgb(' + [
    Math.round(Math.random() * 160),
    Math.round(Math.random() * 160),
    Math.round(Math.random() * 160)
  ].join(',') + ')';
}
```
**高亮的样式**
```js
  {
    emphasis: {
      focus: 'self',
      textStyle: {
        textShadowBlur: 10,
        textShadowColor: '#333'
      }
    }
  }
```

### 特殊组件的配置项  

#### radar 雷达图
center radius startAngle  
axisName.show axisName.formatter  
axisName.color axisName.fontWeight axisName.fontSize axisName.fontFamily  
nameGap splitNumber shape  
axisLine.show axisLine.symbol axisLine.symbolSize axisLine.lineStyle.color axisLine.lineStyle.width axisLine.lineStyle.type  
axisTick.show axisTick.length axisTick.lineStyle.color axisTick.lineStyle.width axisTick.lineStyle.type  
axisLabel.show axisLabel.formatter axisLabel.color axisLabel.fontSize axisLabel.fontFamily axisLabel.fontWeight  
splitLine.show splitLine.lineStyle.color splitLine.lineStyle.width splitLine.lineStyle.type  
splitArea.show splitArea.areaStyle.color  
indicator.name indicator.max  

#### calendar 日历图
left top right bottom range cellSize orient   
splitLine.show splitLine.lineStyle.color splitLine.lineStyle.width splitLine.lineStyle.type  
itemStyle.color  
dayLabel.show dayLabel.margin dayLabel.position dayLabel.firstDay dayLabel.color dayLabel.fontSize dayLabel.fontWeight dayLabel.fontFamily 
monthLabel.show monthLabel.margin monthLabel.position monthLabel.color monthLabel.fontSize monthLabel.fontWeight monthLabel.fontFamily  
yearLabel.show yearLabel.margin yearLabel.position yearLabel.color yearLabel.fontSize yearLabel.fontWeight yearLabel.fontFamily

### 非图表组件的配置项

#### 标题  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| textStyle.color | 文字颜色 | string | - |
| textStyle.fontSize | 文字大小 | number | - |
| textStyle.fontWeight | 文字粗细 | number \| string | - |
| textStyle.fontFamily | 文字字体 | string | - |
| textStyle.align | 对齐方式 | string | - |
| textStyle.orient | 排列方式 | string | - |
| textStyle.fontStyle | 文字特效 | string | - |

#### 时间  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| textStyle.color | 文字颜色 | string | - |
| textStyle.fontSize | 文字大小 | number | - |
| textStyle.fontWeight | 文字粗细 | number \| string | - |
| textStyle.fontFamily | 文字字体 | string | - |
| textStyle.formatter | 格式化 | string | - |
| icon.show | 是否显示图标 | boolean | - |
| icon.color | 图标颜色 | string | - |
| icon.size | 图标大小 | number | - |
| icon.margin | 图标边距 | number | - |

#### 数字翻牌器  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| textStyle.color | 文字颜色 | string | - |
| textStyle.fontSize | 文字大小 | number | - |
| textStyle.fontWeight | 文字粗细 | number \| string | - |
| textStyle.fontFamily | 文字字体 | string | - |
| addonBefore.show | 是否前缀 | boolean | - |
| addonBefore.content | 前缀内容，支持变量 | boolean | - |
| addonBefore.color | 前缀文字颜色 | string | - |
| addonBefore.fontSize | 前缀文字大小 | number | - |
| addonBefore.fontWeight | 前缀文字粗细 | number \| string | - |
| addonBefore.fontFamily | 前缀文字字体 | string | - |
| addonAfter.show | 是否前缀 | boolean | - |
| addonAfter.content | 前缀内容，支持变量 | boolean | - |
| addonAfter.color | 前缀文字颜色 | string | - |
| addonAfter.fontSize | 前缀文字大小 | number | - |
| addonAfter.fontWeight | 前缀文字粗细 | number \| string | - |
| addonAfter.fontFamily | 前缀文字字体 | string | - |
| thousands.show | 千分位是否显示 | boolean | - |
| thousands.content | 千分位内容,支持变量 | string | - |
| round.show | 是否四舍五入 | boolean | - |
| round.length | 四舍五入保留小数位数 | number | - |

#### 图片  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| type | 图片类型（图片或颜色） | string | - |
| content | 内容 | string \| object | - |

#### 轮播图 
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| speed | 轮播速度 | number | - |
| dot.show | 是否显示 | string | - |
| dot.position | 位置 | string | - |
| easing | 动画 | string | - |


#### 视频  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| empty.show | 空态内容显示 | boolean | - |
| empty.type | 空态内容类型 | string | - |
| empty.content | 空态内容 | string \| object | - |
| empty.textStyle.color | 文字颜色 | string | - |
| empty.textStyle.fontWeight | 文字粗细 | string | - |
| empty.textStyle.fontSize | 文字大小 | string | - |
| empty.textStyle.fontFamily | 文字字体 | string | - |
| autoPlay | 是否自动播放 | boolean | - |
| loopPlay | 是否循环播放 | boolean | - |
| controls | 控制条 | boolean | - |
| muted.show | 是否静音 | boolean | - |
| muted.value | 音量大小 | number | - |

#### tab  
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| base.textStyle.color | 基础文字颜色 | string | - |
| base.textStyle.fontWeight | 基础文字粗细 | string | - |
| base.textStyle.fontSize | 基础文字大小 | string | - |
| base.textStyle.fontFamily | 基础文字字体 | string | - |
| base.backgroundColor | 基础背景颜色 | string | - |
| base.borderColor | 基础边框颜色 | string | - |
| base.borderWidth | 基础边框宽度 | string | - |
| active.textStyle.color | 当前文字颜色 | string | - |
| active.textStyle.fontWeight | 当前文字粗细 | string | - |
| active.textStyle.fontSize | 当前文字大小 | string | - |
| active.textStyle.fontFamily | 当前文字字体 | string | - |
| active.backgroundColor | 当前背景颜色 | string | - |
| active.borderColor | 当前边框颜色 | string | - |
| active.borderWidth | 当前边框宽度 | string | - |
#### select 
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| base.textStyle.color | 基础文字颜色 | string | - |
| base.textStyle.fontWeight | 基础文字粗细 | string | - |
| base.textStyle.fontSize | 基础文字大小 | string | - |
| base.textStyle.fontFamily | 基础文字字体 | string | - |
| base.borderColor | 基础边框颜色 | string | - |
| base.borderWidth | 基础边框宽度 | string | - |
| active.textStyle.color | 当前文字颜色 | string | - |
| active.textStyle.fontWeight | 当前文字粗细 | string | - |
| active.textStyle.fontSize | 当前文字大小 | string | - |
| active.textStyle.fontFamily | 当前文字字体 | string | - |
| active.borderColor | 当前边框颜色 | string | - |
| active.borderWidth | 当前边框宽度 | string | - |

#### iframe  
暂时想不到啥属性

#### 列表   
|  属性   | 描述  | 类型  | 其他  |
|  ----  | ----  | ----  | ----  |
| global.animation.show | 是否轮播 | boolean | - |
| global.animation.type | 轮播类型，逐条滚动，整页滚动 | string | - |
| global.animation.internal | 轮播时间 | string | - |
| global.animation.less | 数据低于显示行数时是否轮播 | boolean | - |
| header.show | 表头是否显示 | boolean | - |
| header.height | 行高% | number | - |
| header.backgroundColor | 背景颜色 | string | - |
| header.textStyle.fontWeight | 文字粗细 | string | - |
| header.textStyle.fontSize | 文字大小 | string | - |
| header.textStyle.fontFamily | 文字字体 | string | - |
| header.textStyle.color | 文字颜色 | string | - |
| header.textStyle.align | 对齐方式 | string | - |
| columns.margin | 行间距 | number | - |
| columns.even.backgroundColor | 奇数行背景颜色 | string | - |
| columns.odd.backgroundColor | 偶数行背景颜色 | string | - |
| index.show | 是否显示序号列 | boolean | - |
| index.backgroundColor | 序号背景颜色 | string | - |
| index.width | 列宽 | number | - |
| index.radius | 圆角 | number | - |
| index.textStyle.fontWeight | 文字粗细 | string | - |
| index.textStyle.fontSize | 文字大小 | string | - |
| index.textStyle.fontFamily | 文字字体 | string | - |
| index.textStyle.color | 文字颜色 | string | - |
| columns.data.key | 列key | string | - |
| columns.data.name | 列名称 | boolean | - |
| columns.data.width | 列宽 | number | - |
| columns.data.type | 内容类型(图片或文本) | string | - |
| columns.data.textStyle.fontWeight | 文字粗细 | string | - |
| columns.data.textStyle.fontSize | 文字大小 | string | - |
| columns.data.textStyle.fontFamily | 文字字体 | string | - |
| columns.data.textStyle.color | 文字颜色 | string | - |
| columns.data.textStyle.align | 对齐方式 | string | - |

#### 词云  
暂时没有啥其他配置了

### 需要新增的公共组件  
#### 线条样式选择  
#### 文字样式  
#### left、top、right、bottom位置选择  
#### 系列颜色选择，自适应开关和颜色选择组合  
#### label 通用配置组件  
#### 一些小拐点的图形类型的选择器  
#### 排列方式选择（水平或者垂直）
#### 文字特效组件 

## 1.0

### 图表

#### 折线图  
- 基础折线图  

#### 柱形图  
- 基础柱形图  

#### 饼图  
- 基础饼图  

#### 散点图  
- 基础散点图  

#### K线图  
- 基础K线图  

#### 雷达图  
- 基础雷达图  

#### 盒须图  
- 基础盒须图  

#### 矩形树图  
- 基础矩形树图   

#### 旭日图
- 基础旭日图  

#### 平行坐标系  
- 基础平行坐标系  

#### 桑葚图  
- 基础桑葚图  

#### 漏斗图  
- 基础漏斗图  

#### 仪表盘  
- 基础仪表盘  

#### 日历图  
- 基础日历图  

#### 象形柱图  

### 文字  

#### 标题  

#### 时间  

#### 数字翻牌器  

### 媒体  

#### 图片  

#### 轮播图 
#### 视频  

### 联动  

#### tab  
#### select 

### 其他  

#### iframe  

#### 列表   

#### 词云  