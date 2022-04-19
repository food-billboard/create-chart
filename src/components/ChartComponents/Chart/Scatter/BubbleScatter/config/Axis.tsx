import { useCallback } from 'react';
import { pick } from 'lodash';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import LineStyleGroupConfig from '@/components/ChartComponents/Common/LineStyleGroupConfig';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import MaxMinConfig from '@/components/ChartComponents/Common/MaxMinConfig';
import Input from '@/components/ImageUpload/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TBubbleScatterConfig } from '../type';

const { Item } = ConfigList;

const AxisConfig = (props: {
  value: TBubbleScatterConfig['xAxis'];
  onChange: ComponentData.ComponentConfigProps<TBubbleScatterConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { left, axisLabel, axisTick, axisLine, name, nameTextStyle, nameGap } =
    value;

  const onKeyChange = useCallback(
    (key: keyof TBubbleScatterConfig['xAxis'], value: any) => {
      onChange({
        config: {
          options: {
            xAxis: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  return (
    <ConfigList>
      <Item label="标题间距">
        <FullForm>
          <InputNumber value={left} onChange={onKeyChange.bind(null, 'left')} />
        </FullForm>
      </Item>
      <Collapse
        child={{
          header: '刻度标签',
          key: 'axisLabel',
          visibleRender: true,
          value: axisLabel.show,
          onChange: (value) =>
            onKeyChange('axisLabel', {
              show: value,
            }),
        }}
      >
        <Collapse
          child={{
            header: '文字',
            key: 'axisLabel',
          }}
        >
          <FontConfigList
            value={pick(axisLabel, [
              'color',
              'fontSize',
              'fontWeight',
              'fontFamily',
            ])}
            onChange={(value) => onKeyChange('axisLabel', value)}
          />
        </Collapse>
        <Item label="旋转">
          <FullForm>
            <InputNumber
              value={axisLabel.rotate}
              onChange={(value) =>
                onKeyChange('axisLabel', {
                  rotate: value,
                })
              }
            />
          </FullForm>
        </Item>
        <Item label="间距">
          <FullForm>
            <InputNumber
              value={axisLabel.margin}
              onChange={(value) =>
                onKeyChange('axisLabel', {
                  margin: value,
                })
              }
            />
          </FullForm>
        </Item>
        <FormatterSelect
          value={axisLabel.formatter}
          onChange={(value) =>
            onKeyChange('axisLabel', {
              formatter: value,
            })
          }
        />
      </Collapse>
      <Collapse
        child={{
          header: '刻度',
          key: 'axisTick',
          visibleRender: true,
          value: axisTick.show,
          onChange: (value) =>
            onKeyChange('axisTick', {
              show: value,
            }),
        }}
      >
        <LineStyleGroupConfig
          value={axisTick.lineStyle}
          onChange={(value) =>
            onKeyChange('axisTick', {
              lineStyle: value,
            })
          }
        />
      </Collapse>
      <Collapse
        child={{
          header: '轴线',
          key: 'axisLine',
          visibleRender: true,
          value: axisLine.show,
          onChange: (value) =>
            onKeyChange('axisLine', {
              show: value,
            }),
        }}
      >
        <Item label="图形类型">
          <FullForm>
            <SymbolSelect
              value={axisLine.symbol}
              onChange={(value) =>
                onKeyChange('axisLine', {
                  symbol: value,
                })
              }
            />
          </FullForm>
        </Item>
        <MaxMinConfig
          label="图形大小"
          value={{
            min: axisLine.symbolSize[0],
            max: axisLine.symbolSize[1],
          }}
          onChange={(value) =>
            onKeyChange('axisLine', {
              symbolSize: [value.min, value.max],
            })
          }
        />
        <LineStyleGroupConfig
          value={axisLine.lineStyle}
          onChange={(value) =>
            onKeyChange('axisLine', {
              lineStyle: value,
            })
          }
        />
      </Collapse>
      <Collapse
        child={{
          header: '坐标轴名称',
          key: 'name',
        }}
      >
        <Item label="内容">
          <FullForm>
            <Input value={name} onChange={onKeyChange.bind(null, 'name')} />
          </FullForm>
        </Item>
        <Item label="距离">
          <FullForm>
            <InputNumber
              value={nameGap}
              onChange={onKeyChange.bind(null, 'nameGap')}
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'textStyle',
          }}
        >
          <FontConfigList
            value={nameTextStyle}
            onChange={onKeyChange.bind(null, 'nameTextStyle')}
          />
        </Collapse>
      </Collapse>
    </ConfigList>
  );
};

export default AxisConfig;
