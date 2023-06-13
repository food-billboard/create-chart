import { useCallback, useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import Input from '@/components/ChartComponents/Common/Input';
import Tooltip from '@/components/Tooltip';
import MapTable from '../../../MapTable';

function fieldTypeToString(
  type: 'string' | 'number' | 'number[]' | 'array[]' | 'string[]' | 'boolean',
) {
  if (type === 'string') {
    return '字符型字段';
  } else if (type === 'number') {
    return '数值型字段';
  } else if (type === 'number[]') {
    return '数值型数组字段';
  } else if (type === 'string[]') {
    return '字符型数组字段';
  } else if (type === 'boolean') {
    return '布尔型字段';
  } else {
    return '数组子项';
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
    (record: ComponentData.TComponentMapData, newMap: any) => {
      const { id } = record;
      const index = value.findIndex((item) => item.id === id);
      const target = value[index];
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
              value={value}
              onChange={onValueChange.bind(null, record)}
              placeholder={fieldTypeToString(record.type)}
            />
          );
        },
      },
    ];
  }, [onValueChange]);

  return <MapTable columns={columns} rowKey={'field'} dataSource={value} />;
};

export default FieldMap;
