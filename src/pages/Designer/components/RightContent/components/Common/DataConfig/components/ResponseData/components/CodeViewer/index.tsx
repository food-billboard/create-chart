import {} from 'antd';
import {} from 'antd';
import CodeEditor from '@/components/CodeEditor';

const CodeViewer = (props: { value: object | any[] }) => {
  return (
    <CodeEditor
      disabled
      language="json"
      width={'312'}
      height={'240'}
      bordered
      // value={props.value}
    />
  );
};

export default CodeViewer;
