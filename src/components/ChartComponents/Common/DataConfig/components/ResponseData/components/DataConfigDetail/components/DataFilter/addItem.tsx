import { useCallback, useMemo } from 'react';
import { Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

const { Option } = Select;

const DataFilter = (props: {
  dataSource: ComponentData.TFilterConfig[];
  value: ComponentData.TComponentFilterConfig[];
  onChange?: (value: ComponentData.TComponentFilterConfig[]) => void;
  onClick?: () => void;
  btnDisabled?: boolean;
}) => {
  const { dataSource, onClick, value, onChange, btnDisabled } = props;

  // 对已经添加的进行过滤
  const realCallback = useMemo(() => {
    return dataSource.filter((item) =>
      value.every((select) => select.id !== item.id),
    );
  }, [dataSource, value]);

  const onSelect = useCallback(
    (selectValue: string) => {
      if (!value.find((item) => item.id === selectValue)) {
        const newValue: ComponentData.TComponentFilterConfig[] = [
          ...value,
          {
            disabled: false,
            id: selectValue,
          },
        ];
        onChange?.(newValue);
      }
    },
    [value, onChange],
  );

  return (
    <div className={classnames('dis-flex')}>
      <Select
        className={styles['design-config-data-filter-add-item-select']}
        onSelect={onSelect}
        size="middle"
        value=""
      >
        {realCallback.map((callback) => {
          const { id, name } = callback;
          return (
            <Option value={id} key={id}>
              {name}
            </Option>
          );
        })}
      </Select>
      <Button
        className={styles['design-config-data-filter-add-item-btn']}
        onClick={onClick}
        size="middle"
        type="default"
        ghost
        icon={<PlusOutlined />}
        disabled={!!btnDisabled}
      ></Button>
    </div>
  );
};

export default DataFilter;
