import { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { InfoCircleOutlined } from '@ant-design/icons';
import { getComponent, getPath } from '@/utils/Assist/Component';
import FieldMap from './components/FieldMap';
import ResponseData from './components/ResponseData';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

// 数据配置

const DataConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { id, components, setComponent } = props;

  const component: ComponentData.TComponentData = useMemo(() => {
    return getComponent(id, components);
  }, [id, components]);

  const isDisabled = !!component.config.data?.disabled;

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

  const fieldMap = component.config?.data?.filter?.map || [];

  const onValueChange = useCallback(
    (value: ComponentMethod.SetComponentMethodParamsData['value']) => {
      setComponent({
        value,
        id,
        path: getPath(id),
        action: 'update',
      });
    },
    [setComponent, id],
  );

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

export default connect(mapStateToProps, mapDispatchToProps)(DataConfig);
