import {
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useRef,
} from 'react';
import { Button } from 'antd';
import { merge } from 'lodash';
import { connect } from 'dva';
import { useHover, useMouse, useScroll } from 'ahooks';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import GuideLine from '@/components/GuideLine';
import Ruler from '@/components/Ruler';
import { BackgroundConfigRender } from '@/components/DesignerBackground';
import { mergeWithoutArray, sleep } from '@/utils/tool';
import ClipboardComponent from '../Clipboard';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const RIGHT_BOTTOM_PADDING = 200;

export const wrapperId = 'designer-page-main';
export const subWrapperId = 'designer-page-main-sub';

const GuideLineButton = (props: { show: boolean; onClick?: any }) => {
  const { show, onClick } = props;

  const { left, top } = useScroll(document.querySelector(`#${wrapperId}`)) || {
    left: 0,
    top: 0,
  };

  const guideLineShowIcon = useMemo(() => {
    return show ? <EyeOutlined /> : <EyeInvisibleOutlined />;
  }, [show]);

  return (
    <Button
      onClick={onClick}
      type="link"
      className={classnames('pos-ab', styles['designer-page-main-guide-btn'])}
      style={{
        left,
        top,
      }}
      icon={guideLineShowIcon}
    ></Button>
  );
};

let scroll = {
  x: 0,
  y: 0,
  defaultX: 400,
  defaultY: 82,
};

const getWrapperScroll = (cover = false) => {
  const { x, y } = document
    .querySelector('#designer-page-main')
    ?.getBoundingClientRect() || { x: 400, y: 82 };
  scroll.x = x - scroll.defaultX;
  scroll.y = y - scroll.defaultY;
  if (cover) {
    scroll.defaultX = x;
    scroll.defaultY = y;
  }
};

const PanelWrapper = (props: {
  scale: number;
  width?: number;
  height?: number;
  children: ReactNode;
  guideLineList?: ComponentData.TGuideLineConfigItem[];
  guideLineShow?: boolean;
  setGuideLine?: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const {
    scale: originScale,
    width = 0,
    height = 0,
    children,
    guideLineList = [],
    guideLineShow,
    setGuideLine,
  } = props;

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [wrapperLeft, setWrapperLeft] = useState(0);
  const [wrapperTop, setWrapperTop] = useState(0);
  const [mouseHorizontalGuideLine, setMouseHorizontalGuideLine] =
    useState<ComponentData.TGuideLineConfigItem>();
  const [mouseVerticalGuideLine, setMouseVerticalGuideLine] =
    useState<ComponentData.TGuideLineConfigItem>();

  const horizontalRulerRef = useRef<any>();
  const verticalRulerRef = useRef<any>();
  const disabledMouseGuideLine = useRef<boolean>(false);

  const isHorizontalRulerHover = useHover(horizontalRulerRef);

  const isVerticalRulerHover = useHover(verticalRulerRef);

  const mousePosition = useMouse();

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const setMousePosition = () => {
    const { clientX, clientY } = mousePosition;
    if (disabledMouseGuideLine.current) return;
    if (isHorizontalRulerHover) {
      getWrapperScroll();
      const { x, y } = scroll;
      const result = generateGuideLine(
        'vertical',
        {
          width: 2,
          height: size.height,
        },
        false,
        {
          clientX: clientX - x,
          clientY: clientY - y,
        },
        'dashed',
      );
      setMouseHorizontalGuideLine(result);
    } else if (isVerticalRulerHover) {
      getWrapperScroll();
      const { x, y } = scroll;
      const result = generateGuideLine(
        'horizontal',
        {
          width: size.width,
          height: 2,
        },
        false,
        {
          clientX: clientX - x,
          clientY: clientY - y,
        },
        'dashed',
      );
      setMouseVerticalGuideLine(result);
    }
  };

  const wrapperSetGuideLine = useCallback(
    (value: Partial<ComponentData.TGuideLineConfig>) => {
      const newValue = mergeWithoutArray(
        {},
        {
          show: guideLineShow,
          value: guideLineList,
        },
        value,
      ) as ComponentData.TGuideLineConfig;

      setGuideLine?.(newValue);
    },
    [setGuideLine, guideLineList, guideLineShow],
  );

  const generateGuideLine = useCallback(
    (
      direction,
      style,
      insertToList,
      e,
      lineStyle: 'solid' | 'dashed' = 'solid',
    ) => {
      if (!guideLineShow) return;
      const { clientX, clientY } = e;
      let positionStyle: Partial<ComponentData.TGuideLineConfigItem['style']> =
        {};
      const dom = document.querySelector(`#${wrapperId}`);
      if (direction === 'vertical') {
        var scrollLeft = dom ? dom.scrollLeft : 0;
        positionStyle.left = clientX - wrapperLeft + scrollLeft;
      } else {
        var scrollTop = dom ? dom.scrollTop : 0;
        positionStyle.top = clientY - wrapperTop + scrollTop;
      }
      const newItem: ComponentData.TGuideLineConfigItem = {
        type: direction,
        style: merge({}, style, positionStyle),
        id: nanoid(),
        lineStyle,
      };

      insertToList &&
        wrapperSetGuideLine({
          value: [
            ...guideLineList,
            newItem,
          ] as ComponentData.TGuideLineConfigItem[],
        });

      return newItem;
    },
    [
      guideLineShow,
      guideLineList,
      wrapperLeft,
      wrapperTop,
      wrapperSetGuideLine,
    ],
  );

  const onGuidelinePositionChange = useCallback(
    (index, item) => {
      let newGuideList = [...guideLineList];
      newGuideList.splice(index, 1, item);
      wrapperSetGuideLine({
        value: newGuideList as ComponentData.TGuideLineConfigItem[],
      });
    },
    [wrapperSetGuideLine, guideLineList],
  );

  const deleteGuideLine = useCallback(
    (index: number) => {
      const newGuideList = [...guideLineList];
      newGuideList.splice(index, 1);
      wrapperSetGuideLine({
        value: newGuideList,
      });
    },
    [guideLineList, wrapperSetGuideLine],
  );

  const onMoveEnd = useCallback(
    (item: ComponentData.TGuideLineConfigItem, index: number) => {
      // close the disabled
      disabledMouseGuideLine.current = false;

      const {
        type,
        style: { left, top },
      } = item;
      let change = false;
      const newGuideList = [...guideLineList];

      if (type === 'horizontal') {
        if (top <= 30 || top >= size.height) {
          newGuideList.splice(index, 1);
          change = true;
        }
      } else {
        if (left <= 30 || left >= size.width) {
          newGuideList.splice(index, 1);
          change = true;
        }
      }
      if (change) {
        wrapperSetGuideLine({
          value: newGuideList,
        });
      }
    },
    [guideLineList, size, wrapperSetGuideLine],
  );

  const onMoveStart = useCallback(() => {
    disabledMouseGuideLine.current = true;
  }, []);

  const resize = useCallback(() => {
    const dom = document.querySelector(`#${wrapperId}`);
    if (!dom) return;
    let dw = dom.clientWidth;
    let dh = dom.clientHeight;
    let pw = width * scale + RIGHT_BOTTOM_PADDING;
    let ph = height * scale + RIGHT_BOTTOM_PADDING;
    const newWidth = Math.max(dw, pw);
    const newHeight = Math.max(dh, ph);
    setSize({ width: newWidth, height: newHeight });
  }, [height, width, scale]);

  const getWrapperStyle = useCallback(() => {
    let wrapper = document.querySelector(`#${subWrapperId}`);
    if (!wrapper) return;
    const { x, y } = wrapper.getBoundingClientRect();
    setWrapperLeft(x || 0);
    setWrapperTop(y || 0);
  }, []);

  const renderGuideLineItem = useCallback(
    (
      item: ComponentData.TGuideLineConfigItem,
      index: number,
      account: ComponentData.TGuideLineConfigItem[],
    ) => {
      return (
        <GuideLine
          {...item}
          onChange={onGuidelinePositionChange.bind(this, index)}
          onMouseUp={onMoveEnd.bind(this, item, index)}
          onMouseDown={onMoveStart}
          onDoubleClick={deleteGuideLine.bind(this, index)}
          key={item.id}
        />
      );
    },
    [onMoveEnd, onGuidelinePositionChange],
  );

  const mouseGuideLineList = useMemo(() => {
    if (!guideLineShow) return;
    let list: ComponentData.TGuideLineConfigItem[] = [];
    if (isHorizontalRulerHover && mouseHorizontalGuideLine)
      list.push(mouseHorizontalGuideLine);
    if (isVerticalRulerHover && mouseVerticalGuideLine)
      list.push(mouseVerticalGuideLine);
    return list.map(renderGuideLineItem);
  }, [
    isHorizontalRulerHover,
    isVerticalRulerHover,
    guideLineShow,
    renderGuideLineItem,
    mouseHorizontalGuideLine,
    mouseVerticalGuideLine,
  ]);

  const guideLineListDoms = useMemo(() => {
    if (!guideLineShow) return;
    return guideLineList.map(renderGuideLineItem);
  }, [guideLineShow, guideLineList, renderGuideLineItem]);

  useEffect(() => {
    sleep(100).then(resize);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  useEffect(() => {
    setMousePosition();
  }, [mousePosition]);

  useEffect(() => {
    getWrapperStyle();
    getWrapperScroll(true);
  }, []);

  return (
    <div
      className={classnames(
        styles['designer-page-main'],
        'box-sizing-border',
        'pos-re',
      )}
    >
      {/* background */}
      <BackgroundConfigRender />
      <div id={wrapperId} className="w-100 h-100">
        <div
          id={subWrapperId}
          className={classnames(styles['designer-page-main-sub'], 'pos-re')}
          // style={size}
        >
          {/* Ruler */}
          <div
            ref={horizontalRulerRef}
            onClick={generateGuideLine.bind(
              this,
              'vertical',
              {
                width: 2,
                height: size.height,
              },
              true,
            )}
            className={classnames(
              styles['designer-page-main-horizontal-ruler'],
              'dis-flex',
            )}
            style={{ width: size.width }}
          >
            <div
              className={classnames(
                styles['designer-page-main-horizontal-ruler-prefix'],
                'dis-flex',
                'pos-ab',
              )}
            ></div>
            <Ruler
              type="horizontal"
              width={size.width - 70}
              height={30}
              zoom={scale}
              unit={scale > 0.5 ? 50 : 100}
            />
          </div>
          <div
            ref={verticalRulerRef}
            style={{ height: size.height - 30 }}
            className={classnames(styles['designer-page-main-vertical-ruler'])}
            onClick={generateGuideLine.bind(
              this,
              'horizontal',
              {
                width: size.width,
                height: 2,
              },
              true,
            )}
          >
            {/* <div
              className={styles['designer-page-main-horizontal-ruler-prefix']}
            ></div> */}
            <Ruler
              width={30}
              height={size.height - 70}
              zoom={scale}
              unit={scale > 0.5 ? 50 : 100}
            />
          </div>
          {/* Ruler */}

          <GuideLineButton
            onClick={wrapperSetGuideLine.bind(null, { show: !guideLineShow })}
            show={!!guideLineShow}
          ></GuideLineButton>

          {guideLineListDoms}
          {mouseGuideLineList}
          <ClipboardComponent>{children}</ClipboardComponent>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelWrapper);
