import { useMemo } from 'react';
import { Select } from 'antd';
import { useControllableValue } from 'ahooks';
import { pick } from 'lodash';
import classNames from 'classnames';
import { useMobxContext } from '@/hooks';
import BorderMap from './components/Border';
import { CommonBorderProps } from './components/Border/type';
import styles from './components/Border/index.less';

export { default as BorderMap } from './components/Border';
export * from './components/Border';

export const getTargetBorder = (
  border: ComponentData.TComponentData['config']['style']['border'],
) => {
  if (!border.show) return null;
  return (BorderMap as any)[border.value]?.value || null;
};

export const InternalBorderWrapper = (
  props: Omit<CommonBorderProps, 'width' | 'padding'>,
) => {
  const { children, border = { show: false }, ...nextProps } = props;
  const {
    global: {
      screenData: {
        config: {
          attr: {
            componentBorder: { width, padding },
          },
        },
      },
    },
  } = useMobxContext();

  const Dom = useMemo(() => {
    return getTargetBorder(
      border as ComponentData.TComponentData['config']['style']['border'],
    );
  }, [border]);

  return (
    <>
      {Dom && <Dom {...nextProps} width={width} padding={padding}></Dom>}
      <div
        className={classNames(styles['internal-border-outer'])}
        style={
          Dom?.getOuterStyle?.(pick(nextProps, ['width', 'padding'])) || {}
        }
        data-id={nextProps.id}
      >
        {children}
      </div>
    </>
  );
};

export const InternalBorderSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, onChange] = useControllableValue(props);

  return (
    <Select
      className="w-100"
      value={value}
      onChange={onChange}
      options={Object.entries(BorderMap).map((item) => {
        const [key, { title }] = item;
        return {
          label: title,
          value: key,
        };
      })}
    />
  );
};
