import { CSSProperties, useEffect, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useChartComponentResize,
  useChartValueMapField,
  useComponentResize,
  useCondition,
  useChartComponentTooltip,
} from '@/components/ChartComponents/Common/Component/hook';
import { radialGradientColor } from '@/components/ChartComponents/Common/utils';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TAli3DMapConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'ALI3D_MAP';

// 热点信息，也就是标记相关
// https://lbs.amap.com/demo/jsapi-v2/example/map/hotspot

const Ali3DMap = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TAli3DMapConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    id,
    config: { options },
  } = value;

  const { tooltip, condition, scatter, style: mapStyle } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const mapId = useRef<string>(uniqueId(CHART_ID + 'MAP'));
  const mapInstance = useRef<any>();
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TAli3DMapConfig>(
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

  const { realValue } = useChartValueMapField(processedValue, {
    map: componentFilterMap,
    fields: {
      seriesKey: 's',
      xAxisKeyKey: 'name',
      yAxisValue: 'value',
    },
    formatMethod: (value) => {
      return {
        realValue: value.map((item: any) => {
          const { name, center, value } = item;
          return {
            name,
            value: [...(center || []), value],
          };
        }),
      };
    },
  });

  const onClick = (params: any) => {
    // 经纬度
    // e.lnglat.getLng() + ',' + e.lnglat.getLat()
    // const { data } = params;
    // const { name, value } = data;
    // syncInteractiveAction('click', {
    //   name: name,
    //   value: value[2],
    //   center: value.slice(0, 2),
    // });
  };

  const initChart = () => {};

  const setOption = () => {
    const {} = scatter;

    // 设置样式
    const styleName = 'amap://styles/' + mapStyle;
    mapInstance.current?.setMapStyle(styleName);

    // 设置中心点
    const { center, pointer } = realValue;
    mapInstance.current?.setCenter(center);

    // const {
    //   backgroundColor,
    //   textStyle: tooltipTextStyle,
    //   animation,
    //   ...nextTooltip
    // } = tooltip;
  };

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, options, realValue]);

  // 配置发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, options, realValue]);

  useEffect(() => {
    try {
      const AMapFactory = (window as any).AMap;
      mapInstance.current = new AMapFactory.Map(mapId.current, {
        rotateEnable: true,
        pitchEnable: true,
        zoom: 17,
        pitch: 50,
        rotation: -15,
        viewMode: '3D', //开启3D视图,默认为关闭
        zooms: [2, 20],
        center: [116.333926, 39.997245],
      });
      const controlBar = new AMapFactory.ControlBar({
        position: {
          right: '10px',
          top: '10px',
        },
      });
      const overView = new AMapFactory.HawkEye({
        opened: false,
      });
      const toolBar = new AMapFactory.ToolBar({
        position: {
          right: '40px',
          top: '110px',
        },
      });
      mapInstance.current.add(overView);
      controlBar.addTo(mapInstance.current);
      toolBar.addTo(mapInstance.current);

      mapInstance.current?.on('click', onClick);
    } catch (err) {}
  }, []);

  return (
    <>
      <div
        className={classnames(
          styles['component-map-ali3d'],
          className,
          conditionClassName,
        )}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          conditionStyle,
        )}
        id={chartId.current}
      >
        <div id={mapId.current}></div>
      </div>
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

const WrapperAli3DMap: typeof Ali3DMap & {
  id: ComponentData.TComponentSelfType;
} = Ali3DMap as any;

WrapperAli3DMap.id = CHART_ID;

export default WrapperAli3DMap;
