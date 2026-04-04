import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { useClipPath } from '@/hooks';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TVideoConfig } from '../type';
import styles from './index.less';

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

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TVideoConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: DEFAULT_BORDER_RADIUS,
          },
          style,
          clipPathStyle,
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
      </ConditionComponent>
      <FetchFragment
        id={id}
        url={requestUrl}
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
