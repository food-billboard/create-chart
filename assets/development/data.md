# 数据格式  

## 基础配置  
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
      visible: boolean 
    },
    interactive: {
      base: {
        type: 'onClick'
        action: {
          show: boolean 
          type: 'link'
          value: string 
        } 
      }[]
      // TODO 
      linkage
      // 具体细节有待参考  
    },
    data: {
      request: {
        url: string 
        method: 'POST' | 'GET'
        headers: object  
        body: object 
        frequency: {
          show: boolean 
          value: number
        } 
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
          disabled: boolean 
        }[]
        map: {
          field: string 
          map: string 
        }[]
      }
    }
  }
```

## 组件类型  
```ts
  type TComponentType = 'GROUP_COMPONENT'
```

## 组件自身类型  
```ts
  type TComponentSelfType = 'GROUP_COMPONENT'
```

## 数据过滤  
```ts
  type TFilterConfig = {
    name: string 
    code: string 
    id: string 
  }
```

## 背景数据  
```ts
  type TPosterConfig = {
    type: 'image' | 'color'  
    value: string 
  }
```

## 整体格式  
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
        type: 'PC' | 'H5'
      }
    }

  }
```

## 组件格式  
```ts
  type TComponentData<T extends object = {}> = {
    description: string 
    name: string 
    id: string 
    type: TComponentType 
    componentType: TComponentSelfType
    components: TComponentData<any>[]
    config: TBaseConfig & {
      options: T
    }
    parent?: string 
  }
```

## 文字配置  
```ts
  type TFontConfig = {
    fontSize: number 
    fontWeight: number 
    fontFamily: string 
    color: string 
  }
```

## dva全局  
```ts
  type TGlobalData = {
    screenData: Exclude<TScreenData, "components"> 
    components: TScreenData["components"]
    guideLine: {
      show: boolean 
      value: {
        type: 'vertical' | 'horizontal'  
        position: [number, number]   
        id: string    
      }[]
    }
    select: string[]
    history: History // 使用react-undo-component的history 
    theme: string  // 主题 
    clipboard: TComponentData<any>
  }
```