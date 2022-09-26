import classnames from 'classnames';
import { useCallback, useRef, useMemo, CSSProperties } from 'react';
import {
  ConnectDropTarget,
  DropTargetMonitor,
  DropTarget,
  DropTargetConnector,
} from 'react-dnd';
import { connect } from 'dva';
import { merge } from 'lodash';
import ColorImageBackground from '@/components/ColorImageBackground';
import { useBackground } from '@/hooks';
import { createComponent } from '@/utils/Assist/Component';
import { PANEL_ABSOLUTE_POSITION } from '@/utils/constants/index';
import { DragData } from '@/models/connect';
import DataChangePool from '@/utils/Assist/DataChangePool';
import ComponentList from '../ComponentList';
import { DRAG_TYPE } from '../../../LeftContent/components/ComponentList/item';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export const DROP_TYPE = 'PAINTER_DROP_TYPE';

export type PainterProps = {
  // canDrop: boolean;
  // isOver: boolean;
  connectDropTarget?: ConnectDropTarget;
  dragInfo: DragData;
  setDragInfo: (value: Partial<DragData>) => void;
  setSelect: (value: string[]) => void;
  scale: number;
  config: ComponentData.TScreenData['config'];
  className?: string;
  style?: CSSProperties;
};

export const PANEL_ID = 'panel-id';

const Painter = (props: PainterProps) => {
  const {
    connectDropTarget,
    setSelect,
    scale: originScale,
    config: { style: { width, height } = {}, attr: { poster, lens } = {} } = {},
    className,
    style,
  } = props;

  const clickFlag = useRef<boolean>(false);
  const clickPos = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const moveCounter = useRef<number>(0);

  const backgroundStyle = useBackground(poster);

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const filter: CSSProperties = useMemo(() => {
    if (!lens || !lens.show) return {};
    const { hueRotate, brightness, contrast, grayscale, opacity, saturate } =
      lens;
    let filterData = '';
    if (hueRotate != 0) filterData += `hue-rotate(${hueRotate}deg) `;
    if (brightness != 0) filterData += `brightness(${brightness + 100}%) `;
    if (contrast != 0) filterData += `contrast(${contrast + 100}%) `;
    if (grayscale != 0) filterData += `grayscale(${grayscale}%) `;
    if (opacity != 100) filterData += `opacity(${opacity}%) `;
    if (saturate != 0) filterData += `saturate(${saturate}%) `;
    if (!filterData) return {};
    return {
      filter: filterData,
    };
  }, [lens]);

  const panelStyle: CSSProperties = useMemo(() => {
    return merge(
      {},
      {
        transformOrigin: 'left top',
        transform: `scale(${scale})`,
        width: Number(width) || 1920,
        height: Number(height) || 1080,
        left: PANEL_ABSOLUTE_POSITION.left,
        top: PANEL_ABSOLUTE_POSITION.top,
      },
      backgroundStyle.backgroundImage ? {} : backgroundStyle,
      style,
      filter,
    );
  }, [scale, backgroundStyle, width, height, style, filter]);

  const onMouseMove = () => {
    moveCounter.current++;
  };

  const onMouseUp = (e: any) => {
    const { clientX, clientY } = e;
    const { x, y } = clickPos.current;
    if (
      clickFlag.current &&
      moveCounter.current < 5 &&
      Math.abs(clientX - x) < 10 &&
      Math.abs(clientY - y) < 10
    ) {
      setSelect([]);
    }
    moveCounter.current = 0;
    clickFlag.current = false;
    clickPos.current = { x: 0, y: 0 };
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = useCallback((e: any) => {
    if (e.target.id !== PANEL_ID) return;
    clickFlag.current = true;
    clickPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <ColorImageBackground
      id={PANEL_ID}
      className={classnames(
        styles['page-design-main-panel'],
        'pos-ab',
        className,
      )}
      style={panelStyle}
      forwardRef={connectDropTarget}
      role={DROP_TYPE}
      image={backgroundStyle.backgroundImage}
      type={poster!.type}
      onMouseDown={onMouseDown}
    >
      <ComponentList />
    </ColorImageBackground>
  );
};

const dropTarget = DropTarget(
  DRAG_TYPE,
  {
    drop: (props: any, monitor, component) => {
      // mark current item position
      const { x: sourceX, y: sourceY } = monitor.getSourceClientOffset() || {
        x: 0,
        y: 0,
      };
      const { setSelect, setDragInfo, dragInfo, scale } = props;

      const generateNewComponent = (
        value: ComponentData.BaseComponentItem & {
          left: number;
          top: number;
        },
      ) => {
        const component = createComponent({
          icon: value.icon,
          name: value.title,
          description: value.description,
          componentType: value.type,
          config: {
            style: {
              left: Math.floor(value.left),
              top: Math.floor(value.top),
            },
          },
        });

        DataChangePool.setComponent({
          action: 'add',
          id: component.id,
          value: component,
          path: '',
        });

        setSelect([component.id]);

        setDragInfo?.({
          value: null,
        });
      };

      // position
      const { x, y } = document
        .querySelector(`#${PANEL_ID}`)
        ?.getBoundingClientRect() || { x: 0, y: 0 };

      const realLeft = ((sourceX - x - 0) / scale) * 100;
      const realTop = ((sourceY - y - 0) / scale) * 100;

      // console.log(
      //   monitor.getInitialClientOffset(), // 一开始的鼠标位置
      //   monitor.getInitialSourceClientOffset(), // 一开始元素的位置
      //   monitor.getClientOffset(), // 放置时的鼠标位置
      //   monitor.getDifferenceFromInitialOffset(), // 开始和结束位置的距离
      //   monitor.getSourceClientOffset() // 放置时的元素位置
      // )

      generateNewComponent({
        ...dragInfo.value,
        left: realLeft,
        top: realTop,
      });

      return {
        name: DROP_TYPE,
      };
    },
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      // isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
    };
  },
)(Painter);

export const NormalPainter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Painter);

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(dropTarget);
