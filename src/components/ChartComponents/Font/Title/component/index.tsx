import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
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
    config: { options },
  } = value;
  const { animation, ...nextOptions } = options;

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
  } = useComponent<TTitleConfig>(
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
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
          componentStyle,
        )}
        id={chartId.current}
        onClick={onClick}
      >
        {finalValue.value || ''}
      </div>
      <FetchFragment
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperTitleBasic: typeof TitleBasic & {
  id: ComponentData.TComponentSelfType;
} = TitleBasic as any;

WrapperTitleBasic.id = CHART_ID;

export default WrapperTitleBasic;
