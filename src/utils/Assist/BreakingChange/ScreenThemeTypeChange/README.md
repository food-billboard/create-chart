
# 大屏主题色配置更改  

## 2022-10-13  

## 1.14  

之前的主题色仅为内置，且无法在新增大屏后修改，数据类型为`字符串`。  
先支持在任何时机进行修改，且支持自定义上传图片获取主题色。    
新数据格式为：  
```ts
  type TScreenTheme = {
    type: 'internal' | 'custom'
    value: string
    // 只有非内置的需要保存颜色数组
    color?: string[] 
  }
```