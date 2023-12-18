import { CaretLeftOutlined } from '@ant-design/icons';
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
          'text-ellipsis c-f-s-big',
          styles['design-common-header-title'],
        )}
      >
        {title}
      </div>
      {extra}
      <CaretLeftOutlined className="m-r-8 c-po" onClick={onBack} />
    </div>
  );
};

export default CommonHeader;
