import type { TableColumnType } from 'antd';

const columns: TableColumnType<any>[] = [
  {
    title: '数据集名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '数据集类型',
    key: 'dataType',
    dataIndex: 'dataType',
  },
  {
    title: '分组',
    key: 'memo',
    dataIndex: 'memo',
  },
  {
    title: '备注',
    key: 'memo',
    dataIndex: 'memo',
  },
  {
    title: '最近操作时间',
    key: 'updatedAt',
    dataIndex: 'updatedAt',
  },
];

export default columns;
