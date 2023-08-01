import { InfoCircleOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Select from '@/components/ChartComponents/Common/Select';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import ColorSelect from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TScatterMapConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TScatterMapConfig['scatter'];
  onChange: ComponentData.ComponentConfigProps<TScatterMapConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, itemStyle, effectType, rippleEffect, symbol, symbolSize } =
    value;

  const onKeyChange = useCallback(
    (key: keyof TScatterMapConfig['scatter'], value: any) => {
      onChange({
        config: {
          options: {
            scatter: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const effectTypeConfig = useMemo(() => {
    return (
      <Item label="特效类型">
        <FullForm>
          <Select
            value={effectType}
            className="w-100"
            onChange={onKeyChange.bind(null, 'effectType')}
            options={[
              {
                label: '涟漪',
                value: 'ripple',
              },
            ]}
          />
        </FullForm>
      </Item>
    );
  }, [effectType, onKeyChange]);

  const rippleEffectConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'rippleEffect',
          header: '涟漪',
        }}
      >
        <Item label="颜色">
          <FullForm>
            <ColorSelect
              value={rippleEffect.color}
              onChange={(value) => {
                onKeyChange('rippleEffect', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="波纹数量">
          <FullForm>
            <InputNumber
              value={rippleEffect.number}
              onChange={(value) => {
                onKeyChange('rippleEffect', {
                  number: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="动画周期（秒）">
          <FullForm>
            <InputNumber
              value={rippleEffect.period}
              onChange={(value) => {
                onKeyChange('rippleEffect', {
                  period: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="最大缩放比例">
          <FullForm>
            <InputNumber
              value={rippleEffect.scale}
              onChange={(value) => {
                onKeyChange('rippleEffect', {
                  scale: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="绘制方式">
          <FullForm>
            <Select
              value={rippleEffect.brushType}
              onChange={(value) => {
                onKeyChange('rippleEffect', {
                  brushType: value,
                });
              }}
              className="w-100"
              options={[
                {
                  label: '线条',
                  value: 'stroke',
                },
                {
                  label: '填充',
                  value: 'fill',
                },
              ]}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [rippleEffect, onKeyChange]);

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

  const symbolConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'symbol',
          header: '图形',
        }}
      >
        <Item label="类型">
          <FullForm>
            <SymbolSelect
              value={symbol}
              onChange={onKeyChange.bind(null, 'symbol')}
            />
          </FullForm>
        </Item>
        <Item
          label="大小"
          placeholder={
            <IconTooltip title="大小基数，根据此值乘数据的值">
              <InfoCircleOutlined />
            </IconTooltip>
          }
        >
          <FullForm>
            <InputNumber
              value={symbolSize}
              onChange={onKeyChange.bind(null, 'symbolSize')}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [symbol, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="标记颜色">
        <FullForm>
          <ColorSelect
            value={itemStyle.color}
            onChange={(value) => {
              onKeyChange('itemStyle', {
                color: value,
              });
            }}
          />
        </FullForm>
      </Item>
    );
  }, [itemStyle, onKeyChange]);

  return (
    <ConfigList>
      {itemStyleConfig}
      {rippleEffectConfig}
      {effectTypeConfig}
      {labelConfig}
      {symbolConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
