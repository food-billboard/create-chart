import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useUpdateEffect } from 'ahooks';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import { TTabConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const TabBasic = (props: ComponentData.CommonComponentProps<TTabConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { active, base, loop, defaultValue } = options;
  const { screenType } = global;

  // @ts-ignore
  const [activeTab, setActiveTab] = useState<number>(defaultValue);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const loopTimerRef = useRef<any>();

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
    getValue,
    requestUrl = '',
    componentFilter = [],
    value: processedValue = [],
    componentFilterMap = [],
  } = useComponent<TTabConfig>({
    component: value,
    global,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const realActiveTab: number = useMemo(() => {
    if (typeof activeTab === 'string') {
      const index = finalValue.findIndex(
        (item: any) => item.value == activeTab,
      );
      return !!~index ? index : 0;
    }
    return activeTab;
  }, [activeTab, finalValue]);

  const valueWidth = useMemo(() => {
    return 100 / finalValue.length;
  }, [finalValue]);

  const onTimerChange = () => {
    setActiveTab((prev) => {
      let next = prev + 1;
      next = next % finalValue.length;
      const target = finalValue[next];
      syncInteractiveAction('loop', target);
      return next;
    });
  };

  const onClick = useCallback(
    (item: any, index: number) => {
      syncInteractiveAction('click', item);
      linkageMethod('click-item', item);
      setActiveTab(index);
      loopTimerRef.current && clearInterval(loopTimerRef.current);
      const { show, speed } = loop;
      if (show && screenType !== 'edit') {
        loopTimerRef.current = setInterval(onTimerChange, speed);
      }
    },
    [syncInteractiveAction, loop, screenType],
  );

  const activeStyle = useMemo(() => {
    const { border, textStyle, backgroundColor, ...nextActiveStyle } = active;
    return {
      ...nextActiveStyle,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
      border: `${border.width}px ${border.type} ${getRgbaString(border.color)}`,
      width: valueWidth + '%',
      boxShadow: `0 0 10px ${getRgbaString(border.color)}`,
    };
  }, [active]);

  const baseStyle = useMemo(() => {
    const { border, textStyle, backgroundColor, ...nextBaseStyle } = base;
    return {
      ...nextBaseStyle,
      ...textStyle,
      color: getRgbaString(textStyle.color),
      backgroundColor: getRgbaString(backgroundColor),
      border: `${border.width}px ${border.type} ${getRgbaString(border.color)}`,
      width: valueWidth + '%',
    };
  }, [base]);

  const domList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      const { name, value } = item;
      return (
        <div
          key={name}
          className={styles['component-interactive-tab-item']}
          onClick={onClick.bind(null, item, index)}
          style={merge({}, realActiveTab === index ? activeStyle : baseStyle, {
            borderRadius: DEFAULT_BORDER_RADIUS,
          })}
        >
          {value}
        </div>
      );
    });
  }, [finalValue, realActiveTab, onClick, baseStyle, activeStyle]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-interactive-tab'],
    );
  }, [className]);

  useEffect(() => {
    const { show, speed } = loop;
    if (!show || screenType === 'edit') {
      loopTimerRef.current !== 'undefined' &&
        clearInterval(loopTimerRef.current);
    } else {
      loopTimerRef.current = setInterval(onTimerChange, speed);
    }
    return () => {
      clearInterval(loopTimerRef.current);
    };
  }, [loop, finalValue, screenType]);

  useUpdateEffect(() => {
    // @ts-ignore
    setActiveTab(defaultValue);
  }, [defaultValue]);

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
        <Wrapper border={border}>
          {children}
          <div className="dis-flex w-100 h-100">{domList}</div>
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperTabBasic: typeof TabBasic & {
  id: ComponentData.TComponentSelfType;
} = TabBasic as any;

WrapperTabBasic.id = CHART_ID;

export default WrapperTabBasic;
