import { useCallback, useRef } from 'react';
import { Checkbox, InputNumber } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import styles from './index.less';

type TValue = ComponentData.TComponentApiDataConfig['request']['frequency'];

const AutoUpdate = (props: {
  value?: TValue;
  onChange?: (value?: TValue) => void;
}) => {
  const [value, setValue] = useControllableValue<TValue>(props, {
    defaultValue: {
      show: false,
      value: 1,
    },
  });

  const onCheckChange = useCallback(
    (e: any) => {
      setValue({
        ...value,
        show: !!e.target.checked,
      });
    },
    [value],
  );

  const onInputChange = useCallback(
    (inputValue) => {
      const realValue = parseFloat(inputValue) || 1;
      setValue({
        ...value,
        value: realValue,
      });
    },
    [value],
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
        onChange={onInputChange}
        controls={false}
      />
      {'  秒一次'}
    </div>
  );
};

export default AutoUpdate;
