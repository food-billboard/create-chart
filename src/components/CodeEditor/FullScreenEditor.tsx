import { Modal } from 'antd';
import { useState, useCallback } from 'react';
import { FullscreenOutlined } from '@ant-design/icons';
import Editor from './Editor';
import IconTooltip from '../IconTooltip';
import styles from './index.less';

const FullScreenEditor = (props: {
  value: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
}) => {
  const { onConfirm, value, onCancel: propsOnCancel } = props;

  const [stateCode, setStateCode] = useState<string>(value || '');
  const [visible, setVisible] = useState<boolean>(false);

  const handleFullScreen = useCallback(() => {
    setVisible(true);
  }, []);

  const onOk = useCallback(() => {
    onConfirm?.(stateCode);
    setVisible(false);
  }, [onConfirm, stateCode]);

  const onCancel = useCallback(() => {
    propsOnCancel?.();
    setVisible(false);
  }, [propsOnCancel]);

  return (
    <>
      <IconTooltip title="全屏编辑" iconStyle={{ margin: 0 }}>
        <FullscreenOutlined onClick={handleFullScreen} />
      </IconTooltip>
      <Modal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        wrapClassName={styles['full-screen-editor-modal']}
        width="70vw"
      >
        <Editor value={stateCode} onChange={setStateCode} />
      </Modal>
    </>
  );
};

export default FullScreenEditor;
