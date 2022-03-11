import { useCallback, useMemo } from 'react';
import { Select } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
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
      <Item label="文字大小">
        <HalfForm label="最小">
          <InputNumber
            value={sizeRange[0]}
            onChange={(value) => {
              onKeyChange('sizeRange', [value, sizeRange[1]]);
            }}
          />
        </HalfForm>
        <HalfForm label="最大">
          <InputNumber
            value={sizeRange[1]}
            onChange={(value) => {
              onKeyChange('sizeRange', [sizeRange[0], value]);
            }}
          />
        </HalfForm>
      </Item>
    );
  }, [sizeRange, onKeyChange]);

  const rotationRangeConfig = useMemo(() => {
    return (
      <Item label="旋转角度">
        <HalfForm label="最小">
          <InputNumber
            value={rotationRange[0]}
            onChange={(value) => {
              onKeyChange('rotationRange', [value, rotationRange[1]]);
            }}
          />
        </HalfForm>
        <HalfForm label="最大">
          <InputNumber
            value={rotationRange[1]}
            onChange={(value) => {
              onKeyChange('rotationRange', [rotationRange[0], value]);
            }}
          />
        </HalfForm>
      </Item>
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
          >
            {[
              'cardioid',
              'circle',
              'diamond',
              'square',
              'triangle-forward',
              'triangle',
              'pentagon',
              'star',
            ].map((item) => {
              return (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
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
