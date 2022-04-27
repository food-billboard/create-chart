import { CSSProperties, useMemo, useRef, useEffect } from 'react';
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
}) => {
  const { className, style, value, global } = props;

  const {
    config: {
      options,
      style: { height },
    },
    id,
  } = value;
  const { maxCount, margin, columnCount } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
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

  const imageList = useMemo(() => {
    const rate = Math.ceil(maxCount / columnCount);
    const unitHeight = Math.floor((height - margin[1] * (rate + 1)) / rate);
    return finalValue.slice(0, maxCount).map((item: any, index: number) => {
      return (
        <img
          className={classnames('component-media-picture-wall-item')}
          src={item}
          style={{
            marginTop: margin[1],
            marginLeft: margin[0],
            height: unitHeight,
            width: `calc( ( 100% - ${
              margin[0] * (columnCount + 1)
            }px ) / ${columnCount} )`,
          }}
          key={index}
        />
      );
    });
  }, [finalValue, height, maxCount, columnCount, margin]);

  useEffect(() => {
    const element = document.getElementById(chartId.current) as HTMLElement;

    if (!element) return;

    const viewer: Viewer = new Viewer(element, {
      inline: false,
      viewed() {
        viewer.zoomTo(1);
      },
      url: 'src',
      // title: [4, (image: any, imageData: any) => `${image.alt} (${imageData.naturalWidth} × ${imageData.naturalHeight})`],
    });
    return () => {
      viewer?.destroy();
    };
  }, []);

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
        componentCondition={[]}
      />
    </>
  );
};

const WrapperPictureWall: typeof PictureWall & {
  id: ComponentData.TComponentSelfType;
} = PictureWall as any;

WrapperPictureWall.id = CHART_ID;

export default WrapperPictureWall;
