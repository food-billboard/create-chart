
## 提醒自己  
此组件`./Common/Component`为所有渲染组件的继承组件  
其中有些方法依赖于`params`属性，需要通过`./Common/FetchFragment`组件的`ref`来获取，因为`params`值多变，通过这个方法来减少渲染  
`./Common/FetchFragment`设置在每一个渲染组件内部，从中获取`params`  