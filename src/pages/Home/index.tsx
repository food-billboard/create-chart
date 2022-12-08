import {} from 'react';
import classnames from 'classnames';
import { Layout } from 'antd';
import ActionSection from './components/ActionSection';
import AnimationSection from './components/AnimationSection';
import LinearBackground, {
  GridBackground,
} from './components/LinearBackground';
import SubMainSection from './components/SubMainSection';
import styles from './index.less';

const { Header } = Layout;

const Home = () => {
  return (
    <div className={classnames(styles['home-page-wrapper'], 'dis-flex')}>
      <LinearBackground />
      <GridBackground />
      <Header>
        <div className={styles['home-page-logo']} />
      </Header>
      <div
        className={classnames(
          styles['home-page-main'],
          'dis-flex zero-scrollbar',
        )}
      >
        <div className={styles['home-page-wrapper-action']}>
          <ActionSection />
        </div>
        <div className={styles['home-page-wrapper-animation']}>
          <AnimationSection />
        </div>
      </div>
      <div className={styles['home-page-sub']}>
        <SubMainSection />
      </div>
      <div className={styles['home-page-footer']}>{/* TODO */}</div>
    </div>
  );
};

export default Home;
