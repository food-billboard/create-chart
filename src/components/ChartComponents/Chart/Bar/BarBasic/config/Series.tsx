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

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TBarBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {} = value;

  const onKeyChange = useCallback(
    (key: keyof TBarBasicConfig['series'], value: any) => {},
    [onChange],
  );

  return <div></div>;
};

export default SeriesConfig;
