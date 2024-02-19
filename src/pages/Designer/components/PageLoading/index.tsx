import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import styles from './index.less';

const PageLoading = (props: { value: boolean }) => {
  const { value } = props;

  if (value) {
    return (
      <div className={styles['page-designer-loading']}>
        <ClimbingBoxLoader loading color={DEFAULT_THEME_COLOR} />
      </div>
    );
  }

  return null;
};

export default PageLoading;
