import {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useControllableValue } from 'ahooks';
import MonacoEditor, {
  EditorProps as MonacoEditorProps,
  OnMount as EditorDidMount,
} from '@monaco-editor/react';
import classnames from 'classnames';
import { merge } from 'lodash';
import { sleep } from '@/utils';
import styles from './index.less';

export type EditorProps = Partial<MonacoEditorProps> & {
  autoFocus?: boolean;
  blurCanScroll?: boolean;
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
  setValue: (value: string) => void;
};

const CodeEditor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const [value, setValue] = useControllableValue<string>(props);
  const [editorRef, setEditorRef] = useState<any>(null);

  const {
    options,
    onChange,
    autoFocus = false,
    onMount: propsEditorDidMount,
    disabled = false,
    className,
    bordered,
    onBlur,
    autoFormat = false,
    value: propsValue,
    blurCanScroll = false,
    ...nextProps
  } = props;

  const [scrollDisabled, setScrollDisabled] = useState<boolean>(blurCanScroll);

  const realOptions = useMemo(() => {
    return merge(
      {},
      {
        selectOnLineNumbers: true,
        tabSize: 2,
        readOnly: !!disabled,
        lineNumbersMinChars: 2,
        contextmenu: false,
        scrollbar: {
          arrowSize: 4,
          handleMouseWheel: !scrollDisabled,
          verticalScrollbarSize: 5,
          horizontalScrollbarSize: 5,
        },
      },
      options || {},
    );
  }, [options, disabled, scrollDisabled]);

  // * 调两次因为有时候不生效
  const multiFormat = (editor?: any) => {
    formatData(editor);
    sleep(100).then((_) => {
      formatData(editor);
    });
  };

  const formatIfNeed = useCallback(
    (editor: any, type: 'mount' | 'blur') => {
      const needUpdate = autoFormat === true || !!(autoFormat as any)?.[type];

      if (needUpdate) {
        sleep(200).then((_) => {
          multiFormat(editor);
        });
      }
    },
    [autoFormat],
  );

  const editorDidMount: EditorDidMount = (editor, monaco) => {
    monaco.editor.setTheme('vs-dark-custom');
    propsEditorDidMount?.(editor, monaco);
    autoFocus && !disabled && editor.focus();
    setEditorRef(editor);

    formatIfNeed(editor, 'mount');

    editor.onDidFocusEditorText(() => {
      // blur scroll
      if (blurCanScroll) setScrollDisabled(false);
    });

    editor.onDidBlurEditorText(() => {
      onBlur?.(editor.getValue());
      formatIfNeed(editor, 'blur');

      // blur scroll
      if (blurCanScroll) setScrollDisabled(true);
    });
  };

  const formatData = (editor?: any) => {
    try {
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
    } catch (err) {}
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        format: multiFormat,
        setValue,
      };
    },
    [editorRef],
  );

  return (
    <MonacoEditor
      language="javascript"
      value={value}
      options={realOptions}
      onChange={(value) => setValue(value ?? '')}
      className={classnames(
        {
          [styles['component-code-editor']]: !!bordered,
        },
        className,
      )}
      theme={'vs-dark'}
      onMount={editorDidMount}
      // 设置代码提示
      beforeMount={(monaco) => {
        if (!nextProps.language || nextProps.language === 'javascript')
          monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            module: monaco.languages.typescript.ModuleKind.ES2015,
            allowNonTsExtensions: true,
            lib: ['es2018'],
          });
        monaco.editor.defineTheme('vs-dark-custom', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          // encodedTokensColors?: string[];
          colors: {
            'editor.background': '#141414',
          },
        });
      }}
      {...nextProps}
    />
  );
});

export default CodeEditor;
