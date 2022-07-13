import { useCallback } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { connect } from 'dva';
import Title from '../NormalTitle';
import { TOnChange } from '../DefineConfig/type';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ResponseDataTitle = (props: {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
}) => {
  const { onChange, value, params, constants } = props;

  const {
    request: { type },
  } = value;

  const reRequestData = useCallback(async () => {
    const result: any = await FilterDataUtil.requestData(
      value!,
      params,
      constants,
    );
    onChange?.({
      request: {
        value: result,
      },
    });
  }, [value, onChange, params]);

  return (
    <Title>
      数据响应结果
      {type !== 'static' && (
        <IconTooltip title="重新获取数据">
          <Loading3QuartersOutlined className="m-l-4" onClick={reRequestData} />
        </IconTooltip>
      )}
    </Title>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseDataTitle);
