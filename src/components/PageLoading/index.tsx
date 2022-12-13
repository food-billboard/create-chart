import { CSSProperties } from 'react';
import classnames from 'classnames';
import { PageLoading } from '@ant-design/pro-layout';
import PacmanLoader from 'react-spinners/CircleLoader';
import { usePrimaryColor } from '@/hooks';
import styles from './index.less';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;
const Loading = (props: { style?: CSSProperties; className?: string }) => {
  const color = usePrimaryColor();

  const { style, className } = props;

  return (
    <PacmanLoader
      style={style}
      className={classnames(styles['page-custom-loading'], className)}
      size={100}
      loading
      color={color}
    />
  );
};

export default Loading;
