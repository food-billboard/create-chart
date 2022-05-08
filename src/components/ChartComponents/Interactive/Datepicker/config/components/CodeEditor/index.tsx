import CodeEditor from '@/components/CodeEditor';

const ConditionCodeEditor = (props: {
  value: string;
  onChange: (value: string) => void;
  functionName: string;
}) => {
  const { value, onChange, functionName } = props;

  return (
    <div className="design-config-format-font-size c-f-s p-lr-8 m-tb-4">
      <p>{`function ${functionName}( data ) {`}</p>
      <CodeEditor
        language="javascript"
        action={['copy', 'full-screen']}
        width={180}
        height={150}
        defaultValue={value ?? ''}
        onBlur={onChange}
        fullScreenAction={false}
      />
      <p>{'}'}</p>
    </div>
  );
};

export default ConditionCodeEditor;
