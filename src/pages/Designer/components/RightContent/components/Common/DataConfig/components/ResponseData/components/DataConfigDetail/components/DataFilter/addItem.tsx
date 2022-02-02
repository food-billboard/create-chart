import { useCallback, useMemo } from 'react';
import { Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { Option } = Select;

const DataFilter = (props: {
  filter: ComponentData.TFilterConfig[];
  setCallbackData: (value: ComponentData.TFilterConfig[]) => void;
}) => {
  const { filter, setCallbackData } = props;

  // 对已经添加的进行过滤
  const realCallback = useMemo(() => {
    return filter;
  }, []);

  const handleAdd = useCallback(() => {}, []);

  return (
    <div className={classnames('dis-flex')}>
      <Select className={styles['design-config-data-filter-add-item-select']}>
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
        onClick={handleAdd}
        type="default"
        ghost
        icon={<PlusOutlined />}
      ></Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFilter);
