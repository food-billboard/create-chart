
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

#### legend 图例  
type show left top right bottom orient itemGap  
textStyle.color textStyle.fontFamily textStyle.fontWeight textStyle.fontSize 
data.name 可选  

#### grid 网格  (可选)
show left right bottom top  backgroundColor  

#### xAxis 横坐标  
show position  
nameTextStyle.color nameTextStyle.fontFamily nameTextStyle.fontWeight nameTextStyle.fontSize   
nameRotate boundaryGap  
axisLabel.show axisLabel.rotate axisLabel.margin  
axisLabel.color axisLabel.fontSize axisLabel.fontWeight axisLabel.fontFamily  
data.value 

#### yAxis 纵坐标  
show position  
nameTextStyle.color nameTextStyle.fontFamily nameTextStyle.fontWeight nameTextStyle.fontSize   
nameRotate boundaryGap  
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
label.show label.position label.rotate  
label.color label.fontFamily label.fontWeight label.fontSize  
itemStyle.color itemStyle.decal.symbol itemStyle.decal.symbolSize  
lineStyle.color lineStyle.width lineStyle.type lineStyle.opacity  
areaStyle.color  
data.name data.value  

##### bar 
showBackground backgroundStyle.color  
label.show label.position label.rotate  
label.color label.fontFamily label.fontWeight label.fontSize  
itemStyle.color itemStyle.decal.symbol itemStyle.decal.symbolSize  
barGap barWidth  
data.name data.value 

##### pie 
left top right bottom  
label.show label.position label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
labelLine.show labelLine.length labelLine.length2 labelLine.smooth  
labelLine.lineStyle.color labelLine.lineStyle.width labelLine.lineStyle.type  
itemStyle.opacity  
center 这个和上面的位置二选一  
radius 基础的话就只能设置外面  
data.name data.value data.itemStyle.color  

##### scatter 
symbol symbolSize  
label.show label.position label.formatter  
label.color label.fontFamily label.fontWeight label.fontSize  
itemStyle.color  
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

### 需要新增的公共组件  
#### 线条样式选择  
#### 文字样式  
#### left、top、right、bottom位置选择  
#### 系列颜色选择，自适应开关和颜色选择组合  
#### label 通用配置组件  
#### 一些小拐点的图形类型的选择器  

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
#### 象形柱图  