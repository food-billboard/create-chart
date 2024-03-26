import classnames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import PacmanLoader from 'react-spinners/HashLoader';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import styles from './index.less';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;
export const Loading = (props: {
  style?: CSSProperties;
  className?: string;
  size?: number;
}) => {
  const { style, className, size = 100 } = props;

  return (
    <PacmanLoader
      style={style}
      className={classnames(styles['page-custom-loading'], className)}
      size={size}
      loading
      color={DEFAULT_THEME_COLOR}
    />
  );
};

export const ContentLoading = (props: {
  style?: CSSProperties;
  className?: string;
  size?: number;
  loading?: boolean;
  children?: ReactNode;
}) => {
  const { style, className, size = 25, loading, children } = props;

  if (!loading) return null;

  return (
    <div
      className={classnames('pos-ab w-100 h-100', styles['content-loading'])}
    >
      <Loading
        style={style}
        className={classnames(styles['content-loading-main'], className)}
        size={size}
      />
      {children}
    </div>
  );
};

const WrapperLoading = (props: {
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div className={styles['page-custom-loading-wrapper']}>
      <Loading
        {...props}
        style={{
          ...props.style,
          position: 'static',
        }}
      />
    </div>
  );
};

export default WrapperLoading;
