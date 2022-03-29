import { useState, forwardRef, useCallback, useImperativeHandle } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import FocusWrapper from '@/components/FocusWrapper';
import Header from './components/Header';
import LayerList from './components/Tree';
import styles from './index.less';

export interface LayerManageRef {
  open: () => void;
  close: () => void;
  visible: boolean;
}

export interface LayerManageProps {
  onClose?: () => void;
}

const LayerManage = forwardRef<LayerManageRef, LayerManageProps>(
  (props, ref) => {
    const { onClose: propsOnClose } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [iconMode, setIconMode] = useState<boolean>(true);

    const onClose = useCallback(() => {
      setVisible(false);
      propsOnClose?.();
    }, []);

    const open = useCallback(() => {
      setVisible(true);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
          visible,
          close: onClose,
        };
      },
      [open, visible, onClose],
    );

    return (
      <FocusWrapper
        className={classnames(styles['design-layer-manage-wrapper'], {
          'p-lr-8': visible,
        })}
        style={{
          width: visible ? 300 : 0,
        }}
      >
        <div className={styles['design-layer-manage-content']}>
          <Header
            onBack={onClose}
            iconMode={iconMode}
            onIconModeChange={(value) => {
              setIconMode(value);
            }}
          />
          <LayerList iconMode={iconMode} />
        </div>
      </FocusWrapper>
    );
  },
);

export default LayerManage;
