import { Children, ReactNode, useCallback, useMemo, cloneElement } from 'react';
import { Radio as AntRadio } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
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

export const Radio = (props: {
  value?: string;
  icon: ReactNode;
  className?: string;
  parentValue?: string;
  onChange?: (value: string) => void;
}) => {
  const { icon, value, className, parentValue, onChange, ...nextProps } = props;

  return (
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
};

export default IconRadio;
