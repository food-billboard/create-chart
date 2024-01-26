import { EllipsisOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Tree, Dropdown, App, Modal, Input } from 'antd';
import type { TreeProps, MenuProps } from 'antd';
import classnames from 'classnames';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  getDataSetGroupList,
  deleteDataSetGroup,
  addBroDataSetGroup,
  addChildDataSetGroup,
  updateDataSetGroup,
} from '@/services';
import styles from './index.less';

type NameEditModalRef = {
  open: (title: string, value: string) => void;
};

const NameEditModal = forwardRef<
  NameEditModalRef,
  { onOk: (value: string) => Promise<boolean> }
>(({ onOk }, ref) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleConfirm = useCallback(async () => {
    const result = await onOk(value);
    if (result) setVisible(false);
  }, [onOk, value]);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (title, value) => {
          setVisible(true);
          setValue(value);
          setTitle(title);
        },
      };
    },
    [],
  );

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={handleConfirm}
    >
      <Input
        className="w-100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
});

type TreeDataType = Required<TreeProps>['treeData'];

const GroupList = (props: {
  value?: string;
  onChange?: (currentGroup: string) => void;
}) => {
  const { modal } = App.useApp();

  const [dataSource, setDataSource] = useState<TreeDataType>([]);

  const [currentGroup, setCurrentGroup] = useControllableValue(props, {
    defaultValue: '',
  });

  const nameEditModalRef = useRef<NameEditModalRef>(null);
  const currentActionInfo = useRef({
    action: '',
    target: '',
  });

  const fetchData = async () => {
    const { data } = (await getDataSetGroupList()) as any;
    const format: (
      value: API_DATA_MANAGE.DataSetGroupData[],
    ) => TreeDataType = (value) => {
      return (value || []).map((item) => {
        const { label, value, children } = item;
        return {
          title: label,
          key: value,
          children: format(children || []),
        };
      });
    };
    setDataSource([
      {
        title: '全部',
        key: '',
        children: format(data),
      },
    ]);
  };

  const onActionOk = useCallback(async (value) => {
    const { target, action } = currentActionInfo.current;
    switch (action) {
      case 'add-child':
        await addChildDataSetGroup({ _id: target, label: value });
        break;
      case 'add-bro':
        await addBroDataSetGroup({ _id: target, label: value });
        break;
      case 'edit':
        await updateDataSetGroup({ _id: target, label: value });
    }
    return true;
  }, []);

  const handleTreeNodeAction = useCallback(
    ({ key: treeNodeKey, title }, { key: actionKey, domEvent }) => {
      domEvent?.stopPropagation();
      currentActionInfo.current = {
        target: treeNodeKey,
        action: actionKey,
      };
      switch (actionKey) {
        case 'add-child':
          nameEditModalRef.current?.open('新增子集', '');
          break;
        case 'add-bro':
          nameEditModalRef.current?.open('新增同级', '');
          break;
        case 'delete':
          modal.confirm({
            title: '提示',
            content: '是否确认删除',
            onOk: async () => {
              await deleteDataSetGroup({ _id: treeNodeKey });
              setCurrentGroup('');
            },
          });
          break;
        case 'edit':
          nameEditModalRef.current?.open('编辑', title);
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Tree
        blockNode
        showLine
        defaultExpandedKeys={['']}
        titleRender={(nodeData) => {
          const { title, key } = nodeData;
          let items: MenuProps['items'] = [];
          // 全部
          if (!key) {
            items = [
              {
                key: 'add-child',
                label: '新增子集',
              },
            ];
          } else {
            items = [
              {
                key: 'edit',
                label: '编辑',
              },
              {
                key: 'add-child',
                label: '新增子集',
              },
              {
                key: 'add-bro',
                label: '新增同级',
              },
              {
                key: 'delete',
                label: '删除',
              },
            ];
          }
          return (
            <div className={classnames(styles['group-list-title'], 'dis-flex')}>
              {title as string}
              <Dropdown
                menu={{
                  items,
                  onClick: handleTreeNodeAction.bind(null, nodeData),
                }}
              >
                <EllipsisOutlined className="c-po ac-i-size-m" />
              </Dropdown>
            </div>
          );
        }}
        treeData={dataSource}
        selectedKeys={[currentGroup]}
        onSelect={(value) => setCurrentGroup((value[0] as string) || '')}
      />
      <NameEditModal ref={nameEditModalRef} onOk={onActionOk} />
    </>
  );
};

export default GroupList;
