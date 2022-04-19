import { useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import Input from '@/components/ChartComponents/Common/Input';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TBubbleScatterConfig } from '../type';

const { Item } = ConfigList;

const LegendConfig = (props: {
  value: TBubbleScatterConfig['title'];
  onChange: ComponentData.ComponentConfigProps<TBubbleScatterConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const onKeyChange = useCallback(
    (key: keyof TBubbleScatterConfig['title'], value: any) => {
      onChange({
        config: {
          options: {
            title: {
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
          key: 'title',
          header: '标题',
          visibleRender: true,
          value: value.show,
          onChange: (value) => onKeyChange('show', value),
        }}
        parent={{
          activeKey: ['title'],
        }}
      >
        <Item label="标题">
          <FullForm>
            <Input
              value={value.defaultValue}
              onChange={onKeyChange.bind(null, 'defaultValue')}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'textStyle',
          }}
        >
          <FontConfigList
            value={value.textStyle}
            onChange={onKeyChange.bind(null, 'textStyle')}
          />
        </Collapse>
      </Collapse>
    </ConfigList>
  );
};

export default LegendConfig;
