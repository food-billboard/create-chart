import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TAudioConfig } from '../type';
import styles from './index.less';

const AudioBasic = (
  props: ComponentData.CommonComponentProps<TAudioConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { controls, loop, autoplay: opAutoplay, condition } = options;
  const { screenType } = global;

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
  } = useComponent<TAudioConfig>({
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
    return classnames(className, styles['component-media-audio']);
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
          },
          style,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          <audio
            autoPlay={screenType !== 'edit' && autoplay}
            loop={loop}
            controls={controls}
            src={finalValue.value}
            muted={screenType === 'edit'}
          />
          {!controls && screenType === 'edit' && (
            <div className={styles['component-media-audio-tooltip']}>
              仅在设计情况下显示此<strong>音乐</strong>提示文本
            </div>
          )}
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

const WrapperAudioBasic: typeof AudioBasic & {
  id: ComponentData.TComponentSelfType;
} = AudioBasic as any;

WrapperAudioBasic.id = CHART_ID;

export default WrapperAudioBasic;
