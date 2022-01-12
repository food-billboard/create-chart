// * 大屏的数据格式

declare namespace ComponentData {
  // 组件上级大类类型
  export type TComponentType = 'GROUP_COMPONENT';

  // 组件类型
  export type TComponentSelfType = 'GROUP_COMPONENT';

  // 基础组件属性
  export type TBaseConfig = {
    style: {
      width: number;
      height: number;
      left: number;
      top: number;
      opacity: number;
      rotate: number;
      zIndex: number; // 这个可以暂时不设置，因为没有重叠的情况
    };
    attr: {
      visible: boolean;
    };
    interactive: {
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
    data: {
      request: {
        url: string;
        method: 'POST' | 'GET';
        headers: object;
        body: object;
        frequency: {
          show: boolean;
          value: number;
        };
        type: 'api' | 'static';
        value: any[] | object;
      };
      filter: {
        show: boolean;
        fields: {
          name: string;
          description: string;
        }[];
        value: {
          name: string;
          disabled: boolean;
        }[];
        map: {
          field: string;
          map: string;
        }[];
      };
    };
  };

  // 背景属性
  export type TPosterConfig = {
    type: 'image' | 'color';
    value: string;
  };

  // 数据过滤
  export type TFilterConfig = {
    id: string;
    name: string;
    code: string;
  };

  // 辅助线
  export type TGuideLineConfig = {
    type: 'vertical' | 'horizontal';
    position: [number, number];
    id: string;
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
        name: string;
        poster: TPosterConfig;
        filter: TFilterConfig[];
      };
      flag: {
        type: 'WEB' | 'H5';
      };
    };
  };

  // 组件配置
  export type TComponentData<T extends object = {}> = {
    description: string;
    name: string;
    id: string;
    type: TComponentType;
    componentType: TComponentSelfType;
    components: TComponentData<any>[];
    config: TBaseConfig & {
      options: T;
    };
  };

  // 文字通用配置
  export type TFontConfig = {
    fontSize: number;
    fontWeight: number;
    fontFamily: string;
    color: string;
  };
}
