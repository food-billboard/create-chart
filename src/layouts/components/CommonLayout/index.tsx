export { default as EventEmitterWrapper } from './EventEmitWrapper';
export { default as EnvironmentPrompt } from './EnvironmentPrompt';
export { default as DocumentTitleSetWrapper } from './DocumentTitleSetWrapper';
export { default as DocumentTitleSetWrapper4Static } from './DocumentTitleSetWrapper4Static';
export { default as ContainerWrapper } from './ContainerWrapper';
export { default as ContainerWrapper4Static } from './ContainerWrapper4Static';

const ReduceLayout = (Components: any[]) => {
  return Components.reduceRight((Component, CurComponent) => {
    if (!Component)
      return (props: any) => {
        return <CurComponent {...props} />;
      };
    return (props: any) => {
      return <CurComponent {...props} Component={Component} />;
    };
  }, null);
};

export default ReduceLayout;
