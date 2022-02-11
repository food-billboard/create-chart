import {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { useControllableValue } from 'ahooks';
import MonacoEditor, {
  MonacoEditorProps,
  EditorDidMount,
} from 'react-monaco-editor';
import classnames from 'classnames';
import { merge } from 'lodash';
import { sleep } from '@/utils';
import styles from './index.less';

export type EditorProps = Partial<MonacoEditorProps> & {
  autoFocus?: boolean;
  autoFormat?:
    | boolean
    | {
        mount?: boolean;
        blur?: boolean;
      };
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
    autoFormat = false,
    value: propsValue,
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

  const formatIfNeed = useCallback(
    (editor: any, type: 'mount' | 'blur') => {
      const needUpdate = autoFormat === true || !!(autoFormat as any)?.[type];

      if (needUpdate) {
        sleep(200).then((_) => {
          formatData(editor);
        });
      }
    },
    [autoFormat],
  );

  const editorDidMount: EditorDidMount = (editor, monaco) => {
    propsEditorDidMount?.(editor, monaco);
    autoFocus && !disabled && editor.focus();
    setEditorRef(editor);

    formatIfNeed(editor, 'mount');

    editor.onDidBlurEditorText(() => {
      onBlur?.(editor.getValue());
      formatIfNeed(editor, 'blur');
    });
  };

  const formatData = (editor?: any) => {
    const realEditorInstance = editor || editorRef;
    if (!realEditorInstance) return;
    if (disabled) {
      realEditorInstance.updateOptions({ readOnly: false });
      realEditorInstance
        .getAction('editor.action.formatDocument')
        .run()
        .then(() => {
          realEditorInstance.updateOptions({ readOnly: true });
        });
    } else {
      realEditorInstance.getAction('editor.action.formatDocument').run();
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        format: formatData,
      };
    },
    [],
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
