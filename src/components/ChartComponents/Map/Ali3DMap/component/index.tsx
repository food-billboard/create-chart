import { CSSProperties, useEffect, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useUnmount } from 'ahooks';
import { useDeepUpdateEffect } from '@/hooks';
import {
  useComponent,
  useChartValueMapField,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { TAli3DMapConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'ALI3D_MAP';

const AMapFactory = (window as any).AMap;

const DEFAULT_ICON_STYLE = {
  image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
  // size: [6, 9],
  size: new AMapFactory.Size(18, 27),
  anchor: 'bottom-center',
};

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

  const { tooltip, condition, scatter, style: mapStyle, zoom } = options;
  const { animation } = tooltip;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const mapId = useRef<string>(uniqueId(CHART_ID + 'MAP'));
  const mapInstance = useRef<any>();
  const mapLayerRef = useRef<any>();
  const requestRef = useRef<TFetchFragmentRef>(null);
  const mapInfoWindow = useRef<any>(
    new AMapFactory.InfoWindow({
      isCustom: true,
      content: '',
      offset: new AMapFactory.Pixel(16, -45),
    }),
  );
  const tooltipTimer = useRef<any>();
  const tooltipLoopIndex = useRef(0);

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
        realValue: value,
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

  const initChart = () => {
    try {
      mapInstance.current = new AMapFactory.Map(mapId.current, {
        rotateEnable: true,
        pitchEnable: true,
        pitch: 50,
        zoom,
        rotation: -15,
        viewMode: '3D', //开启3D视图,默认为关闭
      });
      // const controlBar = new AMapFactory.ControlBar({
      //   position: {
      //     right: '10px',
      //     top: '10px',
      //   },
      // });
      // const overView = new AMapFactory.HawkEye({
      //   opened: false,
      // });
      // const toolBar = new AMapFactory.ToolBar({
      //   position: {
      //     right: '40px',
      //     top: '110px',
      //   },
      // });
      // mapInstance.current.add(overView);
      // controlBar.addTo(mapInstance.current);
      // toolBar.addTo(mapInstance.current);

      // mapInstance.current?.on('click', onClick);
    } catch (err) {}
  };

  // 关闭弹出框
  const closeInfoWindow = () => {
    mapInstance.current?.clearInfoWindow();
  };

  // 创建弹出框
  const createInfoWindow = (markerInfo: any) => {
    // const { } = markerInfo
    // var info = document.createElement("div");
    // info.className = "custom-info input-card content-window-card";
    // //可以通过下面的方式修改自定义窗体的宽高
    // info.style.width = "400px";
    // // 定义顶部标题
    // var top = document.createElement("div");
    // var titleD = document.createElement("div");
    // var closeX = document.createElement("img");
    // top.className = "info-top";
    // titleD.innerHTML = title;
    // closeX.src = "https://webapi.amap.com/images/close2.gif";
    // closeX.onclick = closeInfoWindow;
    // top.appendChild(titleD);
    // top.appendChild(closeX);
    // info.appendChild(top);
    // // 定义中部内容
    // var middle = document.createElement("div");
    // middle.className = "info-middle";
    // middle.style.backgroundColor = 'white';
    // middle.innerHTML = content;
    // info.appendChild(middle);
    // // 定义底部内容
    // var bottom = document.createElement("div");
    // bottom.className = "info-bottom";
    // bottom.style.position = 'relative';
    // bottom.style.top = '0px';
    // bottom.style.margin = '0 auto';
    // var sharp = document.createElement("img");
    // sharp.src = "https://webapi.amap.com/images/sharp.png";
    // bottom.appendChild(sharp);
    // info.appendChild(bottom);
    // return info;
  };

  // 更新弹出框
  const updateInfoWindow = (markerInfo: any) => {
    mapInfoWindow.current?.setContent(createInfoWindow(markerInfo));
  };

  // 点击标记点
  const onMarkerClick = (markerData: any) => {
    console.log('点击标记', markerData);
  };

  const createMarkerLayer = () => {
    mapLayerRef.current = new AMapFactory.LabelsLayer({
      zIndex: 1000,
      allowCollision: false,
    });
  };

  const createMarker = () => {
    const { pointer = [] } = realValue;
    const markers = pointer.map((item: any, index: number) => {
      const { position, ...nextInfo } = item;
      const baseData = {
        extData: {
          index,
          nextInfo,
        },
        icon: DEFAULT_ICON_STYLE.image,
        // icon: DEFAULT_ICON_STYLE,
        position,
        zIndex: 1001,
      };
      // const point = new AMapFactory.LabelMarker(baseData)
      const point = new AMapFactory.Marker(baseData);
      point.on('click', onMarkerClick.bind(null, baseData));
      return point;
    });
    // mapLayerRef.current?.add(markers)
    mapInstance.current?.add(markers);
  };

  const setOption = () => {
    // if (mapLayerRef.current) mapInstance.current?.remove(mapLayerRef.current)
    mapInstance.current?.clearMap();
    const {} = scatter;

    // 设置样式
    const styleName = 'amap://styles/' + mapStyle;
    mapInstance.current?.setMapStyle(styleName);

    // 设置中心点
    const { center } = realValue;
    mapInstance.current?.setCenter(center);

    createMarkerLayer();
    mapInstance.current?.add(mapLayerRef.current);
    createMarker();
  };

  const tooltipAnimation = () => {};

  useEffect(() => {
    initChart();
    setOption();
  }, []);

  // 数据发生变化时
  useDeepUpdateEffect(() => {
    setOption();
  }, [processedValue, options, realValue]);

  // 动画轮播弹出框
  useEffect(() => {
    clearInterval(tooltipTimer.current);
    if (!animation.show) return;
    tooltipTimer.current = setInterval(tooltipAnimation, animation.speed);
  }, [animation]);

  useUnmount(() => {
    clearInterval(tooltipTimer.current);
    mapInstance.current?.destroy();
  });

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
