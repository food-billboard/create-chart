import { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'dva';
import { useHashChangeReload } from '@/hooks';
import FetchScreenComponent, {
  FetchScreenComponentRef,
} from '@/components/FetchScreenComponent';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import Panel from './components/Panel';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const Designer = (props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
}) => {
  const { setScreenType } = props;

  const requestRef = useRef<FetchScreenComponentRef>(null);

  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  const reload = async () => {
    requestRef.current?.reload();
  };

  const closeAndPrompt = (event: any) => {
    event.returnValue = '是否确定离开此网站';
  };

  useHashChangeReload(reload);

  useEffect(() => {
    setScreenType('edit');
  }, [setScreenType]);

  useEffect(() => {
    window.addEventListener('beforeunload', closeAndPrompt);
    return () => {
      window.removeEventListener('beforeunload', closeAndPrompt);
    };
  });

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
      <FetchScreenComponent ref={requestRef} />
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
