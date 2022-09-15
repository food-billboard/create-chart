export type TQrCodeConfig = {
  logo: {
    show: boolean;
    image: string;
    size: {
      width: number;
      height: number;
    };
    borderRadius: number;
    border: ComponentData.ComponentLineGroupConfig;
  };
  base: {
    backgroundColor: ComponentData.TColorConfig;
    codeColor: ComponentData.TColorConfig;
    margin: number;
  };
  condition: ComponentData.ComponentConditionConfig;
};
