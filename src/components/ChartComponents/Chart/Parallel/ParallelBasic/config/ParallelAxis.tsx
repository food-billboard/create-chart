import { useCallback, useMemo } from 'react';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import Select from '@/components/ChartComponents/Common/Select';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ColorSelect from '@/components/ColorSelect';
import { TParallelBasicConfig } from '../type';

const { Item } = ConfigList;

const ParallelAxisConfig = (props: {
  value: TParallelBasicConfig['parallelAxis'];
  onChange: ComponentData.ComponentConfigProps<TParallelBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    areaSelectStyle,
    nameLocation,
    nameTextStyle,
    nameGap,
    nameRotate,
    axisLine,
    axisLabel,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TParallelBasicConfig['parallelAxis'], value: any) => {
      onChange({
        config: {
          options: {
            parallelAxis: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const areaSelectStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '框选区域',
          key: 'areaSelectStyle',
        }}
      >
        <Item label="宽度">
          <FullForm>
            <InputNumber
              className="w-100"
              value={areaSelectStyle.width}
              onChange={(value) => {
                onKeyChange('areaSelectStyle', {
                  width: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item label="颜色">
          <FullForm>
            <ColorSelect
              value={areaSelectStyle.color}
              onChange={(value) => {
                onKeyChange('areaSelectStyle', {
                  color: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [areaSelectStyle, onKeyChange]);

  const nameConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '坐标轴名称',
          key: 'name',
        }}
      >
        <Item label="位置">
          <FullForm>
            <Select
              className="w-100"
              value={nameLocation}
              onChange={onKeyChange.bind(null, 'nameLocation')}
              options={[
                { label: 'start' },
                { label: 'center' },
                { label: 'end' },
              ]}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文本',
            key: 'textStyle',
          }}
        >
          <FontConfigList
            value={nameTextStyle}
            onChange={onKeyChange.bind(null, 'nameTextStyle')}
          />
        </Collapse>
        <Item label="间距">
          <FullForm>
            <InputNumber
              className="w-100"
              value={nameGap}
              onChange={onKeyChange.bind(null, 'nameGap')}
            />
          </FullForm>
        </Item>
        <AngleSelect
          value={nameRotate}
          onChange={onKeyChange.bind(null, 'nameRotate')}
        />
      </Collapse>
    );
  }, [nameLocation, nameTextStyle, nameGap, nameRotate, onKeyChange]);

  const axisLabelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(axisLabel as any)}
        ignore={['position']}
        onChange={onKeyChange.bind(null, 'axisLabel')}
      >
        <AngleSelect
          value={axisLabel.rotate}
          onChange={(value) => {
            onKeyChange('axisLabel', {
              rotate: value,
            });
          }}
        />
        <Item label="间距">
          <FullForm>
            <InputNumber
              className="w-100"
              value={axisLabel.margin}
              onChange={(value) => {
                onKeyChange('axisLabel', {
                  margin: value,
                });
              }}
            />
          </FullForm>
        </Item>
      </SeriesLabelConfig>
    );
  }, [axisLabel, onKeyChange]);

  const axisLineConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '轴线',
          key: 'axisLine',
          visibleRender: true,
          value: axisLine.show,
          onChange: (value) => {
            onKeyChange('axisLine', {
              show: value,
            });
          },
        }}
      >
        <LineStyleGroupConfig
          value={axisLine.lineStyle}
          onChange={(value) => {
            onKeyChange('axisLine', {
              lineStyle: value,
            });
          }}
        />
      </Collapse>
    );
  }, [axisLine, onKeyChange]);

  return (
    <ConfigList>
      {areaSelectStyleConfig}
      {nameConfig}
      {axisLabelConfig}
      {axisLineConfig}
    </ConfigList>
  );
};

export default ParallelAxisConfig;
