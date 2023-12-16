import { useControllableValue } from 'ahooks';
import { Button, Drawer } from 'antd';
import { forwardRef, useCallback, useMemo, useImperativeHandle } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import BackgroundConfig from './components/BackgroundConfig';
import CrossClipboard from './components/CrossClipboard';
import GuideLineSticky from './components/GuideLineSticky';

export interface LocalConfigManageRef {
  open: () => void;
}

export interface LocalConfigManageProps {
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
}

const LocalConfigManage = forwardRef<
  LocalConfigManageRef,
  LocalConfigManageProps
>((props, ref) => {
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
      title="本地配置管理"
      placement="left"
      width={400}
    >
      <ConfigList level={1}>
        <BackgroundConfig />
        <CrossClipboard />
        <GuideLineSticky />
      </ConfigList>
    </Drawer>
  );
});

export default LocalConfigManage;
