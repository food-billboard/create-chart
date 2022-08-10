import { useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import SeriesLabelConfig from '@/components/ChartComponents/Common/SeriesLabelConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import IconTooltip from '@/components/IconTooltip';
import KeyWordPosition from '@/components/ChartComponents/Common/KeyWordPosition';
import { CompatColorSelect } from '@/components/ColorSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import { TTreeMapBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TTreeMapBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TTreeMapBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { label, upperLabel, squareRatio, nodeClick, breadcrumb } = value;

  const onKeyChange = useCallback(
    (key: keyof TTreeMapBasicConfig['series'], value: any) => {
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
      </SeriesLabelConfig>
    );
  }, [label, onKeyChange]);

  const upperLabelConfig = useMemo(() => {
    return (
      <SeriesLabelConfig
        {...(upperLabel as any)}
        onChange={onKeyChange.bind(null, 'upperLabel')}
        child={{
          header: '父级标签',
        }}
      >
        <FormatterSelect
          value={upperLabel.formatter}
          onChange={(value) => {
            onKeyChange('upperLabel', {
              formatter: value,
            });
          }}
        />
      </SeriesLabelConfig>
    );
  }, [upperLabel, onKeyChange]);

  const squareRatioConfig = useMemo(() => {
    return (
      <Item
        label="显示比例"
        placeholder={
          <IconTooltip title="默认为黄金比：0.5 * (1 + Math.sqrt(5))">
            <InfoCircleOutlined />
          </IconTooltip>
        }
      >
        <FullForm>
          <InputNumber
            className="w-100"
            value={squareRatio}
            onChange={onKeyChange.bind(null, 'squareRatio')}
          />
        </FullForm>
      </Item>
    );
  }, [squareRatio, onKeyChange]);

  const nodeClickConfig = useMemo(() => {
    return (
      <Item label="节点展开">
        <FullForm>
          <Switch
            checked={nodeClick === 'zoomToNode'}
            onChange={(value) => {
              onKeyChange('nodeClick', value ? 'zoomToNode' : false);
            }}
          />
        </FullForm>
      </Item>
    );
  }, [nodeClick, onKeyChange]);

  const breadcrumbConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '面包屑',
          key: 'breadcrumb',
          visibleRender: true,
          value: breadcrumb.show,
          onChange: (value) => {
            onKeyChange('breadcrumb', {
              show: value,
            });
          },
        }}
      >
        <Item label="背景颜色">
          <CompatColorSelect
            value={breadcrumb.itemStyle.color}
            onChange={(value) => {
              onKeyChange('breadcrumb', {
                itemStyle: {
                  color: value,
                },
              });
            }}
          />
        </Item>
        <KeyWordPosition
          value={{
            left: breadcrumb.left,
            top: breadcrumb.top,
          }}
          onChange={onKeyChange.bind(null, 'breadcrumb')}
        />
        <Collapse
          child={{
            header: '文本',
            key: 'textStyle',
          }}
        >
          <FontConfigList
            value={breadcrumb.itemStyle.textStyle}
            onChange={(value) => {
              onKeyChange('breadcrumb', {
                itemStyle: {
                  textStyle: value,
                },
              });
            }}
          />
        </Collapse>
      </Collapse>
    );
  }, [breadcrumb, onKeyChange, onChange]);

  return (
    <ConfigList>
      {squareRatioConfig}
      {nodeClickConfig}
      {labelConfig}
      {upperLabelConfig}
      {breadcrumbConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
