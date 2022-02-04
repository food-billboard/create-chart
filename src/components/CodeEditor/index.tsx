import { useCallback, useMemo } from 'react';
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
};

const CodeEditor = (props: EditorProps) => {
  const [value, setValue] = useControllableValue<string>(props);

  const {
    options,
    onChange,
    autoFocus = true,
    editorDidMount: propsEditorDidMount,
    disabled = false,
    className,
    bordered,
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

  const editorDidMount: EditorDidMount = useCallback(
    (editor, monaco) => {
      propsEditorDidMount?.(editor, monaco);
      autoFocus && !disabled && editor.focus();
    },
    [propsEditorDidMount, autoFocus],
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
};

export default CodeEditor;
