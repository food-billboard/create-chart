import { useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { useClipPath } from '@/hooks';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TVideoConfig } from '../type';
import styles from './index.less';

const CHART_ID = 'VIDEO';

const VideoBasic = (
  props: ComponentData.CommonComponentProps<TVideoConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    controls,
    loop,
    autoplay: opAutoplay,
    muted,
    condition,
    clipPath,
  } = options;
  const { screenType } = global;

  const clipPathStyle = useClipPath(clipPath);

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
    onCondition,
  } = useComponent<TVideoConfig>(
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
    return classnames(
      className,
      styles['component-media-video'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

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
          clipPathStyle,
          conditionStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          <video
            muted={muted}
            autoPlay={autoplay}
            loop={loop}
            controls={controls}
            src={finalValue.value}
          />
        </Wrapper>
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

const WrapperVideoBasic: typeof VideoBasic & {
  id: ComponentData.TComponentSelfType;
} = VideoBasic as any;

WrapperVideoBasic.id = CHART_ID;

export default WrapperVideoBasic;
