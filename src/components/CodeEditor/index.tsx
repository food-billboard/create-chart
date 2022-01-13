// import React, { useCallback, useMemo } from 'react';
// import { useControllableValue } from 'ahooks'
// import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor'
// import { merge } from 'lodash'

// export type EditorProps = Partial<MonacoEditorProps> & {
//   autoFocus?: boolean
// }

// const CodeEditor = (props: EditorProps) => {

//   const [ value, setValue ] = useControllableValue<string>(props)
  
//   const { options, onChange, autoFocus=true, editorDidMount: propsEditorDidMount, ...nextProps } = props 

//   const realOptions = useMemo(() => {
//     return merge({}, {
//       selectOnLineNumbers: true
//     }, options || {})
//   }, [options])

//   const editorDidMount = useCallback((editor, monaco) => {
//     propsEditorDidMount?.(editor, monaco)
//     autoFocus && editor.focus()
//   }, [propsEditorDidMount, autoFocus])

//   return (
//     <MonacoEditor
//       width="800"
//       height="600"
//       language="javascript"
//       theme="vs-dark"
//       value={value}
//       options={realOptions}
//       onChange={setValue}
//       editorDidMount={editorDidMount}
//       {...nextProps}
//     />
//   )
// };

// export default CodeEditor;


import React from 'react';

const CodeView = () => {
  return <div>代码预览</div>;
};

export default CodeView;
