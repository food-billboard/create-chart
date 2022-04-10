import { useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import Input from '@/components/ChartComponents/Common/Input';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TProgressBarConfig } from '../type';

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: TProgressBarConfig['yAxis'];
  onChange: ComponentData.ComponentConfigProps<TProgressBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { axisLabel } = value;

  const onKeyChange = useCallback(
    (key: keyof TProgressBarConfig['yAxis'], value: any) => {
      onChange({
        config: {
          options: {
            yAxis: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  return (
    <ConfigList>
      <Collapse
        child={{
          header: '标签',
          key: 'axisLabel',
          visibleRender: true,
          value: axisLabel.show,
          onChange: (value) => {
            onKeyChange('axisLabel', {
              show: value,
            });
          },
        }}
        parent={{
          activeKey: ['axisLabel'],
        }}
      >
        <Item label="标签名称">
          <FullForm>
            <Input
              value={axisLabel.value}
              onChange={(value) => {
                onKeyChange('axisLabel', {
                  value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字样式',
            key: 'textStyle',
          }}
        >
          <FontConfigList
            value={axisLabel.textStyle}
            onChange={(value) => {
              onKeyChange('axisLabel', {
                textStyle: value,
              });
            }}
          />
        </Collapse>
      </Collapse>
    </ConfigList>
  );
};

export default AxisConfig;
