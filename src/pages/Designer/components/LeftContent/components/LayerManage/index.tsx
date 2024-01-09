import classnames from 'classnames';
import {
  CSSProperties,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { connect } from 'umi';
import FocusWrapper from '@/components/FocusWrapper';
import { useIsScrolling } from '@/hooks';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MIN_LAYER_WIDTH, MAX_LAYER_WIDTH } from '@/utils/constants/another';
import Header from './components/Header';
import { useResize } from './components/Resize';
import LayerList from './components/Tree';
import styles from './index.less';
import { LayerManageRef } from './type';

export interface LayerManageProps {
  onClose?: () => void;
  layerCollapse: boolean;
  setLocalConfig: (config: Partial<ILocalModelState>) => void;
}

const DEFAULT_LAYER_WIDTH = MIN_LAYER_WIDTH + 50;

const LayerManage = forwardRef<LayerManageRef, LayerManageProps>(
  (props, ref) => {
    const { onClose: propsOnClose, layerCollapse, setLocalConfig } = props;

    const visible = !layerCollapse;

    const [iconMode, setIconMode] = useState<boolean>(true);

    const isScroll = useIsScrolling(
      document.querySelector('.design-layer-manage-wrapper'),
    );

    const [resizeElement, resizeWidth, isResizing] = useResize({
      defaultSize: DEFAULT_LAYER_WIDTH,
      min: MIN_LAYER_WIDTH,
      max: MAX_LAYER_WIDTH,
      localKey: LocalConfig.CONFIG_KEY_LAYER_WIDTH,
      direction: 1,
      style: {
        height: 'calc(100% - 4px)',
      },
    });

    const style = useMemo(() => {
      const baseStyle: CSSProperties = {
        width: visible ? resizeWidth : 0,
        paddingRight: visible ? 8 : 0,
      };
      if (!visible) {
        baseStyle.border = 'none';
      }
      return baseStyle;
    }, [visible, resizeWidth]);

    const onClose = useCallback(() => {
      setLocalConfig({
        layerCollapse: true,
      });
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE, false);
      propsOnClose?.();
    }, []);

    const open = useCallback(() => {
      setLocalConfig({
        layerCollapse: false,
      });
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.LAYER_VISIBLE_CHANGE, true);
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
        className={classnames(
          'design-layer-manage-wrapper zero-scrollbar',
          styles['design-layer-manage-wrapper'],
          {
            [styles['design-layer-manage-wrapper-transition']]: !isResizing,
          },
        )}
        style={style}
      >
        <div className={styles['design-layer-manage-content']}>
          <Header
            onBack={onClose}
            iconMode={iconMode}
            onIconModeChange={(value) => {
              setIconMode(value);
            }}
          />
          <LayerList iconMode={iconMode} disabled={isResizing} />
          {(!!isResizing || isScroll) && (
            <div className={styles['design-layer-manage-content-cover']}></div>
          )}
          {resizeElement}
        </div>
      </FocusWrapper>
    );
  },
);

export default connect(
  (state: ConnectState) => {
    return {
      layerCollapse: state.local.layerCollapse,
    };
  },
  (dispatch) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(LayerManage);
