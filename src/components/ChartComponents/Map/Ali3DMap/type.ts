export type TAli3DMapConfig = {
  scatter: {};
  tooltip: ComponentData.ComponentTooltip & {
    animation: ComponentData.ComponentTooltipAnimation;
  };
  condition: ComponentData.ComponentConditionConfig;
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
