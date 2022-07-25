import { PageLoading } from '@ant-design/pro-layout';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { usePrimaryColor } from '@/hooks';
import styles from './index.less';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;
const Loading = () => {
  const color = usePrimaryColor();

  return (
    <PacmanLoader
      className={styles['page-custom-loading']}
      size={25}
      loading
      color={color}
    />
  );
};

export default Loading;
