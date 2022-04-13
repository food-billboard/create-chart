import { useCallback, useMemo } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import Input from '@/components/ChartComponents/Common/Input';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TPercentPieConfig } from '../type';

const { Item } = ConfigList;

const StatisticsConfig = (props: {
  value: TPercentPieConfig['statistics'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { show, textStyle, addonAfter } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentPieConfig['statistics'], value: any) => {
      onChange({
        config: {
          options: {
            statistics: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const textStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '文字',
          key: 'textStyle',
        }}
        level={2}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
    );
  }, [textStyle, onKeyChange]);

  const addonAfterConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '后缀',
          key: 'addonAfter',
          visibleRender: true,
          value: addonAfter.show,
          onChange: (value) => {
            onKeyChange('addonAfter', {
              show: value,
            });
          },
        }}
      >
        <Item label="内容">
          <FullForm>
            <Input
              value={addonAfter.value}
              onChange={(value) => {
                onKeyChange('addonAfter', {
                  value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'textStyle',
          }}
          level={2}
        >
          <FontConfigList
            value={addonAfter.textStyle}
            onChange={(value) => {
              onKeyChange('addonAfter', {
                textStyle: value,
              });
            }}
          />
        </Collapse>
      </Collapse>
    );
  }, [addonAfter, onKeyChange, onChange]);

  return (
    <ConfigList>
      <Collapse
        child={{
          key: 'statistics',
          header: '数值',
          visibleRender: true,
          value: show,
          onChange: onKeyChange.bind(null, 'show'),
        }}
        parent={{
          activeKey: ['statistics'],
        }}
      >
        {textStyleConfig}
        {addonAfterConfig}
      </Collapse>
    </ConfigList>
  );
};

export default StatisticsConfig;
