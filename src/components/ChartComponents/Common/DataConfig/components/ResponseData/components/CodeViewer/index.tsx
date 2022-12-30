import { useMemo, useState, useEffect } from 'react';
import { connect } from 'dva';
import CodeEditor from '@/components/CodeEditor';
import type { EditorProps } from '@/components/SyncCodeEditor';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mapStateToProps, mapDispatchToProps } from './connect';

const CodeViewer = (
  props: {
    value: ComponentData.TComponentApiDataConfig;
    filter: ComponentData.TFilterConfig[];
    params: ComponentData.TParams[];
    constants: ComponentData.TConstants[];
  } & Partial<Omit<EditorProps, 'value'>>,
) => {
  const { filter, value, params, constants, ...nextProps } = props;

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

export default connect(mapStateToProps, mapDispatchToProps)(CodeViewer);
