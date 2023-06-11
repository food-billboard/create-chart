import { useCallback } from 'react';
import { Checkbox } from 'antd';
import classnames from 'classnames';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ScreenComponentConfigChangeTooltip from '@/components/ScreenComponentConfigChangeTooltip';
import styles from './index.less';

export type TValue = Partial<
  ComponentData.TComponentApiDataConfig['request']['frequency']
>;

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
        show: !!e.target.checked,
      });
    },
    [value, onChange],
  );

  const onInputChange = useCallback(
    (value) => {
      const realValue = parseFloat(value) || 1;
      onChange?.({
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
        value={value.value || 0}
        disabled={!value.show}
        onChange={onInputChange}
        controls={false}
      />
      {'  秒一次'}
      <ScreenComponentConfigChangeTooltip
        iconClassName="m-l-4"
        id="/DataConfig/ResponseData/AutoUpdate"
      />
    </div>
  );
};

export default AutoUpdate;
