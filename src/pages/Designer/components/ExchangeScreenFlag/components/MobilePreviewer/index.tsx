import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useRef,
} from 'react';
import { Drawer, Button } from 'antd';
import classnames from 'classnames';
import { getDvaApp } from 'umi';
import Loading from '@/components/PageLoading';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import { mergeWithoutArray, sleep } from '@/utils';
import { NormalPainter } from '../../../Panel/components/Painter';
import { ExchangePreviewerContext } from './context';
import styles from './index.less';
import { useIdPathMap } from '@/hooks';

export type MobilePreviewerRef = {
  open: () => void;
};

const MobilePreviewer = forwardRef<MobilePreviewerRef, {}>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ? 因为共用IdPathMap 会导致新生成的临时列表影响到之前的组件列表，故预览时将源组件列表清空
  const componentList = useRef<ComponentData.TComponentData[]>([]);

  const exchangeMobileComponents = (
    components: ComponentData.TComponentData[],
    scale: { x: number; y: number } = { x: 1, y: 1 },
  ) => {
    return components.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      const {
        components = [],
        config: {
          style: { width, height },
          attr: { scaleX = 1, scaleY = 1 },
        },
        componentType,
      } = cur;
      const realHeight = (375 / width) * scale.x * height * scale.y;
      acc.push(
        componentType !== 'GROUP_COMPONENT' &&
          mergeWithoutArray({}, cur, {
            components: [],
            config: {
              style: {
                width: 375,
                height: realHeight,
                left: 0,
                top: 0,
              },
            },
          }),
        ...exchangeMobileComponents(components, {
          x: scaleX * scale.x,
          y: scaleY * scale.y,
        }),
      );
      return acc;
    }, []);
  };

  const open = useCallback(() => {
    setVisible(true);
    setLoading(true);
    const app = getDvaApp();
    const dispatch = app._store.dispatch;
    const components = getDvaGlobalModelData().components;
    componentList.current = components;
    dispatch({ type: 'global/setSelect', value: [] });
    dispatch({ type: 'global/setComponentAll', enqueue: false, value: [] });
    dispatch({
      type: 'global/setExchangeMobileComponents',
      value: exchangeMobileComponents(components),
    });
    useIdPathMap(true);
    sleep(3000).then(() => {
      setLoading(false);
    });
  }, []);

  const handleClose = useCallback(() => {
    const app = getDvaApp();
    const dispatch = app._store.dispatch;
    dispatch({
      type: 'global/setComponentAll',
      enqueue: false,
      value: componentList.current,
    });
    componentList.current = [];
    setVisible(false);
  }, []);

  const handleOk = useCallback(() => {}, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Drawer
      open={visible}
      title="移动端转换"
      onClose={handleClose}
      placement="left"
      width={375 + 48}
      maskClosable={false}
      destroyOnClose
      footer={
        <div className={styles['component-exchange-screen-flag-drawer-footer']}>
          <Button onClick={handleClose}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            确认应用
          </Button>
        </div>
      }
    >
      <div
        className={classnames(
          styles['component-exchange-screen-flag-drawer'],
          'pos-re',
        )}
      >
        {loading && (
          <div
            className={classnames(
              styles['component-exchange-screen-flag-drawer-loading'],
              'pos-ab w-100 h-100',
            )}
          >
            <Loading />
          </div>
        )}
        {!loading && (
          <ExchangePreviewerContext.Provider
            value={{
              flag: 'H5',
              mobilePreviewerAble: true,
            }}
          >
            <NormalPainter />
          </ExchangePreviewerContext.Provider>
        )}
      </div>
    </Drawer>
  );
});

export default MobilePreviewer;
