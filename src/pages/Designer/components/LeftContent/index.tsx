import { useRef, useCallback, useState } from 'react';
import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import LayerManage, { LayerManageRef } from './components/LayerManage';
import styles from './index.less';
import ComponentTypeListStyles from './components/ComponentTypeList/index.less';

const LeftContent = () => {
  const [layerVisible, setLayerVisible] = useState<boolean>(false);

  const layerRef = useRef<LayerManageRef>(null);

  const handleClick = useCallback((type) => {
    // * 图层按钮
    if (type === 'layer') {
      const visible = layerRef.current?.visible;
      visible ? layerRef.current?.close() : layerRef.current?.open();
      setLayerVisible(!visible);
    }
  }, []);

  const handleClose = useCallback(() => {
    setLayerVisible(false);
  }, []);

  return (
    <FocusWrapper className={classnames(styles['design-page-left'], 'pos-re')}>
      <div
        className={classnames(
          'p-lr-24',
          'dis-flex',
          'w-100',
          styles['design-page-left-content'],
        )}
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
      </div>
    </FocusWrapper>
  );
};

export default LeftContent;
