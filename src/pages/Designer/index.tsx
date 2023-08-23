import { useUnmount } from 'ahooks';
import { ConfigProvider, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'umi';
import { isModelHash, useHashChangeReload, usePrimaryColor } from '@/hooks';
import FetchScreenComponent, {
  FetchScreenComponentRef,
} from '@/pages/Designer/components/FetchScreenComponent';
import {
  createPutScreenPool,
  deleteScreenPool,
  putScreenPoolValid,
} from '@/services';
import { closeWindow, getLocationQuery } from '@/utils';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import Header from './components/Header';
import LeftContent from './components/LeftContent';
import PageLoading from './components/PageLoading';
import Panel from './components/Panel';
import RightContent from './components/RightContent';
import Tour from './components/Tour';
import { mapDispatchToProps, mapStateToProps } from './connect';
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

let closeAction: Function | undefined = undefined;

export const useSingleModal: () => [
  (openModal: any, update?: boolean) => void,
  () => void,
] = () => {
  const handleModal = useCallback((openModal, update: boolean = true) => {
    if (closeAction) {
      if (update) {
        typeof closeAction === 'function' && closeAction?.();
        closeAction = openModal().destroy;
      }
    } else {
      closeAction = openModal();
    }
  }, []);

  const handleClose = useCallback(() => {
    typeof closeAction === 'function' && closeAction?.();
    closeAction = undefined;
  }, []);

  return [handleModal, handleClose];
};

const Designer = (props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  getMockValueKindMap: () => Promise<any>;
}) => {
  const { setScreenType, getMockValueKindMap } = props;

  const [loading, setLoading] = useState<boolean>(true);
  const [guideLoading, setGuideLoading] = useState<boolean>(false);

  const primaryColor = usePrimaryColor();

  const requestRef = useRef<FetchScreenComponentRef>(null);
  const heartValidTimerRef = useRef<any>();

  const [handleModal, closeModal] = useSingleModal();

  const preventDefaultContextMenu = (e: any) => {
    e.preventDefault();
    return false;
  };

  const errorPrompt = useCallback(() => {
    handleModal(Modal.error.bind(null, { ...COMMON_MODAL_PROPS }));
  }, [handleModal]);

  // 心跳检测
  const fetchHeartValid = useCallback(
    async (id: string) => {
      try {
        const result = await putScreenPoolValid({ _id: id });
        if (!result) {
          clearInterval(heartValidTimerRef.current);
          handleModal(
            Modal.confirm.bind(null, {
              ...COMMON_MODAL_PROPS,
              content: '长时间未操作！',
            }),
          );
        }
      } catch (err) {
        errorPrompt();
      }
    },
    [handleModal],
  );

  const onLoad = useCallback(async () => {
    setLoading(false);
    // 自动保存且为非前端简化大屏才需要创建流式保存
    if (GlobalConfig.isAutoSaveType() && !GlobalConfig.IS_STATIC) {
      const { id } = getLocationQuery() || {};
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
    // 非前端大屏才需要
    if (!GlobalConfig.IS_STATIC)
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
    // 前端大屏不需要
    if (!GlobalConfig.IS_STATIC) getMockValueKindMap();
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
    if (GlobalConfig.isAutoSaveType()) return;
    window.addEventListener('beforeunload', closeAndPrompt);
    return () => {
      window.removeEventListener('beforeunload', closeAndPrompt);
    };
  }, []);

  // unload
  // 页面关闭或者hash发生改变的时候
  // 关闭后端保存流
  useEffect(() => {
    if (!GlobalConfig.isAutoSaveType() || GlobalConfig.IS_STATIC) {
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

  useUnmount(() => {
    closeModal();
  });

  return (
    <ConfigProvider componentSize="small">
      <div
        className={styles['designer-page']}
        onContextMenu={preventDefaultContextMenu}
        style={{
          pointerEvents: loading || guideLoading ? 'none' : 'all',
          // @ts-ignore
          '--designer-primary-color': primaryColor,
        }}
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
      <Tour
        onStart={setGuideLoading.bind(null, true)}
        onComplete={setGuideLoading.bind(null, false)}
        loading={loading}
      />
      <PageLoading value={loading} />
      <FetchScreenComponent onLoad={onLoad} ref={requestRef} />
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Designer);
