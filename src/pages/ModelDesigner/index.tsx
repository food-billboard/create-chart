import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'dva';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import Header from '../Designer/components/Header';
import LeftContent from '../Designer/components/LeftContent';
import RightContent from '../Designer/components/RightContent';
import Panel from '../Designer/components/Panel';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const Designer = (props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
}) => {
  const { setScreenType } = props;

  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    setScreenType('edit');
  }, [setScreenType]);

  return (
    <ConfigProvider componentSize="small">
      <div
        className={styles['designer-page']}
        onContextMenu={preventDefaultContextMenu}
      >
        <Header />
        <div className={styles['designer-page-content']}>
          <DndProvider backend={HTML5Backend}>
            <LeftContent />
            <Panel />
          </DndProvider>
          <RightContent />
        </div>
      </div>
      <FetchScreenComponent />
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
