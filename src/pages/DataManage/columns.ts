import type { TableColumnType } from 'antd';

const columns: TableColumnType<any>[] = [
  {
    title: '数据源名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '类型',
    key: 'dataType',
    dataIndex: 'dataType',
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
