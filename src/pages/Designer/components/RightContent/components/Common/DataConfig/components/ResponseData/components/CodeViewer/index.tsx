import {} from 'antd';
import { connect } from 'dva';
import CodeEditor from '@/components/CodeEditor';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { mapStateToProps, mapDispatchToProps } from './connect';

const CodeViewer = (props: {
  value: ComponentData.TComponentApiDataConfig;
  filter: ComponentData.TFilterConfig[];
}) => {
  const { filter, value } = props;

  const responseData = FilterDataUtil.getPipeFilterValue(value, filter);

  return (
    <CodeEditor
      disabled
      language="json"
      width={'312'}
      height={'240'}
      bordered
      value={responseData}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeViewer);
