import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import ColorSelect from '@/components/ColorSelect';
import { TTimeMachineConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'TIME_MACHINE';

const TimeMachineBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TTimeMachineConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value } = props;

  const [currentTime, setCurrentTime] = useState<moment.Moment>(moment());

  const {
    config: { options },
  } = value;
  const { formatter, icon, ...nextOptions } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const timerRef = useRef<any>(null);

  const componentStyle = useMemo(() => {
    const { textStyle } = nextOptions;
    let baseStyle: CSSProperties = {
      ...textStyle,
      color: getRgbaString(textStyle.color),
    };
    return baseStyle;
  }, [nextOptions]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-font-time-machine'],
    );
  }, [className]);

  const iconNode = useMemo(() => {
    const { show, margin, value, size, color, position } = icon;
    if (!show) return null;
    return (
      <span
        className={classnames('bi', value)}
        style={{
          fontSize: size + 'px',
          color: getRgbaString(color),
          ...(position === 'before'
            ? { marginRight: margin }
            : { marginLeft: margin }),
        }}
      />
    );
  }, [icon]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
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
    >
      {icon.position === 'before' && iconNode}
      {currentTime.format(formatter)}
      {icon.position === 'after' && iconNode}
    </div>
  );
};

const WrapperTimeMachineBasic: typeof TimeMachineBasic & {
  id: ComponentData.TComponentSelfType;
} = TimeMachineBasic as any;

WrapperTimeMachineBasic.id = CHART_ID;

export default WrapperTimeMachineBasic;
