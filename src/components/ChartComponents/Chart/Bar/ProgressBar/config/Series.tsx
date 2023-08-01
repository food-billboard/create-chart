import { useCallback, useMemo } from 'react';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import { TProgressBarConfig } from '../type';

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
        parent={{
          defaultActiveKey: ['background'],
        }}
      >
        <Item label="颜色">
          <FullForm>
            <ColorSelect
              defaultValue={backgroundStyle.color}
              onChange={(value) => {
                onKeyChange('backgroundStyle', {
                  color: value,
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
    );
  }, [itemStyle, onKeyChange]);

  const barConfig = useMemo(() => {
    return (
      <>
        <Item label="宽度">
          <FullForm>
            <InputNumber
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
