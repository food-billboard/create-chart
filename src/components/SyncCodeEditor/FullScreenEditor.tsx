import { FullscreenOutlined } from '@ant-design/icons';
import { useState, useCallback, useRef } from 'react';
import Modal from '@/components/FocusModal';
import IconTooltip from '../IconTooltip';
import Editor, { EditorRef } from './EditorNext';
import Typesetting from './Typesetting';
import styles from './index.less';

const FullScreenEditor = (props: {
  value: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  language?: string;
  action?: boolean;
}) => {
  const {
    onConfirm,
    value,
    onCancel: propsOnCancel,
    language,
    action = true,
  } = props;

  const [stateCode, setStateCode] = useState<string>(value || '');
  const [visible, setVisible] = useState<boolean>(false);

  const editorContentRef = useRef<EditorRef>(null);

  const handleFullScreen = useCallback(() => {
    setStateCode(value);
    setVisible(true);
  }, [value]);

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
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        wrapClassName={styles['full-screen-editor-modal']}
        width="70vw"
        maskClosable={false}
      >
        <div className="pos-re w-100 h-100">
          <Editor
            value={stateCode}
            onChange={(value) => setStateCode(value ?? '')}
            ref={editorContentRef}
            language={language}
            autoFormat
          />
          <div className={styles['component-code-editor-action']}>
            {action && (
              <Typesetting
                onClick={() => {
                  return editorContentRef.current?.format();
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FullScreenEditor;
