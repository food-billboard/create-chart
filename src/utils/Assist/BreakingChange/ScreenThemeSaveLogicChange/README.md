
# 大屏主题色配置更改  

## 2023-12-26  

## 1.22  

`1.22`前的大屏自定义主题只保存了一个，现在为了支持能在`url`上自定义主题，所以增加了自定义主题的保存位置，方便选择和设置。  
并且所有自定义主题都需要给定一个唯一的**主题名称**。  
之前为自定义主题的会给一个默认的名称：`DEFAULT_CUSTOM_THEME_NAME`。   
`url`设置主题只需要使用刚刚设置的主题名称即可，比如`http://www.xxx.com?theme=DEFAULT_CUSTOM_THEME_NAME`    

新数据格式为：  
```ts
  type TScreenTheme = {
    // 使用的主题的名称
    value: string;
    // 自定义主题的保存
    // label为名称，value为实际的主题颜色数据
    color: {
      value: string[],
      label: string 
    }[]
  }
```