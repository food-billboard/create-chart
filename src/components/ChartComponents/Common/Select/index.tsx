import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';

const { OptGroup, Option } = AntSelect;

const Select = (
  props: SelectProps & {
    children?: React.ReactNode;
  },
) => {
  const { ...nextProps } = props;

  return <AntSelect size="small" {...nextProps} />;
};

const Wrapper: typeof Select & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
} = Select as any;

Wrapper.Option = Option;
Wrapper.OptGroup = OptGroup;

export default Wrapper;
