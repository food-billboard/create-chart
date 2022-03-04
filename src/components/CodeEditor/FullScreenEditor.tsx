import { Modal } from 'antd';
import { useState, useCallback, useRef } from 'react';
import { FullscreenOutlined } from '@ant-design/icons';
import Editor, { EditorRef } from './Editor';
import IconTooltip from '../IconTooltip';
import Typesetting from './Typesetting';
import styles from './index.less';

const FullScreenEditor = (props: {
  value: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  language?: string;
}) => {
  const { onConfirm, value, onCancel: propsOnCancel, language } = props;

  const [stateCode, setStateCode] = useState<string>(value || '');
  const [visible, setVisible] = useState<boolean>(false);

  const editorContentRef = useRef<EditorRef>(null);

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
        <div className="pos-re w-100 h-100">
          <Editor
            value={stateCode}
            onChange={setStateCode}
            ref={editorContentRef}
            language={language}
            autoFormat
          />
          <div className={styles['component-code-editor-action']}>
            <Typesetting
              onClick={() => {
                return editorContentRef.current?.format();
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FullScreenEditor;
