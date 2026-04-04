import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TTitleConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const TitleBasic = (
  props: ComponentData.CommonComponentProps<TTitleConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { animation, condition, ...nextOptions } = options;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));

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
  } = useComponent<TTitleConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(() => {
    syncInteractiveAction('click', {
      value: finalValue.value,
    });
    linkageMethod('click', {
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
    );
  }, [className, animation]);

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
          <div style={componentStyle} className="w-100 h-100 dis-flex">
            {finalValue.value || ''}
          </div>
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

const WrapperTitleBasic: typeof TitleBasic & {
  id: ComponentData.TComponentSelfType;
} = TitleBasic as any;

WrapperTitleBasic.id = CHART_ID;

export default WrapperTitleBasic;
