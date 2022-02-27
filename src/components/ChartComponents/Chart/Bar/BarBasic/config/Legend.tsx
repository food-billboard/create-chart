import { useCallback } from 'react';
import { InputNumber } from 'antd';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import NumberPositionConfig, {
  PositionValue,
} from '@/components/ChartComponents/Common/NumberPositionConfig';
import OrientSelect from '@/components/ChartComponents/Common/OrientSelect';
import { FontConfigList } from '@/components/ChartComponents/Common/FontConfig';
import FormatterSelect from '@/components/ChartComponents/Common/FormatterSelect';
import { TBarBasicConfig } from '../type';

import LabelPositionConfig from '@/components/ChartComponents/Common/LabelPositionConfig';

const { Item } = ConfigList;

const LegendConfig = (props: {
  value: TBarBasicConfig['legend'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const { textStyle, left, top, right, bottom, orient, itemGap } = value;

  const onKeyChange = useCallback(
    (key: keyof TBarBasicConfig['legend'], value: any) => {
      onChange({
        config: {
          options: {
            legend: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const onPositionChange = useCallback(
    (value: PositionValue) => {
      onChange({
        config: {
          options: {
            legend: value,
          },
        },
      });
    },
    [onChange],
  );

  return (
    <Collapse
      child={{
        header: '图例',
        key: 'legend',
        visibleRender: true,
        onChange: onKeyChange.bind(null, 'show'),
        value: value.show,
      }}
      parent={{
        activeKey: ['legend'],
      }}
    >
      <NumberPositionConfig
        value={{
          left,
          right,
          top,
          bottom,
        }}
        onChange={onPositionChange}
      />
      <Item label="排列方式">
        <FullForm>
          <OrientSelect
            value={orient}
            onChange={onKeyChange.bind(null, 'orient')}
          />
        </FullForm>
      </Item>
      <Item label="间距">
        <FullForm>
          <InputNumber
            className="w-100"
            defaultValue={itemGap}
            onBlur={onKeyChange.bind(null, 'itemGap')}
          />
        </FullForm>
      </Item>
      <FormatterSelect />
      <Collapse
        child={{
          header: '文本',
          key: 'textStyle',
        }}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
    </Collapse>
  );
};

export default LegendConfig;
