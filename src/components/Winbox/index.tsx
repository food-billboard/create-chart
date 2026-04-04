import {
  CloseCircleOutlined,
  FullscreenOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import {
  useControllableValue,
  useSize,
  useFullscreen,
  useToggle,
  useUpdateEffect,
  useGetState,
} from 'ahooks';
import { Button, Space } from 'antd';
import classnames from 'classnames';
import { isNil } from 'lodash';
import {
  forwardRef,
  useImperativeHandle,
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { Rnd, RndResizeCallback, RndDragCallback } from 'react-rnd';
import { connect } from 'umi';
import { DEFAULT_THEME_COLOR_LIST } from '@/utils/Assist/Theme';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';
import { useClientSize } from './utils';

export type WinBoxRef = {
  open: (visible?: boolean) => void;
};

// 1、普通状态保证窗口不脱离视口
// 2、铺满状态保证窗口不脱离视口

const Winbox = forwardRef<
  WinBoxRef,
  {
    widthRate?: [number, number];
    heightRate?: [number, number];
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    defaultX?: number;
    defaultY?: number;
    defaultWidth?: number;
    defaultHeight?: number;
    title?: ReactNode;
    actionIgnore?: string[];
    scale: number;
    screenType: ComponentData.ScreenType;
  }
>((props, ref) => {
  const {
    widthRate = [0.3, 0.6],
    heightRate = [0.3, 0.6],
    children,
    defaultWidth = 300,
    defaultHeight = 200,
    defaultX: propsDefaultX,
    defaultY: propsDefaultY,
    title,
    style,
    actionIgnore,
    visible: _visible,
    scale: propsScale,
    screenType,
    onVisibleChange,
    ...nextProps
  } = props;

  // 视图的宽高
  const [{ width: clientWidth, height: clientHeight }, , getClientSize] =
    useClientSize();

  // 大屏的宽高
  const { width: screenWidth = 0, height: screenHeight = 0 } =
    useSize(() => document.body) || {};

  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
    defaultValue: false,
  });
  // 窗口的宽高
  const [rndWidth, setRndWidth] = useState<number>(defaultWidth);
  const [rndHeight, setRndHeight] = useState<number>(defaultHeight);
  const [rndX, setRndX, getRndX] = useGetState<number | undefined>(
    propsDefaultX,
  );
  const [rndY, setRndY, getRndY] = useGetState<number | undefined>(
    propsDefaultY,
  );
  // 铺满浏览器
  const [expandScreen, { set: setExpandScreen, toggle: toggleExpandScreen }] =
    useToggle(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const expandBeforeInfo = useRef<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] =
    useFullscreen(modalRef);

  const [colorA, , colorB] = DEFAULT_THEME_COLOR_LIST;

  const scale = useMemo(() => {
    return screenType === 'edit' ? 1 : propsScale / 100;
  }, [propsScale, screenType]);

  const { defaultX, defaultY } = useMemo(() => {
    let defaultX!: number;
    let defaultY!: number;
    if (isNil(propsDefaultX)) {
      if (clientWidth >= screenWidth) {
        defaultX = screenWidth - defaultWidth - 60;
      } else {
        defaultX =
          screenWidth / 2 + clientWidth / scale / 2 - defaultWidth - 60;
      }
    } else {
      defaultX = propsDefaultX;
    }
    if (isNil(propsDefaultY)) {
      if (clientHeight >= screenHeight) {
        defaultY = screenHeight - defaultHeight - 60;
      } else {
        defaultY =
          screenHeight / 2 + clientHeight / scale / 2 - defaultHeight - 60;
      }
    } else {
      defaultY = propsDefaultY;
    }

    return {
      defaultX: defaultX,
      defaultY: defaultY,
    };
  }, [
    propsDefaultX,
    propsDefaultY,
    screenWidth,
    screenHeight,
    defaultWidth,
    defaultHeight,
    clientWidth,
    clientHeight,
    scale,
  ]);

  const handleExpand = useCallback(() => {
    // 取消平铺
    if (expandScreen) {
      const { width, height, x, y } = expandBeforeInfo.current;
      setRndWidth(width);
      setRndHeight(height);
      setRndX(x);
      setRndY(y);
    } else {
      // 平铺
      expandBeforeInfo.current = {
        width: rndWidth,
        height: rndHeight,
        x: rndX!,
        y: rndY!,
      };
      const scaleClientWidth = clientWidth / scale;
      const scaleClientHeight = clientHeight / scale;
      if (clientWidth >= screenWidth) {
        setRndWidth(screenWidth);
        setRndX(0);
      } else {
        setRndWidth(scaleClientWidth);
        setRndX(screenWidth / 2 - scaleClientWidth / 2);
      }
      if (clientHeight >= screenHeight) {
        setRndHeight(screenHeight);
        setRndY(0);
      } else {
        setRndHeight(scaleClientHeight);
        setRndY(screenHeight / 2 - scaleClientHeight / 2);
      }
    }
    toggleExpandScreen();
  }, [
    expandScreen,
    rndWidth,
    rndHeight,
    rndX,
    rndY,
    screenWidth,
    screenHeight,
    clientWidth,
    clientHeight,
    scale,
  ]);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onDragStop: RndDragCallback = (event, data) => {
    const { x, y } = data;
    setRndX(x), setRndY(y);
  };

  const onResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    const { width, height } = delta;
    const { x, y } = position;
    setRndX(x), setRndY(y);
    setRndWidth((prev) => {
      return prev + width;
    });
    setRndHeight((prev) => {
      return prev + height;
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: (visible) => {
          setVisible((prev) => {
            return visible ?? !prev;
          });
        },
      };
    },
    [],
  );

  useUpdateEffect(() => {
    if (!visible) {
      setExpandScreen(false);
      exitFullscreen();
    }
  }, [visible]);

  useEffect(() => {
    if (getRndX() === undefined || !visible) {
      setRndX(defaultX);
    }
    if (getRndY() === undefined || !visible) {
      setRndY(defaultY);
    }
  }, [defaultX, defaultY, visible]);

  if (!visible) return null;

  return createPortal(
    <Rnd
      {...nextProps}
      scale={scale}
      style={{
        ...style,
        zIndex: 1001,
      }}
      enableResizing={!expandScreen}
      disableDragging={expandScreen}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      default={{
        x: defaultX,
        y: defaultY,
        width: defaultWidth,
        height: defaultHeight,
      }}
      size={{
        width: rndWidth,
        height: rndHeight,
      }}
      position={{
        x: rndX ?? defaultX,
        y: rndY ?? defaultY,
      }}
      // minWidth={Math.max(width * widthRate[0], 350)}
      // minHeight={height * heightRate[0]}
      // maxWidth={width * widthRate[1]}
      // maxHeight={height * heightRate[1]}
    >
      <div
        className={styles['winbox-wrapper']}
        style={{
          background: `linear-gradient(90deg, ${colorA}, ${colorB})`,
        }}
      >
        <div
          className={classnames(styles['winbox-wrapper-header'], 'dis-flex')}
        >
          <div
            className={classnames(
              styles['winbox-wrapper-header-title'],
              'c-f-s-big f-b',
            )}
          >
            {title}
          </div>
          <Space className="winbox-wrapper-header-action">
            {!actionIgnore?.includes('expand') && (
              <Button
                icon={<ExpandOutlined />}
                onClick={handleExpand}
                type="text"
              ></Button>
            )}
            {!actionIgnore?.includes('full') && (
              <Button
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                type="text"
              ></Button>
            )}
            <Button
              icon={<CloseCircleOutlined />}
              onClick={handleClose}
              type="text"
            ></Button>
          </Space>
        </div>
        <div ref={modalRef} className={styles['winbox-wrapper-content']}>
          {children}
        </div>
      </div>
    </Rnd>,
    document.body,
  );
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Winbox);
