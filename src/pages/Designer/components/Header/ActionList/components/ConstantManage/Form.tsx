import { PlusOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Button, Drawer, Input, Table } from 'antd';
import { nanoid } from 'nanoid';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { connect } from 'umi';
import FocusWrapper from '@/components/FocusWrapper';
import GhostButton from '@/components/GhostButton';
import { mapDispatchToProps, mapStateToProps } from './connect';

const { TextArea } = Input;

export interface ConstantManageRef {
  open: () => void;
}

export interface ConstantManageProps {
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
}

const ConstantList = (props: {
  constants: ComponentData.TConstants[];
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const { constants = [], setScreen } = props;

  const onConstantsChange = useCallback(
    (value: ComponentData.TConstants[]) => {
      setScreen({
        config: {
          attr: {
            constants: value,
          },
        },
      });
    },
    [setScreen],
  );

  const deleteData = useCallback(
    (value: ComponentData.TConstants) => {
      const { id } = value;
      const newValue = constants.filter((item) => item.id !== id);
      onConstantsChange(newValue);
    },
    [constants, onConstantsChange],
  );

  const updateValue = useCallback(
    (value: ComponentData.TConstants) => {
      const newValue = constants.map((item) => {
        if (item.id !== value.id) return item;
        return {
          ...item,
          ...value,
        };
      });
      onConstantsChange(newValue);
    },
    [onConstantsChange, constants],
  );

  const handleAdd = useCallback(() => {
    onConstantsChange([
      ...constants,
      {
        id: nanoid(),
        key: '',
        description: '',
        value: '',
      },
    ]);
  }, [onConstantsChange, constants]);

  const columns = useMemo(() => {
    return [
      {
        title: '名称',
        key: 'key',
        dataIndex: 'key',
        width: 80,
        render: (value: string, record: ComponentData.TConstants) => {
          return (
            <Input
              className="w-100"
              defaultValue={value}
              onBlur={(e) => {
                const value = e.target.value;
                updateValue({
                  ...record,
                  key: value,
                });
              }}
            />
          );
        },
      },
      {
        title: '常量',
        key: 'value',
        dataIndex: 'value',
        width: 160,
        render: (value: string, record: ComponentData.TConstants) => {
          return (
            <TextArea
              className="w-100"
              rows={2}
              defaultValue={value}
              onBlur={(e) => {
                const value = e.target.value;
                updateValue({
                  ...record,
                  value: value,
                });
              }}
            />
          );
        },
      },
      {
        title: '描述',
        key: 'description',
        dataIndex: 'description',
        width: 100,
        render: (value: string, record: ComponentData.TConstants) => {
          return (
            <TextArea
              className="w-100"
              rows={2}
              defaultValue={value}
              onBlur={(e) => {
                const value = e.target.value;
                updateValue({
                  ...record,
                  description: value,
                });
              }}
            />
          );
        },
      },
      {
        title: '操作',
        key: 'op',
        dataIndex: 'op',
        render: (_: any, record: ComponentData.TConstants) => {
          return (
            <Button
              style={{ paddingLeft: 0 }}
              type="link"
              onClick={deleteData.bind(null, record)}
            >
              删除
            </Button>
          );
        },
      },
    ];
  }, [updateValue, deleteData]);

  return (
    <FocusWrapper>
      <Table
        dataSource={constants}
        rowKey={'id'}
        columns={columns}
        pagination={false}
        scroll={{ y: '70vh', x: 'max-content' }}
        bordered
        size="small"
      />
      <GhostButton
        className="m-t-8 c-f-s"
        onClick={handleAdd}
        icon={<PlusOutlined />}
      >
        新增一个字段
      </GhostButton>
    </FocusWrapper>
  );
};

const WrapperConstantList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConstantList);

const ConstantManage = forwardRef<ConstantManageRef, ConstantManageProps>(
  (props, ref) => {
    const [visible, setVisible] = useControllableValue<boolean>(props, {
      trigger: 'onVisibleChange',
      valuePropName: 'visible',
    });

    const onClose = useCallback(() => {
      setVisible(false);
    }, []);

    const open = useCallback(() => {
      setVisible(true);
    }, []);

    const footer = useMemo(() => {
      return (
        <div className="ali-r">
          <Button onClick={onClose}>关闭</Button>
        </div>
      );
    }, [onClose]);

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
        };
      },
      [open],
    );

    return (
      <Drawer
        mask={false}
        open={visible}
        maskClosable={false}
        onClose={onClose}
        footer={footer}
        title="全局常量管理"
        placement="left"
        width={520}
      >
        <WrapperConstantList />
      </Drawer>
    );
  },
);

export default ConstantManage;
