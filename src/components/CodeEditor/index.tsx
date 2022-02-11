import {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useControllableValue } from 'ahooks';
import MonacoEditor, {
  MonacoEditorProps,
  EditorDidMount,
} from 'react-monaco-editor';
import classnames from 'classnames';
import { merge } from 'lodash';
import styles from './index.less';

export type EditorProps = Partial<MonacoEditorProps> & {
  autoFocus?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  onBlur?: (value: string) => void;
};

export type EditorRef = {
  format: () => void;
};

const CodeEditor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const [value, setValue] = useControllableValue<string>(props);
  const [editorRef, setEditorRef] = useState<any>(null);

  const {
    options,
    onChange,
    autoFocus = false,
    editorDidMount: propsEditorDidMount,
    disabled = false,
    className,
    bordered,
    onBlur,
    ...nextProps
  } = props;

  const realOptions = useMemo(() => {
    return merge(
      {},
      {
        selectOnLineNumbers: true,
        tabSize: 2,
        readOnly: !!disabled,
      },
      options || {},
    );
  }, [options, disabled]);

  const editorDidMount: EditorDidMount = (editor, monaco) => {
    propsEditorDidMount?.(editor, monaco);
    autoFocus && !disabled && editor.focus();
    setEditorRef(editor);
    editor.onDidBlurEditorText(() => {
      onBlur?.(editor.getValue());
    });
  };

  const formatData = useCallback(() => {
    if (!editorRef) return;
    if (disabled) {
      editorRef.updateOptions({ readOnly: false });
      editorRef
        .getAction('editor.action.formatDocument')
        .run()
        .then(() => {
          editorRef.updateOptions({ readOnly: true });
        });
    } else {
      editorRef.getAction('editor.action.formatDocument').run();
    }
  }, [editorRef, disabled]);

  useImperativeHandle(
    ref,
    () => {
      return {
        format: formatData,
      };
    },
    [formatData],
  );

  return (
    <MonacoEditor
      width="400"
      height="400"
      language="javascript"
      theme="vs-dark"
      value={value}
      options={realOptions}
      onChange={setValue}
      editorDidMount={editorDidMount}
      className={classnames(
        {
          [styles['component-code-editor']]: !!bordered,
        },
        className,
      )}
      // editorWillMount={(editor) => {
      //   editor.editor.defineTheme("222", {
      //     base: 'vs-dark',
      //     inherit: true,
      //     rules: ITokenThemeRule[];
      //     // encodedTokensColors?: string[];
      //     colors: IColors;
      //   })
      // }}
      {...nextProps}
    />
  );
});

export default CodeEditor;
