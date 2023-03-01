import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CodeEditor from '@/components/CodeEditor';
import type { EditorProps } from '@/components/SyncCodeEditor';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { useMobxContext } from '@/hooks';

const CodeViewer = (
  props: {
    value: ComponentData.TComponentApiDataConfig;
  } & Partial<Omit<EditorProps, 'value'>>,
) => {
  const { value, ...nextProps } = props;

  const {
    global: {
      screenData: {
        config: {
          attr: { filter, params, constants },
        },
      },
    },
  } = useMobxContext();

  const [responseData, setResponseData] = useState();

  // const responseData = useMemo(() => {
  //   return FilterDataUtil.getPipeFilterValue(value, filter, params, constants);
  // }, [value, filter, params, constants]);

  useEffect(() => {
    FilterDataUtil.getPipeFilterValue(value, filter, params, constants).then(
      (data) => {
        setResponseData(data);
      },
    );
  }, [value, filter, params, constants]);

  return (
    <CodeEditor
      disabled
      language="json"
      width={'312px'}
      height={'240px'}
      bordered
      autoFormat
      action={['copy', 'typesetting']}
      {...nextProps}
      value={responseData}
    />
  );
};

export default observer(CodeViewer);
