import { useCallback } from 'react';
import FilterDataUtil from '@/utils/Assist/FilterData';
import CodeEditor from '../SaveCodeEditor';

const StaticConfig = (props: {
  value?: string;
  onChange?: (
    value: SuperPartial<ComponentData.TComponentApiDataConfig>,
  ) => void;
}) => {
  const { value, onChange: propsOnChange } = props;

  const onChange = useCallback(
    (value) => {
      propsOnChange?.({
        request: {
          value: FilterDataUtil.stringDataToObject(value),
        },
      });
    },
    [propsOnChange],
  );

  return <CodeEditor onChange={onChange} value={value} />;
};

export default StaticConfig;
