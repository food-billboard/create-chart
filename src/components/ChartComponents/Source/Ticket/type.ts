export type TTicketConfig = {
  radius: number;
  length: number;
  dashed: {
    show: boolean;
    color: ComponentData.TColorConfig;
  };
  shadow: {
    show: boolean;
  };
  color: ComponentData.TColorConfig;
};
