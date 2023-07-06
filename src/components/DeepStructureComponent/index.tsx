// [Parent, Children]
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
