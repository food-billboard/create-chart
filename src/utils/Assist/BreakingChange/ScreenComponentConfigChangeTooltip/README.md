
# 组件配置变动时展示的tooltip  

## 2023-06-09  

## 1.21  

不属于功能上的更新。  
对于之后版本中，组件的配置发生变化时，在组件右侧配置面板展示**配置更新变动提示**的`tooltip`。  
关于它的配置显示组件及文案在`/src/components/ScreenComponentConfigChangeTooltip`中  

## 操作流程  
1. 检查一下要增加`tooltip`的地方是不是已经配置过了，如果配置过了直接沿用之前的就行，多个`tooltip`可以分页（如果没有的话看`2`，否则跳过`2`）。  
2. 给需要增加`tooltip`的地方定义一个唯一的`id`，简单点的办法就是**配置的属性的文件路径+一个diy名字**  
3. 在`/src/components/ScreenComponentConfigChangeTooltip/Constants`下增加按照**版本**划分路径的下面增加文案。  

## attention  

    **(`へ´*)ノ**  

因为我比较懒，所以很多需要显示`tooltip`的地方如果是**第一次**添加的话都需要**手动**引入组件。  

  别忘记了！！！
  别忘记了！！！
  别忘记了！！！

  重要的事情说三遍。  