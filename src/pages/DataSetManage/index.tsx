import { Table, Input, Button, Space, Popconfirm, Select } from 'antd';
import type { ButtonProps, TableColumnType } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getDataSetList, deleteDataSource } from '@/services';
import { DATA_SET_TYPE_MAP } from '@/utils/constants';
import columns from './columns';
import AddModal from './components/AddModal';
import EditModal, { EditModalRef } from './components/EditModal';
import GroupList from './components/GroupList';
import styles from './index.less';

const DataSetManage = () => {
  const [currentGroup, setCurrentGroup] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchDataBaseType, setSearchDataBaseType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [dataSource, setDataSource] = useState<API_DATA_MANAGE.DataSetData[]>(
    [],
  );

  const editModalRef = useRef<EditModalRef>(null);

  const handleAdd = useCallback(
    (value: string | API_DATA_MANAGE.DataSetData) => {
      // editModalRef.current?.open(value);
    },
    [],
  );

  const handleDelete = useCallback(
    async ({ _id }: API_DATA_MANAGE.DataSetData) => {
      await deleteDataSource({ _id });
      setSearchValue('');
      setCurrentPage(1);
    },
    [],
  );

  const tableColumns: TableColumnType<API_DATA_MANAGE.DataSetData>[] = [
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
    const { data, total } = (await getDataSetList({
      current: currentPage,
      pageSize: 10,
      content: searchValue,
      type: searchDataBaseType,
    })) as any;
    setTotal(total || 0);
    setDataSource(data || []);
  };

  const handleReset = () => {
    setSearchValue('');
    setSearchDataBaseType('');
    setCurrentPage(1);
  };

  const onEditOk = useCallback(() => {
    handleReset();
  }, []);

  const onGroupChange = useCallback((value) => {
    handleReset();
    setCurrentGroup(value);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, currentGroup]);

  return (
    <div className={styles['data-set-manage']}>
      <div className={styles['data-set-manage-search']}>
        <Space>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200 }}
            placeholder="请输入数据集名称搜索"
          />
          <Select
            options={[{ label: '全部', value: '' }, ...DATA_SET_TYPE_MAP]}
            value={searchDataBaseType}
            onChange={setSearchDataBaseType}
            style={{ width: 200 }}
          />
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={fetchData}>
            查询
          </Button>
          <AddModal onChange={handleAdd} />
        </Space>
      </div>
      <div className="dis-flex">
        <div className={styles['data-set-manage-left']}>
          <GroupList value={currentGroup} onChange={onGroupChange} />
        </div>
        <div className={styles['data-set-manage-right']}>
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
        </div>
      </div>
      <EditModal ref={editModalRef} onOk={onEditOk} />
    </div>
  );
};

export default DataSetManage;
