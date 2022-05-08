export type TDatePickerConfig = {
  defaultDate: string;
  mode: 'year' | 'month' | 'date' | 'week' | 'time';
  format: string;
  filterDate: string;
  filterTime: string;
  arrow: {
    color: ComponentData.TColorConfig;
    active: {
      color: ComponentData.TColorConfig;
    };
  };
  yearAndMonthAndTime: {
    textStyle: ComponentData.TFontConfig;
  };
  week: {
    textStyle: ComponentData.TFontConfig;
  };
  dateAndTime: {
    borderRadius: number;
    backgroundColor: ComponentData.TColorConfig;
    textStyle: ComponentData.TFontConfig;
    prevAndNext: {
      textStyle: ComponentData.TFontConfig;
      backgroundColor: ComponentData.TColorConfig;
    };
    hover: {
      textStyle: ComponentData.TFontConfig;
      backgroundColor: ComponentData.TColorConfig;
    };
    active: {
      textStyle: ComponentData.TFontConfig;
      backgroundColor: ComponentData.TColorConfig;
    };
    disabled: {
      textStyle: ComponentData.TFontConfig;
      backgroundColor: ComponentData.TColorConfig;
    };
  };
};
