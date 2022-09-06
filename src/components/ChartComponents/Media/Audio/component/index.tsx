import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TAudioConfig } from '../type';
import styles from './index.less';

const CHART_ID = 'AUDIO';

const AudioBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TAudioConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const { controls, loop, autoplay: opAutoplay, condition } = options;
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
    onCondition,
  } = useComponent<TAudioConfig>(
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
      styles['component-media-audio'],
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
          conditionStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
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

const WrapperAudioBasic: typeof AudioBasic & {
  id: ComponentData.TComponentSelfType;
} = AudioBasic as any;

WrapperAudioBasic.id = CHART_ID;

export default WrapperAudioBasic;
