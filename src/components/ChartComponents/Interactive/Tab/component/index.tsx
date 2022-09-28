import {
  CSSProperties,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TTabConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'TAB';

const TabBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TTabConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const { className, style, value, global, children } = props;

  const {
    id,
    config: { options },
  } = value;
  const { active, base, loop } = options;
  const { screenType } = global;

  const [activeTab, setActiveTab] = useState<number>(0);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const loopTimerRef = useRef<any>();

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TTabConfig>(
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
          style={activeTab === index ? activeStyle : baseStyle}
        >
          {value}
        </div>
      );
    });
  }, [finalValue, activeTab, onClick, baseStyle, activeStyle]);

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

  useEffect(() => {
    syncInteractiveAction('loop', finalValue?.[0] || '');
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
        {children}
        {domList}
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
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
