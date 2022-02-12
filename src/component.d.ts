// * 大屏的数据格式

declare namespace ComponentData {
  // 组件上级大类类型
  export type TComponentType = 'GROUP_COMPONENT' | 'COMPONENT';

  // 数据字段映射
  export type TComponentMapData = {
    field: string;
    map: string;
    description: string;
    id: string;
    type: 'number' | 'string';
  };

  // 组件数据过滤
  export type TComponentFilterConfig = {
    id: string;
    disabled: boolean;
  };

  // 数据配置
  export type TComponentApiDataConfig = {
    request: {
      url: string;
      method: 'POST' | 'GET';
      headers: string;
      body: string;
      frequency: {
        show: boolean;
        value: number;
      };
      type: 'api' | 'static';
      value: any[] | object;
      valueType?: 'object' | 'array';
    };
    filter: {
      show: boolean;
      value: TComponentFilterConfig[];
      map: TComponentMapData[];
    };
  };

  // 组件类型
  export type TComponentSelfType =
    | 'GROUP_COMPONENT'
    | 'BAR_BASIC'
    | 'BAR_LINE'
    | 'LINE_BASIC'
    | 'LINE_WATERFALL';

  // 基础组件属性
  export type TBaseConfig = {
    style: {
      width: number;
      height: number;
      left: number;
      top: number;
      opacity: number;
      rotate: number;
      zIndex: number;
    };
    attr: {
      visible: boolean;
      lock: boolean;
      scaleX?: number;
      scaleY?: number;
    };
    interactive?: {
      base: {
        type: 'onClick';
        action: {
          show: boolean;
          type: 'link';
          value: string;
        };
      }[];
      // TODO
      // linkage
      // 具体细节有待参考
    };
    data?: TComponentApiDataConfig;
  };

  // 数据过滤
  export type TFilterConfig = {
    id: string;
    name: string;
    code: string;
    editable: boolean;
  };

  // 全局参数
  export type TParams = {
    originType: 'COMPONENT' | 'URL';
  };

  // 辅助线
  export type TGuideLineConfigItem = {
    type: 'vertical' | 'horizontal';
    style: {
      left: number;
      top: number;
      width?: number;
      height?: number;
    };
    lineStyle?: 'solid' | 'dashed';
    id: string;
  };
  export type TGuideLineConfig = {
    show: boolean;
    value: TGuideLineConfigItem[];
  };

  // 大屏配置
  export type TScreenData = {
    id?: string;
    description: string;
    name: string;
    components: TComponentData[];
    config: {
      style: {
        width: number;
        height: number;
      };
      attr: {
        poster: TBackgroundConfig;
        filter: TFilterConfig[];
        params: TParams[];
      };
      flag: {
        type: 'WEB' | 'H5';
      };
    };
  };

  // 带参数的组件配置
  export type TComponentDateWithPath<T extends object = {}> =
    TComponentData<T> & {
      path: string;
      components: TComponentDateWithPath<any>[];
    };

  // 组件配置
  export type TComponentData<T extends object = {}> = {
    // icon
    icon?: string;
    // 描述
    description: string;
    // 名称
    name: string;
    id: string;
    // 组件或组
    type: TComponentType;
    // 父组件id
    parent?: string;
    // 组件类型
    componentType: TComponentSelfType;
    components: TComponentData<any>[];
    config: TBaseConfig & {
      options: T;
    };
  };

  // 文字通用配置
  export type TFontConfig = {
    fontSize: number;
    fontWeight: number | string;
    fontFamily: string;
    color: TColorConfig;
  };

  // 边距配置
  export type TComponentMarginConfig = {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };

  // 渐变色配置
  export type TGradientColorConfig = {
    start: TColorConfig;
    end: TColorConfig;
    direction: number;
  };

  // 颜色配置
  export type TColorConfig = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  // 背景配置
  export type TBackgroundConfig = {
    type: 'image' | 'color';
    background?: string;
    color?: TColorConfig;
  };

  export type BaseComponentItem = {
    type: TComponentSelfType;
    title: string;
    icon: string;
    description?: string;
  };
}

declare namespace ComponentMethod {
  type SetComponentMethodParamsData = {
    value: SuperPartial<ComponentData.TComponentData>;
    id: string;
    path: string;
    action: 'add' | 'update' | 'delete' | 'move';
    index?: number | 'last' | 'first' | 'next' | 'prev'; // * 移动时用，这里暂时只存在同级移动
  };

  export type SetComponentMethod = (
    value: SetComponentMethodParamsData[] | SetComponentMethodParamsData,
  ) => void;
}
