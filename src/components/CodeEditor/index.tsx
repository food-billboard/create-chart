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
import Editor, {
  EditorProps as InternalEditorProps,
  EditorRef as InternalEditorRef,
} from './Editor';
import ClipboardAction from './Clipboard';
import FullScreenEditor from './FullScreenEditor';
import Typesetting from './Typesetting';
import styles from './index.less';

export type EditorRef = InternalEditorRef;
export type EditorProps = InternalEditorProps & {
  action?: boolean | ('full-screen' | 'copy' | 'typesetting')[];
};

const CodeEditor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { onChange: propsOnChange, action = true, language, onBlur } = props;

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

  const onValueChange = useCallback(
    (value) => {
      editorContentRef.current?.setValue(value);
      onBlur?.(value);
    },
    [onBlur],
  );

  const actionList = useMemo(() => {
    const fullScreen = (
      <FullScreenEditor
        value={code}
        onConfirm={onValueChange}
        language={language}
      />
    );
    const copy = <ClipboardAction value={code} />;
    const typesetting = (
      <Typesetting
        onClick={() => {
          return editorContentRef.current?.format();
        }}
      />
    );
    if (!action) return null;
    let newAction = Array.isArray(action)
      ? action
      : ['full-screen', 'copy', 'typesetting'];
    return (
      <Space>
        {newAction.includes('full-screen') && fullScreen}
        {newAction.includes('copy') && copy}
        {newAction.includes('typesetting') && typesetting}
      </Space>
    );
  }, [action, code, onValueChange, language]);

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
