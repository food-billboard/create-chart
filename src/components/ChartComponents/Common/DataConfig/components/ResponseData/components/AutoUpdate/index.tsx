import { useCallback } from 'react';
import { Checkbox, InputNumber } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export type TValue =
  ComponentData.TComponentApiDataConfig['request']['frequency'];

const AutoUpdate = (props: {
  value?: TValue;
  onChange?: (value: TValue) => void;
}) => {
  const {
    value = {
      value: 1,
      show: false,
    },
    onChange,
  } = props;

  const onCheckChange = useCallback(
    (e: any) => {
      onChange?.({
        ...value,
        show: !!e.target.checked,
      });
    },
    [value, onChange],
  );

  const onInputChange = useCallback(
    (e) => {
      const realValue = parseFloat(e.target.value) || 1;
      onChange?.({
        ...value,
        value: realValue,
      });
    },
    [value, onChange],
  );

  return (
    <div
      className={classnames(
        styles['design-config-auto-update'],
        'design-config-format-font-size',
      )}
    >
      <Checkbox onChange={onCheckChange} checked={!!value.show}>
        自动更新请求
      </Checkbox>
      <InputNumber
        defaultValue={value.value || 0}
        disabled={!value.show}
        onBlur={onInputChange}
        controls={false}
      />
      {'  秒一次'}
    </div>
  );
};

export default AutoUpdate;
