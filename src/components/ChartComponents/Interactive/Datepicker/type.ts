export type TDatePickerConfig = {
  defaultDate: string;
  mode: 'year' | 'month' | 'date' | 'week' | 'time';
  format: string;
  filterDate: string;
  filterTime: string;
  input: {
    borderColor: ComponentData.TColorConfig;
    activeBorderColor: ComponentData.TColorConfig;
    textStyle: ComponentData.TFontConfig;
  };
  arrow: {
    color: ComponentData.TColorConfig;
    active: {
      color: ComponentData.TColorConfig;
    };
  };
  confirmBtn: {
    textStyle: ComponentData.TFontConfig;
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
