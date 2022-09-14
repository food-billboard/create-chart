export type TQrCodeConfig = {
  logo: {
    show: boolean;
    image: string;
    size: {
      width: number;
      height: number;
    };
    borderRadius: number;
    backgroundColor: ComponentData.TColorConfig;
    border: ComponentData.ComponentLineGroupConfig;
  };
  base: {
    backgroundColor: ComponentData.TColorConfig;
  };
  condition: ComponentData.ComponentConditionConfig;
};
