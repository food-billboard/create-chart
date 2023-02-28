import { useCallback, useMemo } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ChartGradientSelect from '@/components/ChartComponents/Common/ChartGradientSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_RADIAL_CONFIG } from '@/utils/constants/defaultComponentConfig';
import { TRadialStackLineConfig } from '../type';

const SeriesConfig = (props: {
  value: TRadialStackLineConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TRadialStackLineConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { areaStyle } = value;

  const onKeyChange = useCallback(
    (key: keyof TRadialStackLineConfig['series'], value: any) => {
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

  const itemStyleConfig = useMemo(() => {
    const { color: areaStyleColor } = areaStyle;
    const counter = areaStyleColor.length;
    return (
      <MultipleSeriesConfig
        counter={counter}
        renderContent={(index) => {
          const targetAreaStyleColor = areaStyleColor[index] || {};
          return (
            <Collapse
              child={{
                key: 'areaColor',
                header: '区域颜色',
              }}
              parent={{
                activeKey: ['areaColor'],
              }}
            >
              <ChartGradientSelect
                value={targetAreaStyleColor}
                onChange={(value) => {
                  const newColor = [...areaStyleColor];
                  newColor.splice(index, 1, value as any);
                  onChange({
                    config: {
                      options: {
                        series: {
                          areaStyle: {
                            color: newColor,
                          },
                        },
                      },
                    },
                  });
                }}
              />
            </Collapse>
          );
        }}
        onAdd={() => {
          onChange({
            config: {
              options: {
                series: {
                  areaStyle: {
                    color: [
                      ...areaStyleColor,
                      {
                        ...DEFAULT_RADIAL_CONFIG,
                        start:
                          ThemeUtil.generateNextColor4CurrentTheme(counter),
                        end: {
                          ...ThemeUtil.generateNextColor4CurrentTheme(counter),
                          a: 0.3,
                        },
                      },
                    ],
                  },
                },
              },
            },
          });
        }}
        onRemove={(index) => {
          const newAreaStyleColor = [...areaStyleColor];

          newAreaStyleColor.splice(index, 1);

          onChange({
            config: {
              options: {
                series: {
                  areaStyle: {
                    color: newAreaStyleColor,
                  },
                },
              },
            },
          });
        }}
        max={GlobalConfig.getChartSeriesCounter('RADIAL_STACK_LINE')}
      />
    );
  }, [areaStyle, onKeyChange, onChange]);

  return <ConfigList>{itemStyleConfig}</ConfigList>;
};

export default SeriesConfig;
