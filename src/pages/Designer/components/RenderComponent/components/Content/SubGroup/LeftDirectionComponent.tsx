import classnames from 'classnames';
import AbstractComponent, { ComponentProps } from './AbstractComponent';
import styles from './index.less';

const LeftDirectionComponent = (props: ComponentProps) => {
  const { className, config, delay } = props;
  const { speed } = config;

  return (
    <AbstractComponent
      {...props}
      defaultTransform={{
        transform: 'translateX(100%)',
      }}
      keyframes={[
        {
          translateX: 0,
          duration: speed,
        },
        {
          translateX: '-100%',
          duration: speed,
        },
      ]}
      className={classnames(
        className,
        styles['group-component-carousel-wrapper-children-left'],
      )}
    />
  );
};

export default LeftDirectionComponent;
