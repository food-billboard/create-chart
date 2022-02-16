import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useMemo,
} from 'react';
import { Space } from 'antd';
import classnames from 'classnames';
import Editor, { EditorProps, EditorRef } from './Editor';
import ClipboardAction from './Clipboard';
import FullScreenEditor from './FullScreenEditor';
import styles from './index.less';

export { EditorRef, EditorProps };

const CodeEditor = forwardRef<
  EditorRef,
  EditorProps & {
    action?: boolean | ['full-screen' | 'copy'];
  }
>((props, ref) => {
  const { onChange: propsOnChange, action = true } = props;

  const [code, setCode] = useState<string>(
    props?.value ?? props?.defaultValue ?? '',
  );

  const editorContentRef = useRef<EditorRef>(null);

  const onCodeChange = useCallback(
    (value, event) => {
      propsOnChange?.(value, event);
      setCode(value);
    },
    [propsOnChange],
  );

  const onValueChange = useCallback((value) => {
    editorContentRef.current?.setValue(value);
  }, []);

  const actionList = useMemo(() => {
    const fullScreen = (
      <FullScreenEditor value={code} onConfirm={onValueChange} />
    );
    const copy = <ClipboardAction value={code} />;
    if (!action) return null;
    let newAction = Array.isArray(action) ? action : ['full-screen', 'copy'];
    return (
      <Space>
        {newAction.includes('full-screen') && fullScreen}
        {newAction.includes('copy') && copy}
      </Space>
    );
  }, [action, code, onValueChange]);

  useImperativeHandle(
    ref,
    () => {
      return editorContentRef.current! || {};
    },
    [],
  );

  return (
    <div className="pos-re">
      <Editor {...props} onChange={onCodeChange} ref={editorContentRef} />
      <div className={classnames(styles['component-code-editor-action'])}>
        {actionList}
      </div>
    </div>
  );
});

export default CodeEditor;
