import { useCallback, useMemo } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { CompatColorSelect } from '@/components/ColorSelect';
import { TPercentPieConfig } from '../type';

const { Item } = ConfigList;

const LegendConfig = (props: {
  value: TPercentPieConfig['lineStyle'];
  onChange: ComponentData.ComponentConfigProps<TPercentPieConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { color, line, point } = value;

  const onKeyChange = useCallback(
    (key: keyof TPercentPieConfig['lineStyle'], value: any) => {
      onChange({
        config: {
          options: {
            lineStyle: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const lineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '线条样式',
          key: 'line',
        }}
      >
        <Item label="宽度">
          <FullForm>
            <InputNumber
              value={line.width}
              onChange={(value) => {
                onKeyChange('line', {
                  width: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [line, onKeyChange]);

  const pointConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '圆点样式',
          key: 'point',
        }}
      >
        <Item label="大小">
          <FullForm>
            <InputNumber
              value={point.size}
              onChange={(value) => {
                onKeyChange('point', {
                  size: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [point, onKeyChange]);

  const colorConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'color',
          header: '颜色',
        }}
      >
        {color.map((item, index) => {
          return (
            <Collapse
              key={index}
              child={{
                key: 'color' + (index + 1),
                header: '颜色' + (index + 1),
              }}
            >
              <Item label="线条">
                <FullForm>
                  <CompatColorSelect
                    value={item.line}
                    onChange={(value) => {
                      const newColor = [...color];
                      newColor.splice(index, 1, {
                        ...item,
                        line: value as any,
                      });
                      onKeyChange('color', newColor);
                    }}
                  />
                </FullForm>
              </Item>
              <Item label="圆点">
                <FullForm>
                  <CompatColorSelect
                    value={item.point}
                    onChange={(value) => {
                      const newColor = [...color];
                      newColor.splice(index, 1, {
                        ...item,
                        point: value as any,
                      });
                      onKeyChange('color', newColor);
                    }}
                  />
                </FullForm>
              </Item>
            </Collapse>
          );
        })}
      </Collapse>
    );
  }, [color, onKeyChange]);

  return (
    <ConfigList>
      {lineConfig}
      {pointConfig}
      {colorConfig}
    </ConfigList>
  );
};

export default LegendConfig;
