import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { pick } from 'lodash';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyle from '@/components/ChartComponents/Common/LineStyleSelect';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { CompatColorSelect } from '@/components/ColorSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
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
      <LineStyleGroupConfig
        collapseProps={{
          child: {
            header: '当前进度',
            key: 'progress',
            visibleRender: true,
            onChange: (value) => {
              onKeyChange('progress', {
                show: value,
              });
            },
            value: progress.show,
          },
        }}
        ignore={['type']}
        value={
          {
            color: progress.color,
            width: progress.width,
          } as any
        }
        onChange={onKeyChange.bind(null, 'progress')}
      />
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
            <InputNumber
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

  const minMaxConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="数值范围"
        value={{
          max,
          min,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                series: value,
              },
            },
          });
        }}
      />
    );
  }, [min, max, onKeyChange]);

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

  const minMaxAngleConfig = useMemo(() => {
    return (
      <MaxMinConfig
        label="角度范围"
        subLabel={['起始', '结束']}
        value={{
          max: endAngle,
          min: startAngle,
        }}
        onChange={(value) => {
          onChange({
            config: {
              options: {
                series: {
                  startAngle: value.min,
                  endAngle: value.max,
                },
              },
            },
          });
        }}
      />
    );
  }, [startAngle, endAngle, onKeyChange]);

  const splitNumberConfig = useMemo(() => {
    return (
      <Item label="刻度段数">
        <FullForm>
          <InputNumber
            value={splitNumber}
            onChange={onKeyChange.bind(null, 'splitNumber')}
            className="w-100"
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
              className="w-100"
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
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('pointer', {
              show: value,
            });
          },
          value: pointer.show,
        }}
      >
        <Item label="尺寸">
          <HalfForm label="长度">
            <InputNumber
              value={pointer.length}
              onChange={(value) => {
                onKeyChange('pointer', {
                  length: value,
                });
              }}
            />
          </HalfForm>
          <HalfForm label="宽度">
            <InputNumber
              value={pointer.width}
              onChange={(value) => {
                onKeyChange('pointer', {
                  width: value,
                });
              }}
            />
          </HalfForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <CompatColorSelect
              value={pointer.itemStyle.color}
              onChange={(value) => {
                onKeyChange('pointer', {
                  itemStyle: {
                    color: value,
                  },
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
        <Collapse
          child={{
            header: '文字',
            key: 'font',
          }}
        >
          <FontConfigList
            value={pick(title, [
              'color',
              'fontSize',
              'fontWeight',
              'fontFamily',
            ])}
            onChange={onKeyChange.bind(null, 'title')}
          />
        </Collapse>
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
        <Collapse
          child={{
            header: '文字',
            key: 'font',
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
        </Collapse>
        <Item label="动画">
          <FullForm>
            <Switch
              checked={detail.valueAnimation}
              onChange={(value) => {
                onKeyChange('detail', {
                  valueAnimation: value,
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
