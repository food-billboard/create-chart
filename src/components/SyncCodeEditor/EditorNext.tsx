import { QuestionCircleOutlined } from '@ant-design/icons';
import MonacoEditor, {
  EditorProps as MonacoEditorProps,
  OnMount as EditorDidMount,
  loader,
} from '@monaco-editor/react';
import { useControllableValue } from 'ahooks';
// import * as monaco from 'monaco-editor';
import classnames from 'classnames';
import { merge } from 'lodash';
import {
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { sleep } from '@/utils';
import Tooltip from '../IconTooltip';
import { ContentLoading } from '../PageLoading';
import styles from './index.less';

// 非开发环境
if (process.env.REACT_APP_ENV === 'prod') {
  // 静态版本 || 后端版本
  if (['prod', 'static'].includes(process.env.REACT_APP || '')) {
    loader.config({
      paths: {
        vs: 'https://food-billboard.github.io/create-chart/lib/monaco-editor/vs',
      },
    });
  }
  // improve版本
  if (process.env.REACT_APP === 'improve') {
    // TODO
    // 把文件放到对应服务器上
  }
}

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
      loading={
        <ContentLoading size={40} loading>
          <span style={{ marginTop: 32 }}>
            <Tooltip title="若长时间未响应，可尝试刷新页面￣□￣｜｜">
              <QuestionCircleOutlined
                className={classnames(
                  'm-r-4',
                  styles['component-code-editor-loading'],
                )}
              />
            </Tooltip>
            代码编辑器加载中。。。
          </span>
        </ContentLoading>
      }
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
