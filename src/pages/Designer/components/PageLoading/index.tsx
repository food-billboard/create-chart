import {} from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { usePrimaryColor } from '@/hooks';
import styles from './index.less';

const PageLoading = (props: { value: boolean }) => {
  const { value } = props;

  const color = usePrimaryColor();

  if (value) {
    return (
      <div className={styles['page-designer-loading']}>
        <ClimbingBoxLoader loading color={color} />
      </div>
    );
  }

  return null;
};

export default PageLoading;
