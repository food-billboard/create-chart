import { useCallback, useMemo } from 'react';
import { CompatColorSelect } from '@/components/ColorSelect';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import { InputNumber as AutoInputNumber } from '@/components/ChartComponents/Common/NumberPositionConfig';
import { TProgressBarConfig } from '../type';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TProgressBarConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TProgressBarConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { backgroundStyle, showBackground, barWidth, label, itemStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TProgressBarConfig['series'], value: any) => {
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
          visibleRender: true,
          value: showBackground,
          onChange: onKeyChange.bind(null, 'showBackground'),
        }}
      >
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              defaultValue={backgroundStyle.color}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  color: value,
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
  }, [showBackground, backgroundStyle, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        ignore={['position']}
        onChange={onKeyChange.bind(null, 'label')}
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

  const itemStyleConfig = useMemo(() => {
    return (
      <>
        <Item label="圆角">
          <FullForm>
            <InputNumber
              value={itemStyle.borderRadius}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  borderRadius: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '颜色',
            key: 'color',
          }}
        >
          <ChartGradientSelect
            value={itemStyle.color}
            onChange={(value) => {
              onKeyChange('itemStyle', {
                color: value,
              });
            }}
          />
        </Collapse>
      </>
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="宽度">
          <FullForm>
            <AutoInputNumber
              value={barWidth}
              onChange={onKeyChange.bind(null, 'barWidth')}
            />
          </FullForm>
        </Item>
      </>
    );
  }, [barWidth, onKeyChange]);

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
