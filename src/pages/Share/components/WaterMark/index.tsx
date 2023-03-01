import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import styles from './index.less';

const WaterMark = () => {
  const {
    global: {
      screenData: {
        config: {
          attr: { waterMark },
        },
      },
    },
  } = useMobxContext();

  return (
    <div
      className={styles['designer-water-mark']}
      style={{
        display: waterMark ? 'block' : 'none',
      }}
    />
  );
};

export default observer(WaterMark);
