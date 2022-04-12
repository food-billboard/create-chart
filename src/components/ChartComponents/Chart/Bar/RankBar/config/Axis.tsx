import { useCallback } from 'react';
import { Switch } from 'antd';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TRankBarConfig } from '../type';

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: TRankBarConfig['yAxis'];
  onChange: ComponentData.ComponentConfigProps<TRankBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { textStyle, rankIcon } = value;

  const onKeyChange = useCallback(
    (key: keyof TRankBarConfig['yAxis'], value: any) => {
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
          header: '文字',
          key: 'textStyle',
        }}
        parent={{
          defaultActiveKey: ['textStyle'],
        }}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
      <Collapse
        child={{
          header: '图标',
          key: 'rankIcon',
          visibleRender: true,
          value: rankIcon.show,
          onChange: (value) => {
            onKeyChange('rankIcon', {
              show: value,
            });
          },
        }}
      >
        <Item label="是否显示背景">
          <FullForm>
            <Switch
              checked={rankIcon.showBackground}
              onChange={(value) => {
                onKeyChange('rankIcon', {
                  showBackground: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'rankIcon-textStyle',
          }}
        >
          <FontConfigList
            value={rankIcon.textStyle}
            onChange={(value) => {
              onKeyChange('rankIcon', {
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
