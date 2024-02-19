import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import classnames from 'classnames';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import styles from './index.less';

const GhostButton = (props: ButtonProps) => {
  const { className, ...nextProps } = props;

  return (
    <Button
      type="primary"
      ghost
      className={classnames(styles['design-config-ghost-btn'], className)}
      {...nextProps}
      style={{
        // @ts-ignore
        '--primary-color': DEFAULT_THEME_COLOR,
      }}
    />
  );
};

export default GhostButton;
