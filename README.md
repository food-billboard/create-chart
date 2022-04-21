# 数据可视化大屏  

## 介绍  
这是一个基于[echarts](https://github.com/apache/echarts)数据可视化大屏项目📈。

### 当前版本(1.1)😈    

### changelog  
[1.1](https://github.com/food-billboard/create-chart/blob/main/public/docs/1.1.md)  
[1.0](https://github.com/food-billboard/create-chart/blob/main/public/docs/1.0.md)  

### 目录结构  
- `/list` 大屏列表
- `/login` 登录  
- `/register` 注册  
- `/forget` 忘记密码  
- `/designer` 设计器  
- `/preview` 预览  
- `/share` 分享  
### 功能 
其中的一些细节功能可以自行操作了解   
#### 图层  
左边列表中提供图层的功能设置组件的一些属性，包括置顶、置底、显示/隐藏、成组/取消成组、锁定/取消锁定、复制/粘贴、删除、重命名等。  
#### 数据  
目前数据只提供了`静态数据`和`api数据`  
并且提供了  
- 数据过滤器功能  
- 全局常量  
- 字符串变量（可以在api的headers和body中使用变量）  
#### 交互  
大部分组件包含了对应的事件用于响应数据的变化，并且同步到绑定了该组件变量的对应组件中，达到数据联动的效果。  