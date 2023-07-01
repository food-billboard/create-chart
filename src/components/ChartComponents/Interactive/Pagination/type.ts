export type TPaginationConfig = {
  defaultValue: number;
  defaultPageSize: number;
  borderRadius: number;
  textStyle: ComponentData.TFontConfig;
  margin: number;
  border: ComponentData.ComponentLineGroupConfig;
  backgroundColor: ComponentData.TColorConfig;
  active: {
    textStyle: ComponentData.TFontConfig;
    border: ComponentData.ComponentLineGroupConfig;
    backgroundColor: ComponentData.TColorConfig;
  };
  total: {
    show: boolean;
    textStyle: ComponentData.TFontConfig;
    margin: number;
  };
  pageButton: {
    type: 'icon' | 'text';
    value: string[];
    color: ComponentData.TColorConfig;
    backgroundColor: ComponentData.TColorConfig;
    size: number;
    border: {
      show: boolean;
    };
  };
  pageNumChanger: {
    show: boolean;
    pageEnum: string;
    arrow: {
      size: number;
      color: ComponentData.TColorConfig;
    };
  };
  skip: {
    show: boolean;
    margin: number;
    textStyle: ComponentData.TFontConfig;
  };
  condition: ComponentData.ComponentConditionConfig;
};
