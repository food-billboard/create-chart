import { useRef, useCallback } from 'react';
import classnames from 'classnames';
import { usePanelFocus } from '@/hooks';
import ToolBar from './components/ToolBar';
import ComponentTypeList from './components/ComponentTypeList';
import LayerManage, { LayerManageRef } from './components/LayerManage';
import styles from './index.less';

const LeftContent = () => {
  const ref = useRef<HTMLDivElement>(null);

  const layerRef = useRef<LayerManageRef>(null);

  usePanelFocus(ref);

  const handleClick = useCallback((type) => {
    if (type === 'layer') {
      layerRef.current?.visible
        ? layerRef.current?.close()
        : layerRef.current?.open();
    }
  }, []);

  return (
    <div ref={ref} className={classnames(styles['design-page-left'], 'pos-re')}>
      <div
        className={classnames(
          'p-lr-24',
          'dis-flex',
          'w-100',
          styles['design-page-left-content'],
        )}
      >
        <ToolBar onClick={handleClick} />
        <LayerManage ref={layerRef} />
        <ComponentTypeList />
      </div>
    </div>
  );
};

export default LeftContent;
