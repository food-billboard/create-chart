import { Dropdown as AntDropdown } from 'antd';
import type { DropDownProps } from 'antd';
import classnames from 'classnames';

const { Button } = AntDropdown;

const Dropdown = (
  props: DropDownProps & {
    children?: React.ReactNode;
  },
) => {
  const { className, ...nextProps } = props;

  return (
    <AntDropdown {...nextProps} className={classnames('c-f-s', className)} />
  );
};

const Wrapper: typeof Dropdown & {
  Button: typeof Button;
} = Dropdown as any;

Wrapper.Button = Button;

export default Wrapper;
