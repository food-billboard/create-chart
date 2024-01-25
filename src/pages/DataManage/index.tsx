import { Table, Input, Button, Space, Popconfirm } from 'antd';
import type { ButtonProps, TableColumnType } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getDataSourceList, deleteDataSource } from '@/services';
import columns from './columns';
import EditModal, { EditModalRef } from './components/EditModal';
import TestDataButton from './components/TestDataButton';
import styles from './index.less';

const DataManage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useState<
    API_DATA_MANAGE.DataSourceData[]
  >([]);

  const editModalRef = useRef<EditModalRef>(null);

  const handleAdd = useCallback((value?: API_DATA_MANAGE.DataSourceData) => {
    editModalRef.current?.open(value);
  }, []);

  const handleDelete = useCallback(
    async ({ _id }: API_DATA_MANAGE.DataSourceData) => {
      await deleteDataSource({ _id });
      setSearchValue('');
      setCurrentPage(1);
    },
    [],
  );

  const tableColumns: TableColumnType<API_DATA_MANAGE.DataSourceData>[] = [
    ...columns,
    {
      key: 'op',
      dataIndex: 'op',
      title: '操作',
      render: (_, record) => {
        const commonProps: ButtonProps = {
          style: {
            paddingLeft: 0,
          },
          type: 'link',
        };
        return (
          <>
            <TestDataButton _id={record._id} buttonProps={commonProps} />
            <Button {...commonProps} onClick={handleAdd.bind(null, record)}>
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除"
              onConfirm={handleDelete.bind(null, record)}
            >
              <Button {...commonProps}>删除</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const fetchData = async () => {
    const { data, total } = (await getDataSourceList({
      current: currentPage,
      pageSize: 10,
      content: searchValue,
    })) as any;
    setTotal(total || 0);
    setDataSource(data || []);
  };

  const onEditOk = useCallback(() => {
    setSearchValue('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className={styles['data-manage']}>
      <div className={styles['data-manage-search']}>
        <Space>
          <Input.Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={fetchData}
          />
          <Button type="primary" onClick={handleAdd.bind(null, undefined)}>
            新增
          </Button>
        </Space>
      </div>
      <div className={styles['data-manage-table']}>
        <Table
          dataSource={dataSource}
          columns={tableColumns}
          pagination={{
            current: currentPage,
            total,
            pageSize: 10,
            onChange: setCurrentPage,
          }}
          scroll={{ x: 'max-content' }}
          rowKey={'_id'}
        />
      </div>
      <EditModal ref={editModalRef} onOk={onEditOk} />
    </div>
  );
};

export default DataManage;
