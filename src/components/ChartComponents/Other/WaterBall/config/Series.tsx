import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TWaterBallConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TWaterBallConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TWaterBallConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    label,
    amplitude,
    waveAnimation,
    backgroundStyle,
    color,
    center,
    radius,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TWaterBallConfig['series'], value: any) => {
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

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        ignore={['position']}
        onChange={onKeyChange.bind(null, 'label')}
      />
    );
  }, [label, onKeyChange]);

  const amplitudeConfig = useMemo(() => {
    return (
      <Item label="振幅">
        <FullForm>
          <InputNumber
            value={amplitude}
            onChange={onKeyChange.bind(null, 'amplitude')}
          />
        </FullForm>
      </Item>
    );
  }, [amplitude, onKeyChange]);

  const waveAnimationConfig = useMemo(() => {
    return (
      <Item label="波动动画">
        <FullForm>
          <Switch
            checked={waveAnimation}
            onChange={onKeyChange.bind(null, 'waveAnimation')}
          />
        </FullForm>
      </Item>
    );
  }, [waveAnimation, onKeyChange]);

  const backgroundStyleConfig = useMemo(() => {
    return (
      <Item label="背景色">
        <FullForm>
          <CompatColorSelect
            value={backgroundStyle.color}
            onChange={(value) =>
              onKeyChange('backgroundStyle', {
                color: value,
              })
            }
          />
        </FullForm>
      </Item>
    );
  }, [backgroundStyle, onKeyChange]);

  const colorConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '波浪色',
          key: 'color',
        }}
      >
        <ChartGradientSelect
          value={color}
          onChange={onKeyChange.bind(null, 'color')}
        />
      </Collapse>
    );
  }, [color, onKeyChange]);

  const centerConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: center[0],
          top: center[1],
        }}
        onChange={(value) => {
          const { left, top } = value;
          onKeyChange('center', [left, top]);
        }}
      />
    );
  }, [center, onKeyChange]);

  const radiusConfig = useMemo(() => {
    return (
      <Item label="大小">
        <FullForm>
          <InputNumber
            max={100}
            min={0}
            value={radius}
            onChange={onKeyChange.bind(null, 'radius')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  return (
    <ConfigList>
      {centerConfig}
      {radiusConfig}
      {colorConfig}
      {backgroundStyleConfig}
      {labelConfig}
      {amplitudeConfig}
      {waveAnimationConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
