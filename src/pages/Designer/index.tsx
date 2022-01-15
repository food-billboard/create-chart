import { Fragment } from 'react';
import { ConfigProvider } from 'antd';
import SplitPane from 'react-split-pane';
import { connect } from 'dva';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import Panel from './components/Panel';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const Designer = () => {
  return (
    <ConfigProvider componentSize="small">
      <div className={styles['designer-page']}>
        <Header />
        <div className={styles['designer-page-content']}>
          <LeftContent />
          <Panel />
          <RightContent />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
