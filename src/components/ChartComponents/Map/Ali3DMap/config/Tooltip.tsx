import { useCallback } from 'react';
import { Select } from 'antd';
import TooltipConfigCommon from '@/components/ChartComponents/Common/TooltipCommon';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import TooltipAnimationConfig from '@/components/ChartComponents/Common/TooltipAnimationConfig';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { TAli3DMapConfig } from '../type';

const { Item } = ConfigList;

const TooltipConfig = (props: {
  value: TAli3DMapConfig['tooltip'];
  onChange: ComponentData.ComponentConfigProps<TAli3DMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (value: any) => {
      onChange({
        config: {
          options: {
            tooltip: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <TooltipConfigCommon
      value={value}
      onChange={onKeyChange}
      ignore={['formatter']}
    >
      <Item label="隐藏内容">
        <FullForm>
          <Select
            mode="multiple"
            className="w-100"
            value={value.ignore}
            onChange={(value) =>
              onKeyChange({
                ignore: value,
              })
            }
            options={[
              {
                label: '图片',
                value: 'image',
              },
              {
                label: '副标题',
                value: 'sub-title',
              },
              {
                label: '描述',
                value: 'description',
              },
            ]}
          />
        </FullForm>
      </Item>
      <TooltipAnimationConfig
        value={value.animation}
        onChange={(value) => {
          onKeyChange({
            animation: value,
          });
        }}
      />
    </TooltipConfigCommon>
  );
};

export default TooltipConfig;
