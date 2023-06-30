import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';
import classnames from 'classnames';

const { OptGroup, Option } = AntSelect;

const Select = (
  props: SelectProps & {
    children?: React.ReactNode;
  },
) => {
  const { popupClassName, className, ...nextProps } = props;

  return (
    <AntSelect
      size="small"
      {...nextProps}
      className={classnames('c-f-s', className)}
      popupClassName={classnames(
        popupClassName,
        'design-config-select-dropdown',
      )}
    />
  );
};

const Wrapper: typeof Select & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
} = Select as any;

Wrapper.Option = Option;
Wrapper.OptGroup = OptGroup;

export default Wrapper;
