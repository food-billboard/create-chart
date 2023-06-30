import { useCallback, useMemo } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import { TWordCloudBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TWordCloudBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TWordCloudBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    textStyle,
    sizeRange,
    rotationRange,
    rotationStep,
    gridSize,
    maskImage,
    shape,
    keepAspect,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TWordCloudBasicConfig['series'], value: any) => {
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

  const textStyleConfig = useMemo(() => {
    const {
      color: { range },
    } = textStyle;
    return (
      <FontConfigList
        {...(textStyle as any)}
        onChange={onKeyChange.bind(null, 'textStyle')}
        ignore={['color', 'fontSize']}
        level={1}
      >
        <Collapse
          child={{
            header: '颜色范围',
            key: 'color',
          }}
        >
          {['r', 'g', 'b'].map((item: any) => {
            const target = (range as any)[item];
            return (
              <Item label={item.toUpperCase()} key={item}>
                <HalfForm label="最小">
                  <InputNumber
                    value={target[0]}
                    onChange={(value) => {
                      onKeyChange('textStyle', {
                        color: {
                          range: {
                            [item]: [value, target[1]],
                          },
                        },
                      });
                    }}
                  />
                </HalfForm>
                <HalfForm label="最大">
                  <InputNumber
                    value={target[1]}
                    onChange={(value) => {
                      onKeyChange('textStyle', {
                        color: {
                          range: {
                            [item]: [target[0], value],
                          },
                        },
                      });
                    }}
                  />
                </HalfForm>
              </Item>
            );
          })}
        </Collapse>
      </FontConfigList>
    );
  }, [textStyle, onKeyChange]);

  const sizeRangeConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="文字大小"
        value={{
          max: sizeRange[1],
          min: sizeRange[0],
        }}
        onChange={(value) => {
          onKeyChange('sizeRange', [value.min, value.max]);
        }}
      />
    );
  }, [sizeRange, onKeyChange]);

  const rotationRangeConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="旋转角度"
        value={{
          max: rotationRange[1],
          min: rotationRange[0],
        }}
        onChange={(value) => {
          onKeyChange('rotationRange', [value.min, value.max]);
        }}
      />
    );
  }, [rotationRange, onKeyChange]);

  const rotationStepConfig = useMemo(() => {
    return (
      <Item label="单次旋转">
        <FullForm>
          <InputNumber
            value={rotationStep}
            onChange={onKeyChange.bind(null, 'rotationStep')}
          />
        </FullForm>
      </Item>
    );
  }, [rotationRange, onKeyChange]);

  const gridSizeConfig = useMemo(() => {
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            value={gridSize}
            onChange={onKeyChange.bind(null, 'gridSize')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [gridSize, onKeyChange]);

  const shapeConfig = useMemo(() => {
    return (
      <Item label="形状">
        <FullForm>
          <Select
            value={shape}
            onChange={onKeyChange.bind(null, 'shape')}
            className="w-100"
            options={[
              {
                label: 'cardioid',
              },
              {
                label: 'circle',
              },
              {
                label: 'diamond',
              },
              {
                label: 'square',
              },
              {
                label: 'triangle-forward',
              },
              {
                label: 'triangle',
              },
              {
                label: 'pentagon',
              },
              {
                label: 'star',
              },
            ]}
          />
        </FullForm>
      </Item>
    );
  }, [shape, onKeyChange]);

  return (
    <ConfigList>
      {shapeConfig}
      {textStyleConfig}
      {sizeRangeConfig}
      {rotationRangeConfig}
      {rotationStepConfig}
      {gridSizeConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
