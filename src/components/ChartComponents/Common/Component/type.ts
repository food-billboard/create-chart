export type TGlobalData = {
  setParams: (params: ComponentData.TParams[]) => void;
  screenType: 'edit' | 'preview' | 'production';
  screenTheme: string;
};

export type ComponentProps<P extends object = {}> = {
  component: ComponentData.TComponentData<P>;
  global: TGlobalData;
};
