import { useMemo, useRef, useState, useEffect } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { boxShadow as boxShadowMethod } from '@/components/ChartComponents/Common/utils';
import ColorSelect from '@/components/ColorSelect';
// @ts-ignore
import ReactSwitch from './components/Switch';
import { TSwitchConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString, getHexString } = ColorSelect;

const Switch = (props: ComponentData.CommonComponentProps<TSwitchConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    config: {
      options,
      style: { width, height, border },
    },
  } = value;
  const {
    defaultChecked,
    offColor,
    onColor,
    onHandleColor,
    offHandleColor,
    checkedIcon,
    uncheckedIcon,
    boxShadow,
    activeBoxShadow,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const [checked, setChecked] = useState<boolean>(!!defaultChecked);

  const { syncInteractiveAction } = useComponent<TSwitchConfig>(
    {
      component: value,
      global,
    },
    {
      current: {},
    } as any,
  );

  const onChange = (value: any) => {
    setChecked(value);
    syncInteractiveAction('change', {
      value,
    });
  };

  const checkedIconDom = useMemo(() => {
    if (!checkedIcon.show) return false;
    return (
      <i
        className={classnames(
          'bi',
          'dis-flex',
          'w-100',
          'h-100',
          styles['component-interactive-switch-icon'],
          {
            [checkedIcon.value]: checkedIcon.type === 'icon',
          },
        )}
        style={{
          fontSize: height * 0.5,
          color: getRgbaString(checkedIcon.color),
        }}
      >
        {checkedIcon.type === 'text' && checkedIcon.value}
      </i>
    );
  }, [checkedIcon, height]);

  const uncheckedIconDom = useMemo(() => {
    if (!uncheckedIcon.show) return false;
    return (
      <i
        className={classnames(
          'bi',
          'dis-flex',
          'w-100',
          'h-100',
          styles['component-interactive-switch-icon'],
          {
            [uncheckedIcon.value]: uncheckedIcon.type === 'icon',
          },
        )}
        style={{
          fontSize: height * 0.5,
          color: getRgbaString(uncheckedIcon.color),
        }}
      >
        {uncheckedIcon.type === 'text' && uncheckedIcon.value}
      </i>
    );
  }, [uncheckedIcon, height]);

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-switch'],
    );
  }, [className]);

  useEffect(() => {
    setChecked(!!defaultChecked);
  }, [defaultChecked]);

  useEffect(() => {
    onChange(!!defaultChecked);
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
        <Wrapper border={border}>
          {children}
          <ReactSwitch
            width={width}
            height={height}
            checked={checked}
            onChange={onChange}
            offColor={getHexString(offColor, true)}
            onColor={getHexString(onColor, true)}
            onHandleColor={getHexString(onHandleColor, true)}
            offHandleColor={getHexString(offHandleColor, true)}
            checkedIcon={checkedIconDom}
            uncheckedIcon={uncheckedIconDom}
            boxShadow={boxShadowMethod(boxShadow) || undefined}
            activeBoxShadow={boxShadowMethod(activeBoxShadow) || undefined}
            handleDiameter={height * 0.8}
          />
        </Wrapper>
      </div>
    </>
  );
};

const WrapperSwitch: typeof Switch & {
  id: ComponentData.TComponentSelfType;
} = Switch as any;

WrapperSwitch.id = CHART_ID;

export default WrapperSwitch;
