import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Select from '@/components/ChartComponents/Common/Select';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import SimpleHueSelect from '@/components/ChartComponents/Common/SimpleHueSelect';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import Input from '@/components/ImageUpload/Input';
import IconTooltip from '@/components/IconTooltip';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { TTreeBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TTreeBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TTreeBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    labelLayout,
    layout,
    orient,
    symbol,
    symbolSize,
    defaultSymbolSize,
    label,
    itemStyle,
    lineStyle,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TTreeBasicConfig['series'], value: any) => {
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

  const labelLayoutConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '布局',
          key: 'lineStyle',
        }}
      >
        <Item label="隐藏重叠标签">
          <FullForm>
            <Switch
              checked={labelLayout.hideOverlap}
              onChange={(value) => {
                onKeyChange('labelLayout', {
                  hideOverlap: value,
                });
              }}
            />
          </FullForm>
        </Item>
        {/* <Item 
          label="位置变动"
          placeholder={(
            <IconTooltip
              title='在标签重叠的时候是否挪动标签位置以防止重叠'
            >
              <InfoCircleOutlined />
            </IconTooltip>
          )}
        >
          <FullForm>
            <Select
              value={labelLayout.moveOverlap}
              onChange={(value) => {
                onKeyChange('labelLayout', {
                  moveOverlap: value,
                });
              }}
              options={[
                {
                  label: '水平方向依次位移',
                  value: 'shiftX'
                },
                {
                  label: '垂直方向依次位移',
                  value: 'shiftY'
                }
              ]}
              className='w-100'
            />
          </FullForm>
        </Item>
        <Item label="二次拖拽">
          <FullForm>
            <Switch
              checked={labelLayout.draggable}
              onChange={(value) => {
                onKeyChange('labelLayout', {
                  draggable: value,
                });
              }}
            />
          </FullForm>
        </Item> */}
      </Collapse>
    );
  }, [lineStyle, onKeyChange]);

  const labelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(label as any)}
        onChange={onKeyChange.bind(null, 'label')}
        ignore={['position']}
      >
        <FormatterSelect
          value={label.formatter}
          onChange={(value) => {
            onKeyChange('label', {
              formatter: value,
            });
          }}
        />
        {labelLayoutConfig}
      </SeriesLabelConfig>
    );
  }, [label, labelLayoutConfig, onKeyChange]);

  const lineStyleConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '树图边',
          key: 'lineStyle',
        }}
      >
        <Item label="宽度">
          <InputNumber
            value={lineStyle.width}
            onChange={(value) => {
              onKeyChange('lineStyle', {
                width: value,
              });
            }}
          />
        </Item>
        <Item label="曲度">
          <InputNumber
            value={lineStyle.curveness}
            onChange={(value) => {
              onKeyChange('lineStyle', {
                curveness: value,
              });
            }}
          />
        </Item>
      </Collapse>
    );
  }, [lineStyle, onKeyChange]);

  const layoutConfig = useMemo(() => {
    return (
      <Item label="布局">
        <FullForm>
          <Select
            options={[
              {
                label: '正交',
                value: 'orthogonal',
              },
              {
                label: '径向',
                value: 'radial',
              },
            ]}
            value={layout}
            onChange={onKeyChange.bind(null, 'layout')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [layout, onKeyChange]);

  const orientConfig = useMemo(() => {
    if (layout === 'radial') return null;
    return (
      <Item label="布局方向">
        <FullForm>
          <Select
            options={[
              {
                label: '从左到右',
                value: 'LR',
              },
              {
                label: '从右到左',
                value: 'RL',
              },
              {
                label: '从上到下',
                value: 'TB',
              },
              {
                label: '从下到上',
                value: 'BT',
              },
            ]}
            value={orient}
            onChange={onKeyChange.bind(null, 'orient')}
            className="w-100"
          />
        </FullForm>
      </Item>
    );
  }, [layout, orient, onKeyChange]);

  const symbolConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          key: 'symbol',
          header: '图形',
        }}
      >
        <Item label="类型">
          <FullForm>
            <SymbolSelect
              value={symbol}
              onChange={onKeyChange.bind(null, 'symbol')}
            />
          </FullForm>
        </Item>
        <Item label="默认大小">
          <FullForm>
            <InputNumber
              value={defaultSymbolSize}
              onChange={onKeyChange.bind(null, 'defaultSymbolSize')}
            />
          </FullForm>
        </Item>
        <Item
          label="子节点大小"
          placeholder={
            <IconTooltip title="数据计算公式计算子节点与父节点的大小关系">
              <InfoCircleOutlined />
            </IconTooltip>
          }
        >
          <FullForm>
            <Input
              defaultValue={symbolSize}
              onChange={onKeyChange.bind(null, 'symbolSize')}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [symbol, symbolSize, defaultSymbolSize, onKeyChange]);

  const itemStyleConfig = useMemo(() => {
    return (
      <Item label="颜色">
        <SimpleHueSelect
          value={itemStyle.color}
          onChange={(value) => {
            onKeyChange('itemStyle', {
              color: value,
            });
          }}
          max={GlobalConfig.getChartSeriesCounter('TREE_BASIC')}
        />
      </Item>
    );
  }, [itemStyle, onKeyChange, onChange]);

  return (
    <ConfigList>
      {layoutConfig}
      {orientConfig}
      {symbolConfig}
      {labelConfig}
      {lineStyleConfig}
      {itemStyleConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
