import IconTooltip from '@/components/IconTooltip';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { connect } from 'umi';
import { TOnChange } from '../DefineConfig/type';
import Title from '../NormalTitle';
import { mapDispatchToProps, mapStateToProps } from './connect';

const ResponseDataTitle = (props: {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  componentId: string;
}) => {
  const { onChange, value, params, constants, componentId } = props;

  const {
    request: { type },
  } = value;

  const reRequestData = useCallback(async () => {
    const result: any = await FilterDataUtil.requestData(
      componentId,
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
