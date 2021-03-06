import { CSSProperties, useMemo, useRef, useState } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { Rate as AntRate } from 'antd';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import { TRateConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'RATE';

const Rate = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TRateConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    config: { options },
  } = value;
  const {
    margin,
    backgroundColor,
    rateBackgroundColor,
    size,
    count,
    allowClear,
    allowHalf,
    defaultValue,
    shape,
  } = options;

  const [rateValue, setRateValue] = useState<number>(defaultValue);

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-interactive-rate'],
    );
  }, [className]);

  const { syncInteractiveAction } = useComponent<TRateConfig>(
    {
      component: value,
      global,
    },
    {
      current: {},
    } as any,
  );

  const onChange = (value: any) => {
    const target = value.target.value;
    syncInteractiveAction('change', {
      value: target,
    });
    setRateValue(target);
  };

  const iconNode = useMemo(() => {
    return <span className={classnames('bi', shape)} />;
  }, [shape, size]);

  return (
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
      <AntRate
        character={iconNode}
        value={rateValue}
        onChange={onChange}
        allowClear={allowClear}
        allowHalf={allowHalf}
        count={count}
        style={{
          // @ts-ignore
          '--component-rate-active-color': getRgbaString(rateBackgroundColor),
          '--component-rate-color': getRgbaString(backgroundColor),
          '--component-rate-size': size + 'px',
          '--component-rate-margin': margin + 'px',
        }}
      />
    </div>
  );
};

const WrapperRate: typeof Rate & {
  id: ComponentData.TComponentSelfType;
} = Rate as any;

WrapperRate.id = CHART_ID;

export default WrapperRate;
