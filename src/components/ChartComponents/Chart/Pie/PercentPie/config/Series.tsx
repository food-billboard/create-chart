import { useCallback, useMemo } from 'react';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import ColorSelect from '@/components/ColorSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TPercentPieConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPercentPieConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { radius, itemStyle, backgroundColor } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentPieConfig['series'], value: any) => {
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

  const radiusConfig = useMemo(() => {
    return (
      <>
        <Item label="内饼图大小（%）">
          <HalfForm label="内">
            <InputNumber
              max={100}
              min={0}
              value={radius.inner[0]}
              onChange={(value) =>
                onKeyChange('radius', {
                  inner: [value, radius.inner[1]],
                })
              }
              className="w-100"
            />
          </HalfForm>
          <HalfForm label="外">
            <InputNumber
              max={100}
              min={0}
              value={radius.inner[1]}
              onChange={(value) =>
                onKeyChange('radius', {
                  inner: [radius.inner[0], value],
                })
              }
              className="w-100"
            />
          </HalfForm>
        </Item>
        <Item label="外饼图大小（%）">
          <HalfForm label="内">
            <InputNumber
              max={100}
              min={0}
              value={radius.outer[0]}
              onChange={(value) =>
                onKeyChange('radius', {
                  outer: [value, radius.outer[1]],
                })
              }
              className="w-100"
            />
          </HalfForm>
          <HalfForm label="外">
            <InputNumber
              max={100}
              min={0}
              value={radius.outer[1]}
              onChange={(value) =>
                onKeyChange('radius', {
                  outer: [radius.outer[0], value],
                })
              }
              className="w-100"
            />
          </HalfForm>
        </Item>
      </>
    );
  }, [radius, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="渐变环">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('PERCENT_PIE')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange, onChange]);

  const backgroundColorConfig = useMemo(() => {
    return (
      <Item label="背景色">
        <FullForm>
          <ColorSelect
            value={backgroundColor}
            onChange={onKeyChange.bind(null, 'backgroundColor')}
          />
        </FullForm>
      </Item>
    );
  }, [backgroundColor, onKeyChange]);

  return (
    <ConfigList>
      {radiusConfig}
      {backgroundColorConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
