import { CSSProperties, useEffect, useRef } from 'react';
import { uniqueId, merge, pick } from 'lodash';
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
  const { animation, ignore } = tooltip;

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
      closeWhenClickMap: true,
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
    mapInfoWindow.current?.close();
  };

  // 创建弹出框
  const createInfoWindow = (markerInfo: any) => {
    const { image, title, subTitle, description, topTitle } = markerInfo;
    const { textStyle, backgroundColor } = tooltip;
    const info = document.createElement('div');
    info.className = classnames(styles['component-map-ali3d-window']);
    info.innerHTML = `
      <div
        class='${styles['component-map-ali3d-window-top']}'
        style='font-size: ${textStyle.fontSize}px;font-weight: ${
      textStyle.fontWeight
    };font-family: ${textStyle.fontFamily};color:${getRgbaString(
      textStyle.color,
    )};background-color:${getRgbaString(backgroundColor)}'
      >
        <div
          class='${styles['component-map-ali3d-window-header']}'
        >
          <div>
            ${topTitle}
          </div>
          <div
            class='${classnames(
              styles['component-map-ali3d-window-close'],
              'bi',
              'bi-x',
              'component-map-ali3d-window-close',
            )}'
          >
          
          </div>
        </div>
        <div
          class='${styles['component-map-ali3d-window-content']}'
        >
          <img
            src='${image}'
            class='${classnames(styles['component-map-ali3d-window-image'], {
              [styles['component-map-ali3d-window-hidden']]:
                ignore.includes('image'),
            })}'
          />
          <div
            class='${styles['component-map-ali3d-window-main']}'
          >
            <div
              class='${styles['component-map-ali3d-window-title']}'
            >
              ${title}
            </div>
            <div
              class='${classnames(
                styles['component-map-ali3d-window-sub-title'],
                {
                  [styles['component-map-ali3d-window-hidden']]:
                    ignore.includes('sub-title'),
                },
              )}'
            >
              ${subTitle}
            </div>
            <div
              class='${classnames(
                styles['component-map-ali3d-window-description'],
                {
                  [styles['component-map-ali3d-window-hidden']]:
                    ignore.includes('description'),
                },
              )}'
            >
              ${description}
            </div>
          </div>
        </div>
      </div>
    `;

    const closeX = info.querySelector(
      '.component-map-ali3d-window-close',
    ) as any;
    closeX.onclick = closeInfoWindow;

    return info;
  };

  // 更新弹出框
  const updateInfoWindow = (markerInfo: any) => {
    closeInfoWindow();
    const {
      position,
      extData: { image, description, topTitle, title, subTitle },
    } = markerInfo;
    mapInfoWindow.current?.setContent(
      createInfoWindow({
        image,
        description,
        topTitle,
        title,
        subTitle,
      }),
    );
    mapInfoWindow.current?.open(mapInstance.current, position);
    syncInteractiveAction('modal-show', {
      position: markerInfo.position,
      ...pick(markerInfo.extData, [
        'image',
        'title',
        'subTitle',
        'description',
        'topTitle',
      ]),
    });
  };

  // 点击标记点
  const onMarkerClick = (markerData: any) => {
    tooltipLoopIndex.current = markerData.extData.index;
    updateInfoWindow(markerData);
    syncInteractiveAction('click', {
      position: markerData.position,
    });
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
          ...item,
          index,
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

  const tooltipAnimation = () => {
    const { pointer = [] } = realValue;
    tooltipLoopIndex.current++;
    tooltipLoopIndex.current %= pointer?.length;
    const data = pointer[tooltipLoopIndex.current];
    updateInfoWindow({
      position: data?.position,
      extData: {
        ...(data || {}),
        index: tooltipLoopIndex.current,
      },
    });
  };

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
    if (!animation.show || screenType === 'edit') return;
    tooltipAnimation();
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
