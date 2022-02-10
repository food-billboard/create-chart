import { useState, useCallback } from 'react';
import CodeEditor from '@/components/CodeEditor';

const SaveCodeEditor = (props: {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
}) => {
  const { value, onChange, language = 'json' } = props;

  const [stateValue, setStateValue] = useState<string>(value || '');

  return (
    <div>
      <CodeEditor
        language={language}
        width={454}
        height={138}
        bordered
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SaveCodeEditor;
