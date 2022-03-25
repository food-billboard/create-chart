import { ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SplitPane from 'react-split-pane';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import Panel from './components/Panel';
import styles from './index.less';

const Designer = () => {
  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

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

export default Designer;
