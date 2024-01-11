import { InfoCircleOutlined, BuildOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { EventEmitter } from 'eventemitter3';
import { useEffect, useMemo, useState } from 'react';
import { commonClass } from '../../../../../../../../utils/component';

const emitter = new EventEmitter();

// 媒体资源组件列表
export const MediaResourceComponentList = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function listener(visible: boolean) {
      setVisible(visible);
    }
    emitter.addListener('mediaShow', listener);
    return () => {
      emitter.removeListener('mediaShow', listener);
    };
  }, []);

  return (
    <Modal
      title="媒体资源选择"
      open={visible}
      onCancel={() => setVisible(false)}
    ></Modal>
  );
};

// 额外
export const EXTRA_TYPE_EMPTY_DESC_MAP = {
  mediaResource: (
    <Button
      onClick={() => emitter.emit('mediaShow', true)}
      type="link"
      icon={<InfoCircleOutlined />}
    >
      点击选择媒体资源
    </Button>
  ),
};

export const useExtraComponentTypeList = () => {
  const extraTypeList = useMemo(() => {
    return [];
    return [
      {
        onClick: () => {
          emitter.emit('mediaShow', true);
        },
        type: 'mediaResource',
        icon: <BuildOutlined className={commonClass} />,
        title: '资源',
      },
    ];
  }, []);

  return [extraTypeList];
};

export const ExtraComponentChildren = () => {
  return (
    <>
      <MediaResourceComponentList />
    </>
  );
};
