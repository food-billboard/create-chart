// * 大屏的数据格式

declare namespace ComponentData {
  // 大屏显示的类型
  export type ScreenType = 'edit' | 'preview';

  // 组件上级大类类型
  export type TComponentType = 'GROUP_COMPONENT' | 'COMPONENT';

  // 辅助线吸附
  export type GuideLineSticky = {
    show: boolean;
  };

  // 数据字段映射
  export type TComponentMapData = {
    field: string;
    map: string;
    description: string;
    id: string;
    type: 'number' | 'string' | 'number[]' | 'array[]' | 'string[]' | 'boolean';
  };

  // 组件数据过滤
  export type TComponentFilterConfig = {
    id: string;
    disabled: boolean;
  };

  // 数据请求配置
  export type TCommonRequestConfig = {
    url: string;
    method: 'POST' | 'GET';
    headers: string;
    body: string;
    serviceRequest: boolean;
    mock: {
      random: boolean;
      total: number;
      fields: {
        key: string;
        dataKind: string;
        id: string;
      }[];
    };
    frequency: {
      show: boolean;
      value: number;
    };
    type: 'api' | 'static' | 'mock';
    value: any[] | object;
    valueType?: 'object' | 'array';
  };

  // 数据配置
  export type TComponentApiDataConfig = {
    request: TCommonRequestConfig;
    filter: {
      show: boolean;
      value: TComponentFilterConfig[];
      map: TComponentMapData[];
    };
    disabled?: boolean;
  };

  // 组件基础交互配置字段
  export type TBaseInteractiveConfigField = {
    key: string;
    variable: string;
    // 是否需要默认值 false 表示不可编辑(仅不显示)
    _defaultValue_?: boolean;
    // 默认值 1.21
    defaultValue?: string;
    description: string;
    // TParams id
    mapId?: string;
  };

  // 组件基础交互配置
  export type TBaseInteractiveConfig = {
    type: string;
    name: string;
    show: boolean;
    // version 1.11
    // 是否可扩展新字段
    extend?: boolean;
    // version 1.11
    description?: string;
    fields: TBaseInteractiveConfigField[];
  };

  // 组件链接交互配置
  export type TLinkageInteractiveConfig = {
    type: string;
    name: string;
    show: boolean;
    description?: string;
    value: string;
  };

  // 交互
  export type TInteractiveConfig = {
    base: TBaseInteractiveConfig[];
    linkage: TLinkageInteractiveConfig[];
    // TODO
    // 具体细节有待参考
  };

  // 组件类型
  export type TComponentSelfType = ComponentSelfType;

  // 组件3d变换类型
  export type TComponentTransformConfig = {
    rotate: {
      x: number;
      y: number;
      z: number;
    };
    scale: {
      x: number;
      y: number;
    };
    translate: {
      x: number;
      y: number;
      z: number;
    };
  };

  // 组内组件轮播
  export type TGroupComponentCarouselConfig = {
    show: boolean;
    verticalAlign: 'start' | 'center' | 'end';
    horizontalAlign: 'start' | 'center' | 'end';
    // ? 2023-01-16
    emitType: 'auto' | 'manual' | 'event'; // 后面加 手动和事件 manual event
    // ? 2023-01-16
    // 手动触发专用
    emitKeyboard: string; // 暂时没用
    delay: number;
  };

  // 组内组件自身的动画配置
  export type TComponentCarouselAnimationConfig = {
    animation: 'fade' | 'slide';
    speed: number;
    // 线性 先慢后快 先快后慢 低速开始和结束
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    direction: 'left' | 'right' | 'top' | 'bottom';
  };

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
      skew: {
        x: number;
        y: number;
      };
      margin: {
        y: number;
      };
      border: {
        show: boolean;
        value: string;
        disabled?: boolean;
        // TODO
      };
      // 3d变换
      groupTransform: TComponentTransformConfig;
      // ? 组件的轮播配置 组内组件
      carouselConfig: TComponentCarouselAnimationConfig;
      // ? 组的配置 组件轮播
      groupCarousel?: TGroupComponentCarouselConfig;
    };
    attr: {
      visible: boolean;
      lock: boolean;
      scaleX?: number;
      scaleY?: number;
    };
    interactive?: TInteractiveConfig;
    data?: TComponentApiDataConfig;
  };

  // 数据过滤
  export type TFilterConfig = {
    id: string;
    name: string;
    code: string;
    editable: boolean;
    // 使用到的全局参数
    params: string[];
  };

  // 全局参数
  // * 关于组件的全局参数，使用每个组件参数对应一个params id不重复 设置variable则删除对应params
  export type TParams = {
    originType: 'COMPONENT' | 'URL';
    id: string;
    // 源头-针对组件
    origin?: string;
    // 源头类型-针对组件多交互
    originId?: string;
    // 值
    value?: string;
    // 源字段名称
    key: string;
    // 变量名称
    variable: string;
    // 是否启用 默认启用
    show: boolean;
  };

  // 全局常量
  export type TConstants = {
    key: string;
    description?: string;
    value: string;
    id: string;
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

  // 大屏主题色
  export type TScreenTheme = {
    // type: 'internal' | 'custom';
    value: string;
    // 只有非内置的需要保存颜色数组
    // color?: string[];

    // ? 1.22
    // ? 将所有自定义主题全部保存在大屏中，方便url当中使用
    color: {
      value: string[];
      label: string;
    }[];
  };

  // 大屏端类型
  export type ScreenFlagType = 'PC' | 'H5';

  // 大屏缩放类型
  // 全屏铺满 等比缩放宽度铺满 等比缩放高度铺满 等比缩放高度铺满 不缩放
  export type ScreenScaleType =
    | 'full'
    | 'fit-width'
    | 'fit-height'
    | 'fit-height-scroll'
    | 'none';

  // 大屏全局的请求配置
  export type ScreenCommonRequestConfig = Pick<
    TCommonRequestConfig,
    'method' | 'headers' | 'body' | 'serviceRequest' | 'frequency'
  >;

  export type VersionChangeTooltipItem = {
    [configId: string]: {
      read: boolean;
    };
  };

  // 版本升级带来的配置变化提示
  export type VersionChangeTooltip = {
    [version: string]: VersionChangeTooltipItem;
  };

  // 大屏配置
  export type TScreenData = {
    _id?: string;
    description: string;
    name: string;
    poster: string;
    components: TComponentData[];
    config: {
      style: {
        width: number;
        height: number;
        padding: [number, number];
      };
      attr: {
        poster: TBackgroundConfig;
        filter: TFilterConfig[];
        request: ScreenCommonRequestConfig;
        params: TParams[];
        constants: TConstants[];
        guideLine: TGuideLineConfig;
        theme: TScreenTheme;
        grid: number;
        componentBorder: {
          width: number;
          padding: [number, number];
        };
        lens: {
          show: boolean;
          hueRotate: number;
          saturate: number;
          brightness: number;
          contrast: number;
          opacity: number;
          grayscale: number;
        };
        scale: ScreenScaleType;
        waterMark: boolean;
      };
      flag: {
        type: ScreenFlagType;
      };
    };
    extra: {
      versionChangeTooltip: VersionChangeTooltip;
    };
  };

  // 大屏保存配置
  export type TScreenSaveData = {
    _id?: string;
    name: string;
    description?: string;
    poster: string;
    flag: 'PC' | 'H5';
    data: TScreenData;
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

  // 组3d变换
  export type TGroupComponentTransformConfig = {
    perspective: number;
    perspectiveOrigin: [number, number];
    show: boolean;
  };

  // 内部组件配置
  export type TInternalComponentConfig<T extends object = {}> =
    SuperPartial<TBaseConfig> & {
      options: T;
    };

  // 边距配置
  export type TComponentMarginConfig = {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };

  // 线性渐变配置
  export type TLinearGradientPosition = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

  // 径向渐变配置
  export type TRadialGradientPosition = {
    x: number;
    y: number;
    r: number;
  };

  // 渐变色配置
  export type TGradientColorConfig = {
    start: TColorConfig;
    end: TColorConfig;
    linearPosition: TLinearGradientPosition;
    radialPosition: TRadialGradientPosition;
    type: 'radial' | 'linear';
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
    type: 'image' | 'color' | 'internal_background';
    background?: string;
    color?: TColorConfig;
    internal_background?: string;
  };

  export type BaseComponentItem = {
    type: TComponentSelfType;
    title: string;
    icon: string;
    description?: string;
  };

  export type PositionType = {
    left: 'auto' | number;
    top: 'auto' | number;
    right: 'auto' | number;
    bottom: 'auto' | number;
  };

  export type KeyWordPositionType = {
    left: 'left' | 'center' | 'right';
    top: 'top' | 'center' | 'bottom';
  };

  export type OrientType = 'vertical' | 'horizontal';

  // 文字通用配置
  export type TFontConfig = {
    fontSize: number;
    fontWeight: number | string;
    fontFamily: string;
    color: TColorConfig;
  };

  // 阴影
  export type TBoxShadow = {
    hShadow: number;
    vShadow: number;
    blur: number;
    spread: number;
    color: ComponentData.TColorConfig;
  };

  // 图例
  export type ComponentLegend = {
    type: 'plain' | 'scroll';
    show: boolean;
    orient: OrientType;
    itemGap: number;
    textStyle: TFontConfig;
    align: 'auto' | 'left' | 'right';
    itemStyle?: {
      itemWidth: number;
      itemHeight: number;
      icon: ComponentSymbol;
      sizeIgnore: boolean;
    };
  } & KeyWordPositionType;

  // 网格
  export type ComponentGrid = {
    show: boolean;
  } & TComponentMarginConfig;

  // xAxis
  export type ComponentXAxis = {
    show: boolean;
    position: 'top' | 'bottom';
    axisLabel: {
      rotate: number;
      margin: number;
    } & TFontConfig;
    name: string;
  };

  // yAxis
  export type ComponentYAxis = Omit<ComponentXAxis, 'position'> & {
    position: 'right' | 'left';
  };

  // tooltip
  export type ComponentTooltip = {
    show: boolean;
    formatter?: string;
    backgroundColor: TColorConfig;
    textStyle: TFontConfig;
  };

  export type ComponentRuleConditionItem = {
    id: string;
    type: 'or' | 'and';
    rule: ComponentRuleConditionItemRule[];
  };

  export type ComponentRuleConditionItemRule = {
    id: string;
    params: string;
    condition:
      | 'less-then'
      | 'great-then'
      | 'equal'
      | 'not-equal'
      | 'not-less-then'
      | 'not-great-then'
      | 'include';
    value: string;
  };

  // condition type
  export type ComponentRuleCondition = {
    id: string;
    type: 'or' | 'and';
    rule: ComponentRuleConditionItem[];
  };

  // condition action type
  export type ComponentConditionActionType =
    | 'visible'
    | 'hidden'
    | 'ease-in-out'
    | 'ease-in'
    | 'ease-out';

  // condition
  export type ComponentCondition = {
    id: string;
    action: ComponentConditionActionType;
    type: 'code' | 'condition';
    value: {
      code: {
        relation: string[];
        // 使用到的参数
        code: string;
      };
      condition: ComponentRuleCondition;
    };
  };

  // condition
  export type ComponentConditionConfig = {
    value: ComponentCondition[];
    initialState: 'visible' | 'hidden';
  };

  export type ComponentTooltipAnimation = {
    speed: number;
    show: boolean;
  };

  export type ComponentChartAnimationConfig = {
    animation: boolean;
    animationEasing: ChartAnimationType;
    animationDuration: number;
  };

  export type ChartAnimationType =
    | 'linear'
    | 'quadraticIn'
    | 'quadraticOut'
    | 'quadraticInOut'
    | 'cubicIn'
    | 'cubicOut'
    | 'cubicInOut'
    | 'quarticIn'
    | 'quarticInOut'
    | 'quinticIn'
    | 'quinticOut'
    | 'quinticInOut'
    | 'sinusoidalIn'
    | 'sinusoidalOut'
    | 'sinusoidalInOut'
    | 'exponentialIn'
    | 'exponentialOut'
    | 'exponentialInOut'
    | 'circularIn'
    | 'circularOut'
    | 'circularInOut'
    | 'elasticIn'
    | 'elasticOut'
    | 'elasticInOut'
    | 'backIn'
    | 'backOut'
    | 'backInOut'
    | 'bounceIn'
    | 'bounceOut'
    | 'bounceInOut';

  // label position
  export type ComponentLabelPosition =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'inside'
    | 'outside'
    //| 'insideLeft'
    //| 'insideRight'
    | 'insideTop'
    | 'insideBottom';
  // | 'insideTopLeft'
  // | 'insideBottomLeft'
  // | 'insideTopRight'
  // | 'insideBottomRight';

  // symbol
  export type ComponentSymbol =
    | 'circle'
    | 'rect'
    | 'roundRect'
    | 'triangle'
    | 'diamond'
    | 'pin'
    | 'arrow'
    | 'none';

  // 线条类型
  export type ComponentLineStyle = 'solid' | 'dashed' | 'dotted';

  export type ComponentConfigProps<T extends object = {}> = {
    value: TComponentData<T>;
    onChange: (value: SuperPartial<TComponentData<T>>) => void;
  };

  export type ComponentSeriesLabelConfig = {
    show: boolean;
    position: ComponentLabelPosition;
  } & TFontConfig;

  export type ComponentLineGroupConfig = {
    color: TColorConfig;
    width: number;
    type: ComponentLineStyle;
  };

  export type TGlobalData = {
    setParams: (params: TParams[]) => void;
    screenType: 'edit' | 'preview' | 'production';
    screenTheme: TScreenTheme['value'];
  };

  export type ComponentProps<P extends object = {}> = {
    component: TComponentData<P>;
    global: TGlobalData;
  };

  // 柱形图轮播配置
  export type BarCarouselConfig = {
    show: boolean;
    speed: number;
    showCount: number;
  };

  // 大屏组件的通用props
  export type CommonComponentProps<T extends object = {}> = {
    className?: string;
    style?: React.CSSProperties;
    value: ComponentData.TComponentData<T>;
    global: ComponentProps['global'];
    children?: React.ReactNode;
    wrapper: any;
  };

  export type StaticExportData = {
    value: TScreenData;
    screenShot: API_IMPROVE.LocalScreenShotDataValue[];
  };
}

declare namespace ComponentClipboard {
  export type LocalClipboardType = {
    timestamps: number;
    value: string[];
  };

  export type StorageClipboardType = {
    timestamps: number;
    value: ComponentData.TComponentData[];
    show: boolean;
    screenId: string;
  };
}

declare namespace ComponentMethod {
  type Action =
    | 'add'
    | 'update'
    | 'delete'
    | 'move'
    | 'cover_update'
    | 'group'
    | 'un_group'
    | 'drag';
  type SetComponentMethodParamsData = {
    value: SuperPartial<ComponentData.TComponentData>;
    extra?: any;
    id: string;
    path?: string;
    callback?: (components: ComponentData.TComponentData[], extra: any) => void;
    action: Action;
    // ? 有些稍微复杂的交互行为时，可能会被拆分成多个子行为，所以拿这个做下区分吧
    originAction?: Action;
    index?: number | 'last' | 'first' | 'next' | 'prev'; // * 移动时用，这里暂时只存在同级移动
  };

  export type SetComponentMethod = (
    value: SetComponentMethodParamsData[] | SetComponentMethodParamsData,
  ) => void;

  export type GlobalUpdateScreenDataParams = SuperPartial<
    Exclude<ComponentData.TScreenData, 'components'>
  >;
}

declare namespace Logger {
  export type LoggerItemType = 'request' | 'normal';
  export type LoggerLevel = 'Info' | 'Log' | 'Error' | 'Warn';
  export type LoggerContentItem = {
    title: string;
    titleColor?: string;
    content: string;
    contentColor?: string;
  };
  export type LoggerItem = {
    type: 'request';
    id: string;
  } & {
    url: string;
    method: string;
    params: object;
    headers?: object;
    response: object;
    error?: any;
    component: string;
    requestType: 'static' | 'mock' | 'api';
  }; // | another log type

  export type LoggerItemWithoutId = Omit<LoggerItem, 'id'>;
}

declare namespace ComponentType {
  export type ComponentChildren = {
    type: string;
    title: string;
    icon: any;
    description: string;
    disabled?: boolean;
    development?: boolean;
  };

  export type ComponentTypeSubChildren = {
    type: string;
    title: string;
    children: ComponentChildren[];
  };

  export type ComponentTypeList = {
    type: string;
    title: string;
    icon: JSX.Element;
    children: ComponentTypeSubChildren[];
  };
}
