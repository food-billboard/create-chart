import {} from 'react';
import {} from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const DataFilter = (props: { disabled?: boolean }) => {
  const { disabled } = props;

  return (
    <div
      className={classnames(
        styles['design-config-data-filter'],
        {
          [styles['design-config-data-filter-disabled']]: disabled,
        },
        'border-1',
      )}
    ></div>
  );
};

export default DataFilter;
