import { useMemo, Fragment } from 'react';
import { Select } from 'antd';
import { useControllableValue } from 'ahooks';
import { connect } from 'dva';
import { pick } from 'lodash';
import { mapStateToProps, mapDispatchToProps } from './connect';
import BorderMap from './components/Border';
import { CommonBorderProps } from './components/Border/type';
import styles from './components/Border/index.less';

export { default as BorderMap } from './components/Border';
export * from './components/Border';

const _InternalBorderWrapper = (
  props: CommonBorderProps & {
    border: ComponentData.TComponentData['config']['style']['border'];
  },
) => {
  const { children, border, ...nextProps } = props;

  const Dom = useMemo(() => {
    if (!border.show) return null;
    return (BorderMap as any)[border.value]?.value || null;
  }, [border]);

  return (
    <>
      {Dom && <Dom {...nextProps}></Dom>}
      <div
        className={styles['internal-border-outer']}
        style={
          Dom?.getOuterStyle?.(pick(nextProps, ['width', 'padding'])) || {}
        }
      >
        {children}
      </div>
    </>
  );
};

export const InternalBorderWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_InternalBorderWrapper);

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
