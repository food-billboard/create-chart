import {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useEffect,
  Component,
} from 'react';
import classnames from 'classnames';
import { throttle } from 'lodash';
import FocusWrapper from '@/components/FocusWrapper';
import ColorSelect from '@/components/ColorSelect';
import { useLocalStorage, useIsScrolling } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MAX_LAYER_WIDTH, MIN_LAYER_WIDTH } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import Header from './components/Header';
import LayerList from './components/Tree';
import styles from './index.less';

const { getRgbaString } = ColorSelect;
export interface LayerManageRef {
  open: () => void;
  close: () => void;
  visible: boolean;
}

export interface LayerManageProps {
  onClose?: () => void;
}

class ResizeLine extends Component<{
  value: number;
  onChange?: (value: number) => void;
  onResizeEnd?: () => void;
  onResizeStart?: () => void;
}> {
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
            backgroundColor: getRgbaString(
              ThemeUtil.generateNextColor4CurrentTheme(0),
            ),
          }}
        ></div>
      </div>
    );
  }
}

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
          'design-layer-manage-wrapper',
          styles['design-layer-manage-wrapper'],
          {
            'p-lr-8': visible,
            [styles['design-layer-manage-wrapper-transition']]: !disabled,
          },
        )}
        style={{
          width: visible ? stateLayerWidth : 0,
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
          <LayerList iconMode={iconMode} disabled={disabled} />
          {(!!disabled || isScroll) && (
            <div className={styles['design-layer-manage-content-cover']}></div>
          )}
          <ResizeLine
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
