import { CaretLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import { ReactNode, CSSProperties } from 'react';
import styles from './index.less';

const CommonHeader = (props: {
  onBack?: () => void;
  title?: ReactNode;
  extra?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  const { onBack, style, className, title, extra } = props;

  return (
    <div
      style={style}
      className={classnames(
        styles['design-common-header'],
        'pos-sti',
        'dis-flex',
        'p-lr-4',
        className,
      )}
    >
      <div
        className={classnames(
          'text-ellipsis c-f-s',
          styles['design-common-header-title'],
        )}
      >
        {title}
      </div>
      {extra}
      <Button
        className="c-f-s-big"
        type="link"
        icon={<CaretLeftOutlined onClick={onBack} />}
      />
    </div>
  );
};

export default CommonHeader;
