import { pick } from 'lodash';
import { useCallback, useMemo } from 'react';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import { TRadarBasicConfig } from '../type';

const { Item } = ConfigList;

const RadarConfig = (props: {
  value: TRadarBasicConfig['radar'];
  onChange: ComponentData.ComponentConfigProps<TRadarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;

  const {
    center,
    radius,
    axisName,
    axisNameGap,
    splitNumber,
    shape,
    axisLine,
    splitLine,
    splitArea,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TRadarBasicConfig['radar'], value: any) => {
      onChange({
        config: {
          options: {
            radar: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const axisNameConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '指示器名称',
          key: 'axisName',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('axisName', {
              show: value,
            });
          },
          value: axisName.show,
        }}
      >
        <FormatterSelect
          value={axisName.formatter}
          onChange={(value) => {
            onKeyChange('axisName', {
              formatter: value,
            });
          }}
        />
        <Collapse
          child={{
            header: '文字',
            key: 'font',
          }}
        >
          <FontConfigList
            value={pick(axisName, [
              'fontSize',
              'color',
              'fontFamily',
              'fontWeight',
            ])}
            onChange={onKeyChange.bind(null, 'axisName')}
          />
        </Collapse>
      </Collapse>
    );
  }, [axisName, onKeyChange]);

  const axisLineConfig = useMemo(() => {
    return (
      <LineStyleGroupConfig
        collapseProps={{
          child: {
            header: '轴线',
            key: 'axisLine',
            visibleRender: true,
            onChange: (value) => {
              onKeyChange('axisLine', {
                show: value,
              });
            },
            value: axisLine.show,
          },
        }}
        value={axisLine.lineStyle}
        onChange={(value) => {
          onKeyChange('axisLine', {
            lineStyle: value,
          });
        }}
      />
    );
  }, [axisLine, onKeyChange]);

  const splitLineConfig = useMemo(() => {
    return (
      <LineStyleGroupConfig
        collapseProps={{
          child: {
            header: '分隔线',
            key: 'splitLine',
            visibleRender: true,
            onChange: (value) => {
              onKeyChange('splitLine', {
                show: value,
              });
            },
            value: splitLine.show,
          },
        }}
        value={splitLine.lineStyle}
        onChange={(value) => {
          onKeyChange('splitLine', {
            lineStyle: value,
          });
        }}
      />
    );
  }, [axisLine, onKeyChange]);

  const splitAreaConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '分隔区域',
          key: 'splitArea',
          visibleRender: true,
          onChange: (value) => {
            onKeyChange('splitArea', {
              show: value,
            });
          },
          value: splitArea.show,
        }}
      >
        <Item label="区域一颜色">
          <FullForm>
            <ColorSelect
              value={splitArea.areaStyle.color[0]}
              onChange={(value) => {
                onKeyChange('splitArea', {
                  areaStyle: {
                    color: [value, splitArea.areaStyle.color[1]],
                  },
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="区域二颜色">
          <FullForm>
            <ColorSelect
              value={splitArea.areaStyle.color[1]}
              onChange={(value) => {
                onKeyChange('splitArea', {
                  areaStyle: {
                    color: [splitArea.areaStyle.color[0], value],
                  },
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [splitArea, onKeyChange]);

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

  const nameGapConfig = useMemo(() => {
    return (
      <Item label="名称与轴距离">
        <FullForm>
          <InputNumber
            value={axisNameGap}
            onChange={onKeyChange.bind(null, 'axisNameGap')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [axisNameGap, onKeyChange]);

  const splitNumberConfig = useMemo(() => {
    return (
      <Item label="轴分隔段数">
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

  const shapeConfig = useMemo(() => {
    return (
      <Item label="形状">
        <FullForm>
          <Select
            value={shape}
            onChange={onKeyChange.bind(null, 'shape')}
            className="w-100"
            options={[{ label: 'polygon' }, { label: 'circle' }]}
          />
        </FullForm>
      </Item>
    );
  }, [shape, onKeyChange]);

  return (
    <ConfigList>
      {centerConfig}
      {radiusConfig}
      {nameGapConfig}
      {splitNumberConfig}
      {shapeConfig}
      {axisNameConfig}
      {axisLineConfig}
      {splitLineConfig}
      {splitAreaConfig}
    </ConfigList>
  );
};

export default RadarConfig;
