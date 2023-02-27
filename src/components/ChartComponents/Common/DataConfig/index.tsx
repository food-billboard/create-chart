import { useCallback } from 'react';
import classnames from 'classnames';
import { InfoCircleOutlined } from '@ant-design/icons';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import FieldMap from './components/FieldMap';
import ResponseData from './components/ResponseData';
import styles from './index.less';

// 数据配置

const DataConfig = (props: {
  id: string;
  component: ComponentData.TComponentData;
}) => {
  const { id, component } = props;

  const isDisabled = !!component.config.data?.disabled;

  const fieldMap = component.config?.data?.filter?.map || [];

  const onValueChange = useCallback(
    (value: ComponentMethod.SetComponentMethodParamsData['value']) => {
      DataChangePool.setComponent({
        value,
        id,
        path: getPath(id),
        action: 'update',
      });
    },
    [id],
  );

  if (isDisabled) {
    return (
      <div
        className={classnames(
          styles['design-config-data'],
          styles['design-config-data-empty'],
          'design-config-format-font-size',
        )}
      >
        <InfoCircleOutlined style={{ marginRight: 4 }} />
        该组件无数据配置
      </div>
    );
  }

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
      <FieldMap
        value={fieldMap}
        onChange={(value) =>
          onValueChange({
            config: {
              data: {
                filter: {
                  map: value,
                },
              },
            },
          })
        }
      />
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
      <ResponseData value={component} onChange={onValueChange} />
    </div>
  );
};

export default DataConfig;
