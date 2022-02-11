import { useMemo } from 'react';
import { connect } from 'dva';
import CodeEditor, { EditorProps } from '@/components/CodeEditor';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mapStateToProps, mapDispatchToProps } from './connect';

const CodeViewer = (
  props: {
    value: ComponentData.TComponentApiDataConfig;
    filter: ComponentData.TFilterConfig[];
  } & Partial<Omit<EditorProps, 'value'>>,
) => {
  const { filter, value, ...nextProps } = props;

  const responseData = useMemo(() => {
    return FilterDataUtil.getPipeFilterValue(value, filter);
  }, [value, filter]);

  return (
    <CodeEditor
      disabled
      language="json"
      width={'312'}
      height={'240'}
      bordered
      autoFormat
      {...nextProps}
      value={responseData}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeViewer);
