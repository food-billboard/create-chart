export type TAli3DMapConfig = {
  scatter: {
    color: ComponentData.TColorConfig;
  };
  tooltip: Omit<ComponentData.ComponentTooltip, 'formatter'> & {
    animation: ComponentData.ComponentTooltipAnimation;
    ignore: ('image' | 'sub-title' | 'description')[];
  };
  condition: ComponentData.ComponentConditionConfig;
  zoom: number;
  style:
    | 'normal'
    | 'dark'
    | 'light'
    | 'whitesmoke'
    | 'fresh'
    | 'grey'
    | 'graffiti'
    | 'macaron'
    | 'blue'
    | 'darkblue'
    | 'wine';
};
