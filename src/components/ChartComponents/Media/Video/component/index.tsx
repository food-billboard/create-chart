import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TVideoConfig } from '../type';
import styles from './index.less';

const CHART_ID = 'VIDEO';

const VideoBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TVideoConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    config: { options },
  } = value;
  const { controls, loop, autoplay: opAutoplay, muted } = options;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TVideoConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const autoplay = useMemo(() => {
    return screenType === 'edit' ? false : opAutoplay;
  }, [opAutoplay, screenType]);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-media-video']);
  }, [className]);

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
        onClick={onClick}
      >
        <video
          muted={muted}
          autoPlay={autoplay}
          loop={loop}
          controls={controls}
          src={finalValue.value}
        />
      </div>
      <FetchFragment
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperVideoBasic: typeof VideoBasic & {
  id: ComponentData.TComponentSelfType;
} = VideoBasic as any;

WrapperVideoBasic.id = CHART_ID;

export default WrapperVideoBasic;
