import { useState, useCallback } from 'react';
import json5 from 'json5';
import CodeEditor from '@/components/CodeEditor';

const parseStringValue = (value: any) => {
  try {
    return JSON.stringify(json5.parse(value || ''));
  } catch (err) {
    return value || '';
  }
};

const SaveCodeEditor = (props: {
  value?: string;
  onChange?: (value: string) => void;
  language?: string;
}) => {
  const { value, onChange, language = 'json' } = props;

  const [stateValue, setStateValue] = useState<string>(() => {
    return parseStringValue(value || '');
  });

  const onBlur = useCallback(
    (value) => {
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <div>
      <CodeEditor
        language={language}
        width={454}
        height={138}
        bordered
        value={stateValue}
        onChange={setStateValue}
        onBlur={onBlur}
        blurCanScroll
        autoFormat={{
          mount: language === 'json',
          blur: false,
        }}
      />
    </div>
  );
};

export default SaveCodeEditor;
