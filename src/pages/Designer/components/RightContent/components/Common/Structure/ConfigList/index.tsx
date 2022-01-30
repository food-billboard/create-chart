import { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import PlaceHolder from '../PlaceHolder';
import Container from '../Container';
import styles from './index.less';

const ConfigList = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={classnames(styles['design-config'], '')}>{children}</div>
  );
};

const ConfigListItemContainer = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <div className={styles['design-config-field-container']}>
      <Container>{children}</Container>
    </div>
  );
};

const ConfigListItem = (props: {
  label?: string | ReactNode;
  placeholder?: string | ReactNode;
  labelProps?: {
    className?: string;
    style?: CSSProperties;
    title?: string;
    level?: 1 | 2 | 3;
  };
  children?: ReactNode;
}) => {
  const {
    label,
    labelProps: { className, style, title, level } = {},
    placeholder,
    children,
  } = props;

  return (
    <div
      className={classnames(
        styles['design-config-field'],
        'dis-flex',
        'pos-re',
      )}
    >
      <PlaceHolder>{placeholder}</PlaceHolder>

      <div
        className={classnames(
          'text-ellipsis',
          styles['design-config-field-title'],
          styles[`design-config-field-title-level${level}`],
          className,
        )}
        style={style}
        title={title || (typeof label === 'string' ? label : '')}
      >
        {label}
      </div>
      <ConfigListItemContainer>{children}</ConfigListItemContainer>
    </div>
  );
};

const WrapperConfigList: typeof ConfigList & {
  Item: typeof ConfigListItem;
} = ConfigList as any;

WrapperConfigList.Item = ConfigListItem;

export default WrapperConfigList;
