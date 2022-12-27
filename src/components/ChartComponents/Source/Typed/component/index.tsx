import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { uniqueId, merge, noop } from 'lodash';
import classnames from 'classnames';
import TypedJs from 'typed.js';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TTypedConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Typed = (props: ComponentData.CommonComponentProps<TTypedConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      style: { border },
      options,
    },
  } = value;
  const { textStyle, loop, typeSpeed } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const textId = useRef<string>(uniqueId(CHART_ID + 'text'));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const typedRef = useRef<TypedJs>();

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TTypedConfig>(
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

  const componentStyle = useMemo(() => {
    const { color, ...nextTextStyle } = textStyle;
    let baseStyle: CSSProperties = {
      ...nextTextStyle,
      color: getRgbaString(textStyle.color),
    };
    return baseStyle;
  }, [textStyle]);

  const componentClassName = useMemo(() => {
    return classnames(className, styles['component-source-typed']);
  }, [className]);

  useEffect(() => {
    typedRef.current?.destroy?.();
    typedRef.current = new TypedJs(`#${textId.current}`, {
      strings: [finalValue.value],
      loop,
      typeSpeed,
    });
  }, [finalValue.value, loop, typeSpeed]);

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
          <div style={componentStyle}>
            <span id={textId.current}></span>
          </div>
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={noop}
        componentFilter={componentFilter}
        componentCondition={{
          initialState: 'visible',
          value: [],
        }}
      />
    </>
  );
};

const WrapperTyped: typeof Typed & {
  id: ComponentData.TComponentSelfType;
} = Typed as any;

WrapperTyped.id = CHART_ID;

export default WrapperTyped;
