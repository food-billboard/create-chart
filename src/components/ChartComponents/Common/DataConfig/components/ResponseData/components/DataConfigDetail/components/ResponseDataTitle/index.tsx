import { useCallback } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useMobxContext } from '@/hooks';
import IconTooltip from '@/components/IconTooltip';
import FilterDataUtil from '@/utils/Assist/FilterData';
import Title from '../NormalTitle';
import { TOnChange } from '../DefineConfig/type';

const ResponseDataTitle = (props: {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
}) => {
  const { onChange, value } = props;
  const {
    request: { type },
  } = value;
  const {
    global: {
      screenData: {
        config: {
          attr: { params, constants },
        },
      },
    },
  } = useMobxContext();

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

export default ResponseDataTitle;
