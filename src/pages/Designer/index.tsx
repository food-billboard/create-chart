import { Fragment } from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'dva';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
          <DndProvider backend={HTML5Backend}>
            <LeftContent />
            <Panel />
          </DndProvider>
          <RightContent />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
