import { CSSProperties, useEffect, useRef, useMemo } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TPathBasicConfig } from '../type';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'PATH_BASIC';

const PathBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TPathBasicConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenTheme, screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { animation, condition, path, target, close } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<echarts.ECharts>();
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TPathBasicConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const initChart = () => {};

  const setOption = () => {};

  useEffect(() => {
    initChart();
    return () => {};
  }, [screenTheme]);

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, finalValue.value]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [options]);

  return (
    <>
      <div
        className={classnames(className, conditionClassName)}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
        id={chartId.current}
      ></div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperPathBasic: typeof PathBasic & {
  id: ComponentData.TComponentSelfType;
} = PathBasic as any;

WrapperPathBasic.id = CHART_ID;

export default WrapperPathBasic;
