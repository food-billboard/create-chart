import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { TSunBurstBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TSunBurstBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TSunBurstBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { radius, center, label, nodeClick } = value;

  const onKeyChange = useCallback(
    (key: keyof TSunBurstBasicConfig['series'], value: any) => {
      onChange({
        config: {
          options: {
            series: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const nodeClickConfig = useMemo(() => {
    return (
      <Item label="点击到下层">
        <FullForm>
          <Switch
            checked={nodeClick === 'rootToNode'}
            onChange={(value) => {
              onKeyChange('nodeClick', value ? 'rootToNode' : false);
            }}
          />
        </FullForm>
      </Item>
    );
  }, [nodeClick, onKeyChange]);

  const radiusConfig = useCallback(() => {
    return (
      <Item label="大小">
        <FullForm>
          <InputNumber
            value={radius}
            onChange={onKeyChange.bind(null, 'radius')}
          />
        </FullForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        onChange={onKeyChange.bind(null, 'label')}
        ignore={['position']}
      >
        <FormatterSelect
          value={label.formatter}
          onChange={(value) => {
            onKeyChange('label', {
              formatter: value,
            });
          }}
        />
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const centerConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: center[0],
          top: center[1],
        }}
        onChange={(value) => {
          onKeyChange('center', [value.left, value.top]);
        }}
      />
    );
  }, [center, onKeyChange]);

  return (
    <ConfigList>
      {centerConfig}
      {radiusConfig}
      {labelConfig}
      {nodeClickConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
