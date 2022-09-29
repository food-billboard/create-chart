import { CSSProperties, useMemo, useRef, useEffect, ReactNode } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import Viewer from 'viewerjs';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TPictureWallConfig } from '../type';
import 'viewerjs/dist/viewer.css';
import styles from './index.less';

const CHART_ID = 'PICTURE_WALL';

const PictureWall = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TPictureWallConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const { className, style, value, global, children } = props;
  const { screenType } = global;

  const {
    config: {
      options,
      style: { height },
    },
    id,
  } = value;
  const { maxCount, margin, columnCount, preview } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    linkageMethod,
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TPictureWallConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-media-carousel']);
  }, [className]);

  const onClick = (value: any) => {
    linkageMethod('click-item', {
      value,
    });
  };

  const imageList = useMemo(() => {
    const rate = Math.ceil(maxCount / columnCount);
    return finalValue.slice(0, maxCount).map((item: any, index: number) => {
      return (
        <img
          className={classnames('component-media-picture-wall-item')}
          src={item}
          style={{
            marginTop: margin[1],
            marginLeft: margin[0],
            height: `calc( (100% - ${margin[1] * (rate + 1)}px) / ${rate} )`,
            width: `calc( ( 100% - ${
              margin[0] * (columnCount + 1)
            }px ) / ${columnCount} )`,
          }}
          key={index}
          onClick={onClick.bind(null, item)}
        />
      );
    });
  }, [finalValue, height, maxCount, columnCount, margin]);

  useEffect(() => {
    if (!preview.show || screenType !== 'preview') return;
    const element = document.getElementById(chartId.current) as HTMLElement;

    if (!element) return;

    const viewer: Viewer = new Viewer(element, {
      inline: false,
      viewed() {
        viewer.zoomTo(1);
      },
      url: 'src',
    });
    return () => {
      viewer?.destroy();
    };
  }, [preview, screenType]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        {children}
        {imageList}
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={() => {}}
        componentFilter={componentFilter}
        componentCondition={{
          initialState: 'visible',
          value: [],
        }}
      />
    </>
  );
};

const WrapperPictureWall: typeof PictureWall & {
  id: ComponentData.TComponentSelfType;
} = PictureWall as any;

WrapperPictureWall.id = CHART_ID;

export default WrapperPictureWall;
