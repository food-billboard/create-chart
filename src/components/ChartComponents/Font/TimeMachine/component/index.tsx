import classnames from 'classnames';
import dayjs from 'dayjs';
import { uniqueId, merge } from 'lodash';
import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react';
import { useLinkageInteractive } from '@/components/ChartComponents/Common/Component/hook/useLinkageInteractive';
import ColorSelect from '@/components/ColorSelect';
import { CHART_ID } from '../id';
import { TTimeMachineConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const TimeMachineBasic = (
  props: ComponentData.CommonComponentProps<TTimeMachineConfig>,
) => {
  const { className, style, value, children, global, wrapper: Wrapper } = props;
  const { screenType } = global;

  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  const {
    config: {
      options,
      style: { border },
      interactive: { linkage = [] } = {},
    },
  } = value;
  const { formatter, icon, ...nextOptions } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const timerRef = useRef<any>(null);

  const linkageMethod = useLinkageInteractive(linkage);

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

  const onClick = () => {
    screenType !== 'edit' && linkageMethod('click', {});
  };

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
      setCurrentTime(dayjs());
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
      onClick={onClick}
    >
      <Wrapper border={border}>
        {children}
        <div
          className={classnames(
            'w-100 h-100 dis-flex',
            styles['component-font-time-machine-main'],
          )}
        >
          {icon.position === 'before' && iconNode}
          {currentTime.format(formatter)}
          {icon.position === 'after' && iconNode}
        </div>
      </Wrapper>
    </div>
  );
};

const WrapperTimeMachineBasic: typeof TimeMachineBasic & {
  id: ComponentData.TComponentSelfType;
} = TimeMachineBasic as any;

WrapperTimeMachineBasic.id = CHART_ID;

export default WrapperTimeMachineBasic;
