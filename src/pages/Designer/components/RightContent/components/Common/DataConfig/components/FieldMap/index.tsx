import { useCallback, useMemo } from 'react';
import { Table, Input, Tooltip } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import styles from './index.less';

function fieldTypeToString(type: 'string' | 'number') {
  if (type === 'string') {
    return '字符型字段';
  } else {
    return '数值型字段';
  }
}

const FieldMap = (props: { value?: ComponentData.TComponentMapData[] }) => {
  const [value, setValue] = useControllableValue<
    ComponentData.TComponentMapData[]
  >(props, {
    defaultValue: [
      {
        field: 'name',
        map: '',
        id: '0',
        description: '字符型字段',
        type: 'string',
      },
    ],
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

  return (
    <Table
      columns={columns}
      rowKey={'id'}
      bordered={false}
      className={classnames(styles['design-config-api-field-map'])}
      dataSource={value}
      pagination={false}
    />
  );
};

export default FieldMap;
