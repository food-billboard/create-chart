import { PageLoading } from '@ant-design/pro-layout';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '../ColorSelect';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
// export default PageLoading;
const Loading = () => {
  return (
    <PacmanLoader
      className={styles['page-custom-loading']}
      size={25}
      loading
      color={getRgbaString(ThemeUtil.generateNextColor4CurrentTheme(0))}
    />
  );
};

export default Loading;
