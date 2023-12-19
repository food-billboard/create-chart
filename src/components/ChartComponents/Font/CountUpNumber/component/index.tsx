import { useDeepCompareEffect } from 'ahooks';
import classnames from 'classnames';
import { CountUp } from 'countup.js';
import { uniqueId, merge, round as mathRound } from 'lodash';
import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TCountUpNumberConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const EASING_FN_MAP = {
  easeOutExpo: undefined,
  outQuintic: (t: any, b: any, c: any, d: any) => {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
  },
  outCubic: (t: any, b: any, c: any, d: any) => {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  },
};

const CountUpNumberBasic = (
  props: ComponentData.CommonComponentProps<TCountUpNumberConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    animation,
    addonBefore,
    addonAfter,
    thousands,
    round,
    decimal,
    condition,
    ...nextOptions
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const chartInstance = useRef<CountUp>();

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TCountUpNumberConfig>({
    component: value,
    global,
  });

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const calculateValue = useMemo(() => {
    const { value } = finalValue;
    const { show, length } = round;
    const realValue = parseFloat(value) || 0;
    return show ? mathRound(realValue, length) : realValue;
  }, [finalValue, round]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentStyle = useMemo(() => {
    const { textStyle, align } = nextOptions;
    let baseStyle: CSSProperties = {
      ...textStyle,
      alignItems: align.vertical,
      justifyContent: align.horizontal,
      color: getRgbaString(textStyle.color),
    };
    return baseStyle;
  }, [nextOptions]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-font-count-up-number'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  useDeepCompareEffect(() => {
    chartInstance.current = new CountUp(
      document.querySelector(`#${chartId.current}`) as any,
      0,
      {
        duration: animation.duration,
        useGrouping: thousands.show,
        separator: thousands.content,
        // prefix: addonBefore.show ? addonBefore.content : '',
        // suffix: addonAfter.show ? addonAfter.content : '',
        decimal,
        useEasing: true,
        easingFn: EASING_FN_MAP[animation.easingFn],
        decimalPlaces: round.length,
      },
    );
    chartInstance.current.start();
  }, [animation, addonBefore, thousands, addonAfter, decimal, round]);

  useDeepCompareEffect(() => {
    chartInstance.current?.update(calculateValue);
  }, [calculateValue, options]);

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
        onClick={onClick}
      >
        <Wrapper border={border}>
          <div className="w-100 h-100 dis-flex" style={componentStyle}>
            <span>{addonBefore.show ? addonBefore.content : ''}</span>
            <div
              id={chartId.current}
              className={styles['component-font-count-up-number-main']}
            >
              {calculateValue || ''}
            </div>
            <span>{addonAfter.show ? addonAfter.content : ''}</span>
          </div>
          {children}
        </Wrapper>
      </div>
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

const WrapperTitleBasic: typeof CountUpNumberBasic & {
  id: ComponentData.TComponentSelfType;
} = CountUpNumberBasic as any;

WrapperTitleBasic.id = CHART_ID;

export default WrapperTitleBasic;
