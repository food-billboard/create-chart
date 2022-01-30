import { useEffect, useCallback } from 'react';
import { ConfigProvider } from 'antd';
import { connect } from 'dva';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { get } from 'lodash';
import { DEFAULT_SCREEN_DATA } from '@/utils/constants';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import Panel from './components/Panel';
import { mapStateToProps, mapDispatchToProps } from './connect';
import { autoFitScale } from './components/Panel/components/ToolBar/components/Scale';
import styles from './index.less';

const Designer = (props: { setScale?: (scale: number) => void }) => {
  const { setScale } = props;

  const fetchData = useCallback(async () => {
    const { width, height } = get(DEFAULT_SCREEN_DATA, 'config.style');

    // fetchData
    if (false) {
    }

    const result = autoFitScale(width, height);
    setScale?.(result);
  }, [setScale]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ConfigProvider componentSize="small">
      <div className={styles['designer-page']}>
        <Header />
        <div className={styles['designer-page-content']}>
          <DndProvider backend={HTML5Backend}>
            {/* <LeftContent /> */}
            <RightContent />
            <Panel />
          </DndProvider>
          {/* <RightContent /> */}
          <LeftContent />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
