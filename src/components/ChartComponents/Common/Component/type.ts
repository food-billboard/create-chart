export type TGlobalData = {
  filter: ComponentData.TFilterConfig[];
  setParams: (params: ComponentData.TParams[]) => void;
  screenType: 'edit' | 'preview' | 'production';
};

export type ComponentProps<P extends object = {}> = {
  component: ComponentData.TComponentData<P>;
  global: TGlobalData;
};
