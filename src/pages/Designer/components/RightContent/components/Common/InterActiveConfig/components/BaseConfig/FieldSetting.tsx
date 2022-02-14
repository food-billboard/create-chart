import { useMemo, useCallback } from 'react';
import { Input } from 'antd';
import { getPath } from '@/utils/Assist/Component';
import MapTable from '../../../MapTable';

const FieldSetting = (props: {
  value: ComponentData.TBaseInteractiveConfig;
  onChange?: ComponentMethod.SetComponentMethod;
  id: string;
  dataSource: ComponentData.TBaseInteractiveConfig[];
}) => {
  const { value, onChange, id, dataSource } = props;
  const { name, fields } = value;

  const onFieldMapChange = useCallback(
    (value: ComponentData.TBaseInteractiveConfigField, e) => {
      const path = getPath(id);
      const mapValue = e.target.value;

      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: item.fields.map((item) => {
                    if (item.key !== value.key) return item;
                    return {
                      ...item,
                      variable: mapValue,
                    };
                  }),
                };
              }),
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    },
    [id, onChange],
  );

  const columns = useMemo(() => {
    return [
      {
        key: 'key',
        title: '字段',
        dataIndex: 'key',
      },
      {
        key: 'variable',
        title: '绑定到变量',
        dataIndex: 'variable',
        width: 140,
        render: (
          value: string,
          record: ComponentData.TBaseInteractiveConfigField,
        ) => {
          return (
            <Input
              className="w-100"
              defaultValue={value}
              onBlur={onFieldMapChange.bind(null, record)}
              placeholder="可自定义"
            />
          );
        },
      },
      {
        key: 'description',
        title: '字段说明',
        dataIndex: 'description',
      },
    ];
  }, [onChange, onFieldMapChange]);

  return <MapTable dataSource={fields} columns={columns} rowKey="key" />;
};

export default FieldSetting;
