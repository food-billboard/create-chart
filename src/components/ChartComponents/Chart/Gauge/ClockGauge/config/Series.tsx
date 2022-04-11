import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { pick } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import { TClockGaugeConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TClockGaugeConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TClockGaugeConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    center,
    radius,
    axisLine,
    splitLine,
    axisTick,
    axisLabel,
    minuteAnchor,
    secondAnchor,
    hourPointer,
    minutePointer,
    secondPointer,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TClockGaugeConfig['series'], value: any) => {
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

  const axisLineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '轴线',
          key: 'axisLine',
        }}
      >
        <Item label="线条">
          <FullForm>
            <InputNumber
              className="w-100"
              value={axisLine.lineStyle.width}
              onChange={(value) => {
                onKeyChange('axisLine', {
                  ...axisLine,
                  lineStyle: {
                    width: value,
                  },
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              value={axisLine.lineStyle.color}
              onChange={(value) => {
                onKeyChange('axisLine', {
                  ...axisLine,
                  lineStyle: {
                    color: value,
                  },
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [axisLine, onKeyChange]);

  const splitLineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '分隔线',
          key: 'splitLine',
        }}
      >
        <Item label="宽度">
          <FullForm>
            <InputNumber
              className="w-100"
              value={splitLine.width}
              onChange={(value) => {
                onKeyChange('splitLine', {
                  width: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              value={splitLine.color}
              onChange={(value) => {
                onKeyChange('splitLine', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="长度">
          <FullForm>
            <InputNumber
              className="w-100"
              value={splitLine.length}
              onChange={(value) => {
                onKeyChange('splitLine', {
                  length: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [splitLine, onKeyChange]);

  const radiusConfig = useMemo(() => {
    return (
      <Item label="大小">
        <FullForm>
          <InputNumber
            className="w-100"
            value={radius}
            onChange={onKeyChange.bind(null, 'radius')}
          />
        </FullForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  const centerConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: center[0],
          top: center[1],
        }}
        onChange={(value) => {
          onKeyChange('center', [value.left, value.top]);
        }}
      />
    );
  }, [center, onKeyChange]);

  const axisTickConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '刻度',
          key: 'axisTick',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('axisTick', {
              show: value,
            });
          },
          value: axisTick.show,
        }}
      >
        <Item label="长度">
          <FullForm>
            <InputNumber
              value={axisTick.length}
              onChange={(value) => {
                onKeyChange('axisTick', {
                  length: value,
                });
              }}
              className="w-100"
            />
          </FullForm>
        </Item>
        <LineStyleGroupConfig
          collapseProps={{
            child: {
              header: '线条样式',
              key: 'axisTick_lineStyle',
            },
          }}
          ignore={['type']}
          value={axisTick.lineStyle}
          onChange={(value) => {
            onKeyChange('axisTick', {
              lineStyle: value,
            });
          }}
        />
      </Collapse>
    );
  }, [axisTick, onKeyChange]);

  const axisLabelConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '刻度标签',
          key: 'axisLabel',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('axisLabel', {
              show: value,
            });
          },
          value: axisLabel.show,
        }}
      >
        <Item label="距离">
          <FullForm>
            <InputNumber
              className="w-100"
              value={axisLabel.distance}
              onChange={(value) => {
                onKeyChange('axisLabel', {
                  distance: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'font',
          }}
        >
          <FontConfigList
            value={pick(axisLabel, [
              'color',
              'fontSize',
              'fontWeight',
              'fontFamily',
            ])}
            onChange={onKeyChange.bind(null, 'axisLabel')}
          />
        </Collapse>
      </Collapse>
    );
  }, [axisLabel, onKeyChange]);

  const pointerConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '指针',
          key: 'pointer',
        }}
      >
        <Collapse
          child={{
            header: '时针',
            key: 'hourPointer',
          }}
        >
          <Item label="尺寸">
            <HalfForm label="长度">
              <InputNumber
                value={hourPointer.length}
                onChange={(value) => {
                  onKeyChange('hourPointer', {
                    length: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="宽度">
              <InputNumber
                value={hourPointer.width}
                onChange={(value) => {
                  onKeyChange('hourPointer', {
                    width: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={hourPointer.itemStyle.color}
                onChange={(value) => {
                  onKeyChange('hourPointer', {
                    itemStyle: {
                      color: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Collapse
          child={{
            header: '分针',
            key: 'minutePointer',
          }}
        >
          <Item label="尺寸">
            <HalfForm label="长度">
              <InputNumber
                value={minutePointer.length}
                onChange={(value) => {
                  onKeyChange('minutePointer', {
                    length: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="宽度">
              <InputNumber
                value={minutePointer.width}
                onChange={(value) => {
                  onKeyChange('minutePointer', {
                    width: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={minutePointer.itemStyle.color}
                onChange={(value) => {
                  onKeyChange('minutePointer', {
                    itemStyle: {
                      color: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Collapse
          child={{
            header: '秒针',
            key: 'secondPointer',
          }}
        >
          <Item label="尺寸">
            <HalfForm label="长度">
              <InputNumber
                value={secondPointer.length}
                onChange={(value) => {
                  onKeyChange('secondPointer', {
                    length: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="宽度">
              <InputNumber
                value={secondPointer.width}
                onChange={(value) => {
                  onKeyChange('secondPointer', {
                    width: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={secondPointer.itemStyle.color}
                onChange={(value) => {
                  onKeyChange('secondPointer', {
                    itemStyle: {
                      color: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
      </Collapse>
    );
  }, [minutePointer, secondPointer, hourPointer, onKeyChange]);

  const anchorConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '固定点',
          key: 'anchor',
        }}
      >
        <Collapse
          child={{
            header: '外框',
            key: 'minuteAnchor',
          }}
        >
          <Item label="大小">
            <FullForm>
              <InputNumber
                value={minuteAnchor.itemStyle.borderWidth}
                onChange={(value) => {
                  onKeyChange('minuteAnchor', {
                    itemStyle: {
                      borderWidth: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={minuteAnchor.itemStyle.borderColor}
                onChange={(value) => {
                  onKeyChange('minuteAnchor', {
                    itemStyle: {
                      borderColor: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
        <Collapse
          child={{
            header: '内框',
            key: 'secondAnchor',
          }}
        >
          <Item label="大小">
            <FullForm>
              <InputNumber
                value={secondAnchor.size}
                onChange={(value) => {
                  onKeyChange('secondAnchor', {
                    size: value,
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={secondAnchor.itemStyle.color}
                onChange={(value) => {
                  onKeyChange('secondAnchor', {
                    itemStyle: {
                      color: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
      </Collapse>
    );
  }, [minutePointer, secondPointer, hourPointer, onKeyChange]);

  return (
    <ConfigList>
      {centerConfig}
      {radiusConfig}
      {axisLineConfig}
      {splitLineConfig}
      {axisTickConfig}
      {axisLabelConfig}
      {pointerConfig}
      {anchorConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
