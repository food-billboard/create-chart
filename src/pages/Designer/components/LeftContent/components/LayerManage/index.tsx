import classnames from 'classnames';
import { throttle } from 'lodash';
import {
  CSSProperties,
  Component,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import FocusWrapper from '@/components/FocusWrapper';
import { useIsScrolling, useLocalStorage, usePrimaryColor } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MAX_LAYER_WIDTH, MIN_LAYER_WIDTH } from '@/utils/constants';
import Header from './components/Header';
import LayerList from './components/Tree';
import styles from './index.less';
import { LayerManageRef } from './type';

export interface LayerManageProps {
  onClose?: () => void;
}

type ResizeLineProps = {
  value: number;
  onChange?: (value: number) => void;
  onResizeEnd?: () => void;
  onResizeStart?: () => void;
};

class ResizeLine extends Component<ResizeLineProps & { primaryColor: string }> {
  sizeValueRef = 0;

  onMouseDown = (e: any) => {
    this.props.onResizeStart?.();
    const clientX = e.clientX;
    this.sizeValueRef = clientX;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (e: any) => {
    const { value, onChange } = this.props;
    const clientX = e.clientX;
    const moveX = clientX - this.sizeValueRef;
    let newValue = value + moveX;
    this.sizeValueRef = clientX;
    newValue = Math.max(Math.min(MAX_LAYER_WIDTH, newValue), MIN_LAYER_WIDTH);
    onChange?.(newValue);
  };

  throttleOnMouseMove = throttle(this.onMouseMove, 50);

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.sizeValueRef = 0;
    this.props.onResizeEnd?.();
  };

  render() {
    return (
      <div
        className={styles['design-layer-manage-resize']}
        onMouseDown={this.onMouseDown}
      >
        <div
          className={styles['design-layer-manage-resize-content']}
          style={{
            backgroundColor: this.props.primaryColor,
          }}
        ></div>
      </div>
    );
  }
}

const ResizeWrapper = (props: ResizeLineProps) => {
  const primaryColor = usePrimaryColor();

  return <ResizeLine {...props} primaryColor={primaryColor} />;
};

const LayerManage = forwardRef<LayerManageRef, LayerManageProps>(
  (props, ref) => {
    const { onClose: propsOnClose } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [iconMode, setIconMode] = useState<boolean>(true);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [layerWidth = 300, setLayerWidth] = useLocalStorage<number>(
      LocalConfig.CONFIG_KEY_LAYER_WIDTH,
      300,
    );
    const [stateLayerWidth, setStateLayerWidth] = useState<number>(layerWidth);
    const isDeal = useRef<boolean>(false);
    const isScroll = useIsScrolling(
      document.querySelector('.design-layer-manage-wrapper'),
    );

    const style = useMemo(() => {
      const baseStyle: CSSProperties = {
        width: visible ? stateLayerWidth : 0,
        paddingRight: visible ? 8 : 0,
      };
      if (!visible) {
        baseStyle.border = 'none';
      }
      return baseStyle;
    }, [visible, stateLayerWidth]);

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

    useEffect(() => {
      if (!isDeal.current && layerWidth != stateLayerWidth) {
        setStateLayerWidth(layerWidth);
        isDeal.current = true;
      }
    }, [stateLayerWidth, layerWidth]);

    return (
      <FocusWrapper
        className={classnames(
          'design-layer-manage-wrapper zero-scrollbar',
          styles['design-layer-manage-wrapper'],
          {
            [styles['design-layer-manage-wrapper-transition']]: !disabled,
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
          <LayerList iconMode={iconMode} disabled={disabled} />
          {(!!disabled || isScroll) && (
            <div className={styles['design-layer-manage-content-cover']}></div>
          )}
          <ResizeWrapper
            value={stateLayerWidth}
            onChange={setStateLayerWidth}
            onResizeStart={setDisabled.bind(null, true)}
            onResizeEnd={() => {
              setLayerWidth(stateLayerWidth);
              setDisabled(false);
            }}
          />
        </div>
      </FocusWrapper>
    );
  },
);

export default LayerManage;
