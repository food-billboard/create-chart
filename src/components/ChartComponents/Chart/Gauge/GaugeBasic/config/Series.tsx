import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { pick } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import NumberPositionConfig from '@/components/ChartComponents/Common/NumberPositionConfig';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TGaugeBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TGaugeBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TGaugeBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    max,
    min,
    splitNumber,
    center,
    radius,
    startAngle,
    endAngle,
    axisLine,
    progress,
    splitLine,
    axisTick,
    axisLabel,
    pointer,
    title,
    detail,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TGaugeBasicConfig['series'], value: any) => {
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
          visibleRender: true,
          value: axisLine.show,
          onChange: () =>
            onKeyChange('axisLine', {
              ...axisLine,
              show: value,
            }),
        }}
      >
        <Item label="线条">
          <FullForm>
            <InputNumber
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
      </Collapse>
    );
  }, [axisLine, onKeyChange]);

  const progressConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '当前进度',
          key: 'progress',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('progress', {
              show: value,
            });
          },
          value: progress.show,
        }}
      >
        <Item label="宽度">
          <FullForm>
            <InputNumber
              value={progress.width}
              onChange={(value) => {
                onKeyChange('progress', {
                  width: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              value={progress.color}
              onChange={(value) => {
                onKeyChange('progress', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [progress, onKeyChange]);

  const splitLineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '分隔线',
          key: 'splitLine',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('splitLine', {
              show: value,
            });
          },
          value: splitLine.show,
        }}
      >
        <Item label="宽度">
          <FullForm>
            <InputNumber
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
            <CompatColorSelect
              value={splitLine.color}
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

  const minMaxConfig = useMemo(() => {
    return (
      <Item label="数值范围">
        <HalfForm label="最小">
          <InputNumber value={min} onChange={onKeyChange.bind(null, 'min')} />
        </HalfForm>
        <HalfForm label="最大">
          <InputNumber value={max} onChange={onKeyChange.bind(null, 'max')} />
        </HalfForm>
      </Item>
    );
  }, [min, max, onKeyChange]);

  const radiusConfig = useMemo(() => {
    return (
      <Item label="大小">
        <FullForm>
          <InputNumber
            value={radius}
            onChange={onKeyChange.bind(null, 'radius')}
          />
        </FullForm>
      </Item>
    );
  }, [radius, onKeyChange]);

  const minMaxAngleConfig = useMemo(() => {
    return (
      <Item label="角度范围">
        <HalfForm label="起始">
          <InputNumber
            value={startAngle}
            onChange={onKeyChange.bind(null, 'startAngle')}
          />
        </HalfForm>
        <HalfForm label="结束">
          <InputNumber
            value={endAngle}
            onChange={onKeyChange.bind(null, 'endAngle')}
          />
        </HalfForm>
      </Item>
    );
  }, [startAngle, endAngle, onKeyChange]);

  const splitNumberConfig = useMemo(() => {
    return (
      <Item label="刻度段数">
        <FullForm label="最小">
          <InputNumber
            value={splitNumber}
            onChange={onKeyChange.bind(null, 'splitNumber')}
          />
        </FullForm>
      </Item>
    );
  }, [splitNumber, onKeyChange]);

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
  }, [min, max, onKeyChange]);

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
            />
          </FullForm>
        </Item>
        <Item label="分隔段数">
          <FullForm>
            <InputNumber
              value={axisTick.splitNumber}
              onChange={(value) => {
                onKeyChange('axisTick', {
                  splitNumber: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '线条样式',
            key: 'axisTick_lineStyle',
          }}
        >
          <Item label="颜色">
            <FullForm>
              <CompatColorSelect
                value={axisTick.lineStyle.color}
                onChange={(value) => {
                  onKeyChange('axisTick', {
                    lineStyle: {
                      color: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="长度">
            <FullForm>
              <InputNumber
                value={axisTick.lineStyle.width}
                onChange={(value) => {
                  onKeyChange('axisTick', {
                    lineStyle: {
                      width: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
          <Item label="类型">
            <FullForm>
              <LineStyle
                value={axisTick.lineStyle.type}
                onChange={(value) => {
                  onKeyChange('axisTick', {
                    lineStyle: {
                      type: value,
                    },
                  });
                }}
              />
            </FullForm>
          </Item>
        </Collapse>
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
              value={axisLabel.distance}
              onChange={(value) => {
                onKeyChange('axisLabel', {
                  distance: value,
                });
              }}
            />
          </FullForm>
        </Item>
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
    );
  }, [axisLabel, onKeyChange]);

  const pointerConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '指针',
          key: 'pointer',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('pointer', {
              show: value,
            });
          },
          value: pointer.show,
        }}
      >
        <Item label="长度">
          <FullForm>
            <InputNumber
              value={pointer.length}
              onChange={(value) => {
                onKeyChange('pointer', {
                  length: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              value={pointer.color}
              onChange={(value) => {
                onKeyChange('pointer', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="长度">
          <FullForm>
            <InputNumber
              value={pointer.length}
              onChange={(value) => {
                onKeyChange('pointer', {
                  length: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [pointer, onKeyChange]);

  const titleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '标题',
          key: 'title',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('title', {
              show: value,
            });
          },
          value: title.show,
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
        <CenterPositionConfig
          value={{
            left: title.offsetCenter[0],
            top: title.offsetCenter[1],
          }}
          onChange={(value) => {
            onKeyChange('title', {
              offsetCenter: [value.left, value.top],
            });
          }}
        />
      </Collapse>
    );
  }, [title, onKeyChange]);

  const detailConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '详情',
          key: 'detail',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('detail', {
              show: value,
            });
          },
          value: detail.show,
        }}
      >
        <FontConfigList
          value={pick(detail, [
            'color',
            'fontSize',
            'fontWeight',
            'fontFamily',
          ])}
          onChange={onKeyChange.bind(null, 'detail')}
        />
        <Item label="动画">
          <FullForm>
            <Switch
              checked={detail.animation}
              onChange={(value) => {
                onKeyChange('detail', {
                  animation: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [detail, onKeyChange]);

  return (
    <ConfigList>
      {minMaxConfig}
      {minMaxAngleConfig}
      {splitNumberConfig}
      {centerConfig}
      {radiusConfig}
      {axisLineConfig}
      {progressConfig}
      {splitLineConfig}
      {axisTickConfig}
      {axisLabelConfig}
      {pointerConfig}
      {titleConfig}
      {detailConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
