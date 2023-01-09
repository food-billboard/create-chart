import { useRef, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { useGetState } from 'ahooks';
import FocusWrapper from '@/components/FocusWrapper';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import LayerManage from './components/LayerManage';
import { LayerManageRef } from './components/LayerManage/type';
import ComponentSearchList from './components/ComponentList/SearchList';
import styles from './index.less';
import ComponentTypeListStyles from './components/ComponentTypeList/index.less';

const LeftContent = () => {
  const [layerVisible, setLayerVisible, getLayerVisible] =
    useGetState<boolean>(false);

  const layerRef = useRef<LayerManageRef>(null);

  const handleClick = useCallback((type) => {
    // TODO
  }, []);

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
        <ToolBar onClick={handleClick} />
        <LayerManage ref={layerRef} onClose={handleClose} />
        <ComponentTypeList
          menuClass={
            layerVisible
              ? ComponentTypeListStyles[
                  'page-design-left-component-list-content-border'
                ]
              : ''
          }
        />
        <ComponentSearchList />
      </div>
    </FocusWrapper>
  );
};

export default LeftContent;
