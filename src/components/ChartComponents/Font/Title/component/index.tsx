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
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TTitleConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'TITLE';

const TitleBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TTitleConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const { animation, condition, ...nextOptions } = options;

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
  } = useComponent<TTitleConfig>(
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

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
  }, [syncInteractiveAction, finalValue]);

  const componentStyle = useMemo(() => {
    const {
      textStyle,
      align: { vertical, horizontal },
      orient,
    } = nextOptions;
    let baseStyle: CSSProperties = {
      ...textStyle,
      color: getRgbaString(textStyle.color),
      justifyContent: horizontal,
      alignItems: vertical,
      writingMode: orient as any,
      whiteSpace: orient === 'vertical-lr' ? 'pre' : 'nowrap',
    };
    return baseStyle;
  }, [nextOptions]);

  const componentClassName = useMemo(() => {
    const { show, delay, repeat, value, speed } = animation;
    return classnames(
      className,
      'dis-flex',
      styles['component-font-title'],
      {
        animate__animated: show,
      },
      delay,
      repeat,
      value,
      speed,
      conditionClassName,
    );
  }, [className, animation, conditionClassName]);

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
        onClick={onClick}
      >
        {finalValue.value || ''}
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

const WrapperTitleBasic: typeof TitleBasic & {
  id: ComponentData.TComponentSelfType;
} = TitleBasic as any;

WrapperTitleBasic.id = CHART_ID;

export default WrapperTitleBasic;
