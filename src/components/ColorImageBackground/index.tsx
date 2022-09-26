import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import { BackgroundMap } from '@/components/InternalBackground';
import styles from './index.less';

const ColorImageBackground = (props: {
  forwardRef?: any;
  children?: ReactNode;
  type: ComponentData.TBackgroundConfig['type'];
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
          // @ts-ignore
          crossOrigin="*"
          src={image ? `${image}?v=${Date.now()}` : ''}
          className={styles['component-color-image-background-image']}
        />
      )}
      {type === 'internal_background' &&
        ((BackgroundMap as any)[
          (image || '').replace('internal_background', '')
        ]?.value ||
          '')}
      {children}
    </div>
  );
};

export default ColorImageBackground;
