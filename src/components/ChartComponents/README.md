
## 提醒自己  
此组件`./Common/Component`为所有渲染组件的继承组件  
其中有些方法依赖于`params`属性，需要通过`./Common/FetchFragment`组件的`ref`来获取，因为`params`值多变，通过这个方法来减少渲染  
`./Common/FetchFragment`设置在每一个渲染组件内部，从中获取`params`  

## 组件列表
- `./Common/AngleSelect` 设置旋转角度  
- `./Common/AxisConfig` 基础的x轴和y轴的配置  
- `./Common/BaseConfig`  组件的基础信息的配置  
- `./Common/Collapse` 右边配置的折叠列表  
- `./Common/Component` 渲染组件的公共方法和hooks  
- `./Common/ComponentOptionConfig` 右边配置的在基础信息下方的垂直tab  
- `./Common/ConfigWrapper` 右边配置整体的tab容器  
- `./Common/Constants` 组件通用的一些基础配置信息  
- `./Common/DataConfig` 组件的数据配置  
- `./Common/FetchFragment` 组件的数据获取组件  
- `./Common/FontConfig` 组件通用的文字样式配置  
- `./Common/FormatterSelect` 组件的文字formatter设置  
- `./Common/Icon` iconfont组件  
- `./Common/IconRadio` icon形式的单选  
- `./Common/InterActiveConfig` 交互相关的配置  
- `./Common/LabelPositionConfig` label位置的配置  
- `./Common/LegendConfig` legend的通用配置  
- `./Common/LineStyleSelect` 边框样式的选择  
- `./Common/MapTable` 字段映射的table组件，就是无普通table的鼠标样式等的table  
- `./Common/MarginConfig` 组件上下左右边距设置  
- `./Common/NumberPositionConfig` 组件上下左右位置的设置(数字)  
- `./Common/Opacity` 组件透明度的设置  
- `./Common/OrientSelect` 组件排列方式设置  
- `./Common/PositionConfig` 组件位置的设置(上下左右等关键字)  
- `./Common/SeriesLabelConfig` 组件series的label通用配置  
- `./Common/SimpleHueSelect` 组件简单的色调设置，只包含颜色  
- `./Common/Structure` 右边配置的一些通用组件  
- `./Common/Switch` 普通的switch组件，加了些样式  
- `./Common/SymbolSelect` 图表组件图案样式的选择  
- `./Common/TooltipCommon` tooltip组件的通用配置  