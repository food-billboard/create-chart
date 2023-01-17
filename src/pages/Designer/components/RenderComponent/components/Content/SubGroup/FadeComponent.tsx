import classnames from 'classnames';
import AbstractComponent, { ComponentProps } from './AbstractComponent';
import styles from './index.less';

const FadeComponent = (props: ComponentProps) => {
  const { className, config, delay } = props;
  const { speed } = config;

  return (
    <AbstractComponent
      {...props}
      defaultTransform={{
        opacity: 0,
      }}
      keyframes={[
        {
          opacity: 1,
          duration: speed,
        },
        {
          opacity: 0,
          duration: speed,
        },
      ]}
      className={classnames(
        className,
        styles['group-component-carousel-wrapper-children-fade'],
      )}
    />
  );
};

export default FadeComponent;
