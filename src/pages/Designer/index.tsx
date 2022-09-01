import { useEffect, useRef, useState, useCallback } from 'react';
import { ConfigProvider, Modal } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'dva';
import { history } from 'umi';
import { useHashChangeReload, isModelHash } from '@/hooks';
import FetchScreenComponent, {
  FetchScreenComponentRef,
} from '@/components/FetchScreenComponent';
import { closeWindow } from '@/utils';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import {
  putScreenPoolValid,
  createPutScreenPool,
  deleteScreenPool,
} from '@/services';
import PageLoading from './components/PageLoading';
import ShepherdWrapper from './components/ShepherdWrapper';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import Panel from './components/Panel';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const COMMON_MODAL_PROPS = {
  okText: '刷新页面',
  cancelText: '关闭页面',
  title: '提示',
  content: '网络出现错误！',
  closable: false,
  centered: true,
  cancelButtonProps: {
    danger: true,
  },
  onOk: () => {
    window.location.reload();
  },
  onCancel: () => {
    closeWindow();
  },
};

const Designer = (props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  getMockValueKindMap: () => Promise<any>;
}) => {
  const { setScreenType, getMockValueKindMap } = props;

  const [loading, setLoading] = useState<boolean>(true);

  const requestRef = useRef<FetchScreenComponentRef>(null);
  const heartValidTimerRef = useRef<any>();

  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  const errorPrompt = useCallback(() => {
    Modal.error({
      ...COMMON_MODAL_PROPS,
    });
  }, []);

  const fetchHeartValid = useCallback(async (id: string) => {
    try {
      const result = await putScreenPoolValid({ _id: id });
      if (!result) {
        clearInterval(heartValidTimerRef.current);
        Modal.confirm({
          ...COMMON_MODAL_PROPS,
          content: '长时间未操作！',
        });
      }
    } catch (err) {
      errorPrompt();
    }
  }, []);

  const onLoad = useCallback(async () => {
    setLoading(false);
    if (GlobalConfig.isAutoSaveType()) {
      const {
        location: { query },
      } = history;
      const { id } = query || {};
      clearInterval(heartValidTimerRef.current);
      await createPutScreenPool({
        _id: id as string,
        type: isModelHash(location.hash) ? 'model' : 'screen',
      })
        .then(() => {
          heartValidTimerRef.current = setInterval(
            fetchHeartValid.bind(null, id as string),
            3000,
          );
        })
        .catch(() => {
          errorPrompt();
        });
    }
  }, []);

  const reload = async (hashData: any, prevHashData: any) => {
    setLoading(true);
    await deleteScreenPool(true, {
      type: prevHashData.isModel ? 'model' : 'screen',
      _id: prevHashData.id,
    });
    await requestRef.current?.reload();
  };

  const closeAndPrompt = (event: any) => {
    event.returnValue = '是否确定离开此网站';
  };

  useHashChangeReload(reload);

  useEffect(() => {
    getMockValueKindMap();
    return () => {
      clearInterval(heartValidTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setScreenType('edit');
  }, [setScreenType]);

  // 页面关闭的时候需要提示是否保存
  // 这是在手动保存的时候才需要使用的
  useEffect(() => {
    if (!GlobalConfig.isAutoSaveType()) return;
    window.addEventListener('beforeunload', closeAndPrompt);
    return () => {
      window.removeEventListener('beforeunload', closeAndPrompt);
    };
  }, []);

  // unload
  // 页面关闭或者hash发生改变的时候
  // 关闭后端保存流
  useEffect(() => {
    if (!GlobalConfig.isAutoSaveType()) {
      return;
    }
    window.addEventListener('unload', deleteScreenPool.bind(null, false, {}));
    return () => {
      window.removeEventListener(
        'unload',
        deleteScreenPool.bind(null, false, {}),
      );
    };
  }, []);

  return (
    <ConfigProvider componentSize="small">
      <ShepherdWrapper>
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
      </ShepherdWrapper>
      <PageLoading value={loading} />
      <FetchScreenComponent onLoad={onLoad} ref={requestRef} />
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
