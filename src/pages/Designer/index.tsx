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

import TestComponent from '@/components/BackgroundSelect';
import { DingdingOutlined } from '@ant-design/icons';

const Designer = () => {
  return (
    <ConfigProvider componentSize="small">
      <div className={styles['designer-page']}>
        <Header />
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={300}
          defaultSize={100}
          className="primary"
        >
          <LeftContent />
          <Fragment>
            <Panel />
            <RightContent />
            hhhhhh
            <div style={{ width: 300 }}>
              <TestComponent />
            </div>
          </Fragment>
        </SplitPane>
      </div>
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
