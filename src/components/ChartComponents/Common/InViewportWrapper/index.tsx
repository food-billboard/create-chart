import { useInViewport, useUpdateEffect } from 'ahooks';
import { useRef } from 'react';
import { useAnyDva } from '@/hooks';

const ChartComponentMap: any = {};
let isMobile: boolean;

const InViewportWrapper = (
  Component: (props: any) => JSX.Element,
  type: ComponentData.TComponentSelfType,
) => {
  if (typeof isMobile === 'undefined') {
    const { getState } = useAnyDva();
    const flag = getState().global.screenData.config.flag.type;
    isMobile = flag === 'H5';
  }
  if (!isMobile) ChartComponentMap[type] = Component;
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
      // 只需要初始化一次
      const isViewport = useRef(!!inViewport);

      useUpdateEffect(() => {
        if (inViewport) isViewport.current = true;
      }, [inViewport]);

      if (inViewport || isViewport.current)
        return <Component value={value} {...nextProps} />;

      return <></>;
    };
  }
  return ChartComponentMap[type];
};

export default InViewportWrapper;
