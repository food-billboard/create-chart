import { useCallback, useMemo } from 'react';
import { Input, Tooltip } from 'antd';
import { useControllableValue } from 'ahooks';
import MapTable from '../../../MapTable';

function fieldTypeToString(type: 'string' | 'number') {
  if (type === 'string') {
    return '字符型字段';
  } else {
    return '数值型字段';
  }
}

const FieldMap = (props: {
  value?: ComponentData.TComponentMapData[];
  onChange?: (value: ComponentData.TComponentMapData[]) => void;
}) => {
  const [value, setValue] = useControllableValue<
    ComponentData.TComponentMapData[]
  >(props, {
    defaultValue: [],
  });

  const onValueChange = useCallback(
    (record: ComponentData.TComponentMapData, e: any) => {
      const { id } = record;
      const index = value.findIndex((item) => item.id === id);
      const target = value[index];
      const newMap = e.target.value;
      const newValue = [...value];
      newValue.splice(index, 1, {
        ...target,
        map: newMap,
      });
      setValue(newValue);
    },
    [setValue, value],
  );

  const columns = useMemo(() => {
    return [
      {
        key: 'field',
        title: '字段',
        dataIndex: 'field',
        render: (value: string, record: ComponentData.TComponentMapData) => {
          return <Tooltip title={record.description}>{value}</Tooltip>;
        },
      },
      {
        key: 'map',
        title: '映射',
        dataIndex: 'map',
        width: 140,
        render: (value: string, record: ComponentData.TComponentMapData) => {
          return (
            <Input
              className="w-100"
              defaultValue={value}
              onBlur={onValueChange.bind(null, record)}
              placeholder={fieldTypeToString(record.type)}
            />
          );
        },
      },
    ];
  }, [onValueChange]);

  return <MapTable columns={columns} rowKey={'id'} dataSource={value} />;
};

export default FieldMap;
