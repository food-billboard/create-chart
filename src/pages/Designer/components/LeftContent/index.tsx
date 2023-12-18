import { useGetState } from 'ahooks';
import classnames from 'classnames';
import { useRef, useCallback, useEffect } from 'react';
import FocusWrapper from '@/components/FocusWrapper';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import ComponentManage from './components/ComponentManage';
import LayerManage from './components/LayerManage';
import { LayerManageRef } from './components/LayerManage/type';
import styles from './index.less';

const LeftContent = () => {
  const [layerVisible, setLayerVisible, getLayerVisible] =
    useGetState<boolean>(false);

  const layerRef = useRef<LayerManageRef>(null);

  const handleClose = useCallback(() => {
    setLayerVisible(false);
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
      false,
      'LeftContent',
    );
  }, []);

  useEffect(() => {
    const onLayerChange = (visible: boolean, target: string) => {
      if (target === 'LeftContent') return;
      visible ? layerRef.current?.open() : layerRef.current?.close();
      setLayerVisible(visible);
    };
    GLOBAL_EVENT_EMITTER.addListener(
      EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
      onLayerChange,
    );
    return () => {
      GLOBAL_EVENT_EMITTER.removeListener(
        EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE,
        onLayerChange,
      );
    };
  }, []);

  return (
    <FocusWrapper className={classnames(styles['design-page-left'], 'pos-re')}>
      <div
        className={classnames(
          'p-lr-24',
          'dis-flex',
          'w-100',
          'pos-re',
          styles['design-page-left-content'],
        )}
        id="design-page-left-content"
      >
        <LayerManage ref={layerRef} onClose={handleClose} />
        <ComponentManage />
      </div>
    </FocusWrapper>
  );
};

export default LeftContent;
