import {
  useState,
  forwardRef,
  useCallback,
  useMemo,
  useImperativeHandle,
} from 'react';
import { Button, Drawer } from 'antd';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import BackgroundConfig from './components/BackgroundConfig';
import CrossClipboard from './components/CrossClipboard';

export interface LocalConfigManageRef {
  open: () => void;
}

export interface LocalConfigManageProps {
  onClose?: () => void;
}

const LocalConfigManage = forwardRef<
  LocalConfigManageRef,
  LocalConfigManageProps
>((props, ref) => {
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
      open={visible}
      maskClosable={false}
      onClose={onClose}
      footer={footer}
      title="本地配置管理"
      placement="left"
      width={400}
    >
      <ConfigList level={1}>
        <BackgroundConfig />
        <CrossClipboard />
      </ConfigList>
    </Drawer>
  );
});

export default LocalConfigManage;
