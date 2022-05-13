import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { TextLoop } from 'react-text-loop-next';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TLoopTextConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'LOOP_TEXT';

const LoopText = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TLoopTextConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const {
    animation,
    condition,
    addonBefore,
    addonAfter,
    textStyle,
    ...nextOptions
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TLoopTextConfig>(
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
  } = useCondition(onCondition);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const componentStyle = useMemo(() => {
    const {
      align: { vertical, horizontal },
    } = nextOptions;
    let baseStyle: CSSProperties = {
      justifyContent: horizontal,
      alignItems: vertical,
    };
    return baseStyle;
  }, [nextOptions]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-font-loop-text'],
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
          componentStyle,
          conditionStyle,
        )}
        id={chartId.current}
      >
        {addonBefore.show && (
          <span
            style={{
              ...addonBefore.textStyle,
              color: getRgbaString(addonBefore.textStyle.color),
            }}
          >
            {addonBefore.value}
          </span>
        )}
        <TextLoop {...animation}>
          {(finalValue.value || [])
            .filter((item: any) => typeof item === 'string')
            .map((item: any, index: number) => {
              return (
                <span
                  style={{
                    ...textStyle,
                    color: getRgbaString(textStyle.color),
                  }}
                  key={index}
                >
                  {item}
                </span>
              );
            })}
        </TextLoop>
        {addonAfter.show && (
          <span
            style={{
              ...addonAfter.textStyle,
              color: getRgbaString(addonAfter.textStyle.color),
            }}
          >
            {addonAfter.value}
          </span>
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

const WrapperLoopText: typeof LoopText & {
  id: ComponentData.TComponentSelfType;
} = LoopText as any;

WrapperLoopText.id = CHART_ID;

export default WrapperLoopText;
