import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import { useCallback, useMemo } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import styles from './index.less';

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
        options={realCallback.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
      />
      <Button
        className={styles['design-config-data-filter-add-item-btn']}
        onClick={onClick}
        size="middle"
        type="default"
        // ghost
        icon={<PlusOutlined />}
        disabled={!!btnDisabled}
      ></Button>
    </div>
  );
};

export default DataFilter;
