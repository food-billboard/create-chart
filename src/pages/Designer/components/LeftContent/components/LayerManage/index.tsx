import {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useImperativeHandle,
} from 'react';
import { Button, Drawer } from 'antd';
import { usePanelFocus, useScrollBar } from '@/hooks';
import LayerList from './components/Tree';

export interface LayerManageRef {
  open: () => void;
}

export interface LayerManageProps {
  onClose?: () => void;
}

const LayerManage = forwardRef<LayerManageRef, LayerManageProps>(
  (props, ref) => {
    const { onClose: propsOnClose } = props;

    const [visible, setVisible] = useState<boolean>(false);

    usePanelFocus(() => document.querySelector('.design-layer-drawer'));

    useScrollBar('.design-layer-drawer .ant-drawer-body');

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
        title="图层"
        placement="left"
        className="design-layer-drawer"
      >
        <LayerList />
      </Drawer>
    );
  },
);

export default LayerManage;
