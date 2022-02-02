import {} from 'react';
import classnames from 'classnames';
import FieldMap from './components/FieldMap';
import ResponseData from './components/ResponseData';
import styles from './index.less';

// 数据配置

const DataConfig = () => {
  return (
    <div
      className={classnames(
        styles['design-config-data'],
        'design-config-format-font-size',
      )}
    >
      <div
        className={classnames(styles['design-config-data-title'], 'border-1')}
      >
        <span className={classnames('text-ellipsis-2')}>数据接口</span>
      </div>
      <FieldMap />
      <div
        className={classnames(styles['design-config-data-title'], 'border-1')}
      >
        <span
          className={classnames(
            'text-ellipsis-2',
            styles['design-config-data-title-sub'],
          )}
        >
          数据响应结果
        </span>
      </div>
      <ResponseData />
    </div>
  );
};

export default DataConfig;
