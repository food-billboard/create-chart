import {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useImperativeHandle,
} from 'react';
import { Button, Drawer, Table } from 'antd';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

export interface CallbackManageRef {
  open: () => void;
}

export interface CallbackManageProps {
  onClose?: () => void;
}

const CallbackList = (props: {
  callback?: ComponentData.TFilterConfig[];
  setCallbackData?: (value: ComponentData.TFilterConfig[]) => void;
}) => {
  const { callback = [], setCallbackData } = props;

  const deleteData = useCallback(
    (value: ComponentData.TFilterConfig) => {
      const { id } = value;
      const newValue = callback.filter((item) => item.id !== id);
      setCallbackData?.(newValue);
    },
    [callback],
  );

  const columns = useMemo(() => {
    return [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '代码',
        key: 'code',
        dataIndex: 'code',
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'op',
        dataIndex: 'op',
        render: (_: any, record: ComponentData.TFilterConfig) => {
          return (
            <Button type="link" onClick={deleteData.bind(null, record)}>
              删除
            </Button>
          );
        },
      },
    ];
  }, [deleteData]);

  return (
    <Table
      dataSource={callback}
      rowKey={() => Math.random()}
      columns={columns}
      pagination={false}
      scroll={{ y: '70vh' }}
      bordered
      size="small"
    />
  );
};

const WrapperCallbackList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallbackList);

const CallbackManage = forwardRef<CallbackManageRef, CallbackManageProps>(
  (props, ref) => {
    const { onClose: propsOnClose } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const onClose = useCallback(() => {
      setVisible(false);
      propsOnClose?.();
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
        visible={visible}
        maskClosable={false}
        onClose={onClose}
        footer={footer}
        title="回调管理"
      >
        <WrapperCallbackList />
      </Drawer>
    );
  },
);

export default CallbackManage;
