import { useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import { SimpleHueRadialSelect } from '@/components/ChartComponents/Common/SimpleHueSelect';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TCachetBarConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TCachetBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TCachetBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { backgroundStyle, barWidth, label, itemStyle, borderRadius } = value;

  const onKeyChange = useCallback(
    (key: keyof TCachetBarConfig['series'], value: any) => {
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

  const backgroundConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'background',
          header: '背景',
        }}
      >
        <Item label="背景色">
          <FullForm>
            <ColorSelect
              defaultValue={backgroundStyle.backgroundColor}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  backgroundColor: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="边框色">
          <FullForm>
            <ColorSelect
              defaultValue={backgroundStyle.borderColor}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  borderColor: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="边框宽度">
          <FullForm>
            <InputNumber
              value={backgroundStyle.borderWidth}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  borderWidth: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="圆角">
          <FullForm>
            <InputNumber
              value={backgroundStyle.borderRadius}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  borderRadius: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [backgroundStyle, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        ignore={['position']}
        onChange={onKeyChange.bind(null, 'label')}
      />
    );
  }, [label, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '柱子颜色',
          key: 'itemColor',
        }}
        parent={{
          activeKey: ['itemColor'],
        }}
      >
        <SimpleHueRadialSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('CACHET_BAR')}
        />
      </Collapse>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="柱子">
          <FullForm label="宽度">
            <InputNumber
              value={barWidth}
              onChange={onKeyChange.bind(null, 'barWidth')}
            />
          </FullForm>
          <FullForm label="圆角">
            <InputNumber
              value={borderRadius}
              onChange={onKeyChange.bind(null, 'borderRadius')}
            />
          </FullForm>
        </Item>
      </>
    );
  }, [barWidth, borderRadius, onKeyChange]);

  return (
    <ConfigList>
      {backgroundConfig}
      {labelConfig}
      {barConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
