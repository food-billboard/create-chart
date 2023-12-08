import classnames from 'classnames';
import { ReactNode, CSSProperties } from 'react';
import { BackgroundRender } from '@/components/InternalBackground';
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
          src={
            image && !image.startsWith('data:')
              ? `${image}?v=${Date.now()}`
              : image || ''
          }
          className={styles['component-color-image-background-image']}
        />
      )}
      {type === 'internal_background' && (
        <BackgroundRender value={image || ''} />
      )}
      {children}
    </div>
  );
};

export default ColorImageBackground;
