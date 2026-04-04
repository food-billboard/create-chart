import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { CSSProperties, useMemo, useRef } from 'react';
import { TextLoop } from 'react-text-loop-next';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TLoopTextConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const LoopText = (
  props: ComponentData.CommonComponentProps<TLoopTextConfig>,
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
    condition,
    addonBefore,
    addonAfter,
    textStyle,
    ...nextOptions
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TLoopTextConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const onClick = (value: string) => {
    linkageMethod('click', { value });
  };

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
    );
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
      >
        <Wrapper border={border}>
          {children}
          <div className="w-100 h-100 dis-flex" style={componentStyle}>
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
                      onClick={onClick.bind(null, item)}
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

const WrapperLoopText: typeof LoopText & {
  id: ComponentData.TComponentSelfType;
} = LoopText as any;

WrapperLoopText.id = CHART_ID;

export default WrapperLoopText;
