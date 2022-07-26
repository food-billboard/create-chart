
# 组件条件配置大改动  

## 2022-07-25  

## 1.8  

之前的条件配置为`ComponentData.ComponentCondition[]`，为纯数组。  
因为需要新增一些相关的条件配置，所以现在将他更改为对象。新数据格式为：  
```ts
  type ConfitionType = {
    value: ComponentData.ComponentCondition[]
    initialState: ComponentData.ComponentConditionActionType
  }
```