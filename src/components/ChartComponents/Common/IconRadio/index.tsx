import { useControllableValue } from 'ahooks';
import { Radio as AntRadio } from 'antd';
import type { TooltipProps } from 'antd';
import type { RadioProps } from 'antd/es/radio';
import classnames from 'classnames';
import { Children, ReactNode, useMemo, cloneElement } from 'react';
import Tooltip from '../Tooltip';
import styles from './index.less';

const IconRadio = (props: {
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}) => {
  const { children } = props;
  const [value, setValue] = useControllableValue<string>(props);

  const realChildren = useMemo(() => {
    return Children.map(children, (child) => {
      return cloneElement(child as any, {
        parentValue: value,
        onChange: setValue,
      });
    });
  }, [children, value]);

  return <AntRadio.Group value={value}>{realChildren}</AntRadio.Group>;
};

export const Radio = (
  props: {
    value?: string;
    icon: ReactNode;
    className?: string;
    parentValue?: string;
    onChange?: (value: string) => void;
    tooltip?: boolean | TooltipProps;
  } & Partial<RadioProps>,
) => {
  const {
    icon,
    value,
    className,
    parentValue,
    onChange,
    tooltip = false,
    title,
    ...nextProps
  } = props;

  const children = (
    <AntRadio
      className={classnames(className, styles['icon-radio'], {
        [styles['icon-radio-active']]: value === parentValue,
      })}
      onClick={onChange?.bind(null, value!)}
      {...nextProps}
    >
      {icon}
    </AntRadio>
  );

  if (!tooltip) return children;

  return (
    <Tooltip title={title} {...(tooltip === true ? {} : tooltip)}>
      {children}
    </Tooltip>
  );
};

export default IconRadio;
