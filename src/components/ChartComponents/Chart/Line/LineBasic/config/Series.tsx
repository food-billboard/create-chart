import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { TLineBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TLineBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TLineBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { smooth, areaStyle, lineStyle, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TLineBasicConfig['series'], value: any) => {
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

  const smoothConfig = useMemo(() => {
    return (
      <Item label="平滑曲线">
        <FullForm>
          <Switch
            checked={smooth}
            onChange={onKeyChange.bind(null, 'smooth')}
          />
        </FullForm>
      </Item>
    );
  }, [smooth, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig {...label} onChange={onKeyChange.bind(null, 'label')}>
        <Item label="旋转">
          <FullForm>
            <AngleSelect
              value={label.rotate}
              onChange={(value) => {
                onKeyChange('label', {
                  rotate: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="柱子颜色">
        <MultipleSeriesConfig
        // value={itemStyle.color}
        // onChange={(value) => {
        //   onKeyChange('itemStyle', {
        //     color: value,
        //   });
        // }}
        // max={8}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  return (
    <ConfigList>
      {smoothConfig}
      {labelConfig}
      {/* {itemStyleConfig} */}
    </ConfigList>
  );
};

export default SeriesConfig;
