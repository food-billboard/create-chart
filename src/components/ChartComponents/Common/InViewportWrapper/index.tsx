import { useInViewport } from 'ahooks';

const ChartComponentMap: any = {};

const InViewportWrapper = (
  Component: (props: any) => JSX.Element,
  type: ComponentData.TComponentSelfType,
) => {
  if (!ChartComponentMap[type]) {
    ChartComponentMap[type] = function (props: any) {
      const {
        // ? 特殊的query逻辑，用于在切换移动端时的标识
        viewportQuery,
        value,
        ...nextProps
      } = props;
      const { id } = value;
      const query =
        typeof viewportQuery === 'function'
          ? viewportQuery
          : () =>
              document.querySelector(viewportQuery || `div[data-id='${id}']`);
      const [inViewport] = useInViewport(query, {
        threshold: 0.25,
      });

      if (inViewport) return <Component value={value} {...nextProps} />;

      return <></>;
    };
  }
  return ChartComponentMap[type];
};

export default InViewportWrapper;
