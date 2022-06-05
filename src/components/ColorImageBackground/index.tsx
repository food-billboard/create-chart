import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const ColorImageBackground = (props: {
  forwardRef?: any;
  children?: ReactNode;
  type: 'image' | 'color';
  className?: string;
  image?: string;
  style?: CSSProperties;
  [key: string]: any;
}) => {
  const { forwardRef, children, type, className, style, image, ...nextProps } =
    props;

  return (
    <div
      {...nextProps}
      style={style}
      className={classnames(
        styles['component-color-image-background'],
        className,
      )}
      ref={forwardRef}
    >
      {type === 'image' && (
        <img
          // crossOrigin='anonymous'
          src={image || ''}
          className={styles['component-color-image-background-image']}
        />
      )}
      {children}
    </div>
  );
};

export default ColorImageBackground;
